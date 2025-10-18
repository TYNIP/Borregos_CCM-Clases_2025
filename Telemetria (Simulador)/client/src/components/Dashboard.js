import { useState } from "react";

export default function Dashboard() {
    const [data, setData] = useState({});
    const [socket, setSocket] = useState(null);
    const [connected, setConnected] = useState(false);

    const style = {
        background: "transparent",
        color: "white",
        border: "1px solid white",
        cursor: "pointer",
        padding: "8px 12px",
        borderRadius: "8px",
    };

    const openWS = () => {
        const ws = new WebSocket("ws://127.0.0.1:8000/ws");

        ws.onopen = () => {
            console.log("WebSocket connected");
            setConnected(true);
        };

        ws.onmessage = (event) => {
            const message = JSON.parse(event.data);
            setData(message);
        };

        ws.onclose = () => {
            console.log("WebSocket disconnected");
            setConnected(false);
        };

        ws.onerror = (err) => {
            console.error("WebSocket error:", err);
            setConnected(false);
        };

        setSocket(ws);
    };
    
    const closeWS = () => {
        if (socket) {
            socket.close();
            setConnected(false);
        }
    };
    return (
        <div style={{ color: "white", fontFamily: "sans-serif" }}>
            <h1>Telemetría en Vivo</h1>

            {connected ? (
                <button style={style} onClick={closeWS}>
                Cerrar Conexión
                </button>
            ) : (
                <button style={style} onClick={openWS}>
                Establecer Conexión
                </button>
            )}

            <div style={{ marginTop: "20px" }}>
                <p>Temperatura: {data.temperature ?? "--"}</p>
                <p>Presión: {data.pressure ?? "--"}</p>
                <p>Estado: {data.status ?? "--"}</p>
            </div>
        </div>
  );
}