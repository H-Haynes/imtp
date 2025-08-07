import { createViteLibConfig } from '../../configs/vite.lib.config';

export default createViteLibConfig({
  entry: 'src/index.ts',
  name: 'IMTPUtils',
  external: [],
  globals: {},
});
