import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./componentes/Navbar.jsx";
import Home from "./pages/Home.jsx";
import Actividades from "./pages/Actividades.jsx";
import Estadisticas from "./pages/Estadisticas.jsx";
import "./App.css";

function App() {
  return (
    <Router>
      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <Navbar />
        <div className="content-wrapper">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/actividades" element={<Actividades />} />
            <Route path="/estadisticas" element={<Estadisticas />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
