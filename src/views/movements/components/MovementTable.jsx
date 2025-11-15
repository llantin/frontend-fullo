import React from 'react';
import DT from 'datatables.net-bs5';
import DataTable from 'datatables.net-react';
import 'datatables.net-responsive';
import ReactDOMServer from 'react-dom/server';
import { TbChevronLeft, TbChevronRight, TbChevronsLeft, TbChevronsRight } from 'react-icons/tb';

const MovementTable = ({ movements = [], onDeleteMovement }) => {
  DataTable.use(DT);

  const columns = [
    { title: 'Código de comprobante', data: 'receipt_code' },
    { title: 'Artículo', data: 'item_name' },
    { title: 'Usuario responsable', data: 'user_name' },
    { title: 'Cantidad', data: 'quantity' },
    { title: 'Unidad de medida', data: 'unit_measurement' },
    { title: 'Precio', data: 'price' },
    { title: 'Tipo de movimiento', data: 'type' },
    {
      title: 'Fecha de registro',
      data: 'created_at',
      render: function (data) {
        const date = new Date(data);
        return date.toLocaleDateString('es'); // lo que ve el usuario
      }
    },
    {
      title: 'Acciones',
      data: null,
      orderable: false,
      render: () =>
        `
        <div class="d-flex gap-1">
            <button class="btn btn-sm btn-danger btn-delete">Eliminar</button>
        </div>
        `
    },
  ];

  const data = movements.map((movement) => ({
    receipt_code: movement.receipt.receipt_code,
    item_name: movement.item.name,
    user_name: `${movement.user.person?.name || ''} ${movement.user.person?.last_name || ''}`,
    quantity: movement.quantity,
    unit_measurement: movement.receipt_detail.unit,
    price: `S/. ${movement.price}`,
    type: movement.type,
    created_at: movement.created_at,
    id: movement.id,
  }));

  const options = {
    responsive: true,
    language: {
      decimal: ",",
      thousands: ".",
      processing: "Procesando...",
      search: "Buscar:",
      lengthMenu: "Mostrar _MENU_ registros",
      info: "Mostrando _START_ a _END_ de _TOTAL_ registros",
      zeroRecords: "No se encontraron resultados",
      emptyTable: "No hay datos disponibles en la tabla",
      paginate: {
        first: ReactDOMServer.renderToStaticMarkup(<TbChevronsLeft />),
        previous: ReactDOMServer.renderToStaticMarkup(<TbChevronLeft />),
        next: ReactDOMServer.renderToStaticMarkup(<TbChevronRight />),
        last: ReactDOMServer.renderToStaticMarkup(<TbChevronsRight />),
      },
    },
    order: [
      [7, 'desc']
    ],
    createdRow: (row, data) => {
      const deleteBtn = row.querySelector('.btn-delete');

      if (deleteBtn) deleteBtn.addEventListener('click', () => onDeleteMovement(data));
    },
    initComplete: function () {
      const thead = this.api().table().header();
      if (thead) {
        thead.classList.add('thead-sm', 'text-uppercase', 'fs-xxs');
      }
    },
  };

  return (
    <DataTable
      data={data}
      columns={columns}
      options={options}
      className="table table-striped dt-responsive align-middle mb-0"
    />

  );
};

export default MovementTable;