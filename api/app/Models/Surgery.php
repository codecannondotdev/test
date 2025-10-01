<?php

namespace App\Models;

use App\Traits\Searchable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Surgery extends Model
{
    use HasFactory, Searchable;

    protected $table = 'surgeries';

    protected $guarded = [];

    protected $searchable = [
        'procedure_name',
        'scheduled_start',
        'scheduled_end',
        'status',
    ];

    protected $casts = [
        'scheduled_start' => 'datetime',
        'scheduled_end' => 'datetime',
    ];

    public function patient()
    {
        return $this->belongsTo(Patient::class, 'patient_id');
    }

    public function operatingRoom()
    {
        return $this->belongsTo(OperatingRoom::class, 'operating_room_id');
    }

    public function surgeons()
    {
        return $this->belongsToMany(Doctor::class, 'surgeons_surgeries', 'surgeries_id', 'surgeons_id');
    }

    public function anesthesiaRecord()
    {
        return $this->hasOne(Anesthesia::class, 'surgery_id');
    }

    public function procedures()
    {
        return $this->belongsToMany(Procedure::class, 'procedures_surgeries', 'surgeries_id', 'procedures_id');
    }
}
