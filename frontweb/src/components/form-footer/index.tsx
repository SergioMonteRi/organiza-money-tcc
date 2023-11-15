import { Link } from 'react-router-dom';

import './styles.css';

type Props = {
  textContent: string;
  textAction: string;
  redirectURL: string;
};

const FormFooter = (props: Props) => {
  const { textContent, textAction, redirectURL } = props;

  return (
    <>
      <div className="login-separator-container">
        <hr />
        <span>OU</span>
        <hr />
      </div>

      <div className="login-create-account-container">
        <p>{textContent}</p>
        <Link to={redirectURL}>{textAction}</Link>
      </div>
    </>
  );
};

export default FormFooter;
