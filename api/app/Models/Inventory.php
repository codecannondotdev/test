<?php

namespace App\Models;

use App\Traits\Searchable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Inventory extends Model
{
    use HasFactory, Searchable;

    protected $table = 'inventories';

    protected $guarded = [];

    protected $searchable = [
        'item_name',
        'stock_quantity',
        'reorder_level',
    ];

    protected $casts = [
        'last_updated' => 'datetime',
    ];

    public function product()
    {
        return $this->belongsTo(Product::class, 'product_id');
    }

    public function warehouse()
    {
        return $this->belongsTo(Warehouse::class, 'warehouse_id');
    }
}
