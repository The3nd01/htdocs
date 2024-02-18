import EnlaceNav from "./EnlaceNav.jsx";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import user from "../assets/user.png";
import { useEffect, useState } from "react";

const Header = () => {
    const [userName, setUserName] = useState("");
    const [loggedIn, setLoggedIn] = useState(false); // Nuevo estado para controlar si el usuario está conectado

    const token = localStorage.getItem("token");

    const options = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const url = "/api/user";

    const notLoggedIcon = "h-6 mb-2 pl-7 animate-bounce";
    const loggedIcon = "flex align-center h-6 mb-2 pl-7";
    let iconStyle = loggedIn ? loggedIcon : notLoggedIcon;
    const linkLogged = "/profile";
    const linkNotLogged = "/login";
    let link = loggedIn ? linkLogged : linkNotLogged;

    useEffect(() => {
        console.log(token)
        if (token) {
            fetch(url, options)
                .then((respuesta) => respuesta.json())
                .then((resultado) => {
                    console.log(resultado);
                    setUserName(resultado.name);
                    setLoggedIn(true); // Establece el estado de conexión como verdadero
                })
                .catch((error) => console.log(error));
        } else {
            setUserName(""); // Limpiar el nombre de usuario cuando no hay token (usuario desconectado)
            setLoggedIn(false); // Establecer el estado de conexión como falso
        }
    }, [token]); // Solo se ejecuta cuando el token cambia

    return (
        <header className="fixed top-0 w-full text-white py-4 z-50">
            <nav className="container mx-auto flex items-center justify-between">
                <div className="flex items-center">
                    <img src={logo} alt="Logo" className="h-20 mr-4" />
                </div>
                <div className="flex items-center">
                    <EnlaceNav href="/" nombre="Inicio"></EnlaceNav>
                    <EnlaceNav href="#" nombre="Menú"></EnlaceNav>
                    <EnlaceNav href="/calendar" nombre="Reserva"></EnlaceNav>

                    <Link to={link} className=" mx-4 hover:text-amber-400">
                        <div className="flex items-center justify-center gap-2">
                            <img
                                className={iconStyle}
                                src={user}
                                alt="usuario"
                            />
                            <h1 className="pr-4">{userName}</h1>
                        </div>
                    </Link>
                </div>
            </nav>
        </header>
    );
};

export default Header;
