import { useReducer } from 'react';

import { InitialState, Reporte } from '../models';
import { api } from '../services';

import Context from './Context';
import Reducer from './Reducer';

interface Props {
  children: JSX.Element | JSX.Element[];
}

const initialState: InitialState = {
  reportes: [],
  alert: null,
};

const Provider: React.FC<Props> = ({ children }) => {
  const [providerState, dispatch] = useReducer(Reducer, initialState);

  const getReportes = async () => {
    const { type, value } = await api.get<Reporte[]>('Reporte/getReportes');

    if (type === 'success') {
      dispatch({ type: 'getReportes', payload: value });

      return;
    }

    dispatch({
      type: 'message',
      payload: { message: 'Error general.', color: 'red' },
    });
  };

  const state = { reportes: providerState.reportes };
  const actions = { getReportes };

  return (
    <Context.Provider value={{ state, actions }}>{children}</Context.Provider>
  );
};

export default Provider;
