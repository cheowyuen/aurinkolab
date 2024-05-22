import { useTranslation } from "react-i18next";

const MiddleText = () => {
  const {t} =useTranslation()
  return (
    <div className="middle">
      <div className="middle-text">
        <p>{t('middle-text')}</p>
      </div>
    </div>
  );
};

export default MiddleText;
