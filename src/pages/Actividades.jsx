import { useState, useEffect } from "react";
import { Input, Button, Empty, Space, Tag, Spin, message } from "antd";
import { PlusOutlined, DeleteOutlined, CheckOutlined } from "@ant-design/icons";
import axios from "axios";

export default function Actividades() {
  const [tareas, setTareas] = useState([]);
  const [nombre, setNombre] = useState("");
  const [prioridad, setPrioridad] = useState("Media");
  const [loading, setLoading] = useState(false);

  // Cargar tareas al iniciar
  useEffect(() => {
    cargarTareas();
  }, []);

  const cargarTareas = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:3000/actividades");
      setTareas(res.data);
    } catch (err) {
      message.error("Error al cargar tareas");
      console.error(err);
    }
    setLoading(false);
  };

  const agregarTarea = async () => {
    if (!nombre.trim()) {
      message.warning("Ingresa el nombre de la tarea");
      return;
    }

    try {
      await axios.post("http://localhost:3000/actividades", {
        nombre,
        prioridad,
      });
      message.success("Tarea agregada");
      setNombre("");
      setPrioridad("Media");
      cargarTareas();
    } catch (err) {
      message.error("Error al agregar tarea");
    }
  };

  const completarTarea = async (id) => {
    try {
      await axios.patch(`http://localhost:3000/actividades/${id}/completar`);
      cargarTareas();
    } catch (err) {
      message.error("Error al completar tarea");
    }
  };

  const eliminarTarea = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/actividades/${id}`);
      message.success("Tarea eliminada");
      cargarTareas();
    } catch (err) {
      message.error("Error al eliminar tarea");
    }
  };

  const getPriorityColor = (prioridad) => {
    const colors = {
      Alta: "#ef4444",
      Media: "#f59e0b",
      Baja: "#10b981",
    };
    return colors[prioridad] || "#6b7280";
  };

  const getPriorityLabel = (prioridad) => {
    const labels = {
      Alta: "🔴 Alta",
      Media: "🟡 Media",
      Baja: "🟢 Baja",
    };
    return labels[prioridad] || prioridad;
  };

  return (
    <div
      style={{
        maxWidth: "1000px",
        margin: "0 auto",
        padding: "40px 20px",
      }}
    >
      {/* Encabezado */}
      <div style={{ marginBottom: "40px" }}>
        <h1
          style={{
            fontSize: "42px",
            fontWeight: "900",
            marginBottom: "10px",
            background: "linear-gradient(135deg, #60a5fa, #a78bfa)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Mis Tareas
        </h1>
        <p style={{ color: "#94a3b8", fontSize: "16px" }}>
          Gestiona tus actividades y mantente productivo
        </p>
      </div>

      {/* Formulario de agregar tarea */}
      <div
        style={{
          background: "linear-gradient(135deg, rgba(96, 165, 250, 0.1), rgba(167, 139, 250, 0.1))",
          border: "1px solid rgba(148, 163, 184, 0.2)",
          borderRadius: "16px",
          padding: "24px",
          marginBottom: "30px",
          backdropFilter: "blur(10px)",
        }}
      >
        <h3 style={{ color: "#cbd5e1", marginBottom: "16px" }}>Agregar nueva tarea</h3>

        <div style={{ display: "flex", gap: "12px", marginBottom: "16px", flexWrap: "wrap" }}>
          <Input
            placeholder="Nombre de la tarea"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            onPressEnter={agregarTarea}
            style={{
              flex: 1,
              minWidth: "200px",
              background: "rgba(15, 23, 42, 0.5)",
              border: "1px solid rgba(148, 163, 184, 0.2)",
              color: "#e2e8f0",
              borderRadius: "8px",
              padding: "10px 16px",
            }}
          />

          <select
            value={prioridad}
            onChange={(e) => setPrioridad(e.target.value)}
            style={{
              padding: "10px 16px",
              borderRadius: "8px",
              background: "rgba(15, 23, 42, 0.5)",
              border: "1px solid rgba(148, 163, 184, 0.2)",
              color: "#e2e8f0",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            <option value="Alta">🔴 Alta</option>
            <option value="Media">🟡 Media</option>
            <option value="Baja">🟢 Baja</option>
          </select>

          <Button
            icon={<PlusOutlined />}
            onClick={agregarTarea}
            style={{
              background: "linear-gradient(135deg, #60a5fa, #3b82f6)",
              border: "none",
              color: "#fff",
              fontWeight: "600",
              borderRadius: "8px",
              height: "40px",
              display: "flex",
              alignItems: "center",
            }}
          >
            Agregar
          </Button>
        </div>
      </div>

      {/* Lista de tareas */}
      <div>
        <h3 style={{ color: "#cbd5e1", marginBottom: "16px" }}>
          {tareas.length} {tareas.length === 1 ? "Tarea" : "Tareas"}
        </h3>

        {loading ? (
          <div style={{ textAlign: "center", padding: "40px" }}>
            <Spin />
          </div>
        ) : tareas.length === 0 ? (
          <Empty
            description="No hay tareas"
            style={{ marginTop: "60px", color: "#94a3b8" }}
          />
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {tareas.map((tarea) => (
              <div
                key={tarea.id}
                style={{
                  background: tarea.completado
                    ? "rgba(16, 185, 129, 0.05)"
                    : "linear-gradient(135deg, rgba(96, 165, 250, 0.05), rgba(167, 139, 250, 0.05))",
                  border: `1px solid ${
                    tarea.completado
                      ? "rgba(16, 185, 129, 0.2)"
                      : "rgba(148, 163, 184, 0.2)"
                  }`,
                  borderRadius: "12px",
                  padding: "16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  transition: "all 0.3s ease",
                  opacity: tarea.completado ? 0.6 : 1,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateX(4px)";
                  e.currentTarget.style.boxShadow = "0 4px 20px rgba(59, 130, 246, 0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateX(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <span
                      style={{
                        textDecoration: tarea.completado ? "line-through" : "none",
                        color: tarea.completado ? "#64748b" : "#cbd5e1",
                        fontSize: "16px",
                        fontWeight: "500",
                      }}
                    >
                      {tarea.nombre}
                    </span>
                    <Tag
                      style={{
                        background: getPriorityColor(tarea.prioridad),
                        border: "none",
                        color: "#fff",
                        fontWeight: "600",
                        padding: "4px 12px",
                      }}
                    >
                      {getPriorityLabel(tarea.prioridad)}
                    </Tag>
                  </div>
                </div>

                <div style={{ display: "flex", gap: "8px" }}>
                  <Button
                    icon={<CheckOutlined />}
                    onClick={() => completarTarea(tarea.id)}
                    type={tarea.completado ? "dashed" : "primary"}
                    style={{
                      borderRadius: "6px",
                      background: tarea.completado
                        ? "rgba(16, 185, 129, 0.2)"
                        : "rgba(96, 165, 250, 0.2)",
                      color: tarea.completado ? "#10b981" : "#60a5fa",
                      border: `1px solid ${
                        tarea.completado ? "#10b981" : "#60a5fa"
                      }`,
                    }}
                  >
                    {tarea.completado ? "Pendiente" : "Completada"}
                  </Button>

                  <Button
                    icon={<DeleteOutlined />}
                    onClick={() => eliminarTarea(tarea.id)}
                    danger
                    style={{
                      borderRadius: "6px",
                      background: "rgba(239, 68, 68, 0.1)",
                      border: "1px solid rgba(239, 68, 68, 0.3)",
                      color: "#ef4444",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
