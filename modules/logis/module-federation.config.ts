import { ModuleFederationConfig } from '@nx/webpack';

const config: ModuleFederationConfig = {
  name: 'logis',
  exposes: {
    './Routes': 'modules/logis/src/app/remote-entry/entry.routes.ts',
  },
};

export default config;
