<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    use HasFactory;
    
    protected $table = "events";


    protected $fillable = ['event','start_date','end_date','disponible'];

    public function reserva()
    {
        return $this->belongsTo(Reservas::class);
    }
}
