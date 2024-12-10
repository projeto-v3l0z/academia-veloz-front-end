import { useState } from 'react';
import userService from '@/services/userService';
import { setUser } from '@/store/user/userSlice';

const useLoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [formErrors, setFormErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const validateForm = () => {
    let errors = {};
    if (!formData.email) {
      errors.email = 'Email é obrigatório';
    }
    if (!formData.password) {
      errors.password = 'Senha é obrigatória';
    }
    return errors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e, dispatch, Cookies) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const data = await userService.login(formData);
      Cookies.set('access_token', data.access, { expires: 1, sameSite: 'Strict' });
      console.log('data', data);
      const userData = await userService.getUserById(data.id);
      console.log('userData', userData);
      dispatch(
        setUser({
          user: userData,
          user_permissions: userData.user_permissions,
          last_login: userData.last_login,
          access_token: data.access,
        }),
      );

      setFormErrors({});
      setSuccess(true);
    } catch (error) {
      setError('Falha ao realizar o login. Verifique suas credenciais.');
      console.error('Erro de login:', error);
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    formErrors,
    success,
    loading,
    error,
    handleInputChange,
    handleSubmit,
  };
};

export default useLoginForm;
