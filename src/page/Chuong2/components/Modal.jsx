// src/pages/Chuong2/components/Modal.jsx

import React from 'react';

const Modal = ({ isOpen, onClose, title, characterName, imageSrc, children }) => {
  if (!isOpen) return null;

  return (
    // Lớp nền mờ
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      {/* Thân quyển sách */}
      <div 
        className="flex w-full max-w-4xl h-[60vh] bg-stone-100 rounded-lg shadow-2xl transform transition-all duration-300"
        onClick={(e) => e.stopPropagation()} // Ngăn việc click bên trong modal làm đóng nó
      >
        {/* Trang bên trái: Hình ảnh */}
        <div className="w-1/2 bg-stone-50 rounded-l-lg p-8 flex flex-col items-center justify-center text-center border-r-2 border-stone-200">
          <img src={imageSrc} alt={title} className="w-48 h-48 rounded-full object-cover border-4 border-amber-300 shadow-lg"/>
          <div className="mt-4">
            <h3 className="text-lg font-semibold text-gray-500">{title}</h3>
            <h2 className="text-4xl font-serif font-bold text-amber-800">{characterName}</h2>
          </div>
        </div>

        {/* Gáy sách */}
        <div className="w-4 bg-stone-300 shadow-inner"></div>

        {/* Trang bên phải: Nội dung */}
        <div className="w-1/2 p-8 relative overflow-y-auto">
          <button 
            onClick={onClose} 
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 text-3xl font-bold"
            aria-label="Đóng"
          >
            &times;
          </button>
          <div className="text-gray-700 leading-relaxed font-sans prose">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;