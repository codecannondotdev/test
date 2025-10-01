<?php

namespace App\Models;

use App\Traits\Searchable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FollowUp extends Model
{
    use HasFactory, Searchable;

    protected $table = 'follow_ups';

    protected $guarded = [];

    protected $searchable = [
        'follow_up_interval',
        'instructions',
    ];

    protected $casts = [
    ];

    public function appointment()
    {
        return $this->belongsTo(Appointment::class, 'appointment_id');
    }

    public function screening()
    {
        return $this->belongsTo(Screening::class, 'screening_id');
    }
}
