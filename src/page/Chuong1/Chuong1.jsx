// src/pages/Chuong1.jsx
import React, { useState, useCallback, useEffect, useRef } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Link } from 'react-router-dom';
import styles from './chuong1.module.css';

//Đường dẫn hình ảnh
import HinhAnhGacVuon from '../../assets/chuong1/1.png';
import HinhAnhSuperbloom from '../../assets/chuong1/super-bloom.png';
import HinhAnhVuonSacTo from '../../assets/chuong1/2.png';
import HinhAnhNhaBep from '../../assets/chuong1/3.png';
import HinhAnhSuperbloomHigh from '../../assets/chuong1/superbloom-high.jpg';
import HinhAnhSuperbloomMedium from '../../assets/chuong1/superbloom-medium.jpg';
import HinhAnhSuperbloomLow from '../../assets/chuong1/superbloom-low.jpg';
import HinhAnhSuperbloomNone from '../../assets/chuong1/superbloom-none.jpg';



// --- Dữ liệu cho các hoạt động ---
const FLOWERS_DATA = [
    { id: 1, color: 'Yellow', colorHex: '#FFD700', petals: 5, diameter: 7, pigment: 'Carotenoids' },
    { id: 2, color: 'Purple', colorHex: '#8A2BE2', petals: 8, diameter: 6, pigment: 'Anthocyanins' },
    { id: 3, color: 'Red', colorHex: '#DC143C', petals: 6, diameter: 8, pigment: 'Anthocyanins' },
    { id: 4, color: 'Orange', colorHex: '#FFA500', petals: 12, diameter: 9, pigment: 'Carotenoids' },
    { id: 5, color: 'Bright Red', colorHex: '#FF4500', petals: 7, diameter: 7, pigment: 'Betalains' },
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
        <div ref={drop} className={`p-4 border-2 border-dashed rounded-lg min-h-[100px] transition-colors ${isOver ? 'bg-green-100 border-green-500' : 'bg-gray-50 border-gray-300'}`}>
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
            setFeedback2('Hey, please select a pigment for all the flowers!');
            return;
        }
        const correctMatches = FLOWERS_DATA.every(
            flower => pigmentMatches[flower.id] === flower.pigment
        );
        if (correctMatches) {
            setFeedback2('Excellent! You\'ve become a flower pigment expert.');
        } else {
            setFeedback2('Some pigments are not quite right. Let\'s try again!');
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h4 className="text-xl font-semibold text-gray-800 mb-4">Activity 1.2: The Pigment Painter Match-Up</h4>
            <p className="mb-4">Each color is created by a pigment 'painter'. Let's match the right painter to each flower!</p>
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
                            <option value="">Select a pigment...</option>
                            {PIGMENTS.map(p => <option key={p} value={p}>{p}</option>)}
                        </select>
                    </div>
                ))}
            </div>
            <button onClick={checkPigmentMatches} className="mt-4 bg-green-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-700 transition-colors">Check</button>
            {feedback2 && <p className={`mt-2 font-semibold ${feedback2.includes('Excellent') ? 'text-green-600' : (feedback2.includes('Hey') ? 'text-orange-500' : 'text-red-600')}`}>{feedback2}</p>}
        </div>
    );
}

// --- Component Hoạt Động Superbloom với ảnh thực tế từ API NASA ---
const HoatDongSuperbloomThucTe = ({ title, challenge, concepts }) => {
    // State cho tương tác người dùng
    const [rainfall, setRainfall] = useState(150);
    const [temperature, setTemperature] = useState(18);
    const [bloomStrength, setBloomStrength] = useState(0);

    // State quản lý dữ liệu từ API
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [optimalConditions, setOptimalConditions] = useState(null);
    const [yearExamples, setYearExamples] = useState(null);

    // State cho hình ảnh hiển thị
    const [imageUrl, setImageUrl] = useState(HinhAnhSuperbloomNone);
    const [imageDescription, setImageDescription] = useState('');

    // Hàm xử lý dữ liệu thô từ API NASA POWER (VẪN GIỮ NGUYÊN)
    const processApiData = (data) => {
        const parameters = data.properties.parameter;
        const monthlyRain = parameters.PRECTOTCORR;
        const monthlyTemp = parameters.T2M;
        const yearlyData = {};

        for (const date in monthlyRain) {
            const year = parseInt(date.substring(0, 4), 10);
            const month = parseInt(date.substring(4, 6), 10);
            if (!yearlyData[year]) {
                yearlyData[year] = { year: year, winterRain: 0, springTemp: [], springMonthCount: 0 };
            }
            if (month === 11 || month === 12) {
                if (yearlyData[year + 1]) yearlyData[year + 1].winterRain += monthlyRain[date];
            } else if (month === 1 || month === 2) {
                yearlyData[year].winterRain += monthlyRain[date];
            }
            if ([3, 4, 5].includes(month)) {
                yearlyData[year].springTemp.push(monthlyTemp[date]);
                yearlyData[year].springMonthCount++;
            }
        }

        const validYears = Object.values(yearlyData).filter(y => y.springMonthCount > 0 && y.winterRain > 0).map(y => ({
            ...y,
            avgSpringTemp: y.springTemp.reduce((a, b) => a + b, 0) / y.springMonthCount
        }));

        validYears.sort((a, b) => b.winterRain - a.winterRain);

        if (validYears.length < 4) {
            throw new Error("Not enough historical data to classify years.");
        }

        const bestYear = validYears[0];
        const mediumYear = validYears[Math.floor(validYears.length / 3)];
        const lowYear = validYears[Math.floor(validYears.length * 2 / 3)];
        const dryYear = validYears[validYears.length - 1];

        return {
            optimal: {
                rainfall: bestYear.winterRain,
                temperature: bestYear.avgSpringTemp
            },
            examples: {
                high: `${bestYear.year}`,
                medium: `${mediumYear.year}`,
                low: `${lowYear.year}`,
                none: `${dryYear.year}`
            }
        };
    };

    // useEffect để gọi API một lần khi component được tải (GIỮ NGUYÊN)
    useEffect(() => {
        const lat = 34.7;
        const lon = -118.4;
        const startYear = 2005;
        const endYear = 2024;
        const apiUrl = `https://power.larc.nasa.gov/api/temporal/monthly/point?parameters=T2M,PRECTOTCORR&community=RE&longitude=${lon}&latitude=${lat}&start=${startYear}&end=${endYear}&format=JSON`;

        fetch(apiUrl)
            .then(res => res.ok ? res.json() : Promise.reject('Network response was not ok'))
            .then(data => {
                const processedData = processApiData(data);
                setOptimalConditions(processedData.optimal);
                setYearExamples(processedData.examples);
                setIsLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch NASA data:", err);
                setError("Could not load weather data from NASA. Please try again later.");
                setIsLoading(false);
            });
    }, []);

    // useCallback để tính toán sức mạnh nở hoa và cập nhật ảnh (GIỮ NGUYÊN)
    const calculateBloom = useCallback(() => {
        if (!optimalConditions || !yearExamples) return;

        const rainDiff = Math.abs(rainfall - optimalConditions.rainfall);
        const rainScore = Math.max(0, 100 - (rainDiff / optimalConditions.rainfall) * 100);

        const tempDiff = Math.abs(temperature - parseInt(optimalConditions.temperature));
        const tempScore = Math.max(0, 100 - (tempDiff / parseInt(optimalConditions.temperature)) * 50);

        const finalStrength = (rainScore * 0.7) + (tempScore * 0.3);
        setBloomStrength(finalStrength);

        // *** THAY ĐỔI CHÍNH: Cập nhật ảnh từ source code thay vì API ***
        if (finalStrength > 85) {
            setImageUrl(HinhAnhSuperbloomHigh);
            setImageDescription(`Illustration of a peak superbloom season (e.g., the year ${yearExamples.high}).`);
        } else if (finalStrength > 60) {
            setImageUrl(HinhAnhSuperbloomMedium);
            setImageDescription(`Illustration of a strong bloom season (e.g., the year ${yearExamples.medium}).`);
        } else if (finalStrength > 30) {
            setImageUrl(HinhAnhSuperbloomLow);
            setImageDescription(`Illustration of a moderate bloom season (e.g., the year ${yearExamples.low}).`);
        } else {
            setImageUrl(HinhAnhSuperbloomNone);
            setImageDescription(`Illustration of a dry year with no superbloom (e.g., the year ${yearExamples.none}).`);
        }
    }, [rainfall, temperature, optimalConditions, yearExamples]);

    // useEffect để chạy lại tính toán khi dữ liệu thay đổi (GIỮ NGUYÊN)
    useEffect(() => {
        if (!isLoading) {
            calculateBloom();
        }
    }, [isLoading, calculateBloom]);

    // *** THAY ĐỔI CÁCH RENDER ***
    // Bây giờ component này sẽ được bọc bởi PracticeStation
    // và sẽ render nội dung bên trong nó.
    return (
        <PracticeStation title={title} challenge={challenge} concepts={concepts}>
            {isLoading || error ? (
                // Giao diện khi đang tải hoặc lỗi
                <div className="bg-white p-6 rounded-lg shadow-md text-center h-80 flex items-center justify-center">
                    {isLoading ? "Loading and analyzing 20 years of weather data from NASA..." : <span className="text-red-500">{error}</span>}
                </div>
            ) : (
                // Giao diện chính sau khi tải xong
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <p className="mb-6 text-center">{`On the "Superbloom Control Panel," adjust the environmental factors. Based on 20 years of NASA data for California, the ideal conditions are identified as around ${Math.round(optimalConditions.rainfall)}mm of rain and a temperature of ${optimalConditions.temperature.toFixed(0)}°C.`}</p>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 items-center">
                        <div className="md:col-span-1 lg:col-span-2 space-y-6">
                            {/* Thanh trượt điều khiển */}
                            <div>
                                <div className="flex justify-between items-center mb-1">
                                    <label className="font-medium">Winter Rainfall 💧</label>
                                    <span className="font-bold text-blue-600">{rainfall} mm</span>
                                </div>
                                <input type="range" min="0" max="600" value={rainfall} onChange={e => setRainfall(Number(e.target.value))} className="w-full" />
                            </div>
                            <div>
                                <div className="flex justify-between items-center mb-1">
                                    <label className="font-medium">Spring Temperature 🔥</label>
                                    <span className="font-bold text-red-600">{temperature} °C</span>
                                </div>
                                <input type="range" min="5" max="30" step="0.5" value={temperature} onChange={e => setTemperature(Number(e.target.value))} className="w-full" />
                            </div>
                            {/* Hiển thị sức mạnh */}
                            <div className="text-center bg-gray-50 p-4 rounded-xl shadow-inner">
                                <h4 className="text-lg font-semibold mb-2">Superbloom Strength</h4>
                                <div className="w-32 h-32 mx-auto bg-gray-200 rounded-full flex items-end overflow-hidden border-4 border-gray-300">
                                    <div className="w-full bg-gradient-to-t from-yellow-400 via-pink-500 to-purple-600 transition-all duration-500" style={{ height: `${bloomStrength}%` }}></div>
                                </div>
                                <p className="text-3xl font-bold mt-2 text-purple-700">{Math.round(bloomStrength)}%</p>
                            </div>
                        </div>
                        {/* Hiển thị ảnh từ source */}
                        <div className="md:col-span-1 lg:col-span-1 text-center flex flex-col items-center justify-center">
                            <img src={imageUrl} alt="Illustration of the superbloom phenomenon" className="w-full max-w-sm h-64 object-cover rounded-lg shadow-xl border-2 border-gray-200" />
                            <p className="text-sm text-gray-600 italic mt-2 max-w-sm">{imageDescription}</p>
                        </div>
                    </div>
                </div>
            )}
        </PracticeStation>
    );
};

// ===== COMPONENT TÁI SỬ DỤNG (GIỐNG CHƯƠNG 3) =====
const PracticeStation = ({ title, challenge, concepts, children }) => (
    <div className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-xl  text-slate-700 w-full max-w-6xl mx-auto">
        <h3 className="text-2xl font-bold text-yellow-700 mb-3">{title}</h3>
        <p className="mb-4 italic text-slate-600">"{challenge}"</p>
        <div className="my-4">{children}</div>
        <p className="text-sm font-semibold text-slate-500 mt-4">
            <span className="font-bold text-yellow-700">Concepts to learn:</span> {concepts}
        </p>
    </div>
);

// --- Component chính cho Chương 1 (ĐÃ CẬP NHẬT)---
function Chuong1() {
    // --- State và Logic (giữ nguyên) ---
    const [qualitativeDropped, setQualitativeDropped] = useState([]);
    const [quantitativeDropped, setQuantitativeDropped] = useState([]);
    const [feedback1, setFeedback1] = useState('');

    const handlePropertyDrop = useCallback((item, zoneTitle) => {
        const isQualitative = item.type === 'qualitative';
        const targetZoneIsQualitative = zoneTitle.includes('Qualitative Data');
        if (isQualitative === targetZoneIsQualitative) {
            if (targetZoneIsQualitative) setQualitativeDropped(prev => [...prev, item]);
            else setQuantitativeDropped(prev => [...prev, item]);
            setFeedback1('Correct! You\'ve classified it properly.');
        } else {
            setFeedback1('Not quite right. Let\'s review the definitions of qualitative and quantitative data!');
        }
    }, []);

    // --- LOGIC CHO SCROLL SNAP VÀ FADE-IN (MỚI) ---
    const scrollContainerRef = useRef(null);
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    entry.target.classList.toggle(styles['is-visible'], entry.isIntersecting);
                });
            }, { threshold: 0.5 }
        );
        const sections = Array.from(scrollContainerRef.current.children);
        sections.forEach(section => { observer.observe(section); });
        return () => { sections.forEach(section => { observer.unobserve(section); }); };
    }, []);

    // --- COMPONENT STORY SECTION ĐỂ TÁI SỬ DỤNG TRONG CHƯƠNG NÀY ---
    const StorySection = ({ title, children, imageAlt, imageSrc, reverse = false }) => (
        <div className={`max-w-5xl mx-auto grid md:grid-cols-2 items-center gap-12 w-full`}>
            <div className={`md:order-${reverse ? '2' : '1'}`}>
                <h2 className="text-4xl font-bold text-green-800 mb-6 drop-shadow-sm">{title}</h2>
                <div className="text-lg text-slate-700 leading-relaxed space-y-4">{children}</div>
            </div>
            <div className={`md:order-${reverse ? '1' : '2'}`}>
                <img src={imageSrc} alt={imageAlt} className="w-full h-auto object-cover rounded-2xl shadow-2xl" />
            </div>
        </div>
    );

    return (
        <div className={"bg-slate-100 font-vietnam " + styles['scroll-container']} ref={scrollContainerRef}>

            {/* SECTION 1: HEADER */}
            <section className="text-white text-center p-4 relative overflow-hidden bg-gradient-to-br from-green-400 to-teal-500 justify-center">
                <div className="absolute top-0 left-0 w-full h-full bg-black/10"></div>
                <div className="relative z-10 max-w-4xl mx-auto">
                    <h1 className="text-5xl md:text-8xl font-bold tracking-tight mb-8 drop-shadow-lg">Chapter 1</h1>
                    <p className="mt-4 text-2xl md:text-3xl font-light">The Secret of Vibrant Colors and Nature’s Recipe</p>
                    <div className="mt-8 bg-black/20 backdrop-blur-sm p-4 rounded-lg text-left text-green-100">
                        <h3 className="font-bold text-lg mb-2">Learning objectives:</h3>
                        <p>Get familiar with data types (qualitative, quantitative), understand environmental factors affecting blooms, and the role of pigments.</p>
                    </div>
                </div>
            </section>

            {/* SECTION 2: STORY 1 */}
            <section className="bg-green-50 p-6 md:p-12 justify-center">
                <StorySection title="A Meeting on the Quiet Meadow" imageSrc={HinhAnhGacVuon} imageAlt="The Enchanted Gardener">
                    <p>Alice found herself standing on a gentle hill, surrounded by a lush green carpet of vegetation. But strangely, there wasn't a single flower! "Welcome to the 'Meadow of Observation'," a warm voice echoed.</p>
                    <p>"I am the Enchanted Gardener," said the old man with snow-white hair, smiling kindly. "My duty is to protect and observe the great flower carpets of the Earth."</p>
                </StorySection>
            </section>

            {/* SECTION 3: STORY 2 */}
            <section className="bg-slate-100 p-6 md:p-12 justify-center">
                <StorySection title="The Flower Tapestry from Space" imageSrc={HinhAnhSuperbloom} imageAlt="Superbloom phenomenon" reverse={true}>
                    <p>The Gardener lifted a crystal orb, and a three-dimensional image appeared: vast carpets of flowers covering California. "That is the 'superbloom' phenomenon," he explained.</p>
                    <p>"They are wonderful examples of <strong className="text-green-600">qualitative data</strong> (color, beauty) created from a series of <strong className="text-green-600">quantitative data</strong> (number of flowers, area)."</p>
                </StorySection>
            </section>

            {/* SECTION 4: STORY 3 */}
            <section className="bg-yellow-50 p-6 md:p-12 justify-center">
                <StorySection title="The Pigment Garden" imageSrc={HinhAnhVuonSacTo} imageAlt="Pigment Garden">
                    <p>"The colors of flowers are not just for beauty," the Gardener said, leading Alice into a shimmering 'Pigment Garden'. "Each color is its own 'language', created by secret 'painters':</p>
                    <ul className="list-disc list-inside space-y-2 pl-4">
                        <li><strong>Carotenoids:</strong> The 'painter of yellows and oranges'.</li>
                        <li><strong>Anthocyanins:</strong> The 'painter of purples and reds'.</li>
                        <li><strong>Betalains:</strong> A 'special painter' that creates unique reds and purples.</li>
                    </ul>
                </StorySection>
            </section>

            {/* SECTION 5: PRACTICE STATION 1 */}
            <section className="bg-yellow-100 justify-center items-center">
                <PracticeStation title="Decoding the Secrets of Color" challenge="Help the Gardener classify the flower attributes and match them with the correct pigment 'painters'." concepts="Qualitative Data (Categorical), Quantitative Data (Numerical), Pigments.">
                    <DndProvider backend={HTML5Backend}>
                        {/* Hoạt động 1.1 */}
                        <div className="bg-white/70 p-4 rounded-lg">
                            <h4 className="text-xl font-semibold text-gray-800 mb-2">1. Classifying Data</h4>
                            <p className="mb-4 text-sm">Drag the attributes into the correct 'Qualitative' or 'Quantitative' box.</p>
                            <div className="flex flex-wrap justify-center gap-4 mb-6">
                                {FLOWERS_DATA.map(f => (
                                    <div key={f.id} className="p-3 border rounded-lg bg-gray-50 text-center">
                                        <div style={{ backgroundColor: f.colorHex }} className="w-12 h-12 rounded-full mx-auto mb-2"></div>
                                        <DraggableProperty text={`Color: ${f.color}`} type="qualitative" flowerId={f.id} />
                                        <DraggableProperty text={`Petals: ${f.petals}`} type="quantitative" flowerId={f.id} />
                                        <DraggableProperty text={`Diameter: ${f.diameter}cm`} type="quantitative" flowerId={f.id} />
                                    </div>
                                ))}
                            </div>
                            <div className="grid md:grid-cols-2 gap-6">
                                <DropZone title="Qualitative Data" onDrop={handlePropertyDrop} droppedItems={qualitativeDropped} />
                                <DropZone title="Quantitative Data" onDrop={handlePropertyDrop} droppedItems={quantitativeDropped} />
                            </div>
                            {feedback1 && <p className={`mt-4 text-center font-semibold ${feedback1.includes('Correct') ? 'text-green-600' : 'text-red-600'}`}>{feedback1}</p>}
                        </div>
                    </DndProvider>
                </PracticeStation>
            </section>
            <section className="bg-yellow-100 justify-center items-center">
                <PracticeStation title="Decoding the Secrets of Color" challenge="Help the Gardener classify the flower attributes and match them with the correct pigment 'painters'." concepts="Qualitative Data (Categorical), Quantitative Data (Numerical), Pigments.">
                    <DndProvider backend={HTML5Backend}>
                        {/* Hoạt động 1.2 */}
                        <div className="bg-white/70 rounded-lg">
                            <HoatDongGhepSacTo />
                        </div>
                    </DndProvider>
                </PracticeStation>
            </section>

            {/* SECTION 6: STORY 4 */}
            <section className="bg-slate-100 justify-center">
                <StorySection title="Nature’s Kitchen" imageSrc={HinhAnhNhaBep} imageAlt="Nature’s Kitchen" reverse={true}>
                    <p>"To create a superbloom, nature needs a perfect 'recipe'," said the Gardener. "And data are the 'ingredients' we need to understand that recipe."</p>
                    <ol className="list-decimal list-inside space-y-2 pl-4">
                        <li><strong>Just enough rain:</strong> Time-series data on rainfall.</li>
                        <li><strong>Previous dry years:</strong> Historical data on droughts.</li>
                        <li><strong>Gradual temperature increase:</strong> Soil and air temperature data.</li>
                        <li><strong>Suitable soil:</strong> Data on soil composition.</li>
                    </ol>
                </StorySection>
            </section>

            {/* SECTION 7: PRACTICE STATION 2 */}
            <section className="bg-blue-100 justify-center items-center">
                <HoatDongSuperbloomThucTe
                    title="The Superbloom Chef Experiment"
                    challenge="Try being the 'chef'! Adjust the weather 'ingredients' to see if you can create the most spectacular superbloom season!"
                    concepts="Correlation Analysis, Time-Series Data, Modeling."
                />
            </section>

            {/* SECTION 8: KẾT LUẬN & FOOTER */}
            <section className="p-6 md:p-12 text-white bg-gradient-to-br from-green-500 to-teal-600 justify-center">
                <div className="max-w-4xl mx-auto text-center flex-1 mt-8">
                    <h2 className="text-3xl font-bold mb-6 drop-shadow">Key takeaways</h2>
                    <p className="text-xl leading-relaxed mb-6 bg-black/10 p-4 rounded-lg backdrop-blur-sm">
                        Superbloom results from the interplay of many environmental factors. By collecting and analyzing diverse data types, we can begin to decode nature’s secret language.
                    </p>
                    <p className="text-lg italic">End of Chapter 1: Alice is ready for the next data adventures.</p>
                </div>
                <footer className="w-full max-w-5xl mx-auto mt-12 pt-8 border-t border-white/20">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                        <p className="text-sm text-white/70"></p>
                        <div className="flex items-center gap-6">
                            <Link to="/chuong2" className="bg-yellow-300 text-green-900 font-bold py-2 px-5 rounded-full hover:bg-white hover:text-green-900 transition-colors shadow-lg">
                                Go to Chapter 2 →
                            </Link>
                        </div>
                    </div>
                </footer>
            </section>

        </div>
    );
}

export default Chuong1;