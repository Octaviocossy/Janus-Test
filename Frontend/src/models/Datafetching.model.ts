export interface Err {
  type: 'error';
  value: Error;
}

export interface Alert<T> {
  type: 'alert';
  value: T;
}

export interface Success<T> {
  type: 'success';
  value: T;
}

export interface Message {
  message: string;
}

export type Result<T> = Success<T> | Alert<T> | Err;
