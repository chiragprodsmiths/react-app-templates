export interface ILoginForm {
  username: string;
  password: string;
}

export type ILoginFormErrors = { [key in keyof ILoginForm]?: string | string[] };

export interface ILoginResponse {
  link: string;
}

export interface ILoginActionData {
  errors: ILoginFormErrors;
  data: ILoginResponse;
}
