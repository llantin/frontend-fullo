import React, { useEffect, useState, useMemo } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Select from "react-select";
import { getItems } from "@/features/items/services/itemService";

const schema = yup.object({
  item: yup.object().required("Seleccione un artículo"),
  quantity: yup
    .number()
    .typeError("Ingrese una cantidad válida")
    .positive("La cantidad debe ser mayor a 0")
    .required("Ingrese la cantidad"),
  type: yup.string().oneOf(["ingreso", "salida"]).required("Seleccione tipo"),
  price: yup
    .number()
    .typeError("Ingrese un precio válido")
    .positive("El precio debe ser mayor a 0")
    .required("Ingrese precio"),
});

const AddEditMovementModal = ({ open, toggle, movementData, isEditable, onSave }) => {
  const { handleSubmit, register, setValue, reset, watch, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const [items, setItems] = useState([]);
  const [currentStock, setCurrentStock] = useState(0);

  const selectedItem = watch("item");
  const quantity = watch("quantity");
  const type = watch("type");

  // Calcular stock final (preview)
  const finalStock = useMemo(() => {
    if (!selectedItem || !quantity || !type) return currentStock;
    return type === "ingreso"
      ? Number(currentStock) + Number(quantity)
      : Number(currentStock) - Number(quantity);
  }, [currentStock, quantity, type, selectedItem]);

  // Cargar items al abrir modal
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await getItems();
        setItems(res.map(i => ({ value: i.id, label: i.name, stock: i.stock })));
      } catch (error) {
        console.error("Error cargando items:", error);
      }
    };
    if (open) fetchItems();
  }, [open]);

  // Setear valores cuando editemos
  useEffect(() => {
    if (movementData) {
      const itemOption = items.find(i => i.value === movementData.item_id);
      reset({
        item: itemOption || null,
        quantity: movementData.quantity,
        type: movementData.type,
        price: movementData.price,
      });
      setCurrentStock(itemOption ? itemOption.stock : 0);
    } else {
      reset({
        item: null,
        quantity: "",
        type: "",
        price: "",
      });
      setCurrentStock(0);
    }
  }, [movementData, items, reset]);

  const onSubmit = (data) => {
    const payload = {
      item_id: data.item.value,
      quantity: data.quantity,
      type: data.type,
      price: data.price,
    };
    onSave(payload);
  };

  return (
    <Modal show={open} onHide={toggle} centered>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Header>
          <Modal.Title>{isEditable ? "Editar" : "Registrar"} movimiento</Modal.Title>
          <button type="button" className="btn-close" onClick={toggle}></button>
        </Modal.Header>

        <Modal.Body>
          <Row>
            <Col sm={12}>
              {/* Select de Artículo */}
              <Form.Group className="mb-3">
                <Form.Label>Artículo</Form.Label>
                <Select
                  options={items}
                  placeholder="Seleccione un artículo"
                  value={watch("item")}
                  onChange={(option) => {
                    setValue("item", option);
                    setCurrentStock(option.stock);
                  }}
                />
                <p className="text-danger">{errors.item?.message}</p>
              </Form.Group>

              {/* Stock actual */}
              <Form.Group className="mb-3">
                <Form.Label>Stock actual</Form.Label>
                <Form.Control type="number" value={currentStock} disabled readOnly />
              </Form.Group>

              {/* Cantidad */}
              <Form.Group className="mb-3">
                <Form.Label>Cantidad</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Ingrese cantidad"
                  {...register("quantity")}
                  isInvalid={!!errors.quantity}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.quantity?.message}
                </Form.Control.Feedback>
              </Form.Group>

              {/* Tipo de movimiento */}
              <Form.Group className="mb-3">
                <Form.Label>Tipo de movimiento</Form.Label>
                <Form.Select {...register("type")} isInvalid={!!errors.type}>
                  <option value="">Seleccione...</option>
                  <option value="ingreso">Ingreso</option>
                  <option value="salida">Salida</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.type?.message}
                </Form.Control.Feedback>
              </Form.Group>

              {/* Precio */}
              <Form.Group className="mb-3">
                <Form.Label>Precio</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Ingrese precio"
                  {...register("price")}
                  isInvalid={!!errors.price}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.price?.message}
                </Form.Control.Feedback>
              </Form.Group>

              {/* Stock final preview */}
              <Form.Group className="mb-3">
                <Form.Label>Stock final (preview)</Form.Label>
                <Form.Control type="number" value={finalStock} disabled readOnly />
              </Form.Group>
            </Col>
          </Row>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="light" onClick={toggle}>Cancelar</Button>
          <Button type="submit" variant="primary">Guardar</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default AddEditMovementModal;
