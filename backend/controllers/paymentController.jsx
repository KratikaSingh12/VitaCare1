import axios from "axios";
import uniqid from "uniqid";

export const phonePePayment = async (req, res) => {
  try {

    const { amount, appointmentType } = req.body;

    let finalAmount = amount;

    // Emergency extra charge
    if (appointmentType === "emergency-video") {
      finalAmount += 200;
    }

    const merchantTransactionId = uniqid();

    // Temporary demo payment URL
    // Later replace with actual API call

    return res.status(200).json({
      success: true,
      paymentUrl:
        "https://paytm.com",
      transactionId: merchantTransactionId,
      amount: finalAmount,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Payment Failed",
    });
  }
};