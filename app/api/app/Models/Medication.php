<?php

namespace App\Models;

use App\Traits\Searchable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Medication extends Model
{
    use HasFactory, Searchable;

    protected $table = 'medications';

    protected $guarded = [];

    protected $searchable = [
        'name',
        'formulation',
        'strength',
        'route',
        'indications',
    ];

    protected $casts = [
    ];

    public function prescriptions()
    {
        return $this->hasMany(Prescription::class, 'medication_id');
    }

    public function treatments()
    {
        return $this->belongsToMany(Treatment::class, 'medications_treatments', 'medications_id', 'treatments_id');
    }

    public function inventoryItems()
    {
        return $this->hasMany(InventoryItem::class, 'medication_id');
    }

    public function pharmacyOrders()
    {
        return $this->belongsToMany(PharmacyOrder::class, 'medications_pharmacy_orders', 'medications_id', 'pharmacy_orders_id');
    }

    public function barcodeLabels()
    {
        return $this->hasMany(BarcodeLabel::class, 'medication_id');
    }
}
