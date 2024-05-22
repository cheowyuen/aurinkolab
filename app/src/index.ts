import cors from "cors";
import express from "express";
import eventsRouter from "../routes/events";
import tutorsRouter from "../routes/tutors";
import quizRouter from "../routes/quiz";
import tutorSignupRouter from "../routes/tutorSignup";
import educationCentersRouter from "../routes/educationCenters";
import verifyEmailRouter from "../routes/verify";
import resendLinkRouter from "../routes/resendLink";
import approveTutorRouter from "../routes/approveTutor";
import LoginRouter from "../routes/login";
import sendResetEmailRouter from "../routes/sendResetEmail";
import resetPasswordRouter from "../routes/resetPassword";
import applyEventRouter from "../routes/applyEvent";
import regattaRouter from "../routes/regatta";
import adminLoginRouter from "../routes/adminLogin";
import newsRouter from "../routes/news";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/events", eventsRouter);
app.use("/tutors", tutorsRouter);
app.use("/quiz", quizRouter);
app.use("/signup", tutorSignupRouter);
app.use("/educationCenters", educationCentersRouter);
app.use("/confirmemail", verifyEmailRouter);
app.use("/resendLink", resendLinkRouter);
app.use("/approvetutor", approveTutorRouter);
app.use("/login", LoginRouter);
app.use("/send-reset-email", sendResetEmailRouter);
app.use("/reset-password", resetPasswordRouter);
app.use("/apply-event", applyEventRouter);
app.use("/regatta", regattaRouter);
app.use("/admin-login", adminLoginRouter);
app.use("/news", newsRouter);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
