import { AlertMsg } from './Alert.model';

export interface Err {
  type: 'error';
  value: Error;
}

export interface Alert {
  type: 'alert';
  value: AlertMsg;
}

export interface Success<T> {
  type: 'success';
  value: T;
}

export type Result<T> = Success<T> | Alert | Err;
