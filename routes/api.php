<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ReservaController;
use App\Http\Controllers\Api\TarjetaController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::get('/eventos', [ReservaController::class, 'consultarEventos']);

Route::get('/reservas', [ReservaController::class, 'consultarReservas'])->middleware('auth:sanctum');
Route::post('/reservas', [ReservaController::class, 'insertarReserva'])->middleware('auth:sanctum');
Route::post('/reservasNoAuth', [ReservaController::class, 'insertarReservaSinAutenticar']);
Route::put('/reservas', [ReservaController::class, 'actualizarReserva']);
Route::delete('/reservas/{id}', [ReservaController::class, 'borrarReserva'])->middleware('auth:sanctum');

Route::post('/tarjetas', [TarjetaController::class, 'insertarTarjeta'])->middleware('auth:sanctum');
Route::get('/tarjetasUltima', [TarjetaController::class, 'consultarUltimaTarjeta'])->middleware('auth:sanctum');
Route::get('/tarjetas', [TarjetaController::class, 'consultarTarjetas'])->middleware('auth:sanctum');
Route::delete('/tarjetas/{id}', [TarjetaController::class, 'borrarTarjeta'])->middleware('auth:sanctum');




Route::get('/loginPrueba',[ReservaController::class,'loginPrueba']);

Route::post('/register',[AuthController::class,'createUser']);
Route::post('/login',[AuthController::class,'loginUser']);


