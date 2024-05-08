import { pool } from "../database/database";
import { Request, Response } from 'express';

const tutorsController = {
  getAll: async (req: Request, res: Response) => {
    try {
      const { rows } = await pool.query(
        `SELECT t.id, t.first_name || ' ' || t.last_name AS tutor_name, t.email, t.contact_no, e.name as education_center, t.role 
        FROM tutors t
        LEFT JOIN education_centers e ON e.id = t.education_center_id
        WHERE t.display_on_website = true
        AND t.is_approved = false
        AND t.is_rejected = false;`
      );
      res.json(rows);
    } catch (error) {
      console.error('Database error:', error); 
      res.status(500).json({ message: "An error occurred while retrieving tutors pending approval" });
    }
  },
  approveTutor: async (req: Request, res: Response) => {
    try {
      const { id, action } = req.body;

      const fieldName = (action === "approve" ? "is_approved" : "is_rejected")
      const query = `UPDATE tutors SET ${fieldName} = true WHERE id = ANY($1::int[]);`;
      const result = await pool.query(query, [id]);
      if (result.rowCount && result.rowCount > 0) {
        res.status(201).json({ message: "Tutor approved successfully" });
      } else {
        throw new Error("Approve tutor failed");
      }
    } catch (error) {
      console.error('Database error:', error); 
      res.status(500).json({ message: "An error occurred while approving tutor" });
    }
  }
};

export default tutorsController;