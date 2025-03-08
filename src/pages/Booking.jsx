

import { useState } from "react";
// import Select from "react-select";
// import Head from "../components/Head";
import Header from "../components/Header";

// const options = [
//     { value: "all", label: "All" },
//     { value: "balance_due", label: "Balance Due Collected" },
//     { value: "security_received", label: "Security Received" },
//     { value: "booking_advance", label: "Booking Advance" }
// ];

// Sample JSON Data
const jsonData = [
    { date: "01-02-2025", Bill: 12, Quantity: 40, Advance: 30000, BillValue: 400000 },
    { date: "01-02-2025", Bill: 12, Quantity: 40, Advance: 25000, BillValue: 400000 },
    { date: "01-02-2025", Bill: 12, Quantity: 40, Advance: 55000, BillValue: 400000 }
];
const Booking = () => {
    //  const [selectedCategory, setSelectedCategory] = useState(null);
    const [tableData, setTableData] = useState(jsonData); // Load JSON Data
    console.log(tableData);

    console.log(setTableData);
    return (
        <div>
            <Header title={'Booking Report'}/>
            {/* <div className="border border-gray-200 shadow-lg rounded-md mx-10 mt-10">
                <div className="w-full">
                    <Head />
                </div>
                <div className="flex ml-10 gap-6 mt-5">
                    <div className="flex flex-col">
                        <label>From <span className="text-red-500">*</span></label>
                        <input type="date" className="border w-52 p-2 rounded-md border-gray-400" />
                    </div>

                    <div className="flex flex-col">
                        <label>To <span className="text-red-500">*</span></label>
                        <input type="date" className="border w-52 p-2 rounded-md border-gray-400" />
                    </div>

                   

                    <div className="h-10 mt-6 cursor-pointer px-4 py-2 rounded-md text-white bg-blue-600 flex items-center ">
                        <button className="cursor-pointer ">Show Report</button>
                    </div>
                </div>

                <div className="border border-gray-400 rounded-md mt-6 mx-10 mb-10 overflow-hidden">
                    <table className="rounded-md table-auto w-full border-collapse border border-gray-300">
                        <thead className="rounded-md">
                            <tr className="bg-gray-100 text-center">
                                <th className="border border-gray-300 px-4 py-2">Date</th>
                                <th className="border border-gray-300 px-4 py-2">No. of Bills</th>
                                <th className="border border-gray-300 px-4 py-2">Quantity</th>
                                <th className="border border-gray-300 px-4 py-2">Advance</th>

                                <th className="border border-gray-300 px-4 py-2">Bill Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableData.map((item, index) => (
                                <tr key={index} className={index % 2 === 0 ? "bg-gray-50 text-center" : "text-center"}>
                                    <td className="border border-gray-300 px-4 py-2">{item.date}</td>
                                    <td className="border border-gray-300 px-4 py-2">{item.Bill}</td>
                                    <td className="border border-gray-300 px-4 py-2">{item.Quantity}</td>
                                    <td className="border border-gray-300 px-4 py-2">{item.Advance}</td>

                                    <td className="border border-gray-300 px-4 py-2">{item.BillValue}</td>
                                </tr>
                            ))}
                        </tbody>

                        <tfoot>
                            <tr className="bg-white text-center font-semibold">
                                <td className="border border-gray-300 px-4 py-2 text-left" colSpan="">Total:</td>
                                <td className="border border-gray-300 px-4 py-2">{tableData.reduce((sum, item) => sum + item.Bill, 0)}</td>
                                <td className="border border-gray-300 px-4 py-2">{tableData.reduce((sum, item) => sum + item.Quantity, 0)}</td>
                                <td className="border border-gray-300 px-4 py-2">{tableData.reduce((sum, item) => sum + item.Advance, 0)}</td>
                                <td className="border border-gray-300 px-4 py-2">{tableData.reduce((sum, item) => sum + item.BillValue, 0)}</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div> */}
        </div>
    )
}

export default Booking