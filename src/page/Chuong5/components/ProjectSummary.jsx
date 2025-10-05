// src/components/ProjectSummary.jsx
import React from 'react';

function ProjectSummary({ projectData, onReset }) {
  return (
    <div className="p-6 bg-white rounded-lg shadow-xl border border-green-500 animate-fade-in">
      <h2 className="text-3xl font-bold text-green-700 mb-4 text-center">🎉 Congratulations! Your Project Plan Is Ready! 🎉</h2>
      <p className="text-center text-gray-600 mb-6">Here is the action plan for the Flower Data Scientist:</p>
      
      <div className="space-y-4 text-left">
        <div>
          <h3 className="text-xl font-semibold text-gray-800">🎯 Objective</h3>
          <p className="text-gray-700 mt-1 pl-4 border-l-2 border-gray-200">{projectData.objective}</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-800">📊 Data to Collect</h3>
          <p className="text-gray-700 mt-1 pl-4 border-l-2 border-gray-200">{projectData.dataToCollect}</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-800">🔬 Analysis Method</h3>
          <p className="text-gray-700 mt-1 pl-4 border-l-2 border-gray-200">{projectData.analysisMethod}</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-800">🏆 Expected Outcome</h3>
          <p className="text-gray-700 mt-1 pl-4 border-l-2 border-gray-200">{projectData.expectedOutcome}</p>
        </div>
      </div>

      <button onClick={onReset} className="mt-8 w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300 text-lg shadow-lg">
        Design Another Project
      </button>
    </div>
  );
}

export default ProjectSummary;