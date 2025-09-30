import { Routes, Route } from 'react-router-dom'
import Chuong1 from './page/Chuong1/Chuong1.jsx';
import Chuong2 from './page/Chuong2/Chuong2.jsx';
import Chuong3 from './page/Chuong3/Chuong3.jsx';
import Chuong4 from './page/Chuong4/Chuong4.jsx';
import Chuong5 from './page/Chuong5/Chuong5.jsx';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Chuong1 />} />
      <Route path="/chuong1" element={<Chuong1 />} />
      <Route path="/chuong2" element={<Chuong2 />} />
      <Route path="/chuong3" element={<Chuong3 />} />
      <Route path="/chuong4" element={<Chuong4 />} />
      <Route path="/chuong5" element={<Chuong5 />} />
    </Routes>
  )
}

export default App
