import React, { useState, useMemo } from 'react';

// ===== CÁC ICON SVG (Không cần thư viện ngoài) =====
// (Chúng ta có thể giữ lại một vài icon nếu cần, hoặc xóa đi)
const BrainIcon = ({className="h-8 w-8 text-cyan-300"}) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 01.454-4.228L11.25 8.25l.813 2.846a4.5 4.5 0 01-.454 4.228z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18z" /><path strokeLinecap="round" strokeLinejoin="round" d="M14.187 15.904L15 18.75l.813-2.846a4.5 4.5 0 00-.454-4.228L12.75 8.25l-.813 2.846a4.5 4.5 0 00.454 4.228z" /></svg>);
const LightBulbIcon = ({className="h-8 w-8 text-cyan-300"}) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" /></svg>);
const ScaleIcon = ({className="h-8 w-8 text-cyan-300"}) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" /></svg>);

// ===== COMPONENT TÁI SỬ DỤNG =====
const PracticeStation = ({ title, challenge, concepts, children }) => (
    <div className="bg-white/10 p-6 rounded-2xl shadow-lg backdrop-blur-sm mt-8">
        <h3 className="text-2xl font-bold text-yellow-300 mb-3">{title}</h3>
        <p className="mb-4 italic">"{challenge}"</p>
        <div className="my-4">{children}</div>
        <p className="text-sm font-semibold text-white/80 mt-4"><span className="font-bold text-yellow-300">Khái niệm học thêm:</span> {concepts}</p>
    </div>
);

// ===== DỮ LIỆU VÀ LOGIC CHO CÁC HOẠT ĐỘNG =====

// Hoạt động 1: PCA
const allFeatures = [
    'Chiều dài cánh hoa', 'Độ rộng cánh hoa', 'Tỷ lệ dài/rộng', 'Độ cong cánh hoa', 'Màu sắc (Red)',
    'Màu sắc (Green)', 'Màu sắc (Blue)', 'Độ bão hòa màu', 'Độ sáng', 'Số lượng nhụy', 'Chiều dài nhụy',
    'Màu sắc nhụy', 'Hình dạng lá', 'Kích thước lá', 'Độ dày lá', 'Kết cấu thân', 'Chiều cao cây',
    'Độ phản xạ UV', 'Độ phản xạ IR', 'Mùi hương (int)'
];

// Hoạt động 2: GMM
const generateInitialPoints = (numPoints) => {
    return Array.from({ length: numPoints }, (_, i) => ({
        id: i,
        x: Math.random() * 90 + 5, // % position
        y: Math.random() * 90 + 5, // % position
        cluster: 0 // 0 for unclustered
    }));
};
const clusterColors = ['#9ca3af', '#ec4899', '#38bdf8', '#34d399']; // gray, pink, sky, green

// Hoạt động 3: RENDVI
const initialFlowerData = [
    { id: 1, name: 'Hoa Cúc', nir: 0.6, red: 0.1 },
    { id: 2, name: 'Hoa Hướng Dương', nir: 0.8, red: 0.08 },
    { id: 3, name: 'Lá cây (khỏe)', nir: 0.9, red: 0.05 },
    { id: 4, name: 'Lá cây (héo)', nir: 0.4, red: 0.2 },
    { id: 5, name: 'Đất trống', nir: 0.2, red: 0.15 },
];

function App() {
    // State cho Hoạt động 1: PCA
    const [selectedFeatures, setSelectedFeatures] = useState([]);
    const handleFeatureSelect = (feature) => {
        setSelectedFeatures(prev => {
            if (prev.includes(feature)) {
                return prev.filter(f => f !== feature);
            }
            if (prev.length < 5) {
                return [...prev, feature];
            }
            return prev;
        });
    };

    // State cho Hoạt động 2: GMM
    const [flowerPoints, setFlowerPoints] = useState(() => generateInitialPoints(50));
    const handleCluster = () => {
        setFlowerPoints(points =>
            points.map(p => ({
                ...p,
                cluster: Math.floor(Math.random() * 3) + 1 // Assign to cluster 1, 2, or 3
            }))
        );
    };

    // State cho Hoạt động 3: RENDVI
    const [spectraData, setSpectraData] = useState(initialFlowerData);
    const handleSpectraChange = (id, band, value) => {
        setSpectraData(prevData =>
            prevData.map(item =>
                item.id === id ? { ...item, [band]: parseFloat(value) } : item
            )
        );
    };
    const calculateRendvi = (nir, red) => {
        if (nir + red === 0) return 0;
        return (nir - red) / (nir + red);
    };

    return (
        <div className="bg-gray-100 font-sans">
            <header style={{ backgroundColor: '#2c2a4a' }} className="text-white text-center py-20 px-4 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-indigo-800 opacity-20" style={{ backgroundImage: `url("https://www.transparenttextures.com/patterns/clean-textile.png")` }}></div>
                <div className="relative z-10 max-w-4xl mx-auto">
                    <h1 className="text-5xl md:text-9xl font-bold tracking-tight mb-8">Chương 3</h1>
                    <p className="mt-4 text-2xl md:text-3xl font-light">Khi Máy Móc "Nhìn", "Hiểu" và "Đếm" Hoa</p>
                    <div className="mt-8 bg-black/20 p-4 rounded-lg text-left text-indigo-100">
                        <h3 className="font-bold text-lg mb-2">Mục tiêu học tập:</h3>
                        <p>Hiểu các khái niệm cơ bản về Học Máy (Machine Learning), giảm chiều dữ liệu (PCA), phân cụm không giám sát (GMM) và các chỉ số thực vật (MRBI, RENDVI) trong việc phân tích dữ liệu hoa nở.</p>
                    </div>
                </div>
            </header>

            <main>
                <section style={{ backgroundColor: '#4f4c7a' }} className="py-16 px-6 md:px-12 text-white">
                    <div className="max-w-4xl mx-auto">
                        <div className="space-y-6 text-lg leading-relaxed">
                            <p>Alice và Thám Tử Phổ Quang bước vào "Trường Học Máy Móc," một căn phòng rộng lớn với hàng chục "Robot Học Sinh" đang ngồi trước màn hình. Một người phụ nữ trẻ với mái tóc búi cao, đeo kính và mặc áo blouse trắng có in các mạch điện tử, đang giảng bài.</p>
                            <p>"Chào mừng đến 'Trường Học Máy Móc'," cô ấy nói. "Ta là <strong className="text-cyan-300">Giáo Sư Học Máy</strong>. Hôm nay, chúng ta sẽ 'dạy' những chú robot này cách 'nhìn', 'hiểu' và thậm chí 'đếm' hoa như chúng ta!"</p>
                            <p>"Làm sao máy tính có thể 'nhìn' và 'hiểu' hoa ạ?" Alice hỏi, tò mò.</p>
                            <p>"Tất cả là nhờ <strong className="text-cyan-300">Học Máy (Machine Learning)</strong>, Alice ạ," Giáo Sư giải thích. "Để máy tính học hiệu quả, đầu tiên chúng ta cần 'giảm hành lý' cho nó."</p>
                            <p>Cô chỉ vào một màn hình hiển thị hàng trăm dòng dữ liệu quang phổ. "Quá nhiều đúng không? Chúng ta dùng <strong className="text-cyan-300">PCA – Phân tích Thành phần Chính</strong>. PCA giống như một 'chuyên gia gói ghém hành lý', nó sẽ tìm ra những 'thông tin quan trọng nhất', giúp máy tính chỉ tập trung vào những điều cốt lõi. Đây là một kỹ thuật <strong className="text-cyan-300">giảm chiều dữ liệu</strong> hiệu quả."</p>
                            <p>"Bây giờ, chúng ta sẽ 'nhóm bạn cùng sở thích' cho những bông hoa này bằng <strong className="text-cyan-300">GMM – Mô hình Hỗn hợp Gaussian</strong>."</p>
                            <p>Giáo Sư Học Máy hào hứng. "Nó sẽ giúp máy tính tự động 'xếp' những bông hoa có 'vân tay ánh sáng' giống nhau vào cùng một nhóm. Đây gọi là <strong className="text-cyan-300">phân cụm không giám sát (Unsupervised Clustering)</strong> – máy tính tự học, không cần 'thầy cô chỉ dẫn'."</p>
                            <p>Sau đó, cô dẫn Alice đến "Phòng Thí Nghiệm Chỉ Số."</p>
                            <ul className="list-disc list-inside space-y-2 pl-4 bg-white/5 p-4 rounded-lg">
                                <li><strong className="text-yellow-300">MRBI (Mixture Residual Bloom Index):</strong> "Đây là một 'chỉ số ma thuật' để 'tìm' và 'đếm' hoa vàng, giúp chúng ta định lượng sự hiện diện của chúng."</li>
                                <li><strong className="text-yellow-300">RENDVI (Red-Edge Normalized Difference Vegetation Index):</strong> "RENDVI là 'Nhiệt kế của sự sống xanh'. Chỉ số này giúp chúng ta 'đo' độ xanh của lá cây, cho biết cây cối có khỏe mạnh không."</li>
                            </ul>
                        </div>
                    </div>
                </section>

                <section style={{ backgroundColor: '#9a67ea' }} className="py-20 px-6 md:px-12 text-white">
                    <div className="max-w-6xl mx-auto">
                        <h2 className="text-4xl font-bold text-center mb-12">Trạm Thực Hành Dữ Liệu</h2>
                        <div className="grid md:grid-cols-1 lg:grid-cols-1 gap-8">

                            <PracticeStation title="Hoạt động 1: Gói Ghém Hành Lý Dữ Liệu (PCA)" challenge="Cháu hãy thử 'giảm chiều dữ liệu' bằng cách 'chọn 5 đặc trưng quan trọng nhất' để mô tả mỗi loài hoa. Đây là một 'phiên bản đơn giản' của PCA." concepts="Đặc trưng dữ liệu (Features), Giảm chiều dữ liệu (Dimensionality Reduction), Trích xuất đặc trưng (Feature Extraction).">
                                <div className="flex flex-col md:flex-row gap-6">
                                    <div className="flex-grow">
                                        <h4 className="font-bold mb-2">Chọn 5 đặc trưng quan trọng nhất từ 20 đặc trưng sau:</h4>
                                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-4 gap-y-2 p-4 bg-white/10 rounded-lg">
                                            {allFeatures.map(feature => (
                                                <label key={feature} className={`flex items-center gap-2 p-1 rounded transition-colors ${selectedFeatures.includes(feature) ? 'text-yellow-300' : 'hover:bg-white/10'}`}>
                                                    <input
                                                        type="checkbox"
                                                        className="form-checkbox h-4 w-4 bg-transparent rounded text-yellow-400 focus:ring-0"
                                                        checked={selectedFeatures.includes(feature)}
                                                        onChange={() => handleFeatureSelect(feature)}
                                                        disabled={!selectedFeatures.includes(feature) && selectedFeatures.length >= 5}
                                                    />
                                                    <span className="text-sm">{feature}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="md:w-64 flex-shrink-0 bg-white/10 p-4 rounded-lg">
                                        <h4 className="font-bold mb-2 text-center">Đặc trưng đã chọn: {selectedFeatures.length}/5</h4>
                                        <ul className="list-disc list-inside space-y-1">
                                            {selectedFeatures.length > 0 ? selectedFeatures.map(f => <li key={f}>{f}</li>) : <p className="italic text-center">Chưa chọn đặc trưng nào.</p>}
                                        </ul>
                                    </div>
                                </div>
                            </PracticeStation>

                            <PracticeStation title="Hoạt động 2: Nhóm Hoa Không Cần Chỉ Dẫn (GMM)" challenge="Cháu hãy 'sử dụng mô hình GMM' ảo để 'nhóm' các bông hoa này thành 3 nhóm 'có vẻ giống nhau' nhất mà không cần biết tên loài. Cháu có thấy 'những nhóm ẩn' nào được tạo ra không?" concepts="Phân cụm (Clustering), Khoảng cách dữ liệu (Data Distance), Phân loại không giám sát (Unsupervised Classification).">
                                <div className="grid md:grid-cols-3 gap-6 items-center">
                                    <div className="md:col-span-1 flex flex-col items-center gap-4">
                                        <p className="text-center">50 bông hoa này đang chờ được phân loại. Hãy nhấn nút để GMM tự động tìm ra các cụm.</p>
                                        <button onClick={handleCluster} className="w-full bg-yellow-400 text-purple-900 font-bold py-2 px-4 rounded hover:bg-yellow-300 transition-colors">Phân cụm hoa</button>
                                        <button onClick={() => setFlowerPoints(generateInitialPoints(50))} className="w-full bg-gray-500 text-white font-bold py-2 px-4 rounded hover:bg-gray-400 transition-colors mt-2">Reset</button>
                                    </div>
                                    <div className="md:col-span-2 w-full h-80 bg-white/10 rounded-lg relative">
                                        {flowerPoints.map(p => (
                                            <div key={p.id} className="absolute w-3 h-3 rounded-full transition-colors duration-500" style={{ left: `${p.x}%`, top: `${p.y}%`, backgroundColor: clusterColors[p.cluster] }}></div>
                                        ))}
                                    </div>
                                </div>
                            </PracticeStation>

                            <PracticeStation title="Hoạt động 3: Tính Chỉ Số Sức Sống (RENDVI)" challenge="Cháu hãy 'tính chỉ số RENDVI' cho mỗi bông hoa bằng 'công thức ma thuật' (NIR - Red) / (NIR + Red) để đánh giá 'sức khỏe xanh' của chúng. Hoa nào có RENDVI cao nhất?" concepts="Chỉ số thực vật (Vegetation Index), Quang phổ cận hồng ngoại (Near-Infrared Spectrum), Định lượng sức sống thực vật (Quantifying Vegetation Vigor).">
                                <div>
                                    <div className="flex justify-between items-center font-bold px-4 mb-2">
                                        <span>Đối tượng</span>
                                        <span>Chỉ số RENDVI</span>
                                    </div>
                                    <div className="space-y-4">
                                        {spectraData.map(item => {
                                            const rendvi = calculateRendvi(item.nir, item.red);
                                            const rendviColor = rendvi > 0.6 ? 'text-green-300' : rendvi > 0.2 ? 'text-yellow-300' : 'text-red-400';
                                            return (
                                                <div key={item.id} className="bg-white/10 p-4 rounded-lg">
                                                    <div className="flex justify-between items-center mb-2">
                                                        <h5 className="font-semibold text-lg">{item.name}</h5>
                                                        <span className={`font-bold text-xl ${rendviColor}`}>{rendvi.toFixed(3)}</span>
                                                    </div>
                                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                                                        <div>
                                                            <label>Độ phản xạ Cận hồng ngoại (NIR): {item.nir}</label>
                                                            <input type="range" min="0" max="1" step="0.01" value={item.nir} onChange={(e) => handleSpectraChange(item.id, 'nir', e.target.value)} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-pink-500" />
                                                        </div>
                                                        <div>
                                                            <label>Độ phản xạ Ánh sáng Đỏ (Red): {item.red}</label>
                                                            <input type="range" min="0" max="1" step="0.01" value={item.red} onChange={(e) => handleSpectraChange(item.id, 'red', e.target.value)} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-cyan-500" />
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </PracticeStation>

                        </div>
                    </div>
                </section>

                <section style={{ backgroundColor: '#f97316' }} className="py-16 px-6 md:px-12 text-white">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl font-bold mb-6">Bài học đúc kết</h2>
                        <p className="text-xl leading-relaxed mb-6 bg-black/10 p-4 rounded-lg">
                            Học Máy và các chỉ số thực vật là những công cụ mạnh mẽ để máy tính có thể "nhìn", "hiểu" và "đếm" hoa từ dữ liệu quang phổ. Chúng giúp chúng ta xử lý dữ liệu lớn, trích xuất thông tin quan trọng và phát hiện các mẫu hình ẩn giấu, từ đó đưa ra những hiểu biết định lượng về hiện tượng hoa nở.
                        </p>
                        <p className="text-lg italic mb-8">Kết thúc Chương 3: Alice cảm thấy bộ não của mình được mở rộng với những khái niệm mới. Giáo Sư Học Máy vỗ tay.</p>
                        <blockquote className="font-bold text-2xl border-l-4 border-yellow-300 pl-4">"Tuyệt vời, Alice! Cháu đã giúp những chú robot này hiểu được ngôn ngữ của hoa. Giờ thì, chúng ta sẽ 'tập hợp sức mạnh' để cùng nhau quan sát hoa trên quy mô toàn cầu và đọc những câu chuyện tương lai!"</blockquote>
                    </div>
                </section>
            </main>
        </div>
    );
}

export default App;