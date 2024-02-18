<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tarjetas extends Model
{
    use HasFactory;

    protected $table = "tarjetas";

    protected $primaryKey = "id";

    protected $fillable = ["numero","caducidad","cvv","idCliente"];

    public function reservas()
    {
        return $this->hasMany(Reservas::class, 'numTarjeta', 'numero');
    }

    public function usuario()
    {
        return $this->belongsTo(User::class, 'idCliente');
    }
}
