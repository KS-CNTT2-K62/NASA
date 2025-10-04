import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { lusolve } from 'mathjs';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// --- Component cho Hoạt động 1: Chữ Ký Phổ ---
const Activity1 = () => {
    const [loading, setLoading] = useState(true);
    const [chartData, setChartData] = useState(null);
    const [statusText, setStatusText] = useState("Đang tải danh sách trạm quan sát...");

    const fetchData = useCallback(async () => {
        setLoading(true);
        setStatusText("Đang liên hệ server backend để xử lý dữ liệu...");
        
        try {
            // Gọi đến backend của bạn thay vì xử lý ở client
            const response = await fetch('http://localhost:3001/api/spectral_signatures');
            
            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.error || `Lỗi HTTP: ${response.status}`);
            }
            
            const data = await response.json();
            
            if (!data.spectral_signatures || data.spectral_signatures.length < 3) {
                throw new Error("Backend không trả về đủ dữ liệu hợp lệ.");
            }

            setChartData({
                labels: data.wavelength_labels,
                datasets: data.spectral_signatures.map((sig, i) => ({
                    label: `${sig.name} (${sig.date})`,
                    data: [sig.metrics.gcc_90, sig.metrics.rcc_90, sig.metrics.bcc_90],
                    borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'][i],
                    backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)'][i],
                })),
            });
            setStatusText("");

        } catch (error) {
            console.error("Lỗi khi tải dữ liệu từ backend:", error);
            setStatusText(`Không thể tải dữ liệu: ${error.message}`);
        } finally {
            setLoading(false);
        }
    }, []);
    
    useEffect(() => { fetchData(); }, [fetchData]);

    return (
        <div className="bg-gray-800 bg-opacity-50 rounded-lg p-6 shadow-lg backdrop-blur-sm border border-gray-700 mb-12">
            <h2 className="text-2xl font-bold text-cyan-400 mb-4">Thử thách 1: Đọc "Vân Tay Ánh Sáng"</h2>
            <p className="text-gray-300 mb-4"><strong>Lời của Thám Tử Phổ Quang:</strong> "Alice, mỗi loài thực vật đều có một 'vân tay ánh sáng' riêng. Dưới đây là dữ liệu mà 'Đôi Mắt Quan Sát' từ mạng lưới PhenoCam đã thu thập. Cháu hãy xem và so sánh nhé!"</p>
            {loading && <div className="text-center my-3"><div className="w-8 h-8 border-4 border-t-transparent border-cyan-400 rounded-full animate-spin mx-auto"></div><p className="mt-2 text-gray-400">{statusText}</p></div>}
            {!loading && chartData && <div className="h-96"><Line data={chartData} options={{ responsive: true, maintainAspectRatio: false, scales: { y: { min: 0.2, max: 0.7 } } }} /></div>}
            {!loading && !chartData && <div className="text-center text-red-400 my-4">{statusText}</div>}
            <button className="mt-4 px-4 py-2 bg-cyan-600 hover:bg-cyan-700 rounded-lg text-white font-semibold disabled:opacity-50" onClick={() => fetchData()} disabled={loading}>Tải Dữ Liệu Ngẫu Nhiên Mới</button>
        </div>
    );
};

// --- Component cho Hoạt động 2: Phân Tích Pixel ---
const Activity2 = () => {
    const canvasRef = useRef(null);
    const [imageLoading, setImageLoading] = useState(true);
    const [selectedPixel, setSelectedPixel] = useState(null);
    const [userPrediction, setUserPrediction] = useState({ hoa: 0, lá: 0, đất: 0, 'bóng râm': 0 });
    const [analysisResult, setAnalysisResult] = useState(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [hint, setHint] = useState('');

    useEffect(() => {
        const loadImage = async () => {
            setImageLoading(true);
            const loadingMsgElement = document.getElementById('image-loading-msg');
            try {
                // Bước 1: Lấy URL ảnh ngẫu nhiên từ backend
                const res = await fetch('http://localhost:3001/api/random_image');
                if (!res.ok) {
                    const errData = await res.json();
                    throw new Error(errData.error || `Lỗi HTTP: ${res.status}`);
                }
                const data = await res.json();
                const imageUrl = data.url;

                // Bước 2: Tạo URL proxy để tải ảnh thông qua backend
                const proxyUrl = `http://localhost:3001/api/image_proxy?url=${encodeURIComponent(imageUrl)}`;
                
                const canvas = canvasRef.current;
                const ctx = canvas.getContext('2d', { willReadFrequently: true });
                const img = new Image();

                img.onload = () => {
                    const maxW = 800; 
                    const scale = Math.min(1, maxW / img.width);
                    canvas.width = img.width * scale;
                    canvas.height = img.height * scale;
                    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                    setImageLoading(false);
                };
                img.onerror = () => {
                    if (loadingMsgElement) loadingMsgElement.textContent = 'Không thể tải file ảnh qua proxy. Vui lòng thử lại.';
                    setImageLoading(false);
                }
                
                // Sử dụng URL proxy thay vì URL gốc
                img.src = proxyUrl;

            } catch (error) {
                console.error("Lỗi tải ảnh:", error);
                if (loadingMsgElement) loadingMsgElement.textContent = `Không thể tải ảnh: ${error.message}`;
                setImageLoading(false);
            }
        };
        loadImage();
    }, []);

    const handleCanvasClick = useCallback((event) => {
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const [r, g, b] = canvas.getContext('2d').getImageData(x, y, 1, 1).data;
        setSelectedPixel({ r, g, b });
        generateHint(r, g, b);
        setAnalysisResult(null);
    }, []);
    
    const generateHint = useCallback((r, g, b) => {
        const total = r + g + b;
        let hintText = '';
        if (total < 10) hintText = 'Pixel này gần như màu đen. Chắc chắn đây là <b>Bóng râm</b>.';
        else {
            if (g > r && g > b) hintText = `<b>Gợi ý:</b> Pixel này có màu <b>xanh lá</b> nổi bật. Tỷ lệ <b>'Lá'</b> có thể rất cao.`;
            else if (r > g && (r - g) > 20) hintText = `<b>Gợi ý:</b> Pixel này có sắc <b>nâu/đỏ</b>. Tỷ lệ <b>'Đất'</b> có thể chiếm ưu thế.`;
            else if (r > 200 && g > 200 && b < 100) hintText = `<b>Gợi ý:</b> Màu vàng rực! Rất có thể bạn đã chọn trúng một bông <b>Hoa</b>.`;
            else if (total < 150) hintText = `<b>Gợi ý:</b> Pixel này khá tối. Tỷ lệ <b>'Bóng râm'</b> có thể đáng kể.`;
            else hintText = `<b>Gợi ý:</b> Đây là một màu phức tạp, các thành phần có thể được pha trộn cân bằng.`;
            const norm_g = g / total;
            const leaf_estimate = Math.round(norm_g * 150);
            hintText += `<hr class='my-2 border-gray-600'><b>Công thức gợi ý:</b><p class="mb-1 text-sm">Giá trị Xanh lá cây chuẩn hóa (g) là <b>${norm_g.toFixed(2)}</b>. Bạn có thể thử ước tính 'Lá' ban đầu: <b>g * 150 ≈ ${leaf_estimate}%</b></p>`;
        }
        setHint(hintText);
    }, []);

    const handlePredictionChange = useCallback((component, value) => {
        setUserPrediction(prev => ({ ...prev, [component]: Number(value) }));
    }, []);

    const handleUnmix = useCallback(() => {
        if (!selectedPixel) return;
        setIsAnalyzing(true);
        setTimeout(() => {
            const endmembers = { 'lá': [40, 120, 60], 'đất': [140, 100, 70], 'hoa': [255, 220, 0], 'bóng râm': [30, 30, 30] };
            try {
                const fractions = lusolve(Object.values(endmembers), [selectedPixel.r, selectedPixel.g, selectedPixel.b]).flat();
                let posFractions = fractions.map(f => Math.max(0, f));
                const total = posFractions.reduce((a, b) => a + b, 0);
                if (total > 0) posFractions = posFractions.map(f => f / total);
                let comp = {
                    'lá': Math.round(posFractions[0] * 100), 'đất': Math.round(posFractions[1] * 100),
                    'hoa': Math.round(posFractions[2] * 100), 'bóng râm': Math.round(posFractions[3] * 100),
                };
                comp['lá'] += (100 - Object.values(comp).reduce((a, b) => a + b, 0));
                setAnalysisResult(comp);
            } catch (error) { console.error("Lỗi unmixing:", error); } 
            finally { setIsAnalyzing(false); }
        }, 500);
    }, [selectedPixel]);
    
    const predictionTotal = Object.values(userPrediction).reduce((a, b) => a + b, 0);

    return (
        <div className="bg-gray-800 bg-opacity-50 rounded-lg p-6 shadow-lg backdrop-blur-sm border border-gray-700">
            <h2 className="text-2xl font-bold text-cyan-400 mb-4">Thử thách 2: Giải Mã Pixel Thật</h2>
            <p className="text-gray-300 mb-4"><strong>Thám Tử Phổ Quang thách đố:</strong> "Bây giờ là bài kiểm tra thực sự! Hãy chọn một điểm ảnh bất kỳ, dựa vào gợi ý để dự đoán thành phần của nó, rồi so sánh với kết quả phân tích của máy nhé!"</p>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-7">
                    <h3 className="text-lg font-semibold text-white mb-2">Bước 1: Chọn một điểm ảnh trên ảnh</h3>
                    <div className="w-full bg-gray-900 rounded-lg p-2 flex justify-center items-center">
                        {imageLoading && <p id="image-loading-msg" className="text-gray-400">Đang tải ảnh từ trạm PhenoCam...</p>}
                        <canvas ref={canvasRef} onClick={handleCanvasClick} className="max-w-full h-auto rounded" style={{ cursor: 'crosshair', display: imageLoading ? 'none' : 'block' }}></canvas>
                    </div>
                    {selectedPixel && (
                        <div className="mt-3 text-white">
                            <strong>Pixel đã chọn:</strong>
                            <div className="flex items-center space-x-3 mt-1">
                                <div style={{ width: 25, height: 25, border: '1px solid #FFF', backgroundColor: `rgb(${selectedPixel.r}, ${selectedPixel.g}, ${selectedPixel.b})` }}></div>
                                <span className="font-mono">RGB({selectedPixel.r}, {selectedPixel.g}, {selectedPixel.b})</span>
                            </div>
                        </div>
                    )}
                </div>
                <div className="lg:col-span-5 space-y-4">
                    <div className="bg-gray-900 bg-opacity-70 rounded-lg p-4 border border-gray-700">
                        <h3 className="text-lg font-semibold text-white mb-3">Bước 2: Dự đoán của bạn</h3>
                        {hint && <div className="text-sm bg-gray-800 text-gray-300 p-3 rounded-md mb-4" dangerouslySetInnerHTML={{ __html: hint }}></div>}
                        {Object.keys(userPrediction).map(key => (
                            <div key={key} className="mb-3 text-white"><label className="block text-sm font-medium capitalize mb-1">{key}:</label><div className="flex items-center space-x-3"><input type="range" className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer" value={userPrediction[key]} onChange={(e) => handlePredictionChange(key, e.target.value)} min="0" max="100" /><input type="number" className="w-20 bg-gray-800 border border-gray-600 rounded-md p-1 text-center" value={userPrediction[key]} onChange={(e) => handlePredictionChange(key, e.target.value)} min="0" max="100" /></div></div>
                        ))}
                        <h4 className="text-right mt-2 font-bold text-lg">Tổng: <span className={predictionTotal === 100 ? "text-green-400" : "text-red-400"}>{predictionTotal}%</span></h4>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-2">Bước 3: Xem kết quả phân tích</h3>
                        <button className="w-full px-4 py-3 bg-cyan-600 hover:bg-cyan-700 rounded-lg text-white font-bold disabled:opacity-50 disabled:cursor-not-allowed" disabled={!selectedPixel || isAnalyzing} onClick={handleUnmix}>{isAnalyzing ? 'Đang phân tích...' : '✨ Giải mã Pixel!'}</button>
                    </div>
                    {analysisResult && (
                        <div className="bg-gray-900 bg-opacity-70 rounded-lg p-4 border border-gray-700 animate-fade-in">
                            <h3 className="text-lg font-semibold text-white mb-2">Kết quả phân tích</h3>
                            <p className="text-sm text-gray-400 mb-4">Đây là kết quả được tính toán bằng thuật toán. Hãy so sánh với dự đoán của bạn!</p>
                            {Object.keys(analysisResult).map(key => (
                                <div key={key} className="mt-2 text-white"><label className="block text-sm font-medium capitalize mb-1">{key}: {analysisResult[key]}%</label><div className="w-full bg-gray-700 rounded-full h-2.5"><div className={`h-2.5 rounded-full ${key === 'lá' ? 'bg-green-500' : key === 'đất' ? 'bg-yellow-600' : key === 'hoa' ? 'bg-red-500' : 'bg-gray-500'}`} style={{ width: `${analysisResult[key]}%` }}></div></div></div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const PracticeStation = () => (<div><Activity1 /><Activity2 /></div>);

export default PracticeStation;