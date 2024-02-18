import React, { useState, useEffect } from "react";
import reservabg from "../../assets/bg_reserva.jpg";
import { useParams } from "react-router-dom";

function ReservaPagina() {
    const { id, date } = useParams();
    const token = localStorage.getItem("token");

    const [email, setEmail] = useState("");
    const [tarjeta, setTarjeta] = useState("");
    const [caducidad, setCaducidad] = useState("");
    const [cvv, setCvv] = useState("");
    const [menu, setMenu] = useState("");
    const [fecha, setFecha] = useState("");
    const [readOnly, setReadOnly] = useState(false); // Estado para controlar si los campos de la tarjeta son de solo lectura

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleTarjetaChange = (e) => {
        setTarjeta(e.target.value);
    };

    const handleCvvChange = (e) => {
        setCvv(e.target.value);
    };

    const handleCaducidadChange = (e) => {
        setCaducidad(e.target.value);
    };

    const handleMenuChange = (e) => {
        setMenu(e.target.value);
    };

    const handleSubmitNotLogged = () => {
      const reserva = {
        email: email,
        numTarjeta: tarjeta,
        idHora: id,
        menu: menu,
    };
    console.log(reserva)

    const options = {
        method: "post",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(reserva),
    };

    const crearReservaNoLogueado = () => {
        const url = "/api/reservasNoAuth";
        fetch(url, options)
            .then((respuesta) => respuesta.json())
            .then((resultado) => {
                alert(resultado.message);
            })
            .catch((error) => console.log(error));
    };

    crearReservaNoLogueado()
    }

    const handleSubmitLogged = () => {
        if (readOnly == false) {
            const cardDetails = {
                numero: tarjeta,
                caducidad: caducidad,
                cvv: cvv,
            };

            const options2 = {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(cardDetails),
            };
            console.log(options2);
            console.log("Detalles de la tarjeta:", cardDetails);

            const url = "/api/tarjetas";
            fetch(url, options2)
                .then((respuesta) => respuesta.json())
                .then((resultado) => {
                    alert(resultado.message);
                })
                .catch((error) => console.log(error));
        }
        const reserva = {
            numTarjeta: tarjeta,
            idHora: id,
            menu: menu,
        };

        const options = {
            method: "post",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(reserva),
        };

        const crearReservaFetch = () => {
            const url = "/api/reservas";
            fetch(url, options)
                .then((respuesta) => respuesta.json())
                .then((resultado) => {
                    alert(resultado.message);
                })
                .catch((error) => console.log(error));
        };

        crearReservaFetch();
    };

    useEffect(() => {
        setFecha(date);
    }, [fecha]);

    useEffect(() => {
        const obtenerEmail = async () => {
            const options = {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const url = "/api/user";
            fetch(url, options)
                .then((response) => response.json())
                .then((data) => {
                    setEmail(data.email);
                })
                .catch((error) => console.log(error));
        };
        const obtenerUltimaTarjeta = async () => {
            try {
                const response = await fetch("/api/tarjetasUltima", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    setTarjeta(data.numero);
                    setCaducidad(data.caducidad);
                    setCvv(data.cvv);
                    // Cuando se obtienen los valores de la última tarjeta, establecer los campos como de solo lectura
                    setReadOnly(true);
                } else {
                    console.error(
                        "No se pudo obtener la última tarjeta del usuario"
                    );
                }
            } catch (error) {
                console.error("Error al obtener la última tarjeta:", error);
            }
        };

        if (token) {
            obtenerUltimaTarjeta();
            obtenerEmail();
        }
    }, [token]);

    const reservarLogged = handleSubmitLogged;
    const reservarNotLogged = handleSubmitNotLogged;

    const tipoReservar = token ? reservarLogged : reservarNotLogged;

    return (
        <div
            className="bg-cover bg-center min-h-screen flex justify-center items-center"
            style={{ backgroundImage: "url(" + reservabg + ")" }}
        >
            <div className="bg-white bg-opacity-80 p-8 rounded-md">
                <h2 className="text-2xl font-bold mb-4">Reservar</h2>
                <div className="mb-4">
                    <label htmlFor="email" className="block">
                        Correo electrónico:
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        readOnly={readOnly}
                        value={email}
                        onChange={handleEmailChange}
                        className="w-full px-4 py-2 rounded border-gray-300 focus:border-blue-500 focus:outline-none"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="tarjeta" className="block">
                        Número tarjeta a pagar:
                    </label>
                    <input
                        type="text"
                        id="tarjeta"
                        name="tarjeta"
                        readOnly={readOnly}
                        value={tarjeta}
                        onChange={handleTarjetaChange}
                        className="w-full px-4 py-2 rounded border-gray-300 focus:border-blue-500 focus:outline-none"
                    />
                </div>
                <div className="mb-4">
                    <label className="block">Fecha Caducidad:</label>
                    <input
                        type="text"
                        id="caducidad"
                        name="caducidad"
                        readOnly={readOnly}
                        value={caducidad}
                        onChange={handleCaducidadChange}
                        className="w-1/2 px-4 py-2 rounded border-gray-300 focus:border-blue-500 focus:outline-none"
                    />
                    <label className="block">CVV:</label>
                    <input
                        type="text"
                        id="cvv"
                        name="cvv"
                        readOnly={readOnly}
                        value={cvv}
                        onChange={handleCvvChange}
                        className="w-1/2 px-4 py-2 rounded border-gray-300 focus:border-blue-500 focus:outline-none"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="menu" className="block">
                        Menú:
                    </label>
                    <select
                        id="menu"
                        name="menu"
                        value={menu}
                        onChange={handleMenuChange}
                        className="w-full px-4 py-2 rounded border-gray-300 focus:border-blue-500 focus:outline-none"
                    >
                        <option selected value=""></option>
                        <option value="Menú Mediterráneo">
                            Menú Mediterráneo
                        </option>
                        <option value="Menú Gallego">Menú Gallego</option>
                        <option value="Menú Canario">Menú Canario</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label htmlFor="fecha" className="block">
                        Fecha:
                    </label>
                    <input
                        type="text"
                        id="fecha"
                        readOnly
                        name="fecha"
                        value={fecha}
                        className="w-full px-4 py-2 rounded border-gray-300 focus:border-blue-500 focus:outline-none"
                    />
                </div>
                <button
                    id="reservar"
                    type="button"
                    onClick={tipoReservar}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Reservar
                </button>
            </div>
        </div>
    );
}

export default ReservaPagina;
