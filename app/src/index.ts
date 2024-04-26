import cors from "cors";
import express from "express";
import eventsRouter from "../routes/events";
import tutorsRouter from "../routes/tutors";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/events", eventsRouter);
app.use("/tutors", tutorsRouter);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
