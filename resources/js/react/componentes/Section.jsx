import React, { useState } from 'react';
import Boton from './Boton.jsx'
import { Link } from 'react-router-dom';
import intro from '../assets/intro.jpg'

const Section = () =>{

    const [isZoomed, setIsZoomed] = useState(false);

    const zoomImage = () => {
        // Ocultar las barras de desplazamiento al hacer zoom
        document.body.style.overflow = 'hidden';
        setIsZoomed(true);

        let image = document.getElementById('zoomImage');

        // Aplicar el zoom a la imagen
        image.style.transition = 'transform 0.5s ease-in-out';
        image.style.transform = 'scale(1.5)';
    };

    const handleMouseLeave = () => {
        // Si no estamos en estado de zoom, mostrar las barras de desplazamiento
        if (!isZoomed) {
            document.body.style.overflow = 'auto';
        }
    };

    const resetZoom = () => {
        setIsZoomed(false);
        document.body.style.overflow = 'auto';


        let image = document.getElementById('zoomImage');

        // Restablecer el zoom de la imagen
        image.style.transition = 'transform 0.5s ease-in-out';
        image.style.transform = 'scale(1)';
    };

    return(
    <section className="relative h-screen flex items-center justify-center">
        <img id="zoomImage" className="w-full h-full object-cover transform scale-1" src={intro} alt="Imagen del restaurante"/>
        <div  className="absolute inset-0 flex items-center justify-center flex-col text-white"
                onMouseLeave={handleMouseLeave}>
                    <Link to="/calendar"><Boton onMouseEnter={zoomImage} onMouseLeave={resetZoom}/></Link>
        </div>

    </section>
    )
}

export default Section