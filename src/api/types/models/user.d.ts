export type user = {
  id?: number;
  user_name: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  gender: string;
  nationality?: string;
  birth_date: Date;
  role: string;
  is_verified: boolean;
};
