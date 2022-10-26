import React from "react";
import FAQ from "./FAQ";
import faqData from "./faqData";
import "./FAQs.css";

export default function FAQs() {
  const showFAQs = () => {
    const faqs = Object.values(faqData);
    return faqs.map((faq) => {
      return (
        <FAQ icon={faq.icon} question={faq.question} answer={faq.answer} />
      );
    });
  };

  return (
    <section id="faqs">
      <h3>Frequently Asked Questions</h3>
      <p className="text-center mb-5">
        Do you have a question that I haven't answered below? Contact me!
      </p>

      <div id="faq-container">{showFAQs()}</div>
    </section>
  );
}
