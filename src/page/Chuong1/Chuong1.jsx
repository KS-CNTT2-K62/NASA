import React, { useState, useEffect } from 'react';

// Component cho một bông hoa có thể kéo thả (cho Hoạt động 1)
const DraggableFlower = ({ id, color, petals, diameter, top, left }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: left, y: top });
  const [initialMouse, setInitialMouse] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setInitialMouse({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const dx = e.clientX - initialMouse.x;
      const dy = e.clientY - initialMouse.y;
      setPosition({ x: position.x + dx, y: position.y + dy });
      setInitialMouse({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };
  
  // SVG đơn giản cho bông hoa
  const flowerSvg = (
    <svg width="60" height="60" viewBox="0 0 100 100" className="drop-shadow-md">
      <circle cx="50" cy="50" r="15" fill="yellow" />
      {[...Array(petals)].map((_, i) => (
        <ellipse
          key={i}
          cx="50"
          cy="50"
          rx="20"
          ry="35"
          fill={color}
          transform={`rotate(${(360 / petals) * i} 50 50)`}
        />
      ))}
    </svg>
  );

  return (
    <div
      style={{ top: `${position.y}px`, left: `${position.x}px`, cursor: isDragging ? 'grabbing' : 'grab' }}
      className="absolute"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp} // Ngừng kéo khi chuột rời khỏi
    >
      {flowerSvg}
      <div className="text-center text-xs w-full mt-1">
        {diameter}cm
      </div>
    </div>
  );
};

// Component chính cho sách lật Chương 1
export default function Chuong1() {
  const [currentPage, setCurrentPage] = useState(0);

  // Dữ liệu cho các trang sách
  const pages = [
    // Trang 1
    {
      content: (
        <div className="flex flex-col items-center justify-center h-full text-center p-8">
          <h2 className="text-3xl font-bold text-green-800 mb-4">Chương 1: Bí Mật Sắc Màu Rực Rỡ và Công Thức Của Thiên Nhiên</h2>
          <div className="w-48 h-48 bg-green-200 rounded-full flex items-center justify-center mb-6 shadow-lg">
             <img src="https://img.icons8.com/plasticine/100/sprout.png" alt="sprout" className="w-24 h-24"/>
          </div>
          <p className="text-gray-700 leading-relaxed max-w-md">
            Alice cảm thấy mình đang đứng trên một ngọn đồi thoai thoải, bao quanh bởi một thảm thực vật xanh mướt. Nhưng lạ thay, không có một bông hoa nào! Bầu trời trong xanh, và không khí trong lành mang theo mùi đất ẩm dịu.
          </p>
        </div>
      ),
    },
    // Trang 2
    {
      content: (
        <div className="flex flex-col md:flex-row items-center h-full p-8 gap-8">
          <div className="w-40 h-40 md:w-56 md:h-56 flex-shrink-0">
             <img src="https://img.icons8.com/external-flaticons-lineal-color-flat-icons/128/external-gardener-professions-man-flaticons-lineal-color-flat-icons-2.png" alt="gardener" className="w-full h-full object-contain"/>
          </div>
          <div className="text-gray-700 leading-relaxed">
            <p className="mb-4">"Chào mừng đến 'Đồng Cỏ Quan Sát'," một giọng nói ấm áp vang lên. Alice quay lại và thấy một ông lão với mái tóc bạc trắng, khuôn mặt hiền từ, đang đeo một chiếc kính lúp gắn trên mũ. Ông mặc một chiếc áo khoác màu nâu đất, điểm xuyết những hình ảnh hoa lá trừu tượng.</p>
            <p className="mb-4">"Ta là <strong>Người Gác Vườn Kỳ Diệu</strong>," ông nói, nở nụ cười hiền hậu. "Ta có nhiệm vụ bảo vệ và quan sát những thảm hoa vĩ đại của Trái Đất."</p>
            <p>"Chào ông, cháu là Alice," cô bé lễ phép đáp. "Nữ Hoàng Trắng đã gửi cháu đến đây để tìm hiểu về hoa nở."</p>
          </div>
        </div>
      ),
    },
    // Trang 3
    {
       content: (
        <div className="flex flex-col items-center h-full p-8 text-center">
            <h3 className="text-2xl font-bold text-purple-700 mb-4">Hiện Tượng "Superbloom"</h3>
            <div className="w-48 h-48 bg-blue-100 rounded-lg flex items-center justify-center mb-4 shadow-md overflow-hidden">
                <img src="https://images.unsplash.com/photo-1552563932-d815e548318d?q=80&w=2070&auto=format&fit=crop" alt="Superbloom" className="w-full h-full object-cover"/>
            </div>
            <p className="text-gray-700 leading-relaxed max-w-lg">
                Người Gác Vườn giải thích: "Đó chính là hiện tượng 'superbloom', một tấm thảm hoa lớn bằng cả một thành phố! Khi hàng tỷ hạt giống tỉnh giấc và cùng nhau nở rộ."
            </p>
            <div className="mt-4 text-sm text-left w-full max-w-lg bg-yellow-100 p-3 rounded-lg border border-yellow-300">
                <p>🌿 <strong>Dữ liệu định tính:</strong> Màu sắc, vẻ đẹp của thảm hoa.</p>
                <p>🔢 <strong>Dữ liệu định lượng:</strong> Số lượng hoa, diện tích, điều kiện môi trường.</p>
            </div>
        </div>
      ),
    },
    // Trang 4
    {
      content: (
        <div className="p-8 h-full">
            <h3 className="text-2xl font-bold text-center text-pink-600 mb-4">Vườn Sắc Tố</h3>
            <p className="text-center text-gray-700 mb-6">Màu sắc của hoa là những 'thư mời' đặc biệt, được tạo ra bởi những 'họa sĩ' bí mật:</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div className="bg-orange-100 p-4 rounded-lg shadow">
                    <h4 className="font-bold text-orange-600">Carotenoids</h4>
                    <p className="text-sm">Họa sĩ màu vàng, cam rực rỡ.</p>
                </div>
                <div className="bg-red-100 p-4 rounded-lg shadow">
                    <h4 className="font-bold text-red-600">Anthocyanins</h4>
                    <p className="text-sm">Họa sĩ màu tím, đỏ lãng mạn.</p>
                </div>
                <div className="bg-purple-100 p-4 rounded-lg shadow">
                    <h4 className="font-bold text-purple-600">Betalains</h4>
                    <p className="text-sm">Họa sĩ đặc biệt tạo màu tím, đỏ độc đáo.</p>
                </div>
            </div>
        </div>
      ),
    },
    // Trang 5
    {
      content: (
        <div className="p-8 h-full">
            <h3 className="text-2xl font-bold text-center text-blue-700 mb-4">Nhà Bếp Thiên Nhiên</h3>
            <p className="text-center text-gray-700 mb-6">Để tạo ra superbloom, thiên nhiên cần một 'công thức' hoàn hảo từ các 'nguyên liệu' dữ liệu:</p>
            <ul className="space-y-3 text-gray-700 list-disc list-inside bg-green-50 p-4 rounded-lg">
                <li><strong>Mưa vừa đủ:</strong> Dữ liệu chuỗi thời gian về lượng mưa.</li>
                <li><strong>Những năm khô trước đó:</strong> Dữ liệu lịch sử về hạn hán.</li>
                <li><strong>Nhiệt độ tăng dần:</strong> Dữ liệu nhiệt độ đất và không khí.</li>
                <li><strong>Đất đai phù hợp:</strong> Dữ liệu về thành phần đất (pH, dinh dưỡng).</li>
            </ul>
        </div>
      )
    },
    // Trang 6
    {
      content: (
        <div className="p-6 h-full">
          <h3 className="text-xl font-bold text-center text-teal-600 mb-2">Trạm Thực Hành 1: Phân Loại Dữ Liệu</h3>
          <p className="text-center text-sm text-gray-600 mb-4">Hãy kéo và thả những bông hoa vào đúng ô phân loại nhé!</p>
          <div className="relative w-full h-80 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 mb-4">
             {/* Hoa có thể kéo thả */}
             <DraggableFlower id={1} color="#f87171" petals={5} diameter={5} top={20} left={20} />
             <DraggableFlower id={2} color="#fbbf24" petals={8} diameter={7} top={100} left={80} />
             <DraggableFlower id={3} color="#a78bfa" petals={6} diameter={6} top={40} left={150} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="border border-blue-400 bg-blue-100 rounded-lg p-3 text-center h-24">
              <h4 className="font-bold text-blue-800">Dữ liệu định tính</h4>
              <p className="text-xs">(Màu sắc)</p>
            </div>
            <div className="border border-green-400 bg-green-100 rounded-lg p-3 text-center h-24">
              <h4 className="font-bold text-green-800">Dữ liệu định lượng</h4>
              <p className="text-xs">(Số cánh, đường kính)</p>
            </div>
          </div>
        </div>
      ),
    },
    // Trang 7
    {
      content: (
        <SuperbloomSimulator />
      )
    },
    // Trang 8
    {
      content: (
        <div className="flex flex-col items-center justify-center h-full text-center p-8">
            <h3 className="text-2xl font-bold text-yellow-600 mb-4">Bài học đúc kết</h3>
            <p className="text-gray-700 leading-relaxed max-w-lg mb-6">
                Superbloom là một hiện tượng kỳ vĩ, được tạo nên từ sự kết hợp của nhiều yếu tố môi trường. Mỗi yếu tố có thể được biểu diễn và phân tích bằng các loại dữ liệu khác nhau.
            </p>
            <div className="w-32 h-32">
                <img src="https://img.icons8.com/external-flaticons-flat-flat-icons/128/external-idea-achievements-flaticons-flat-flat-icons.png" alt="idea" className="w-full h-full object-contain"/>
            </div>
            <p className="text-gray-600 mt-6 italic">
                Người Gác Vườn mỉm cười: "Cháu đã sẵn sàng nhìn hoa bằng một con mắt khoa học hơn chưa, Alice?"
            </p>
        </div>
      )
    }
  ];

  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, pages.length - 1));
  };

  const goToPreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 0));
  };

  return (
    <div className="bg-amber-50 min-h-screen flex flex-col items-center justify-center p-4 font-sans">
        <div className="w-full max-w-4xl aspect-[4/3] bg-white rounded-2xl shadow-2xl flex flex-col p-6 relative">
            {/* Nội dung trang */}
            <div className="flex-grow overflow-auto">
                {pages[currentPage].content}
            </div>

            {/* Điều hướng */}
            <div className="absolute bottom-4 left-6">
                {currentPage > 0 && (
                    <button onClick={goToPreviousPage} className="px-4 py-2 bg-yellow-400 text-white font-bold rounded-full hover:bg-yellow-500 transition-colors shadow-md">
                        Trang trước
                    </button>
                )}
            </div>
            <div className="absolute bottom-4 right-6">
                {currentPage < pages.length - 1 && (
                    <button onClick={goToNextPage} className="px-4 py-2 bg-yellow-400 text-white font-bold rounded-full hover:bg-yellow-500 transition-colors shadow-md">
                        Trang sau
                    </button>
                )}
            </div>
             {/* Số trang */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-gray-500 text-sm">
                Trang {currentPage + 1} / {pages.length}
            </div>
        </div>
    </div>
  );
}


// Component mô phỏng cho Trang 7
function SuperbloomSimulator() {
    const [rain, setRain] = useState(50);
    const [drought, setDrought] = useState(2); // years
    const [temp, setTemp] = useState(20); // Celsius
    const [bloomStrength, setBloomStrength] = useState(0);

    useEffect(() => {
        // "Điểm ngọt" cho superbloom
        const rainOptimal = rain > 60 && rain < 85;
        const droughtOptimal = drought >= 2;
        const tempOptimal = temp > 18 && temp < 25;
        
        let strength = 0;
        if (rainOptimal) strength += 40;
        if (droughtOptimal) strength += 30;
        if (tempOptimal) strength += 30;

        // Thêm một chút ngẫu nhiên
        strength = Math.min(100, strength + Math.random() * 5);

        setBloomStrength(strength);

    }, [rain, drought, temp]);

    return (
        <div className="p-6 h-full flex flex-col">
            <h3 className="text-xl font-bold text-center text-indigo-600 mb-2">Thí Nghiệm Biến Đổi Thời Tiết</h3>
            <p className="text-center text-sm text-gray-600 mb-4">Điều chỉnh các thanh trượt để tạo ra một 'superbloom' mạnh nhất!</p>
            
            <div className="space-y-4 flex-grow">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Lượng mưa (mm)</label>
                    <input type="range" min="0" max="100" value={rain} onChange={(e) => setRain(e.target.value)} className="w-full" />
                    <span className="text-xs text-gray-500">{rain} mm</span>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Năm khô hạn trước đó</label>
                    <input type="range" min="0" max="5" value={drought} onChange={(e) => setDrought(e.target.value)} className="w-full" />
                    <span className="text-xs text-gray-500">{drought} năm</span>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Nhiệt độ (°C)</label>
                    <input type="range" min="0" max="40" value={temp} onChange={(e) => setTemp(e.target.value)} className="w-full" />
                    <span className="text-xs text-gray-500">{temp}°C</span>
                </div>
            </div>

            <div className="mt-4 text-center">
                <p className="font-bold">Độ mạnh Superbloom:</p>
                <div className="w-full bg-gray-200 rounded-full h-4 mt-1">
                    <div 
                        className="bg-gradient-to-r from-green-400 to-blue-500 h-4 rounded-full transition-all duration-500" 
                        style={{ width: `${bloomStrength}%` }}>
                    </div>
                </div>
                 <p className="text-lg font-bold mt-1" style={{color: `hsl(${bloomStrength*1.2}, 100%, 45%)`}}>{Math.round(bloomStrength)}%</p>
            </div>
        </div>
    );
}
