
import React from 'react';

function FooterTextSection(): JSX.Element {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="footer">
        <div className="footer-text">
            <p>Copyright &copy; {currentYear} | Designed and
                Maintenance by AurinkoLab | All
                Rights Reserved</p>

            <span className="animate scroll" style={{ '--i': 1 } as React.CSSProperties}></span>
        </div>

        <div className="footer-iconTop">
            <a href="#"><i className='bx bx-up-arrow-alt'></i></a>

            <span className="animate scroll" style={{ '--i': 3 } as React.CSSProperties}></span>
        </div>
    </footer>
  );
}

export default FooterTextSection;
