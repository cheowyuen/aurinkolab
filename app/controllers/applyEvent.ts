import { pool } from "../database/database";
import { Request, Response } from 'express';
import transporter from '../utils/mailer';
import jsonwebtoken from 'jsonwebtoken';

const getTokenFrom = (request: Request) => {
    /** extract token from header */
    const authorization = request.get('authorization')
    if (authorization && authorization.startsWith('Bearer ')) {
        return authorization.substring(7);
    }
    return null
}  

const applyEventController = {
    applyEvent: async (req: Request, res: Response) => {
        try {
            const { userId, role, eventId, max_participants  } = req.body;
            const dbColumn = (role === "tutor" ? "tutor_id" : "student_id"); 

            const token = getTokenFrom(req); 
            if (!token) {
                return res.status(401).json({ error: 'No token provided' });
            }

            /** verify token */
            const decodedToken = jsonwebtoken.verify(token, process.env.SECRET || '');
            if (typeof decodedToken !== 'string' && 'id' in decodedToken) {
                /** check if user has registered for the event */
                const query = `SELECT * FROM events_students WHERE event_id = $1 AND ${dbColumn} = $2;`;
                const result = await pool.query(query, [eventId, userId])

                if (result.rowCount && result.rowCount > 0) {
                    res.status(409).json({ message: "It looks like you're already registered for this event. We look forward to your participation." });
                }
                else {
                    let maxReached = false;
                    if (role === "student") {
                        /** get number of participants currently registered for the event */
                        const maxQuery = `SELECT COUNT(*) AS total FROM events_students WHERE event_id = $1 AND student_id IS NOT NULL`
                        const maxResult = await pool.query(maxQuery, [eventId]);

                        /** check if maximum paritcipants is reached */
                        if (maxResult.rowCount && maxResult.rowCount > 0) {
                            maxReached = maxResult.rows[0].total >= max_participants;
                        }
                    }

                    /** if maximum participants is reached, register user to waiting list, else register user to event */
                    const dbTable = (maxReached ? "waiting_list" : "events_students");
                    const insertQuery = `INSERT INTO ${dbTable} (event_id, ${dbColumn}, registration_time, registered) VALUES ($1, $2, NOW(), ${!maxReached});`;
                    const insertResult = await pool.query(insertQuery, [eventId, userId]);

                    if (insertResult.rowCount && insertResult.rowCount > 0) {
                        /** get event info */
                        const eventQuery = `SELECT * FROM events WHERE id = $1;`;
                        const eventResult = await pool.query(eventQuery, [eventId]);

                        /** send out registration confirmation/waiting list email */
                        if (eventResult.rowCount && eventResult.rowCount > 0) {
                            const eventDetails = eventResult.rows[0];
                            const title = maxReached ? "Waiting List" : "Event Registration Confirmation";
                            const content = maxReached 
                                ? "Thank you for your interest in the event. Currently, we are at full capacity, but we have added you to our waiting list. We will notify you as soon as a spot becomes available." 
                                : "You have successfully registered for the event";

                            await transporter.sendMail({
                            from: '"Aurinko Lab" <admin@aurinkolab.fi>', 
                            to: "cheowyuen@gmail.com", 
                            subject: `Aurinko Lab: ${title}`,
                            text: `Hello!\n
                                ${content}\n
                                ${eventDetails.name}\n
                                Date: ${eventDetails.date}\n
                                Place: ${eventDetails.place}\n
                                Vehicle: ${eventDetails.vehicle}\n
                                Engine: ${eventDetails.engine}\n
                                Thanks,\n
                                The Aurinko Lab Team`, 
                            html: `<p>Hello!</p>
                                </br>
                                <p>${content}</p>
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

                    if (maxReached) {
                        res.status(200).json({ message: "Added to waiting list" });
                    } else {
                        res.status(200).json({ message: "Successfully registered for event." });
                    }
                } 
            }  
        } catch (error) {
            console.error('Database error:', error); 
            res.status(500).json({ message: `An error occurred during event registration.`});
        } 
    }
};

export default applyEventController;