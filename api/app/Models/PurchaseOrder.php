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

    public function material()
    {
        return $this->belongsTo(Material::class, 'material_id');
    }
}
