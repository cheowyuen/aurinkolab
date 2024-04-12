import Navbar from "./Navbar";
import Home from "./Home";
import { BrowserRouter, Routes, Route } from 'react-router-dom'; //Imported these for routing purpose
import EntryTest from "./EntryTest"; //Imported EntryTest component
import AllEvents from "./AllEvents";
import EventDetails from "./EventDetails";

function App() {
  return (
    <BrowserRouter> {/* Added this for routing purpose */}
      <div>
      <Navbar />
      {/* Added routing to homepage and Test page */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/entrytest" element={<EntryTest />} />
        <Route path="/events" element={<AllEvents />} />
        <Route path="/events/:eventId" element={<EventDetails />} />
      </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
