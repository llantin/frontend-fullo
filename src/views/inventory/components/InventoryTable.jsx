import React from 'react';
import DT from 'datatables.net-bs5';
import DataTable from 'datatables.net-react';
import 'datatables.net-responsive';
import ReactDOMServer from 'react-dom/server';
import { TbChevronLeft, TbChevronRight, TbChevronsLeft, TbChevronsRight } from 'react-icons/tb';

const InventoryTable = ({ inventory = [], onExportKardexItem}) => {
    DataTable.use(DT);

    const columns = [
        {
            title: 'Imagen',
            data: null,
            orderable: false,
            render: (data) => {
                const imageUrl = data.image ? `http://172.16.16.50:8000/storage/${data.image}` : '/placeholder-image.png';
                return `<img src="${imageUrl}" alt="${data.name}" class="img-thumbnail" style="width: 60px; height: 60px; object-fit: cover;">`;
            }
        },
        { title: 'Nombre', data: 'name' },
        { title: 'Descripción', data: 'description' },
        { title: 'Stock actual', data: 'stock' },
        { title: 'Unidad de medida', data: 'unit_measurement' },
        { title: 'Marca', data: 'brand' },
        { title: 'Modelo', data: 'model' },
        { title: 'Categoria', data: 'category' },
        {
            title: 'Acciones',
            data: null,
            orderable: false,
            render: () =>
                `
        <div class="d-flex gap-1">
            <button class="btn btn-sm btn-secondary btn-edit">Kardex</button>
        </div>
        `
        },
    ];

    const data = inventory.map((item) => ({
        image: item.image,
        name: item.name,
        description: item.description,
        stock: item.movements[0]?.stock || '<span class="text-muted">No definido</span>',
        brand: item.brand,
        model: item.model,
        category_id: item.category_id,
        category: item.category.name,
        unit_measurement: item.unit_measurement,
        presentation: item.presentation,
        id: item.id,
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

            if (editBtn) editBtn.addEventListener('click', () => onExportKardexItem(data));
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

export default InventoryTable;