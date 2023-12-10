import { ModuleFederationConfig } from '@nx/webpack';

const config: ModuleFederationConfig = {
  name: 'conti',
  exposes: {
    './Routes': 'modules/conti/src/app/remote-entry/entry.routes.ts',
  },
};

export default config;
