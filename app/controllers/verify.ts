import { pool } from "../database/database";
import { Request, Response } from 'express';

const verifyEmailController = {
  verifyEmail: async (req: Request, res: Response) => {
    try {
      const { token } = req.body;

      const query = `SELECT * FROM tutors WHERE verification_token = $1 AND token_expiration > NOW();`;
 
      const result = await pool.query(query, [token]);
      if (result.rowCount && result.rowCount > 0) {
        const verifiedQuery = `UPDATE tutors SET verified = true WHERE verification_token = $1;`;
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