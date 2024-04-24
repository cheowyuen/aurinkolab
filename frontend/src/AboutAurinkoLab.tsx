import { useState } from 'react';
import boatImage from '/src/assets/boat.png';

function AboutAurinkoLabSection() {
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
              <span>AurinkoLab :</span><br /><br />
              ⏱️{' '}
              <span
                onClick={() => toggleVisibility(setHackathonVisible)}
                style={{ cursor: 'pointer' }}
              >
                20-Hour Engineering Hackathon
              </span>
              <br /><br />
              {isHackathonVisible && (
                <span>
                  20-hour education program designed for 15-** year-olds to create their own electric-solar and hydrogen-driven vehicles.<br />
                  The program has been accepted as TET practice by the educational administration of Espoo city.<br /><br />
                </span>
              )}

              🏆{' '}
              <span
                onClick={() => toggleVisibility(setChampionshipVisible)}
                style={{ cursor: 'pointer' }}
              >
                Final Championship
              </span>
              <br /><br />
              {isChampionshipVisible && (
                <span>
                  The hackathon concludes with a final championship event - Solar Regatta or Racing - where teams showcase their innovative vehicles
                  <br /><br />
                </span>
              )}

              🌞{' '}
              <span
                onClick={() => toggleVisibility(setTalentHubVisible)}
                style={{ cursor: 'pointer' }}
              >
                AurinkoLab Engineering Talent Hub
              </span>
              <br /><br />
              {isTalentHubVisible && (
                <span>
                  Engineering Talent Hub is a community for engineering students and enthusiasts to design their own hydrogen-driven or electric-solar vehicles, using established or original designs. <br />
                  AurinkoLab experts rigorously test these solutions, integrating them into the AurinkoLab Resource Hub for future hackathons. <br />
                  Talented students are recommended to partner companies in need of skilled employees.<br /><br />
                </span>
              )}
              📚{' '}
              <span
                onClick={() => toggleVisibility(setResourceHubVisible)}
                style={{ cursor: 'pointer' }}
              >
                AurinkoLab Resource Hub
              </span>
              <br /><br />
              {isResourceHubVisible && (
                <span>
                  Access a diverse range of materials such as diagrams, manuals, and training videos.<br /><br />
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
