<?php

namespace App\Models;

use App\Traits\Searchable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LabTest extends Model
{
    use HasFactory, Searchable;

    protected $table = 'lab_tests';

    protected $guarded = [];

    protected $searchable = [
        'test_name',
        'specimen_type',
        'order_date',
        'status',
    ];

    protected $casts = [
        'order_date' => 'datetime',
    ];

    public function patient()
    {
        return $this->belongsTo(Patient::class, 'patient_id');
    }

    public function orderingDoctor()
    {
        return $this->belongsTo(Doctor::class, 'ordering_doctor_id');
    }

    public function labOrder()
    {
        return $this->belongsTo(LabOrder::class, 'lab_order_id');
    }

    public function results()
    {
        return $this->hasMany(TestResult::class, 'lab_test_id');
    }
}
