import { Routes, Route } from "react-router-dom";
import BillWiseIncome from "./pages/BillWiseIncome.jsx";
import RentOut from "./pages/RentOut.jsx";
import Booking from "./pages/Booking.jsx";
import DayBook from "./pages/DayBook.jsx";
import SecurityReturn from "./pages/SecurityReturn";
import SecurityPending from "./pages/SecurityPending";
import Cancellation from "./pages/Cancellation";
import Headers from './components/Header.jsx'
import Text from "./pages/Text.jsx";

const App = () => {
  return (



    <div>
      <Headers />
      <Routes>
        <Route path="/" element={<BillWiseIncome />} />
        <Route path="/rent-out" element={<RentOut />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/day-book" element={<DayBook />} />
        <Route path="/security-return" element={<SecurityReturn />} />
        <Route path="/security-pending" element={<SecurityPending />} />
        <Route path="/cancellation" element={<Cancellation />} />
        <Route path="/Text" element={<Text />} />
      </Routes>
    </div>


  );
};

export default App;
