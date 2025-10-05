// src/components/DataStorytellingStation.jsx
import React, { useState } from 'react';
import chartImage from '../../../assets/chuong5/bieuDoThongDiep.png'; // Đảm bảo đường dẫn này đúng

function DataStorytellingStation() {
    const [step, setStep] = useState(1);
    const [userCallToAction, setUserCallToAction] = useState('');

    const totalSteps = 3;

    const renderStepContent = () => {
        switch (step) {
            case 1:
                return (
                    <div>
                        <h3 className="text-2xl font-bold text-blue-700 mb-3">Act 1: An Interesting Discovery 🔎</h3>
                        <p className="text-gray-600 mb-4">
                            Let's start by presenting what we see most clearly. An undeniable fact builds trust.
                        </p>
                        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
                            <p className="font-semibold italic">"The chart shows that the number of flower bloom observations (blue bars) began to increase sharply, peaking in late June - early July 2021. Notably, this peak coincides perfectly with the period when the average temperature (orange line) was at its highest."</p>
                        </div>
                    </div>
                );
            case 2:
                return (
                    <div>
                        <h3 className="text-2xl font-bold text-red-700 mb-3">Act 2: The Incomplete Story ⌛</h3>
                        <p className="text-gray-600 mb-4">
                            After capturing their attention, point out the problem. A good story always needs conflict. Here, the conflict is the lack of data.
                        </p>
                        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
                            <p className="font-semibold italic">"We see a clear correlation between temperature and blooms in 2021, but is this a long-term trend due to climate change? We can't be sure, because the data from previous years is missing. Our story is missing its most crucial chapters."</p>
                        </div>
                    </div>
                );
            case 3:
                return (
                    <div>
                        <h3 className="text-2xl font-bold text-green-700 mb-3">Act 3: You Are the Hero! ✨</h3>
                        <p className="text-gray-600 mb-4">
                            This is the most important part: empower the audience. Turn them from viewers into participants.
                        </p>
                        <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg mb-6">
                            <p className="font-semibold italic">"This is precisely why your participation in citizen science projects is so important. Every observation you contribute today will help scientists 10 years from now have enough data to complete this story and protect our nature."</p>
                        </div>
                        <div>
                            <label htmlFor="cta" className="block text-lg font-semibold text-gray-700 mb-2">Practice: Try writing your own call to action!</label>
                            <textarea
                                id="cta"
                                rows="4"
                                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500"
                                placeholder="Example: 'Every photo you take of a flower is not just a memory, but also a valuable data point...'"
                                value={userCallToAction}
                                onChange={(e) => setUserCallToAction(e.target.value)}
                            />
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="max-w-5xl mx-auto bg-white p-6 md:p-8 rounded-xl shadow-lg border border-gray-200 mt-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center border-b-2 pb-2">
                Practice Station: Data Storytelling
            </h2>
            <div className="flex flex-col md:flex-row gap-8">
                {/* Cột hiển thị biểu đồ */}
                <div className="md:w-1/2 flex-shrink-0">
                    <img src={chartImage} alt="Chart of flower blooms and temperature" className="rounded-lg shadow-lg w-full" />
                    {step === 2 && (
                        <div className="mt-4 p-3 bg-yellow-100 text-yellow-800 rounded-lg text-center font-semibold">
                            Note: Data from previous years is missing!
                        </div>
                    )}
                </div>
                {/* Cột hiển thị câu chuyện */}
                <div className="md:w-1/2 flex flex-col justify-between">
                    <div>{renderStepContent()}</div>
                    <div className="flex justify-between items-center mt-6">
                        <button
                            onClick={() => setStep(s => Math.max(s - 1, 1))}
                            disabled={step === 1}
                            className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg shadow disabled:opacity-50 hover:bg-gray-400 transition"
                        >
                            Back
                        </button>
                        <span className="text-gray-500 font-semibold">Step {step}/{totalSteps}</span>
                        <button
                            onClick={() => setStep(s => Math.min(s + 1, totalSteps))}
                            disabled={step === totalSteps}
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow disabled:opacity-50 hover:bg-blue-700 transition"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DataStorytellingStation;