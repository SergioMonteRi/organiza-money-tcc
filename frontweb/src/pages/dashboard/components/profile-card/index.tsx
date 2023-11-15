// ASSETS
import { RxAvatar } from 'react-icons/rx';

// STYLES
import './styles.css';

const ProfileCard = () => {
  return (
    <div className="dashboard-card profile-card-container">
      <RxAvatar />
      <span>Olá, Sheldon</span>
    </div>
  );
};

export default ProfileCard;
