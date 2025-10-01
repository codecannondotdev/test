<?php

namespace App\Models;

use App\Traits\Searchable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OperatingRoom extends Model
{
    use HasFactory, Searchable;

    protected $table = 'operating_rooms';

    protected $guarded = [];

    protected $searchable = [
        'room_number',
        'status',
    ];

    protected $casts = [
    ];

    public function surgeries()
    {
        return $this->hasMany(Surgery::class, 'operating_room_id');
    }

    public function anesthesiaMachines()
    {
        return $this->hasMany(Device::class, 'operating_room_id');
    }
}
