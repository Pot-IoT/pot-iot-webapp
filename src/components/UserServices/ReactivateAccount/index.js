import React, { useState } from "react";
import SingleEmailField from "../../common/SingleEmailField.js";

export default function ForgetPassword() {
  const [modalOpen, setModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  function handleContinue(email) {
    setIsLoading(true);
    fetch("//115.29.191.198:8080/resendActivationEmail", {
      method: "POST",
      body: JSON.stringify({ email: email }),
    })
      .then((response) => response.json())
      .then((data) => {
        setIsLoading(false);
        if (data.success === true) setModalOpen(true);
        else {
          switch (data.result.message) {
            case "EMAIL_INVALID_ERROR":
              alert("Email is not registered yet");
              break;
            case "ACCOUNT_ACTIVATED_ERROR":
              alert("This account is already activated");
              break;
            default:
              console.log(("data", data));
          }
        }
      });
  }

  return (
    <SingleEmailField
      isLoading={isLoading}
      handleContinue={handleContinue}
      setModalOpen={setModalOpen}
      modalOpen={modalOpen}
      title={"Re-send Activation Email"}
      dialogText={
        "An email with an acitivation link has been sent to your email address above, please activate and login."
      }
    />
  );
}
