<?php

namespace App\Models;

use App\Traits\Searchable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Currency extends Model
{
    use HasFactory, Searchable;

    protected $table = 'currencies';

    protected $guarded = [];

    protected $searchable = [
        'code',
        'symbol',
        'name',
    ];

    protected $casts = [
    ];

    public function invoices()
    {
        return $this->hasMany(Invoice::class, 'currency_id');
    }

    public function payments()
    {
        return $this->hasMany(Payment::class, 'currency_id');
    }
}
