import { Routes, Route } from "react-router-dom";
import DayBookInc from "./pages/BillWiseIncome.jsx";
import RentOut from "./pages/RentOut.jsx";
import Booking from "./pages/Booking.jsx";
import DayBook from "./pages/DayBook.jsx";
import SecurityReturn from "./pages/SecurityReturn";
import SecurityPending from "./pages/SecurityPending";
import Cancellation from "./pages/Cancellation";
// import Headers from './components/Header.jsx'
import Text from "./pages/Text.jsx";
import Nav from "./components/Nav.jsx";

const App = () => {
  return (


    <div className="flex w-full">
      <div>
        <Nav />
      </div>
      <div className="w-full">
        

        <Routes>
          <Route path="/" element={<DayBookInc />} />
          <Route path="/rent-out" element={<RentOut />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/day-book" element={<DayBook />} />
          <Route path="/security-return" element={<SecurityReturn />} />
          <Route path="/security-pending" element={<SecurityPending />} />
          <Route path="/cancellation" element={<Cancellation />} />
          <Route path="/Text" element={<Text />} />
        </Routes>
      </div>
    </div>


  );
};

export default App;
