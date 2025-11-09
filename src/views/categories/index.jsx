// src/views/categories/index.jsx
import React, { useState, useEffect } from 'react';
import { Container, Card, CardBody, Button } from 'react-bootstrap';
import { TbPlus } from 'react-icons/tb';
import PageBreadcrumb from '@/components/PageBreadcrumb';
import CategoryTable from '@/views/categories/components/CategoryTable';
import AddEditModal from '@/views/categories/components/AddEditModal';
import DeleteModal from '@/views/categories/components/DeleteModal';
import { useCategories } from '@/features/categories/hooks/useCategories';

const Index = () => {
  const { categories, loading, addCategory, editCategory, removeCategory } = useCategories();
  const [showModal, setShowModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showDelete, setShowDelete] = useState(false);

  const handleCreateCategory = () => {
    setSelectedCategory(null);
    setShowModal(true);
  };

  const handleEditCategory = (category) => {
    setSelectedCategory(category);
    setShowModal(true);
  };

  const handleDeleteCategory = (category) => {
    setSelectedCategory(category);
    setShowDelete(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedCategory(null);
  };

  const handleCloseDelete = () => {
    setShowDelete(false);
    setSelectedCategory(null);
  };

  const handleSaveCategory = async (categoryData) => {
    try {
      if (selectedCategory) {
        await editCategory(selectedCategory.id, categoryData);
      } else {
        await addCategory(categoryData);
      }
      handleCloseModal();
    } catch (error) {
      console.error('Error al guardar categoría:', error);
    }
  };

  const handleConfirmDelete = async () => {
    if (selectedCategory) {
      try {
        await removeCategory(selectedCategory.id);
        handleCloseDelete();
      } catch (error) {
        console.error('Error al eliminar categoría:', error);
      }
    }
  };

  if (loading && categories.length === 0) return <p>Cargando categorías...</p>;

  return (
    <Container fluid>
      <PageBreadcrumb title="Categorías" subtitle="Gestionar" />

      <Card className="mb-3">
        <CardBody>
          <Button variant="primary" className="mb-3" onClick={handleCreateCategory}>
            <TbPlus className="me-2" />
            Registrar categoría
          </Button>

          <CategoryTable
            categories={categories}
            onEditCategory={handleEditCategory}
            onDeleteCategory={handleDeleteCategory}
          />
        </CardBody>
      </Card>

      <AddEditModal
        open={showModal}
        toggle={handleCloseModal}
        categoryData={selectedCategory}
        isEditable={!!selectedCategory}
        onSave={handleSaveCategory}
      />

      <DeleteModal
        open={showDelete}
        toggle={handleCloseDelete}
        onConfirm={handleConfirmDelete}
        categoryName={selectedCategory?.name}
      />
    </Container>
  );
};

export default Index;
