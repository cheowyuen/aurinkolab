import { pool } from "../database/database";
import { Request, Response } from 'express';
import transporter from '../utils/mailer';
import jsonwebtoken from 'jsonwebtoken';

const getTokenFrom = (request: Request) => {
    const authorization = request.get('authorization')
    if (authorization && authorization.startsWith('Bearer ')) {
        return authorization.substring(7);
    }
    return null
}  

const applyEventController = {
    applyEvent: async (req: Request, res: Response) => {
        try {
            const { userId, role, eventId  } = req.body;
            const dbColumn = (role === "tutor" ? "tutor_id" : "student_id");

            const token = getTokenFrom(req);
            if (!token) {
                return res.status(401).json({ error: 'No token provided' });
            }

            const decodedToken = jsonwebtoken.verify(token, process.env.SECRET || '');
            if (typeof decodedToken !== 'string' && 'id' in decodedToken) {
                const query = `SELECT * FROM events_students WHERE event_id = $1 AND ${dbColumn} = $2;`;
                const result = await pool.query(query, [eventId, userId])

                if (result.rowCount && result.rowCount > 0) {
                    res.status(409).json({ message: "It looks like you're already registered for this event. We look forward to your participation." });
                }
                else {
                    const insertQuery = `INSERT INTO events_students (event_id, ${dbColumn}) VALUES ($1, $2);`;
                    const insertResult = await pool.query(insertQuery, [eventId, userId]);

                    if (insertResult.rowCount && insertResult.rowCount > 0) {
                        const eventQuery = `SELECT * FROM events WHERE id = $1;`;
                        const eventResult = await pool.query(eventQuery, [eventId]);

                        if (eventResult.rowCount && eventResult.rowCount > 0) {
                            const eventDetails = eventResult.rows[0];
                            await transporter.sendMail({
                            from: '"Aurinko Lab" <admin@aurinkolab.fi>', 
                            to: "cheowyuen@gmail.com", 
                            subject: `Aurinko Lab: Event Registration Confirmation`,
                            text: `Hello!\n
                                You have successfully registered for the event!\n
                                ${eventDetails.name}\n
                                Date: ${eventDetails.date}\n
                                Place: ${eventDetails.place}\n
                                Vehicle: ${eventDetails.vehicle}\n
                                Engine: ${eventDetails.engine}\n
                                Thanks,\n
                                The Aurinko Lab Team`, 
                            html: `<p>Hello!</p>
                                </br>
                                <p>You have successfully registered for the event!</p>
                                <h2>${eventDetails.name}</h2>
                                <p>Date: ${eventDetails.date}</p>
                                <p>Place: ${eventDetails.place}</p>
                                <p>Vehicle: ${eventDetails.vehicle}</p>
                                <p>Engine: ${eventDetails.engine}</p>
                                </br>
                                <p>Thanks,</p>
                                <p>The Aurinko Lab Team</p>`, 
                            });
                        }
                    }

                    res.status(200).json({ message: "Successfully registered for event." });
                }
            }  
        } catch (error) {
            console.error('Database error:', error); 
            res.status(500).json({ message: `An error occurred during event registration.`});
        } 
    }
};

export default applyEventController;