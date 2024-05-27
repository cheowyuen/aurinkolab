import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import EducationCenters from '../src/EducationCenters';
import { BrowserRouter } from 'react-router-dom';

describe("Education centers page", () => {
    beforeEach(() => {
        window.scrollTo = jest.fn();
        render(
            <BrowserRouter>
                <EducationCenters />
            </BrowserRouter>
        );
    });

    test('Education Centers text content', async () => {

        /** Test page title */
        const title = screen.getByTestId("educationCenters-page-title");
        expect(title).toHaveTextContent("Education Centers");

        /** overview */
        expect(screen.getByText("Overview")).toBeInTheDocument();
           
        /** Instructions*/
        expect(screen.getByText("How to apply")).toBeInTheDocument();
      
       
        /** Register Form */
        expect(screen.getByText("Registration for Education Center")).toBeInTheDocument();
        expect(screen.getByRole('form')).toBeInTheDocument();
    
       
    })
});

