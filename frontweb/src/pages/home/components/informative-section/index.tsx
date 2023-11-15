// ASSETS
import './styles.css';
import LinkButton from 'components/link-button/index';

type Props = {
  imgPath: string;
  title: string;
  subtitle: string;
  backgroundChange?: boolean;
  hasButton?: boolean;
};

const InformativeSection = (props: Props) => {
  const { imgPath, title, subtitle, backgroundChange, hasButton } = props;

  return (
    <div
      className={`information-section-container ${
        backgroundChange ? 'bg-secondary reverse' : ''
      }`}
    >
      <div className="information-section-img-container">
        <img
          className="information-section-img"
          src={imgPath}
          alt="information section analysis money"
        />
      </div>
      <div className="information-section-text">
        <h1 className={backgroundChange ? 'text-start' : ''}>{title}</h1>
        <p className={backgroundChange ? 'text-start' : ''}>{subtitle}</p>
        {hasButton && <LinkButton text="Acessar aplicativo" path="/login" />}
      </div>
    </div>
  );
};

export default InformativeSection;
