<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Event;
use App\Models\Reservas;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;

class ReservaController extends Controller
{
public function consultarReservas()
{
    $reservas = Reservas::where('idCliente', Auth::user()->id)
                       ->with('horario')
                       ->get();

    return response()->json(['reservas' => $reservas]);
}

    public function consultarEventos()
    {
        $eventos = Event::all();

        return response()->json(['eventos' => $eventos]);
    }

    public function insertarReserva(Request $request)
    {

        $idHora = $request->idHora;
        $numTarjeta = $request->numTarjeta;
        $menu = $request->menu;


        // Actualiza la disponibilidad del horario
       

        try {
            // Inserta la reserva
            DB::table('reservas')->insert([
                'idHora' => $idHora,
                'numTarjeta' => $numTarjeta,
                'menu' => $menu,
                'idCliente' => Auth::id()
            ]);

            Event::where('id', $idHora)->update(['disponible' => false]);

            return response()->json(['success' => true, 'message' => 'Reserva insertada con éxito']);
        } catch (Exception $e) {
            return response()->json(['success' => false, 'message' => 'Error al insertar la reserva: ' . $e->getMessage()]);
        }
    }

    public function insertarReservaSinAutenticar(Request $request)
    {
        $idHora = $request->idHora;
        $email = $request->email;
        $numeroTarjeta = $request->numTarjeta;
        $menu = $request->menu;
    
        // Actualiza la disponibilidad del horario
        
    
        try {
            $usuario = $request->email; // Supongamos que el usuario está identificado por su correo electrónico
            $fecha = date('Y-m-d'); // Fecha actual
    
            // Construir el mensaje del correo electrónico
            $message = "Estimado $usuario,\n\nGracias por reservar para el evento que se llevará a cabo el $fecha su menu será $menu.";
    
            
            // Inserta la reserva
            DB::table('reservas_sin_autenticar')->insert([
                'idHora' => $idHora,
                'menu' => $menu,
                'numeroTarjeta' => $numeroTarjeta,
                'email' => $email
            ]);

            Event::where('id', $idHora)->update(['disponible' => false]);

            // Envío del correo electrónico
            Mail::raw($message, function($mail) use ($request, $usuario) {
                $mail->to($request->email)
                    ->subject('Confirmación de reserva');
            });
    
            // Obtener información adicional para incluir en el correo electrónico
           
    
            return response()->json(['success' => true, 'message' => 'Reserva insertada con éxito']);
        } catch (Exception $e) {
            return response()->json(['success' => false, 'message' => 'Error al insertar la reserva: ' . $e->getMessage()]);
        }
    }
    


    public function actualizarReserva(Request $request)
    {
        $data = $request->json()->all();

        // Acceder a los valores deseados del array
        $idReserva = $data['id'];
        $idHora = $data['idHora'];
        $idCliente = $data['idCliente'];

        $reserva = Reservas::find($idReserva);


        try {
            $reserva->update([
                'idHora' => $idHora,
                'idCliente' => $idCliente
            ]);

            return response()->json(['message' => 'Actualización se ha realizado con éxito']);
        } catch (Exception $e) {
            return response()->json(['message' => 'Actualización ha Fallado']);
        }
    }

    public function borrarReserva($id)
    {
        try {

            $usuarioAutenticado = Auth::user();
            // Encuentra la reserva por su ID
            $reserva = Reservas::where('id', $id)
                ->where('idCliente', $usuarioAutenticado->id)
                ->first();

            if ($reserva) {
                // Verifica que el usuario autenticado sea el propietario de la reserva

                // Elimina la reserva
                $reserva->delete();

                // Actualiza la disponibilidad del horario
                if ($reserva->horario) {
                    $reserva->horario->update(['disponible' => true]);
                }


                return response()->json(['success' => true, 'message' => 'Reserva borrada exitosamente']);
            }

            return response()->json(['success' => false, 'message' => 'Reserva no encontrada']);
        } catch (Exception $e) {
            return response()->json(['success' => false, 'message' => 'Error al borrar la reserva: ' . $e->getMessage()]);
        }
    }
}
