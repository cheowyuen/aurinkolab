import { pool } from "../database/database";
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import { QueryResult } from 'pg';
import transporter from '../utils/mailer';

const tutorSignupController = {
  saveData: async (req: Request, res: Response) => {
    try {
      /** create token */
      const token = uuidv4();
      const { first_name, last_name, email, contact_no, password, education_center_id, role, display_on_website, regRole } = req.body;
      const dbTable = (regRole === "tutor" ? "tutors" : "students");
      const columns = (regRole === "tutor" ? ", role, display_on_website" : "");
      const values = (regRole === "tutor" ? ", $8, $9" : "");

      /** check if email exists */
      const emailQuery = `SELECT * FROM ${dbTable} WHERE email=$1`;
      const { rows } = await pool.query(emailQuery, [email]);

      if (rows.length > 0) {
        /** Email exists, cannot proceed with registration */
        res.status(409).json({ message: "Email already in use" });
      } else {
        /** encrypt password */
        const passwordHash = await bcrypt.hash(password, 10);

        /** Insert new tutor details into the database */
        const query = `
          INSERT INTO ${dbTable} (first_name, last_name, email, contact_no, password, education_center_id, date_registered, verification_token, token_expiration${columns})
          VALUES ($1, $2, $3, $4, $5, $6, current_timestamp, $7, NOW() + INTERVAL '1 day'${values});`;
        
        let result: QueryResult;
        if (regRole === "tutor") {
          result = await pool.query(query, [first_name.trim(), last_name.trim(), email.trim(), contact_no.trim(), passwordHash, education_center_id, token, role.trim(), display_on_website]);
        } else {
          result = await pool.query(query, [first_name.trim(), last_name.trim(), email.trim(), contact_no.trim(), passwordHash, education_center_id, token]);
        }

        if (result.rowCount && result.rowCount > 0) {
          const verificationLink = `http://localhost:5173/confirmemail?token=${token}&role=${regRole}`

          /** send verification email */
          const info = await transporter.sendMail({
            from: '"Aurinko Lab" <admin@aurinkolab.fi>', 
            to: "cheowyuen@gmail.com", 
            subject: "Activate your Aurinko Lab account",
            text: `Hello!\n
              Thank you for joining Aurinko Lab. Please verify your email address by clicking on the link below:\n${verificationLink}\n
              This link expires in 24 hours. If you did not create an account, you can safely ignore this email.\n
              Thanks,\n
              The Aurinko Lab Team`, 
            html: `<p>Hello!</p>
              <p>Thank you for joining Aurinko Lab. Please verify your email address by clicking on the link below:</p><a href="${verificationLink}">Verify Email</a>
              <p>This link expires in 24 hours. If you did not create an account, you can safely ignore this email.</p>
              <p>Thanks,</p>
              <p>The Aurinko Lab Team</p>`, 
          });

          if (display_on_website && regRole === "tutor") {
            const approvalLink = `http://localhost:5173/admin`

            /** send mail to admin for tutor approval to be displayed on website */
            const approvalRequest = await transporter.sendMail({
              from: '"Aurinko Lab" <admin@aurinkolab.fi>', 
              to: "admin@aurinkolab.fi", 
              subject: "Approve Aurinko Lab account",
              text: `Hello!\n
                Tutor account ${email} is awaiting approval to display information on website.\n<a href="${approvalLink}">Approve</a>\n
                Thanks,\n
                The Aurinko Lab Team`, 
              html: `<p>Hello!</p>
                <p>Tutor account ${email} is awaiting approval to display information on website.</p><a href="${approvalLink}">Approve</a>
                <p>Thanks,</p>
                <p>The Aurinko Lab Team</p>`, 
            });  
          }

          res.status(201).json({ message: `${regRole} registration is successful` });
        } else {
          throw new Error(`Failed to register ${regRole}`);
        }
      }
    } catch (error) {
      console.error('Database error:', error); 
      res.status(500).json({ message: `An error occurred while saving tutor/student data`});
    } 
  }
};

export default tutorSignupController;