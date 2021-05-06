import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import SingleEmailField from "../../common/SingleEmailField.js";

export default function ForgetPassword() {
  const [modalOpen, setModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  function handleContinue(email) {
    setIsLoading(true);
    fetch("http://api.pot-iot.com:8080/forgetPassword", {
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
            case "ACCOUNT_INACTIVE_ERROR":
              if (
                window.confirm(
                  "Email is not activated yet, click OK to resend activate email"
                )
              ) {
                history.push("./reactivate-account");
              }
              break;
            case "FORGET_PASSWORD_EMAIL_ERROR":
              alert(
                "Failed to send reset password email. Please enter a valid email address"
              );
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
      title={"Reset Password"}
      dialogText={
        "An email with a link to set new password has been sent to the email address you entered."
      }
    />
  );
}
