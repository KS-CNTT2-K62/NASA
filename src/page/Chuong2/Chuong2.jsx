// src/pages/Chuong2/Chuong2.jsx

import React, { useState } from 'react';
import PracticeStation from './components/PracticeStation';
import Modal from './components/Modal';

// Import ảnh từ thư mục assets
import aliceImage from '../../assets/chuong2/alice.png';
import detectiveImage from '../../assets/chuong2/tham-tu-pho-quang.png';
import gardenImage from '../../assets/chuong2/vuon-quang-pho.png';
import groundImage from '../../assets/chuong2/bac-si-hoa.png';
import airImage from '../../assets/chuong2/tho-san-may.png';
import spaceImage from '../../assets/chuong2/nguoi-gac-dem.png';
import smaImage from '../../assets/chuong2/sma-visual.png';

// CSS không có thay đổi lớn
const customStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Roboto:wght@400&display=swap');
  .font-serif { font-family: 'Playfair Display', serif; }
  .font-sans { font-family: 'Roboto', sans-serif; }
  .storybook-section {
    border-bottom: 2px dashed #e0e0e0;
    padding-top: 5rem;
    padding-bottom: 5rem;
  }
  .sparkle-text {
    background: linear-gradient(90deg, #4f46e5, #db2777, #f59e0b, #4f46e5);
    background-size: 200% auto;
    color: transparent;
    -webkit-background-clip: text;
    background-clip: text;
    animation: sparkle-animation 5s linear infinite;
  }
  @keyframes sparkle-animation { to { background-position: 200% center; } }
  .platform-door, .interactive-image {
    cursor: pointer;
    border: 4px solid transparent;
    transition: all 0.3s ease;
    

    
  }
  .platform-door:hover, .interactive-image:hover {
    transform: scale(1.05);
    border-color: #f59e0b;
    box-shadow: 0 10px 20px rgba(0,0,0,0.1);
  }
  .fireworks-container {
    position: absolute; top: 0; left: 0; width: 100%; height: 100%;
    overflow: hidden; pointer-events: none;
  }
  .firework {
    position: absolute; width: 4px; height: 4px; background-color: #fff;
    border-radius: 50%; opacity: 0; animation: firework-shoot 1.5s ease-out forwards;
  }
  @keyframes firework-shoot {
    0% { transform: translateY(100px); opacity: 1; }
    80% { opacity: 1; }
    100% { transform: translateY(-200px); opacity: 0; }
  }
  .firework::before {
    content: ''; position: absolute; left: 50%; top: 50%;
    transform: translate(-50%, -50%); width: 0; height: 0; border-radius: 50%;
    box-shadow: 0 0 20px 10px #ffc700, 0 0 30px 20px #f59e0b, 0 0 50px 30px rgba(255, 159, 11, 0.5);
    opacity: 0; animation: firework-explode 0.6s ease-out forwards; animation-delay: 1.5s;
  }
  @keyframes firework-explode {
    0% { width: 4px; height: 4px; opacity: 1; }
    100% { width: 250px; height: 250px; opacity: 0; }
  }
`;

const Chuong2 = () => {
  const [activeModal, setActiveModal] = useState(null);

  return (
    <>
      <style>{customStyles}</style>
      <div className="bg-stone-50 text-gray-800 font-sans">
        
        <header className="sticky top-0 z-40 bg-white shadow-md">
            <div className="container mx-auto flex items-center justify-between p-4">
             <a href="/" aria-current="page" className="font-serif text-2xl font-bold text-blue-800">BloomWatch</a>
            <nav className="hidden items-center space-x-6 md:flex">
              <a href="#StoryStart" className="text-gray-600 hover:text-blue-600">Câu Chuyện</a>
              <a href="#Platforms" className="text-gray-600 hover:text-blue-600">Đôi Mắt Quan Sát</a>
              <a href="#Analysis" className="text-gray-600 hover:text-blue-600">Giải Mã</a>
              <a href="#Practice" className="text-gray-600 hover:text-blue-600">Thực Hành</a>
            </nav>
            <a href="#TOC" className="rounded-md bg-blue-600 px-4 py-2 font-bold text-white hover:bg-blue-700 transition-colors">Mục Lục</a>
          </div>
        </header>

        <main>
          <section className="text-center py-20 bg-gradient-to-b from-blue-200 to-stone-50">
            <div className="container mx-auto px-6">
              <h1 className="text-5xl md:text-6xl font-serif font-black sparkle-text">
                Chương 2: Đôi Mắt Dữ Liệu Của Thiên Nhiên
              </h1>
            </div>
          </section>

          {/* CẬP NHẬT: Thay đổi bố cục cho đường gạch dọc */}
          <section id="StoryStart" className="storybook-section container mx-auto px-6">
            <div className="flex flex-col lg:flex-row items-center gap-8">
              {/* Khối text bên trái */}
              <div className="lg:w-1/2 space-y-8">
                <h2 className="text-4xl font-serif font-bold text-purple-700">Cuộc Gặp Gỡ Ở Vườn Quang Phổ</h2>
                <div className="flex items-center gap-4">
                  <img src={aliceImage} alt="Alice" className="w-28 h-28 rounded-full border-4 border-purple-200 flex-shrink-0"/>
                  <p className="text-lg leading-relaxed text-gray-700">Khi Alice bước qua cánh cửa, cô bé thấy mình đang đứng trong một căn phòng kỳ lạ với những bức tường gương phản chiếu những dải ánh sáng đủ màu sắc.</p>
                </div>
                <div className="flex items-center gap-4">
                  <img src={detectiveImage} alt="Thám Tử Phổ Quang" className="w-28 h-28 rounded-full border-4 border-blue-200 flex-shrink-0"/>
                  <p className="text-lg italic text-gray-600">"Chào Alice, ta là <strong>Thám Tử Phổ Quang</strong>. Chào mừng đến với Vườn Quang Phổ!"</p>
                </div>
              </div>

              {/* Đường gạch dọc ở giữa */}
              <div className="hidden lg:block w-px h-64 bg-gray-300 rounded-full"></div>

              {/* Khối ảnh bên phải */}
              <div className="lg:w-1/2">
                <img 
                  src={gardenImage} 
                  alt="Garden of Spectrums" 
                  className="rounded-xl shadow-2xl interactive-image w-2/3 mx-auto"
                  onClick={() => setActiveModal('garden')}
                />
                <p className="text-center text-sm italic text-gray-500 mt-2">(Nhấn vào ảnh để nghe Thám Tử giải thích)</p>
              </div>
            </div>
          </section>

          <section id="Platforms" className="storybook-section bg-blue-50">
            <div className="container mx-auto px-6">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-serif font-bold sparkle-text">Phòng Trưng Bày Đôi Mắt Quan Sát</h2>
                <p className="mt-2 text-lg text-gray-600 max-w-3xl mx-auto">Thám Tử Phổ Quang dẫn Alice đến đây. "Để 'đọc' được những câu chuyện ánh sáng của hoa, chúng ta cần nhiều nền tảng quan sát viễn thám khác nhau," cô giải thích.</p>
              </div>
              <div className="grid md:grid-cols-3 gap-10">
                <div onClick={() => setActiveModal('ground')} className="platform-door bg-white rounded-lg p-6 text-center shadow-lg">
                  <img src={groundImage} alt="Ground Observation" className="h-32 w-32 mx-auto mb-4 rounded-full"/>
                  <h3 className="text-2xl font-bold text-green-700">Mặt Đất</h3>
                </div>
                <div onClick={() => setActiveModal('air')} className="platform-door bg-white rounded-lg p-6 text-center shadow-lg">
                  <img src={airImage} alt="Airborne Observation" className="h-32 w-32 mx-auto mb-4 rounded-full"/>
                  <h3 className="text-2xl font-bold text-sky-700">Trên Không</h3>
                </div>
                <div onClick={() => setActiveModal('space')} className="platform-door bg-white rounded-lg p-6 text-center shadow-lg">
                  <img src={spaceImage} alt="Space Observation" className="h-32 w-32 mx-auto mb-4 rounded-full"/>
                  <h3 className="text-2xl font-bold text-indigo-700">Không Gian</h3>
                </div>
              </div>
            </div>
          </section>

          <section id="Analysis" className="storybook-section container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-serif font-bold sparkle-text">Phòng Tranh Hỗn Hợp & Hành Lang Bí Mật</h2>
            </div>
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="lg:w-5/12">
                <img src={smaImage} alt="Spectral Mixture Analysis Visualization" className="rounded-xl shadow-2xl"/>
              </div>
              <div className="lg:w-7/12 space-y-6">
                <p className="text-lg leading-relaxed italic text-gray-700">"Dữ liệu càng nhiều, câu chuyện càng đầy đủ," Thám Tử Phổ Quang nói. "Nhưng có một 'vấn đề' lớn với ảnh viễn thám – đó là <strong className="text-red-600">'pixel hỗn hợp'</strong>!"</p>
                <div>
                  <h3 className="text-2xl font-bold text-red-700 mb-2">Phân tích Hỗn hợp Phổ (SMA)</h3>
                  <p>Một 'điểm ảnh' (pixel) trên ảnh vệ tinh có thể là 'bức tranh pha trộn' của 20% hoa vàng, 30% lá xanh, 40% đất nâu và 10% bóng râm. SMA giống như 'Photoshop của Thiên Nhiên', giúp chúng ta 'tách từng lớp' của pixel để biết chính xác tỷ lệ phần trăm của từng thành phần.</p>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-indigo-700 mb-2">Dấu Vết Ẩn Giấu (MRR)</h3>
                  <p>"Và đôi khi, bí mật còn nằm ở 'những gì còn sót lại' – đó là <strong>Mixture Residual Reflectance (MRR)</strong>," cô ấy dẫn Alice đến "Hành Lang Bí Mật." MRR chứa 'bí mật' của những thành phần nhỏ bé, giúp phân biệt hai loài hoa vàng trông rất giống nhau dựa trên các đặc điểm phổ tinh tế của chúng.</p>
                </div>
              </div>
            </div>
          </section>

          <PracticeStation />

          <section className="py-20 relative bg-gradient-to-br from-yellow-50 to-orange-100 overflow-hidden">
            <div className="fireworks-container">
              <div className="firework" style={{left: '10%', top: '80%', animationDelay: '0.2s'}}></div>
              <div className="firework" style={{left: '85%', top: '70%', animationDelay: '0.5s'}}></div>
              <div className="firework" style={{left: '50%', top: '90%', animationDelay: '0.8s'}}></div>
              <div className="firework" style={{left: '25%', top: '60%', animationDelay: '1.2s'}}></div>
              <div className="firework" style={{left: '75%', top: '85%', animationDelay: '0.4s'}}></div>
            </div>
            <div className="container mx-auto px-6 text-center relative z-10">
              <h3 className="text-4xl font-serif font-bold sparkle-text mb-6">Bài Học Đúc Kết Chương 2</h3>
              <p className="max-w-4xl mx-auto text-lg text-gray-800">
                🎓 Qua chương này, Alice đã hiểu rằng ánh sáng không chỉ để nhìn, mà còn để "đọc". Các công nghệ viễn thám 🛰️ và kỹ thuật phân tích hình ảnh 🧩 là những công cụ mạnh mẽ giúp chúng ta giải mã những thông điệp ẩn giấu trong từng pixel, từ đó khám phá bí mật của thế giới tự nhiên.
              </p>
            </div>
          </section>

          <section className="py-16 bg-gray-800 text-white">
            <div className="container mx-auto px-6 text-center">
              <p className="text-2xl font-serif italic text-yellow-300">"Tuyệt vời, Alice! Cháu đã sẵn sàng để 'dạy' máy tính cách nhìn hoa chưa?"</p>
              <p className="mt-2 text-gray-400">Chương tiếp theo: Thế giới của Trí Tuệ Nhân Tạo!</p>
              <div className="flex justify-center gap-6 mt-12">
                <a href="/Chuong1" className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg transition-colors">&larr; Về Chương 1</a>
                <a href="/Chuong3" className="bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-bold py-3 px-6 rounded-lg transition-colors">Tới Chương 3 &rarr;</a>
              </div>
            </div>
          </section>
        </main>
        
        <footer className="bg-gray-900 py-6 text-center text-gray-400"><p><strong>BloomWatch Project © 2025</strong></p></footer>

        <Modal 
          isOpen={activeModal === 'garden'} 
          onClose={() => setActiveModal(null)}
          title="Câu Chuyện Của Ánh Sáng"
          characterName="Lời Giải Thích Của Thám Tử"
          imageSrc={detectiveImage}
        >
          <div className="space-y-4">
            <p>Nhiệm vụ của ta là 'nghe' những câu chuyện mà ánh sáng kể khi nó chạm vào mọi vật. Khi ánh sáng mặt trời chạm vào một bông hoa, một phần ánh sáng bị bông hoa 'ăn vào bụng' (gọi là <strong className="text-purple-600">hấp thụ</strong>), một phần khác bị 'văng ra ngoài' (gọi là <strong className="text-blue-600">phản xạ</strong>).</p>
            <p>Chính sự <strong className="text-blue-600">phản xạ ánh sáng</strong> này tạo nên màu sắc mà cháu thấy! Mỗi loài hoa có một 'vân tay ánh sáng' riêng, hay còn gọi là <strong className="font-bold text-red-600">chữ ký phổ (Spectral Signature)</strong>.</p>
            <p>Bằng cách phân tích những dải ánh sáng mà hoa 'văng ra' (gọi là <strong className="text-green-600">quang phổ phản xạ</strong>), chúng ta có thể biết được loài hoa đó là gì, nó khỏe mạnh ra sao.</p>
          </div>
        </Modal>
        <Modal 
          isOpen={activeModal === 'ground'} 
          onClose={() => setActiveModal(null)}
          title="Đôi Mắt Thứ Nhất"
          characterName="Bác Sĩ Hoa"
          imageSrc={groundImage}
        >
          <p>Sử dụng máy đo phổ cầm tay <strong className="text-green-600">ASD FieldSpec-4</strong> để "khám bệnh" cho từng bông hoa, thu thập dữ liệu cực kỳ chi tiết.</p>
          <ul className="list-disc list-inside mt-4 space-y-2">
            <li><strong>Độ phân giải không gian:</strong> <span className="font-bold text-green-700">Rất cao</span> (chỉ vài centimet).</li>
            <li><strong>Độ bao phủ không gian:</strong> <span className="font-bold text-red-700">Nhỏ</span> (chỉ một khu vực nhỏ).</li>
          </ul>
        </Modal>
        <Modal 
          isOpen={activeModal === 'air'} 
          onClose={() => setActiveModal(null)}
          title="Đôi Mắt Thứ Hai"
          characterName="Thợ Săn Mây Quang Phổ"
          imageSrc={airImage}
        >
          <p>Sử dụng thiết bị <strong className="text-sky-600">AVIRIS-NG</strong> gắn trên máy bay bay ở độ cao 20km, giống như "chụp X-quang" cả một cánh đồng.</p>
          <ul className="list-disc list-inside mt-4 space-y-2">
            <li><strong>Độ phân giải không gian:</strong> <span className="font-bold text-yellow-600">Trung bình</span> (khoảng 1-5 mét).</li>
            <li><strong>Độ phân giải phổ:</strong> <span className="font-bold text-green-700">Cao</span> (rất nhiều dải màu).</li>
            <li><strong>Độ bao phủ không gian:</strong> <span className="font-bold text-green-700">Lớn</span> (cả một vùng rộng lớn).</li>
          </ul>
        </Modal>
        <Modal 
          isOpen={activeModal === 'space'} 
          onClose={() => setActiveModal(null)}
          title="Đôi Mắt Thứ Ba"
          characterName="Người Gác Đêm Vũ Trụ"
          imageSrc={spaceImage}
        >
          <p>Sử dụng vệ tinh <strong className="text-indigo-600">EMIT</strong> trên Trạm Vũ trụ Quốc tế (ISS) ở độ cao 400km để "quan sát" cả một lục địa.</p>
          <ul className="list-disc list-inside mt-4 space-y-2">
            <li><strong>Độ phân giải không gian:</strong> <span className="font-bold text-red-700">Thấp</span> (mỗi pixel tương đương 60 mét).</li>
            <li><strong>Độ bao phủ không gian:</strong> <span className="font-bold text-green-700">Cực kỳ lớn</span> (quan sát toàn cầu).</li>
          </ul>
        </Modal>
      </div>
    </>
  );
};

export default Chuong2;