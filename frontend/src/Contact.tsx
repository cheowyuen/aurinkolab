
import { useTranslation } from "react-i18next";

function ContactSection(): JSX.Element {
  const {t} =useTranslation()
  const calendlyLink = "https://calendly.com/aurinkolab";
  const email = "info@aurinkolab.fi";
  const phoneNumber = "+358 45 312338";
  return (
    <div id="contact-section" className="contact-section">
      <div className="contact-header-content">
    </div>
    <div className="contact-us-section">
        <span className="contact-text">
          <p data-testid="Contacts">{t('Contacts')}:</p><br/>
          <p data-testid="email">{t('email')}</p>: <a href={`mailto:${email}`}>{email}</a><br/><br/>
          Maria Rohnonen<br/>
          <p data-testid="phone">{t('phone')}</p>: {phoneNumber}.<br/>
          <p data-testid="email">{t('email')}</p>: <a href={`mailto:${"maria@aurinkolab.fi"}`}>{"maria@aurinkolab.fi"}</a><br/>
        </span>
        <div className="schedule-meeting-text">
          <p data-testid="meeting"> {t('meeting')}:</p>
          <iframe
            src={calendlyLink}
            width="100%"
            height="300px"
          >
          </iframe><br/>
        </div>
      </div>
    </div>
  );
}

export default ContactSection;
