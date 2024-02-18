<?php

namespace App\Models;

use App\Models\Event;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reservas extends Model
{
    use HasFactory;

    protected $table = "reservas";

    protected $fillable = ['idHora','numTarjeta','menu','idCliente'];

    public function horario()
    {
        return $this->belongsTo(Event::class, 'idHora');
    }
}
