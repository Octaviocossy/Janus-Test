import { useReducer } from 'react';

import {
  DeleteProductoReq,
  InitialState,
  Message,
  ProductoReq,
  Reporte,
  TipoProducto,
} from '../models';
import { api } from '../services';

import Context from './Context';
import Reducer from './Reducer';

interface Props {
  children: JSX.Element | JSX.Element[];
}

const initialState: InitialState = {
  reportes: [],
  toast: null,
  spinner: true,
  tipoProducto: [],
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
      payload: {
        title: 'Error general.',
        status: 'error',
      },
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
        payload: {
          title: value.message,
          status: 'success',
        },
      });

      return;
    }

    dispatch({
      type: 'message',
      payload: {
        title: 'Error general.',
        status: 'error',
      },
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
        payload: {
          title: value.message,
          status: 'success',
        },
      });

      return;
    }

    dispatch({
      type: 'message',
      payload: {
        title: 'Error general.',
        status: 'error',
      },
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
        payload: {
          title: value.message,
          status: 'success',
        },
      });

      return;
    }

    dispatch({
      type: 'message',
      payload: {
        title: 'Error general.',
        status: 'error',
      },
    });
  };

  const getTipoProducto = async () => {
    const { type, value } = await api.get<TipoProducto[]>(
      'TipoProducto/GetTipoProducto'
    );

    if (type === 'success') {
      dispatch({ type: 'getTipoProducto', payload: value.reverse() });

      return;
    }

    dispatch({
      type: 'message',
      payload: {
        title: 'Error general.',
        status: 'error',
      },
    });
  };

  const createTipoProducto = async (tipoProducto: TipoProducto) => {
    const { type, value } = await api.post<Message, TipoProducto>(
      'TipoProducto/CreateTipoProducto',
      tipoProducto
    );

    if (type === 'success') {
      dispatch({
        type: 'message',
        payload: {
          title: value.message,
          status: 'success',
        },
      });

      getTipoProducto();

      return;
    }

    if (type === 'alert') {
      dispatch({
        type: 'message',
        payload: {
          title: value.message,
          status: 'warning',
        },
      });

      return;
    }

    dispatch({
      type: 'message',
      payload: {
        title: 'Error general.',
        status: 'error',
      },
    });
  };

  const resetMessage = () => {
    dispatch({ type: 'resetMessage' });
  };

  const state = {
    reportes: providerState.reportes,
    spinner: providerState.spinner,
    tipoProducto: providerState.tipoProducto,
    toast: providerState.toast,
  };
  const actions = {
    getReportes,
    createProducto,
    editProducto,
    deleteProducto,
    spinnerOn,
    getTipoProducto,
    createTipoProducto,
    resetMessage,
  };

  return (
    <Context.Provider value={{ state, actions }}>{children}</Context.Provider>
  );
};

export default Provider;
