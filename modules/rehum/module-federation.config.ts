import { ModuleFederationConfig } from '@nx/webpack';

const config: ModuleFederationConfig = {
  name: 'rehum',
  exposes: {
    './Routes': 'modules/rehum/src/app/remote-entry/entry.routes.ts',
  },
};

export default config;
