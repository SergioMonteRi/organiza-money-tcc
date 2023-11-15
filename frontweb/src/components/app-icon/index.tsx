import { Link } from 'react-router-dom';

import { ReactComponent as AppIconImg } from 'assets/icons/app-icon.svg';

import './styles.css';

const AppIcon = () => {
  return (
    <Link className="login-icon-container" to={'/'}>
      <AppIconImg className="nav-logo-icon" />
      <h4 className="nav-logo-text">Organiza Money</h4>
    </Link>
  );
};

export default AppIcon;
