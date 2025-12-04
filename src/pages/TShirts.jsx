import { useState, useMemo } from 'react';
import { TShirtForm, TShirtList } from '../components/TShirt';
import { useAuth } from '../hooks/useAuth';
import { useFetch } from '../hooks/useFetch';
import { tshirtService } from '../services/tshirtService';
import styles from './TShirts.module.css';

const API_URL = 'http://localhost:3000/api/tshirts';

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
    if (!window.confirm('Are you sure you want to delete this t-shirt?')) {
      return;
    }

    try {
      await tshirtService.delete(id, user.token);
      refreshTshirts();
    } catch (err) {
      alert('Error deleting t-shirt: ' + err.message);
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
