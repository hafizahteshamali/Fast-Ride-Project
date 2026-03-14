'use client';

import { useState } from 'react';
import { FaChevronDown, FaQuestion, FaHeadset, FaClock, FaMoneyBill, FaShieldAlt } from 'react-icons/fa';

const faqs = [
  {
    question: 'How quickly do you respond to messages?',
    answer: 'We typically respond within 24 hours during business days. For urgent matters, we recommend using our phone support or WhatsApp for faster response.',
    icon: FaClock
  },
  {
    question: 'Do you offer customer support on weekends?',
    answer: 'Yes, our phone and WhatsApp support is available 24/7, including weekends and holidays. Email responses may take up to 48 hours on weekends.',
    icon: FaHeadset
  },
  {
    question: 'What are your service charges?',
    answer: 'Our service charges vary by plan. Basic plan starts at Rs. 2,999/month, Pro at Rs. 4,999/month, and Premium at Rs. 7,999/month with annual discounts available.',
    icon: FaMoneyBill
  },
  {
    question: 'Is my data secure?',
    answer: 'Absolutely! We use industry-standard encryption and security measures to protect your personal information and payment details.',
    icon: FaShieldAlt
  }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="py-16 px-4 md:px-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-white px-6 py-3 rounded-full shadow-md mb-4">
            <FaQuestion className="text-orange-500 w-5 h-5" />
            <span className="text-sm font-semibold text-gray-700">Frequently Asked Questions</span>
          </div>
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Got Questions?</h2>
          <p className="text-gray-600">Find answers to commonly asked questions about our services and support.</p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-md overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                    <faq.icon className="text-orange-500 w-5 h-5" />
                  </div>
                  <span className="font-semibold text-gray-800 text-left">{faq.question}</span>
                </div>
                <FaChevronDown className={`text-gray-400 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`} />
              </button>
              
              {openIndex === index && (
                <div className="px-6 pb-4 pl-20">
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}