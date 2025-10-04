// src/components/DataStorytellingStation.jsx
import React, { useState } from 'react';
import chartImage from '../../../assets/chuong5/bieuDoThongDiep.png'; // Đảm bảo đường dẫn này đúng

function DataStorytellingStation() {
  const [step, setStep] = useState(1);
  const [userCallToAction, setUserCallToAction] = useState('');

  const totalSteps = 3;

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div>
            <h3 className="text-2xl font-bold text-blue-700 mb-3">Hồi 1: Một Phát Hiện Thú Vị 🔎</h3>
            <p className="text-gray-600 mb-4">
              Hãy bắt đầu bằng cách trình bày những gì chúng ta thấy rõ nhất. Một sự thật không thể chối cãi sẽ tạo dựng được lòng tin.
            </p>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
              <p className="font-semibold italic">"Biểu đồ cho thấy số lượng quan sát hoa nở (cột màu xanh) bắt đầu tăng mạnh và đạt đỉnh vào cuối tháng 6 - đầu tháng 7 năm 2021. Đáng chú ý, đỉnh điểm này trùng khớp hoàn hảo với giai đoạn nhiệt độ trung bình (đường màu cam) đang ở mức cao nhất."</p>
            </div>
          </div>
        );
      case 2:
        return (
          <div>
            <h3 className="text-2xl font-bold text-red-700 mb-3">Hồi 2: Câu Chuyện Chưa Hoàn Chỉnh ⌛</h3>
            <p className="text-gray-600 mb-4">
              Sau khi có được sự chú ý, hãy chỉ ra vấn đề. Một câu chuyện hay luôn cần có xung đột. Ở đây, xung đột chính là sự thiếu hụt dữ liệu.
            </p>
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
              <p className="font-semibold italic">"Chúng ta thấy mối liên hệ rõ ràng giữa nhiệt độ và hoa nở trong năm 2021, nhưng liệu đây có phải là xu hướng dài hạn do biến đổi khí hậu? Chúng ta không thể chắc chắn, vì dữ liệu của các năm trước đang bị trống. Câu chuyện của chúng ta đang thiếu những chương quan trọng nhất."</p>
            </div>
          </div>
        );
      case 3:
        return (
          <div>
            <h3 className="text-2xl font-bold text-green-700 mb-3">Hồi 3: Bạn Chính Là Người Hùng! ✨</h3>
            <p className="text-gray-600 mb-4">
              Đây là phần quan trọng nhất: trao quyền cho khán giả. Hãy biến họ từ người xem thành người tham gia.
            </p>
            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg mb-6">
              <p className="font-semibold italic">"Đây chính là lý do tại sao sự tham gia của bạn vào các dự án khoa học công dân lại quan trọng đến vậy. Mỗi quan sát bạn đóng góp hôm nay sẽ giúp các nhà khoa học của 10 năm sau có đủ dữ liệu để hoàn thành câu chuyện này và bảo vệ thiên nhiên của chúng ta."</p>
            </div>
            <div>
              <label htmlFor="cta" className="block text-lg font-semibold text-gray-700 mb-2">Thực hành: Hãy thử viết lời kêu gọi hành động của riêng bạn!</label>
              <textarea
                id="cta"
                rows="4"
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500"
                placeholder="Ví dụ: 'Mỗi bức ảnh về một bông hoa bạn chụp không chỉ là một kỷ niệm, mà còn là một điểm dữ liệu quý giá...'"
                value={userCallToAction}
                onChange={(e) => setUserCallToAction(e.target.value)}
              />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-5xl mx-auto bg-white p-6 md:p-8 rounded-xl shadow-lg border border-gray-200 mt-12">
      <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center border-b-2 pb-2">
        Trạm Thực Hành: Kể Chuyện Dữ Liệu
      </h2>
      <div className="flex flex-col md:flex-row gap-8">
        {/* Cột hiển thị biểu đồ */}
        <div className="md:w-1/2 flex-shrink-0">
          <img src={chartImage} alt="Biểu đồ hoa nở và nhiệt độ" className="rounded-lg shadow-lg w-full" />
          {step === 2 && (
            <div className="mt-4 p-3 bg-yellow-100 text-yellow-800 rounded-lg text-center font-semibold">
              Chú ý: Dữ liệu các năm trước bị trống!
            </div>
          )}
        </div>
        {/* Cột hiển thị câu chuyện */}
        <div className="md:w-1/2 flex flex-col justify-between">
          <div>{renderStepContent()}</div>
          <div className="flex justify-between items-center mt-6">
            <button
              onClick={() => setStep(s => Math.max(s - 1, 1))}
              disabled={step === 1}
              className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg shadow disabled:opacity-50 hover:bg-gray-400 transition"
            >
              Quay lại
            </button>
            <span className="text-gray-500 font-semibold">Bước {step}/{totalSteps}</span>
            <button
              onClick={() => setStep(s => Math.min(s + 1, totalSteps))}
              disabled={step === totalSteps}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow disabled:opacity-50 hover:bg-blue-700 transition"
            >
              Tiếp theo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DataStorytellingStation;