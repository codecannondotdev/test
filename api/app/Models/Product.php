<?php

namespace App\Models;

use App\Traits\Searchable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory, Searchable;

    protected $table = 'products';

    protected $guarded = [];

    protected $searchable = [
        'name',
        'weight',
        'price',
        'description',
        'dimensions',
    ];

    protected $casts = [
    ];

    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id');
    }

    public function supplier()
    {
        return $this->belongsTo(Supplier::class, 'supplier_id');
    }

    public function inventory()
    {
        return $this->hasMany(Inventory::class, 'product_id');
    }

    public function damageReports()
    {
        return $this->belongsToMany(DamageReport::class, 'damage_reports_product', 'product_id', 'damage_reports_id');
    }

    public function orderItems()
    {
        return $this->hasMany(OrderItem::class, 'product_id');
    }

    public function shipmentItems()
    {
        return $this->hasMany(ShipmentItem::class, 'product_id');
    }

    public function purchaseOrderItems()
    {
        return $this->hasMany(PurchaseOrderItem::class, 'product_id');
    }

    public function returns()
    {
        return $this->belongsToMany(ReturnModel::class, 'product_returns', 'product_id', 'returns_id');
    }
}
