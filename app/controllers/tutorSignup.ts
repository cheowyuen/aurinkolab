import { pool } from "../database/database";
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  //host: "email-smtp.us-east-1.amazonaws.com",
  host: "smtp.ethereal.email",
  port: 587,
  secure: false, /** Use `true` for port 465, `false` for all other ports */
  auth: {
    user: "deion.casper@ethereal.email",
    pass: "ZhXnG2PtCTYhenMNs3",
  },
});

const tutorSignupController = {
  saveData: async (req: Request, res: Response) => {
    try {
      const token = uuidv4();
      const { first_name, last_name, email, contact_no, password, education_center_id, role, display_on_website } = req.body;

      const emailQuery = `SELECT * FROM tutors WHERE email=$1`;
      const { rows } = await pool.query(emailQuery, [email]);

      if (rows.length > 0) {
        /** Email exists, cannot proceed with registration */
        res.status(409).json({ message: "Email already in use" });
      } else {
        const passwordHash = await bcrypt.hash(password, 10);

        /** Insert new tutor details into the database */
        const query = `
          INSERT INTO tutors (first_name, last_name, email, contact_no, password, education_center_id, role, display_on_website, date_registered, verification_token, token_expiration)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, current_timestamp, $9, NOW() + INTERVAL '1 day');`;
        const result = await pool.query(query, [first_name, last_name, email, contact_no, passwordHash, education_center_id, role, display_on_website, token]);

        if (result.rowCount && result.rowCount > 0) {
          const verificationLink = `http://localhost:5173/confirmemail?token=${token}`

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

          if (display_on_website) {
            const approvalLink = `http://localhost:5173/admin`

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

          res.status(201).json({ message: "Tutor registration is successful" });
        } else {
          throw new Error("Failed to register tutor");
        }
      }
    } catch (error) {
      console.error('Database error:', error); 
      res.status(500).json({ message: "An error occurred while saving tutor data"});
    } 
  }
};

export default tutorSignupController;