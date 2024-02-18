<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Restaurante GrillIt</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap" rel="stylesheet">
</head>

<body>
  <h1>Horario de la reserva @isset($diayhora){{$diayhora}}@endisset</h1><br>
  <h2>Cliente @isset($nombreUsuario){{$nombreUsuario}}@endisset</h2>
  <form action="{{url('confirmarreserva')}}" method="POST">
    @csrf
    <input type="hidden" value="{{ $id }}" name="horario">
    Menu:<label for="opciones"></label>
    <select id="opciones" name="opciones">
        <option value="opcion1">Opción 1</option>
        <option value="opcion2">Opción 2</option>
        <option value="opcion3">Opción 3</option>
    </select><br>
    Alergias: <input type="textarea">
    <input type="submit" value="Confirmar Reserva">
  </form>
</body>

</html>