// src/App.jsx
import React, { useState } from 'react';
import Header from './components/Header';
import BloomMap from './components/BloomMap';
import TourDetail from './components/TourDetail';
import FlowerImageDisplay from './components/FlowerImageDisplay';

// Import hình ảnh minh họa (đảm bảo bạn có các file này trong src/assets)
import actionQueenImg from '../../assets/chuong5/action_queen.jpg';
import dataDashboardImg from '../../assets/chuong5/data_dashboard.png';
import beePollinationImg from '../../assets/chuong5/bee_pollination.png';
import invasivePlantsImg from '../../assets/chuong5/invasive_plants.jpg';
import superbloomTourImg from '../../assets/chuong5/superbloom_tour.jpg';
import whiteQueenImg from '../../assets/chuong5/white_queen.png';
import DataStorytellingStation from './components/DataStorytellingStation';


function App() {
  const [selectedSite, setSelectedSite] = useState(null);

  const handleSiteSelect = (siteProperties) => {
    setSelectedSite(siteProperties);
  };

  const DialogueBubble = ({ speaker, text, image, isAlice = false, color = 'bg-gray-100' }) => (
    <div className={`flex ${isAlice ? 'justify-end' : 'justify-start'} mb-6`}>
      <div className={`p-4 rounded-lg shadow-md max-w-2xl ${color} ${isAlice ? 'text-right' : 'text-left'}`}>
        <p className={`font-bold ${isAlice ? 'text-green-700' : 'text-purple-700'} mb-2`}>{speaker}:</p>
        <p className="text-gray-800 leading-relaxed text-lg">{text}</p>
        {image && <div className="mt-4 flex justify-center">{image}</div>}
      </div>
    </div>
  );


  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Header />
      <main className="container mx-auto p-4 md:p-8">

        {/* ==================================================================== */}
        {/* =================== NỘI DUNG CÂU CHUYỆN CHƯƠNG 5 =================== */}
        {/* ==================================================================== */}
        <div className="max-w-5xl mx-auto bg-white p-6 md:p-8 rounded-xl shadow-lg border border-gray-200 mb-12">
          
          <p className="text-center italic text-gray-600 mb-8">
            (Trang 33-40) | Mục tiêu học tập: Hiểu ứng dụng thực tiễn của dữ liệu hoa nở trong các lĩnh vực khác nhau, khuyến khích tư duy phản biện và truyền cảm hứng hành động vì môi trường.
          </p>

          <div className="space-y-6">
            <p className="text-lg text-gray-700 leading-relaxed">
              Họ bước vào "Phòng Triển Lãm Hành Động," nơi những màn hình lớn hiển thị các dự án thực tế đang được triển khai nhờ dữ liệu về hoa nở. Một người phụ nữ mạnh mẽ, mặc bộ đồ bảo hộ màu xanh lá cây và cầm một cây bút chỉ laser, đang đứng trước một màn hình.
            </p>

            {/* Cuộc đối thoại */}
            <DialogueBubble
              speaker="Nữ Hoàng Hành Động"
              text={
                <>
                  Chào Alice. Ta là <strong className="text-purple-700">Nữ Hoàng Hành Động</strong>. Ở đây, chúng ta biến 'dữ liệu' thành 'hành động' để bảo vệ và phát triển thế giới xanh của chúng ta. Đây là đỉnh cao của <em>phân tích dữ liệu</em> – tạo ra <em>tác động thực tế</em>.
                </>
              }
              image={
                // Placeholder cho hình ảnh Nữ Hoàng Hành Động
                <img src={actionQueenImg} alt="Nữ Hoàng Hành Động" className="w-64 h-auto rounded-lg shadow-md" />
              }
              color="bg-green-100"
            />

            <DialogueBubble
              speaker="Alice"
              text="Dữ liệu về hoa nở có thể giúp ích gì cho cuộc sống ạ?"
              isAlice={true}
              color="bg-blue-100"
            />

            <DialogueBubble
              speaker="Nữ Hoàng Hành Động"
              text={
                <>
                  Rất nhiều, Alice! Hãy xem các <strong className="text-purple-700">ứng dụng thực tiễn</strong> của chúng ta:
                  <br /><br />
                  <p className="font-semibold text-lg text-green-800">🌱 Nông nghiệp thông minh:</p>
                  "Dữ liệu về 'mùa phấn hoa' và 'thời điểm nở hoa' giúp người nông dân <em className="text-green-600">tối ưu hóa</em> 'lịch nuôi ong', đảm bảo mùa màng bội thu. Nếu <em className="text-red-600">dữ liệu hoa nở bất thường</em> (dữ liệu ngoại lệ) cho thấy dấu hiệu sâu bệnh, nó giúp chúng ta 'phát hiện và xử lý' kịp thời, giảm thiểu thiệt hại mùa màng."
                </>
              }
              image={
                // Placeholder cho hình ảnh Ong thụ phấn
                <img src={beePollinationImg} alt="Ong thụ phấn" className="w-64 h-auto rounded-lg shadow-md" />
              }
              color="bg-green-100"
            />

            <DialogueBubble
              speaker="Nữ Hoàng Hành Động"
              text={
                <>
                  <p className="font-semibold text-lg text-green-800">🌳 Bảo tồn thiên nhiên:</p>
                  "Bằng cách 'theo dõi dữ liệu nở hoa' qua các <strong className="text-blue-700">hệ thống thông tin địa lý (GIS)</strong>, chúng ta có thể 'phát hiện sớm' các loài cây xâm lấn đang đe dọa các loài hoa bản địa. Dữ liệu cũng giúp chúng ta 'đánh giá sức khỏe' của các hệ sinh thái, 'lên kế hoạch' bảo vệ những khu vực có giá trị sinh học cao. Đây là <em className="text-blue-600">quản lý tài nguyên dựa trên dữ liệu</em>."
                </>
              }
              image={
                // Placeholder cho hình ảnh Hệ thống GIS / Cây xâm lấn
                <img src={invasivePlantsImg} alt="Cây xâm lấn" className="w-64 h-auto rounded-lg shadow-md" />
              }
              color="bg-green-100"
            />

            <DialogueBubble
              speaker="Nữ Hoàng Hành Động"
              text={
                <>
                  <p className="font-semibold text-lg text-green-800">🗺️ Du lịch và giáo dục:</p>
                  "Dữ liệu dự đoán 'thời điểm đẹp nhất để tham quan superbloom' giúp ngành du lịch <em className="text-orange-600">quản lý đám đông</em>, <em className="text-orange-600">tối ưu hóa lộ trình</em>, và <em className="text-orange-600">phát triển du lịch bền vững</em>. Các ứng dụng di động cung cấp 'thông tin dữ liệu' về các loài hoa, 'giáo dục cộng đồng' về tầm quan trọng của thiên nhiên, nâng cao <em className="text-orange-600">nhận thức về dữ liệu</em>."
                </>
              }
              image={
                // Placeholder cho hình ảnh Du lịch Superbloom
                <img src={superbloomTourImg} alt="Du lịch Superbloom" className="w-64 h-auto rounded-lg shadow-md" />
              }
              color="bg-green-100"
            />

            <DialogueBubble
              speaker="Nữ Hoàng Hành Động"
              text={
                <>
                  Cháu thấy không? <strong className="text-purple-700">Dữ liệu không chỉ là con số, mà là 'tiếng vọng' của cơ hội</strong> để chúng ta hiểu, hành động và 'tạo ra sự thay đổi' tích cực, 'bảo vệ vẻ đẹp' của Trái Đất cho các thế hệ tương lai. Điều này đòi hỏi <em className="text-red-600">tư duy phản biện</em> để luôn đặt câu hỏi về nguồn gốc và độ tin cậy của dữ liệu.
                </>
              }
              color="bg-green-100"
            />

            <DialogueBubble
              speaker="Alice"
              text="Cháu cảm thấy tràn đầy năng lượng và quyết tâm. Cháu hiểu rằng hành trình của mình với dữ liệu không chỉ dừng lại ở việc học hỏi mà còn là việc ứng dụng kiến thức để tạo ra những giá trị thực sự."
              isAlice={true}
              color="bg-blue-100"
            />

            <p className="text-lg text-gray-700 leading-relaxed mt-10">
              Nữ Hoàng Trắng từ từ hiện ra, mái tóc bạc ánh lên như những sợi tơ dữ liệu. "Chào mừng trở lại, Alice. Cháu đã hoàn thành cuộc hành trình tuyệt vời của mình. Cháu đã hiểu rằng 'vẻ đẹp của hoa' có nhiều lớp hơn cháu nghĩ. Từ sắc màu đến sắc tố, từ pixel đến chỉ số, từ địa phương đến toàn cầu, và từ quá khứ đến tương lai."
            </p>

            <DialogueBubble
              speaker="Nữ Hoàng Trắng"
              text={
                <>
                  Alice, cháu đã trở thành một <strong className="text-purple-700">'Nhà Khoa Học Dữ Liệu Hoa' thực thụ</strong>, một người có khả năng 'giải mã' những bí ẩn của thiên nhiên bằng sức mạnh của dữ liệu. Bây giờ, đã đến lượt cháu <em className="text-orange-600">'lan tỏa vẻ đẹp dữ liệu' này</em>. Hãy <strong className="text-red-600">'kêu gọi hành động'</strong>!
                </>
              }
              image={
                // Placeholder cho hình ảnh Nữ Hoàng Trắng
                <img src={whiteQueenImg} alt="Nữ Hoàng Trắng" className="w-64 h-auto rounded-lg shadow-md" />
              }
              color="bg-purple-100"
            />

          </div>
        </div>

        {/* ==================================================================== */}
        {/* ======================= TRẠM THỰC HÀNH DỮ LIỆU ====================== */}
        {/* ==================================================================== */}
        <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-200 mt-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">Bản Đồ Du Lịch Sinh Thái Hoa Nở</h2>
          <BloomMap 
            onSiteSelect={handleSiteSelect} 
            selectedSiteName={selectedSite ? selectedSite.Site : null}
          />
        </div>
        
        {/* Component hiển thị chi tiết tour */}
        {/* <TourDetail selectedSite={selectedSite} /> */}
         {/* Bố cục mới cho TourDetail và FlowerImageDisplay */}
        <div className="flex flex-col md:flex-row gap-8 mt-8">
          {/* Component hiển thị chi tiết tour - chiếm 2/3 chiều rộng */}
          <div className="md:w-2/3">
            <TourDetail selectedSite={selectedSite} />
          </div>

          {/* Component hiển thị hình ảnh hoa - chiếm 1/3 chiều rộng và có tỷ lệ 1:1 (vuông) */}
          <div className="md:w-1/3">
            <div className="relative pt-[100%]"> {/* Tạo tỷ lệ 1:1 cho div cha */}
              <div className="absolute top-0 left-0 w-full h-full"> {/* Đặt component con vào div có tỷ lệ */}
                <FlowerImageDisplay selectedSite={selectedSite} />
              </div>
            </div>
          </div>
        </div>
        <DataStorytellingStation />      
      </main>
    </div>
  );
}

export default App;