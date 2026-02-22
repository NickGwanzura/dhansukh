import React from 'react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="py-24 max-w-4xl mx-auto px-6 font-sans">
      <h1 className="text-4xl font-serif font-bold mb-8">Privacy Policy</h1>
      <div className="space-y-6 text-gray-medium leading-relaxed">
        <p>Effective Date: October 2023</p>
        <p>At Dhan Sukh House, we value your privacy. This policy explains how we handle your personal information when you use our website or book our services.</p>
        
        <h2 className="text-2xl font-serif font-bold text-gray-dark mt-8">Information We Collect</h2>
        <p>We only collect information necessary to process your booking requests, such as your name, guest count, and desired stay dates. This information is typically shared via WhatsApp to facilitate communication.</p>

        <h2 className="text-2xl font-serif font-bold text-gray-dark mt-8">How We Use Your Data</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>To confirm availability and manage reservations.</li>
          <li>To provide personalized hospitality services during your stay.</li>
          <li>To communicate important updates regarding your booking.</li>
        </ul>

        <h2 className="text-2xl font-serif font-bold text-gray-dark mt-8">Third-Party Services</h2>
        <p>Our website utilizes the WhatsApp API to facilitate bookings. Your interaction with WhatsApp is subject to their own privacy policies.</p>

        <h2 className="text-2xl font-serif font-bold text-gray-dark mt-8">Contact Us</h2>
        <p>If you have any questions about this Privacy Policy, please contact us via the booking number provided on our website.</p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;