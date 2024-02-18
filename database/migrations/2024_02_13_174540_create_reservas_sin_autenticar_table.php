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
        Schema::create('reservas_sin_autenticar', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('idHora');
            $table->string('numeroTarjeta');
            $table->string('menu');
            $table->string('email');
            $table->timestamps();

            $table->foreign('idHora')->references('id')->on('events');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reservas_sin_autenticar');
    }
};
