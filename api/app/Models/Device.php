<?php

namespace App\Models;

use App\Traits\Searchable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Device extends Model
{
    use HasFactory, Searchable;

    protected $table = 'devices';

    protected $guarded = [];

    protected $searchable = [
        'name',
        'model',
        'serial_number',
        'status',
    ];

    protected $casts = [
    ];

    public function maintenanceRecords()
    {
        return $this->hasMany(MedicalDeviceMaintenance::class, 'device_id');
    }

    public function locations()
    {
        return $this->belongsToMany(Ward::class, 'devices_locations', 'devices_id', 'locations_id');
    }

    public function operatingRoom()
    {
        return $this->belongsTo(OperatingRoom::class, 'operating_room_id');
    }

    public function barcodeLabels()
    {
        return $this->hasMany(BarcodeLabel::class, 'device_id');
    }
}
