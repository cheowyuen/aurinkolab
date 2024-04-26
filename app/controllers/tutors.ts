import { pool } from "../database/database";
import { Request, Response } from 'express';

const tutorsController = {
  getAll: async (req: Request, res: Response) => {
    try {
      let data = await pool.query(
        `SELECT * FROM tutors where display_on_website = true;`
      );
      res.json(data.rows);
    } catch (e) {
      console.log(e);
    }
  }
};

export default tutorsController;