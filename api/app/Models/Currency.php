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
        'name',
    ];

    protected $casts = [
    ];

    public function expenses()
    {
        return $this->hasMany(Expense::class, 'currency_id');
    }
}
