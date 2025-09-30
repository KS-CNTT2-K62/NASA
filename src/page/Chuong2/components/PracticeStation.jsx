// src/pages/Chuong2/components/PracticeStation.jsx

import React, { useState, useEffect } from 'react';
import graphImage from '../../../assets/chuong2/do-thi-chu-ky-pho.png';
import pixelImage from '../../../assets/chuong2/pixel-hon-hop.png';

// Component Slider nhỏ, dùng để điều khiển tỷ lệ phần trăm
const Slider = ({ label, color, value, onChange }) => (
  <div className="mb-4">
    <div className="flex justify-between items-center mb-1">
      <label className="font-semibold" style={{ color }}>{label}</label>
      <span className="px-2 py-1 text-sm rounded-md bg-gray-200 font-mono">{value}%</span>
    </div>
    <input
      type="range" min="0" max="100" value={value}
      onChange={(e) => onChange(parseInt(e.target.value, 10))}
      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
      style={{ accentColor: color }}
    />
  </div>
);

// Bảng màu RGB cho các thành phần
const COLORS = {
  flower: [255, 199, 0], // Vàng
  leaf:   [76, 175, 80],  // Xanh lá
  soil:   [139, 69, 19],  // Nâu
  shadow: [42, 42, 42],   // Xám đen
};

const PracticeStation = () => {
  const [flower, setFlower] = useState(20);
  const [leaf, setLeaf] = useState(30);
  const [soil, setSoil] = useState(40);
  const [shadow, setShadow] = useState(10);
  const [total, setTotal] = useState(100);
  const [pixelColor, setPixelColor] = useState('rgb(105, 93, 38)');

  useEffect(() => {
    const totalPercent = flower + leaf + soil + shadow;
    setTotal(totalPercent);

    if (totalPercent > 0) {
      const r = (COLORS.flower[0] * flower + COLORS.leaf[0] * leaf + COLORS.soil[0] * soil + COLORS.shadow[0] * shadow) / totalPercent;
      const g = (COLORS.flower[1] * flower + COLORS.leaf[1] * leaf + COLORS.soil[1] * soil + COLORS.shadow[1] * shadow) / totalPercent;
      const b = (COLORS.flower[2] * flower + COLORS.leaf[2] * leaf + COLORS.soil[2] * soil + COLORS.shadow[2] * shadow) / totalPercent;
      setPixelColor(`rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`);
    }

  }, [flower, leaf, soil, shadow]);

  return (
    <section id="Practice" className="py-20 bg-gradient-to-br from-indigo-50 to-purple-50">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold font-serif sparkle-text mb-12">Trạm Thực Hành Dữ Liệu 2</h2>

        <div className="grid lg:grid-cols-2 gap-12 items-stretch">
          
          <div className="bg-white p-8 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300 h-full flex flex-col">
            <h3 className="text-2xl font-bold text-indigo-600 mb-4">Hoạt động 1: Xây Dựng Chữ Ký Phổ</h3>
            <p className="text-gray-600 mb-6">Hãy xem cách "phiếu dữ liệu" được chuyển thành đồ thị trực quan nhé!</p>
            
            {/* CẬP NHẬT: Quay lại layout 2 cột, bỏ ảnh hoa */}
            <div className="flex flex-col md:flex-row gap-6 items-center flex-grow">
              <div className="w-full md:w-1/3 text-sm text-left">
                <table className="w-full bg-blue-50 rounded-lg overflow-hidden">
                  <thead className="bg-blue-200 text-blue-800">
                    <tr><th className="p-2" colSpan="2">Phiếu Dữ Liệu</th></tr>
                  </thead>
                  <tbody>
                    <tr><td className="p-2 border-t">Xanh (450)</td><td className="p-2 border-t font-mono">5%</td></tr>
                    <tr><td className="p-2 border-t">Lục (550)</td><td className="p-2 border-t font-mono">10%</td></tr>
                    <tr><td className="p-2 border-t">Đỏ (650)</td><td className="p-2 border-t font-mono">8%</td></tr>
                    <tr><td className="p-2 border-t">Cận IR (800)</td><td className="p-2 border-t font-mono">60%</td></tr>
                  </tbody>
                </table>
              </div>
              <div className="w-full md:w-2/3">
                <img src={graphImage} alt="Spectral Signature Graph" className="rounded-lg shadow-md mx-auto"/>
              </div>
            </div>

            {/* CẬP NHẬT: Bổ sung ý nghĩa bài tập */}
            <div className="mt-6 text-left p-4 bg-yellow-100 border-l-4 border-yellow-400">
              <h4 className="font-bold text-yellow-800">💡 Ý nghĩa bài tập:</h4>
              <p className="text-yellow-900 mt-1">Bài tập này giúp bạn hiểu cách các nhà khoa học biến những con số dữ liệu thô thành một "vân tay" hình ảnh độc nhất cho mỗi loại thực vật, gọi là chữ ký phổ.</p>
            </div>

            <div className="mt-4 text-left p-4 bg-indigo-50 rounded-lg">
              <h4 className="font-semibold text-lg mb-2">Khái niệm học thêm:</h4>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li><strong className="text-indigo-700">Quang phổ</strong>: Dải màu của ánh sáng.</li>
                <li><strong className="text-indigo-700">Bước sóng</strong>: Quyết định màu sắc.</li>
                <li><strong className="text-indigo-700">Phản xạ phổ</strong>: Tỷ lệ ánh sáng phản xạ.</li>
                <li><strong className="text-indigo-700">Trực quan hóa dữ liệu</strong>: Biến số thành hình.</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-white p-8 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300 h-full flex flex-col">
            <h3 className="text-2xl font-bold text-purple-600 mb-4">Hoạt động 2: Tách Lớp Pixel Hỗn Hợp</h3>
            <p className="text-gray-600 mb-6 flex-grow">Hãy dùng các thanh trượt để thay đổi thành phần và xem màu sắc của pixel thay đổi như thế nào.</p>
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="w-full md:w-1/3 flex flex-col items-center">
                  <div 
                    className="w-32 h-32 rounded-lg shadow-inner border-2 border-gray-300 transition-colors duration-200"
                    style={{ backgroundColor: pixelColor }}
                  ></div>
                  <p className="text-sm font-semibold mt-2">Pixel Hỗn Hợp</p>
              </div>
              <div className="w-full md:w-2/3">
                  <div className="p-4 bg-gray-100 rounded-lg">
                      <Slider label="Hoa Vàng" color={COLORS.flower.join()} value={flower} onChange={setFlower} />
                      <Slider label="Lá Xanh" color={COLORS.leaf.join()} value={leaf} onChange={setLeaf} />
                      <Slider label="Đất Nâu" color={COLORS.soil.join()} value={soil} onChange={setSoil} />
                      <Slider label="Bóng Râm" color={COLORS.shadow.join()} value={shadow} onChange={setShadow} />
                  </div>
              </div>
            </div>
            <div className={`mt-4 p-3 rounded-lg font-bold text-lg transition-colors ${total === 100 ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
              Tổng: {total}% {total !== 100 && "(Cần bằng 100%)"}
            </div>
            
            {/* CẬP NHẬT: Bổ sung ý nghĩa bài tập */}
            <div className="mt-6 text-left p-4 bg-yellow-100 border-l-4 border-yellow-400">
                <h4 className="font-bold text-yellow-800">💡 Ý nghĩa bài tập:</h4>
                <p className="text-yellow-900 mt-1">Bài tập này mô phỏng quá trình "phân rã phổ". Nó cho thấy một pixel từ vệ tinh không chỉ là một màu, mà là sự pha trộn của nhiều thành phần trên mặt đất.</p>
            </div>

            <div className="mt-4 text-left p-4 bg-purple-50 rounded-lg">
              <h4 className="font-semibold text-lg mb-2">Khái niệm học thêm:</h4>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                 <li><strong className="text-purple-700">Điểm ảnh (Pixel)</strong>: Đơn vị nhỏ nhất của ảnh.</li>
                <li><strong className="text-purple-700">Phân rã phổ</strong>: Kỹ thuật tách thành phần pixel.</li>
                <li><strong className="text-purple-700">Tỷ lệ thành phần</strong>: Tỷ lệ % của mỗi thành phần.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PracticeStation;