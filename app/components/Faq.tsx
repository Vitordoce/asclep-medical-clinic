"use client";

import { useState } from "react";
import { 
  PanelBarItem, 
  PanelBarItemProps
} from "@progress/kendo-react-layout";

interface FaqItem {
  question: string;
  answer: string;
}

const faqItems: FaqItem[] = [
  {
    question: "What insurance plans do you accept?",
    answer: "We accept most major insurance plans including Medicare, Blue Cross Blue Shield, Aetna, Cigna, and UnitedHealthcare. Please contact our office to verify coverage for your specific plan."
  },
  {
    question: "How do I schedule an appointment?",
    answer: "You can schedule an appointment by calling our office, using our online booking system, or through our mobile app. Virtual consultations are also available for eligible patients."
  },
  {
    question: "What should I bring to my first appointment?",
    answer: "Please bring your insurance card, photo ID, list of current medications, medical history records, and any referral forms if required by your insurance. Arriving 15 minutes early to complete paperwork is recommended."
  },
  {
    question: "Do you offer telehealth services?",
    answer: "Yes, we offer secure telehealth services for consultations, follow-ups, and certain treatments. Our virtual platform is HIPAA-compliant and accessible through your computer or smartphone."
  }
];

export default function Faq() {
  const [expandedIndices, setExpandedIndices] = useState<number[]>([]);

  const handleSelect = (e: PanelBarItemProps) => {
    const index = Number(e.id);
    
    if (expandedIndices.includes(index)) {
      // If already expanded, collapse it
      setExpandedIndices(expandedIndices.filter(i => i !== index));
    } else {
      // Otherwise, expand it
      setExpandedIndices([...expandedIndices, index]);
    }
  };

  return (
    <div className="container mx-auto px-6 max-w-4xl">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Frequently Asked Questions</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">Find answers to common questions about our services and procedures.</p>
      </div>
      
      <div className="space-y-4">
        {faqItems.map((item, index) => (
          <PanelBarItem 
            key={index}
            id={index.toString()}
            title={
              <div className="flex justify-between items-center w-full px-2 py-3">
                <h3 className="text-lg font-semibold text-gray-800">{item.question}</h3>
                <span className="text-blue-600">
                  {expandedIndices.includes(index) ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </span>
              </div>
            }
            expanded={expandedIndices.includes(index)}
            onSelect={handleSelect}
            className="bg-white rounded-xl shadow-md overflow-hidden"
          >
            <div className="p-6 border-t border-gray-100">
              <p className="text-gray-600">{item.answer}</p>
            </div>
          </PanelBarItem>
        ))}
      </div>
    </div>
  );
} 