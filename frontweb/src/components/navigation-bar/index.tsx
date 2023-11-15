import { useContext, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { CgMenuGridO } from 'react-icons/cg';

// UTILS
import { getTokenData } from 'utils/token';
import { isAuthenticated } from 'utils/auth';
import { removeAuthData } from 'utils/storage';

// ASSETS
import { ReactComponent as AppIcon } from 'assets/icons/app-icon.svg';

// AUTH
import { AuthContext } from 'contex/AuthContex';

// STYLES
import './styles.css';
import 'bootstrap/js/src/collapse.js';

const NavigationBar = () => {
  const { setAuthContextData, authContextData } = useContext(AuthContext);
  const navigation = useNavigate();

  useEffect(() => {
    if (isAuthenticated()) {
      setAuthContextData({
        authenticated: true,
        tokenData: getTokenData(),
      });
    } else {
      setAuthContextData({
        authenticated: false,
      });
    }
  }, [setAuthContextData]);

  const handleLogoutClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    removeAuthData();
    setAuthContextData({
      authenticated: false,
    });
    navigation('/');
  };

  return (
    <nav className="navbar navbar-expand-md navbar-dark main-nav">
      <div className="container-fluid nav-data-container">
        <Link to="/" className="nav-logo-container">
          <AppIcon className="nav-logo-icon" />
          <h4 className="nav-logo-text">Organiza Money</h4>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#easybill-navbar"
          aria-controls="easybill-navbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <CgMenuGridO className="nav-menu-icon" />
        </button>

        <div className="collapse navbar-collapse" id="easybill-navbar">
          <ul className="navbar-nav offset-md-2 main-menu">
            <li>
              <NavLink to="/">Propósito</NavLink>
            </li>

            <div className="nav-main-menu-login-logout">
              {authContextData.authenticated ? (
                <li>
                  <a
                    href="#logout"
                    className="page-link"
                    onClick={handleLogoutClick}
                  >
                    Logout
                  </a>
                </li>
              ) : (
                <li>
                  <NavLink to="/login" className="page-link">
                    Login
                  </NavLink>
                </li>
              )}
            </div>
          </ul>
        </div>

        <div className="nav-login-logout">
          {authContextData.authenticated ? (
            <NavLink to={'/'} onClick={handleLogoutClick}>
              Sair
            </NavLink>
          ) : (
            <>
              <NavLink to="/login">Entrar</NavLink>

              <NavLink
                className="nav-login-logout-register"
                to="/user-register"
              >
                Registrar-se
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
