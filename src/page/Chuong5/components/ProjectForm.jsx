// src/components/ProjectForm.jsx
import React, { useState } from 'react';

function ProjectForm({ onProjectSubmit }) {
  const [formData, setFormData] = useState({
    objective: '',
    dataToCollect: '',
    analysisMethod: '',
    expectedOutcome: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onProjectSubmit(formData);
  };

  const formFields = [
    { name: 'objective', label: '🎯 Mục Tiêu Dự Án', placeholder: 'Dự án này nhằm giải quyết vấn đề gì?' },
    { name: 'dataToCollect', label: '📊 Dữ Liệu Cần Thu Thập', placeholder: 'Bạn cần những loại dữ liệu nào? (ví dụ: loại hoa, vị trí GPS, thời gian nở...)' },
    { name: 'analysisMethod', label: '🔬 Phương Pháp Phân Tích', placeholder: 'Bạn sẽ phân tích dữ liệu này như thế nào? (ví dụ: thống kê, mô hình hóa...)' },
    { name: 'expectedOutcome', label: '🏆 Kết Quả Mong Đợi', placeholder: 'Tác động tích cực mà dự án sẽ tạo ra là gì?' },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {formFields.map(field => (
        <div key={field.name}>
          <label htmlFor={field.name} className="block text-lg font-medium text-gray-700 mb-2">{field.label}</label>
          <textarea
            id={field.name}
            name={field.name}
            rows="4"
            value={formData[field.name]}
            onChange={handleChange}
            placeholder={field.placeholder}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
            required
          />
        </div>
      ))}
      <button type="submit" className="w-full bg-green-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-700 transition-colors duration-300 text-lg shadow-lg">
        Hoàn Thành Thiết Kế Dự Án
      </button>
    </form>
  );
}

export default ProjectForm;