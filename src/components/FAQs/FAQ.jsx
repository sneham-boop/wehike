import React from "react";

export default function FAQ({icon, question, answer}) {
  return (
    <div className="faq">
      <div className="faq-icon-question">
        <span className="material-symbols-rounded">{icon}</span>
        <h6>{question}</h6>
      </div>
      <p>
        {answer}
      </p>
    </div>
  );
}
