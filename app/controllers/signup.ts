import { pool } from "../database/database";
import { Request, Response } from 'express';

const signupController = {
  saveData: async (req: Request, res: Response) => {
    const client = await pool.connect();
    try {
      const { first_name, last_name, email, contact_no, password, education_center_id, role, display_on_website } = req.body;
      await client.query('BEGIN');

      /** save tutor data */
      const query = `
        INSERT INTO tutors (first_name, last_name, email, contact_no, password, education_center_id, role, display_on_website)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8);`;
      const result = await pool.query(query, [first_name, last_name, email, contact_no, password, education_center_id, role, display_on_website]);

      if (result.rowCount && result.rowCount > 0) {
        await client.query('COMMIT');
        res.status(201).json({ message: "Tutor registration is successful" });
      } else {
        throw new Error("Failed to register tutor");
      }
    } catch (error) {
      /** rollback query if there is error */
      await client.query('ROLLBACK');
      console.error('Database error:', error); 
      res.status(500).json({ message: "An error occurred while saving tutor data"});
    } finally {
      client.release();
    }
  }
};

export default signupController;