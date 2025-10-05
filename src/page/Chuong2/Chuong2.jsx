// src/pages/Chuong2/Chuong2.jsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PracticeStation from './components/PracticeStation';
import Modal from './components/Modal';

// Import ảnh từ thư mục assets
import aliceImage from '../../assets/chuong2/images/Alice – Nhà Giải Mã Dữ Liệu.png';
import detectiveImage from '../../assets/chuong2/images/thám tử phổ quang.png';
import gardenImage from '../../assets/chuong2/images/3,5.png';
import groundImage from '../../assets/chuong2/images/bac-si-hoa.png';
import airImage from '../../assets/chuong2/images/tho-san-may.png';
import spaceImage from '../../assets/chuong2/images/nguoi-gac-dem.png';
import viewImage from '../../assets/chuong2/images/4.png';
import smaImage from '../../assets/chuong2/images/5.png';

// Style cho phông chữ và các hiệu ứng nhỏ
const customStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@700&family=Roboto:wght@400&display=swap');
  
  .font-serif { 
    font-family: 'Cormorant Garamond', serif; 
  }
  .font-sans { 
    font-family: 'Roboto', sans-serif; 
  }
  .platform-door, .interactive-image {
    cursor: pointer;
    border: 4px solid transparent;
    transition: all 0.3s ease;
  }
  .platform-door:hover, .interactive-image:hover {
    transform: scale(1.05);
    box-shadow: 0 10px 20px rgba(0,0,0,0.1);
  }
`;

const Chuong2 = () => {
  const [activeModal, setActiveModal] = useState(null);

  return (
    <>
      <style>{customStyles}</style>
      <div className="bg-slate-100 font-sans">
{/*       
        <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-sm shadow-md">
          <div className="container mx-auto flex items-center justify-between p-4">
            <Link to="/" aria-current="page" className="font-serif text-2xl font-bold text-sky-600">BloomWatch</Link>
            <nav className="hidden items-center space-x-6 md:flex">
              <a href="#StoryStart" className="text-slate-600 hover:text-sky-600">Câu Chuyện</a>
              <a href="#Platforms" className="text-slate-600 hover:text-sky-600">Đôi Mắt Quan Sát</a>
              <a href="#Analysis" className="text-slate-600 hover:text-sky-600">Giải Mã</a>
              <a href="#Practice" className="text-slate-600 hover:text-sky-600">Thực Hành</a>
            </nav>
            <a href="#TOC" className="rounded-md bg-sky-600 px-4 py-2 font-bold text-white hover:bg-sky-700 transition-colors">Mục Lục</a>
          </div>
        </header> */}

        <main>
          <section className="text-white text-center py-20 px-4 relative overflow-hidden bg-gradient-to-br from-sky-400 to-cyan-400">
              <div className="absolute top-0 left-0 w-full h-full bg-black/10"></div>
              <div className="relative z-10 max-w-4xl mx-auto">
                  <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-4 drop-shadow-lg">
                      Chương 2
                  </h1>
                  <p className="mt-4 text-2xl md:text-3xl font-light">Đôi Mắt Dữ Liệu Của Thiên Nhiên</p>
              </div>
          </section>

          <section id="StoryStart" className="py-20 bg-white">
              <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center gap-12">
                <div className="lg:w-1/2 space-y-8">
                  <h2 className="text-4xl font-serif font-bold text-cyan-700">Cuộc Gặp Gỡ Ở Vườn Quang Phổ</h2>
                  <div className="flex items-center gap-4">
                    <img src={aliceImage} alt="Alice" className="w-28 h-28 rounded-full border-4 border-cyan-200 flex-shrink-0"/>
                    <p className="text-lg leading-relaxed text-slate-700">Khi Alice bước qua cánh cửa, cô bé thấy mình đang đứng trong một căn phòng kỳ lạ với những bức tường gương phản chiếu những dải ánh sáng đủ màu sắc.</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <img src={detectiveImage} alt="Thám Tử Phổ Quang" className="w-28 h-28 rounded-full border-4 border-sky-200 flex-shrink-0"/>
                    <p className="text-lg italic text-slate-600">"Chào Alice, ta là <strong>Thám Tử Phổ Quang</strong>. Chào mừng đến với Vườn Quang Phổ!"</p>
                  </div>
                </div>
                <div className="lg:w-1/2">
                  <img 
                    src={gardenImage} 
                    alt="Garden of Spectrums" 
                    className="rounded-xl shadow-2xl interactive-image w-full lg:w-4/5 mx-auto"
                    onClick={() => setActiveModal('garden')}
                  />
                  <p className="text-center text-sm italic text-slate-500 mt-2">(Nhấn vào ảnh để nghe Thám Tử giải thích)</p>
                </div>
              </div>
          </section>
          
          <section id="Platforms" className="py-20 bg-sky-50">
            <div className="container mx-auto px-6">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-serif font-bold text-slate-800">Phòng Trưng Bày Đôi Mắt Quan Sát</h2>
                <p className="mt-4 text-lg text-slate-600 max-w-3xl mx-auto">Thám Tử Phổ Quang dẫn Alice đến đây. "Để 'đọc' được những câu chuyện ánh sáng của hoa, chúng ta cần nhiều nền tảng quan sát viễn thám khác nhau," cô giải thích.</p>
              </div>
              <div  className='flex gap-20'>
                <div className="flex flex-col gap-10 flex-1 w-0">
                  <div className="platform-door bg-white rounded-lg p-6 text-center shadow-lg">
                    Sử dụng máy đo phổ cầm tay ASD FieldSpec-4 để "khám bệnh" cho từng bông hoa, thu thập dữ liệu cực kỳ chi tiết.
                    Độ phân giải không gian: Rất cao (chỉ vài centimet).
                    Độ bao phủ không gian: Nhỏ (chỉ một khu vực nhỏ).
                  </div>
                  <div className="platform-door bg-white rounded-lg p-6 text-center shadow-lg">
                    Sử dụng thiết bị AVIRIS-NG gắn trên máy bay bay ở độ cao 20km, giống như "chụp X-quang" cả một cánh đồng.
                    Độ phân giải không gian: Trung bình (khoảng 1-5 mét).
                    Độ phân giải phổ: Cao (rất nhiều dải màu).
                    Độ bao phủ không gian: Lớn (cả một vùng rộng lớn).
                  </div>
                  <div className="platform-door bg-white rounded-lg p-6 text-center shadow-lg">
                    Sử dụng vệ tinh EMIT trên Trạm Vũ trụ Quốc tế (ISS) ở độ cao 400km để "quan sát" cả một lục địa.

                    Độ phân giải không gian: Thấp (mỗi pixel tương đương 60 mét).
                    Độ bao phủ không gian: Cực kỳ lớn (quan sát toàn cầu).
                  </div>
                </div>
                <div className='flex-1 w-0'>
                  <img
                  src={viewImage}
                  alt="Garden of Spectrums"
                  className="rounded-xl shadow-2xl interactive-image"
                />
                </div>
              </div>
            </div>
          </section>
          
          <section id="Analysis" className="py-20 bg-white">
              <div className="container mx-auto px-6">
                  <div className="text-center mb-16">
                      <h2 className="text-4xl font-serif font-bold text-slate-800">Phòng Tranh Hỗn Hợp & Hành Lang Bí Mật</h2>
                  </div>
                  <div className="flex flex-col lg:flex-row items-center gap-12">
                  <div className="lg:w-5/12">
                      <img src={smaImage} alt="Spectral Mixture Analysis Visualization" className="rounded-xl shadow-2xl"/>
                  </div>
                  <div className="lg:w-7/12 space-y-6 text-slate-700 text-lg">
                      <p className="leading-relaxed italic">"Dữ liệu càng nhiều, câu chuyện càng đầy đủ," Thám Tử Phổ Quang nói. "Nhưng có một 'vấn đề' lớn với ảnh viễn thám – đó là <strong className="text-red-600">'pixel hỗn hợp'</strong>!"</p>
                      <div>
                      <h3 className="text-2xl font-bold text-red-700 mb-2 font-serif">Phân tích Hỗn hợp Phổ (SMA)</h3>
                      <p>Một 'điểm ảnh' (pixel) trên ảnh vệ tinh có thể là 'bức tranh pha trộn' của 20% hoa vàng, 30% lá xanh, 40% đất nâu và 10% bóng râm. SMA giống như 'Photoshop của Thiên Nhiên', giúp chúng ta 'tách từng lớp' của pixel để biết chính xác tỷ lệ phần trăm của từng thành phần.</p>
                      </div>
                      <div>
                      <h3 className="text-2xl font-bold text-indigo-700 mb-2 font-serif">Dấu Vết Ẩn Giấu (MRR)</h3>
                      <p>"Và đôi khi, bí mật còn nằm ở 'những gì còn sót lại' – đó là <strong>Mixture Residual Reflectance (MRR)</strong>," cô ấy dẫn Alice đến "Hành Lang Bí Mật." MRR chứa 'bí mật' của những thành phần nhỏ bé, giúp phân biệt hai loài hoa vàng trông rất giống nhau dựa trên các đặc điểm phổ tinh tế của chúng.</p>
                      </div>
                  </div>
                  </div>
              </div>
          </section>

          <section id="Practice" className="bg-slate-200 py-20 px-6 md:px-12">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-4xl font-bold text-center mb-12 text-slate-800 font-serif">Trạm Thực Hành Dữ Liệu</h2>
              <PracticeStation />
            </div>
          </section>
          
          <section className="py-16 px-6 md:px-12 text-white bg-gradient-to-br from-amber-400 to-orange-500">
               <div className="max-w-4xl mx-auto text-center">
                  <h2 className="text-3xl font-bold mb-6 drop-shadow font-serif">Bài học đúc kết</h2>
                  <p className="text-xl leading-relaxed mb-6 bg-black/10 p-4 rounded-lg backdrop-blur-sm">
                      🎓 Ánh sáng không chỉ để nhìn, mà còn để "đọc". Các công nghệ viễn thám và kỹ thuật phân tích hình ảnh là những công cụ mạnh mẽ giúp chúng ta giải mã những thông điệp ẩn giấu trong từng pixel, từ đó khám phá bí mật của thế giới tự nhiên.
                  </p>
              </div>
          </section>
          
          <section id="TOC" className="py-16 bg-slate-800 text-white">
              <div className="container mx-auto px-6 text-center">
                <p className="text-2xl font-serif italic text-amber-300">"Tuyệt vời, Alice! Cháu đã sẵn sàng để 'dạy' máy tính cách nhìn hoa chưa?"</p>
                <p className="mt-2 text-slate-400">Chương tiếp theo: Thế giới của Trí Tuệ Nhân Tạo!</p>
                <div className="flex justify-center gap-6 mt-12">
                  <Link to="/Chuong1" className="bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 px-6 rounded-lg transition-colors">&larr; Về Chương 1</Link>
                  <Link to="/Chuong3" className="bg-sky-500 hover:bg-sky-400 text-slate-900 font-bold py-3 px-6 rounded-lg transition-colors">Tới Chương 3 &rarr;</Link>
                </div>
              </div>
          </section>
        </main>
        

        <Modal isOpen={activeModal === 'garden'} onClose={() => setActiveModal(null)} title="Câu Chuyện Của Ánh Sáng" characterName="Lời Giải Thích Của Thám Tử" imageSrc={detectiveImage}>
          <div className="space-y-4">
              <p>Nhiệm vụ của ta là 'nghe' những câu chuyện mà ánh sáng kể khi nó chạm vào mọi vật. Khi ánh sáng mặt trời chạm vào một bông hoa, một phần ánh sáng bị bông hoa 'ăn vào bụng' (gọi là <strong className="text-purple-600">hấp thụ</strong>), một phần khác bị 'văng ra ngoài' (gọi là <strong className="text-blue-600">phản xạ</strong>).</p>
              <p>Chính sự <strong className="text-blue-600">phản xạ ánh sáng</strong> này tạo nên màu sắc mà cháu thấy! Mỗi loài hoa có một 'vân tay ánh sáng' riêng, hay còn gọi là <strong className="font-bold text-red-600">chữ ký phổ (Spectral Signature)</strong>.</p>
              <p>Bằng cách phân tích những dải ánh sáng mà hoa 'văng ra' (gọi là <strong className="text-green-600">quang phổ phản xạ</strong>), chúng ta có thể biết được loài hoa đó là gì, nó khỏe mạnh ra sao.</p>
          </div>
        </Modal>
        <Modal isOpen={activeModal === 'ground'} onClose={() => setActiveModal(null)} title="Đôi Mắt Thứ Nhất" characterName="Bác Sĩ Hoa" imageSrc={groundImage}>
          <p>Sử dụng máy đo phổ cầm tay <strong className="text-green-600">ASD FieldSpec-4</strong> để "khám bệnh" cho từng bông hoa, thu thập dữ liệu cực kỳ chi tiết.</p>
          <ul className="list-disc list-inside mt-4 space-y-2">
              <li><strong>Độ phân giải không gian:</strong> <span className="font-bold text-green-700">Rất cao</span> (chỉ vài centimet).</li>
              <li><strong>Độ bao phủ không gian:</strong> <span className="font-bold text-red-700">Nhỏ</span> (chỉ một khu vực nhỏ).</li>
          </ul>
        </Modal>
        <Modal isOpen={activeModal === 'air'} onClose={() => setActiveModal(null)} title="Đôi Mắt Thứ Hai" characterName="Thợ Săn Mây Quang Phổ" imageSrc={airImage}>
          <p>Sử dụng thiết bị <strong className="text-sky-600">AVIRIS-NG</strong> gắn trên máy bay bay ở độ cao 20km, giống như "chụp X-quang" cả một cánh đồng.</p>
          <ul className="list-disc list-inside mt-4 space-y-2">
              <li><strong>Độ phân giải không gian:</strong> <span className="font-bold text-yellow-600">Trung bình</span> (khoảng 1-5 mét).</li>
              <li><strong>Độ phân giải phổ:</strong> <span className="font-bold text-green-700">Cao</span> (rất nhiều dải màu).</li>
              <li><strong>Độ bao phủ không gian:</strong> <span className="font-bold text-green-700">Lớn</span> (cả một vùng rộng lớn).</li>
          </ul>
        </Modal>
        <Modal isOpen={activeModal === 'space'} onClose={() => setActiveModal(null)} title="Đôi Mắt Thứ Ba" characterName="Người Gác Đêm Vũ Trụ" imageSrc={spaceImage}>
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