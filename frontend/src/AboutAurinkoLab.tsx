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
              📚 AurinkoLab Resource Hub<br/><br/>
              Access a diverse range of materials such as diagrams, manuals, and training videos. Presently featuring materials for solar-electric boats and go-karts.
              Hydrogen-powered vehicles and bikes will soon be added to our lineup.<br/><br/>
              ⏱️ 20-Hour Hackathon for Engineers<br/><br/>
              20-hour education program designed for 15-21 year-olds to create their own electric-solar and hydrogen-driven vehicles.
              The program has been accepted as TET practice by the educational administration of Espoo city. Also Helsinki Business College and Interlang Education Club are interested in sending their teams to participate.<br/><br/>
              🏆 Final Championship<br/><br/>
              The hackathon concludes with a thrilling final championship event, where teams proudly showcase their innovative vehicles<br/><br/>
              🌞 AurinkoLab Engineering Talent Hub<br/><br/>
              Engineering Talent Hub is a community for engineering students and enthusiasts to design their own hydrogen-driven or electric-solar vehicles, using established or original designs. AurinkoLab experts rigorously test these solutions, integrating them into the AurinkoLab Resource Hub for future hackathons. Talented students are recommended to partner companies in need of skilled employees.<br/><br/>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutAurinkoLabSection;
