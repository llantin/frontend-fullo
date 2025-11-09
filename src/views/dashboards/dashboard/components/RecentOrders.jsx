import { Button, Card, CardBody, CardFooter, CardHeader, CardTitle, Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'react-bootstrap';
import { TbCircleFilled, TbDotsVertical, TbFileExport, TbPlus } from 'react-icons/tb';
import TablePagination from '@/components/table/TablePagination';
import { orders } from '../data';
import { createColumnHelper, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';
import { useState, useEffect } from 'react';
import DataTable from '@/components/table/DataTable';
const columnHelper = createColumnHelper();
const RecentOrders = () => {
  const columns = [columnHelper.accessor('product', {
    cell: ({
      row
    }) => <>
        <span className="text-muted fs-xs">{row.original.subtitleItem}</span>
        <h5 className="fs-base mb-0 fw-normal">{row.original.product}</h5>
      </>
  }), columnHelper.accessor('amount', {
    cell: ({
      row
    }) => <>
        <span className="text-muted fs-xs">Cantidad</span>
        <h5 className="fs-base mb-0 fw-normal">{row.original.amount}</h5>
      </>
  }), columnHelper.accessor('userImage', {
    cell: ({
      row
    }) => <>
        <span className="text-muted fs-xs">{row.original.userName}</span>
        <h5 className="fs-base mb-0 fw-normal">

          S/. {row.original.id}

        </h5>
      </>
  }), columnHelper.accessor('status', {
    cell: ({
      row
    }) => <>
        <span className="text-muted fs-xs">Tipo</span>
        <h5 className="fs-base mb-0 fw-normal">
          <TbCircleFilled className={`fs-xs text-${row.original.statusVariant}`} /> {row.original.status}
        </h5>
      </>
  }), columnHelper.accessor('date', {
    cell: ({
      row
    }) => <>
        <span className="text-muted fs-xs">Fecha</span>
        <h5 className="fs-base mb-0 fw-normal">{row.original.date}</h5>
      </>
  })];
  const [data, setData] = useState([]); // inicializamos vacío

  useEffect(() => {
    const fetchOrders = async () => {
      const result = await orders();
      setData(result);
    };
    fetchOrders();
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
        Movimientos recientes
      </CardTitle>

    </CardHeader>
    <CardBody className="p-0">
      <DataTable table={table} emptyMessage="No records found" showHeaders={false} />
    </CardBody>
    {table.getRowModel().rows.length > 0 && <CardFooter className="border-0">
      <TablePagination totalItems={totalItems} start={start} end={end} className={'pagination-sm'} showInfo itemsName="orders" previousPage={table.previousPage} canPreviousPage={table.getCanPreviousPage()} pageCount={table.getPageCount()} pageIndex={table.getState().pagination.pageIndex} setPageIndex={table.setPageIndex} nextPage={table.nextPage} canNextPage={table.getCanNextPage()} />
    </CardFooter>}
  </Card>;
};
export default RecentOrders;