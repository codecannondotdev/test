<?php

namespace App\Models;

use App\Traits\Searchable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InventoryItem extends Model
{
    use HasFactory, Searchable;

    protected $table = 'inventory_items';

    protected $guarded = [];

    protected $searchable = [
        'name',
        'category',
        'quantity',
        'reorder_level',
    ];

    protected $casts = [
    ];

    public function supplier()
    {
        return $this->belongsTo(Supplier::class, 'supplier_id');
    }

    public function medication()
    {
        return $this->belongsTo(Medication::class, 'medication_id');
    }

    public function procurementOrder()
    {
        return $this->belongsTo(ProcurementOrder::class, 'procurement_order_id');
    }
}
