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
            <span className="font-bold text-sky-600">Further concepts:</span> {concepts}
        </p>
    </div>
);

// ===== DỮ LIỆU VÀ LOGIC CHO CÁC HOẠT ĐỘNG (Phần 1 & 2 không đổi) =====
const allFeatures = [
    'Petal Length', 'Petal Width', 'Length/Width Ratio', 'Petal Curvature', 'Color (Red)',
    'Color (Green)', 'Color (Blue)', 'Color Saturation', 'Brightness', 'Pistil Count', 'Pistil Length',
    'Pistil Color', 'Leaf Shape', 'Leaf Size', 'Leaf Thickness', 'Stem Texture', 'Plant Height',
    'UV Reflectance', 'IR Reflectance', 'Scent (int)'
];
const importanceScores = {
    'Length/Width Ratio': 10, 'Petal Length': 9, 'IR Reflectance': 9, 'Color (Red)': 8, 'Leaf Size': 8,
    'Petal Width': 7, 'Brightness': 7, 'UV Reflectance': 6, 'Plant Height': 6, 'Color Saturation': 5,
    'Leaf Shape': 5, 'Pistil Count': 4, 'Petal Curvature': 4, 'Leaf Thickness': 3, 'Color (Green)': 3,
    'Pistil Length': 2, 'Stem Texture': 2, 'Color (Blue)': 1, 'Pistil Color': 1, 'Scent (int)': 1,
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
                if (!response.ok) throw new Error('Could not find file hoa_nasa_single_image_data.json');
                return response.json();
            })
            .then(data => setLocationData(data))
            .then(() => setIsLoading(true))
            .catch(error => {
                console.error("Error loading NASA data:", error);
                setDataError(prev => ({ ...prev, rendvi: error.message }));
            });

        // Tải dữ liệu cho Hoạt động 2
        fetch(publicURL + '/data/iris_data_rich.json')
            .then(response => {
                if (!response.ok) throw new Error('Could not find file iris_data_rich.json');
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
                console.error("Error loading Iris data:", error);
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
        if (score >= 44) message = "Excellent! You have selected the most essential features.";
        else if (score >= 35) message = "A very good selection! Your dataset retains a lot of important information.";
        else if (score >= 25) message = "Pretty good. It seems some of the features you chose might not be the most optimal.";
        else message = "Needs optimization. Try again to select features with higher information scores.";
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
        const normalizedRendvi = Math.max(0, Math.min(1, (rendvi + 0.2) / 0.8));
        const saturation = 0.6 + normalizedRendvi * 0.6;
        const hueRotation = -40 + normalizedRendvi * 40;
        const sepia = 0.5 - normalizedRendvi * 0.5;

        return {
            filter: `saturate(${saturation}) hue-rotate(${hueRotation}deg) sepia(${sepia})`,
            transition: 'filter 0.3s ease'
        };
    };

    return (
        <div className={"bg-slate-100 font-sans " + styles['scroll-container']} ref={scrollContainerRef}>
            <section className="text-white text-center py-20 px-4 relative overflow-hidden bg-gradient-to-br from-sky-400 to-cyan-400">
                <div className="absolute top-0 left-0 w-full h-full bg-black/10"></div>
                <div className="relative z-10 max-w-4xl mx-auto">
                    <h1 className="text-5xl md:text-8xl font-bold tracking-tight mb-8 drop-shadow-lg">Chapter 3</h1>
                    <p className="mt-4 text-2xl md:text-3xl font-light">When Machines “See”, “Understand”, and “Count” Flowers</p>
                    <div className="mt-8 bg-black/20 backdrop-blur-sm p-4 rounded-lg text-left text-sky-100">
                        <h3 className="font-bold text-lg mb-2">Learning objectives:</h3>
                        <p>Understand basics of Machine Learning, dimensionality reduction (PCA), unsupervised clustering (GMM), and vegetation indices (RENDVI) for analyzing bloom data.</p>
                    </div>
                </div>
            </section>

            <section className="bg-sky-50 py-16 px-6 md:px-12 text-slate-700">
                <div className="max-w-4xl mx-auto flex">
                    <div className="space-y-6 text-lg leading-relaxed">
                        <p>Alice and the Spectral Detective entered the "Machine School," a large room with dozens of "Student Robots" sitting in front of screens. A young woman with her hair in a high bun, wearing glasses and a white lab coat, was giving a lecture.</p>
                        <p>"Welcome to the 'Machine School'," she said. "I am <strong className="text-sky-600 font-semibold">Professor Machine Learning</strong>. Today, we will 'teach' these robots how to 'see,' 'understand,' and even 'count' flowers!"</p>
                        <p>"It's all thanks to <strong className="text-sky-600 font-semibold">Machine Learning</strong>," the Professor explained. "For a computer to learn effectively, we first need to 'lighten its luggage' using <strong className="text-sky-600 font-semibold">PCA – Principal Component Analysis</strong>. PCA will find the 'most important information' for the computer to focus on."</p>
                    </div>
                    <img src={anh1} alt="Machine Learning and PCA" className="w-1/2 h-auto ml-8 rounded-lg shadow-lg object-cover" />
                </div>
            </section>
            <section className="bg-sky-50 py-16 px-6 md:px-12 text-slate-700">
                <div className="max-w-4xl mx-auto flex">
                    <div className="space-y-6 text-lg leading-relaxed">
                        <p>The Professor of Machine Learning was excited. "Next, we use <strong className="text-sky-600 font-semibold">GMM – Gaussian Mixture Model</strong>. It will help the computer automatically 'sort' similar flowers into the same group. This is called <strong className="text-sky-600 font-semibold">Unsupervised Clustering</strong>."</p>
                        <ul className="list-disc list-inside space-y-2 pl-4 bg-sky-100 p-4 rounded-lg text-slate-600">
                            <li><strong className="text-teal-600">MRBI (Mixture Residual Bloom Index):</strong> A 'magic index' to 'find' and 'count' yellow flowers.</li>
                            <li><strong className="text-teal-600">RENDVI (Red-Edge Normalized Difference Vegetation Index):</strong> The 'thermometer of green life' that helps us 'measure' the health of plant leaves.</li>
                        </ul>
                    </div>
                    <img src={anh2} alt="GMM and RENDVI" className="w-1/2 h-auto ml-8 rounded-lg shadow-lg object-cover" />
                </div>
            </section>

            <section className="bg-slate-200 px-6 md:px-12">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-4xl font-bold text-center mb-8 text-slate-800">Data Practice Station</h2>

                    {dataError && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative mb-6" role="alert">
                            <strong className="font-bold">Data loading error! </strong>
                            <span className="block sm:inline">Could not load the data files. Please ensure you have created the `public/data` directory and placed the JSON files in the correct location.</span>
                        </div>
                    )}

                    <div className="grid md:grid-cols-1 lg:grid-cols-1 gap-8">
                        <PracticeStation title="Activity 1: Packing the Data Luggage (PCA)" challenge="Try to 'reduce the data's dimensionality' by 'selecting the 5 most important features' to describe each flower species. This is a 'simplified version' of PCA." concepts="Data Features, Dimensionality Reduction, Feature Extraction.">
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                <div className="lg:col-span-2">
                                    <h4 className="font-bold mb-3 text-slate-800">Select the 5 most important features from the following 20:</h4>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-2 p-4 bg-slate-100 rounded-lg">
                                        {allFeatures.map(feature => (
                                            <label key={feature} className={`flex items-center gap-2 p-1 rounded transition-colors ${selectedFeatures.includes(feature) ? 'text-sky-600 font-semibold' : 'hover:bg-slate-200'} ${showScores ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}`}>
                                                <input type="checkbox" className="form-checkbox h-4 w-4 rounded text-sky-500 focus:ring-sky-400 focus:ring-2"
                                                       checked={selectedFeatures.includes(feature)} onChange={() => handleFeatureSelect(feature)}
                                                       disabled={showScores || (!selectedFeatures.includes(feature) && selectedFeatures.length >= 5)}
                                                />
                                                <span className="text-sm">{feature} {showScores && <strong className="text-teal-600">({importanceScores[feature]}pts)</strong>}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                                <div className="lg:col-span-1 bg-slate-100 p-4 rounded-lg flex flex-col">
                                    <h4 className="font-bold mb-2 text-center text-slate-800">Features selected: {selectedFeatures.length}/5</h4>
                                    <ul className="list-disc list-inside space-y-1 mb-4 flex-grow text-slate-600">
                                        {selectedFeatures.length > 0 ? selectedFeatures.map(f => <li key={f}>{f}</li>) : <p className="italic text-center">No features selected yet.</p>}
                                    </ul>

                                    {selectedFeatures.length === 5 && !evaluationResult && (
                                        <button onClick={handleEvaluation} className="w-full bg-green-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-600 transition-colors shadow-md">Evaluate Selection</button>
                                    )}

                                    {evaluationResult && (
                                        <div className="text-center bg-white/50 p-3 rounded-lg">
                                            <p className="text-lg font-bold text-slate-800">Total Information Score:</p>
                                            <p className="text-4xl font-bold text-sky-600 my-1 drop-shadow-sm">{evaluationResult.score}</p>
                                            <p className="text-sm italic text-slate-600">"{evaluationResult.message}"</p>
                                        </div>
                                    )}

                                    {showScores && (
                                        <button onClick={resetPCA} className="w-full mt-4 bg-sky-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-sky-600 transition-colors shadow-md">Try Again</button>
                                    )}
                                </div>
                            </div>
                        </PracticeStation>
                    </div>
                </div>
            </section>
            <section>
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-4xl font-bold text-center mb-12 text-slate-800">Data Practice Station</h2>
                    <PracticeStation title="Activity 2: Grouping Flowers Without Labels (GMM)" challenge="Let's 'use a virtual GMM model' to 'group' these flowers into the 3 most 'apparently similar' groups without knowing their species names. Do you see any 'hidden groups' being formed?" concepts="Clustering, Data Distance, Unsupervised Classification.">
                        <div className="grid md:grid-cols-3 gap-6 items-center">
                            <div className="md:col-span-1 flex flex-col items-center gap-4">
                                <p className="text-center">
                                    {flowerPoints.length} data points from the classic <strong className="text-teal-600">Iris dataset</strong> are arranged randomly. Press the button to let the GMM algorithm automatically find 3 clusters based on petal length and width.
                                </p>
                                {!isClustered ?
                                    <button onClick={handleCluster} disabled={flowerPoints.length === 0} className="w-full bg-teal-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-teal-600 transition-colors shadow-md disabled:bg-slate-400">Cluster Flowers</button> :
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
                                        title={`Species: ${p.species}`}
                                    ></div>
                                )) : <p className="text-center text-slate-500 p-4">Loading data...</p>}
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
                            <h2 className="text-4xl font-bold text-center mb-12 text-slate-800">Data Practice Station</h2>
                            <PracticeStation
                                title="Activity 3: Calculating the Vigor Index (RENDVI)"
                                challenge="Let's 'calculate the RENDVI index' for each location using the 'magic formula' (NIR - Red) / (NIR + Red) to assess their 'green health'. Which location has the highest RENDVI?"
                                concepts="Vegetation Index, Near-Infrared Spectrum, Quantifying Vegetation Vigor."
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
                                                Drag the sliders and observe how the color of the vegetation (the reddish areas) in the image changes.
                                            </div>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-slate-600">
                                                <div>
                                                    <label>Red Reflectance (Red): {item.red}</label>
                                                    <input type="range" min="0" max="1" step="0.01" value={item.red} onChange={(e) => handleLocationDataChange(item.id, 'red', e.target.value)} className="w-full h-2 bg-slate-300 rounded-lg appearance-none cursor-pointer accent-red-500" />
                                                </div>
                                                <div>
                                                    <label>Near-Infrared Reflectance (NIR): {item.nir}</label>
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
                    <h2 className="text-3xl font-bold mb-6 drop-shadow">Key Takeaways</h2>
                    <p className="text-xl leading-relaxed mb-6 bg-black/10 p-4 rounded-lg backdrop-blur-sm">
                        Machine Learning and vegetation indices are powerful tools that allow computers to "see", "understand", and "count" flowers from spectral data, helping us extract important information and discover hidden patterns.
                    </p>
                    <p className="text-lg italic mb-8">End of Chapter 3: Alice felt her mind expand with new concepts.</p>
                    <blockquote className="font-bold text-2xl border-l-4 border-yellow-200 pl-4">"Excellent, Alice! You've helped these robots understand the language of flowers. Now, let's 'join forces' to observe flowers on a global scale!"</blockquote>
                </div>
                <footer className="w-full max-w-5xl mx-auto mt-0 pt-8 border-t border-white/20">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                        <p className="text-sm text-white/70">
                        </p>
                        <div className="flex items-center gap-6">
                            <Link to="/chuong2" className="font-medium hover:text-yellow-300 transition-colors">
                                ← Back to Chapter 2
                            </Link>
                            <Link to="/chuong4" className="bg-yellow-300 text-orange-900 font-bold py-2 px-5 rounded-full hover:bg-white hover:text-orange-900 transition-colors shadow-lg">
                                Go to Chapter 4 →
                            </Link>
                        </div>
                    </div>
                </footer>
            </section>
        </div >
    );
}

export default App;