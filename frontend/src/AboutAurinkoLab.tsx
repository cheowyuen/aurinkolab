import { useState } from 'react';
import boatImage from '/src/assets/boat.png';
import { useTranslation, Trans } from "react-i18next";

function AboutAurinkoLabSection() {
  const {t} =useTranslation()
  const [isHackathonVisible, setHackathonVisible] = useState(false);
  const [isChampionshipVisible, setChampionshipVisible] = useState(false);
  const [isTalentHubVisible, setTalentHubVisible] = useState(false);
  const [isResourceHubVisible, setResourceHubVisible] = useState(false);

  const toggleVisibility = (setState: React.Dispatch<React.SetStateAction<boolean>>) => {
    setState((prev) => !prev);
  };

  return (
    <div id="about-section" className="header-section" style={{ padding: '10px',}}>
      <div className="description-section">
        <div className="about-content-wrapper">
          <img src={boatImage} alt="Boat" className="boat-image" />
          <div className="description-text">
            <p>
              <span>{t('AurinkoLab')} :</span><br /><br />
              ⏱️{' '}
              <span
                onClick={() => toggleVisibility(setHackathonVisible)}
                style={{ cursor: 'pointer' }}
              >
                {t('20-Hour Engineering Hackathon')}
              </span>
              <br /><br />
              {isHackathonVisible && (
                <span>
                  <Trans i18nKey="about-text-1">
                  20-hour education program designed for 15-** year-olds to create their own electric-solar and hydrogen-driven vehicles.<br />
                  The program has been accepted as TET practice by the educational administration of Espoo city.<br /><br />
                  </Trans>
                </span>
              )}

              🏆{' '}
              <span
                onClick={() => toggleVisibility(setChampionshipVisible)}
                style={{ cursor: 'pointer' }}
              >
                {t('Final Championship')}
              </span>
              <br /><br />
              {isChampionshipVisible && (
                <span>
                  <Trans i18nKey="about-text-2">
                  The hackathon concludes with a final championship event - Solar Regatta or Racing - where teams showcase their innovative vehicles
                  </Trans>
                  <br /><br />
                </span>
              )}

              🌞{' '}
              <span
                onClick={() => toggleVisibility(setTalentHubVisible)}
                style={{ cursor: 'pointer' }}
              >
                {t('AurinkoLab Engineering Talent Hub')}
              </span>
              <br /><br />
              {isTalentHubVisible && (
                <span>
                  <Trans i18nKey="about-text-3">
                  Engineering Talent Hub is a community for engineering students and enthusiasts to design their own hydrogen-driven or electric-solar vehicles, using established or original designs. <br />
                  AurinkoLab experts rigorously test these solutions, integrating them into the AurinkoLab Resource Hub for future hackathons. <br />
                  Talented students are recommended to partner companies in need of skilled employees.<br /><br />
                  </Trans>
                </span>
              )}
              📚{' '}
              <span
                onClick={() => toggleVisibility(setResourceHubVisible)}
                style={{ cursor: 'pointer' }}
              >
                {t('AurinkoLab Resource Hub')}
              </span>
              <br /><br />
              {isResourceHubVisible && (
                <span>
                   <Trans i18nKey="about-text-4">
                  Access a diverse range of materials such as diagrams, manuals, and training videos.<br /><br />
                  </Trans>
                </span>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutAurinkoLabSection;
