/* eslint-disable quotes */
import { useMemo, useState } from 'react';
import Swal from 'sweetalert2';
import { TShirtForm, TShirtList } from '../components/TShirt';
import { useAuth } from '../hooks/useAuth';
import { useFetch } from '../hooks/useFetch';
import { tshirtService } from '../services/tshirtService';
import styles from './TShirts.module.css';

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/api/tshirts`;

function TShirts() {
  const { user, hasRole } = useAuth();
  const [editingTshirt, setEditingTshirt] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const isAdmin = hasRole('admin');

  const fetchOptions = useMemo(
    () => ({
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
    }),
    [user.token]
  );

  const { data, loading, error } = useFetch(
    `${API_URL}?_refresh=${refreshKey}`,
    fetchOptions
  );

  const tshirts = data?.tshirts || [];

  const refreshTshirts = () => {
    setRefreshKey((prev) => prev + 1);
  };

  const handleCreate = async (tshirtData) => {
    try {
      await tshirtService.create(tshirtData, user.token);
      refreshTshirts();
      setShowForm(false);
    } catch (err) {
      alert('Error creating t-shirt: ' + err.message);
    }
  };

  const handleUpdate = async (tshirtData) => {
    try {
      await tshirtService.update(editingTshirt.id, tshirtData, user.token);
      refreshTshirts();
      setEditingTshirt(null);
      setShowForm(false);
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
      await tshirtService.delete(id, user.token);
      refreshTshirts();
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
