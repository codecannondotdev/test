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
        'company_name',
        'contact_person',
        'contact_email',
        'rating',
    ];

    protected $casts = [
    ];

    public function purchaseOrders()
    {
        return $this->hasMany(PurchaseOrder::class, 'supplier_id');
    }

    public function materials()
    {
        return $this->belongsToMany(Material::class, 'materials_suppliers', 'suppliers_id', 'materials_id');
    }
}
