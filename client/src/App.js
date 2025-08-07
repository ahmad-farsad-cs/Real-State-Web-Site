import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PropertyList from './pages/PropertyList';
import PropertyDetail from './pages/PropertyDetails';
import AddProperty from './pages/AddProperty';
import Navbar from './components/Navbar';     // ✅ Import Navbar
import Footer from './components/Footer';     // ✅ Import Footer

function App() {
  return (
    <Router>
      <Navbar /> {/* Top layout element */}
      <Routes>
        <Route path="/" element={<PropertyList />} />
        <Route path="/properties/:id" element={<PropertyDetails />} />
        <Route path="/add-property" element={<AddProperty />} />
      </Routes>
      <Footer /> {/* ✅ Bottom layout element */}
    </Router>
  );
}

export default App;

