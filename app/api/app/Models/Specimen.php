<?php

namespace App\Models;

use App\Traits\Searchable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Specimen extends Model
{
    use HasFactory, Searchable;

    protected $table = 'specimens';

    protected $guarded = [];

    protected $searchable = [
        'label',
        'storage_location',
    ];

    protected $casts = [
        'collected_at' => 'datetime',
    ];

    public function labOrder()
    {
        return $this->belongsTo(LabOrder::class, 'lab_order_id');
    }

    public function pathologyReport()
    {
        return $this->belongsTo(PathologyReport::class, 'pathology_report_id');
    }

    public function testResults()
    {
        return $this->hasMany(TestResult::class, 'specimen_id');
    }

    public function sample()
    {
        return $this->hasMany(Sample::class, 'specimen_id');
    }

    public function barcodeLabels()
    {
        return $this->hasMany(BarcodeLabel::class, 'specimen_id');
    }
}
