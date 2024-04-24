import boatImage from '/src/assets/boat.png';

function AboutAurinkoLabSection() {
  return (
    <div id="about-section" className="header-section">
      <div className="header-content">
        <span>AurinkoLab :</span>
      </div>
      <div className="description-section">
        <div className="about-content-wrapper">
          <img
            src={boatImage}
            alt="Boat"
            className="boat-image"
          />
          <div className="description-text">
            <p>
              ⏱️ 20-Hour Engineering Hackathon<br/><br/>
              20-hour education program designed for 15-** year-olds to create their own electric-solar and hydrogen-driven vehicles.<br/>
              The program has been accepted as TET practice by the educational administration of Espoo city.<br/><br/>
              🏆 Final Championship<br/><br/>
              The hackathon concludes with a final championship event - Solar Regatta or Racing - where teams showcase their innovative vehicles<br/><br/>
              🌞 AurinkoLab Engineering Talent Hub<br/><br/>
              Engineering Talent Hub is a community for engineering students and enthusiasts to design their own hydrogen-driven or electric-solar vehicles, using established or original designs. <br/>
              AurinkoLab experts rigorously test these solutions, integrating them into the AurinkoLab Resource Hub for future hackathons. <br/>
              Talented students are recommended to partner companies in need of skilled employees.<br/><br/>
              📚 AurinkoLab Resource Hub<br/><br/>
              Access a diverse range of materials such as diagrams, manuals, and training videos.<br/><br/>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutAurinkoLabSection;
