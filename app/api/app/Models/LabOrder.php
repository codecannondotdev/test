<?php

namespace App\Models;

use App\Traits\Searchable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LabOrder extends Model
{
    use HasFactory, Searchable;

    protected $table = 'lab_orders';

    protected $guarded = [];

    protected $searchable = [
        'order_date',
        'priority',
        'status',
    ];

    protected $casts = [
        'order_date' => 'datetime',
    ];

    public function patient()
    {
        return $this->belongsTo(Patient::class, 'patient_id');
    }

    public function orderedBy()
    {
        return $this->belongsTo(Doctor::class, 'ordered_by_id');
    }

    public function labTests()
    {
        return $this->hasMany(LabTest::class, 'lab_order_id');
    }

    public function specimens()
    {
        return $this->hasMany(Specimen::class, 'lab_order_id');
    }
}
