// src/components/TourDetails.jsx
import React from 'react';
import { locationDetails } from '../locationDetails'; // Import dữ liệu chi tiết

function TourDetails({ selectedSite }) {
  if (!selectedSite) {
    return (
      <div className="p-8 text-center bg-gray-50 rounded-lg mt-8">
        <h2 className="text-2xl font-bold text-gray-700">Chào mừng đến với Trạm Lập Kế Hoạch Tour!</h2>
        <p className="mt-2 text-gray-500">Hãy chọn một địa điểm trên bản đồ để khám phá và lên kế hoạch cho chuyến đi của bạn.</p>
      </div>
    );
  }

  const details = locationDetails[selectedSite.Site] || {};

  return (
    <div className="p-6 md:p-8 bg-white rounded-xl shadow-lg border border-gray-200 mt-8 animate-fade-in">
      <h2 className="text-3xl font-bold text-green-800 mb-4">{selectedSite.Site}</h2>
      
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold text-gray-800 border-b-2 border-green-200 pb-2">🌸 Các Loài Hoa Nổi Bật</h3>
          <p className="text-gray-700 mt-2 pl-2">{details.flowers || "Thông tin đang được cập nhật."}</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-800 border-b-2 border-green-200 pb-2">🚗 Gợi Ý Di Chuyển</h3>
          <p className="text-gray-700 mt-2 pl-2">{details.transport || "Thông tin đang được cập nhật."}</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-800 border-b-2 border-green-200 pb-2">🏞️ Hoạt Động Trải Nghiệm</h3>
          <p className="text-gray-700 mt-2 pl-2">{details.activities || "Thông tin đang được cập nhật."}</p>
        </div>
      </div>
    </div>
  );
}

export default TourDetails;