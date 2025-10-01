<?php

namespace App\Models;

use App\Traits\Searchable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Discharge extends Model
{
    use HasFactory, Searchable;

    protected $table = 'discharges';

    protected $guarded = [];

    protected $searchable = [
        'discharge_date',
        'condition_at_discharge',
    ];

    protected $casts = [
        'discharge_date' => 'datetime',
    ];

    public function admission()
    {
        return $this->belongsTo(Admission::class, 'admission_id');
    }

    public function followUpAppointments()
    {
        return $this->hasMany(Appointment::class, 'discharge_id');
    }

    public function dischargeSummary()
    {
        return $this->hasOne(DischargeSummary::class, 'discharge_id');
    }
}
