// COMPONENTS
import InformativeSection from './components/informative-section';

// ASSETS
import MainImage from 'assets/images/chasing-money.svg';
import FirstSectionImg from 'assets/images/chart-money-analysis.svg';
import FourthSectionImg from 'assets/images/business-man-in-spaceship.svg';
import ThirdSectionImg from 'assets/images/pie-chart.svg';
import SecondSectionImg from 'assets/images/carrying-money.svg';

// TEXTS
import {
  firstInformativeSectionSubtitle,
  firstInformativeSectionTitle,
  fourthInformativeSectionSubtitle,
  fourthInformativeSectionTitle,
  mainInformationSectionSubtitle,
  mainInformationSectionTitle,
  secondInformativeSectionSubtitle,
  secondInformativeSectionTitle,
  thirdInformativeSectionSubtitle,
  thirdInformativeSectionTitle,
} from 'utils/texts';

// STYLES
import './styles.css';
import NavigationBar from 'components/navigation-bar';

const Home = () => {
  return (
    <div className="home-container">
      <NavigationBar />

      <div className="home-grid-container">
        <InformativeSection
          imgPath={MainImage}
          title={mainInformationSectionTitle}
          subtitle={mainInformationSectionSubtitle}
          hasButton
        />
        <InformativeSection
          imgPath={SecondSectionImg}
          title={firstInformativeSectionTitle}
          subtitle={firstInformativeSectionSubtitle}
          backgroundChange
        />
      </div>

      <div className="home-grid-container">
        <InformativeSection
          imgPath={FirstSectionImg}
          title={secondInformativeSectionTitle}
          subtitle={secondInformativeSectionSubtitle}
        />
        <InformativeSection
          imgPath={ThirdSectionImg}
          title={thirdInformativeSectionTitle}
          subtitle={thirdInformativeSectionSubtitle}
          backgroundChange
        />
      </div>

      <div className="home-last-section-container">
        <InformativeSection
          imgPath={FourthSectionImg}
          title={fourthInformativeSectionTitle}
          subtitle={fourthInformativeSectionSubtitle}
          hasButton
        />
      </div>
    </div>
  );
};

export default Home;
