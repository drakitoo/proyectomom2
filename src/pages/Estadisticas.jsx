import { useEffect, useState } from "react";
import { Card, Statistic, Row, Col, Progress, Empty, Spin, message } from "antd";
import { CheckCircleOutlined, ClockCircleOutlined, BarsOutlined } from "@ant-design/icons";
import axios from "axios";

export default function Estadisticas() {
  const [tareas, setTareas] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    cargarTareas();
  }, []);

  const cargarTareas = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:3000/actividades");
      setTareas(res.data);
    } catch (err) {
      message.error("Error al cargar estadísticas");
    }
    setLoading(false);
  };

  const completadas = tareas.filter((t) => t.completado).length;
  const pendientes = tareas.filter((t) => !t.completado).length;
  const porcentaje = tareas.length === 0 ? 0 : Math.round((completadas / tareas.length) * 100);

  const tareasAlta = tareas.filter((t) => t.prioridad === "Alta").length;
  const tareasPorPrioridad = {
    Alta: tareas.filter((t) => t.prioridad === "Alta").length,
    Media: tareas.filter((t) => t.prioridad === "Media").length,
    Baja: tareas.filter((t) => t.prioridad === "Baja").length,
  };

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "40px 20px" }}>
      {/* Encabezado */}
      <div style={{ marginBottom: "40px" }}>
        <h1
          style={{
            fontSize: "42px",
            fontWeight: "900",
            marginBottom: "10px",
            background: "linear-gradient(135deg, #f472b6, #ec4899)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Estadísticas
        </h1>
        <p style={{ color: "#94a3b8", fontSize: "16px" }}>
          Monitorea tu progreso y productividad
        </p>
      </div>

      {loading ? (
        <div style={{ textAlign: "center", padding: "60px" }}>
          <Spin size="large" />
        </div>
      ) : tareas.length === 0 ? (
        <Empty
          description="No hay tareas registradas"
          style={{ marginTop: "60px", color: "#94a3b8" }}
        />
      ) : (
        <>
          {/* Estadísticas Principales */}
          <Row gutter={[20, 20]} style={{ marginBottom: "40px" }}>
            <Col xs={24} sm={12} lg={6}>
              <div
                style={{
                  background: "linear-gradient(135deg, rgba(96, 165, 250, 0.1), rgba(59, 130, 246, 0.1))",
                  border: "1px solid rgba(59, 130, 246, 0.3)",
                  borderRadius: "16px",
                  padding: "24px",
                  textAlign: "center",
                }}
              >
                <BarsOutlined
                  style={{ fontSize: "32px", color: "#60a5fa", marginBottom: "12px" }}
                />
                <div style={{ fontSize: "32px", fontWeight: "900", color: "#cbd5e1" }}>
                  {tareas.length}
                </div>
                <div style={{ color: "#94a3b8", marginTop: "8px" }}>Tareas totales</div>
              </div>
            </Col>

            <Col xs={24} sm={12} lg={6}>
              <div
                style={{
                  background: "linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(5, 150, 105, 0.1))",
                  border: "1px solid rgba(16, 185, 129, 0.3)",
                  borderRadius: "16px",
                  padding: "24px",
                  textAlign: "center",
                }}
              >
                <CheckCircleOutlined
                  style={{ fontSize: "32px", color: "#10b981", marginBottom: "12px" }}
                />
                <div style={{ fontSize: "32px", fontWeight: "900", color: "#cbd5e1" }}>
                  {completadas}
                </div>
                <div style={{ color: "#94a3b8", marginTop: "8px" }}>Completadas</div>
              </div>
            </Col>

            <Col xs={24} sm={12} lg={6}>
              <div
                style={{
                  background: "linear-gradient(135deg, rgba(249, 115, 22, 0.1), rgba(234, 88, 12, 0.1))",
                  border: "1px solid rgba(249, 115, 22, 0.3)",
                  borderRadius: "16px",
                  padding: "24px",
                  textAlign: "center",
                }}
              >
                <ClockCircleOutlined
                  style={{ fontSize: "32px", color: "#f97316", marginBottom: "12px" }}
                />
                <div style={{ fontSize: "32px", fontWeight: "900", color: "#cbd5e1" }}>
                  {pendientes}
                </div>
                <div style={{ color: "#94a3b8", marginTop: "8px" }}>Pendientes</div>
              </div>
            </Col>

            <Col xs={24} sm={12} lg={6}>
              <div
                style={{
                  background: "linear-gradient(135deg, rgba(168, 85, 247, 0.1), rgba(147, 51, 234, 0.1))",
                  border: "1px solid rgba(168, 85, 247, 0.3)",
                  borderRadius: "16px",
                  padding: "24px",
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: "32px", fontWeight: "900", color: "#cbd5e1" }}>
                  {porcentaje}%
                </div>
                <div style={{ color: "#94a3b8", marginTop: "8px" }}>Avance</div>
              </div>
            </Col>
          </Row>

          {/* Barra de progreso */}
          <div
            style={{
              background: "linear-gradient(135deg, rgba(96, 165, 250, 0.1), rgba(167, 139, 250, 0.1))",
              border: "1px solid rgba(148, 163, 184, 0.2)",
              borderRadius: "16px",
              padding: "24px",
              marginBottom: "40px",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
              <span style={{ color: "#cbd5e1", fontWeight: "600" }}>Progreso general</span>
              <span style={{ color: "#60a5fa", fontWeight: "900" }}>{porcentaje}%</span>
            </div>
            <Progress
              percent={porcentaje}
              strokeColor={{ "0%": "#60a5fa", "100%": "#a78bfa" }}
              trailColor="rgba(148, 163, 184, 0.1)"
              style={{ height: "8px" }}
            />
          </div>

          {/* Tareas por prioridad */}
          <Row gutter={[20, 20]}>
            <Col xs={24} lg={12}>
              <div
                style={{
                  background: "linear-gradient(135deg, rgba(96, 165, 250, 0.1), rgba(167, 139, 250, 0.1))",
                  border: "1px solid rgba(148, 163, 184, 0.2)",
                  borderRadius: "16px",
                  padding: "24px",
                }}
              >
                <h3 style={{ color: "#cbd5e1", marginBottom: "20px" }}>Tareas por prioridad</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  <div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "8px",
                        color: "#cbd5e1",
                      }}
                    >
                      <span>🔴 Alta prioridad</span>
                      <span style={{ fontWeight: "900" }}>{tareasPorPrioridad.Alta}</span>
                    </div>
                    <Progress
                      percent={
                        tareas.length === 0
                          ? 0
                          : Math.round((tareasPorPrioridad.Alta / tareas.length) * 100)
                      }
                      strokeColor="#ef4444"
                      trailColor="rgba(239, 68, 68, 0.1)"
                    />
                  </div>

                  <div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "8px",
                        color: "#cbd5e1",
                      }}
                    >
                      <span>🟡 Media prioridad</span>
                      <span style={{ fontWeight: "900" }}>{tareasPorPrioridad.Media}</span>
                    </div>
                    <Progress
                      percent={
                        tareas.length === 0
                          ? 0
                          : Math.round((tareasPorPrioridad.Media / tareas.length) * 100)
                      }
                      strokeColor="#f59e0b"
                      trailColor="rgba(245, 158, 11, 0.1)"
                    />
                  </div>

                  <div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "8px",
                        color: "#cbd5e1",
                      }}
                    >
                      <span>🟢 Baja prioridad</span>
                      <span style={{ fontWeight: "900" }}>{tareasPorPrioridad.Baja}</span>
                    </div>
                    <Progress
                      percent={
                        tareas.length === 0
                          ? 0
                          : Math.round((tareasPorPrioridad.Baja / tareas.length) * 100)
                      }
                      strokeColor="#10b981"
                      trailColor="rgba(16, 185, 129, 0.1)"
                    />
                  </div>
                </div>
              </div>
            </Col>

            <Col xs={24} lg={12}>
              <div
                style={{
                  background: "linear-gradient(135deg, rgba(96, 165, 250, 0.1), rgba(167, 139, 250, 0.1))",
                  border: "1px solid rgba(148, 163, 184, 0.2)",
                  borderRadius: "16px",
                  padding: "24px",
                }}
              >
                <h3 style={{ color: "#cbd5e1", marginBottom: "20px" }}>Resumen</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "12px 0",
                      borderBottom: "1px solid rgba(148, 163, 184, 0.2)",
                      color: "#cbd5e1",
                    }}
                  >
                    <span>Total de tareas:</span>
                    <span style={{ fontWeight: "900", color: "#60a5fa" }}>{tareas.length}</span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "12px 0",
                      borderBottom: "1px solid rgba(148, 163, 184, 0.2)",
                      color: "#cbd5e1",
                    }}
                  >
                    <span>Completadas:</span>
                    <span style={{ fontWeight: "900", color: "#10b981" }}>{completadas}</span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "12px 0",
                      color: "#cbd5e1",
                    }}
                  >
                    <span>Por completar:</span>
                    <span style={{ fontWeight: "900", color: "#f97316" }}>{pendientes}</span>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </>
      )}
    </div>
  );
}
