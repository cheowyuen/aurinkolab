import { pool } from "../database/database";
import { Request, Response } from 'express';

const latestNewsController = {
    getLatest: async (req: Request, res: Response) => {
      try {
        /** get top 3 latest news */
        const { rows } = await pool.query(
          `SELECT n.id, n.title, n.image, n.news_text, TO_CHAR(date_added, 'YYYY-MM-DD') AS date_added FROM news n ORDER BY n.date_added DESC LIMIT 3;`
        );
        res.json(rows);
      } catch (error) {
        console.error('Database error:', error); 
        res.status(500).json({ message: "An error occurred while retrieving events data" });
      }
    },
};

export default latestNewsController;