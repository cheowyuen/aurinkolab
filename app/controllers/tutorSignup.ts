import { pool } from "../database/database";
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';

const tutorSignupController = {
  saveData: async (req: Request, res: Response) => {
    try {
      const { first_name, last_name, email, contact_no, password, education_center_id, role, display_on_website } = req.body;

      const emailQuery = `SELECT * FROM tutors WHERE email=$1`;
      const { rows } = await pool.query(emailQuery, [email]);

      if (rows.length > 0) {
        /** Email exists, cannot proceed with registration */
        res.status(409).json({ message: "Email already in use" });
      } else {
        const passwordHash = await bcrypt.hash(password, 10);

        // Insert new tutor details into the database
        const query = `
          INSERT INTO tutors (first_name, last_name, email, contact_no, password, education_center_id, role, display_on_website, date_registered)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, current_timestamp);`;
        const result = await pool.query(query, [first_name, last_name, email, contact_no, passwordHash, education_center_id, role, display_on_website]);

        if (result.rowCount && result.rowCount > 0) {
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