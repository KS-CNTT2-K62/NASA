// src/App.jsx
import React, { useState } from 'react';
import Header from './components/Header';
import ProjectIdeas from './components/ProjectIdeas';
import ProjectForm from './components/ProjectForm';
import ProjectSummary from './components/ProjectSummary';
import BloomMap from './components/BloomMap'; // Import component bản đồ

function App() {
  const [projectData, setProjectData] = useState(null);

  const handleProjectSubmit = (data) => {
    setProjectData(data);
  };
  
  const handleReset = () => {
    setProjectData(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* <Header /> */}
      <main className="container mx-auto p-4 md:p-8">

        {/* Component Bản đồ */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Bản Đồ Dữ Liệu Hoa Nở</h2>
          <BloomMap />
        </div>
        
        {/* Component "Máy tính bảng dự án" */}
        <div className="max-w-3xl mx-auto bg-white p-6 md:p-8 rounded-xl shadow-lg border border-gray-200">
          {!projectData ? (
            <>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Thiết Kế Tour Du Lịch Sinh Thái</h2>
              <p className="text-gray-600 mb-6">Dựa vào bản đồ trên, hãy thiết kế một tour du lịch độc đáo!</p>
              {/* <ProjectIdeas /> */}
              <ProjectForm onProjectSubmit={handleProjectSubmit} />
            </>
          ) : (
            <ProjectSummary projectData={projectData} onReset={handleReset} />
          )}
        </div>
      </main>
    </div>
  );
}

export default App;