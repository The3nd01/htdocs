import React from "react";

import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import loginbg from '../../assets/login_bg.jpg'

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const navigate = useNavigate()

  const user = {
    email: email,
    password: password,
    name: name
  };

  const options = {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  };

  const obtenerDatosFetch = () => {
    const url = "/api/register";
    fetch(url, options)
      .then((respuesta) => respuesta.json())
      .then((resultado) => {
        console.log(resultado.token);
        if(resultado.token){
          localStorage.setItem("token", resultado.token);
          navigate("/");
      }
      })
      .catch((error) => console.log(error));
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Evita que la página se recargue al enviar el formulario


    obtenerDatosFetch();

  };

  return (
    <div className="relative h-screen flex items-center justify-center">
      <img
        className="w-full h-full object-cover transform scale-1"
        src={loginbg}
        alt="Imagen del restaurante"
      />
      <div className="absolute inset-0 flex items-center justify-center flex-col text-white">
        <Card color="transparent" shadow={false}>
          <Typography variant="h4" color="white">
            Registrarse
          </Typography>
          <Typography color="white" className="mt-1 font-normal">
            Gestione sus reservas
          </Typography>
          <form
            className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
            onSubmit={handleSubmit}
            method="post"
          >
            <div className="mb-1 flex flex-col gap-6">
              <Typography variant="h6" color="white" className="-mb-3">
                Nombre
              </Typography>
              <Input
                size="lg"
                placeholder="Nombre Usuario"
                className=" focus:border-gray-400 text-black"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                value={name} 
                onChange={(e) => setName(e.target.value)}
              />
              <Typography variant="h6" color="white" className="-mb-3">
                Email
              </Typography>
              <Input
                size="lg"
                placeholder="nombre@gmail.com"
                className=" focus:border-gray-400 text-black"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
              />
              <Typography variant="h6" color="white" className="-mb-3">
                Contraseña
              </Typography>
              <Input
                type="password"
                size="lg"
                placeholder="********"
                className="focus:border-gray-400 text-black  "
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
              />
              <Typography variant="h6" color="white" className="-mb-3">
                Confirmar Contraseña
              </Typography>
              <Input
                type="password"
                size="lg"
                placeholder="********"
                className="focus:border-gray-400 text-black  "
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
            </div>
            <Checkbox
              label={
                <Typography
                  variant="small"
                  color="white"
                  className="flex items-center font-normal"
                >
                  Estoy deacuerdo con los
                  <a
                    href="#"
                    className="font-medium transition-colors hover:text-white-900"
                  >
                    &nbsp; Términos y condiciones
                  </a>
                </Typography>
              }
              containerProps={{ className: "-ml-2.5" }}
            />

            <Button type="submit" className="mt-6" fullWidth>
              Registrar
            </Button>

            <Typography color="white" className="mt-4 text-center font-normal">
              Ya tienes una cuenta?{" "}
              <Link to="/login" className="font-medium text-blue-900">
              Inicia Sesión
              </Link>
            </Typography>
          </form>
        </Card>
      </div>
    </div>
  );
}

export default Register;
