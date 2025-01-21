export const loadRazorpay = async () => {
  return new Promise((resolve, reject) => {
    if (
      document.querySelector(
        "script[src='https://checkout.razorpay.com/v1/checkout.js']"
      )
    ) {
      resolve(true); // Script already loaded
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => reject(new Error("Failed to load Razorpay SDK"));
    document.body.appendChild(script);
  });
};
const createOrder = async (amount) => {
  try {
    let data = await fetch(`http://192.168.1.18:8080/payment/create-order`, {
      method: "POST",
      body: JSON.stringify({ amount: amount, currency: "INR" }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    data = await data.json();
    console.log(data, "data");

    return data.id;
  } catch (error) {
    console.log(error);
  }
};

export const handlePayment = async ({
  amount,
  name,
  email,
  mobile,
  onSuccess,
  userId,
}) => {
  await loadRazorpay();

  let id = await createOrder(amount);
  console.log(amount, "amount");
  console.log(id, "oreder id");

  const options = {
    key: "rzp_test_rMaoQVF8tWJMAb", // Replace with your Razorpay API Key
    amount: amount*100, // Amount in paise (e.g., 50000 for ₹500)
    currency: "INR",
    name: "Filta",
    description: "Test Transaction",
    // image: "https://yourlogo.url/logo.png", // Optional: Your logo
    order_id: id, // Optional: Generated order_id
    handler: async function (response) {
      // Send payment details to backend for verification
      console.log(response, "res");
      const verificationResponse = await fetch(
        "http://192.168.1.18:8080/payment/verify",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            userId: userId,
          }),
        }
      );

      const result = await verificationResponse.json();
      console.log(result, "result");

      if (result.data) {
        alert("Payment Verified Successfully!");
        if (onSuccess) {
          onSuccess();
        }
      } else {
        alert("Payment Verification Failed!");
      }
    },
    prefill: {
      name: name,
      email: email,
      contact: mobile,
    },
    notes: {
      address: "Razorpay Corporate Office",
    },
    theme: {
      color: "#3399cc",
    },
  };

  const rzp1 = new window.Razorpay(options);
  rzp1.open();
};
