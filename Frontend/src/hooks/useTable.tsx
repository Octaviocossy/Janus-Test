import {
  HStack,
  Select,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
} from '@tanstack/react-table';

import { IconButton } from '../ui';

function useTable<T>(data: T[], columns: ColumnDef<T>[]) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const Component = () => {
    return (
      <TableContainer>
        <Table>
          <Thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <Tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <Th key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody>
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <Tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <Td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </Td>
                  ))}
                </Tr>
              ))
            ) : (
              <Tr>
                <Td colSpan={6} fontWeight={'semibold'} textAlign={'center'}>
                  No se encontraron registros.
                </Td>
              </Tr>
            )}
          </Tbody>
        </Table>
        <HStack justifyContent={'center'} mt={'1rem'}>
          <IconButton
            aria-label="pagination-btn"
            disabled={!table.getCanPreviousPage()}
            icon={<p>{'<'}</p>}
            onClick={() => table.setPageIndex(0)}
          />
          <span className="flex items-center gap-1">
            <strong>
              {table.getState().pagination.pageIndex + 1} de{' '}
              {table.getPageCount()}
            </strong>
          </span>
          <IconButton
            aria-label="pagination-btn"
            disabled={!table.getCanNextPage()}
            icon={<p>{'>'}</p>}
            onClick={() => table.nextPage()}
          />
          <Select
            value={table.getState().pagination.pageSize}
            width={'auto'}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value));
            }}
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Mostrar {pageSize}
              </option>
            ))}
          </Select>
        </HStack>
      </TableContainer>
    );
  };

  return [Component];
}

export default useTable;
