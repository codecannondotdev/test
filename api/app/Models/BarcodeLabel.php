<?php

namespace App\Models;

use App\Traits\Searchable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BarcodeLabel extends Model
{
    use HasFactory, Searchable;

    protected $table = 'barcode_labels';

    protected $guarded = [];

    protected $searchable = [
        'code',
        'type',
        'printed_at',
    ];

    protected $casts = [
        'printed_at' => 'datetime',
    ];

    public function specimen()
    {
        return $this->belongsTo(Specimen::class, 'specimen_id');
    }

    public function medication()
    {
        return $this->belongsTo(Medication::class, 'medication_id');
    }

    public function device()
    {
        return $this->belongsTo(Device::class, 'device_id');
    }
}
