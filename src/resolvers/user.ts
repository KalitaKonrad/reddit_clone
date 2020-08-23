import { Arg, Ctx, Field, InputType, Mutation, ObjectType, Query, Resolver } from 'type-graphql';
import { MyContext } from '../types';
import { User } from '../entities';
import argon2 from 'argon2';

@InputType()
class UsernamePasswordInput {
  @Field()
  username: string;
  @Field()
  password: string;
}

@ObjectType()
class FieldError {
  @Field()
  field: string;

  @Field()
  message: string;
}

@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;
}

@Resolver()
export class UserResolver {
  @Query(() => User, { nullable: true })
  async currentUser(@Ctx() { em, req }: MyContext) {
    if (!req.session.userId) {
      return null;
    }

    return await em.findOne(User, { id: req.session.userId });
  }

  @Mutation(() => UserResponse)
  async register(@Arg('options') options: UsernamePasswordInput, @Ctx() { req, em }: MyContext): Promise<UserResponse> {
    if (options.username.length <= 2) {
      return {
        errors: [{ field: 'username', message: 'length must be greater than 2' }],
      };
    }

    if (options.password.length <= 2) {
      return {
        errors: [{ field: 'password', message: 'length must be greater than 2' }],
      };
    }

    const usernameExists = await em.findOne(User, { username: options.username });

    if (usernameExists) {
      return {
        errors: [{ field: 'username', message: 'Username is already in use' }],
      };
    }

    const hashedPassword = await argon2.hash(options.password);
    const user = em.create(User, { username: options.username, password: hashedPassword });

    await em.persistAndFlush(user);

    // save user id session <- keeps user logged in by setting cookie
    req.session.userId = user.id;

    return { user };
  }

  @Mutation(() => UserResponse)
  async login(@Arg('options') options: UsernamePasswordInput, @Ctx() { em, req }: MyContext): Promise<UserResponse> {
    const user = await em.findOne(User, { username: options.username });

    if (!user) {
      return {
        errors: [{ field: 'username', message: "That username doesn't exist" }],
      };
    }

    const validPassword = await argon2.verify(user.password, options.password);

    if (!validPassword) {
      return {
        errors: [{ field: 'password', message: 'Incorrect Password' }],
      };
    }

    return { user };
  }
}
