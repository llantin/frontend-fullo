import React from 'react';
import DT from 'datatables.net-bs5';
import DataTable from 'datatables.net-react';
import 'datatables.net-responsive';
import ReactDOMServer from 'react-dom/server';
import { TbChevronLeft, TbChevronRight, TbChevronsLeft, TbChevronsRight } from 'react-icons/tb';

const ItemTable = ({ items = [], onEditItem, onDeleteItem }) => {
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
        { title: 'Precio estimado', data: 'price' },
        { title: 'Marca', data: 'brand' },
        { title: 'Modelo', data: 'model' },
        { title: 'Categoria', data: 'category' },
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

    const data = items.map((item) => ({
        image: item.image,
        name: item.name,
        description: item.description,
        price: item.price,
        brand: item.brand,
        model: item.model,
        category_id: item.category_id,
        category: item.category.name,
        unit_measurement: item.unit_measurement,
        presentation: item.presentation,
        minimum_stock: item.minimum_stock,
        maximum_stock: item.maximum_stock,
        created_at: new Date(item.created_at).toLocaleDateString('es'),
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
            const deleteBtn = row.querySelector('.btn-delete');

            if (editBtn) editBtn.addEventListener('click', () => onEditItem(data));
            if (deleteBtn) deleteBtn.addEventListener('click', () => onDeleteItem(data));
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

export default ItemTable;