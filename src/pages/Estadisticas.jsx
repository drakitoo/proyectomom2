import { Card, Statistic, Row, Col } from "antd";
import { Pie } from "@ant-design/charts";
import { useState } from "react";

export default function Estadisticas() {
  // Ejemplo de datos simulados (en un proyecto real vendrían de contexto o props)
  const [tareas] = useState([
    { nombre: "Estudiar React", prioridad: "Alta", completada: true },
    { nombre: "Hacer ejercicio", prioridad: "Media", completada: false },
    { nombre: "Leer un libro", prioridad: "Baja", completada: false },
  ]);

  const total = tareas.length;
  const completadas = tareas.filter((t) => t.completada).length;
  const pendientes = total - completadas;

  // Datos para el gráfico circular
  const data = [
    { type: "Completadas", value: completadas },
    { type: "Pendientes", value: pendientes },
  ];

  const config = {
    appendPadding: 10,
    data,
    angleField: "value",
    colorField: "type",
    radius: 0.9,
    label: {
      type: "inner",
      offset: "-30%",
      content: "{value}",
      style: { fontSize: 14, textAlign: "center" },
    },
    interactions: [{ type: "element-active" }],
    colors: ["#52c41a", "#f5222d"], // verde = completadas, rojo = pendientes
  };

  return (
    <div style={{ maxWidth: "800px", margin: "50px auto" }}>
      <h1>Estadísticas</h1>
      <Row gutter={16} style={{ marginBottom: "30px" }}>
        <Col span={8}>
          <Card>
            <Statistic title="Total de tareas" value={total} />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic title="Completadas" value={completadas} valueStyle={{ color: "green" }} />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic title="Pendientes" value={pendientes} valueStyle={{ color: "red" }} />
          </Card>
        </Col>
      </Row>

      {/* Gráfico circular */}
      <Card>
        <Pie {...config} />
      </Card>
    </div>
  );
}
