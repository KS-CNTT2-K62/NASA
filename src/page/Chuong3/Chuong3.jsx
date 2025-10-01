import React from 'react';

// A style component to inject keyframe animations for the background blobs.
const GlobalStyles = () => (
    <style>{`
        @keyframes blob {
            0% { transform: translate(0px, 0px) scale(1); }
            33% { transform: translate(30px, -50px) scale(1.1); }
            66% { transform: translate(-20px, 20px) scale(0.9); }
            100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
            animation: blob 8s infinite ease-in-out;
        }
    `}</style>
);


// Helper component for styled keywords to make them stand out.
const Keyword = ({ children }) => (
  <span className="font-bold text-violet-700 bg-violet-200/50 px-1.5 py-0.5 rounded-md">{children}</span>
);

// Helper component for icons to add visual appeal.
const Icon = ({ path, className = "w-6 h-6 inline-block mr-2" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d={path} />
  </svg>
);

// An interactive-looking card for the practice activities, with a more playful style.
const ActivityCard = ({ number, title, challenge, concepts, color }) => {
    const colorThemes = {
        purple: {
            bg: 'bg-purple-100',
            border: 'border-purple-300',
            shadow: 'hover:shadow-[8px_8px_0px_#c084fc]',
            iconBg: 'bg-purple-200',
            iconText: 'text-purple-800',
            headerText: 'text-purple-800'
        },
        pink: {
            bg: 'bg-pink-100',
            border: 'border-pink-300',
            shadow: 'hover:shadow-[8px_8px_0px_#f472b6]',
            iconBg: 'bg-pink-200',
            iconText: 'text-pink-800',
            headerText: 'text-pink-800'
        },
        yellow: {
            bg: 'bg-yellow-100',
            border: 'border-yellow-300',
            shadow: 'hover:shadow-[8px_8px_0px_#facc15]',
            iconBg: 'bg-yellow-200',
            iconText: 'text-yellow-800',
            headerText: 'text-yellow-800'
        }
    };

    const theme = colorThemes[color] || colorThemes.purple;

    return (
        <div className={`bg-white/80 backdrop-blur-sm border-2 ${theme.border} rounded-2xl p-6 transition-all duration-300 ${theme.shadow} hover:-translate-y-2 hover:-translate-x-1`}>
            <h3 className={`text-2xl font-bold ${theme.headerText} mb-3`}>
                <span className={`${theme.iconBg} ${theme.iconText} rounded-full w-8 h-8 flex items-center justify-center mr-3 float-left font-display`}>{number}</span>
                {title}
            </h3>
            <p className="text-gray-600 mb-4 italic">"{challenge}"</p>
            <div className={`${theme.bg} rounded-lg p-4 border ${theme.border}`}>
                <h4 className={`font-semibold ${theme.headerText} mb-2 flex items-center`}>
                    <Icon path="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                    Khái niệm học thêm:
                </h4>
                <p className="text-sm text-gray-700">{concepts}</p>
            </div>
        </div>
    );
};


export default function App() {
  return (
    <>
      <GlobalStyles />
      <div className="relative min-h-screen bg-violet-50 font-sans text-gray-800 overflow-x-hidden">
        {/* --- Animated Background Blobs --- */}
        <div className="absolute top-0 -left-12 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-blob"></div>
        <div className="absolute top-24 -right-12 w-72 h-72 bg-yellow-200 rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-blob" style={{ animationDelay: '2s' }}></div>
        <div className="absolute -bottom-12 left-20 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-blob" style={{ animationDelay: '4s' }}></div>

        <div className="relative z-10 container mx-auto p-4 sm:p-8 max-w-5xl">
          
          {/* --- Header --- */}
          <header className="text-center mb-16">
            <h2 className="text-lg font-bold text-purple-500 tracking-wider">Chương 3 (Trang 17-24)</h2>
            <h1 className="text-4xl sm:text-6xl font-extrabold text-gray-800 mt-2 leading-tight">
                Khi Máy Móc
                <span className="block bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent mt-2">
                    "Nhìn", "Hiểu" và "Đếm" Hoa
                </span>
            </h1>
          </header>

          {/* --- Learning Objective --- */}
          <div className="bg-white/70 backdrop-blur-sm border-2 border-pink-300 rounded-2xl p-6 mb-12 shadow-lg">
              <h3 className="text-xl font-bold text-pink-700 mb-3 flex items-center">
                  <Icon path="M15.042 21.672L13.684 16.6m0 0l-2.51-2.225.569-9.47 5.227 7.917-3.286-.672zM12 2.25V4.5m5.834.166l-1.591 1.591M20.25 12h-2.25m-1.166 5.834L15.6 15.6m-3.292-3.292l-1.591-1.591M4.5 12H2.25m1.166-5.834L4.8 7.8m3.292-3.292l1.591 1.591M12 21.75V19.5" className="w-8 h-8 text-pink-500 mr-3" />
                  Mục tiêu học tập
              </h3>
              <p className="text-gray-700 leading-relaxed">
                  Hiểu các khái niệm cơ bản về <Keyword>Học Máy (Machine Learning)</Keyword>, <Keyword>giảm chiều dữ liệu (PCA)</Keyword>, <Keyword>phân cụm không giám sát (GMM)</Keyword> và các <Keyword>chỉ số thực vật (MRBI, RENDVI)</Keyword> trong việc phân tích dữ liệu hoa nở.
              </p>
          </div>

          {/* --- Story Content with Integrated Activities --- */}
          <div className="space-y-6 leading-relaxed text-lg">
            <p>Alice và Thám Tử Phổ Quang bước vào "Trường Học Máy Móc," một căn phòng rộng lớn với hàng chục "Robot Học Sinh" đang ngồi trước màn hình. Một người phụ nữ trẻ với mái tóc búi cao, đeo kính và mặc áo blouse trắng có in các mạch điện tử, đang giảng bài trước một bảng tương tác khổng lồ.</p>
            
            <blockquote className="border-l-4 border-purple-400 pl-4 py-3 bg-purple-100/50 rounded-r-lg text-purple-900 text-xl italic">
              "Chào mừng đến 'Trường Học Máy Móc'," cô ấy nói, nở nụ cười tươi tắn. "Ta là <Keyword>Giáo Sư Học Máy</Keyword>. Hôm nay, chúng ta sẽ 'dạy' những chú robot này cách 'nhìn', 'hiểu' và thậm chí 'đếm' hoa như chúng ta!"
            </blockquote>

            <p>"Làm sao máy tính có thể 'nhìn' và 'hiểu' hoa ạ?" Alice hỏi, tò mò.</p>
            <p>"Tất cả là nhờ <Keyword>Học Máy (Machine Learning)</Keyword>, Alice ạ," Giáo Sư Học Máy giải thích. "Đó là cách chúng ta giúp máy tính 'học' từ dữ liệu. Để máy tính học hiệu quả, đầu tiên chúng ta cần <Keyword>Tiền xử lý dữ liệu</Keyword> và 'giảm hành lý' cho nó."</p>
            <p>Cô ấy chỉ vào một màn hình hiển thị hàng trăm dòng dữ liệu quang phổ của hoa, mỗi dòng có đến 400 'thông tin ánh sáng'. "Quá nhiều đúng không? Chúng ta dùng <Keyword>PCA – Phân tích Thành phần Chính</Keyword>. PCA giống như một 'chuyên gia gói ghém hành lý', nó sẽ tìm ra những 'thông tin quan trọng nhất' trong số 400 thông tin đó. Đây là một kỹ thuật <Keyword>giảm chiều dữ liệu</Keyword> hiệu quả."</p>
            
            {/* --- Activity 1: PCA --- */}
            <div className="my-12">
                <ActivityCard color="purple" number="1" title="Trạm Thực Hành: Gói Ghém Hành Lý Dữ Liệu (PCA)" challenge="Từ 100 loài hoa với 20 đặc trưng, hãy thử 'chọn 5 đặc trưng quan trọng nhất' để mô tả mỗi loài." concepts="Đặc trưng dữ liệu (Features), Giảm chiều dữ liệu (Dimensionality Reduction), Trích xuất đặc trưng (Feature Extraction)." />
            </div>

            <p>Sau khi PCA được thực hiện, những dòng dữ liệu ngắn gọn hơn hiện ra. "Bây giờ, chúng ta sẽ 'nhóm bạn cùng sở thích' cho những bông hoa này bằng <Keyword>GMM – Mô hình Hỗn hợp Gaussian</Keyword>."</p>
            <p>"GMM là một 'phép thuật phân loại' đặc biệt," Giáo Sư Học Máy hào hứng. "Nó sẽ giúp máy tính tự động 'xếp' những bông hoa có 'vân tay ánh sáng' giống nhau vào cùng một nhóm (phân cụm), mà không cần chúng ta phải 'chỉ dẫn' trước. Đây gọi là <Keyword>phân cụm không giám sát</Keyword> – máy tính tự học để phát hiện các <Keyword>mẫu hình ẩn</Keyword> trong dữ liệu."</p>

            {/* --- Activity 2: GMM --- */}
            <div className="my-12">
                 <ActivityCard color="pink" number="2" title="Trạm Thực Hành: Nhóm Hoa Không Cần Chỉ Dẫn (GMM)" challenge="Hãy 'sử dụng mô hình GMM' ảo để 'nhóm' 50 bông hoa thành 3 nhóm 'có vẻ giống nhau' nhất mà không cần biết tên loài." concepts="Phân cụm (Clustering), Khoảng cách dữ liệu (Data Distance), Phân loại không giám sát (Unsupervised Classification)." />
            </div>

            <p>Sau khi phân loại hoa, Giáo Sư Học Máy dẫn Alice đến "Phòng Thí Nghiệm Chỉ Số," nơi những bảng tính khổng lồ hiển thị các con số và biểu đồ đang thay đổi liên tục. "Để 'đếm' và 'theo dõi' hoa, chúng ta dùng những 'công thức toán học biết nói' – những <Keyword>chỉ số thực vật</Keyword>," cô giải thích.</p>
            
            <div className="bg-blue-100/50 p-6 rounded-2xl border-2 border-blue-200 shadow-md">
              <h4 className="text-xl font-bold text-blue-800 mb-4">Các "Công Thức Toán Học Biết Nói"</h4>
              <div className="space-y-4">
                <p><Keyword>MRBI – Chỉ số Nở hoa Phần Dư Hỗn hợp:</Keyword> "Đây là một 'chỉ số ma thuật' được phát minh để đặc biệt 'tìm' và 'đếm' hoa vàng... MRBI giúp chúng ta <Keyword>định lượng sự hiện diện</Keyword> của hoa vàng."</p>
                <p><Keyword>RENDVI – Chỉ số Thực vật Khác biệt Chuẩn hóa Biên Đỏ:</Keyword> "RENDVI là 'Nhiệt kế của sự sống xanh'. Chỉ số này giúp chúng ta 'đo' <Keyword>độ xanh của lá cây</Keyword>, cho biết cây cối có khỏe mạnh không... Nó rất hữu ích trong việc theo dõi <Keyword>sức khỏe thực vật</Keyword>."</p>
              </div>
            </div>
            
            <p>"Dữ liệu MRBI và RENDVI đã giúp chúng ta 'theo dõi' cường độ nở hoa... Đây là <Keyword>phân tích định lượng</Keyword> giúp chúng ta 'hiểu' được 'khí hậu đang nói gì' với những bông hoa."</p>

            {/* --- Activity 3: RENDVI --- */}
            <div className="my-12">
                 <ActivityCard color="yellow" number="3" title="Trạm Thực Hành: Tính Chỉ Số Sức Sống (RENDVI)" challenge="Hãy 'tính chỉ số RENDVI' cho mỗi bông hoa bằng công thức (NIR - Red) / (NIR + Red) để đánh giá 'sức khỏe xanh' của chúng." concepts="Chỉ số thực vật (Vegetation Index), Quang phổ cận hồng ngoại (Near-Infrared Spectrum), Định lượng sức sống thực vật (Quantifying Vegetation Vigor)." />
            </div>
          </div>
          
          {/* --- Conclusion --- */}
          <div className="bg-gradient-to-r from-purple-200 to-pink-200 p-8 rounded-2xl shadow-inner text-center my-16">
              <h3 className="text-2xl font-bold text-purple-900 mb-3">Bài học đúc kết</h3>
              <p className="text-lg text-purple-800 max-w-3xl mx-auto">
                  Học Máy và các chỉ số thực vật là những công cụ mạnh mẽ để máy tính có thể "nhìn", "hiểu" và "đếm" hoa từ dữ liệu quang phổ, giúp chúng ta xử lý dữ liệu lớn, trích xuất thông tin quan trọng và phát hiện các mẫu hình ẩn giấu.
              </p>
          </div>

          {/* --- End of Chapter --- */}
          <footer className="text-center text-lg text-gray-700">
              <p>Alice cảm thấy bộ não của mình được mở rộng với những khái niệm mới. Giáo Sư Học Máy vỗ tay.</p>
              <p className="font-semibold italic text-purple-700 mt-2">"Tuyệt vời, Alice! Cháu đã giúp những chú robot này hiểu được ngôn ngữ của hoa. Giờ thì, chúng ta sẽ 'tập hợp sức mạnh' để cùng nhau quan sát hoa trên quy mô toàn cầu và đọc những câu chuyện tương lai!"</p>
          </footer>

        </div>
      </div>
    </>
  );
}

