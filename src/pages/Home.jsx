import { useNavigate } from "react-router-dom";
import { ArrowRightOutlined } from "@ant-design/icons";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "calc(100vh - 80px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 20px",
        background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)",
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          textAlign: "center",
          animation: "fadeInUp 0.8s ease-out",
        }}
      >
        {/* Título Principal */}
        <h1
          style={{
            fontSize: "64px",
            fontWeight: "900",
            marginBottom: "20px",
            background: "linear-gradient(135deg, #60a5fa, #a78bfa)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            lineHeight: "1.2",
            letterSpacing: "-2px",
          }}
        >
          TaskFlow
        </h1>

        {/* Subtítulo */}
        <p
          style={{
            fontSize: "24px",
            color: "#cbd5e1",
            marginBottom: "15px",
            fontWeight: "500",
          }}
        >
          Gestión inteligente de tareas
        </p>

        {/* Descripción */}
        <p
          style={{
            fontSize: "16px",
            color: "#94a3b8",
            marginBottom: "50px",
            lineHeight: "1.8",
            maxWidth: "600px",
            margin: "0 auto 50px",
          }}
        >
          Organiza tus actividades, prioriza lo importante y alcanza tus objetivos con una plataforma moderna y eficiente diseñada para potenciar tu productividad.
        </p>

        {/* Botones de Acción */}
        <div
          style={{
            display: "flex",
            gap: "20px",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <button
            onClick={() => navigate("/actividades")}
            style={{
              padding: "16px 40px",
              fontSize: "16px",
              fontWeight: "600",
              border: "none",
              borderRadius: "12px",
              cursor: "pointer",
              background: "linear-gradient(135deg, #60a5fa, #3b82f6)",
              color: "#fff",
              transition: "all 0.3s ease",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              boxShadow: "0 8px 20px rgba(59, 130, 246, 0.3)",
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "translateY(-2px)";
              e.target.style.boxShadow = "0 12px 30px rgba(59, 130, 246, 0.5)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "0 8px 20px rgba(59, 130, 246, 0.3)";
            }}
          >
            📋 Mis Tareas
            <ArrowRightOutlined />
          </button>

          <button
            onClick={() => navigate("/estadisticas")}
            style={{
              padding: "16px 40px",
              fontSize: "16px",
              fontWeight: "600",
              border: "2px solid #a78bfa",
              borderRadius: "12px",
              cursor: "pointer",
              background: "transparent",
              color: "#a78bfa",
              transition: "all 0.3s ease",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
            onMouseEnter={(e) => {
              e.target.style.background = "rgba(167, 139, 250, 0.1)";
              e.target.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "transparent";
              e.target.style.transform = "translateY(0)";
            }}
          >
            📊 Estadísticas
            <ArrowRightOutlined />
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
