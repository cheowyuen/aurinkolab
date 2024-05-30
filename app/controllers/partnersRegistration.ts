import { pool } from "../database/database";
import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { QueryResult } from 'pg';
import transporter from '../utils/mailer';
import path from 'path';  

const partnersController = {
  saveData: async (req: Request, res: Response) => {
    try {
      const { companyName, emailAddress } = req.body;
    

      const emailQuery = `SELECT * FROM partners WHERE email=$1`;
      const { rows } = await pool.query(emailQuery, [emailAddress]);

      if (rows.length > 0) {
        console.log(rows)
        /** Email exists, cannot proceed with registration */
        res.status(409).json({ message: "Email has already requested the presentation" });
      } else {
        
        /** Insert new tutor details into the database */
        const query = `
          INSERT INTO partners (company_name, email)
          VALUES ($1, $2);`;
        
        
        const result: QueryResult = await pool.query(query, [companyName, emailAddress]);

        if (result.rowCount && result.rowCount > 0) {

          const pdfPath = path.join(__dirname, '../utils/AurinkoLab_ sponsorship_opportunities.pdf');  // Specify the correct path to your PDF file
          console.log(pdfPath)
          const info = await transporter.sendMail({
            from: '"Aurinko Lab" <admin@aurinkolab.fi>', 
            to: "cheowyuen@gmail.com", 
            subject: "Sponsorship Opportunities",
            text: `Hello!\n
    
              Thank you for your interest in collaborating and forming alliances with Aurinkolab. Attached you can find our presentation on how to become a partner of Aurinkolab.
              \n
              Let's schedule a meeting!\n
              Let us know your queries.,\n
              The Aurinko Lab Team`, 
            html: `<p>Hello!</p>
              <p>Thank you for your interest in collaborating and forming alliances with Aurinkolab. Attached you can find our presentation on how to become a partner of Aurinkolab.</p>
              <p>Let's schedule a meeting!</p>
              <p>Let us know your queries.,</p>
              <p>Thanks,</p>
              <p>The Aurinko Lab Team</p>`, 
              attachments: [
                {
                  filename: 'AurinkoLab_ sponsorship_opportunities.pdf',
                  path: pdfPath,
                  contentType: 'application/pdf'   
                }
              ]
            });
        
            return res.status(200).json({ message: "Presentation requested successfully" });
        } else {
          throw new Error(`Failed to request the presentation`);
        }
      }
    } catch (error) {
      console.error('Database error:', error); 
      res.status(500).json({ message: `An error occurred while saving the partners request`});
    } 
  }
};

export default partnersController;