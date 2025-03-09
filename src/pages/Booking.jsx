import Headers from '../components/Header.jsx';

const transactions = [
    {
        date: "01-01-2025",
        Bills: "38",
        Quantity: "54",
        Advance: "3500",
        BillValue: 10000,
    },
    {
        date: "01-01-2025",
        Bills: "33",
        Quantity: "24",
        Advance: "2600",
        BillValue: 30000,
    }
];

const Booking = () => {
    return (
        <div>
            <Headers title={'Booking Report'} />
            <div className='ml-[240px]'>
                <div className="p-6 bg-gray-100 min-h-screen">
                    {/* Date Inputs */}
                    <div className="flex gap-4 mb-6 w-[600px]">
                        <div className='w-full flex flex-col '>
                            <label htmlFor="to">To *</label>
                            <input type="date" id="to" className='border border-gray-300 py-[6px]' />
                        </div>
                        <div className='w-full flex flex-col '>
                            <label htmlFor="from">From *</label>
                            <input type="date" id="from" className='border border-gray-300 py-[6px]' />
                        </div>
                    </div>

                    {/* Table */}
                    <div className="bg-white p-4 shadow-md rounded-lg ">
                        <table className="w-full border-collapse border rounded-md border-gray-300">
                            <thead className='rounded-md'>
                                <tr className="bg-[#7C7C7C] rounded-md text-white">
                                    <th className="border p-2">Date</th>
                                    <th className="border p-2">No. of Bills</th>
                                    <th className="border p-2">Quantity</th>
                                    <th className="border p-2">Advance</th>
                                    <th className="border p-2">Bill Value</th>
                                </tr>
                            </thead>
                            <tbody>
                                {transactions.length > 0 ? (
                                    transactions.map((transaction, index) => (
                                        <tr key={index}>
                                            <td className="border p-2">{transaction.date}</td>
                                            <td className="border p-2">{transaction.Bills}</td>
                                            <td className="border p-2">{transaction.Quantity}</td>
                                            <td className="border p-2">{transaction.Advance}</td>
                                            <td className="border p-2">{transaction.BillValue}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="text-center border p-4">No transactions found</td>
                                    </tr>
                                )}
                            </tbody>

                            {/* Footer Totals */}
                            <tfoot>
                                <tr className="bg-white text-center font-semibold">
                                    <td className="border border-gray-300 px-4 py-2 text-left" colSpan="1">Total:</td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        {transactions.reduce((sum, item) => sum + parseInt(item.Bills), 0)}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        {transactions.reduce((sum, item) => sum + parseInt(item.Quantity), 0)}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        {transactions.reduce((sum, item) => sum + parseInt(item.Advance), 0)}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        {transactions.reduce((sum, item) => sum + item.BillValue, 0)}
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Booking;
