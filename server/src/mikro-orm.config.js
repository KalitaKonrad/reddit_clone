'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const entities_1 = require('./entities');
const constants_1 = require('./constants');
const path_1 = __importDefault(require('path'));
exports.default = {
  migrations: {
    path: path_1.default.join(__dirname, './migrations'),
    pattern: /^[\w-]+\d+\.[tj]s$/,
  },
  entities: [entities_1.Post, entities_1.User],
  dbName: 'reddit',
  user: 'postgres',
  password: 'postgres',
  debug: !constants_1.__prod__,
  type: 'postgresql',
};
//# sourceMappingURL=mikro-orm.config.js.map
