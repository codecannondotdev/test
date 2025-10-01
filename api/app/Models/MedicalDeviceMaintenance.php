<?php

namespace App\Models;

use App\Traits\Searchable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MedicalDeviceMaintenance extends Model
{
    use HasFactory, Searchable;

    protected $table = 'medical_device_maintenances';

    protected $guarded = [];

    protected $searchable = [
        'maintenance_date',
        'performed_by',
    ];

    protected $casts = [
        'maintenance_date' => 'datetime',
    ];

    public function device()
    {
        return $this->belongsTo(Device::class, 'device_id');
    }

    public function supplier()
    {
        return $this->belongsTo(Supplier::class, 'supplier_id');
    }
}
