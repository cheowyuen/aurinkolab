import { pool } from "../database/database";
import { Request, Response } from 'express';

const verifyEmailController = {
  verifyEmail: async (req: Request, res: Response) => {
    try {
      const { token, role } = req.body;
      const dbTable = (role === "tutor" ? "tutors" : "students");

      const query = `SELECT * FROM ${dbTable} WHERE verification_token = $1 AND token_expiration > NOW() AND verified = false;`;
 
      const result = await pool.query(query, [token]);
      if (result.rowCount && result.rowCount > 0) {
        const verifiedQuery = `UPDATE ${dbTable} SET verified = true, token_expiration = NOW() WHERE verification_token = $1;`;
        const verifiedResult = await pool.query(verifiedQuery, [token]);
        if (verifiedResult.rowCount && verifiedResult.rowCount > 0) {
          res.status(201).json({ message: "Email verification is successful" });
        } else {
          throw new Error("Update email verification status failed");
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

export default verifyEmailController;