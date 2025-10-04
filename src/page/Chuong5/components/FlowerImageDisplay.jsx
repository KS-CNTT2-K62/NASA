// src/components/FlowerImageDisplay.jsx
import React from 'react';
import { locationDetails } from '../locationDetails'; // Import dữ liệu chi tiết

function FlowerImageDisplay({ selectedSite }) {
  if (!selectedSite) {
    return (
      <div className="w-full h-full bg-gray-100 rounded-lg flex items-center justify-center p-4">
        <p className="text-gray-500 text-center text-sm">Chọn một vùng để xem ảnh hoa tiêu biểu</p>
      </div>
    );
  }

  const imageUrl = locationDetails[selectedSite.Site]?.imageUrl;

  return (
    <div className="w-full h-full bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden relative">
      {imageUrl ? (
        <img 
          src={imageUrl} 
          alt={`Hoa tiêu biểu tại ${selectedSite.Site}`} 
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" 
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-gray-100">
          <p className="text-gray-500 text-center text-sm">Không có ảnh hoa tiêu biểu cho vùng này.</p>
        </div>
      )}
      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-40 text-white p-2 text-center text-xs md:text-sm font-semibold">
        {selectedSite.Site}
      </div>
    </div>
  );
}

export default FlowerImageDisplay;