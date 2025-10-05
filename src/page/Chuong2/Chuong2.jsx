// src/pages/Chuong2/Chuong2.jsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PracticeStation from './components/PracticeStation';
import Modal from './components/Modal';

// Import ảnh từ thư mục assets
import aliceImage from '../../assets/chuong2/images/Alice – Nhà Giải Mã Dữ Liệu.png';
import detectiveImage from '../../assets/chuong2/images/thám tử phổ quang.png';
import gardenImage from '../../assets/chuong2/images/3,5.png';
import groundImage from '../../assets/chuong2/images/bac-si-hoa.png';
import airImage from '../../assets/chuong2/images/tho-san-may.png';
import spaceImage from '../../assets/chuong2/images/nguoi-gac-dem.png';
import viewImage from '../../assets/chuong2/images/4.png';
import smaImage from '../../assets/chuong2/images/5.png';

// Style cho phông chữ và các hiệu ứng nhỏ
const customStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@700&family=Roboto:wght@400&display=swap');
  
  .font-serif { 
    font-family: 'Cormorant Garamond', serif; 
  }
  .font-sans { 
    font-family: 'Roboto', sans-serif; 
  }
  .platform-door, .interactive-image {
    cursor: pointer;
    border: 4px solid transparent;
    transition: all 0.3s ease;
  }
  .platform-door:hover, .interactive-image:hover {
    transform: scale(1.05);
    box-shadow: 0 10px 20px rgba(0,0,0,0.1);
  }
`;

const Chuong2 = () => {
    const [activeModal, setActiveModal] = useState(null);

    return (
        <>
            <style>{customStyles}</style>
            <div className="bg-slate-100 font-sans">
                {/* <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-sm shadow-md">
          <div className="container mx-auto flex items-center justify-between p-4">
            <Link to="/" aria-current="page" className="font-serif text-2xl font-bold text-sky-600">BloomWatch</Link>
            <nav className="hidden items-center space-x-6 md:flex">
              <a href="#StoryStart" className="text-slate-600 hover:text-sky-600">The Story</a>
              <a href="#Platforms" className="text-slate-600 hover:text-sky-600">The Observing Eyes</a>
              <a href="#Analysis" className="text-slate-600 hover:text-sky-600">Decoding</a>
              <a href="#Practice" className="text-slate-600 hover:text-sky-600">Practice</a>
            </nav>
            <a href="#TOC" className="rounded-md bg-sky-600 px-4 py-2 font-bold text-white hover:bg-sky-700 transition-colors">Contents</a>
          </div>
        </header> */}

                <main>
                    <section className="text-white text-center py-20 px-4 relative overflow-hidden bg-gradient-to-br from-sky-400 to-cyan-400">
                        <div className="absolute top-0 left-0 w-full h-full bg-black/10"></div>
                        <div className="relative z-10 max-w-4xl mx-auto">
                            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-4 drop-shadow-lg">
                                Chapter 2
                            </h1>
                            <p className="mt-4 text-2xl md:text-3xl font-light">Nature’s Data Eyes</p>
                        </div>
                    </section>

                    <section id="StoryStart" className="py-20 bg-white">
                        <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center gap-12">
                            <div className="lg:w-1/2 space-y-8">
                                <h2 className="text-4xl font-serif font-bold text-cyan-700">An Encounter in the Spectral Garden</h2>
                                <div className="flex items-center gap-4">
                                    <img src={aliceImage} alt="Alice" className="w-28 h-28 rounded-full border-4 border-cyan-200 flex-shrink-0"/>
                                    <p className="text-lg leading-relaxed text-slate-700">As Alice stepped through the doorway, she found herself in a strange room with mirrored walls reflecting bands of colorful light.</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <img src={detectiveImage} alt="Thám Tử Phổ Quang" className="w-28 h-28 rounded-full border-4 border-sky-200 flex-shrink-0"/>
                                    <p className="text-lg italic text-slate-600">"Hello Alice, I am the <strong>Spectral Detective</strong>. Welcome to the Spectral Garden!"</p>
                                </div>
                            </div>
                            <div className="lg:w-1/2">
                                <img
                                    src={gardenImage}
                                    alt="Garden of Spectrums"
                                    className="rounded-xl shadow-2xl interactive-image w-full lg:w-4/5 mx-auto"
                                    onClick={() => setActiveModal('garden')}
                                />
                                <p className="text-center text-sm italic text-slate-500 mt-2">(Click the image to hear the Detective's explanation)</p>
                            </div>
                        </div>
                    </section>

                    <section id="Platforms" className="py-20 bg-sky-50">
                        <div className="container mx-auto px-6">
                            <div className="text-center mb-16">
                                <h2 className="text-4xl font-serif font-bold text-slate-800">The Gallery of Observing Eyes</h2>
                                <p className="mt-4 text-lg text-slate-600 max-w-3xl mx-auto">The Spectral Detective led Alice here. "To 'read' the stories told by the light from flowers, we need many different remote sensing observation platforms," she explained.</p>
                            </div>
                            <div  className='flex gap-20'>
                                <div className="flex flex-col gap-10 flex-1 w-0">
                                    <div className="platform-door bg-white rounded-lg p-6 text-center shadow-lg">
                                        Uses the ASD FieldSpec-4 handheld spectrometer to 'diagnose' each flower, collecting extremely detailed data.
                                        Spatial resolution: Very high (just a few centimeters).
                                        Spatial coverage: Small (only a small area).
                                    </div>
                                    <div className="platform-door bg-white rounded-lg p-6 text-center shadow-lg">
                                        Uses the AVIRIS-NG instrument mounted on an aircraft flying at an altitude of 20km, like taking an 'X-ray' of an entire field.
                                        Spatial resolution: Medium (about 1-5 meters).
                                        Spectral resolution: High (many color bands).
                                        Spatial coverage: Large (an entire wide region).
                                    </div>
                                    <div className="platform-door bg-white rounded-lg p-6 text-center shadow-lg">
                                        Uses the EMIT satellite on the International Space Station (ISS) at an altitude of 400km to 'observe' an entire continent.
                                        Spatial resolution: Low (each pixel is equivalent to 60 meters).
                                        Spatial coverage: Extremely large (global observation).
                                    </div>
                                </div>
                                <div className='flex-1 w-0'>
                                    <img
                                        src={viewImage}
                                        alt="Garden of Spectrums"
                                        className="rounded-xl shadow-2xl interactive-image"
                                    />
                                </div>
                            </div>
                        </div>
                    </section>

                    <section id="Analysis" className="py-20 bg-white">
                        <div className="container mx-auto px-6">
                            <div className="text-center mb-16">
                                <h2 className="text-4xl font-serif font-bold text-slate-800">The Mixed Gallery & The Secret Corridor</h2>
                            </div>
                            <div className="flex flex-col lg:flex-row items-center gap-12">
                                <div className="lg:w-5/12">
                                    <img src={smaImage} alt="Spectral Mixture Analysis Visualization" className="rounded-xl shadow-2xl"/>
                                </div>
                                <div className="lg:w-7/12 space-y-6 text-slate-700 text-lg">
                                    <p className="leading-relaxed italic">"The more data, the more complete the story," said the Spectral Detective. "But there is one major 'problem' with remote sensing images – the <strong className="text-red-600">'mixed pixel'</strong>!"</p>
                                    <div>
                                        <h3 className="text-2xl font-bold text-red-700 mb-2 font-serif">Spectral Mixture Analysis (SMA)</h3>
                                        <p>A single 'pixel' in a satellite image can be a 'mixed painting' of 20% yellow flowers, 30% green leaves, 40% brown soil, and 10% shadow. SMA is like 'Nature's Photoshop,' helping us 'unmix each layer' of the pixel to know the exact percentage of each component.</p>
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-indigo-700 mb-2 font-serif">The Hidden Traces (MRR)</h3>
                                        <p>"And sometimes, the secret lies in 'what is left over' – that's the <strong>Mixture Residual Reflectance (MRR)</strong>," she said, leading Alice to the "Secret Corridor." The MRR holds the 'secrets' of tiny components, helping to distinguish between two very similar-looking yellow flower species based on their subtle spectral features.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section id="Practice" className="bg-slate-200 py-20 px-6 md:px-12">
                        <div className="max-w-6xl mx-auto">
                            <h2 className="text-4xl font-bold text-center mb-12 text-slate-800 font-serif">Data Practice Station</h2>
                            <PracticeStation />
                        </div>
                    </section>

                    <section className="py-16 px-6 md:px-12 text-white bg-gradient-to-br from-amber-400 to-orange-500">
                        <div className="max-w-4xl mx-auto text-center">
                            <h2 className="text-3xl font-bold mb-6 drop-shadow font-serif">Key Takeaways</h2>
                            <p className="text-xl leading-relaxed mb-6 bg-black/10 p-4 rounded-lg backdrop-blur-sm">
                                🎓 Light is not just for seeing, but also for 'reading'. Remote sensing technologies and image analysis techniques are powerful tools that help us decode the hidden messages in every pixel, thereby uncovering the secrets of the natural world.
                            </p>
                        </div>
                    </section>

                    <section id="TOC" className="py-16 bg-slate-800 text-white">
                        <div className="container mx-auto px-6 text-center">
                            <p className="text-2xl font-serif italic text-amber-300">"Excellent, Alice! Are you ready to 'teach' a computer how to see flowers?"</p>
                            <p className="mt-2 text-slate-400">Next chapter: The World of Artificial Intelligence!</p>
                            <div className="flex justify-center gap-6 mt-12">
                                <Link to="/Chuong1" className="bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 px-6 rounded-lg transition-colors">&larr; Back to Chapter 1</Link>
                                <Link to="/Chuong3" className="bg-sky-500 hover:bg-sky-400 text-slate-900 font-bold py-3 px-6 rounded-lg transition-colors">Go to Chapter 3 &rarr;</Link>
                            </div>
                        </div>
                    </section>
                </main>


                <Modal isOpen={activeModal === 'garden'} onClose={() => setActiveModal(null)} title="The Story of Light" characterName="The Detective's Explanation" imageSrc={detectiveImage}>
                    <div className="space-y-4">
                        <p>My job is to 'listen' to the stories that light tells when it touches things. When sunlight hits a flower, some of the light is 'eaten' by the flower (called <strong className="text-purple-600">absorption</strong>), and another part is 'bounced off' (called <strong className="text-blue-600">reflection</strong>).</p>
                        <p>It's this <strong className="text-blue-600">reflection of light</strong> that creates the color you see! Every flower species has its own unique 'light fingerprint', also known as a <strong className="font-bold text-red-600">Spectral Signature</strong>.</p>
                        <p>By analyzing the bands of light that the flower 'bounces off' (called the <strong className="text-green-600">reflectance spectrum</strong>), we can identify what species it is and how healthy it is.</p>
                    </div>
                </Modal>
                <Modal isOpen={activeModal === 'ground'} onClose={() => setActiveModal(null)} title="The First Eye" characterName="The Flower Doctor" imageSrc={groundImage}>
                    <p>Using the <strong className="text-green-600">ASD FieldSpec-4</strong> handheld spectrometer to 'diagnose' each flower, collecting extremely detailed data.</p>
                    <ul className="list-disc list-inside mt-4 space-y-2">
                        <li><strong>Spatial Resolution:</strong> <span className="font-bold text-green-700">Very High</span> (just a few centimeters).</li>
                        <li><strong>Spatial Coverage:</strong> <span className="font-bold text-red-700">Small</span> (only a small area).</li>
                    </ul>
                </Modal>
                <Modal isOpen={activeModal === 'air'} onClose={() => setActiveModal(null)} title="The Second Eye" characterName="The Spectral Cloud Hunter" imageSrc={airImage}>
                    <p>Using the <strong className="text-sky-600">AVIRIS-NG</strong> instrument mounted on an aircraft flying at 20km, like taking an 'X-ray' of an entire field.</p>
                    <ul className="list-disc list-inside mt-4 space-y-2">
                        <li><strong>Spatial Resolution:</strong> <span className="font-bold text-yellow-600">Medium</span> (about 1-5 meters).</li>
                        <li><strong>Spectral Resolution:</strong> <span className="font-bold text-green-700">High</span> (many color bands).</li>
                        <li><strong>Spatial Coverage:</strong> <span className="font-bold text-green-700">Large</span> (an entire wide region).</li>
                    </ul>
                </Modal>
                <Modal isOpen={activeModal === 'space'} onClose={() => setActiveModal(null)} title="The Third Eye" characterName="The Cosmic Night Watcher" imageSrc={spaceImage}>
                    <p>Using the <strong className="text-indigo-600">EMIT</strong> satellite on the International Space Station (ISS) at an altitude of 400km to 'observe' an entire continent.</p>
                    <ul className="list-disc list-inside mt-4 space-y-2">
                        <li><strong>Spatial Resolution:</strong> <span className="font-bold text-red-700">Low</span> (each pixel is equivalent to 60 meters).</li>
                        <li><strong>Spatial Coverage:</strong> <span className="font-bold text-green-700">Extremely Large</span> (global observation).</li>
                    </ul>
                </Modal>
            </div>
        </>
    );
};

export default Chuong2;