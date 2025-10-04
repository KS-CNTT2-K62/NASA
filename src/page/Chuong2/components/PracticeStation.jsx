import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
// KHÔNG CẦN mathjs nữa
import Papa from 'papaparse';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const localDataFolders = [
  'aafcottawacfiaf14n_AG_1000_provisional_data',
  'csutest_GR_1000_provisional_data',
  'lacclair_EN_1000_provisional_data',
  'NEON.D05.TREE.DP1.00033_DB_1000_provisional_data',
  'sevilletashrub_GR_1000_provisional_data',
  'stevensonoaks001_AG_1000_provisional_data',
  'tidewater_AG_1000_provisional_data',
  'tworfaa_AG_1000_provisional_data',
  'uiefmiscanthus2_AG_1000_provisional_data',
  'vincennes_DB_1000_provisional_data'
];

const csvModules = import.meta.glob('/src/assets/chuong2/data/*/provisional_data/data_record_3/*.csv', { as: 'raw' });
const imageModules = import.meta.glob('/src/assets/chuong2/data/*/provisional_data/data_record_2/*.jpg');

// --- Component cho Hoạt động 1: Chữ Ký Phổ ---
const Activity1 = () => {
    // ... Code của Activity1 không thay đổi ...
    const [loading, setLoading] = useState(false);
    const [chartData, setChartData] = useState(null);
    const [statusText, setStatusText] = useState("Sẵn sàng tải dữ liệu...");
    const [rawData, setRawData] = useState([]);
    const dataCache = useRef({});

    const interpretSignature = (metrics) => {
        const { gcc_90, rcc_90 } = metrics;
        if (gcc_90 > rcc_90 && (gcc_90 - rcc_90 > 0.05)) {
            return "Chữ ký này cho thấy thảm thực vật KHỎE MẠNH. Diệp lục đang hấp thụ mạnh ánh sáng đỏ (RCC thấp) và phản xạ mạnh ánh sáng xanh lá (GCC cao) để quang hợp.";
        }
        if (rcc_90 >= gcc_90) {
            return "Chữ ký này có thể thuộc về ĐẤT TRỐNG hoặc THỰC VẬT KHÔ. Không có sự hấp thụ mạnh của diệp lục, nên mức phản xạ ở vùng đỏ (RCC) và xanh lá (GCC) gần bằng nhau.";
        }
        return "Đây là một chữ ký phổ phức hợp, có thể là sự pha trộn của nhiều loại bề mặt khác nhau.";
    };

    const fetchData = useCallback(async () => {
        setLoading(true);
        setStatusText("Đang chọn và tải dữ liệu CSV ngẫu nhiên...");
        
        try {
            const shuffled = [...localDataFolders].sort(() => 0.5 - Math.random());
            const selectedFolders = shuffled.slice(0, 3);
            const successfulResults = [];
            const rawDataForDisplay = [];

            for (const folderName of selectedFolders) {
                let processedData = null;

                if (dataCache.current[folderName]) {
                    console.log(`Lấy dữ liệu cho ${folderName} từ cache.`);
                    processedData = dataCache.current[folderName];
                } else {
                    console.log(`Tải mới dữ liệu cho ${folderName}.`);
                    const siteName = folderName.replace('_provisional_data', '');
                    const csvFileName = `${siteName}_roistats.csv`;
                    const expectedPath = `/src/assets/chuong2/data/${folderName}/provisional_data/data_record_3/${csvFileName}`;
                    
                    if (csvModules[expectedPath]) {
                        try {
                            const csvText = await csvModules[expectedPath]();
                            const results = Papa.parse(csvText, {
                                header: true, comments: '#', dynamicTyping: true, skipEmptyLines: true,
                            });

                            if (results.data && results.data.length > 0) {
                                const dailyStats = Object.values(results.data.filter(r => r && typeof r.date === 'string' && typeof r.gcc === 'number' && typeof r.rcc === 'number').reduce((acc, r) => {
                                  acc[r.date] = acc[r.date] || { gcc: [], rcc: [] };
                                  acc[r.date].gcc.push(r.gcc);
                                  acc[r.date].rcc.push(r.rcc);
                                  return acc;
                                }, {})).map(day => ({
                                    gcc: day.gcc.reduce((a, b) => a + b, 0) / day.gcc.length,
                                    rcc: day.rcc.reduce((a, b) => a + b, 0) / day.rcc.length,
                                }));
                                
                                if(dailyStats.length > 0) {
                                  processedData = { siteName, dailyStats };
                                  dataCache.current[folderName] = processedData;
                                }
                            }
                        } catch (e) {
                            console.error(`Không thể xử lý file CSV cho ${folderName}:`, e);
                        }
                    }
                }

                if (processedData) {
                    const { siteName, dailyStats } = processedData;
                    const randomDay = dailyStats[Math.floor(Math.random() * dailyStats.length)];
                    const bcc = 1 - randomDay.gcc - randomDay.rcc;
                    const metrics = { gcc_90: parseFloat(randomDay.gcc.toFixed(3)), rcc_90: parseFloat(randomDay.rcc.toFixed(3)), bcc_90: parseFloat(bcc.toFixed(3)) };

                    let imageUrl = null;
                    const folderNamePart = siteName.replace(/_AG_1000|_GR_1000|_EN_1000|_DB_1000/, '');
                    const imageKeys = Object.keys(imageModules);
                    const siteImageKey = imageKeys.find(key => key.includes(folderNamePart));
                    if(siteImageKey) {
                        const imageModule = await imageModules[siteImageKey]();
                        imageUrl = imageModule.default;
                    }

                    successfulResults.push({ name: siteName, metrics });
                    rawDataForDisplay.push({
                        site: siteName,
                        image: imageUrl,
                        data: metrics,
                        interpretation: interpretSignature(metrics)
                    });
                }
            }

            if (successfulResults.length === 0) {
                 throw new Error(`Không tìm đủ file CSV có dữ liệu hợp lệ.`);
            }
            
            setRawData(rawDataForDisplay);
            setChartData({
                labels: ['Kênh Xanh Lá (GCC)', 'Kênh Đỏ (RCC)', 'Kênh Xanh Dương (BCC)'],
                datasets: successfulResults.map((sig, i) => ({
                    label: `${sig.name}`,
                    data: [sig.metrics.gcc_90, sig.metrics.rcc_90, sig.metrics.bcc_90],
                    borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'][i % 3],
                    backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)'][i % 3],
                })),
            });
            setStatusText("");

        } catch (error) {
            console.error("Lỗi khi tải dữ liệu:", error);
            setStatusText(`Không thể tải dữ liệu: ${error.message}`);
        } finally {
            setLoading(false);
        }
    }, []);
    
    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
        <div className="bg-gray-800 bg-opacity-50 rounded-lg p-6 shadow-lg backdrop-blur-sm border border-gray-700 mb-12">
            <h2 className="text-2xl font-bold text-cyan-400 mb-4">Thử thách 1: Đọc "Vân Tay Ánh Sáng"</h2>
            <p className="text-gray-300 mb-4"><strong>Thám Tử Phổ Quang:</strong> "Alice, cháu hãy 'xây dựng chữ ký phổ' cho mỗi loài hoa bằng cách 'vẽ đồ thị' cường độ phản xạ theo bước sóng. Đây là cách chúng ta trực quan hóa dữ liệu quang phổ và nhận diện mẫu hình!"</p>
            
            {loading && <div className="text-center my-3"><div className="w-8 h-8 border-4 border-t-transparent border-cyan-400 rounded-full animate-spin mx-auto"></div><p className="mt-2 text-gray-400">{statusText}</p></div>}
            
            {!loading && chartData && (
                <>
                    <div className="h-96 mb-8"><Line data={chartData} options={{ responsive: true, maintainAspectRatio: false, scales: { y: { min: 0.2, max: 0.7 } } }} /></div>
                    <div className="mt-6">
                        <h3 className="text-xl font-bold text-cyan-300 mb-4">Phân Tích Dữ Liệu & "Vân Tay Ánh Sáng"</h3>
                        <div className="space-y-6">
                            {rawData.map((item, index) => (
                                <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-gray-900 bg-opacity-50 p-4 rounded-lg">
                                    <div className="md:col-span-1">
                                        {item.image ? 
                                          <img src={item.image} alt={item.site} className="rounded-lg object-cover w-full h-40"/> :
                                          <div className="rounded-lg w-full h-40 bg-gray-700 flex items-center justify-center text-gray-500">Không có ảnh</div>
                                        }
                                    </div>
                                    <div className="md:col-span-2">
                                        <h4 className="font-bold text-lg text-white">{item.site}</h4>
                                        <p className="text-sm text-cyan-400 italic mb-2">Phân tích nhanh của Thám Tử:</p>
                                        <p className="text-gray-300 mb-3 text-sm">{item.interpretation}</p>
                                        <pre className="bg-black text-xs text-green-400 p-2 rounded overflow-x-auto"><code>{JSON.stringify(item.data, null, 2)}</code></pre>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            )}

            {!loading && !chartData && <div className="text-center text-red-400 my-4">{statusText}</div>}
            <button className="mt-8 px-4 py-2 bg-cyan-600 hover:bg-cyan-700 rounded-lg text-white font-semibold disabled:opacity-50" onClick={fetchData} disabled={loading}>Tải Dữ Liệu Ngẫu Nhiên Mới</button>
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
                const imagePaths = Object.keys(imageModules);
                if (imagePaths.length === 0) {
                    throw new Error("Không tìm thấy ảnh nào trong thư mục assets.");
                }
                const randomImagePath = imagePaths[Math.floor(Math.random() * imagePaths.length)];
                const imageModule = await imageModules[randomImagePath]();
                const imageUrl = imageModule.default;
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
                    if (loadingMsgElement) loadingMsgElement.textContent = 'Không thể tải file ảnh cục bộ.';
                    setImageLoading(false);
                }
                img.src = imageUrl;
            } catch (error) {
                console.error("Lỗi tải ảnh cục bộ:", error);
                if (loadingMsgElement) loadingMsgElement.textContent = `Không thể tải ảnh: ${error.message}`;
                setImageLoading(false);
            }
        };
        loadImage();
    }, []);

    const handleCanvasClick = useCallback((event) => {
        if (!canvasRef.current) return;
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
        let hintText = '';
        let analysisText = '';
        const brightness = (r + g + b) / 3;
        const greenness = (g - r) / (g + r + 1e-6); 

        if (brightness < 70) {
            analysisText += `<li><strong>Độ sáng rất thấp (${brightness.toFixed(0)}):</strong> Đặc trưng của <strong>Bóng râm</strong> hoặc các vật thể tối màu.</li>`;
        } else if (brightness > 180) {
            analysisText += `<li><strong>Độ sáng rất cao (${brightness.toFixed(0)}):</strong> Có thể là bề mặt phản chiếu mạnh như hoa sáng màu, cát, hoặc vật liệu nhân tạo.</li>`;
        }
        if (greenness > 0.1) {
            analysisText += `<li><strong>Chỉ số Xanh cao (${greenness.toFixed(2)}):</strong> Dấu hiệu chắc chắn của <strong>thực vật khỏe mạnh</strong> đang quang hợp.</li>`;
        } else if (greenness < -0.1) {
            analysisText += `<li><strong>Chỉ số Xanh âm (${greenness.toFixed(2)}):</strong> Thường thấy ở các bề mặt không phải thực vật như <strong>đất, đá, hoặc nước</strong>.</li>`;
        } else {
             analysisText += `<li><strong>Chỉ số Xanh trung tính (${greenness.toFixed(2)}):</strong> Gợi ý đây là thực vật khô, úa hoặc pixel hỗn hợp.</li>`;
        }
        const isGreen = g > r && g > b;
        const isBrownish = r > g && (r - g) > 20;
        if (isGreen) {
            hintText = `<b>Manh mối của Thám Tử:</b> "Ta thấy diệp lục đang hoạt động mạnh! Nó 'ăn' rất nhiều ánh sáng đỏ và 'nhả' ra ánh sáng xanh lá. Tỷ lệ <strong>'Lá'</strong> chắc chắn không nhỏ."`;
        } else if (isBrownish) {
             hintText = `<b>Manh mối của Thám Tử:</b> "Chữ ký phổ ở đây khá 'phẳng', không thấy dấu hiệu của diệp lục. Đây là đặc trưng của vật chất không quang hợp. Có thể là <strong>'Đất'</strong>."`;
        } else {
            hintText = `<b>Manh mối của Thám Tử:</b> "Một trường hợp thú vị! Ta thấy nhiều thành phần ánh sáng trộn lẫn vào nhau. Đây chính là một <strong>'pixel hỗn hợp'</strong> điển hình! Hãy xem phân tích số liệu bên dưới để có thêm manh mối."`;
        }
        hintText += `<hr class='my-2 border-gray-600'><b>Mẹo Phân Tích Số Liệu:</b><ul class="list-disc list-inside text-sm">${analysisText}</ul>`;
        setHint(hintText);
    }, []);

    const handlePredictionChange = useCallback((component, value) => {
        setUserPrediction(prev => ({ ...prev, [component]: Number(value) }));
    }, []);
    
    // SỬA LỖI & THAY ĐỔI THUẬT TOÁN UNMIXING
    const handleUnmix = useCallback(() => {
        if (!selectedPixel) return;
        setIsAnalyzing(true);
        setTimeout(() => {
            try {
                const endmembers = {
                    'lá': { r: 40, g: 120, b: 60 },
                    'đất': { r: 140, g: 100, b: 70 },
                    'hoa': { r: 255, g: 220, b: 0 },
                    'bóng râm': { r: 30, g: 30, b: 30 }
                };
                const pixel = { r: selectedPixel.r, g: selectedPixel.g, b: selectedPixel.b };

                // Hàm tính khoảng cách màu Euclidean
                const colorDistance = (c1, c2) => {
                    return Math.sqrt(Math.pow(c1.r - c2.r, 2) + Math.pow(c1.g - c2.g, 2) + Math.pow(c1.b - c2.b, 2));
                };

                // Tính khoảng cách từ pixel đến mỗi thành phần
                const distances = {
                    'lá': colorDistance(pixel, endmembers['lá']),
                    'đất': colorDistance(pixel, endmembers['đất']),
                    'hoa': colorDistance(pixel, endmembers['hoa']),
                    'bóng râm': colorDistance(pixel, endmembers['bóng râm']),
                };

                // Chuyển khoảng cách thành "điểm tương đồng" (khoảng cách càng nhỏ, điểm càng lớn)
                // Thêm một số rất nhỏ để tránh chia cho 0
                const similarities = {
                    'lá': 1 / (distances['lá'] + 1e-6),
                    'đất': 1 / (distances['đất'] + 1e-6),
                    'hoa': 1 / (distances['hoa'] + 1e-6),
                    'bóng râm': 1 / (distances['bóng râm'] + 1e-6),
                };

                // Tính tổng các điểm tương đồng
                const totalSimilarity = Object.values(similarities).reduce((sum, val) => sum + val, 0);

                // Chuẩn hóa để có tỷ lệ phần trăm
                let comp = {
                    'lá': Math.round((similarities['lá'] / totalSimilarity) * 100),
                    'đất': Math.round((similarities['đất'] / totalSimilarity) * 100),
                    'hoa': Math.round((similarities['hoa'] / totalSimilarity) * 100),
                    'bóng râm': Math.round((similarities['bóng râm'] / totalSimilarity) * 100),
                };
                
                // Điều chỉnh để tổng luôn là 100%
                const currentTotal = Object.values(comp).reduce((a, b) => a + b, 0);
                const difference = 100 - currentTotal;
                // Tìm thành phần có giá trị lớn nhất để cộng phần chênh lệch vào
                const maxKey = Object.keys(comp).reduce((a, b) => comp[a] > comp[b] ? a : b);
                comp[maxKey] += difference;

                setAnalysisResult(comp);
            } catch (error) { 
                console.error("Lỗi unmixing:", error); 
                setHint(`<b>Lỗi Phân Tích:</b> Không thể giải mã pixel này. Vui lòng thử một pixel khác.`);
            } 
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
                        {imageLoading && <p id="image-loading-msg" className="text-gray-400">Đang tìm ảnh trong kho dữ liệu cục bộ...</p>}
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