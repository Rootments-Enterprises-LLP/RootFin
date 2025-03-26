import Headers from '../components/Header.jsx';
import { useMemo, useState } from "react";
import Select from "react-select";
import useFetch from '../hooks/useFetch.jsx';
import baseUrl from '../api/api.js';

const categories = [
    { value: "all", label: "All" },
    { value: "booking", label: "Booking" },
    { value: "rent_out", label: "Rent Out" },
    { value: "refund", label: "Refund" },
    { value: "income", label: "Income" },
    { value: "expense", label: "Expense" },
    { value: "cash_to_bank", label: "Cash to Bank" },
];

const subCategories = [
    { value: "all", label: "All" },
    { value: "advance", label: "Advance" },
    { value: "bal_payable_amt", label: "Bal. Payable Amt" },
    { value: "security", label: "Security" },
    { value: "cancellation_refund", label: "Cancellation Refund" },
    { value: "security_refund", label: "Security Refund" },
    { value: "compensation", label: "Compensation" },
    { value: "petty_expense", label: "Petty Expense" },
];



const opening = [{ cash: "60000", bank: "54000" }];
const Datewisedaybook = () => {

    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [apiUrl, setApiUrl] = useState("");
    const [apiUrl1, setApiUrl1] = useState("");
    const [apiUrl2, setApiUrl2] = useState("");

    const [apiUrl3, setApiUrl3] = useState("");
    const [apiUrl4, setApiUrl4] = useState("");

    const currentusers = JSON.parse(localStorage.getItem("rootfinuser")); // Convert back to an object

    const handleFetch = () => {
        const baseUrl1 = "http://15.207.90.158:5005/api/GetBooking";

        // Dynamically updating API URLs
        const updatedApiUrl = `${baseUrl1}/GetBookingList?LocCode=${currentusers.locCode}&DateFrom=${fromDate}&DateTo=${toDate}`;
        const updatedApiUrl1 = `${baseUrl1}/GetRentoutList?LocCode=${currentusers.locCode}&DateFrom=${fromDate}&DateTo=${toDate}`;
        const updatedApiUrl2 = `${baseUrl1}/GetReturnList?LocCode=${currentusers.locCode}&DateFrom=${fromDate}&DateTo=${toDate}`;
        const updatedApiUrl3 = `${baseUrl.baseUrl}user/Getpayment?LocCode=${currentusers.locCode}&DateFrom=${fromDate}&DateTo=${toDate}`;
        const updatedApiUrl4 = `${baseUrl1}/GetDeleteList?LocCode=${currentusers.locCode}&DateFrom=${fromDate}&DateTo=${toDate}`

        // Updating state
        setApiUrl(updatedApiUrl);
        setApiUrl1(updatedApiUrl1);
        setApiUrl2(updatedApiUrl2);
        setApiUrl3(updatedApiUrl3)
        setApiUrl4(updatedApiUrl4)

        console.log("API URLs Updated:", updatedApiUrl, updatedApiUrl1, updatedApiUrl2);
    };

    // Memoizing fetch options
    const fetchOptions = useMemo(() => ({}), []);

    const { data } = useFetch(apiUrl, fetchOptions);
    const { data: data1 } = useFetch(apiUrl1, fetchOptions);
    const { data: data2 } = useFetch(apiUrl2, fetchOptions);
    const { data: data3 } = useFetch(apiUrl3, fetchOptions);
    const { data: data4 } = useFetch(apiUrl4, fetchOptions);
    // alert(data3);
    console.log(data3);


    const bookingTransactions = (data?.dataSet?.data || []).map(transaction => ({
        ...transaction,
        bookingCashAmount: parseInt(transaction.bookingCashAmount, 10) || 0,
        bookingBankAmount: parseInt(transaction.bookingBankAmount, 10) || 0,
        invoiceAmount: parseInt(transaction.invoiceAmount, 10) || 0,
        Category: "Booking",
        SubCategory: "Advance"
    }));




    const rentOutTransactions = (data1?.dataSet?.data || []).map(transaction => ({
        ...transaction,
        bookingCashAmount: parseInt(transaction.bookingCashAmount, 10) || 0,
        bookingBankAmount: parseInt(transaction.bookingBankAmount, 10) || 0,
        invoiceAmount: parseInt(transaction.invoiceAmount, 10) || 0,
        securityAmount: parseInt(transaction.securityAmount, 10) || 0,
        advanceAmount: parseInt(transaction.advanceAmount, 10) || 0,
        Balance: (parseInt(transaction.invoiceAmount ?? 0, 10) - parseInt(transaction.advanceAmount ?? 0, 10)) || 0,
        rentoutUPIAmount: parseInt(transaction.rentoutUPIAmount),
        Category: "RentOut",
        SubCategory: "Security",
        SubCategory1: "Balance Payable"

    }));


    const returnOutTransactions = (data2?.dataSet?.data || []).map(transaction => ({
        ...transaction,
        returnBankAmount: -(parseInt(transaction.returnBankAmount, 10) || 0),
        returnCashAmount: -(parseInt(transaction.returnCashAmount, 10) || 0),
        invoiceAmount: parseInt(transaction.invoiceAmount, 10) || 0,
        advanceAmount: parseInt(transaction.advanceAmount, 10) || 0,
        RsecurityAmount: -(parseInt(transaction.securityAmount, 10) || 0),
        Category: "Return",
        SubCategory: "Security"
    }));
    const Transactionsall = (data3?.data || []).map(transaction => ({
        ...transaction,
        locCode: currentusers.locCode,
        date: transaction.date.split("T")[0] // Correctly extract only the date
    }));

    const canCelTransactions = (data4?.dataSet?.data || []).map(transaction => ({
        ...transaction,
        Category: "Cancel",
        SubCategory: "Refund"


    }));
    // alert(apiUrl4)
    console.log("Hi" + data4);
    // alert(canCelTransactions)
    const allTransactions = [...bookingTransactions, ...rentOutTransactions, ...returnOutTransactions, ...canCelTransactions, ...Transactionsall];

    console.log(allTransactions);
    const [selectedCategory, setSelectedCategory] = useState(categories[0]);
    const [selectedSubCategory, setSelectedSubCategory] = useState(subCategories[0]);






    // Filter transactions based on category & subcategory
    const filteredTransactions = allTransactions.filter(
        (t) =>
            (selectedCategory.value === "all" || t.category.toLowerCase() === selectedCategory.value) &&
            (selectedSubCategory.value === "all" || t.subCategory.toLowerCase() === selectedSubCategory.value)
    );

    const totalBankAmount =
        (filteredTransactions?.reduce((sum, item) =>
            sum +
            (parseInt(item.bookingBankAmount, 10) || 0) +
            (parseInt(item.rentoutBankAmount, 10) || 0) +
            (parseInt(item.bank, 10) || 0) +
            (parseInt(item.rentoutUPIAmount) || 0) +
            (parseInt(item.deleteBankAmount) || 0) +
            (parseInt(item.returnBankAmount, 10) || 0),
            0) || 0) + (parseInt(opening[0]?.bank, 10) || 0);
    return (

        <div>
            <Headers title={"Financial Summary Report"} />
            <div className='ml-[240px]'>
                <div className="p-6 bg-gray-100 min-h-screen">
                    {/* Dropdowns */}
                    <div className="flex gap-4 mb-6 w-[800px]">
                        <div className='w-full flex flex-col '>
                            <label htmlFor="">To *</label>
                            <input
                                type="date"
                                id="fromDate"
                                value={fromDate}
                                onChange={(e) => setFromDate(e.target.value)}
                                className="border border-gray-300 py-2 px-3"
                            />                        </div>
                        <div className='w-full flex flex-col '>
                            <label htmlFor="">From *</label>
                            <input
                                type="date"
                                id="toDate"
                                value={toDate}
                                onChange={(e) => setToDate(e.target.value)}
                                className="border border-gray-300 py-2 px-3"
                            />
                        </div>

                        <button
                            onClick={handleFetch}
                            className="bg-blue-500 h-[40px] mt-6 rounded-md text-white px-10 cursor-pointer"
                        >
                            Fetch
                        </button>

                        <div className='w-full'>
                            <label htmlFor="">Category</label>
                            <Select
                                options={categories}
                                value={selectedCategory}
                                onChange={setSelectedCategory}

                            />
                        </div>
                        <div className='w-full'>
                            <label htmlFor="">Sub Category</label>
                            <Select
                                options={subCategories}
                                value={selectedSubCategory}
                                onChange={setSelectedSubCategory}
                            />
                        </div>
                    </div>

                    {/* Table */}
                    <div className="bg-white p-4 shadow-md rounded-lg ">
                        <table className="w-full border-collapse border rounded-md border-gray-300">
                            <thead className='rounded-md'>
                                <tr className="bg-[#7C7C7C] rounded-md text-white">
                                    <th className="border p-2">Date</th>
                                    <th className="border p-2">Invoice No.</th>
                                    <th className="border p-2">Customer Name</th>
                                    <th className="border p-2">Category</th>
                                    <th className="border p-2">Sub Category</th>
                                    <th className="border p-2">Remarks</th>
                                    <th className="border p-2">Amount</th>
                                    <th className="border p-2">Total Transaction</th>
                                    <th className="border p-2">Bill Value</th>
                                    <th className="border p-2">Cash</th>
                                    <th className="border p-2">Bank</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* Opening Balance */}
                                <tr className="bg-gray-100">
                                    <td colSpan="9" className="border p-2 font-bold">OPENING BALANCE</td>
                                    <td className="border p-2 font-bold">{Number(opening[0].cash)}</td>
                                    <td className="border p-2 font-bold">{Number(opening[0].bank)}</td>
                                </tr>

                                {/* Transactions */}
                                {filteredTransactions.length > 0 ? (
                                    filteredTransactions.map((transaction, index) => (
                                        <>
                                            {transaction.Category === 'RentOut' ? (
                                                <>
                                                    <tr key={`${index}-1`}>
                                                        <td className="border p-2">{transaction.bookingDate}</td>
                                                        <td className="border p-2">{transaction.invoiceNo}</td>
                                                        <td className="border p-2">{transaction.customerName}</td>
                                                        <td rowSpan="2" className="border p-2">{transaction.Category}</td> {/* Merged Row */}
                                                        <td className="border p-2">{transaction.SubCategory}</td>
                                                        <td className="border p-2"></td>
                                                        <td className="border p-2">{transaction.securityAmount || 0}</td>
                                                        <td rowSpan="2" className="border p-2">
                                                            {transaction.securityAmount + transaction.Balance}
                                                        </td>
                                                        <td className="border p-2" rowSpan="2">{transaction.invoiceAmount}</td>
                                                        <td className="border p-2" rowSpan="2">{transaction.rentoutCashAmount || 0}</td>
                                                        <td className="border p-2" rowSpan="2">{parseInt(transaction.rentoutBankAmount) + parseInt(transaction.rentoutUPIAmount) || 0}</td>
                                                    </tr>

                                                    <tr key={`${index}-2`}>
                                                        <td className="border p-2">{transaction.bookingDate}</td> {/* Repeated Row */}
                                                        <td className="border p-2">{transaction.invoiceNo}</td>
                                                        <td className="border p-2">{transaction.customerName}</td>
                                                        {/* Category is skipped due to rowSpan */}
                                                        <td className="border p-2">{transaction.SubCategory1
                                                        }</td>
                                                        <td className="border p-2"></td>
                                                        <td className="border p-2">{transaction.Balance}</td>

                                                        {/* <td className="border p-2">{transaction.invoiceAmount}</td> */}
                                                        {/* <td className="border p-2">{transaction.rentoutCashAmount || transaction.bookingCashAmount || transaction.returnCashAmount || 0}</td>
                                                            <td className="border p-2">{transaction.rentoutBankAmount || transaction.bookingBankAmount || transaction.returnBankAmount || 0}</td> */}
                                                    </tr>
                                                </>
                                            ) : (
                                                <tr key={index}>
                                                    <td className="border p-2">{transaction.bookingDate || transaction.date}</td>
                                                    <td className="border p-2">{transaction.invoiceNo || transaction.locCode}</td>
                                                    <td className="border p-2">{transaction.customerName}</td>
                                                    <td className="border p-2">{transaction.Category || transaction.type}</td>
                                                    <td className="border p-2">{transaction.SubCategory || transaction.category}</td>
                                                    <td className="border p-2">{transaction.remark}</td>
                                                    <td className="border p-2">

                                                        {parseInt(transaction.returnCashAmount || 0) + parseInt(transaction.returnBankAmount || 0) ||
                                                            parseInt(transaction.rentoutCashAmount || 0) + parseInt(transaction.rentoutBankAmount || 0) ||
                                                            parseInt(transaction.bookingCashAmount || 0) + parseInt(transaction.bookingBankAmount || 0) ||
                                                            parseInt(transaction.amount || parseInt(transaction.advanceAmount) || 0)}                                                    </td>
                                                    <td className="border p-2">
                                                        {parseInt(transaction.returnCashAmount || 0) + parseInt(transaction.returnBankAmount || 0) ||
                                                            parseInt(transaction.rentoutCashAmount || 0) + parseInt(transaction.rentoutBankAmount || 0) ||
                                                            parseInt(transaction.bookingCashAmount || 0) + parseInt(transaction.bookingBankAmount || 0) ||
                                                            parseInt(transaction.amount || parseInt(transaction.deleteBankAmount) + parseInt(transaction.deleteCashAmount) || 0)}
                                                    </td>
                                                    <td className="border p-2">
                                                        {parseInt(transaction.invoiceAmount) || parseInt(transaction.amount) || 0}
                                                    </td>
                                                    <td className="border p-2">
                                                        {parseInt(transaction.rentoutCashAmount) || parseInt(transaction.bookingCashAmount) || parseInt(transaction.returnCashAmount) || parseInt(transaction.cash) || parseInt(transaction.deleteCashAmount) || 0}
                                                    </td>
                                                    <td className="border p-2">
                                                        {parseInt(transaction.rentoutBankAmount) || parseInt(transaction.bookingBankAmount) || parseInt(transaction.returnBankAmount) || parseInt(transaction.bank) || parseInt(transaction.deleteBankAmount) || 0}
                                                    </td>
                                                </tr>

                                            )}
                                        </>



                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="11" className="text-center border p-4">No transactions found</td>
                                    </tr>
                                )}
                            </tbody>

                            {/* Footer Totals */}
                            <tfoot>
                                <tr className="bg-white text-center font-semibold">
                                    <td className="border border-gray-300 px-4 py-2 text-left" colSpan="9">Total:</td>

                                    {/* <td className="border border-gray-300 px-4 py-2">
                                       
                                        {
                                            filteredTransactions.reduce((sum, item) =>
                                                sum +
                                                (parseInt(item.securityAmount, 10) || 0) +
                                                (parseInt(item.Balance, 10) || 0) +
                                                (parseInt(item.returnCashAmount, 10) || 0) +
                                                (parseInt(item.returnBankAmount, 10) || 0) +
                                                (parseInt(item.rentoutCashAmount, 10) || 0) -
                                                (parseInt(item.bookingCashAmount, 10) || 0) + 
                                                (parseInt(item.bookingBankAmount, 10) || 0) +
                                                (parseInt(item.amount, 10) || 0),
                                                (parseInt(item.rentoutBankAmount, 10) || 0) +
                                                (parseInt(item.returnBankAmount, 10) || 0),
                                                0
                                            )
                                        }

                                    </td> */}

                                    {/* <td className="border border-gray-300 px-4 py-2">
                                        {filteredTransactions.reduce((sum, item) =>
                                            sum +
                                            (parseInt(item.bookingCashAmount, 10) || 0) +
                                            (parseInt(item.bookingBankAmount, 10) || 0) +
                                            (parseInt(item.rentoutCashAmount, 10) || 0) +
                                            (parseInt(item.rentoutBankAmount, 10) || 0) +
                                            (parseInt(item.returnCashAmount, 10) || 0) +
                                            (parseInt(item.returnBankAmount, 10) || 0),
                                            0)}
                                    </td> */}

                                    {/* Total Booking Cash Amount */}
                                    {/* <td className="border border-gray-300 px-4 py-2">
                                        {filteredTransactions.reduce((sum, item) => sum + (parseInt(item.bookingCashAmount, 10) || 0), 0)}
                                    </td> */}

                                    {/* Total Cash (including opening balance) */}
                                    <td className="border border-gray-300 px-4 py-2">
                                        {

                                            filteredTransactions.reduce((sum, item) =>
                                                sum +
                                                (parseInt(item.bookingCashAmount, 10) || 0) +
                                                (parseInt(item.rentoutCashAmount, 10) || 0) +
                                                (parseInt(item.cash, 10) || 0) +
                                                (parseInt(item.deleteCashAmount, 10) || 0) +
                                                (parseInt(item.returnCashAmount, 10) || 0),
                                                0) + (parseInt(opening[0]?.cash, 10) || 0)
                                        }
                                    </td>

                                    {/* Total Bank (including opening balance) */}
                                    <td className="border border-gray-300 px-4 py-2">
                                        {

                                            totalBankAmount
                                        }
                                    </td>
                                </tr>
                            </tfoot>

                        </table>
                    </div>

                </div>

            </div>

        </div>
    )
}

export default Datewisedaybook