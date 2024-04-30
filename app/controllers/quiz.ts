import { pool } from "../database/database";
import { Request, Response } from 'express';

const quizController = {
  saveData: async (req: Request, res: Response) => {
    const client = await pool.connect();
    try {
      const { student_id, score, totalquestions, grade } = req.body;
      await client.query('BEGIN');

      /** save quiz result */
      const quizQuery = `
        INSERT INTO quiz (student_id, score, totalquestions, grade, datetime)
        VALUES ($1, $2, $3, $4, current_timestamp);`;
      const quizResult = await pool.query(quizQuery, [student_id, score, totalquestions, grade]);

      if (quizResult.rowCount && quizResult.rowCount > 0) {
        if (grade >= 8.7) {
          /** update student's record */
          const studentsQuery = `
            UPDATE students 
            SET passedQuiz = true
            WHERE id = $1
            AND passedQuiz = false;`;
          const studentsResult = await pool.query(studentsQuery, [student_id]);

          if (studentsResult.rowCount && studentsResult.rowCount > 0) {
            /** if both queries is successful, commit query */
            await client.query('COMMIT');
            res.status(201).json({ message: "Student's result saved successfully" });
          }
          else {
            throw new Error("Failed to update student record");
          }
        } else {
          await client.query('COMMIT');
          res.status(201).json({ message: "Quiz result saved successfully" });
        }
      } else {
        throw new Error("Failed to save quiz result");
      }
    } catch (error) {
      /** rollback query if there is error */
      await client.query('ROLLBACK');
      console.error('Database error:', error); 
      res.status(500).json({ message: "An error occurred while saving quiz result"});
    } finally {
      client.release();
    }
  }
};

export default quizController;