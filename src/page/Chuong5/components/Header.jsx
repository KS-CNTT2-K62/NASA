// src/components/Header.jsx
import React from 'react';

function Header() {
  return (
    <header className="text-center p-6 bg-green-700 text-white shadow-md pt-20">
      <h1 className='text-6xl mb-2 font-bold'>
        Chapter 5
      </h1>
      <h1 className="text-4xl font-bold">Turning Data into Green Action and Inspiration</h1>
      <p className="text-xl mt-2 italic">"The Flower Data Scientist Within You"</p>
    </header>
  );
}

export default Header;