import { pool } from "../database/database";
import { Request, Response } from 'express';
import crypto from 'crypto';
import transporter from '../utils/mailer';

const sendResetEmailController = {
  saveData: async (req: Request, res: Response) => {
    try {
      const token = crypto.randomBytes(48).toString('hex');
      const { email, role } = req.body;
      const dbTable = (role === "tutor" ? "tutors" : "students");

      const emailQuery = `SELECT * FROM ${dbTable} WHERE email=$1`;
      const { rows } = await pool.query(emailQuery, [email]);

      if (rows.length > 0) {
        /** Email exists */
        const query = `
          UPDATE ${dbTable} 
          SET reset_password_token = $1, 
            reset_token_expiration =  NOW() + INTERVAL '1 day'
          WHERE email = $2;`;
          console.log(query)
        const result = await pool.query(query, [token, email.trim()]);

        if (result.rowCount && result.rowCount > 0) {
          const resetPasswordLink = `http://localhost:5173/reset-password?token=${token}&role=${role}`
        
          const info = await transporter.sendMail({
            from: '"Aurinko Lab" <admin@aurinkolab.fi>', 
            to: "cheowyuen@gmail.com", 
            subject: "Aurinko Lab: Reset Password",
            text: `Hello!\n
              Please click on the link below to reset your password:\n${resetPasswordLink}\n
              This link expires in 24 hours. If you did not request for password reset, you can safely ignore this email.\n
              Thanks,\n
              The Aurinko Lab Team`, 
            html: `<p>Hello!</p>
              <p>Please click on the link below to reset your password:</p><a href="${resetPasswordLink}">Reset Password</a>
              <p>This link expires in 24 hours. If you did not request for password reset, you can safely ignore this email.</p>
              <p>Thanks,</p>
              <p>The Aurinko Lab Team</p>`, 
          });
        }  
      }

      res.status(200).json({ message: "If your email is registered, you will receive a link to reset your password." });
    } catch (error) {
      console.error('Database error:', error); 
      res.status(500).json({ message: `An error occurred while sending reset password email`});
    } 
  }
};

export default sendResetEmailController;