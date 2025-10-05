// src/pages/Chuong2/components/Modal.jsx

import React from 'react';

const Modal = ({ isOpen, onClose, title, characterName, imageSrc, children }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm p-4 transition-opacity duration-300"
      onClick={onClose}
    >
      <div 
        className="flex w-full max-w-4xl h-auto max-h-[80vh] bg-white rounded-lg shadow-2xl transform transition-all duration-300 font-sans"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Trang bên trái: Hình ảnh */}
        <div className="w-2/5 bg-slate-50 rounded-l-lg p-8 flex flex-col items-center justify-center text-center border-r-2 border-slate-200">
          <img src={imageSrc} alt={title} className="w-48 h-48 rounded-full object-cover border-4 border-sky-300 shadow-lg"/>
          <div className="mt-4">
            <h3 className="text-lg font-semibold text-slate-500">{title}</h3>
            <h2 className="text-4xl font-serif font-bold text-sky-700">{characterName}</h2>
          </div>
        </div>

        {/* Gáy sách */}
        <div className="w-4 bg-slate-200 shadow-inner"></div>

        {/* Trang bên phải: Nội dung */}
        <div className="w-3/5 p-8 relative">
          <button 
            onClick={onClose} 
            className="absolute top-4 right-4 text-slate-400 hover:text-slate-800 text-3xl font-bold"
            aria-label="Đóng"
          >
            &times;
          </button>
          <div className="text-slate-700 leading-relaxed prose max-h-[70vh] overflow-y-auto pr-4">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;