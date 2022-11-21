import { Box, Text } from '@chakra-ui/react';
import { ColumnDef } from '@tanstack/react-table';
import { useEffect, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import useProvider from '../../hooks/useProvider';
import useTable from '../../hooks/useTable';
import { Reporte, Routes } from '../../models';
import { Button } from '../../ui';

const Reportes = () => {
  const { actions, state } = useProvider();
  const navigate = useNavigate();

  const firstLoad = useRef(true);

  useEffect(() => {
    if (firstLoad.current) {
      firstLoad.current = false;

      return;
    }

    actions.getReportes();
  }, []);

  const { columns, data } = useMemo(() => {
    const data: Reporte[] = state.reportes.filter(
      (reporte) => !reporte.deleted
    );

    const columns: ColumnDef<Reporte>[] = [
      {
        header: 'Nombre',
        accessorKey: 'nombre',
      },
      {
        header: 'Descripción',
        accessorKey: 'descripcion',
      },
      {
        header: 'Stock',
        accessorKey: 'cantidad',
      },
      {
        header: 'Precio unidad',
        accessorKey: 'precio',
      },
      {
        header: 'Precio total',
        accessorKey: 'precioTotal',
      },
      {
        header: 'Estado',
        accessorKey: 'status',
        cell: (props) => (
          <Text color={'blue.600'}>{props.getValue() as string}</Text>
        ),
      },
      {
        id: 'actions',
        header: () => null,
        cell: (props) => {
          const row = props.row.original;

          return (
            <Box>
              <Button
                _hover={{
                  bg: 'red.500',
                }}
                bg={'red.600'}
                text={'Eliminar'}
                onClick={() =>
                  actions.deleteProducto({
                    producto: { id: row.id },
                    stock: { id: row.idStock },
                  })
                }
              />
              <Button
                text={'Editar'}
                onClick={() => navigate(`${Routes.REPORTES}/edit/${row.id}`)}
              />
            </Box>
          );
        },
      },
    ];

    return {
      columns,
      data,
    };
  }, [state.reportes]);

  const [Table] = useTable(data, columns);

  return (
    <Box
      alignItems={'center'}
      color={'textAndIcons'}
      display={'flex'}
      flexDirection={'column'}
    >
      <Text
        fontSize={'5xl'}
        fontWeight={'bold'}
        my={'3rem'}
        textAlign={'center'}
      >
        Reporte de Stock
      </Text>
      <Button
        mb={'3rem'}
        text={'Nuevo Producto'}
        onClick={() => navigate(`${Routes.REPORTES}/create`)}
      />
      <Table />
    </Box>
  );
};

export default Reportes;
