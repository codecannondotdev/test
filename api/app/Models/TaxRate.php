<?php

namespace App\Models;

use App\Traits\Searchable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TaxRate extends Model
{
    use HasFactory, Searchable;

    protected $table = 'tax_rates';

    protected $guarded = [];

    protected $searchable = [
        'name',
        'rate',
        'description',
    ];

    protected $casts = [
    ];

    public function billingItems()
    {
        return $this->hasMany(BillingItem::class, 'tax_rate_id');
    }

    public function invoices()
    {
        return $this->hasMany(Invoice::class, 'tax_rate_id');
    }
}
