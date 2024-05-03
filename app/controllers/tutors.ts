import { pool } from "../database/database";
import { Request, Response } from 'express';

const tutorsController = {
  getAll: async (req: Request, res: Response) => {
    try {
      const { rows } = await pool.query(
        `SELECT id, first_name, email, has_certificate, image, completed_vehicles, is_estimate 
        FROM tutors 
        WHERE display_on_website = true
        AND is_approved = true;`
      );
      res.json(rows);
    } catch (error) {
      console.error('Database error:', error); 
      res.status(500).json({ message: "An error occurred while retrieving tutors data" });
    }
  }
};

export default tutorsController;