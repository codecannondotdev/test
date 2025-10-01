<?php

namespace App\Models;

use App\Traits\Searchable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PharmacyOrder extends Model
{
    use HasFactory, Searchable;

    protected $table = 'pharmacy_orders';

    protected $guarded = [];

    protected $searchable = [
        'order_date',
        'status',
        'pickup_location',
    ];

    protected $casts = [
        'order_date' => 'datetime',
    ];

    public function prescription()
    {
        return $this->belongsTo(Prescription::class, 'prescription_id');
    }

    public function medications()
    {
        return $this->belongsToMany(Medication::class, 'medications_pharmacy_orders', 'pharmacy_orders_id', 'medications_id');
    }
}
