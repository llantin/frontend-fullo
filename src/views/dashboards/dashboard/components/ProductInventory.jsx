import { Button, Card, CardBody, CardFooter, CardHeader, CardTitle, Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'react-bootstrap';
import { TbCircleFilled, TbDotsVertical, TbFileExport, TbPlus } from 'react-icons/tb';
import Rating from '@/components/Rating';
import TablePagination from '@/components/table/TablePagination';
import { products } from '../data';
import { createColumnHelper, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';
import { useState, useEffect } from 'react';
import DataTable from '@/components/table/DataTable';
const columnHelper = createColumnHelper();
const ProductInventory = () => {
  const columns = [columnHelper.accessor('name', {
    cell: ({
      row
    }) => <div className="d-flex align-items-center">
        <img src={row.original.image} className="avatar-sm rounded-circle me-2" alt={row.original.name} />
        <div>
          <span className="text-muted fs-xs">{row.original.subtitleItem}</span>
          <h5 className="fs-base mb-0 fw-normal">
            {row.original.name}
          </h5>
        </div>
      </div>
  }), columnHelper.accessor('ratings', {
    cell: ({
      row
    }) => <>
        <span className="text-muted fs-xs">Movimientos</span>
        <h5 className="fs-base mb-0 fw-normal">{row.original.ratings}</h5>
      </>
  }), columnHelper.accessor('price', {
    cell: ({
      row
    }) => <>
        <span className="text-muted fs-xs">Categoria</span>
        <h5 className="fs-base mb-0 fw-normal">{row.original.price}</h5>
      </>
  }), columnHelper.accessor('status', {
    cell: ({
      row
    }) => <>
        <span className="text-muted fs-xs">Stock actual</span>
        <h5 className="fs-base mb-0 fw-normal">
          {row.original.status}
        </h5>
      </>
  })];
  const [data, setData] = useState([]); // inicializamos vacío

  useEffect(() => {
    const fetchProducts = async () => {
      const result = await products();
      setData(result);
    };
    fetchProducts();
  }, []);
  const [columnFilters, setColumnFilters] = useState([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5
  });
  const table = useReactTable({
    data,
    columns,
    state: {
      columnFilters,
      pagination
    },
    onColumnFiltersChange: setColumnFilters,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel()
  });
  const pageIndex = table.getState().pagination.pageIndex;
  const pageSize = table.getState().pagination.pageSize;
  const totalItems = table.getFilteredRowModel().rows.length;
  const start = pageIndex * pageSize + 1;
  const end = Math.min(start + pageSize - 1, totalItems);
  return <Card>
    <CardHeader className="justify-content-between align-items-center border-dashed">
      <CardTitle as="h4" className="mb-0">
        Productos con mayor flujo de movimientos
      </CardTitle>
    </CardHeader>
    <CardBody className="p-0">
      <DataTable table={table} emptyMessage="No records found" showHeaders={false} />
    </CardBody>
    {table.getRowModel().rows.length > 0 && <CardFooter className="border-0">
      <TablePagination totalItems={totalItems} start={start} end={end} className={'pagination-sm'} showInfo itemsName="products" previousPage={table.previousPage} canPreviousPage={table.getCanPreviousPage()} pageCount={table.getPageCount()} pageIndex={table.getState().pagination.pageIndex} setPageIndex={table.setPageIndex} nextPage={table.nextPage} canNextPage={table.getCanNextPage()} />
    </CardFooter>}
  </Card>;
};
export default ProductInventory;