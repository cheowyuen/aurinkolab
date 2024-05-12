import { pool } from "../database/database";
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';

const LoginController = {
  login: async (req: Request, res: Response) => {
    try {
      const { email, password, role} = req.body;
      const dbTable = (role === "tutor" ? "tutors" : "students");

      const accountQuery = `SELECT * FROM ${dbTable} WHERE email=$1`;
      const { rows } = await pool.query(accountQuery, [email]);

      if (rows.length === 0) {
        res.status(401).json({ message: "Invalid email or password" });
      } else {
        const passwordCorrect = await bcrypt.compare(password, rows[0].password);

        if (passwordCorrect) {
            const userForToken = {
                id: rows[0].id,
            }
            
            if (!process.env.SECRET) {
                throw new Error('SECRET environment variable not set');
            }

            const token = jsonwebtoken.sign(userForToken, process.env.SECRET)
            
            res
                .status(200)
                .send({ token })
        }
        else {
            res.status(401).json({ message: "Invalid email or password" });
        }
      }
    } catch (error) {
      console.error('Database error:', error); 
      res.status(500).json({ message: `An error occurred while logging in`});
    } 
  }
};

export default LoginController;