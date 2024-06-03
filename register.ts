import 'ignore-styles';
import { register } from 'ts-node';
import * as path from 'path';

register({
  project: path.resolve('tsconfig.node.json'),
  transpileOnly: true,
  compilerOptions: {
    module: 'ESNext'
  }
});

import 'tsconfig-paths/register';
