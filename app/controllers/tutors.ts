import { pool } from "../database/database";
import { Request, Response } from 'express';

const tutorsController = {
  getAll: async (req: Request, res: Response) => {
    try {
      let data = await pool.query(
        `SELECT id, first_name, email, has_certificate, image, completed_vehicles, is_estimate FROM tutors where display_on_website = true;`
      );
      res.json(data.rows);
    } catch (e) {
      console.log(e);
    }
  }
};

export default tutorsController;