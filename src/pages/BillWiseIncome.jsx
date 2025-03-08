// import { useState 
// import Head from "../components/Head";

import Headers from '../components/Header.jsx'

// Sample JSON Data

const DayBookInc = () => {


    return (
        <>
            {/* // <div className="border border-gray-200 shadow-lg rounded-md mx-10 mt-10"> */}
            {/* <div className="w-full">
                <Head />
            </div> */}
            {/* <div className="flex ml-10 gap-6 mt-5">
                <div className="flex flex-col">
                    <label>From <span className="text-red-500">*</span></label>
                    <input type="date" className="border w-52 p-2 rounded-md border-gray-400" />
                </div>
                <div className="flex flex-col">
                    <label>To <span className="text-red-500">*</span></label>
                    <input type="date" className="border w-52 p-2 rounded-md border-gray-400" />
                </div> */}
            {/* <div className="flex flex-col w-52">
                    <label>Bill Category</label>
                    <Select options={options} value={selectedCategory} onChange={setSelectedCategory} placeholder="Select category" className="rounded-md" />
                </div> */}
            {/* <div className="h-10 mt-6 cursor-pointer px-4 py-2 rounded-md text-white bg-blue-600 flex items-center">
                    <button className="cursor-pointer">Show Report</button>
                </div>
            </div> */}

            {/* <div className="border border-gray-400 rounded-md mt-6 mx-10 mb-10 overflow-hidden">
                <table className="rounded-md table-auto w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-100 text-center">
                            <th className="border border-gray-300 px-4 py-2">Date</th>
                            <th className="border border-gray-300 px-4 py-2">Invoice No.</th>
                            <th className="border border-gray-300 px-4 py-2">Customer Name</th>
                            <th className="border border-gray-300 px-4 py-2">Bill Category</th>
                            <th className="border border-gray-300 px-4 py-2">Category Amt</th>
                            <th className="border border-gray-300 px-4 py-2">Total Transaction</th>
                            <th className="border border-gray-300 px-4 py-2">Amount (Cash)</th>
                            <th className="border border-gray-300 px-4 py-2">Amount (Bank)</th>
                            <th className="border border-gray-300 px-4 py-2">Total Bill Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableData.map((item, index) => (
                            <tr key={index} className={index % 2 === 0 ? "bg-gray-50 text-center" : "text-center"}>
                                <td className="border border-gray-300 px-4 py-2">{item.date}</td>
                                <td className="border border-gray-300 px-4 py-2">{item.invoice}</td>
                                <td className="border border-gray-300 px-4 py-2">{item.customer}</td>
                                <td className="border border-gray-300 px-4 py-2">{item.category}</td>
                                <td className="border border-gray-300 px-4 py-2">{item.categoryAmt}</td>
                                <td className="border border-gray-300 px-4 py-2">{item.totalTransaction}</td>
                                <td className="border border-gray-300 px-4 py-2">{item.cash}</td>
                                <td className="border border-gray-300 px-4 py-2">{item.bank}</td>
                                <td className="border border-gray-300 px-4 py-2">{item.totalBill}</td>
                            </tr>
                        ))}
                        <tr className="bg-gray-200 font-bold text-center">
                            <td className="border border-gray-300 px-4 py-2" colSpan="4">Total :</td>
                            <td className="border border-gray-300 px-4 py-2">{totalCategoryAmt}</td>
                            <td className="border border-gray-300 px-4 py-2">{totalTransaction}</td>
                            <td className="border border-gray-300 px-4 py-2">{totalCash}</td>
                            <td className="border border-gray-300 px-4 py-2">{totalBank}</td>
                            <td className="border border-gray-300 px-4 py-2">{totalBillValue}</td>
                        </tr>
                    </tbody>
                </table>
            </div> */}
            {/* </div> */}
            <div >
                <Headers title={"Day Book"} />
                jhh
            </div>


        </>
    );
};

export default DayBookInc;
