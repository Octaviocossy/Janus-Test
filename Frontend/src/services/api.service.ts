import { Result } from '../models';

const api = {
  get: async <T>(url: string): Promise<Result<T>> => {
    try {
      const req = await fetch(`${import.meta.env.VITE_API_URL}/${url}`);

      const resp = await req.json();

      return resp;
    } catch (error) {
      return { type: 'error', value: error as Error };
    }
  },
};

export default api;
