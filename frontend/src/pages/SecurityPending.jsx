import { useState } from "react";
import Header from "../components/Header";


const SecurityPending = () => {
    // const [selectedCategory, setSelectedCategory] = useState(null);
    const currentusers = JSON.parse(localStorage.getItem("rootfinuser")); // Convert back to an object

    const [selectedOption, setSelectedOption] = useState("radioDefault02");

    return (

        <>
            <Header title={'Cash Bank Ledger'} />
            <div>
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
                                    Cash to Bank
                                </label>
                            </div>

                            {currentusers.power === 'admin' &&
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
                                        Bank to Cash
                                    </label>
                                </div>


                            }
                        </div>

                        {/* Dropdown for Categories */}
                        <div className="mt-4 flex gap-[100px]">

                            <div className="flex flex-col">
                                <label htmlFor="">Amount</label>
                                <input type="text" className="border border-gray-500 p-2 px-8  rounded-md " placeholder="Enter Amount+" />
                            </div>
                            <div>
                                <input
                                    type="submit"
                                    className="bg-blue-500 text-white px-6 py-2 rounded-md mt-4 cursor-pointer hover:bg-blue-600 transition"
                                    value="Submit"
                                />
                            </div>
                        </div>




                    </form>
                </div>
            </div>
        </>

    );
};

export default SecurityPending;
