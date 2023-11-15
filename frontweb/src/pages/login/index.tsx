import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { bouncy } from 'ldrs';

// UTILS
import { getTokenData } from 'utils/token';
import { saveAuthData } from 'utils/storage';
import { LoginRequest } from 'utils/types/request-types';
import { requestBackendLogin } from 'utils/requests/login';

// AUTH
import { AuthContext } from 'contex/AuthContex';

// COMPONENTS
import AppIcon from 'components/app-icon';
import ArtBanner from 'components/art-banner';
import FormFooter from 'components/form-footer';

import './styles.css';

bouncy.register();

const Login = () => {
  const navigate = useNavigate();

  const { setAuthContextData } = useContext(AuthContext);

  const [hasLoginError, setHasLoginError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequest>();

  const onSubmit = (formData: LoginRequest) => {
    setIsLoading(true);

    requestBackendLogin(formData)
      .then((response) => {
        saveAuthData(response.data);
        setAuthContextData({
          authenticated: true,
          tokenData: getTokenData(),
        });
        navigate('/dashboard');
      })
      .catch(() => {
        setHasLoginError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="login-container">
      <div className="login-content-container">
        <AppIcon />

        {hasLoginError && (
          <div className="alert alert-danger">Erro ao tentar efetuar login</div>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="login-form-field-container mb-3">
            <label className="login-form-field-label" htmlFor="username">
              Email
            </label>
            <input
              {...register('username', {
                required: 'Campo obrigatório',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Email inválido',
                },
              })}
              type="text"
              className={`login-form-field-input ${
                errors.username ? 'is-invalid' : ''
              }`}
              placeholder="Email"
              name="username"
            />
            <div className="invalid-feedback d-block">
              {errors.username?.message}
            </div>
          </div>

          <div className="login-form-field-container">
            <label className="login-form-field-label" htmlFor="username">
              Senha
            </label>

            <input
              {...register('password', {
                required: 'Campo obrigatório',
              })}
              type="password"
              className={`login-form-field-input  ${
                errors.password ? 'is-invalid' : ''
              }`}
              placeholder="Senha"
              name="password"
            />
            <div className="invalid-feedback d-block">
              {errors.password?.message}
            </div>
          </div>

          {isLoading ? (
            <div className="login-form-button">
              <l-bouncy size="45" speed="1.75" color="white" />
            </div>
          ) : (
            <button className="login-form-button">Entrar</button>
          )}
        </form>

        <FormFooter
          textAction="Registre-se aqui "
          textContent="Não tem uma conta?"
          redirectURL="/user-register"
        />
      </div>

      <ArtBanner />
    </div>
  );
};

export default Login;
