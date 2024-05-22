import { pool } from "../database/database";
import { Request, Response } from 'express';

const newsController = {
    addNews: async (req: Request, res: Response) => {
        try {
            const { title, image, text } = req.body;

            const query = `INSERT INTO news (title, image, news_text, date_added) VALUES ($1, $2, $3, NOW());`;
            const result = await pool.query(query, [title, image, text]);
            if (result.rowCount && result.rowCount > 0) {
                res.status(201).json({ message: `News added successfully` });
            } else {
                throw new Error(`Adding news failed`);
            }
        } catch (error) {
            console.error('Database error:', error); 
            res.status(500).json({ message: `An error occurred while adding news`});
        } 
    }
};

export default newsController;