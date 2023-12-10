import { ModuleFederationConfig } from '@nx/webpack';

const config: ModuleFederationConfig = {
  name: 'supri',
  exposes: {
    './Routes': 'modules/supri/src/app/remote-entry/entry.routes.ts',
  },
};

export default config;
