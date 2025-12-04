import { useEffect, useState } from 'react';
import { useForm } from '../../hooks/useForm';
import formStyles from './TShirtForm.module.css';

function TShirtForm({ tshirt, onSubmit, onCancel }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const nameValidation = (name) => {
    return name.length > 2 ? '' : 'Name must be at least 3 characters long';
  };

  const priceValidation = (price) => {
    const numPrice = parseFloat(price);
    return numPrice > 0 ? '' : 'Price must be greater than 0';
  };

  const imageValidation = (image) => {
    return image.length > 5 ? '' : 'Image URL is required';
  };

  const validationRules = {
    name: (value) => nameValidation(value),
    price: (value) => priceValidation(value),
    image: (value) => imageValidation(value),
  };

  const initialValues = tshirt || { name: '', price: '', image: '' };

  const { values, handleChange, errors, reset } = useForm(
    initialValues,
    validationRules
  );

  useEffect(() => {
    if (tshirt) {
      Object.keys(tshirt).forEach((key) => {
        handleChange({ target: { name: key, value: tshirt[key] } });
      });
    }
  }, [tshirt]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Object.values(errors).some((error) => error)) {
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(values);
      reset();
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancelClick = () => {
    reset();
    if (onCancel) {
      onCancel();
    }
  };

  return (
    <form className={formStyles.form} onSubmit={handleSubmit}>
      <h2 className={formStyles.title}>
        {tshirt ? 'Edit T-Shirt' : 'Add New T-Shirt'}
      </h2>

      <label htmlFor='name'>Name</label>
      <input
        type='text'
        id='name'
        name='name'
        className={formStyles.form__text}
        onChange={handleChange}
        value={values.name}
        aria-invalid={!!errors.name}
        required
      />
      {errors.name && <p className={formStyles.error}>{errors.name}</p>}

      <label htmlFor='price'>Price</label>
      <input
        type='number'
        id='price'
        name='price'
        step='0.01'
        className={formStyles.form__text}
        onChange={handleChange}
        value={values.price}
        aria-invalid={!!errors.price}
        required
      />
      {errors.price && <p className={formStyles.error}>{errors.price}</p>}

      <label htmlFor='image'>Image URL</label>
      <input
        type='url'
        id='image'
        name='image'
        className={formStyles.form__text}
        onChange={handleChange}
        value={values.image}
        aria-invalid={!!errors.image}
        required
      />
      {errors.image && <p className={formStyles.error}>{errors.image}</p>}

      {values.image && (
        <div className={formStyles.preview}>
          <img src={values.image} alt='Preview' />
        </div>
      )}

      <div className={formStyles.actions}>
        <button
          type='submit'
          disabled={
            Object.values(errors).some((error) => error) || isSubmitting
          }
        >
          {isSubmitting ? 'Saving...' : tshirt ? 'Update' : 'Create'}
        </button>
        <button
          type='button'
          className={formStyles.cancelBtn}
          onClick={handleCancelClick}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default TShirtForm;
