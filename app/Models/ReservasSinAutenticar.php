<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ReservasSinAutenticar extends Model
{
    use HasFactory;

    protected $table = "reservas_sin_autenticar";

    protected $fillable = ['idHora','menu','numeroTarjeta','email'];

    public function horario()
    {
        return $this->belongsTo(Event::class, 'idHora');
    }
}
