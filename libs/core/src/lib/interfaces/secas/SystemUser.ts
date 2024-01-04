import { CompanyProvider } from "./CompanyProvider";

export interface SystemUser {
  id: number;
  username: string;
  provider: CompanyProvider;
  active: boolean;
}
