<?php

namespace App\Models;

use App\Traits\Searchable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Supplier extends Model
{
    use HasFactory, Searchable;

    protected $table = 'suppliers';

    protected $guarded = [];

    protected $searchable = [
        'name',
        'contact_person',
        'phone',
        'email',
    ];

    protected $casts = [
    ];

    public function procurements()
    {
        return $this->hasMany(ProcurementOrder::class, 'supplier_id');
    }

    public function inventoryItems()
    {
        return $this->hasMany(InventoryItem::class, 'supplier_id');
    }

    public function maintenanceRecords()
    {
        return $this->hasMany(MedicalDeviceMaintenance::class, 'supplier_id');
    }
}
