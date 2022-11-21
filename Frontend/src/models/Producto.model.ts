export interface Producto {
  id: number;
  nombre: string;
  precio: number;
  idTipoProducto: number;
}

export interface ProductoReq {
  producto: {
    id?: number;
    nombre: string;
    precio: number;
    idTipoProducto: number;
  };
  stock: {
    id?: number;
    cantidad: number;
  };
}

export interface DeleteProductoReq {
  producto: {
    id: number;
  };
  stock: {
    id: number;
  };
}
