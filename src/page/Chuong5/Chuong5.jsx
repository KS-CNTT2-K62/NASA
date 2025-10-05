// src/App.jsx
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import Header from './components/Header';
import BloomMap from './components/BloomMap';
import TourDetail from './components/TourDetail';
import FlowerImageDisplay from './components/FlowerImageDisplay';

// Import hình ảnh minh họa (đảm bảo bạn có các file này trong src/assets)
import actionQueenImg from '../../assets/chuong5/action_queen.jpg';
import dataDashboardImg from '../../assets/chuong5/data_dashboard.png';
import beePollinationImg from '../../assets/chuong5/bee_pollination.png';
import invasivePlantsImg from '../../assets/chuong5/invasive_plants.jpg';
import superbloomTourImg from '../../assets/chuong5/superbloom_tour.jpg';
import whiteQueenImg from '../../assets/chuong5/white_queen.png';
import DataStorytellingStation from './components/DataStorytellingStation';


function App() {
  const [selectedSite, setSelectedSite] = useState(null);

  const handleSiteSelect = (siteProperties) => {
    setSelectedSite(siteProperties);
  };

  const DialogueBubble = ({ speaker, text, image, isAlice = false, color = 'bg-gray-100' }) => (
      <div className={`flex ${isAlice ? 'justify-end' : 'justify-start'} mb-6`}>
        <div className={`p-4 rounded-lg shadow-md max-w-2xl ${color} ${isAlice ? 'text-right' : 'text-left'}`}>
          <p className={`font-bold ${isAlice ? 'text-green-700' : 'text-purple-700'} mb-2`}>{speaker}:</p>
          <p className="text-gray-800 leading-relaxed text-lg">{text}</p>
          {image && <div className="mt-4 flex justify-center">{image}</div>}
        </div>
      </div>
  );


  return (
      <div className="min-h-screen bg-gray-50 font-sans">
        <Header />
        <main className="container mx-auto p-4 md:p-8">

          {/* ==================================================================== */}
          {/* =================== CHAPTER 5 STORY CONTENT =================== */}
          {/* ==================================================================== */}
          <div className="max-w-5xl mx-auto bg-white p-6 md:p-8 rounded-xl shadow-lg border border-gray-200 mb-12">

            <p className="text-center italic text-gray-600 mb-8">
              (Pages 33-40) | Learning objective: Understand real-world applications of flower-bloom data across domains, encourage critical thinking, and inspire environmental action.
            </p>

            <div className="space-y-6">
              <p className="text-lg text-gray-700 leading-relaxed">
                They entered the "Action Exhibition Hall," where large screens displayed real-world projects being implemented thanks to flower bloom data. A strong woman, dressed in a green protective suit and holding a laser pointer, stood before a screen.
              </p>

              {/* Cuộc đối thoại */}
              <DialogueBubble
                  speaker="The Action Queen"
                  text={
                    <>
                      Hello, Alice. I am the <strong className="text-purple-700">Action Queen</strong>. Here, we turn 'data' into 'action' to protect and grow our green world. This is the pinnacle of <em>data analysis</em> – creating <em>real-world impact</em>.
                    </>
                  }
                  image={
                    // Placeholder for the Action Queen's image
                    <img src={actionQueenImg} alt="The Action Queen" className="w-64 h-auto rounded-lg shadow-md" />
                  }
                  color="bg-green-100"
              />

              <DialogueBubble
                  speaker="Alice"
                  text="How can flower bloom data help in real life?"
                  isAlice={true}
                  color="bg-blue-100"
              />

              <DialogueBubble
                  speaker="The Action Queen"
                  text={
                    <>
                      In many ways, Alice! Look at our <strong className="text-purple-700">practical applications</strong>:
                      <br /><br />
                      <p className="font-semibold text-lg text-green-800">🌱 Smart Agriculture:</p>
                      "Data on 'pollen season' and 'bloom timing' helps farmers <em className="text-green-600">optimize</em> 'beekeeping schedules,' ensuring a bountiful harvest. If <em className="text-red-600">anomalous bloom data</em> (outliers) indicates signs of pests or diseases, it helps us 'detect and respond' promptly, minimizing crop damage."
                    </>
                  }
                  image={
                    // Placeholder for Bee pollination image
                    <img src={beePollinationImg} alt="Bee pollination" className="w-64 h-auto rounded-lg shadow-md" />
                  }
                  color="bg-green-100"
              />

              <DialogueBubble
                  speaker="The Action Queen"
                  text={
                    <>
                      <p className="font-semibold text-lg text-green-800">🌳 Nature Conservation:</p>
                      "By 'monitoring bloom data' through <strong className="text-blue-700">Geographic Information Systems (GIS)</strong>, we can 'early detect' invasive plant species that threaten native flowers. The data also helps us 'assess the health' of ecosystems and 'plan' for the protection of areas with high biological value. This is <em className="text-blue-600">data-driven resource management</em>."
                    </>
                  }
                  image={
                    // Placeholder for GIS System / Invasive plants image
                    <img src={invasivePlantsImg} alt="Invasive plants" className="w-64 h-auto rounded-lg shadow-md" />
                  }
                  color="bg-green-100"
              />

              <DialogueBubble
                  speaker="The Action Queen"
                  text={
                    <>
                      <p className="font-semibold text-lg text-green-800">🗺️ Tourism and Education:</p>
                      "Data that predicts the 'best time to visit a superbloom' helps the tourism industry <em className="text-orange-600">manage crowds</em>, <em className="text-orange-600">optimize routes</em>, and <em className="text-orange-600">develop sustainable tourism</em>. Mobile apps provide 'data-driven information' about flower species, 'educating the community' about the importance of nature and enhancing <em className="text-orange-600">data literacy</em>."
                    </>
                  }
                  image={
                    // Placeholder for Superbloom Tourism image
                    <img src={superbloomTourImg} alt="Superbloom Tourism" className="w-64 h-auto rounded-lg shadow-md" />
                  }
                  color="bg-green-100"
              />

              <DialogueBubble
                  speaker="The Action Queen"
                  text={
                    <>
                      Do you see? <strong className="text-purple-700">Data isn't just numbers; it's the 'echo of opportunity'</strong> for us to understand, act, and 'create positive change,' 'protecting the beauty' of the Earth for future generations. This requires <em className="text-red-600">critical thinking</em> to always question the source and reliability of the data.
                    </>
                  }
                  color="bg-green-100"
              />

              <DialogueBubble
                  speaker="Alice"
                  text="I feel energized and determined. I understand that my journey with data doesn't just stop at learning, but also involves applying that knowledge to create real value."
                  isAlice={true}
                  color="bg-blue-100"
              />

              <p className="text-lg text-gray-700 leading-relaxed mt-10">
                The White Queen slowly appeared, her silver hair shimmering like strands of data. "Welcome back, Alice. You have completed your wonderful journey. You now understand that the 'beauty of flowers' has more layers than you thought. From color to pigment, from pixel to index, from local to global, and from the past to the future."
              </p>

              <DialogueBubble
                  speaker="The White Queen"
                  text={
                    <>
                      Alice, you have become a true <strong className="text-purple-700">'Flower Data Scientist'</strong>, someone capable of 'deciphering' the mysteries of nature with the power of data. Now, it is your turn to <em className="text-orange-600">'spread this beauty of data'</em>. Make your <strong className="text-red-600">'call to action'</strong>!
                    </>
                  }
                  image={
                    // Placeholder for the White Queen's image
                    <img src={whiteQueenImg} alt="The White Queen" className="w-64 h-auto rounded-lg shadow-md" />
                  }
                  color="bg-purple-100"
              />

            </div>
          </div>

          {/* ==================================================================== */}
          {/* ======================= DATA PRACTICE STATION ====================== */}
          {/* ==================================================================== */}
          <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-200 mt-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">Eco-bloom Tourism Map</h2>
            <BloomMap
                onSiteSelect={handleSiteSelect}
                selectedSiteName={selectedSite ? selectedSite.Site : null}
            />
          </div>

          {/* Tour detail display component */}
          {/* <TourDetail selectedSite={selectedSite} /> */}
          {/* New layout for TourDetail and FlowerImageDisplay */}
          <div className="flex flex-col md:flex-row gap-8 mt-8">
            {/* Tour detail display component - takes up 2/3 of the width */}
            <div className="md:w-2/3">
              <TourDetail selectedSite={selectedSite} />
            </div>

            {/* Flower image display component - takes up 1/3 of the width and has a 1:1 aspect ratio (square) */}
            <div className="md:w-1/3">
              <div className="relative pt-[100%]"> {/* Creates a 1:1 aspect ratio for the parent div */}
                <div className="absolute top-0 left-0 w-full h-full"> {/* Places the child component into the aspect ratio div */}
                  <FlowerImageDisplay selectedSite={selectedSite} />
                </div>
              </div>
            </div>
          </div>
          <DataStorytellingStation />
        </main>
      </div>
  );
}

export default App;