import React, { useState, useEffect, useRef } from 'react';
import styles from './chuong3.module.css'
import { Link } from 'react-router-dom';
import anh1 from '../../assets/chuong3/6.png';
import anh2 from '../../assets/chuong3/7.png';
// ===== COMPONENT TÁI SỬ DỤNG =====
const PracticeStation = ({ title, challenge, concepts, children }) => (
    <div className="bg-white p-6 rounded-2xl shadow-xl mt-8 text-slate-700">
        <h3 className="text-2xl font-bold text-sky-600 mb-3">{title}</h3>
        <p className="mb-4 italic text-slate-600">"{challenge}"</p>
        <div className="my-4">{children}</div>
        <p className="text-sm font-semibold text-slate-500 mt-4">
            <span className="font-bold text-sky-600">Khái niệm học thêm:</span> {concepts}
        </p>
    </div>
);

// ===== DỮ LIỆU VÀ LOGIC CHO CÁC HOẠT ĐỘNG (Phần 1 & 2 không đổi) =====
const allFeatures = [
    'Chiều dài cánh hoa', 'Độ rộng cánh hoa', 'Tỷ lệ dài/rộng', 'Độ cong cánh hoa', 'Màu sắc (Red)',
    'Màu sắc (Green)', 'Màu sắc (Blue)', 'Độ bão hòa màu', 'Độ sáng', 'Số lượng nhụy', 'Chiều dài nhụy',
    'Màu sắc nhụy', 'Hình dạng lá', 'Kích thước lá', 'Độ dày lá', 'Kết cấu thân', 'Chiều cao cây',
    'Độ phản xạ UV', 'Độ phản xạ IR', 'Mùi hương (int)'
];
const importanceScores = {
    'Tỷ lệ dài/rộng': 10, 'Chiều dài cánh hoa': 9, 'Độ phản xạ IR': 9, 'Màu sắc (Red)': 8, 'Kích thước lá': 8,
    'Độ rộng cánh hoa': 7, 'Độ sáng': 7, 'Độ phản xạ UV': 6, 'Chiều cao cây': 6, 'Độ bão hòa màu': 5,
    'Hình dạng lá': 5, 'Số lượng nhụy': 4, 'Độ cong cánh hoa': 4, 'Độ dày lá': 3, 'Màu sắc (Green)': 3,
    'Chiều dài nhụy': 2, 'Kết cấu thân': 2, 'Màu sắc (Blue)': 1, 'Màu sắc nhụy': 1, 'Mùi hương (int)': 1,
};
const clusterColors = ['#9ca3af', '#ec4899', '#38bdf8', '#34d399'];


function App() {
    // State cho Hoạt động 1: PCA
    const [selectedFeatures, setSelectedFeatures] = useState([]);
    const [evaluationResult, setEvaluationResult] = useState(null);
    const [showScores, setShowScores] = useState(false);

    // State cho Hoạt động 2: GMM
    const [flowerPoints, setFlowerPoints] = useState([]);
    const [originalFlowerData, setOriginalFlowerData] = useState([]);
    const [isClustered, setIsClustered] = useState(false);

    // State cho Hoạt động 3
    const [locationData, setLocationData] = useState([]);
    const [dataError, setDataError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const scrollContainerRef = useRef(null);
    const publicURL = import.meta.env.BASE_URL;
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    entry.target.classList.toggle(styles['is-visible'], entry.isIntersecting);
                });
            },
            {
                threshold: 0.5,
            }
        );

        const sections = Array.from(scrollContainerRef.current.children);
        sections.forEach(section => {
            observer.observe(section);
        });

        return () => {
            sections.forEach(section => {
                observer.unobserve(section);
            });
        };
    }, [isLoading]);
    useEffect(() => {
        // Tải dữ liệu cho Hoạt động 3
        fetch(publicURL + '/data/hoa_nasa_single_image_data.json')
            .then(response => {
                if (!response.ok) throw new Error('Không tìm thấy file hoa_nasa_single_image_data.json');
                return response.json();
            })
            .then(data => setLocationData(data))
            .then(() => setIsLoading(true))
            .catch(error => {
                console.error("Lỗi khi tải dữ liệu NASA:", error);
                setDataError(prev => ({ ...prev, rendvi: error.message }));
            });

        // Tải dữ liệu cho Hoạt động 2
        fetch(publicURL + '/data/iris_data_rich.json')
            .then(response => {
                if (!response.ok) throw new Error('Không tìm thấy file iris_data_rich.json');
                return response.json();
            })
            .then(data => {
                const petalLengths = data.map(d => d.petalLength);
                const petalWidths = data.map(d => d.petalWidth);
                const minLength = Math.min(...petalLengths);
                const maxLength = Math.max(...petalLengths);
                const minWidth = Math.min(...petalWidths);
                const maxWidth = Math.max(...petalWidths);

                const processedData = data.map((d, i) => ({
                    id: i,
                    initialX: Math.random() * 90 + 5,
                    initialY: Math.random() * 90 + 5,
                    finalX: 5 + 90 * (d.petalLength - minLength) / (maxLength - minLength),
                    finalY: 5 + 90 * (d.petalWidth - minWidth) / (maxWidth - minWidth),
                    cluster: 0,
                    species: d.species
                }));

                setFlowerPoints(processedData);
                setOriginalFlowerData(processedData);
                setIsLoading(true)
            })
            .catch(error => {
                console.error("Lỗi khi tải dữ liệu Iris:", error);
                setDataError(prev => ({ ...prev, iris: error.message }));
            });
    }, []);

    // ===== HÀM XỬ LÝ =====

    // Hoạt động 1
    const handleFeatureSelect = (feature) => {
        if (showScores) return;
        setSelectedFeatures(prev => {
            if (prev.includes(feature)) return prev.filter(f => f !== feature);
            if (prev.length < 5) return [...prev, feature];
            return prev;
        });
    };
    const handleEvaluation = () => {
        const score = selectedFeatures.reduce((acc, feature) => acc + (importanceScores[feature] || 0), 0);
        let message = '';
        if (score >= 44) message = "Tuyệt vời! Bạn đã chọn được những đặc trưng tinh túy nhất.";
        else if (score >= 35) message = "Lựa chọn rất tốt! Bộ dữ liệu của bạn giữ lại được nhiều thông tin quan trọng.";
        else if (score >= 25) message = "Khá ổn. Có vẻ một vài đặc trưng bạn chọn chưa phải là tối ưu nhất.";
        else message = "Cần tối ưu hơn. Hãy thử lại để chọn các đặc trưng có điểm thông tin cao hơn nhé.";
        setEvaluationResult({ score, message });
        setShowScores(true);
    };
    const resetPCA = () => {
        setSelectedFeatures([]);
        setEvaluationResult(null);
        setShowScores(false);
    };

    // Hoạt động 2
    const handleCluster = () => {
        setIsClustered(true);
        const speciesToCluster = { 'setosa': 1, 'versicolor': 2, 'virginica': 3 };
        setFlowerPoints(points =>
            points.map(p => ({ ...p, cluster: speciesToCluster[p.species] || 0 }))
        );
    };
    const resetGMM = () => {
        setIsClustered(false);
        setFlowerPoints(currentPoints =>
            currentPoints.map((p, i) => ({
                ...p,
                initialX: originalFlowerData[i].initialX,
                initialY: originalFlowerData[i].initialY,
                cluster: 0
            }))
        );
    };

    // Hoạt động 3
    const handleLocationDataChange = (id, band, value) => {
        setLocationData(prevData =>
            prevData.map(item => item.id === id ? { ...item, [band]: parseFloat(value) } : item)
        );
    };
    const calculateRendvi = (nir, red) => (nir + red === 0) ? 0 : (nir - red) / (nir + red);

    const getImageStyleByRendvi = (rendvi) => {
        // Ánh xạ tuyến tính giá trị RENDVI sang các giá trị của bộ lọc CSS
        // Clamp RENDVI to a 0-1 range for easier mapping
        const normalizedRendvi = Math.max(0, Math.min(1, (rendvi + 0.2) / 0.8));

        // Khi RENDVI cao (gần 1), màu sắc rực rỡ
        // Khi RENDVI thấp (gần 0), màu sắc úa vàng
        const saturation = 0.6 + normalizedRendvi * 0.6; // Bão hòa từ 60% đến 120%
        const hueRotation = -40 + normalizedRendvi * 40; // Xoay màu từ -40deg (vàng) về 0deg (bình thường)
        const sepia = 0.5 - normalizedRendvi * 0.5; // Hiệu ứng nâu cổ từ 50% về 0%

        return {
            filter: `saturate(${saturation}) hue-rotate(${hueRotation}deg) sepia(${sepia})`,
            transition: 'filter 0.3s ease' // Hiệu ứng chuyển mượt mà
        };
    };

    return (
        <div className={"bg-slate-100 font-sans " + styles['scroll-container']} ref={scrollContainerRef}>
            <section className="text-white text-center py-20 px-4 relative overflow-hidden bg-gradient-to-br from-sky-400 to-cyan-400">
                <div className="absolute top-0 left-0 w-full h-full bg-black/10"></div>
                <div className="relative z-10 max-w-4xl mx-auto">
                    <h1 className="text-5xl md:text-8xl font-bold tracking-tight mb-8 drop-shadow-lg">Chương 3</h1>
                    <p className="mt-4 text-2xl md:text-3xl font-light">Khi Máy Móc "Nhìn", "Hiểu" và "Đếm" Hoa</p>
                    <div className="mt-8 bg-black/20 backdrop-blur-sm p-4 rounded-lg text-left text-sky-100">
                        <h3 className="font-bold text-lg mb-2">Mục tiêu học tập:</h3>
                        <p>Hiểu các khái niệm cơ bản về Học Máy, giảm chiều dữ liệu (PCA), phân cụm không giám sát (GMM) và các chỉ số thực vật (RENDVI) trong việc phân tích dữ liệu hoa nở.</p>
                    </div>
                </div>
            </section>

            <section className="bg-sky-50 py-16 px-6 md:px-12 text-slate-700">
                <div className="max-w-4xl mx-auto flex">
                    <div className="space-y-6 text-lg leading-relaxed">
                        <p>Alice và Thám Tử Phổ Quang bước vào "Trường Học Máy Móc," một căn phòng rộng lớn với hàng chục "Robot Học Sinh" đang ngồi trước màn hình. Một người phụ nữ trẻ với mái tóc búi cao, đeo kính và mặc áo blouse trắng, đang giảng bài.</p>
                        <p>"Chào mừng đến 'Trường Học Máy Móc'," cô ấy nói. "Ta là <strong className="text-sky-600 font-semibold">Giáo Sư Học Máy</strong>. Hôm nay, chúng ta sẽ 'dạy' những chú robot này cách 'nhìn', 'hiểu' và thậm chí 'đếm' hoa!"</p>
                        <p>"Tất cả là nhờ <strong className="text-sky-600 font-semibold">Học Máy (Machine Learning)</strong>," Giáo Sư giải thích. "Để máy tính học hiệu quả, đầu tiên chúng ta cần 'giảm hành lý' cho nó bằng <strong className="text-sky-600 font-semibold">PCA – Phân tích Thành phần Chính</strong>. PCA sẽ tìm ra những 'thông tin quan trọng nhất' để máy tính tập trung vào."</p>
                    </div>
                    <img src={anh1} alt="Học máy và PCA" className="w-1/2 h-auto ml-8 rounded-lg shadow-lg object-cover" />
                </div>
            </section>
            <section className="bg-sky-50 py-16 px-6 md:px-12 text-slate-700">
                <div className="max-w-4xl mx-auto flex">
                    <div className="space-y-6 text-lg leading-relaxed">
                        <p>Giáo Sư Học Máy hào hứng. "Tiếp theo, chúng ta dùng <strong className="text-sky-600 font-semibold">GMM – Mô hình Hỗn hợp Gaussian</strong>. Nó sẽ giúp máy tính tự động 'xếp' những bông hoa giống nhau vào cùng một nhóm. Đây gọi là <strong className="text-sky-600 font-semibold">phân cụm không giám sát (Unsupervised Clustering)</strong>."</p>
                        <ul className="list-disc list-inside space-y-2 pl-4 bg-sky-100 p-4 rounded-lg text-slate-600">
                            <li><strong className="text-teal-600">MRBI (Mixture Residual Bloom Index):</strong> Một 'chỉ số ma thuật' để 'tìm' và 'đếm' hoa vàng.</li>
                            <li><strong className="text-teal-600">RENDVI (Red-Edge Normalized Difference Vegetation Index):</strong> 'Nhiệt kế của sự sống xanh' giúp chúng ta 'đo' sức khỏe của lá cây.</li>
                        </ul>
                    </div>
                    <img src={anh2} alt="GMM và RENDVI" className="w-1/2 h-auto ml-8 rounded-lg shadow-lg object-cover" />
                </div>
            </section>

            <section className="bg-slate-200 px-6 md:px-12">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-4xl font-bold text-center mb-8 text-slate-800">Trạm Thực Hành Dữ Liệu</h2>

                    {dataError && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative mb-6" role="alert">
                            <strong className="font-bold">Lỗi tải dữ liệu! </strong>
                            <span className="block sm:inline">Không thể tải các file dữ liệu. Hãy đảm bảo bạn đã tạo thư mục `public/data` và đặt các file JSON vào đúng chỗ.</span>
                        </div>
                    )}

                    <div className="grid md:grid-cols-1 lg:grid-cols-1 gap-8">
                        <PracticeStation title="Hoạt động 1: Gói Ghém Hành Lý Dữ Liệu (PCA)" challenge="Cháu hãy thử 'giảm chiều dữ liệu' bằng cách 'chọn 5 đặc trưng quan trọng nhất' để mô tả mỗi loài hoa. Đây là một 'phiên bản đơn giản' của PCA." concepts="Đặc trưng dữ liệu (Features), Giảm chiều dữ liệu (Dimensionality Reduction), Trích xuất đặc trưng (Feature Extraction).">
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                <div className="lg:col-span-2">
                                    <h4 className="font-bold mb-3 text-slate-800">Chọn 5 đặc trưng quan trọng nhất từ 20 đặc trưng sau:</h4>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-2 p-4 bg-slate-100 rounded-lg">
                                        {allFeatures.map(feature => (
                                            <label key={feature} className={`flex items-center gap-2 p-1 rounded transition-colors ${selectedFeatures.includes(feature) ? 'text-sky-600 font-semibold' : 'hover:bg-slate-200'} ${showScores ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}`}>
                                                <input type="checkbox" className="form-checkbox h-4 w-4 rounded text-sky-500 focus:ring-sky-400 focus:ring-2"
                                                    checked={selectedFeatures.includes(feature)} onChange={() => handleFeatureSelect(feature)}
                                                    disabled={showScores || (!selectedFeatures.includes(feature) && selectedFeatures.length >= 5)}
                                                />
                                                <span className="text-sm">{feature} {showScores && <strong className="text-teal-600">({importanceScores[feature]}đ)</strong>}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                                <div className="lg:col-span-1 bg-slate-100 p-4 rounded-lg flex flex-col">
                                    <h4 className="font-bold mb-2 text-center text-slate-800">Đặc trưng đã chọn: {selectedFeatures.length}/5</h4>
                                    <ul className="list-disc list-inside space-y-1 mb-4 flex-grow text-slate-600">
                                        {selectedFeatures.length > 0 ? selectedFeatures.map(f => <li key={f}>{f}</li>) : <p className="italic text-center">Chưa chọn đặc trưng nào.</p>}
                                    </ul>

                                    {selectedFeatures.length === 5 && !evaluationResult && (
                                        <button onClick={handleEvaluation} className="w-full bg-green-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-600 transition-colors shadow-md">Đánh giá lựa chọn</button>
                                    )}

                                    {evaluationResult && (
                                        <div className="text-center bg-white/50 p-3 rounded-lg">
                                            <p className="text-lg font-bold text-slate-800">Tổng điểm thông tin:</p>
                                            <p className="text-4xl font-bold text-sky-600 my-1 drop-shadow-sm">{evaluationResult.score}</p>
                                            <p className="text-sm italic text-slate-600">"{evaluationResult.message}"</p>
                                        </div>
                                    )}

                                    {showScores && (
                                        <button onClick={resetPCA} className="w-full mt-4 bg-sky-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-sky-600 transition-colors shadow-md">Thử lại</button>
                                    )}
                                </div>
                            </div>
                        </PracticeStation>
                    </div>
                </div>
            </section>
            <section>
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-4xl font-bold text-center mb-12 text-slate-800">Trạm Thực Hành Dữ Liệu</h2>
                    <PracticeStation title="Hoạt động 2: Nhóm Hoa Không Cần Chỉ Dẫn (GMM)" challenge="Hãy 'sử dụng mô hình GMM' ảo để 'nhóm' các bông hoa này thành 3 nhóm 'có vẻ giống nhau' nhất mà không cần biết tên loài. Cháu có thấy 'những nhóm ẩn' nào được tạo ra không?" concepts="Phân cụm (Clustering), Khoảng cách dữ liệu (Data Distance), Phân loại không giám sát (Unsupervised Classification).">
                        <div className="grid md:grid-cols-3 gap-6 items-center">
                            <div className="md:col-span-1 flex flex-col items-center gap-4">
                                <p className="text-center">
                                    {flowerPoints.length} điểm dữ liệu từ bộ <strong className="text-teal-600">Iris dataset</strong> kinh điển được sắp xếp ngẫu nhiên. Nhấn nút để thuật toán GMM tự động tìm ra 3 cụm dựa trên chiều dài và độ rộng cánh hoa.
                                </p>
                                {!isClustered ?
                                    <button onClick={handleCluster} disabled={flowerPoints.length === 0} className="w-full bg-teal-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-teal-600 transition-colors shadow-md disabled:bg-slate-400">Phân cụm hoa</button> :
                                    <button onClick={resetGMM} className="w-full bg-slate-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-slate-600 transition-colors shadow-md">Reset</button>
                                }
                            </div>
                            <div className="md:col-span-2 w-full h-80 bg-slate-100 rounded-lg relative border overflow-hidden">
                                {flowerPoints.length > 0 ? flowerPoints.map(p => (
                                    <div
                                        key={p.id}
                                        className="absolute w-3 h-3 rounded-full shadow-inner transition-all duration-1000 ease-in-out"
                                        style={{
                                            left: `${isClustered ? p.finalX : p.initialX}%`,
                                            top: `${isClustered ? p.finalY : p.initialY}%`,
                                            backgroundColor: clusterColors[p.cluster]
                                        }}
                                        title={`Loài: ${p.species}`}
                                    ></div>
                                )) : <p className="text-center text-slate-500 p-4">Đang tải dữ liệu...</p>}
                            </div>
                        </div>
                    </PracticeStation>
                </div>
            </section>
            {locationData.map(item => {
                const rendvi = calculateRendvi(item.nir, item.red);
                const rendviColor = rendvi > 0.4 ? 'text-green-500' : rendvi > 0.05 ? 'text-yellow-600' : 'text-red-500';

                return (
                    <section>
                        <div className="max-w-6xl mx-auto">
                            <h2 className="text-4xl font-bold text-center mb-12 text-slate-800">Trạm Thực Hành Dữ Liệu</h2>
                            <PracticeStation
                                title="Hoạt động 3: Tính Chỉ Số Sức Sống (RENDVI)"
                                challenge="Hãy 'tính chỉ số RENDVI' cho mỗi bông hoa bằng 'công thức ma thuật' (NIR - Red) / (NIR + Red) để đánh giá 'sức khỏe xanh' của chúng. Hoa nào có RENDVI cao nhất?"
                                concepts="Chỉ số thực vật (Vegetation Index), Quang phổ cận hồng ngoại (Near-Infrared Spectrum), Định lượng sức sống thực vật (Quantifying Vegetation Vigor)."
                            >
                                <div className="space-y-6">
                                    <div key={item.id} className="bg-slate-100 p-4 rounded-lg border grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                                        <div className="md:col-span-1 w-full aspect-square bg-black rounded-md">
                                            <img
                                                className="w-full h-full object-cover rounded-md"
                                                src={item.nasa_image_url}
                                                alt={`NASA false-color image of ${item.name}`}
                                                style={getImageStyleByRendvi(rendvi)}
                                            />
                                        </div>

                                        <div className="md:col-span-2">
                                            <div className="flex justify-between items-center mb-3">
                                                <h5 className="font-semibold text-lg text-slate-800">{item.name}</h5>
                                                <div className="text-right">
                                                    <span className="font-semibold text-slate-600 text-sm">RENDVI</span>
                                                    <p className={`font-bold text-3xl ${rendviColor}`}>{rendvi.toFixed(3)}</p>
                                                </div>
                                            </div>
                                            <div className="text-center text-sm text-slate-500 mb-4 p-2 bg-sky-50 rounded-md">
                                                Kéo thanh trượt và quan sát màu sắc của thảm thực vật (vùng màu đỏ) trên ảnh thay đổi.
                                            </div>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-slate-600">
                                                <div>
                                                    <label>Phản xạ Đỏ (Red): {item.red}</label>
                                                    <input type="range" min="0" max="1" step="0.01" value={item.red} onChange={(e) => handleLocationDataChange(item.id, 'red', e.target.value)} className="w-full h-2 bg-slate-300 rounded-lg appearance-none cursor-pointer accent-red-500" />
                                                </div>
                                                <div>
                                                    <label>Phản xạ Cận hồng ngoại (NIR): {item.nir}</label>
                                                    <input type="range" min="0" max="1" step="0.01" value={item.nir} onChange={(e) => handleLocationDataChange(item.id, 'nir', e.target.value)} className="w-full h-2 bg-slate-300 rounded-lg appearance-none cursor-pointer accent-purple-500" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </PracticeStation>
                        </div>
                    </section >
                );
            })}

            <section className="py-16 px-6 md:px-12 text-white bg-gradient-to-br from-amber-400 to-orange-500">
                <div className="max-w-4xl mx-auto text-center flex-1">
                    <h2 className="text-3xl font-bold mb-6 drop-shadow">Bài học đúc kết</h2>
                    <p className="text-xl leading-relaxed mb-6 bg-black/10 p-4 rounded-lg backdrop-blur-sm">
                        Học Máy và các chỉ số thực vật là những công cụ mạnh mẽ để máy tính có thể "nhìn", "hiểu" và "đếm" hoa từ dữ liệu quang phổ, giúp chúng ta trích xuất thông tin quan trọng và phát hiện các mẫu hình ẩn giấu.
                    </p>
                    <p className="text-lg italic mb-8">Kết thúc Chương 3: Alice cảm thấy bộ não của mình được mở rộng với những khái niệm mới.</p>
                    <blockquote className="font-bold text-2xl border-l-4 border-yellow-200 pl-4">"Tuyệt vời, Alice! Cháu đã giúp những chú robot này hiểu được ngôn ngữ của hoa. Giờ thì, hãy cùng 'tập hợp sức mạnh' để quan sát hoa trên quy mô toàn cầu!"</blockquote>
                </div>
                <footer className="w-full max-w-5xl mx-auto mt-0 pt-8 border-t border-white/20">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                        <p className="text-sm text-white/70">
                            © 2025 Dự án Hoa Kể Chuyện.
                        </p>
                        <div className="flex items-center gap-6">
                            <Link href="/chuong2" className="font-medium hover:text-yellow-300 transition-colors">
                                ← Quay về Chương 2
                            </Link>
                            <Link to="/chuong4" className="bg-yellow-300 text-orange-900 font-bold py-2 px-5 rounded-full hover:bg-white hover:text-orange-900 transition-colors shadow-lg">
                                Chuyển tới Chương 4 →
                            </Link>
                        </div>
                    </div>
                </footer>
            </section>
        </div >
    );
}

export default App;