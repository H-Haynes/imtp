import { createViteLibConfig } from '../../configs/vite.lib.config';

export default createViteLibConfig({
  entry: 'src/index.ts',
  name: 'IMTPCore',
  external: ['@imtp/types'],
  globals: {
    '@imtp/types': 'IMTPTypes',
  },
});
