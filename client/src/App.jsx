import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UpdateConfigData from './components/UpdateConfigData';
import GetConfigData from './components/GetConfigData';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/update-config" element={<UpdateConfigData />} />
          <Route path="/get-config" element={<GetConfigData />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
