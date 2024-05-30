import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import PartnerRegistration from '../src/PartnersRegistration'; 
import { BrowserRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from "../i18nForTests";
import { languages } from './../language';
import { getExpectedText } from '../src/utils/testUtils';

/** Mock for useNavigate hook */
const mockNavigate = jest.fn();

// Mock the react-router-dom library
jest.mock('react-router-dom', () => {
  const actualNav = jest.requireActual('react-router-dom');
  return {
    ...actualNav,
    useNavigate: () => mockNavigate,
  };
});

const changeLanguageAndRender = async (lang) => {
  await i18n.changeLanguage(lang);
  return render(
    <BrowserRouter>
      <I18nextProvider i18n={i18n}>
        <PartnerRegistration /> 
      </I18nextProvider>
    </BrowserRouter>
  );
};

languages.forEach((lang) => {
  describe(`PartnerRegistration Component in ${lang}`, () => {
    beforeEach(async () => {
      await changeLanguageAndRender(lang);
    });

    test('Check field names', async () => {
      window.scrollTo = jest.fn();

      

      /** Test partner description */
    const description = screen.getByTestId("partner-description");
    expect(description).toHaveTextContent(getExpectedText('partner-description', lang));
         /** Test email field */
    const email = screen.getByTestId("Email Address");
    expect(email).toHaveTextContent(getExpectedText('Email Address', lang));

        /** Test company name field */
    const name = screen.getByTestId("Company Name");
    expect(name).toHaveTextContent(getExpectedText('Company Name', lang));

        /** Test submit button  */
    const button = screen.getByTestId("Send me the presentation");
    expect(button).toHaveTextContent(getExpectedText('Send me the presentation', lang));
        
        
      
    });
  });
});
