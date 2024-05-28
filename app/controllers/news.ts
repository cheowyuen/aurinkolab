import { pool } from "../database/database";
import { Request, Response } from 'express';

const newsController = {
    addNews: async (req: Request, res: Response) => {
        try {
            const { title, image, news_text } = req.body;

            /** add news */
            const query = `INSERT INTO news (title, image, news_text, date_added) VALUES ($1, $2, $3, NOW()) RETURNING *;`;
            const result = await pool.query(query, [title, image, news_text]);
            if (result.rowCount && result.rowCount > 0) {
                res.status(201).json(result.rows[0]);
            } else {
                throw new Error(`Adding news failed`);
            }
        } catch (error) {
            console.error('Database error:', error); 
            res.status(500).json({ message: `An error occurred while adding news`});
        } 
    },

    getAll: async (req: Request, res: Response) => {
        try {
          /** get all news */
          const { rows } = await pool.query(
            `SELECT n.id, n.title, n.image, n.news_text, TO_CHAR(date_added, 'YYYY-MM-DD') AS date_added FROM news n ORDER BY n.date_added DESC;`
          );
          res.json(rows);
        } catch (error) {
          console.error('Database error:', error); 
          res.status(500).json({ message: "An error occurred while retrieving events data" });
        }
    },

    getOne: async (req: Request, res: Response) => {
      try {
        const id = req.params.id;

        /** get news info */
        const query = `SELECT id, title, image, news_text, TO_CHAR(date_added, 'YYYY-MM-DD') AS date_added FROM news WHERE id = $1;`;
        const { rows } = await pool.query(query, [id]);
  
        if (rows.length > 0) {
          res.json(rows[0]);  
        } else {
          res.status(404).json({ message: "News not found" }); 
        }
      } catch (error) {
        console.error('Database error:', error); 
        res.status(500).json({ message: "An error occurred while retrieving news data" });
      }
    }
};

export default newsController;