import { pool } from "../database/database";
import { Request, Response } from 'express';

const eventsController = {
  getAll: async (req: Request, res: Response) => {
    try {
      let data = await pool.query(
        `SELECT * FROM events;`
      );
      res.json(data.rows);
    } catch (e) {
      console.log(e);
    }
  },

  getOne: async (req: Request, res: Response) => {
    try {
      let id = req.params.id;
      let data = await pool.query(`SELECT * FROM events WHERE id=${id}`);
      res.json(data.rows[0]);
    } catch (e) {
      console.log(e);
    }
  },
};

export default eventsController;