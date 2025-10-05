import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
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
    const [loading, setLoading] = useState(false);
    const [chartData, setChartData] = useState(null);
    const [statusText, setStatusText] = useState("Ready to load data...");
    const [rawData, setRawData] = useState([]);
    const dataCache = useRef({});

    const calculateIndices = (metrics) => {
        const { gcc_90, rcc_90, bcc_90 } = metrics;
        const greenness = (gcc_90 - rcc_90) / (gcc_90 + rcc_90);
        const vari = (gcc_90 - rcc_90) / (gcc_90 + rcc_90 - bcc_90);
        return {
            greenness: parseFloat(greenness.toFixed(3)),
            vari: parseFloat(vari.toFixed(3))
        };
    };

    const interpretSignature = (indices) => {
        const { greenness, vari } = indices;
        if (greenness > 0.1 && vari > 0.1) {
            return "The indices indicate HEALTHY and LUSH vegetation. Photosynthesis levels are high, and chlorophyll activity is strong.";
        }
        if (greenness < 0.05 && greenness > -0.05) {
            return "The Greenness index is near zero, suggesting this could be BARE SOIL, ROCK, or DEAD VEGETATION. Photosynthetic activity is very low or non-existent.";
        }
        if (greenness > 0 && vari < 0) {
            return "An interesting case! The Greenness index is positive, but VARI is negative. This could indicate SPARSE VEGETATION on a bright soil background.";
        }
        return "The indices do not provide a clear conclusion, suggesting a COMPLEX surface with a mixture of many components.";
    };

    const fetchData = useCallback(async () => {
        setLoading(true);
        setStatusText("Selecting and loading random CSV data...");

        try {
            const shuffled = [...localDataFolders].sort(() => 0.5 - Math.random());
            const selectedFolders = shuffled.slice(0, 3);
            const successfulResults = [];
            const rawDataForDisplay = [];

            for (const folderName of selectedFolders) {
                let processedData = null;

                if (dataCache.current[folderName]) {
                    processedData = dataCache.current[folderName];
                } else {
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
                        } catch (e) { console.error(`Could not process CSV file for ${folderName}:`, e); }
                    }
                }

                if (processedData) {
                    const { siteName, dailyStats } = processedData;
                    const randomDay = dailyStats[Math.floor(Math.random() * dailyStats.length)];
                    const bcc = 1 - randomDay.gcc - randomDay.rcc;
                    const metrics = { gcc_90: parseFloat(randomDay.gcc.toFixed(3)), rcc_90: parseFloat(randomDay.rcc.toFixed(3)), bcc_90: parseFloat(bcc.toFixed(3)) };

                    const indices = calculateIndices(metrics);
                    const interpretation = interpretSignature(indices);

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
                        data: { ...metrics, ...indices },
                        interpretation: interpretation
                    });
                }
            }

            if (successfulResults.length < 3) {
                throw new Error(`Could not find 3 valid CSV files with data.`);
            }

            setRawData(rawDataForDisplay);
            setChartData({
                labels: ['Green Channel (GCC)', 'Red Channel (RCC)', 'Blue Channel (BCC)'],
                datasets: successfulResults.map((sig, i) => ({
                    label: `${sig.name}`,
                    data: [sig.metrics.gcc_90, sig.metrics.rcc_90, sig.metrics.bcc_90],
                    borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'][i % 3],
                    backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)'][i % 3],
                })),
            });
            setStatusText("");
        } catch (error) {
            console.error("Error loading data:", error);
            setStatusText(`Could not load data: ${error.message}`);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
        <div className="bg-white p-6 rounded-2xl shadow-xl mt-8 text-slate-700 mb-12">
            <h3 className="text-2xl font-bold text-sky-600 mb-3">Challenge 1: Read the "Light Fingerprint"</h3>
            <p className="mb-4 italic text-slate-600">"Alice, you need to 'build a spectral signature' for each site by 'graphing' the reflectance intensity. This is how we visualize spectral data and identify patterns!"</p>
            {loading && <div className="text-center my-3"><div className="w-8 h-8 border-4 border-t-transparent border-sky-500 rounded-full animate-spin mx-auto"></div><p className="mt-2 text-slate-500">{statusText}</p></div>}
            {!loading && chartData && (
                <>
                    <div className="h-96 mb-8"><Line data={chartData} options={{ responsive: true, maintainAspectRatio: false, scales: { y: { min: 0.2, max: 0.7 } } }} /></div>
                    <div className="mt-6">
                        <h4 className="text-xl font-bold text-slate-800 mb-4">The Detective's In-Depth Analysis</h4>
                        <div className="space-y-6">
                            {rawData.map((item, index) => (
                                <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-50 p-4 rounded-lg border">
                                    <div className="md:col-span-1">{item.image ? <img src={item.image} alt={item.site} className="rounded-lg object-cover w-full h-full"/> : <div className="rounded-lg w-full h-40 bg-slate-200 flex items-center justify-center text-slate-500">No image available</div>}</div>
                                    <div className="md:col-span-2">
                                        <h5 className="font-bold text-lg text-slate-800">{item.site}</h5>
                                        <p className="text-sky-600 font-semibold mb-2">Conclusion:</p>
                                        <p className="text-slate-600 mb-3 text-sm italic">"{item.interpretation}"</p>
                                        <pre className="bg-slate-800 text-xs text-green-300 p-2 rounded overflow-x-auto"><code>{JSON.stringify(item.data, null, 2)}</code></pre>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            )}
            {!loading && !chartData && <div className="text-center text-red-500 my-4">{statusText}</div>}
            <button className="mt-8 px-4 py-2 bg-sky-600 hover:bg-sky-700 rounded-lg text-white font-semibold disabled:opacity-50" onClick={fetchData} disabled={loading}>Load New Random Data</button>
        </div>
    );
};

const Activity2 = () => {
    const canvasRef = useRef(null);
    const [imageLoading, setImageLoading] = useState(true);
    const [selectedPixel, setSelectedPixel] = useState(null);
    const [userPrediction, setUserPrediction] = useState({ flower: 0, leaf: 0, soil: 0, shadow: 0 });
    const [analysisResult, setAnalysisResult] = useState(null);
    const [unmixingAnalysis, setUnmixingAnalysis] = useState(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [hint, setHint] = useState('');

    useEffect(() => {
        const loadImage = async () => {
            setImageLoading(true);
            try {
                const imagePaths = Object.keys(imageModules);
                if (imagePaths.length === 0) throw new Error("No images found in the assets directory.");
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
                img.onerror = () => { document.getElementById('image-loading-msg').textContent = 'Could not load local image file.'; };
                img.src = imageUrl;
            } catch (error) {
                console.error("Error loading local image:", error);
                document.getElementById('image-loading-msg').textContent = `Could not load image: ${error.message}`;
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
        setUnmixingAnalysis(null);
    }, []);

    const generateHint = useCallback((r, g, b) => { /* ... Giữ nguyên logic nâng cấp ... */ }, []);
    const handlePredictionChange = useCallback((component, value) => { setUserPrediction(prev => ({ ...prev, [component]: Number(value) })); }, []);

    const handleUnmix = useCallback(() => {
        if (!selectedPixel) return;
        setIsAnalyzing(true);
        setUnmixingAnalysis(null);
        setTimeout(() => {
            try {
                const endmembers = {
                    'leaf': { r: 40, g: 120, b: 60 }, 'soil': { r: 140, g: 100, b: 70 },
                    'flower': { r: 255, g: 220, b: 0 }, 'shadow': { r: 30, g: 30, b: 30 }
                };
                const pixel = { r: selectedPixel.r, g: selectedPixel.g, b: selectedPixel.b };
                const colorDistance = (c1, c2) => Math.sqrt(Math.pow(c1.r - c2.r, 2) + Math.pow(c1.g - c2.g, 2) + Math.pow(c1.b - c2.b, 2));
                const distances = { 'leaf': colorDistance(pixel, endmembers['leaf']), 'soil': colorDistance(pixel, endmembers['soil']), 'flower': colorDistance(pixel, endmembers['flower']), 'shadow': colorDistance(pixel, endmembers['shadow']), };
                const similarities = { 'leaf': 1 / (distances['leaf'] + 1e-6), 'soil': 1 / (distances['soil'] + 1e-6), 'flower': 1 / (distances['flower'] + 1e-6), 'shadow': 1 / (distances['shadow'] + 1e-6), };
                const totalSimilarity = Object.values(similarities).reduce((sum, val) => sum + val, 0);
                let comp = { 'leaf': (similarities['leaf'] / totalSimilarity), 'soil': (similarities['soil'] / totalSimilarity), 'flower': (similarities['flower'] / totalSimilarity), 'shadow': (similarities['shadow'] / totalSimilarity), };

                const reconstructedPixel = { r: 0, g: 0, b: 0 };
                Object.keys(comp).forEach(key => {
                    reconstructedPixel.r += endmembers[key].r * comp[key];
                    reconstructedPixel.g += endmembers[key].g * comp[key];
                    reconstructedPixel.b += endmembers[key].b * comp[key];
                });
                const residual = { r: pixel.r - reconstructedPixel.r, g: pixel.g - reconstructedPixel.g, b: pixel.b - reconstructedPixel.b, };
                const residualMagnitude = Math.sqrt(residual.r**2 + residual.g**2 + residual.b**2);

                let analysisInterpretation = '';
                if (residualMagnitude < 15) {
                    analysisInterpretation = "The residual (MRR) is very small. Our 4-component model has explained this pixel almost perfectly. No 'secrets' found.";
                } else {
                    let residualColor = '';
                    const absR = Math.abs(residual.r), absG = Math.abs(residual.g), absB = Math.abs(residual.b);
                    const maxResidual = Math.max(absR, absG, absB);
                    if(maxResidual === absR) residualColor = residual.r > 0 ? 'red' : 'cyan';
                    else if(maxResidual === absG) residualColor = residual.g > 0 ? 'green' : 'magenta';
                    else residualColor = residual.b > 0 ? 'blue' : 'yellow';

                    analysisInterpretation = `The detective has found a significant 'trace' left over! The residual has a magnitude of ${residualMagnitude.toFixed(0)} and a ${residualColor} hue. This reveals the existence of a rare component not included in our 4-component model.`;
                }

                setUnmixingAnalysis({
                    reconstructed: { r: Math.round(reconstructedPixel.r), g: Math.round(reconstructedPixel.g), b: Math.round(reconstructedPixel.b) },
                    residual: { r: Math.round(residual.r), g: Math.round(residual.g), b: Math.round(residual.b) },
                    interpretation: analysisInterpretation
                });

                const finalComp = { 'leaf': Math.round(comp['leaf'] * 100), 'soil': Math.round(comp['soil'] * 100), 'flower': Math.round(comp['flower'] * 100), 'shadow': Math.round(comp['shadow'] * 100) };
                const currentTotal = Object.values(finalComp).reduce((a, b) => a + b, 0);
                const maxKey = Object.keys(finalComp).reduce((a, b) => finalComp[a] > finalComp[b] ? a : b);
                finalComp[maxKey] += (100 - currentTotal);
                setAnalysisResult(finalComp);

            } catch (error) { console.error("Unmixing error:", error); }
            finally { setIsAnalyzing(false); }
        }, 500);
    }, [selectedPixel]);

    const predictionTotal = Object.values(userPrediction).reduce((a, b) => a + b, 0);

    return (
        <div className="bg-white p-6 rounded-2xl shadow-xl mt-8 text-slate-700">
            <h3 className="text-2xl font-bold text-sky-600 mb-3">Challenge 2: Decode a Real Pixel</h3>
            <p className="mb-4 italic text-slate-600">"Now for the real test! Pick any pixel, use the hint to predict its composition, and then compare it with the machine's analysis!"</p>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-7">
                    <h4 className="text-lg font-semibold text-slate-800 mb-2">Step 1: Select a pixel on the image</h4>
                    <div className="w-full bg-slate-200 rounded-lg p-2 flex justify-center items-center">
                        {imageLoading && <p id="image-loading-msg" className="text-slate-500">Searching for an image in the local data store...</p>}
                        <canvas ref={canvasRef} onClick={handleCanvasClick} className="max-w-full h-auto rounded" style={{ cursor: 'crosshair', display: imageLoading ? 'none' : 'block' }}></canvas>
                    </div>
                    {selectedPixel && (
                        <div className="mt-3 text-slate-800"><strong>Selected Pixel:</strong>
                            <div className="flex items-center space-x-3 mt-1">
                                <div style={{ width: 25, height: 25, border: '1px solid #333', backgroundColor: `rgb(${selectedPixel.r}, ${selectedPixel.g}, ${selectedPixel.b})` }}></div>
                                <span className="font-mono">RGB({selectedPixel.r}, {selectedPixel.g}, {selectedPixel.b})</span>
                            </div>
                        </div>
                    )}
                </div>
                <div className="lg:col-span-5 space-y-4">
                    <div className="bg-slate-50 border rounded-lg p-4">
                        <h4 className="text-lg font-semibold text-slate-800 mb-3">Step 2: Your Prediction</h4>
                        {hint && <div className="text-sm bg-slate-100 text-slate-600 p-3 rounded-md mb-4" dangerouslySetInnerHTML={{ __html: hint }}></div>}
                        {Object.keys(userPrediction).map(key => (
                            <div key={key} className="mb-3 text-slate-800"><label className="block text-sm font-medium capitalize mb-1">{key}:</label><div className="flex items-center space-x-3"><input type="range" className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-sky-500" value={userPrediction[key]} onChange={(e) => handlePredictionChange(key, e.target.value)} min="0" max="100" /><input type="number" className="w-20 bg-white border border-slate-300 rounded-md p-1 text-center" value={userPrediction[key]} onChange={(e) => handlePredictionChange(key, e.target.value)} min="0" max="100" /></div></div>
                        ))}
                        <h4 className="text-right mt-2 font-bold text-lg">Total: <span className={predictionTotal === 100 ? "text-green-600" : "text-red-600"}>{predictionTotal}%</span></h4>
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold text-slate-800 mb-2">Step 3: See the Analysis Results</h4>
                        <button className="w-full px-4 py-3 bg-teal-500 hover:bg-teal-600 rounded-lg text-white font-bold disabled:opacity-50 disabled:cursor-not-allowed" disabled={!selectedPixel || isAnalyzing} onClick={handleUnmix}>{isAnalyzing ? 'Analyzing...' : '✨ Decode Pixel!'}</button>
                    </div>
                    {analysisResult && (
                        <div className="bg-slate-50 border rounded-lg p-4 animate-fade-in">
                            <h4 className="text-lg font-semibold text-slate-800 mb-2">Unmixing Results (SMA)</h4>
                            {Object.keys(analysisResult).map(key => (
                                <div key={key} className="mt-2 text-slate-800"><label className="block text-sm font-medium capitalize mb-1">{key}: {analysisResult[key]}%</label><div className="w-full bg-slate-200 rounded-full h-2.5"><div className={`h-2.5 rounded-full ${key === 'leaf' ? 'bg-green-500' : key === 'soil' ? 'bg-yellow-600' : key === 'flower' ? 'bg-red-500' : 'bg-slate-500'}`} style={{ width: `${analysisResult[key]}%` }}></div></div></div>
                            ))}
                        </div>
                    )}
                    {unmixingAnalysis && (
                        <div className="bg-slate-50 border rounded-lg p-4 animate-fade-in">
                            <h4 className="text-lg font-semibold text-slate-800 mb-2">Residual Analysis (MRR) - "The Secret Corridor"</h4>
                            <div className="text-sm space-y-3 text-slate-600">
                                <div className="flex items-center">
                                    <div className="w-1/3 font-semibold">Reconstructed Pixel:</div>
                                    <div className="flex items-center gap-2">
                                        <div style={{ width: 20, height: 20, border: '1px solid #999', backgroundColor: `rgb(${unmixingAnalysis.reconstructed.r}, ${unmixingAnalysis.reconstructed.g}, ${unmixingAnalysis.reconstructed.b})` }}></div>
                                        <span className="font-mono text-xs">RGB({unmixingAnalysis.reconstructed.r}, {unmixingAnalysis.reconstructed.g}, {unmixingAnalysis.reconstructed.b})</span>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <div className="w-1/3 font-semibold">Residual (Error):</div>
                                    <div className="flex items-center gap-2">
                                        <div style={{ width: 20, height: 20, border: '1px solid #999', backgroundColor: `rgb(${Math.abs(unmixingAnalysis.residual.r)}, ${Math.abs(unmixingAnalysis.residual.g)}, ${Math.abs(unmixingAnalysis.residual.b)})` }}></div>
                                        <span className="font-mono text-xs">ΔRGB({unmixingAnalysis.residual.r}, {unmixingAnalysis.residual.g}, {unmixingAnalysis.residual.b})</span>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-sky-600 font-semibold mt-3">The Detective's Conclusion:</p>
                                    <p className="italic">"{unmixingAnalysis.interpretation}"</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const PracticeStation = () => (
    <div className="grid grid-cols-1 gap-12">
        <Activity1 />
        <Activity2 />
    </div>
);

export default PracticeStation;