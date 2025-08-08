import { createViteLibConfig } from '../../configs/vite.lib.config';

export default createViteLibConfig({
  entry: 'src/index.ts',
  name: 'IMTPData',
  external: ['@imtp/core', '@imtp/types'],
  globals: {
    '@imtp/core': 'IMTPCore',
    '@imtp/types': 'IMTPTypes',
  },
});
