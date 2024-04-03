function ContactSection(): JSX.Element {
  const calendlyLink = "https://calendly.com/aurinkolab";
  const email = "info@aurinkolab.fi";
  const phoneNumber = "+358 45 312338";
  return (
    <div id="contact-section" className="contact-section">
      <div className="contact-header-content">
        <span>***************************************************************</span>
      </div>
      <div className="contact-us-section">
        <span className="contact-text">
          Contacts:<br/>
          email: <a href={`mailto:${email}`}>{email}</a><br/><br/>
          Maria Rohnonen<br/>
          phone: {phoneNumber}.<br/>
          email: <a href={`mailto:${"maria@aurinkolab.fi"}`}>{"maria@aurinkolab.fi"}</a><br/>
        </span>
        <div className="schedule-meeting-text">
          <p> Set up a meeting:</p>
          <iframe
            src={calendlyLink}
            width="100%"
            height="300px"
          >
          </iframe>
          <br/>
        </div>
      </div>
    </div>
  );
}

export default ContactSection;