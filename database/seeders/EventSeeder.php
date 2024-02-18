<?php

namespace Database\Seeders;

use App\Models\Event;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class EventSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $events = [
            [
                'event' => '12:30',
                'start_date' => '2024-02-16 12:30',
                'end_date' => '2024-02-16 14:30',
                'disponible' => true
            ],[
                'event' => '13:30',
                'start_date' => '2024-02-17 13:30',
                'end_date' => '2024-02-17 14:30',
                'disponible' => true
            ],
            [
                'event' => '14:00',
                'start_date' => '2024-02-22 14:00',
                'end_date' => '2023-02-22 15:00',
                'disponible' => true
            ],
            [
                'event' => '14:30',
                'start_date' => '2024-02-23 14:30',
                'end_date' => '2024-02-23 15:00',
                'disponible' => true
            ],
        ];
            foreach($events as $event){
                Event::create($event);
            }
    }
}
