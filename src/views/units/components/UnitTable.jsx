import React from 'react';
import DT from 'datatables.net-bs5';
import DataTable from 'datatables.net-react';
import 'datatables.net-responsive';
import ReactDOMServer from 'react-dom/server';
import { TbChevronLeft, TbChevronRight, TbChevronsLeft, TbChevronsRight } from 'react-icons/tb';

const UnitTable = ({ units = [], onEditUnit, onDeleteUnit }) => {
    DataTable.use(DT);

    const columns = [
        { title: 'Nombre', data: 'name' },
        { title: 'Simbolo', data: 'symbol' },
        { title: 'Tipo de unidad', data: 'type' },
        { title: 'Fecha de registro', data: 'created_at' },
        {
            title: 'Acciones',
            data: null,
            orderable: false,
            render: () =>
                `
        <div class="d-flex gap-1">
            <button class="btn btn-sm btn-secondary btn-edit">Editar</button>
            <button class="btn btn-sm btn-danger btn-delete">Eliminar</button>
        </div>
        `
        },
    ];

    const data = units.map((unit) => ({
        name: unit.name,
        symbol: unit.symbol,
        type: unit.type,
        created_at: new Date(unit.created_at).toLocaleDateString('es'),
        id: unit.id,
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
            [3, 'desc']
        ],
        createdRow: (row, data) => {
            const editBtn = row.querySelector('.btn-edit');
            const deleteBtn = row.querySelector('.btn-delete');

            if (editBtn) editBtn.addEventListener('click', () => onEditUnit(data));
            if (deleteBtn) deleteBtn.addEventListener('click', () => onDeleteUnit(data));
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

export default UnitTable;