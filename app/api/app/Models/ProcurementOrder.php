<?php

namespace App\Models;

use App\Traits\Searchable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProcurementOrder extends Model
{
    use HasFactory, Searchable;

    protected $table = 'procurement_orders';

    protected $guarded = [];

    protected $searchable = [
        'order_number',
        'order_date',
        'status',
    ];

    protected $casts = [
        'order_date' => 'datetime',
    ];

    public function supplier()
    {
        return $this->belongsTo(Supplier::class, 'supplier_id');
    }

    public function items()
    {
        return $this->hasMany(InventoryItem::class, 'procurement_order_id');
    }

    public function stock()
    {
        return $this->belongsTo(MedicationStock::class, 'stock_id');
    }

    public function donor()
    {
        return $this->belongsTo(Donor::class, 'donor_id');
    }
}
