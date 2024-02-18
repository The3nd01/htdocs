<!DOCTYPE html>
<html lang="en" class="bg-black flex justify-center h-100">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="estilo.css">
    <title>Restaurante GrillIt</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap" rel="stylesheet">
    <link rel="icon" type="image/x-icon" href="images/Disco.ico">
    @vite('resources/css/app.css')
</head>

<body class="m-0 p-0 font-sans">
    <header class="font-bebas-neue text-xl w-full bg-black text-aliceblue flex justify-between">
        <div class="w-24 h-24">
            <a href="index.html" class="text-white no-underline"><img src="imagenes/Disco.png" alt="img not found"></a>
        </div>

        <div class="w-full flex flex-row justify-around items-center">
            <div><a class="text-white no-underline">CARTA</a></div>
            <div><a href="{{url('login')}}" class="text-white no-underline">INICIAR SESIÓN</a></div>
            <div><a href="{{url('register')}}" class="text-white no-underline">REGISTRAR</a></div>
        </div>
    </header>
    <picture>
        <img class="w-100" src="imagenes/TARDEO_1200x800_Carrusel_Web-desktop2.jpg" alt="photo 1">
    </picture>




</body>
<footer class="border-t-5 border-white flex flex-row justify-between items-center w-full bg-black h-10vh text-white text-center">
    <img src="/imagenes/Disco.png" alt="">
    <p xmlns:cc="http://creativecommons.org/ns#" xmlns:dct="http://purl.org/dc/terms/"><span property="dct:title"></span>  <span property="cc:attributionName"> </span> <a href="http://creativecommons.org/publicdomain/zero/1.0?ref=chooser-v1" target="_blank" rel="license noopener noreferrer" style="display:inline-block;">CC0 1.0<img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/cc.svg?ref=chooser-v1"><img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/zero.svg?ref=chooser-v1"></a></p>
    <img src="/imagenes/Disco.png" alt="">
</footer>

</html>