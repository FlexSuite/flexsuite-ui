export interface CompanyProvider {
  id: number;
  /** company provider name */
  name: {
    /** first name */
    first: string;
    /** last name */
    last: string;
    /** preferred name */
    chosen?: string;
  }
}
