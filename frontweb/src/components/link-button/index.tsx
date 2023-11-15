import { Link } from 'react-router-dom';
import './styles.css';

type Props = {
  text: string;
  path: string;
};

const LinkButton = ({ text, path }: Props) => {
  return (
    <Link className="link-button-container" to={path}>
      {text}
    </Link>
  );
};

export default LinkButton;
