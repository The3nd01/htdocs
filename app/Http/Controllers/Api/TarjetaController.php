<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Tarjetas;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class TarjetaController extends Controller
{
    public function consultarTarjetas()
    {

        $tarjetas = Tarjetas::where('idCliente', Auth::user()->id)->get();
    
        return response()->json(['tarjetas' => $tarjetas]);
    }

    public function consultarUltimaTarjeta()
    {
        // Obtener la última tarjeta del usuario autenticado ordenada por ID en orden descendente
        $ultimaTarjeta = Tarjetas::where('idCliente', Auth::user()->id)
            ->orderByDesc('id') // Ordenar las tarjetas por ID en orden descendente
            ->first(); // Obtener solo la primera tarjeta (la última en la lista)
    
        // Verificar si se encontró alguna tarjeta
        if ($ultimaTarjeta) {
            // Devolver la última tarjeta encontrada en formato JSON
            return response()->json($ultimaTarjeta);
        } else {
            // Devolver una respuesta JSON indicando que no se encontraron tarjetas
            return response()->json(['error' => 'No se encontraron tarjetas para el usuario actual'], 404);
        }
    }
    


    public function insertarTarjeta(Request $request)
    {
            $numero =  $request->numero;
            $caducidad = $request->caducidad;
            $cvv = $request->cvv;

    
            try {
                // Inserta la reserva
                DB::table('tarjetas')->insert([
                    'numero' => $numero,
                    'caducidad' => $caducidad,
                    'cvv' => $cvv,
                    'idCliente' => Auth::id()
                ]);
    
                return response()->json(['success' => true, 'message' => 'Tarjeta insertada con éxito']);
            } catch (Exception $e) {
                return response()->json(['success' => false, 'message' => 'Error al insertar la tarjeta: ' . $e->getMessage()]);
            }

    }



    public function borrarTarjeta($id)
{
    try {
        $usuarioAutenticado = Auth::user();
        
        // Encuentra la tarjeta por su ID
        $tarjeta = Tarjetas::where('id', $id)
                      ->where('idCliente', $usuarioAutenticado->id)
                      ->first();

        if ($tarjeta) {
            // Verifica si la tarjeta tiene reservas asociadas
            if ($tarjeta->reservas->isNotEmpty()) {
                // Si tiene reservas asociadas, obtén la fecha de la primera reserva
                $fechaReserva = $tarjeta->reservas->first()->horario->start_date;
                
                // Mensaje de error indicando que la tarjeta está asociada a una reserva
                return response()->json([
                    'success' => false,
                    'message' => 'No se puede borrar la tarjeta porque está asociada a una reserva con fecha '.$fechaReserva
                ]);
            }
            
            // Si no tiene reservas asociadas, elimina la tarjeta
            $tarjeta->delete();

            return response()->json(['success' => true, 'message' => 'Tarjeta borrada exitosamente']);
        }

        return response()->json(['success' => false, 'message' => 'Tarjeta no encontrada']);
    } catch (Exception $e) {
        return response()->json(['success' => false, 'message' => 'Error al borrar la tarjeta: ' . $e->getMessage()]);
    }
}


}
