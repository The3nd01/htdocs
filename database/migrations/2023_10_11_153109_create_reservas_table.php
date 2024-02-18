<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('reservas', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('idHora');
            $table->string('numTarjeta');
            $table->string('menu');
            $table->unsignedBigInteger('idCliente');
            $table->timestamps();

            $table->foreign('idHora')->references('id')->on('events');
            $table->foreign('numTarjeta')->references('numero')->on('tarjetas');
            $table->foreign('idCliente')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reservas');
    }
};
