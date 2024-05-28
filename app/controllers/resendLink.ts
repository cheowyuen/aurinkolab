import { pool } from "../database/database";
import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import nodemailer from 'nodemailer';
import { QueryResult } from 'pg';

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secure: false, 
  auth: {
    user: "deion.casper@ethereal.email",
    pass: "ZhXnG2PtCTYhenMNs3",
  },
});

const resendLinkController = {
  resendLink: async (req: Request, res: Response) => {
    try {
      const new_token = uuidv4(); /** create new token */
      const { token, email, role } = req.body;
      const dbTable = (role === "tutor" ? "tutors" : "students");
      let query = "";
      let result: QueryResult;

      if (email === "") {
          /** update new token based on current token  */
          query = `UPDATE ${dbTable} 
          SET verification_token = $1, 
              token_expiration = NOW() + INTERVAL '1 day'
          WHERE verification_token = $2;`;
          result = await pool.query(query, [new_token, token]);
      }
      else {
          /** update new token based on email */
          query = `UPDATE ${dbTable} 
          SET verification_token = $1, 
              token_expiration = NOW() + INTERVAL '1 day'
          WHERE email = $2;`;
          result = await pool.query(query, [new_token, email]);
      }
      

      //send verification email
      if (result.rowCount && result.rowCount > 0) {
          const verificationLink = `http://localhost:5173/confirmemail?token=${new_token}&role=${role}`

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

          res.status(201).json({ message: "Verification link sent" });
      } else {
          throw new Error("Failed to send verification link");
      }
    } catch (error) {
      console.error('Database error:', error); 
      res.status(500).json({ message: "An error occurred while sending verification link"});
    } 
  }
};

export default resendLinkController;