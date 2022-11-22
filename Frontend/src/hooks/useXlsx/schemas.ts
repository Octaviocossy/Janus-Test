import { Schemas } from '../../models';

export const XlsxSchemas: Schemas = {
  Reportes: [
    {
      Header: 'Nombre',
      accessor: 'nombre',
    },
    {
      Header: 'Descripción',
      accessor: 'descripcion',
    },
    {
      Header: 'Stock',
      accessor: 'cantidad',
    },
    {
      Header: 'Precio unidad',
      accessor: 'precio',
    },
    {
      Header: 'Precio total',
      accessor: 'precioTotal',
    },
    {
      Header: 'Estado',
      accessor: 'status',
    },
  ],
};
