import CloseTransaction from "../model/Closing.js";

export const CloseController = async (req, res) => {
    try {
        const { totalBankAmount: bank, totalAmount: cash, locCode, TodayDate: date } = req.body;

        // Check if all fields are present
        if (!bank || !cash || !locCode || !date) {
            return res.status(400).json({
                message: "All fields are required",
            });
        }

        console.log(bank, cash, locCode, date);

        // Check if the data already exists for the given locCode and date
        const existingClose = await CloseTransaction.findOne({ $and: [{ locCode }, { date }] });

        if (existingClose) {
            return res.status(500).json({
                message: "Already saved the cash",
            });
        }

        const CloseCashBank = new CloseTransaction({
            bank,
            cash,
            locCode,
            date,
        });

        await CloseCashBank.save();

        res.status(201).json({
            message: "Cash and bank details saved successfully",
            data: CloseCashBank,
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({
            message: "An error occurred while saving the data.",
            error: error.message,
        });
    }
};
