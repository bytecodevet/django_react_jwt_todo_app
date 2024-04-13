export type User = {
  username: string;
  email: string;
  first_name: string;
  last_name: string;
}

export type Task = {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
}

export type Token = {
  access: string;
  refresh?: string;
}

export type LoginErrorResponse = {
  detail: string;
}

export type RegisterErrorResponse = {
  first_name?: string[];
  last_name?: string[];
  username?: string[];
  email?: string[];
  password?: string[];
}

export type clickEvent = React.MouseEvent<HTMLButtonElement>;

export type SetStateFunction = React.Dispatch<React.SetStateAction<any>>;