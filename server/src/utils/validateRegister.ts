import { UsernamePasswordInput } from './UsernamePasswordInput';

export const validateRegister = (options: UsernamePasswordInput) => {
  if (options.username.length <= 2) {
    return [{ field: 'username', message: 'length must be greater than 2' }];
  }

  if (options.username.includes('@')) {
    return [{ field: 'username', message: 'cannot include @ sign' }];
  }

  if (!options.email.includes('@')) {
    return [{ field: 'email', message: 'that is not a valid email' }];
  }

  if (options.password.length <= 2) {
    return [{ field: 'password', message: 'length must be greater than 2' }];
  }

  return null;
};
