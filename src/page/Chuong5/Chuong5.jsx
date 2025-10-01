// src/App.jsx
import React, { useState } from 'react';
import Header from './components/Header';
import BloomMap from './components/BloomMap'; // Import component bản đồ
import TourDetail from './components/TourDetail'; // Import component chi tiết tour

function App() {
  const [selectedSite, setSelectedSite] = useState(null);

  const handleSiteSelect = (siteProperties) => {
    setSelectedSite(siteProperties);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Header />
      <main className="container mx-auto p-4 md:p-8">
        
        <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-200">
          <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">Bản Đồ Du Lịch Sinh Thái Hoa Nở</h2>
          <BloomMap 
            onSiteSelect={handleSiteSelect} 
            selectedSiteName={selectedSite ? selectedSite.Site : null}
          />
        </div>
        
        {/* Component hiển thị chi tiết tour */}
        <TourDetail selectedSite={selectedSite} />

      </main>
    </div>
  );
}

export default App;