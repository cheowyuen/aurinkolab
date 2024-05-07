import { pool } from "../database/database";
import { Request, Response } from 'express';

const educationCentersController = {
  getAll: async (req: Request, res: Response) => {
    try {
      const { rows } = await pool.query(
        `SELECT id, name from education_centers ORDER BY name DESC;`
      );
      res.json(rows);
    } catch (error) {
      console.error('Database error:', error); 
      res.status(500).json({ message: "An error occurred while retrieving education centers data" });
    }
  }
};

export default educationCentersController;