import { Button } from "antd";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "60px",
        minHeight: "100vh",
        background: "linear-gradient(135deg, #89f7fe, #66a6ff)",
        padding: "40px",
        color: "#fff",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      <div
        style={{
          background: "rgba(255,255,255,0.15)",
          padding: "50px",
          borderRadius: "30px",
          maxWidth: "700px",
          margin: "auto",
          backdropFilter: "blur(10px)",
          boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
        }}
      >
        <h1
          style={{
            fontSize: "55px",
            marginBottom: "10px",
            color: "#ffffff",
          }}
        >
          Actividades PepaPig 🚀
        </h1>

        <p
          style={{
            fontSize: "20px",
            marginBottom: "10px",
            color: "#f1f5f9",
          }}
        >
          “Conecta tus ideas con tus acciones. Gestión de tareas fluida, rápida y visual.”
        </p>

        <p
          style={{
            fontSize: "18px",
            color: "#ffe082",
            fontWeight: "bold",
          }}
        >
          ¡Comienza Ya! ✨
        </p>

        <div
          style={{
            display: "flex",
            gap: "20px",
            justifyContent: "center",
            marginTop: "40px",
            flexWrap: "wrap",
          }}
        >
          <Button
            type="primary"
            size="large"
            onClick={() => navigate("/actividades")}
            style={{
              background: "#ff4d6d",
              border: "none",
              height: "50px",
              borderRadius: "15px",
              fontWeight: "bold",
              padding: "0 25px",
              boxShadow: "0 6px 15px rgba(255,77,109,0.4)",
            }}
          >
            📋 Lista de Actividades
          </Button>

          <Button
            size="large"
            onClick={() => navigate("/estadisticas")}
            style={{
              background: "#ffffff",
              color: "#2563eb",
              border: "none",
              height: "50px",
              borderRadius: "15px",
              fontWeight: "bold",
              padding: "0 25px",
              boxShadow: "0 6px 15px rgba(255,255,255,0.3)",
            }}
          >
            📊 Estadísticas
          </Button>
        </div>
      </div>
    </div>
  );
}