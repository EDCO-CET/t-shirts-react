import { useState } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import formStyles from './ContactForm.module.css';

function ContactForm() {
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const showSwal = () => {
    withReactContent(Swal).fire({
      position: 'top-end',
      icon: 'success',
      title: 'Your work has been saved',
      showConfirmButton: false,
      timer: 4000,
    });
  };

  const emailValidation = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const nameValidation = (name) => {
    return name.length > 3;
  };

  const messageValidation = (message) => {
    return message.length > 10;
  };

  const validateForm = () => {
    const newErrors = {};
    if (!nameValidation(formData.name)) {
      newErrors.name = 'Name must be at least 3 characters long';
    }
    if (!emailValidation(formData.email)) {
      newErrors.email = 'Email is not valid';
    }
    if (!messageValidation(formData.message)) {
      newErrors.message = 'Message must be at least 10 characters long';
    }
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    const newErrors = validateForm();
    setErrors(newErrors);

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    console.log('Form Data:', formData);
    try {
      await new Promise((resolve) => setTimeout(resolve, 4000));
      showSwal();
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      message: '',
    });
  };

  return (
    <form className={formStyles.form} onSubmit={handleSubmit}>
      <label htmlFor='name'>Name</label>
      <input
        type='text'
        id='name'
        name='name'
        className={formStyles.form__text}
        onChange={handleChange}
        value={formData.name}
        aria-invalid={!!errors.name}
      />
      {errors.name && <p className={formStyles.error}>{errors.name}</p>}
      <label htmlFor='email'>Email</label>
      <input
        type='email'
        id='email'
        name='email'
        className={formStyles.form__text}
        onChange={handleChange}
        value={formData.email}
        aria-invalid={!!errors.email}
      />
      {errors.email && <p className={formStyles.error}>{errors.email}</p>}
      <label htmlFor='message'>Message</label>
      <textarea
        id='message'
        name='message'
        className={formStyles.form__text}
        rows='5'
        onChange={handleChange}
        value={formData.message}
        aria-invalid={!!errors.message}
      ></textarea>
      {errors.message && <p className={formStyles.error}>{errors.message}</p>}
      <button
        type='submit'
        disabled={Object.values(errors).some((error) => error) || isSubmitting}
      >
        Send
      </button>
      {isSubmitting && <p>Sending...</p>}
    </form>
  );
}

export default ContactForm;
