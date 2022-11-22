import { createContext } from 'react';

import {
  DeleteProductoReq,
  ProductoReq,
  Reporte,
  TipoProducto,
  ToastMsg,
} from '../models';

interface State {
  spinner: boolean;
  reportes: Reporte[];
  toast: ToastMsg | null;
  tipoProducto: TipoProducto[];
}

interface Actions {
  spinnerOn: () => void;
  getReportes: () => void;
  resetMessage: () => void;
  getTipoProducto: () => void;
  editProducto: (producto: ProductoReq) => void;
  createProducto: (producto: ProductoReq) => void;
  deleteProducto: (producto: DeleteProductoReq) => void;
  createTipoProducto: (tipoProducto: TipoProducto) => void;
}

interface Props {
  state: State;
  actions: Actions;
}

const Context = createContext({} as Props);

export default Context;
