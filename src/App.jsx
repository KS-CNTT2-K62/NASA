import { Routes, Route, Link } from 'react-router-dom'
import Chuong1 from './page/Chuong1/Chuong1.jsx';
import Chuong2 from './page/Chuong2/Chuong2.jsx';
import Chuong3 from './page/Chuong3/Chuong3.jsx';
import Chuong4 from './page/Chuong4/Chuong4.jsx';
import Chuong5 from './page/Chuong5/Chuong5.jsx';

function App() {
  return (
    <>
      <div className='fixed top-0 w-full z-5000 bg-white/80 backdrop-blur-sm'>
        <nav className="text-sky-600 p-4">
          <div className="container mx-auto flex justify-between items-center">
            <div className="text-2xl font-bold">A Global Learning Hub for Planetary Observation</div>
            <div className="space-x-4 font-bold text-lg">
              <Link to="/chuong1" className="text-slate-600 hover:text-sky-600 transition-colors">Chapter 1</Link>
              <Link to="/chuong2" className="text-slate-600 hover:text-sky-600 transition-colors">Chapter 2</Link>
              <Link to="/chuong3" className="text-slate-600 hover:text-sky-600 transition-colors">Chapter 3</Link>
              <Link to="/chuong4" className="text-slate-600 hover:text-sky-600 transition-colors">Chapter 4</Link>
              <Link to="/chuong5" className="text-slate-600 hover:text-sky-600 transition-colors">Chapter 5</Link>
            </div>
          </div>
        </nav>
      </div>
      <Routes>
        <Route path="/" element={<Chuong1 />} />
        <Route path="/chuong1" element={<Chuong1 />} />
        <Route path="/chuong2" element={<Chuong2 />} />
        <Route path="/chuong3" element={<Chuong3 />} />
        <Route path="/chuong4" element={<Chuong4 />} />
        <Route path="/chuong5" element={<Chuong5 />} />
      </Routes>
    </>
  )
}

export default App
