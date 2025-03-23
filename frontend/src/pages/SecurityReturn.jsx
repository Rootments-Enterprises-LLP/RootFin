import { useState } from "react";
import Select from "react-select"; // Import react-select
import Header from "../components/Header";

const categories = [
    { value: "petty_expenses", label: "Petty Expenses" },
    { value: "dry_cleaning", label: "Dry Cleaning" },
    { value: "water_bill", label: "Water Bill" },
    { value: "material_purchase", label: "Material Purchase" },
    { value: "travel_expense", label: "Travel Expense" },
    { value: "staff_reimbursement", label: "Staff Reimbursement" },
    { value: "maintenance_expenses", label: "Maintenance Expenses" },
    { value: "telephone_internet", label: "Telephone & Internet" },
    { value: "utility_bill", label: "Utility Bill" },
    { value: "salary", label: "Salary" },
    { value: "rent", label: "Rent" },
    { value: "courier_charges", label: "Courier Charges" },
    { value: "asset_purchase", label: "Asset Purchase" },
    { value: "promotion_services", label: "Promotion & Services" },
];

const SecurityReturn = () => {
    const [selectedOption, setSelectedOption] = useState("radioDefault02");
    const [selectedCategory, setSelectedCategory] = useState(categories[0]); // Default to "All"

    return (
        <div>
            <Header title="Income & Expenses" />

            <div className="ml-[290px] mt-[80px]">
                <form>
                    {/* Radio Buttons */}
                    <div className="flex gap-[50px]">
                        <div className="mb-2 flex items-center gap-2">
                            <input
                                className="w-5 h-5 accent-blue-500"
                                type="radio"
                                name="flexRadioDefault"
                                id="radioDefault01"
                                value="radioDefault01"
                                checked={selectedOption === "radioDefault01"}
                                onChange={(e) => setSelectedOption(e.target.value)}
                            />
                            <label htmlFor="radioDefault01" className="cursor-pointer">
                                Income
                            </label>
                        </div>

                        <div className="mb-2 flex items-center gap-2">
                            <input
                                className="w-5 h-5 accent-blue-500"
                                type="radio"
                                name="flexRadioDefault"
                                id="radioDefault02"
                                value="radioDefault02"
                                checked={selectedOption === "radioDefault02"}
                                onChange={(e) => setSelectedOption(e.target.value)}
                            />
                            <label htmlFor="radioDefault02" className="cursor-pointer">
                                Expenses
                            </label>
                        </div>
                    </div>

                    {/* Dropdown for Categories */}
                    <div className="mt-4 flex gap-[100px]">
                        <div>
                            <label htmlFor="">category</label>
                            <Select
                                options={categories}
                                value={selectedCategory}
                                onChange={setSelectedCategory}
                                className="w-[250px]"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="">Amount</label>
                            <input type="text" className="border border-gray-500 p-2 px-8  rounded-md " placeholder="Enter Amount+" />
                        </div>
                    </div>

                    <div>
                        <div className="flex flex-col w-[250px] rounded-md mt-[50px]">
                            <label htmlFor="">Remarks</label>
                            <input type="text" className="border border-gray-500 p-2 py-10 px-8  rounded-md " placeholder="Enter your remarks" />
                        </div>
                    </div>
                    <div>
                        <input
                            type="submit"
                            className="bg-blue-500 text-white px-6 py-2 rounded-md mt-4 cursor-pointer hover:bg-blue-600 transition"
                            value="Submit"
                        />
                    </div>

                </form>
            </div>
        </div>
    );
};

export default SecurityReturn;
