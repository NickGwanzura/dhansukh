import React from 'react';

const Terms: React.FC = () => {
  return (
    <div className="py-24 max-w-4xl mx-auto px-6 font-sans">
      <h1 className="text-4xl font-serif font-bold mb-8">Terms & Conditions</h1>
      <div className="space-y-6 text-gray-medium leading-relaxed">
        <h2 className="text-2xl font-serif font-bold text-gray-dark">1. Booking & Payments</h2>
        <p>All bookings at Dhan Sukh House are subject to availability. A booking is only confirmed once we have communicated confirmation via WhatsApp and any required deposits have been received.</p>
        
        <h2 className="text-2xl font-serif font-bold text-gray-dark mt-8">2. House Rules</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Vegetarian Policy:</strong> The main villa kitchen is strictly vegetarian. Preparation of meat products is permitted only in the outdoor Gazebo area.</li>
          <li><strong>No Parties:</strong> To maintain the tranquility of our neighborhood and estate, parties and large unauthorized gatherings are strictly prohibited.</li>
          <li><strong>No Smoking:</strong> Smoking is strictly prohibited inside the villa and cottages.</li>
          <li><strong>Quiet Hours:</strong> Respectful noise levels must be maintained after 10:00 PM.</li>
        </ul>

        <h2 className="text-2xl font-serif font-bold text-gray-dark mt-8">3. Check-in & Check-out</h2>
        <p>Check-in time is typically 2:00 PM, and check-out is by 11:00 AM. Early check-in or late check-out may be available upon request and may incur additional fees.</p>

        <h2 className="text-2xl font-serif font-bold text-gray-dark mt-8">4. Liability</h2>
        <p>Dhan Sukh House is not liable for the loss of personal belongings. Guests are encouraged to use secure parking and follow estate safety guidelines.</p>
      </div>
    </div>
  );
};

export default Terms;