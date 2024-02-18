<?php

namespace App\Http\Controllers;

use App\Models\Tarjeta;
use Illuminate\Http\Request;
use Illuminate\Foundation\Auth\User;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    function index(){
        $usuario = Auth::user()->name;

        foreach($usuario->tarjetas as $tar){
            echo $tar->num;
        }
    }
}
