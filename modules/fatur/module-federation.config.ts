import { ModuleFederationConfig } from '@nx/webpack';

const config: ModuleFederationConfig = {
  name: 'fatur',
  exposes: {
    './Routes': 'modules/fatur/src/app/remote-entry/entry.routes.ts',
  },
};

export default config;
