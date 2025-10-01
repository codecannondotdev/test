<?php

namespace App\Models;

use App\Traits\Searchable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MedicationStock extends Model
{
    use HasFactory, Searchable;

    protected $table = 'medication_stocks';

    protected $guarded = [];

    protected $searchable = [
        'batch_number',
        'expiry_date',
        'quantity_available',
    ];

    protected $casts = [
        'expiry_date' => 'datetime',
    ];

    public function procurements()
    {
        return $this->hasMany(ProcurementOrder::class, 'stock_id');
    }
}
