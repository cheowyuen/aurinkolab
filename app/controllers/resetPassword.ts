import { pool } from "../database/database";
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';

const resetPasswordController = {
  resetPassword: async (req: Request, res: Response) => {
    try {
      const { token, role, password } = req.body;
      const dbTable = (role === "tutor" ? "tutors" : "students");

      /** verify token is valid */
      const query = `SELECT * FROM ${dbTable} WHERE reset_password_token = $1 AND reset_token_expiration > NOW() AND verified = true;`;

      const result = await pool.query(query, [token]);
      if (result.rowCount && result.rowCount > 0) {
        /** encrypt new password */
        const passwordHash = await bcrypt.hash(password, 10);

        /** save new password */
        const resetQuery = `UPDATE ${dbTable} SET password = $1, reset_token_expiration = NOW() WHERE reset_password_token = $2;`;
        const verifiedResult = await pool.query(resetQuery, [passwordHash, token]);
        if (verifiedResult.rowCount && verifiedResult.rowCount > 0) {
          res.status(201).json({ message: "Reset password is successful" });
        } else {
          throw new Error("Reset password failed");
        }
      } else {
        throw new Error("Invalid or expired verification link");
      }
    } catch (error) {
      console.error('Database error:', error); 
      res.status(500).json({ message: "An error occurred while processing your request" });
    }
  }
};

export default resetPasswordController;