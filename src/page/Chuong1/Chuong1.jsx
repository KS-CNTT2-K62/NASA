// src/pages/Chuong1.jsx
import React, { useState, useCallback } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

//Đường dẫn hình ảnh
import HinhAnhGacVuon from '../../assets/chuong1/nguoi-gac-vuon.png';
import HinhAnhSuperbloom from '../../assets/chuong1/super-bloom.png';
import HinhAnhVuonSacTo from '../../assets/chuong1/vuon-sac-to.png';
import HinhAnhNhaBep from '../../assets/chuong1/nha-bep-thien-nhien.png';

// --- Dữ liệu cho các hoạt động ---
const FLOWERS_DATA = [
  { id: 1, color: 'Vàng', colorHex: '#FFD700', petals: 5, diameter: 7, pigment: 'Carotenoids' },
  { id: 2, color: 'Tím', colorHex: '#8A2BE2', petals: 8, diameter: 6, pigment: 'Anthocyanins' },
  { id: 3, color: 'Đỏ', colorHex: '#DC143C', petals: 6, diameter: 8, pigment: 'Anthocyanins' },
  { id: 4, color: 'Cam', colorHex: '#FFA500', petals: 12, diameter: 9, pigment: 'Carotenoids' },
  { id: 5, color: 'Đỏ Tươi', colorHex: '#FF4500', petals: 7, diameter: 7, pigment: 'Betalains' },
];
const PIGMENTS = ['Carotenoids', 'Anthocyanins', 'Betalains'];
const ItemTypes = {
  PROPERTY: 'property',
};

// --- Các Component con cho Hoạt động Tương tác ---
const DraggableProperty = ({ text, type, flowerId }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
      type: ItemTypes.PROPERTY,
      item: { text, type, flowerId },
      collect: (monitor) => ({ isDragging: !!monitor.isDragging() }),
    }));
    return (
      <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }} className="p-2 m-1 bg-gray-200 rounded-md text-center cursor-pointer hover:bg-gray-300">
        {text}
      </div>
    );
};

const DropZone = ({ title, onDrop, droppedItems }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.PROPERTY,
    drop: (item) => onDrop(item, title),
    collect: (monitor) => ({ isOver: !!monitor.isOver() }),
  }));
  return (
    <div ref={drop} className={`p-4 border-2 border-dashed rounded-lg min-h-[150px] transition-colors ${isOver ? 'bg-green-100 border-green-500' : 'bg-gray-50 border-gray-300'}`}>
      <h3 className="text-lg font-semibold text-center text-gray-700 mb-2">{title}</h3>
      <div className="flex flex-wrap gap-2 justify-center">
        {droppedItems.map((item, index) => (
          <div key={index} className="bg-green-200 text-green-800 px-3 py-1 rounded-full text-sm">
            {item.text}
          </div>
        ))}
      </div>
    </div>
  );
};

const HoatDongGhepSacTo = () => {
  const [pigmentMatches, setPigmentMatches] = useState({});
  const [feedback2, setFeedback2] = useState('');

  const handlePigmentSelect = (flowerId, selectedPigment) => {
    setPigmentMatches(prev => ({ ...prev, [flowerId]: selectedPigment }));
  };

  const checkPigmentMatches = () => {
    const allSelected = FLOWERS_DATA.length === Object.keys(pigmentMatches).length;
    if (!allSelected) {
        setFeedback2('Bạn ơi, hãy chọn đủ sắc tố cho tất cả các bông hoa nhé!');
        return;
    }
    const correctMatches = FLOWERS_DATA.every(
      flower => pigmentMatches[flower.id] === flower.pigment
    );
    if (correctMatches) {
      setFeedback2('Tuyệt vời! Bạn đã trở thành một chuyên gia về sắc tố hoa.');
    } else {
      setFeedback2('Vẫn còn một vài sắc tố chưa đúng. Hãy thử lại nào!');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-8">
      <h4 className="text-xl font-semibold text-gray-800 mb-4">Hoạt động 1.2: Ghép nối Họa Sĩ Sắc Tố</h4>
      <p className="mb-4">Mỗi màu sắc được tạo ra bởi một "họa sĩ" sắc tố. Hãy chọn đúng họa sĩ cho từng bông hoa nhé!</p>
      <div className="space-y-4">
        {FLOWERS_DATA.map(flower => (
          <div key={flower.id} className="flex items-center gap-4">
            <div style={{ backgroundColor: flower.colorHex }} className="w-10 h-10 rounded-full flex-shrink-0"></div>
            <span className="font-medium w-20">{flower.color}</span>
            <select 
              onChange={(e) => handlePigmentSelect(flower.id, e.target.value)}
              className="flex-grow p-2 border border-gray-300 rounded-md"
              value={pigmentMatches[flower.id] || ''}
            >
              <option value="">Chọn sắc tố...</option>
              {PIGMENTS.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>
        ))}
      </div>
      <button onClick={checkPigmentMatches} className="mt-4 bg-green-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-700 transition-colors">Kiểm tra</button>
      {feedback2 && <p className={`mt-2 font-semibold ${feedback2.includes('Tuyệt vời') ? 'text-green-600' : (feedback2.includes('Bạn ơi') ? 'text-orange-500' : 'text-red-600')}`}>{feedback2}</p>}
    </div>
  );
}

// --- Component chính cho Chương 1 ---

function Chuong1() {
  const [qualitativeDropped, setQualitativeDropped] = useState([]);
  const [quantitativeDropped, setQuantitativeDropped] = useState([]);
  const [feedback1, setFeedback1] = useState('');

  const handlePropertyDrop = useCallback((item, zoneTitle) => {
    const isQualitative = item.type === 'qualitative';
    const targetZoneIsQualitative = zoneTitle.includes('Định tính');
    if (isQualitative === targetZoneIsQualitative) {
      if (targetZoneIsQualitative) setQualitativeDropped(prev => [...prev, item]);
      else setQuantitativeDropped(prev => [...prev, item]);
      setFeedback1('Chính xác! Bạn đã phân loại đúng.');
    } else {
      setFeedback1('Chưa đúng rồi. Hãy xem lại định nghĩa về dữ liệu định tính và định lượng nhé!');
    }
  }, []);

  const [rain, setRain] = useState(50);
  const [drought, setDrought] = useState(5);
  const [temp, setTemp] = useState(50);
  const [bloomStrength, setBloomStrength] = useState(0);

  const calculateBloom = useCallback(() => {
    const rainFactor = 1 - Math.abs(rain - 70) / 70;
    const droughtFactor = drought / 10;
    const tempFactor = 1 - Math.abs(temp - 60) / 60;
    let strength = (rainFactor + droughtFactor + tempFactor) / 3 * 100;
    setBloomStrength(Math.max(0, Math.min(100, strength)));
  }, [rain, drought, temp]);

  // --- [SỬA LỖI TẠI ĐÂY] ---
  // Cập nhật component StorySection để hiển thị hình ảnh
  const StorySection = ({ title, children, imageAlt, imageSrc }) => (
    <div className="my-12 flex flex-col md:flex-row items-center gap-8">
      <div className="md:w-1/2">
        <h2 className="text-3xl font-bold text-green-700 mb-4">{title}</h2>
        <div className="text-lg text-gray-700 leading-relaxed space-y-4">
            {children}
        </div>
      </div>
      <div className="md:w-1/2">
        {/* Kiểm tra nếu có imageSrc thì hiển thị <img>, nếu không thì hiển thị placeholder */}
        {imageSrc ? (
          <img src={imageSrc} alt={imageAlt} className="w-full h-auto object-cover rounded-lg shadow-lg" />
        ) : (
          <div className="w-full h-80 bg-gray-200 rounded-lg flex items-center justify-center border">
            <p className="text-gray-500 italic">{imageAlt}</p>
          </div>
        )}
      </div>
    </div>
  );

  const DataStation = ({ title, children }) => (
    <div className="my-16 p-8 bg-yellow-50 border-2 border-yellow-300 rounded-2xl shadow-lg">
        <h2 className="text-4xl font-bold text-yellow-700 text-center mb-2">Trạm Thực Hành Dữ Liệu</h2>
        <h3 className="text-2xl text-yellow-600 text-center mb-8 italic">"{title}"</h3>
        {children}
    </div>
  );

  return (
    <div className="container mx-auto p-8 font-vietnam">
      <header className="text-center mb-16">
        <h1 className="text-5xl font-extrabold text-gray-800">Chương 1: Bí Mật Sắc Màu Rực Rỡ</h1>
        <p className="text-2xl text-gray-600 mt-2">và Công Thức Của Thiên Nhiên</p>
      </header>

      {/* Truyền prop 'imageSrc' vào component StorySection */}
      <StorySection 
        title="Cuộc Gặp Gỡ Trên Đồng Cỏ Lặng"
        imageAlt="Alice ngạc nhiên nhìn Người Gác Vườn Kỳ Diệu trên một ngọn đồi xanh mướt nhưng không có hoa."
        imageSrc={HinhAnhGacVuon} 
      >
        <p>Alice cảm thấy mình đang đứng trên một ngọn đồi thoai thoải, bao quanh bởi một thảm thực vật xanh mướt. Nhưng lạ thay, không có một bông hoa nào! Bầu trời trong xanh, và không khí trong lành mang theo mùi đất ẩm dịu.</p>
        <p>"Chào mừng đến 'Đồng Cỏ Quan Sát'," một giọng nói ấm áp vang lên. Alice quay lại và thấy một ông lão với mái tóc bạc trắng, khuôn mặt hiền từ, đang đeo một chiếc kính lúp gắn trên mũ. Ông mặc một chiếc áo khoác màu nâu đất, điểm xuyết những hình ảnh hoa lá trừu tượng. Tay ông cầm một cây gậy gỗ với một quả cầu pha lê nhỏ trên đỉnh.</p>
        <p>"Ta là Người Gác Vườn Kỳ Diệu," ông nói, nở nụ cười hiền hậu. "Ta có nhiệm vụ bảo vệ và quan sát những thảm hoa vĩ đại của Trái Đất."</p>
      </StorySection>

      <StorySection 
        title="Tấm Thảm Hoa Nhìn Từ Không Gian"
        imageAlt="Hình ảnh 3D của hiện tượng 'superbloom' ở California hiện ra từ quả cầu pha lê, rực rỡ sắc màu."
        imageSrc={HinhAnhSuperbloom}
      >
        <p>"Hãy tưởng tượng cháu là một phi hành gia," Người Gác Vườn nói. Ông nâng quả cầu pha lê lên, và một hình ảnh ba chiều hiện ra: những thảm hoa khổng lồ bao phủ một phần California, rộng lớn đến mức có thể nhìn thấy từ không gian.</p>
        <p>"Đó chính là hiện tượng 'superbloom'," ông giải thích. "Khi hàng tỷ hạt giống ngủ yên đột nhiên tỉnh giấc và cùng nhau nở rộ. Chúng giống như những tấm thảm nhung đầy màu sắc, được thiên nhiên dệt nên. Đây là một ví dụ tuyệt vời về <strong>dữ liệu định tính</strong> (màu sắc, vẻ đẹp) được tạo ra từ hàng loạt <strong>dữ liệu định lượng</strong> (số lượng hoa, diện tích)."</p>
      </StorySection>

      <StorySection 
        title="Vườn Sắc Tố"
        imageAlt="Khu vườn tưởng tượng của các loại sắc tố, nơi mỗi bông hoa đều phát sáng rực rỡ."
        imageSrc={HinhAnhVuonSacTo}
      >
        <p>"Màu sắc của hoa không chỉ để đẹp mắt đâu, Alice," Người Gác Vườn Kỳ Diệu dẫn Alice vào một "Vườn Sắc Tố" lung linh, nơi mỗi cánh hoa như được làm từ những viên pha lê nhỏ. "Đó là những 'thư mời' đặc biệt mà hoa gửi đến những người bạn nhỏ của mình: ong, bướm, và thậm chí cả chim ruồi! Mỗi màu sắc là một 'ngôn ngữ' riêng, thu hút những loài thụ phấn khác nhau. Chúng được tạo ra bởi những 'họa sĩ' bí mật:</p>
        <ul className="list-disc list-inside space-y-2 pl-4">
            <li><strong>Carotenoids</strong> – 'Họa sĩ màu vàng, cam', thích vẽ những màu rực rỡ như mặt trời.</li>
            <li><strong>Anthocyanins</strong> – 'Họa sĩ màu tím, đỏ', lãng mạn như hoàng hôn tím biếc.</li>
            <li><strong>Betalains</strong> – 'Họa sĩ đặc biệt', tạo nên những màu tím, đỏ độc đáo như rồng đỏ.</li>
        </ul>
      </StorySection>

      <DataStation title="Giải Mã Công Thức Nở Hoa">
        <DndProvider backend={HTML5Backend}>
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h4 className="text-xl font-semibold text-gray-800 mb-4">Hoạt động 1: Phân loại Dữ liệu</h4>
                <p className="mb-4">Alice, hãy giúp ông phân loại các thuộc tính của những bông hoa này. Kéo các thuộc tính vào đúng hộp 'Định tính' hoặc 'Định lượng'.</p>
                <div className="flex flex-wrap justify-center gap-4 mb-6">
                    {FLOWERS_DATA.map(f => (
                        <div key={f.id} className="p-3 border rounded-lg bg-gray-50 text-center">
                            <div style={{backgroundColor: f.colorHex}} className="w-12 h-12 rounded-full mx-auto mb-2"></div>
                            <DraggableProperty text={`Màu: ${f.color}`} type="qualitative" flowerId={f.id} />
                            <DraggableProperty text={`Số cánh: ${f.petals}`} type="quantitative" flowerId={f.id} />
                            <DraggableProperty text={`Đường kính: ${f.diameter}cm`} type="quantitative" flowerId={f.id} />
                        </div>
                    ))}
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                    <DropZone title="Dữ liệu Định tính (Categorical Data)" onDrop={handlePropertyDrop} droppedItems={qualitativeDropped} />
                    <DropZone title="Dữ liệu Định lượng (Numerical Data)" onDrop={handlePropertyDrop} droppedItems={quantitativeDropped} />
                </div>
                {feedback1 && <p className={`mt-4 text-center font-semibold ${feedback1.includes('Chính xác') ? 'text-green-600' : 'text-red-600'}`}>{feedback1}</p>}
            </div>
        </DndProvider>
        <HoatDongGhepSacTo />
      </DataStation>

      <StorySection 
        title="Nhà Bếp Thiên Nhiên"
        imageAlt="Alice và Người Gác Vườn đứng trong 'Nhà Bếp Thiên Nhiên', nơi các biểu đồ và dữ liệu về mưa, nhiệt độ đang tuôn chảy."
        imageSrc={HinhAnhNhaBep}
      >
        <p>"Và để tạo ra một superbloom, thiên nhiên cần một 'công thức nấu ăn' hoàn hảo," Người Gác Vườn Kỳ Diệu dẫn Alice đến "Nhà Bếp Thiên Nhiên," nơi những hạt mưa dữ liệu lấp lánh rơi từ trên trần. "Và dữ liệu là những 'nguyên liệu' mà chúng ta cần để hiểu công thức đó:</p>
        <ol className="list-decimal list-inside space-y-2 pl-4">
            <li><strong>Nguyên liệu 1: Mưa vừa đủ (không quá nhiều!):</strong> Chúng ta cần <strong>dữ liệu chuỗi thời gian</strong> về lượng mưa trong nhiều tháng.</li>
            <li><strong>Nguyên liệu 2: Những năm khô trước đó (tạo bất ngờ!):</strong> <strong>Dữ liệu lịch sử</strong> về hạn hán cho thấy "gia vị bí mật" này.</li>
            <li><strong>Nguyên liệu 3: Nhiệt độ tăng dần (đánh thức hạt giống!):</strong> <strong>Dữ liệu nhiệt độ</strong> đất và không khí là "lửa" để "hầm" hạt giống.</li>
            <li><strong>Nguyên liệu 4: Đất đai phù hợp (nơi an toàn!):</strong> <strong>Dữ liệu về thành phần đất</strong> (pH, dinh dưỡng) là "ngôi nhà" tốt.</li>
        </ol>
        <p>Ví dụ, những bông hoa California poppies có 'đồng hồ sinh học' riêng. Chúng 'đếm' số ngày có đủ ánh sáng, đủ độ ẩm, sử dụng <strong>dữ liệu sự kiện rời rạc</strong> để biết khi nào nở. Đây là một dạng <strong>phân tích tương quan</strong> giữa các yếu tố môi trường và chu kỳ sống thực vật."</p>
      </StorySection>

      <DataStation title="Thí nghiệm Biến Đổi Thời Tiết Mini">
        <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="mb-6 text-center">Trên "Bảng Điều Khiển Superbloom", hãy điều chỉnh các yếu tố môi trường để tạo ra một 'superbloom' mạnh nhất. Cháu có thấy 'điểm ngọt' nào trong sự kết hợp các 'nguyên liệu' không?</p>
            <div className="grid md:grid-cols-3 gap-6 items-center">
                <div className="md:col-span-2 space-y-6">
                    <div>
                        <div className="flex justify-between items-center mb-1">
                            <label className="font-medium">Lượng mưa 💧</label>
                            <span className="font-bold text-blue-600">{rain} mm</span>
                        </div>
                        <input type="range" min="0" max="100" value={rain} onChange={e => setRain(e.target.value)} className="w-full" />
                    </div>
                    <div>
                        <div className="flex justify-between items-center mb-1">
                           <label className="font-medium">Số năm khô hạn trước đó ☀️</label>
                           <span className="font-bold text-orange-600">{drought} năm</span>
                        </div>
                        <input type="range" min="0" max="10" value={drought} onChange={e => setDrought(e.target.value)} className="w-full" />
                    </div>
                    <div>
                        <div className="flex justify-between items-center mb-1">
                            <label className="font-medium">Nhiệt độ ấm dần 🔥</label>
                            <span className="font-bold text-red-600">{temp} °C</span>
                        </div>
                        <input type="range" min="0" max="100" value={temp} onChange={e => setTemp(e.target.value)} className="w-full" />
                    </div>
                    <button onClick={calculateBloom} className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors">Tạo Superbloom!</button>
                </div>
                <div className="text-center">
                    <h4 className="text-lg font-semibold mb-2">Sức mạnh Superbloom</h4>
                    <div className="w-32 h-32 mx-auto bg-gray-200 rounded-full flex items-end overflow-hidden border-4 border-gray-300">
                        <div className="w-full bg-gradient-to-t from-yellow-400 via-pink-500 to-purple-600 transition-all duration-500" style={{ height: `${bloomStrength}%` }}></div>
                    </div>
                    <p className="text-2xl font-bold mt-2">{Math.round(bloomStrength)}%</p>
                </div>
            </div>
        </div>
      </DataStation>

      <div className="mt-16 text-center p-8 bg-green-50 rounded-lg">
        <h2 className="text-3xl font-bold text-green-800 mb-4">Bài Học Đúc Kết</h2>
        <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Superbloom là một hiện tượng tự nhiên kỳ vĩ, là kết quả của sự tương quan giữa nhiều yếu tố môi trường. Bằng cách thu thập và phân tích các loại dữ liệu khác nhau, chúng ta có thể bắt đầu hiểu được ngôn ngữ bí mật của thiên nhiên.
        </p>
      </div>

      <div className="mt-20 text-center">
        <a 
            href="/chuong2"
            className="inline-block bg-green-600 text-white font-bold text-xl py-3 px-8 rounded-lg shadow-lg hover:bg-green-700 transition-transform transform hover:scale-105"
        >
            Tiếp tục: Sang Chương 2 →
        </a>
      </div>

    </div>
  );
}

export default Chuong1;