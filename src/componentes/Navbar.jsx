import { Link } from "react-router-dom";
import { HomeOutlined, CheckCircleOutlined, BarChartOutlined } from "@ant-design/icons";

function Navbar() {
  return (
    <nav
      style={{
        background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid rgba(148, 163, 184, 0.1)",
        padding: "0 40px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: "80px",
        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.3)",
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      {/* Logo */}
      <div
        style={{
          fontSize: "28px",
          fontWeight: "800",
          background: "linear-gradient(135deg, #60a5fa, #a78bfa)",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          letterSpacing: "-1px",
        }}
      >
        TaskFlow
      </div>

      {/* Menu Items */}
      <div style={{ display: "flex", gap: "50px", alignItems: "center" }}>
        <Link
          to="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            color: "#cbd5e1",
            textDecoration: "none",
            fontSize: "16px",
            fontWeight: "500",
            transition: "all 0.3s ease",
            padding: "8px 16px",
            borderRadius: "8px",
          }}
          onMouseEnter={(e) => {
            e.target.style.color = "#60a5fa";
            e.target.style.background = "rgba(96, 165, 250, 0.1)";
          }}
          onMouseLeave={(e) => {
            e.target.style.color = "#cbd5e1";
            e.target.style.background = "transparent";
          }}
        >
          <HomeOutlined style={{ fontSize: "18px" }} />
          Inicio
        </Link>

        <Link
          to="/actividades"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            color: "#cbd5e1",
            textDecoration: "none",
            fontSize: "16px",
            fontWeight: "500",
            transition: "all 0.3s ease",
            padding: "8px 16px",
            borderRadius: "8px",
          }}
          onMouseEnter={(e) => {
            e.target.style.color = "#a78bfa";
            e.target.style.background = "rgba(167, 139, 250, 0.1)";
          }}
          onMouseLeave={(e) => {
            e.target.style.color = "#cbd5e1";
            e.target.style.background = "transparent";
          }}
        >
          <CheckCircleOutlined style={{ fontSize: "18px" }} />
          Actividades
        </Link>

        <Link
          to="/estadisticas"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            color: "#cbd5e1",
            textDecoration: "none",
            fontSize: "16px",
            fontWeight: "500",
            transition: "all 0.3s ease",
            padding: "8px 16px",
            borderRadius: "8px",
          }}
          onMouseEnter={(e) => {
            e.target.style.color = "#f472b6";
            e.target.style.background = "rgba(244, 114, 182, 0.1)";
          }}
          onMouseLeave={(e) => {
            e.target.style.color = "#cbd5e1";
            e.target.style.background = "transparent";
          }}
        >
          <BarChartOutlined style={{ fontSize: "18px" }} />
          Estadísticas
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;

