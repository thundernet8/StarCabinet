import {join} from 'path';

const baseDir = join(__dirname, '..', 'app', 'node_modules');

require('app-module-path').addPath(baseDir);