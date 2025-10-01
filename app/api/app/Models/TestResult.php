<?php

namespace App\Models;

use App\Traits\Searchable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TestResult extends Model
{
    use HasFactory, Searchable;

    protected $table = 'test_results';

    protected $guarded = [];

    protected $searchable = [
        'result_value',
        'units',
        'reference_range',
    ];

    protected $casts = [
        'reported_at' => 'datetime',
    ];

    public function labTest()
    {
        return $this->belongsTo(LabTest::class, 'lab_test_id');
    }

    public function specimen()
    {
        return $this->belongsTo(Specimen::class, 'specimen_id');
    }
}
