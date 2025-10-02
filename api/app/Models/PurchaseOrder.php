<?php

namespace App\Models;

use App\Traits\Searchable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PurchaseOrder extends Model
{
    use HasFactory, Searchable;

    protected $table = 'purchase_orders';

    protected $guarded = [];

    protected $searchable = [
        'order_date',
        'expected_delivery',
        'status',
        'total_amount',
    ];

    protected $casts = [
        'order_date' => 'datetime',
        'expected_delivery' => 'datetime',
    ];

    public function supplier()
    {
        return $this->belongsTo(Supplier::class, 'supplier_id');
    }

    public function purchaseOrderItems()
    {
        return $this->hasMany(PurchaseOrderItem::class, 'purchase_order_id');
    }
}
