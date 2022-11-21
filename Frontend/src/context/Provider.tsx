import { useReducer } from 'react';

import {
  DeleteProductoReq,
  InitialState,
  Message,
  ProductoReq,
  Reporte,
} from '../models';
import { api } from '../services';

import Context from './Context';
import Reducer from './Reducer';

interface Props {
  children: JSX.Element | JSX.Element[];
}

const initialState: InitialState = {
  reportes: [],
  alert: null,
  spinner: true,
};

const Provider: React.FC<Props> = ({ children }) => {
  const [providerState, dispatch] = useReducer(Reducer, initialState);

  const spinnerOn = () => {
    dispatch({ type: 'spinnerOn' });
  };

  const getReportes = async () => {
    const { type, value } = await api.get<Reporte[]>('Reporte/getReportes');

    if (type === 'success') {
      dispatch({ type: 'getReportes', payload: value.reverse() });

      return;
    }

    dispatch({
      type: 'message',
      payload: { message: 'Error general.', color: 'red' },
    });
  };

  const createProducto = async (producto: ProductoReq) => {
    const { type, value } = await api.post<Message, ProductoReq>(
      'Producto/CreateProducto',
      producto
    );

    if (type === 'success') {
      dispatch({
        type: 'message',
        payload: { message: value.message, color: 'green' },
      });

      return;
    }

    dispatch({
      type: 'message',
      payload: { message: 'Error general.', color: 'red' },
    });
  };

  const editProducto = async (producto: ProductoReq) => {
    const { type, value } = await api.put<Message, ProductoReq>(
      'Producto/EditProducto',
      producto
    );

    if (type === 'success') {
      dispatch({
        type: 'editProducto',
        payload: producto,
      });

      dispatch({
        type: 'message',
        payload: { message: value.message, color: 'green' },
      });

      return;
    }

    dispatch({
      type: 'message',
      payload: { message: 'Error general.', color: 'red' },
    });
  };

  const deleteProducto = async (producto: DeleteProductoReq) => {
    const { type, value } = await api.delete<Message, DeleteProductoReq>(
      'Producto/DeleteProducto',
      producto
    );

    if (type === 'success') {
      dispatch({
        type: 'deleteProducto',
        payload: producto,
      });

      dispatch({
        type: 'message',
        payload: { message: value.message, color: 'green' },
      });

      return;
    }

    dispatch({
      type: 'message',
      payload: { message: 'Error general.', color: 'red' },
    });
  };

  const state = {
    reportes: providerState.reportes,
    spinner: providerState.spinner,
  };
  const actions = {
    getReportes,
    createProducto,
    editProducto,
    deleteProducto,
    spinnerOn,
  };

  return (
    <Context.Provider value={{ state, actions }}>{children}</Context.Provider>
  );
};

export default Provider;
