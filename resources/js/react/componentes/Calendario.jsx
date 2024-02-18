import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { useNavigate } from "react-router-dom";

function Calendario() {
    const [eventos, setEventos] = useState([]);
    const navigate = useNavigate();

    const handleClick = (info) => {
        let id = info.event.id;
        let start_date = info.event.start

        navigate(`reservar/${id}/${start_date}`);
    };

    useEffect(() => {
        const url = "/api/eventos";
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                // Filtrar los eventos para mostrar solo las horas disponibles
                const eventosDisponibles = data.eventos.filter((evento) => evento.disponible);
                const eventosFormateados = eventosDisponibles.map((evento) => ({
                    title: evento.event,
                    id: evento.id,
                    start: evento.start_date,
                    end: evento.end_date,
                }));
                setEventos(eventosFormateados);
            })
            .catch((error) => console.log(error));
    }, []);

    return (
        <div className="relative bg-black text-white overflow-visible h-screen">
            <div className="pt-24">
                <FullCalendar
                    plugins={[dayGridPlugin]}
                    initialView="dayGridMonth"
                    events={eventos}
                    eventClick={handleClick}
                    height={800}
                />
            </div>
        </div>
    );
}

export default Calendario;
