import React from 'react';
import DT from 'datatables.net-bs5';
import DataTable from 'datatables.net-react';
import 'datatables.net-responsive';
import ReactDOMServer from 'react-dom/server';
import { TbChevronLeft, TbChevronRight, TbChevronsLeft, TbChevronsRight } from 'react-icons/tb';

const UnitConversionTable = ({ unitConversions = [], onEditUnitConversion, onDeleteUnitConversion }) => {
    DataTable.use(DT);

    const columns = [
        { title: 'Unidad comercial', data: 'comercial_unit' },
        { title: 'Unidad de medida base', data: 'base_unit' },
        { title: 'Factor de conversión', data: 'conversion_factor' },
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

    const data = unitConversions.map((unitConversion) => ({
        comercial_unit: unitConversion.comercial_unit,
        base_unit: unitConversion.base_unit,
        conversion_factor: unitConversion.conversion_factor,
        created_at: new Date(unitConversion.created_at).toLocaleDateString('es'),
        id: unitConversion.id,
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
        createdRow: (row, data) => {
            const editBtn = row.querySelector('.btn-edit');
            const deleteBtn = row.querySelector('.btn-delete');

            if (editBtn) editBtn.addEventListener('click', () => onEditUnitConversion(data));
            if (deleteBtn) deleteBtn.addEventListener('click', () => onDeleteUnitConversion(data));
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

export default UnitConversionTable;