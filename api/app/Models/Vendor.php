<?php

namespace App\Models;

use App\Traits\Searchable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Vendor extends Model
{
    use HasFactory, Searchable;

    protected $table = 'vendors';

    protected $guarded = [];

    protected $searchable = [
        'name',
        'contact_info',
        'address',
        'default_payment_terms',
    ];

    protected $casts = [
    ];

    public function expenses()
    {
        return $this->hasMany(Expense::class, 'vendor_id');
    }
}
