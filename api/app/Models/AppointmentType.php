<?php

namespace App\Models;

use App\Traits\Searchable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AppointmentType extends Model
{
    use HasFactory, Searchable;

    protected $table = 'appointment_types';

    protected $guarded = [];

    protected $searchable = [
        'name',
        'default_location',
    ];

    protected $casts = [
    ];

    public function appointments()
    {
        return $this->hasMany(Appointment::class, 'type_id');
    }
}
