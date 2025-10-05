/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react';
import anh1 from '../../assets/chuong4/8.png';
import anh2 from '../../assets/chuong4/9,5.png';
import anh3 from '../../assets/chuong4/9.png';
import flower1 from '../../assets/chuong4/flower1.png';
import flower2 from '../../assets/chuong4/flower2.png';
import flower3 from '../../assets/chuong4/flower3.png';
import styles from './chuong4.module.css'
import { Link } from 'react-router-dom';
// ===== CÁC ICON SVG (Không cần thư viện ngoài) =====
const CameraIcon = ({ className = "h-6 w-6" }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>);
const BeakerIcon = ({ className = "h-6 w-6" }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547a2 2 0 00-.547 1.806l.477 2.387a6 6 0 00.517 3.86l.158.318a6 6 0 00.517 3.86l2.387.477a2 2 0 001.806-.547a2 2 0 00.547-1.806l-.477-2.387a6 6 0 00-.517-3.86l-.158-.318a6 6 0 00-.517-3.86l-2.387-.477zM12 12V3m0 9a6 6 0 000 12h.008a6 6 0 000-12H12z" /></svg>);
const ThermometerIcon = ({ className = "h-6 w-6" }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 14.25l-.236.16a.75.75 0 00-.864 1.12l1.5 2.25a.75.75 0 001.2 0l1.5-2.25a.75.75 0 00-.864-1.12L12 14.25v-5.25a3 3 0 00-3-3h-1.5a3 3 0 00-3 3v5.25z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12.75 6.03v-.915a.75.75 0 00-1.5 0v.915a.75.75 0 001.5 0zM10.5 3a.75.75 0 00-1.5 0v.75a.75.75 0 001.5 0V3z" /></svg>);
const CpuChipIcon = ({ className = "h-6 w-6" }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 21v-1.5M15.75 3v1.5m0 16.5v-1.5m3.75-12H21m-18 0h1.5M15.75 21v-1.5m0-16.5v1.5m-7.5 0v1.5m0 16.5v-1.5" /><path strokeLinecap="round" strokeLinejoin="round" d="M9 9h6v6H9V9z" /></svg>);
const SatelliteIcon = ({ className = "h-8 w-8" }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5V15.75a2.25 2.25 0 01-4.5 0V10.5m4.5 0V4.5A2.25 2.25 0 009 2.25v0A2.25 2.25 0 006.75 4.5v6m9 0V4.5A2.25 2.25 0 0013.5 2.25v0A2.25 2.25 0 0011.25 4.5v6m-4.5 1.5v6m1.5-6v6m0-6h1.5m-1.5 0h-1.5" /></svg>);
const DroneIcon = ({ className = "h-8 w-8" }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9.75v1.5m-3-1.5v1.5m6-1.5v1.5m-3-3.75v1.5m-3-1.5v1.5m6-1.5v1.5M9 6.75v1.5m3-1.5v1.5m-3 0h3m2.25 0h-9.5C5.086 9 4.5 9.586 4.5 10.25v4.5c0 .664.586 1.25 1.25 1.25h9.5c.664 0 1.25-.586 1.25-1.25v-4.5c0-.664-.586-1.25-1.25-1.25z" /></svg>);
const IotIcon = ({ className = "h-8 w-8" }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 017.424 0M5.136 12.006a8.25 8.25 0 0113.728 0M2.01 8.944a12 12 0 0119.98 0" /></svg>);

// ===== COMPONENT BIỂU ĐỒ TỰ TẠO BẰNG SVG =====
const CustomLineChart = ({ data, width = 500, height = 300 }) => {
  // (Component này giữ nguyên như phiên bản trước, không cần thay đổi)
  const padding = { top: 20, right: 30, bottom: 50, left: 40 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  if (!data || data.datasets.every(ds => ds.data.length === 0)) {
    return (<div style={{ width, height }} className="flex items-center justify-center bg-gray-100 text-gray-500 rounded-lg">No data yet</div>);
  }

  const allDataPoints = data.datasets.flatMap(ds => ds.data);
  const yMax = Math.max(...allDataPoints, 0) || 1;
  const yMin = Math.min(...allDataPoints, 0);
  const yRange = yMax - yMin === 0 ? 1 : yMax - yMin;
  const xPointCount = data.labels.length;

  const getX = (index) => padding.left + (xPointCount > 1 ? (index / (xPointCount - 1)) * chartWidth : chartWidth / 2);
  const getY = (value) => padding.top + chartHeight - ((value - yMin) / yRange) * chartHeight;

  return (
      <div className="bg-white/90 p-4 rounded-lg text-gray-800 flex flex-col items-center">
        <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
          <g className="text-xs text-gray-500">
            {[0, 0.25, 0.5, 0.75, 1].map(tick => {
              const yValue = yMin + tick * yRange;
              const yPos = getY(yValue);
              return (<g key={tick}><text x={padding.left - 8} y={yPos + 4} textAnchor="end" fill="currentColor">{yValue.toFixed(1)}</text><line x1={padding.left} y1={yPos} x2={padding.left + chartWidth} y2={yPos} stroke="#e5e7eb" /></g>);
            })}
            {data.labels.map((label, index) => (<text key={label} x={getX(index)} y={height - padding.bottom + 15} textAnchor="middle" className="fill-current">{label}</text>))}
          </g>
          {data.datasets.map(dataset => {
            const pathD = dataset.data.map((point, index) => `${index === 0 ? 'M' : 'L'} ${getX(index)} ${getY(point)}`).join(' ');
            return <path key={dataset.label} d={pathD} fill="none" stroke={dataset.color} strokeWidth="2" />;
          })}
        </svg>
        <div className="flex justify-center flex-wrap gap-4 mt-2 text-sm">
          {data.datasets.map(ds => (<div key={ds.label} className="flex items-center gap-2"><div className="w-4 h-1" style={{ backgroundColor: ds.color }}></div><span>{ds.label}</span></div>))}
        </div>
      </div>
  );
};

// Dữ liệu giả cho Hoạt động 2
const kyotoData = {
  labels: ['1920', '1940', '1960', '1980', '2000', '2020'],
  datasets: [{ label: 'Cherry Blossom Peak Bloom Day in Kyoto', data: [105, 102, 100, 98, 95, 92], color: 'rgb(255, 99, 132)' }],
};

const PracticeStation = ({ title, challenge, concepts, children }) => (
    <div className="bg-white/10 p-6 rounded-2xl shadow-lg backdrop-blur-sm">
      <h3 className="text-2xl font-bold text-yellow-300 mb-3 text-center">{title}</h3>
      <p className="mb-4 italic">"{challenge}"</p>
      <div className="my-4">{children}</div>
      <p className="text-sm font-semibold text-white/80 mt-4"><span className="font-bold text-yellow-300">Further concepts:</span> {concepts}</p>
    </div>
);

function App() {
  const [phenologyData, setPhenologyData] = useState({
    labels: [],
    datasets: [{ label: 'Temperature (°C)', data: [], color: 'rgb(75, 192, 192)' }, { label: 'Precipitation (mm)', data: [], color: 'rgb(54, 162, 235)' }]
  });
  const [newDataPoint, setNewDataPoint] = useState({ week: '', temp: '', rain: '' });

  const handleAddData = (e) => {
    e.preventDefault();
    if (!newDataPoint.week || !newDataPoint.temp || !newDataPoint.rain) return;
    const newLabels = [...phenologyData.labels, `Week ${newDataPoint.week}`];
    const newTempData = [...phenologyData.datasets[0].data, parseFloat(newDataPoint.temp)];
    const newRainData = [...phenologyData.datasets[1].data, parseFloat(newDataPoint.rain)];
    setPhenologyData({ labels: newLabels, datasets: [{ ...phenologyData.datasets[0], data: newTempData }, { ...phenologyData.datasets[1], data: newRainData }] });
    setNewDataPoint({ week: '', temp: '', rain: '' });
  };

  const sensors = [
    { id: '1', name: 'RGB Camera', icon: <CameraIcon />, img: flower1 },
    { id: '2', name: 'Spectral Sensor', icon: <BeakerIcon />, img: flower2 },
    { id: '3', name: 'Thermal Sensor', icon: <ThermometerIcon />, img: flower3 },
  ];
  const [equippedSensors, setEquippedSensors] = useState(sensors[0]);


  const futureTechs = [
    { icon: <SatelliteIcon className="h-8 w-8 text-cyan-300" />, title: "Smarter Satellites", description: "Next-generation satellites like 'EMIT 2.0' with more sensitive hyperspectral sensors, collecting detailed spectral data and improving resolution." },
    { icon: <CpuChipIcon className="h-8 w-8 text-cyan-300" />, title: "Deep Learning AI", description: "Artificial neural networks that 'learn' from millions of flower images, not only identifying them but also 'predicting' health and disease through complex machine learning models." },
    { icon: <DroneIcon className="h-8 w-8 text-cyan-300" />, title: "Autonomous Drones", description: "Flying on a pre-programmed 'bloom schedule', continuously capturing images and collecting spectral data, using GPS for precise geographic information." },
    { icon: <IotIcon className="h-8 w-8 text-cyan-300" />, title: "IoT Sensor Networks", description: "Micro-sensors attached to flowers or in the soil, 'recording' real-time data on temperature, humidity, and nutrition, forming a massive data network." },
  ];

  const scrollContainerRef = useRef(null);

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
  }, []);

  return (
      <div className={"bg-gray-100 font-sans " + styles["scroll-container"]} ref={scrollContainerRef}>
        <section style={{ backgroundColor: '#1d80c3' }} className="text-white text-center py-20 px-4 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-blue-500 opacity-20" style={{ backgroundImage: `url("https://www.transparenttextures.com/patterns/cubes.png")` }}></div>
          <div className="relative z-10 max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-9xl font-bold tracking-tight mb-8">Chapter 4</h1>
            <p className="mt-4 text-2xl md:text-3xl font-light">Flowers Tell Global Stories and Predict the Future</p>
            <div className="mt-8 bg-black/20 p-4 rounded-lg text-left text-blue-100">
              <h3 className="font-bold text-lg mb-2">Learning objectives:</h3>
              <p>Understand the role of Citizen Science, global perspectives on blooms, climate-change applications (phenology), and future technologies.</p>
            </div>
          </div>
        </section>

        <section style={{ backgroundColor: '#1a3a69' }} className="py-16 px-6 md:px-12 text-white">
          <div className="max-w-4xl mx-auto gap-4 flex items-center">
            <div className="space-y-6 text-lg leading-relaxed">
              <p>Alice and the Professor of Machine Learning entered the "Global Observatory," a circular room with a giant globe in the center, on which sparkling dots displayed bloom locations around the world and real-time data charts were running. A cheerful man, wearing glasses and a straw hat, was guiding people, and a gentle old woman was adjusting a small clock.</p>
              <p>"Hello, Alice!" the man said warmly. "I am the <strong className="text-cyan-300">Future Shaper</strong>. We connect all people and all technologies to 'read' the 'global stories' of flower blooms and 'predict' the Earth's future."</p>
            </div>
            <img src={anh2} alt="Global Observatory" className="w-1/2 h-auto mt-8 rounded-lg shadow-lg object-cover" />
          </div>
        </section>
        <section style={{ backgroundColor: '#1a3a69' }} className="py-16 px-6 md:px-12 text-white">
          <div className="max-w-4xl mx-auto gap-4 flex items-center">
            <div className="space-y-6 text-lg leading-relaxed">
              <p>The Future Shaper pointed to a crowd taking pictures of flowers and sharing them on their phones. "To get a comprehensive view, we need the help of 'everyone' – that is <strong className="text-cyan-300">Citizen Science</strong>! Ordinary people like you use apps like 'GLOBE Observer' or 'iNaturalist' to collect structured data on blooms (photos, GPS location, time, color). This is a fantastic way to gather <strong className="text-cyan-300">Big Data</strong> on the spatial distribution and time series of the bloom phenomenon."</p>
            </div>
            <img src={anh3} alt="Global Observatory" className="w-1/2 h-auto mt-8 rounded-lg shadow-lg object-cover" />
          </div>
        </section>
        <section style={{ backgroundColor: '#1a3a69' }} className=" text-white">
          <div className="max-w-4xl mx-auto gap-4 flex items-center">
            <div className="space-y-6 text-lg leading-relaxed">
              <p>The gentle old woman approached. "Hello, Alice," she said. "I am the <strong className="text-cyan-300">Keeper of Earth's Biological Clock</strong>. These flowers are like the 'Earth's biological clocks.' They 'tell' us about climate change through <strong className="text-cyan-300">phenology</strong> – the 'life schedule of plants'. The bloom data is 'sounding the alarm' in three ways:"</p>
              <ul className="list-disc list-inside space-y-2 pl-4 bg-white/5 p-4 rounded-lg">
                <li><strong className="text-yellow-300">Change in bloom timing:</strong> "Japanese cherry blossom data over 1200 years shows that flowers are blooming up to 10 days earlier than 100 years ago – a clear data trend indicating warming."</li>
                <li><strong className="text-yellow-300">Change in intensity:</strong> "Unusually stronger or weaker superblooms provide quantitative data on the 'health' of the flowers."</li>
                <li><strong className="text-yellow-300">Change in distribution:</strong> "Flowers appearing in unexpected places or disappearing from familiar ones – this is spatial data on the 'migration' of flowers."</li>
              </ul>
            </div>
            <img src={anh1} alt="Warning data" className="w-1/2 h-auto mt-8 rounded-lg shadow-lg object-cover" />
          </div>
        </section>

        <section style={{ backgroundColor: '#1a3a69' }} className="py-18 px-6 md:px-12 text-white">
          {/* --- Phần Công nghệ Tương lai --- */}
          <div className="max-w-4xl mx-auto">
            <p>The Future Shaper continued: "And we are 'designing' the 'dream technologies' to help us observe even better. Just imagine:"</p>
            <div className="grid md:grid-cols-2 gap-6 my-10">
              {futureTechs.map(tech => (
                  <div key={tech.title} className="bg-white/10 p-5 rounded-xl flex gap-4 items-start">
                    <div>{tech.icon}</div>
                    <div>
                      <h4 className="font-bold text-xl mb-1 text-cyan-300">{tech.title}</h4>
                      <p className="text-blue-100 text-base">{tech.description}</p>
                    </div>
                  </div>
              ))}
            </div>
            <p className="text-lg leading-relaxed">"With these technologies, we will be able to 'forecast blooms' as accurately as a 'weather forecast,' using predictive models based on big data analysis and machine learning algorithms."</p>
          </div>
        </section >

        <section style={{ backgroundColor: '#6d28d9' }} className="px-6 md:px-12 text-white">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-1 lg:grid-cols-1 gap-8">
              <PracticeStation title="Data Practice Station: Inventing Future Technology" challenge="The Future Architect gives Alice a virtual 'idea sketchpad.' 'Alice, if you had a 'drone machine' to study flowers, what 'sensors' would you equip it with (e.g., RGB camera, spectral sensor, thermal sensor) to collect multispectral and environmental data? Let's 'draft a concept' and 'explain how it would work.'" concepts="Multispectral Data, Sensors, Automated Systems.">
                <p>Images are for reference from AI content only, not actual data</p>
                <div className="grid md:grid-cols-2 gap-6 items-center">
                  <div>
                    <h4 className="font-bold mb-3">Select a sensor to equip:</h4>
                    <div className="flex flex-col gap-3">
                      {sensors.map(sensor => (<button key={sensor.id} onClick={() => setEquippedSensors(sensor)} className={`flex items-center gap-2 p-2 rounded-lg transition-all ${equippedSensors.id == sensor.id ? 'bg-green-400 text-black' : 'bg-white/20 hover:bg-white/30'}`}>{sensor.icon}{sensor.name}</button>))}
                    </div>
                  </div>
                  <div className="text-center">
                    <h4 className="font-bold mb-2">Flower Research Drone</h4>
                    <div className="relative w-64 h-64 bg-gray-300 rounded-full mx-auto flex items-center justify-center">
                      <img
                          src={equippedSensors.img}
                          alt="Drone" className=" object-cover rounded-full" />

                    </div>
                    <div className="mt-4"><h5 className="font-semibold">Equipped Sensor:</h5><div className="flex justify-center flex-wrap gap-2 mt-2"><span key={equippedSensors.id} className="flex items-center gap-1 bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded-full">{equippedSensors.icon} {equippedSensors.name}</span>{!equippedSensors && <p className="text-sm italic">No sensor equipped</p>}</div></div>
                  </div>
                </div>
              </PracticeStation>
            </div>
          </div>
        </section>

        <section style={{ backgroundColor: '#f97316' }} className="py-14 px-6 md:px-12 text-white">
          <div className="max-w-4xl mx-auto text-center flex-1">
            <h2 className="text-3xl font-bold mb-6">Key Takeaways</h2>
            <p className="text-xl leading-relaxed mb-6 bg-black/10 p-4 rounded-lg">
              Global-scale bloom data, collected through Citizen Science and advanced technologies (satellites, AI, IoT), is the key to understanding phenology and the impacts of climate change. Predictive models will become more accurate with the development of Machine Learning and Big Data.
            </p>
            <p className="text-lg italic mb-8">End of Chapter 4: Alice now had a comprehensive view of flower blooms and the future of the Earth. The Future Shaper nodded.</p>
            <blockquote className="font-bold text-2xl border-l-4 border-yellow-300 pl-4">"Excellent, Alice! You've seen how the 'data warns' us. Now, let's turn this 'knowledge' into 'action'!"</blockquote>
          </div>
          <footer className="w-full max-w-5xl mx-auto mt-0 pt-8 border-t border-white/20">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <p className="text-sm text-white/70">
              </p>
              <div className="flex items-center gap-6">
                <Link to="/chuong3" className="font-medium hover:text-yellow-300 transition-colors">
                  ← Back to Chapter 3
                </Link>
                <Link to="/chuong5" className="bg-yellow-300 text-orange-900 font-bold py-2 px-5 rounded-full hover:bg-white hover:text-orange-900 transition-colors shadow-lg">
                  Go to Chapter 5 →
                </Link>
              </div>
            </div>
          </footer>
        </section>
      </div >
  );
}

export default App;