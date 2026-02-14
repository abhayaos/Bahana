import React, { useEffect, useState } from "react";

function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem("cookieAccepted");
    if (!accepted) {
      setShow(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookieAccepted", "true");
    setShow(false);
  };

  const handleDecline = () => {
    localStorage.setItem("cookieAccepted", "false");
    setShow(false);
  };

  if (!show) return null;

  const interests = ["AI (Artificial Intelligence)", "Fun (Entertainment)", "Nepali Content"];

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/30 backdrop-blur-sm">
      <div className="bg-white shadow-lg rounded-xl p-6 max-w-md w-full">
        <h2 className="text-lg font-semibold mb-2">🍪 Bahana AI Cookie Notice</h2>
        <p className="text-gray-700 mb-4">
          Bahana AI uses cookies to improve your experience. By using our site, you agree to our{" "}
          <a href="/terms" className="text-blue-600 underline hover:text-blue-800">
            Terms & Conditions
          </a>.
        </p>

        <div className="mb-4">
          <h3 className="font-medium mb-2">Select your preferences:</h3>
          {interests.map((interest, index) => (
            <div key={index} className="flex items-center mb-2">
              <input
                type="checkbox"
                id={`interest-${index}`}
                className="mr-2"
              />
              <label htmlFor={`interest-${index}`}>{interest}</label>
            </div>
          ))}
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={handleDecline}
            className="px-4 py-2 rounded-lg border border-gray-400 text-gray-700 hover:bg-gray-100 transition"
          >
            Decline
          </button>
          <button
            onClick={handleAccept}
            className="px-4 py-2 rounded-lg bg-black text-white hover:opacity-90 transition"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}

export default CookieConsent;
