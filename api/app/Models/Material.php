<?php

namespace App\Models;

use App\Traits\Searchable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Material extends Model
{
    use HasFactory, Searchable;

    protected $table = 'materials';

    protected $guarded = [];

    protected $searchable = [
        'name',
        'unit',
        'grade',
    ];

    protected $casts = [
    ];

    public function suppliers()
    {
        return $this->belongsToMany(Supplier::class, 'materials_suppliers', 'materials_id', 'suppliers_id');
    }

    public function miningOperations()
    {
        return $this->hasMany(MiningOperation::class, 'material_id');
    }

    public function purchaseOrders()
    {
        return $this->hasMany(PurchaseOrder::class, 'material_id');
    }

    public function inventoryItems()
    {
        return $this->hasMany(Inventory::class, 'material_id');
    }
}
