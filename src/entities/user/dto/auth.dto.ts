export type AuthLoginDto = {
  email: string;
  password: string;
};

export type AuthResDto = {
  id: string;
  email: string;
  username: string;
  src: string;
  access_token: string;
};
