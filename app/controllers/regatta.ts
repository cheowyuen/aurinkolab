import { pool } from "../database/database";
import { Request, Response } from 'express';
import transporter from '../utils/mailer';

const regattaController = {
    saveData: async (req: Request, res: Response) => {
        try {
            const { event_id, vehicle_name, team_leader, email, contact_no, team_logo } = req.body;

            const emailQuery = `SELECT * FROM regatta_teams WHERE email=$1`;
            const { rows } = await pool.query(emailQuery, [email]);

            if (rows.length > 0) {
                /** Email exists, cannot proceed with registration */
                res.status(409).json({ message: "Email already registered with this event." });
            } else {
                /** Insert regatta details into the database */
                const query = `
                    INSERT INTO regatta_teams (event_id, vehicle_name, team_leader, email, contact_no, team_logo)
                    VALUES ($1, $2, $3, $4, $5, '/src/assets/boat-icon.png');`;
                const result = await pool.query(query, [event_id, vehicle_name.trim(), team_leader.trim(), email.trim(), contact_no.trim()]);
            
                if (result.rowCount && result.rowCount > 0) {
                    const eventQuery = `SELECT * FROM events WHERE id = $1;`;
                    const eventResult = await pool.query(eventQuery, [event_id]);

                    if (eventResult.rowCount && eventResult.rowCount > 0) {
                        const eventDetails = eventResult.rows[0];
                        await transporter.sendMail({
                            from: '"Aurinko Lab" <admin@aurinkolab.fi>', 
                            to: "cheowyuen@gmail.com", 
                            subject: "Aurinko Lab: Event Registration Confirmation",
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
            
                    res.status(201).json({ message: `Registration is successful` });
                } else {
                    throw new Error(`Registration failed`);
                }
            }
        } catch (error) {
            console.error('Database error:', error); 
            res.status(500).json({ message: `An error occurred during regatta registration`});
        } 
    }
};

export default regattaController;