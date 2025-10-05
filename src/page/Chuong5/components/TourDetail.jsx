// src/components/TourDetails.jsx
import React from 'react';
import { locationDetails } from '../locationDetails'; // Import dữ liệu chi tiết

function TourDetails({ selectedSite }) {
  if (!selectedSite) {
    return (
        <div className="p-8 text-center bg-gray-50 rounded-lg mt-8">
          <h2 className="text-2xl font-bold text-gray-700">Welcome to the Tour Planning Station!</h2>
          <p className="mt-2 text-gray-500">Please select a location on the map to explore and plan your trip.</p>
        </div>
    );
  }

  const details = locationDetails[selectedSite.Site] || {};

  return (
      <div className="p-6 md:p-8 bg-white rounded-xl shadow-lg border border-gray-200 mt-8 animate-fade-in">
        <h2 className="text-3xl font-bold text-green-800 mb-4">{selectedSite.Site}</h2>

        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold text-gray-800 border-b-2 border-green-200 pb-2">🌸 Prominent Flower Species</h3>
            <p className="text-gray-700 mt-2 pl-2">{details.flowers || "Information is being updated."}</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-800 border-b-2 border-green-200 pb-2">🚗 Transportation Suggestions</h3>
            <p className="text-gray-700 mt-2 pl-2">{details.transport || "Information is being updated."}</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-800 border-b-2 border-green-200 pb-2">🏞️ Recommended Activities</h3>
            <p className="text-gray-700 mt-2 pl-2">{details.activities || "Information is being updated."}</p>
          </div>
        </div>
      </div>
  );
}

export default TourDetails;