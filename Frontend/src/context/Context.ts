import { createContext } from 'react';

import { DeleteProductoReq, ProductoReq, Reporte } from '../models';

interface State {
  reportes: Reporte[];
}

interface Actions {
  getReportes: () => void;
  createProducto: (producto: ProductoReq) => void;
  editProducto: (producto: ProductoReq) => void;
  deleteProducto: (producto: DeleteProductoReq) => void;
}

interface Props {
  state: State;
  actions: Actions;
}

const Context = createContext({} as Props);

export default Context;
