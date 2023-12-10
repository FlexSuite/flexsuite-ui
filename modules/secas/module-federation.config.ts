import { ModuleFederationConfig } from '@nx/webpack';

const config: ModuleFederationConfig = {
  name: 'secas',
  exposes: {
    './Routes': 'modules/secas/src/app/remote-entry/entry.routes.ts',
  },
};

export default config;
