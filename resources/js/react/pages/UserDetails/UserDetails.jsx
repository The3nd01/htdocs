import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import userbg from "../../assets/bg_user.jpg";

function UserDetails() {
    const [userDetails, setUserDetails] = useState("");
    const [showModal, setShowModal] = useState(false); // Estado para controlar la visibilidad del modal
    const [cardNumber, setCardNumber] = useState("");
    const [expiry, setExpiry] = useState("");
    const [cvv, setCvv] = useState("");
    const [cards, setCards] = useState([]); // Estado para almacenar las tarjetas del usuario
    const [reservas, setReservas] = useState([]); // Estado para almacenar las reservas del usuario
    const navigate = useNavigate();

    const token = localStorage.getItem("token");
    const options = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const url = "/api/user";
    useEffect(() => {
        if (token) {
            fetch(url, options)
                .then((response) => response.json())
                .then((data) => {
                    setUserDetails(data);
                })
                .catch((error) => console.log(error));
        }
    }, []);

    // Función para cargar las tarjetas del usuario
    const loadUserCards = () => {
        const cardUrl = "/api/tarjetas";
        fetch(cardUrl, options)
            .then((response) => response.json())
            .then((data) => {
                if (Array.isArray(data.tarjetas)) {
                    setCards(data.tarjetas);
                } else {
                    console.error(
                        "La respuesta de la API no es un arreglo:",
                        data
                    );
                }
            })
            .catch((error) => console.log(error));
    };

    const loadUserReservas = () => {
        const reservasUrl = "/api/reservas";
        fetch(reservasUrl, options)
            .then((response) => response.json())
            .then((data) => {
                if (Array.isArray(data.reservas)) {
                    setReservas(data.reservas);
                } else {
                    console.error(
                        "La respuesta de la API no es un arreglo:",
                        data
                    );
                }
            })
            .catch((error) => console.log(error));
    };

    useEffect(() => {
        if (token) {
            loadUserCards(); // Cargar las tarjetas del usuario cuando se monta el componente
            loadUserReservas();
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    const handleCrearTarjeta = () => {
        setShowModal(true); // Mostrar el modal al hacer clic en "Crear Tarjeta"
    };

    const handleCloseModal = () => {
        setShowModal(false); // Cerrar el modal
    };

    const handleDeleteTarjeta = (id) => {
        const token = localStorage.getItem("token");
        const options = {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        fetch(`/api/tarjetas/${id}`, options)
            .then((response) => response.json())
            .then((data) => {
                if(data.success){
                    loadUserCards();
                    alert(data.message)
                }else{
                    alert(data.message)
                }

            })
            .catch((error) =>
                console.error("Error al eliminar tarjeta:", error)
            );
    };

    const handleDeleteReserva = (idReserva) => {
        const url = `/api/reservas/${idReserva}`;

        fetch(url, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    // Eliminación exitosa, actualiza la lista de reservas
                    loadUserReservas();
                    alert(data.message);
                } else {
                    // Error al eliminar la reserva
                    alert(data.message);
                }
            })
            .catch((error) =>
                console.error("Error al eliminar la reserva:", error)
            );
    };

    const handleSubmit = async () => {
        console.log("hola");
        const cardDetails = {
            numero: cardNumber,
            caducidad: expiry,
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
                loadUserCards(); // Recargar las tarjetas del usuario después de crear una nueva tarjeta
            })
            .catch((error) => console.log(error));
        setShowModal(false); // Cerrar el modal después de enviar el formulario
    };

    return (
        <div
            className="bg-cover bg-center min-h-screen flex justify-center items-center"
            style={{ backgroundImage: `url(${userbg})` }}
        >
            <section className="w-full h-full flex justify-around">
                <div className="text-white">
                    <h1 className="font-extrabold pb-6">Mis Reservas</h1>
                    {/* Mostrar las reservas del usuario */}
                    <div>
                        {reservas.map((reserva) => (
                            <div key={reserva.id}>
                                <p>Fecha: {reserva.horario.start_date}</p>
                                <p>Detalles: {reserva.menu}</p>
                                <button
                                    className="bg-red-600 text-white py-1 px-2 rounded hover:bg-red-700"
                                    onClick={() =>
                                        handleDeleteReserva(reserva.id)
                                    }
                                >
                                    Eliminar
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="text-white">
                    <h1 className="font-extrabold pb-6">Datos Personales</h1>
                    <h3>Nombre: {userDetails.name}</h3>
                    <h3>Email: {userDetails.email}</h3>
                    <button
                        onClick={handleLogout}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-5"
                    >
                        Cerrar Sesión
                    </button>
                </div>
                <div className="text-white">
                    <h1 className="font-extrabold pb-6">Mis Tarjetas</h1>
                    {/* Botón para crear tarjeta */}

                    {/* Mostrar las tarjetas del usuario */}
                    <div>
                        {cards.map((card) => (
                            <div key={card.id}>
                                <p>Número de Tarjeta: {card.numero}</p>
                                <p>Caducidad: {card.caducidad}</p>
                                <p>CVV: {card.cvv}</p>
                                <button
                                    className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700"
                                    onClick={() =>
                                        handleDeleteTarjeta(card.id)
                                    }
                                >
                                    Eliminar
                                </button>
                            </div>
                        ))}
                    </div>
                    <button
                        onClick={handleCrearTarjeta}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-5"
                    >
                        Crear Tarjeta
                    </button>
                </div>
            </section>

            {/* Modal para crear tarjeta */}
            {showModal && (
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-8 rounded shadow-lg">
                        <h2 className="text-xl font-bold mb-4">
                            Crear Tarjeta
                        </h2>
                        <div className="mb-4">
                            <label
                                htmlFor="cardNumber"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Número de Tarjeta:
                            </label>
                            <input
                                type="text"
                                id="cardNumber"
                                name="cardNumber"
                                className="mt-1 p-2 border rounded-md w-full"
                                value={cardNumber}
                                onChange={(e) => setCardNumber(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="expiry"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Caducidad:
                            </label>
                            <input
                                type="text"
                                id="expiry"
                                name="expiry"
                                className="mt-1 p-2 border rounded-md w-full"
                                value={expiry}
                                onChange={(e) => setExpiry(e.target.value)}
                                placeholder="MM/YY"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="cvv"
                                className="block text-sm font-medium text-gray-700"
                            >
                                CVV:
                            </label>
                            <input
                                type="text"
                                id="cvv"
                                name="cvv"
                                className="mt-1 p-2 border rounded-md w-full"
                                value={cvv}
                                onChange={(e) => setCvv(e.target.value)}
                                required
                            />
                        </div>
                        <div className="flex justify-end">
                            <button
                                type="button"
                                onClick={handleCloseModal}
                                className="mr-4 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleSubmit}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            >
                                Crear
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default UserDetails;
