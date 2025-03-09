import Headers from '../components/Header.jsx';
import { useState } from "react";
import Select from "react-select";

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

const transactions = [
    {
        date: "01-01-2025",
        invoiceNo: "INV-010",
        customerName: "Jishnu",
        category: "Booking",
        subCategory: "Advance",
        remarks: "-",
        amount: 2000,
        totalTransaction: 2000,
        billValue: 5000,
        cash: 1000,
        bank: 1000
    },
    {
        date: "01-01-2025",
        invoiceNo: "INV-011",
        customerName: "Rahul",
        category: "Rent Out",
        subCategory: "Security",
        remarks: "Paid in full",
        amount: 3500,
        totalTransaction: 3500,
        billValue: 6000,
        cash: 2000,
        bank: 1500
    }
];


const opening = [{ cash: "60000", bank: "54000" }];
const Datewisedaybook = () => {
    const [selectedCategory, setSelectedCategory] = useState(categories[0]);
    const [selectedSubCategory, setSelectedSubCategory] = useState(subCategories[0]);






    // Filter transactions based on category & subcategory
    const filteredTransactions = transactions.filter(
        (t) =>
            (selectedCategory.value === "all" || t.category.toLowerCase() === selectedCategory.value) &&
            (selectedSubCategory.value === "all" || t.subCategory.toLowerCase() === selectedSubCategory.value)
    );

    return (

        <div>
            <Headers title={"Financial Summary Report"} />
            <div className='ml-[240px]'>
                <div className="p-6 bg-gray-100 min-h-screen">
                    {/* Dropdowns */}
                    <div className="flex gap-4 mb-6 w-[800px]">
                        <div className='w-full flex flex-col '>
                            <label htmlFor="">To *</label>
                            <input type="date" className='border border-gray-300 py-[6px]' />
                        </div>
                        <div className='w-full flex flex-col '>
                            <label htmlFor="">From *</label>
                            <input type="date" className='border border-gray-300 py-[6px]' />

                        </div>

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
                                        <tr key={index}>
                                            <td className="border p-2">{transaction.date}</td>
                                            <td className="border p-2">{transaction.invoiceNo}</td>
                                            <td className="border p-2">{transaction.customerName}</td>
                                            <td className="border p-2">{transaction.category}</td>
                                            <td className="border p-2">{transaction.subCategory}</td>
                                            <td className="border p-2">{transaction.remarks}</td>
                                            <td className="border p-2">{transaction.amount}</td>
                                            <td className="border p-2">{transaction.totalTransaction}</td>
                                            <td className="border p-2">{transaction.billValue}</td>
                                            <td className="border p-2">{transaction.cash}</td>
                                            <td className="border p-2">{transaction.bank}</td>
                                        </tr>
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
                                    <td className="border border-gray-300 px-4 py-2 text-left" colSpan="6">Total:</td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        {filteredTransactions.reduce((sum, item) => sum + item.amount, 0)}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        {filteredTransactions.reduce((sum, item) => sum + item.totalTransaction, 0)}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        {filteredTransactions.reduce((sum, item) => sum + item.billValue, 0)}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        {filteredTransactions.reduce((sum, item) => sum + item.cash, 0) + Number(opening[0].cash)}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        {filteredTransactions.reduce((sum, item) => sum + item.bank, 0) + Number(opening[0].bank)}
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