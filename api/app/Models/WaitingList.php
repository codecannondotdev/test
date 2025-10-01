<?php

namespace App\Models;

use App\Traits\Searchable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WaitingList extends Model
{
    use HasFactory, Searchable;

    protected $table = 'waiting_lists';

    protected $guarded = [];

    protected $searchable = [
        'position',
        'added_at',
        'notes',
    ];

    protected $casts = [
        'added_at' => 'datetime',
    ];

    public function patient()
    {
        return $this->belongsTo(Patient::class, 'patient_id');
    }

    public function queue()
    {
        return $this->belongsTo(Queue::class, 'queue_id');
    }

    public function appointment()
    {
        return $this->belongsTo(Appointment::class, 'appointment_id');
    }
}
