import { pool } from "../database/database";
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jsonwebtoken from 'jsonwebtoken';

const adminLoginController = {
  login: async (req: Request, res: Response) => {
    try {
      const { username, password} = req.body;

      const accountQuery = `SELECT * FROM admin WHERE username=$1`;
      const { rows } = await pool.query(accountQuery, [username]);

      if (rows.length === 0) {
        res.status(401).json({ message: "Invalid username or password" });
      } else {
        const passwordCorrect = await bcrypt.compare(password, rows[0].password);

        if (passwordCorrect) {
          const id = rows[0].id;
            const userForToken = {id};
            
            if (!process.env.SECRET) {
                throw new Error('SECRET environment variable not set');
            }

            const token = jsonwebtoken.sign(userForToken, process.env.SECRET)
           
            res
                .status(200)
                .send({ token, role: "admin", id })
        }
        else {
            res.status(401).json({ message: "Invalid username or password" });
        }
      }
    } catch (error) {
      console.error('Database error:', error); 
      res.status(500).json({ message: `An error occurred while logging in`});
    } 
  }
};

export default adminLoginController;