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
import ApproveTutor from "./ApproveTutor";
import Login from "./Login";
import { AuthProvider } from './utils/AuthContext';
import SendResetEmail from "./SendResetEmail";
import ResetPassword from "./ResetPassword";
import AdminLogin from "./AdminLogin";
import AddNews from "./AddNews";
import AdminDashboard from "./AdminDashboard";
import AdminRoute from './AdminRoute';
import AdminLoginRoute from './AdminLoginRoute';
import ConfirmationPartners from './confirmationPartners';


function App() {
  return (
    <AuthProvider>
      <BrowserRouter> 
        <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/entrytest" element={<EntryTest />} />
          <Route path="/events" element={<AllEvents />} />
          <Route path="/events/:eventId" element={<EventDetails />} />
          <Route path="/educationcenters" element={<EducationCenters />} />
          <Route path="/tutors" element={<Tutors />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/partnersregistration" element={<PartnersRegistration />} />
          <Route path="/confirmationpartners" element={<ConfirmationPartners />} />
          <Route path="/verifyemail" element={<VerifyEmail />} />
          <Route path="/confirmemail" element={<ConfirmEmail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/request-reset" element={<SendResetEmail />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/admin" element={<AdminLoginRoute><AdminLogin /></AdminLoginRoute>} />
          <Route path="/admin-panel" element={<AdminRoute><AdminDashboard /></AdminRoute>}>
            <Route index element={<ApproveTutor />} />
            <Route path="approve-tutor" element={<ApproveTutor />} />
            <Route path="news">
                <Route path="add" element={<AddNews />} />
            </Route>
          </Route>
        </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
