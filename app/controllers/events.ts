import { pool } from "../database/database";
import { Request, Response } from 'express';

const eventsController = {
  getAll: async (req: Request, res: Response) => {
    try {
      /** select all events (events are categorized by start date and end date) */
      const { rows } = await pool.query(
        `SELECT 
          id, name, place, date, image,  
          CASE
            WHEN start_date <= CURRENT_DATE AND end_date >= CURRENT_DATE
              THEN 'ongoing'
            WHEN start_date > CURRENT_DATE 
              THEN 'upcoming'
            ELSE
              'archive'
          END AS status
        FROM events
        ORDER BY start_date, id;`
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

      /** get event info, including number of available spots (maximum participants - current participants registered for event) */
      const query = `
        SELECT 
          e.id, e.name, e.date, e.place, e.vehicle, e.engine, e.image, e.event_type, COALESCE(e.max_participants, 0) AS max_participants,
          COALESCE(t.first_name, '') AS tutor,
          c.name AS education_center,
          CASE
            WHEN e.start_date <= CURRENT_DATE AND e.end_date >= CURRENT_DATE
              THEN 'ongoing'
            WHEN e.start_date > CURRENT_DATE 
              THEN 'upcoming'
            ELSE
              'archive'
          END AS status,
          COALESCE(e.max_participants, 0) - (SELECT COUNT(*) FROM events_students es WHERE es.event_id = e.id) AS available_spots
        FROM events e 
        LEFT JOIN tutors t on e.tutor_id = t.id
        LEFT JOIN education_centers c on e.education_center_id = c.id
        WHERE e.id=$1
      `;
      const { rows } = await pool.query(query, [id]);

      if (rows.length > 0) {
        res.json(rows[0]);  
      } else {
        res.status(404).json({ message: "Event not found" }); 
      }
    } catch (error) {
      console.error('Database error:', error); 
      res.status(500).json({ message: "An error occurred while retrieving event data" });
    }
  }
}
export default eventsController;