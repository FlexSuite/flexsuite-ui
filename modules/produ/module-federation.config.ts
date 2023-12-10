import { ModuleFederationConfig } from '@nx/webpack';

const config: ModuleFederationConfig = {
  name: 'produ',
  exposes: {
    './Routes': 'modules/produ/src/app/remote-entry/entry.routes.ts',
  },
};

export default config;
