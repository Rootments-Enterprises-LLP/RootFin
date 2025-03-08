import { Routes, Route } from "react-router-dom";
import DayBookInc from "./pages/BillWiseIncome.jsx";
import Datewisedaybook from "./pages/Datewisedaybook.jsx";
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
          <Route path="/datewisedaybook" element={<Datewisedaybook />} />
          <Route path="/BookingReport" element={<Booking />} />
          <Route path="/RentOutReport" element={<DayBook />} />
          <Route path="/Income&Expenses" element={<SecurityReturn />} />
          <Route path="/CashBankLedger" element={<SecurityPending />} />
          <Route path="/cancellation" element={<Cancellation />} />
          <Route path="/Text" element={<Text />} />
        </Routes>
      </div>
    </div>


  );
};

export default App;
