import { ModuleFederationConfig } from '@nx/webpack';

const config: ModuleFederationConfig = {
  name: 'analy',
  exposes: {
    './Routes': 'modules/analy/src/app/remote-entry/entry.routes.ts',
  },
};

export default config;
