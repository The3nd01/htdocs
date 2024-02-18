<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <a href="{{route('dashboard')}}">volver</a>
    <h1>Reservas del Cliente</h1>
    @foreach($reservas as $reserva)
    <p>{{ $loop->iteration }} - Reserva a fecha de {{ $reserva->horario->start_date }} <a href="{{ route('cancelar.reserva', ['idReserva' => $reserva->id]) }}">Cancelar</a></p>
    @endforeach
</body>
</html>