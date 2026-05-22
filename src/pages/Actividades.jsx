import { useState, useEffect } from "react";
import { Input, Select, Button, List, Typography } from "antd";
import axios from "axios";
import "../styless/Actividades.css";

const { Text } = Typography;

export default function Actividades() {
  const [tarea, setTarea] = useState("");
  const [prioridad, setPrioridad] = useState("Alta");
  const [lista, setLista] = useState([]);

  // 🔹 Cargar tareas desde el backend al iniciar
  useEffect(() => {
    axios.get("http://localhost:3000/actividades")
      .then(res => setLista(res.data))
      .catch(err => console.error("Error cargando tareas:", err));
  }, []);

  // 🔹 Agregar tarea en el backend
  const agregarTarea = async () => {
    if (!tarea) return;
    await axios.post("http://localhost:3000/actividades", {
      nombre: tarea,
      prioridad
    });
    const res = await axios.get("http://localhost:3000/actividades");
    setLista(res.data);
    setTarea("");
    setPrioridad("Alta");
  };

  // 🔹 Completar tarea en el backend
  const completarTarea = async (id) => {
    await axios.patch(`http://localhost:3000/actividades/${id}/completar`);
    const res = await axios.get("http://localhost:3000/actividades");
    setLista(res.data);
  };

  // 🔹 Eliminar tarea en el backend
  const eliminarTarea = async (id) => {
    await axios.delete(`http://localhost:3000/actividades/${id}`);
    const res = await axios.get("http://localhost:3000/actividades");
    setLista(res.data);
  };

  return (
    <div className="actividades-container">
      <h1>Lista de Actividades</h1>
      <p>Aquí se mostrarán las actividades registradas.</p>

      <Input
        placeholder="Nombre de la tarea"
        value={tarea}
        onChange={(e) => setTarea(e.target.value)}
        className="input-tarea"
      />

      <Select
        value={prioridad}
        onChange={(value) => setPrioridad(value)}
        className="select-prioridad"
      >
        <Select.Option value="Alta">Alta</Select.Option>
        <Select.Option value="Media">Media</Select.Option>
        <Select.Option value="Baja">Baja</Select.Option>
      </Select>

      <Button type="primary" block onClick={agregarTarea} className="btn-agregar">
        Agregar tarea
      </Button>

      <List
        className="lista-tareas"
        bordered
        dataSource={lista}
        renderItem={(item) => (
          <List.Item
            actions={[
              <Button
                type="link"
                onClick={() => completarTarea(item.id)}
                key="completar"
              >
                {item.completado ? "Desmarcar" : "Completar"}
              </Button>,
              <Button
                type="link"
                danger
                onClick={() => eliminarTarea(item.id)}
                key="eliminar"
              >
                Eliminar
              </Button>,
            ]}
          >
            <Text
              delete={item.completado}
              className={item.completado ? "tarea-completada" : ""}
            >
              {item.nombre} — Prioridad: {item.prioridad}
            </Text>
          </List.Item>
        )}
      />
    </div>
  );
}
