<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\Reservas;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class HomeController extends Controller
{
    public function index()
    {
        $all_events = Event::all();
        $events = [];
        $events = $all_events->filter(function($event) {
            return $event->disponible; // Filtrar solo eventos con 'disponible' en true
        })->map(function($event) {
            return [
                'title' => $event->event,
                'start' => $event->start_date,
                'end' => $event->end_date,
                'url' => 'reserva' . "/" . $event->start_date . "/" . $event->id,
            ];
        })->values()->toArray();
        //   dd(compact('events'));
        return view('fullcalendar',compact('events'));
    }

    public function reserva($diayhora,$id)
    {
        if (Auth::check()) {
            $nombreUsuario = Auth::user()->name;
        }

        return view('reserva')->with(['diayhora' => $diayhora,'nombreUsuario' => $nombreUsuario,'id'=>$id]);
    }

    public function confirmarReserva(Request $request){

        $idHora = $request->input('horario');
        $idCliente = Auth::user()->id;
        //idMesa	idHora	idMenu	idCliente
        Event::where('id', $idHora)->update(['disponible' => false]);
        DB::table('reservas')->insert([
            'idMesa' => null,
            'idHora' => $idHora,
            'idMenu' => null,
            'idCliente' => $idCliente
        ]);

        return view('dashboard');

        
    }

   public function mostrarReservasUsuario()
    {

        $idUsuario = Auth::user()->id;

    
        $reservas = Reservas::with('horario')->where('idCliente', $idUsuario)->get();


        return view('misreservas', ['reservas' => $reservas]);
    }

    public function cancelarReserva($idReserva)
    {
    // Encuentra la reserva por su ID
    $reserva = Reservas::find($idReserva);
    
    

    if ($reserva) {
        // Elimina la reserva
        $reserva->delete();
        $reserva->horario->update(['disponible' => true]);

        // Redirige a alguna vista o a donde prefieras después de cancelar la reserva
        return redirect()->route('misreservas')->with('success', 'Reserva cancelada exitosamente');
    }
    }
}
