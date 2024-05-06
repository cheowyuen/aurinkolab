import cors from "cors";
import express from "express";
import eventsRouter from "../routes/events";
import tutorsRouter from "../routes/tutors";
import quizRouter from "../routes/quiz";
import tutorSignupRouter from "../routes/tutorSignup";
import educationCentersRouter from "../routes/educationCenters";
import verifyEmailRouter from "../routes/verify";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/events", eventsRouter);
app.use("/tutors", tutorsRouter);
app.use("/quiz", quizRouter);
app.use("/signup", tutorSignupRouter);
app.use("/educationCenters", educationCentersRouter);
app.use("/confirmemail", verifyEmailRouter);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
