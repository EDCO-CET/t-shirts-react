/* eslint-disable quotes */
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { TShirtForm, TShirtList } from '../components/TShirt';
import { useAuth } from '../hooks/useAuth';
import { tshirtService } from '../services/tshirtService';
import styles from './TShirts.module.css';

function TShirts() {
  const { hasRole } = useAuth();
  const [editingTshirt, setEditingTshirt] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [tshirts, setTshirts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const isAdmin = hasRole('admin');

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { tshirts } = await tshirtService.getAll();
      setTshirts(tshirts);
    } catch (error) {
      setError(error.message);
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleCreate = async (tshirtData) => {
    try {
      await tshirtService.create(tshirtData);
      setShowForm(false);
      await fetchProducts();
    } catch (err) {
      alert('Error creating t-shirt: ' + err.message);
    }
  };

  const handleUpdate = async (tshirtData) => {
    try {
      await tshirtService.update(editingTshirt.id, tshirtData);
      setEditingTshirt(null);
      setShowForm(false);
      await fetchProducts();
    } catch (err) {
      alert('Error updating t-shirt: ' + err.message);
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    });

    if (!result.isConfirmed) {
      return;
    }

    try {
      await tshirtService.delete(id);
      await fetchProducts();
      await Swal.fire({
        title: 'Deleted!',
        text: 'Your t-shirt has been deleted.',
        icon: 'success',
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (err) {
      await Swal.fire({
        title: 'Error!',
        text: 'Error deleting t-shirt: ' + err.message,
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  const handleEdit = (tshirt) => {
    setEditingTshirt(tshirt);
    setShowForm(true);
  };

  const handleCancel = () => {
    setEditingTshirt(null);
    setShowForm(false);
  };

  const handleAddNew = () => {
    setEditingTshirt(null);
    setShowForm(true);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>T-Shirts Collection</h1>
        {isAdmin && !showForm && (
          <button className={styles.addBtn} onClick={handleAddNew}>
            Add New T-Shirt
          </button>
        )}
      </header>

      {isAdmin && showForm && (
        <TShirtForm
          tshirt={editingTshirt}
          onSubmit={editingTshirt ? handleUpdate : handleCreate}
          onCancel={handleCancel}
        />
      )}

      <TShirtList
        tshirts={tshirts}
        loading={loading}
        error={error}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default TShirts;
