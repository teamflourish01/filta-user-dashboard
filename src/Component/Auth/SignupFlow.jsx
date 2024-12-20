import React, { useState } from "react";
import Digitalcard from "../digitalcard/Digitalcard";
import Signup from "../signup/Signup";
import axios from "axios";

const SignupFlow = () => {
  const [step, setStep] = useState(1);
  const [digitalCardData, setDigitalCardData] = useState(null);
  const uri = process.env.REACT_APP_DEV_URL;

  const handleDigitalCardSubmit = (data) => {
    setDigitalCardData(data);
    setStep(2);
  };
  const handleSignupSuccess = async (token) => {
    console.log("Digital Card Data Sent:", digitalCardData);

    try {
      // Step 2: API call to save the digital card data
      const response = await axios.post(
        `${uri}/card/addcard`,
         digitalCardData, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        // Save Email link if present
        if (digitalCardData.email) {
          const emailResponse = await axios.post(
            `${uri}/link/addlink`,
            {
              platform: "Email",
              url: digitalCardData.email,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (emailResponse.status === 201) {
            console.log("Email platform link saved successfully!");
          }
        }

        // Save Call link if present
        if (digitalCardData.phoneNumber) {
          const callResponse = await axios.post(
            `${uri}/link/addlink`,
            {
              platform: "Call",
              url: digitalCardData.phoneNumber,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (callResponse.status === 201) {
            console.log("Call platform link saved successfully!");
          }
        }

        alert("Card, Email and Call Saved Successfully");
      }
    } catch (error) {
        if (error.response) {
            console.error("Error response:", error.response.data);
            alert(error.response.data.message || "An error occurred. Please try again.");
          } else {
            console.error("Error:", error);
            alert("Failed to save digital card. Please try again.");
          }
    }
  };
  return (
    <>
      {step === 1 && <Digitalcard onContinue={handleDigitalCardSubmit} />}
      {step === 2 && <Signup onSignupSuccess={handleSignupSuccess} />}
    </>
  );
};

export default SignupFlow;
