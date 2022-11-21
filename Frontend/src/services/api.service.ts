import { Result } from '../models';

const api = {
  get: async <T>(url: string): Promise<Result<T>> => {
    try {
      const req = await fetch(`${import.meta.env.VITE_API_URL}/${url}`);

      const resp = await req.json();

      return resp;
    } catch (error) {
      console.error(error);

      return { type: 'error', value: error as Error };
    }
  },
  post: async <R, T>(url: string, data: T): Promise<Result<R>> => {
    try {
      const req = await fetch(`${import.meta.env.VITE_API_URL}/${url}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const resp = await req.json();

      return resp;
    } catch (error) {
      console.error(error);

      return { type: 'error', value: error as Error };
    }
  },
  put: async <R, T>(url: string, data: T): Promise<Result<R>> => {
    try {
      const req = await fetch(`${import.meta.env.VITE_API_URL}/${url}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const resp = await req.json();

      return resp;
    } catch (error) {
      console.error(error);

      return { type: 'error', value: error as Error };
    }
  },

  delete: async <R, T>(url: string, data: T): Promise<Result<R>> => {
    try {
      const req = await fetch(`${import.meta.env.VITE_API_URL}/${url}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const resp = await req.json();

      return resp;
    } catch (error) {
      console.error(error);

      return { type: 'error', value: error as Error };
    }
  },
};

export default api;
