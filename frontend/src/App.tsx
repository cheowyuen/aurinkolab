import Navbar from "./Navbar";
import Home from "./Home";
import { BrowserRouter, Routes, Route } from 'react-router-dom'; //Imported these for routing purpose
import EntryTest from "./EntryTest"; //Imported EntryTest component
import AllEvents from "./AllEvents";
import EventDetails from "./EventDetails";
import EducationCenters from "./EducationCenters";
import Tutors from "./Tutors";
import Signup from "./Signup";
import PartnersRegistration from "./PartnersRegistration";
import VerifyEmail from "./VerifyEmail";
import ConfirmEmail from "./ConfirmEmail";
import Admin from "./Admin";
import Login from "./Login";
import { AuthProvider } from './utils/AuthContext';
import SendResetEmail from "./SendResetEmail";
import ResetPassword from "./ResetPassword";
import Regatta from "./Regatta";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter> {/* Added this for routing purpose */}
        <div>
        <Navbar />
        {/* Added routing to homepage and Test page */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/entrytest" element={<EntryTest />} />
          <Route path="/events" element={<AllEvents />} />
          <Route path="/events/:eventId" element={<EventDetails />} />
          <Route path="/educationcenters" element={<EducationCenters />} />
          <Route path="/tutors" element={<Tutors />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/partnersregistration" element={<PartnersRegistration />} />
          <Route path="/verifyemail" element={<VerifyEmail />} />
          <Route path="/confirmemail" element={<ConfirmEmail />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/login" element={<Login />} />
          <Route path="/request-reset" element={<SendResetEmail />} />
          <Route path="/regatta" element={<Regatta />} />
        </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
