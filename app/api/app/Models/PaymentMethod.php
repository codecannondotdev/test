<?php

namespace App\Models;

use App\Traits\Searchable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PaymentMethod extends Model
{
    use HasFactory, Searchable;

    protected $table = 'payment_methods';

    protected $guarded = [];

    protected $searchable = [
        'name',
    ];

    protected $casts = [
    ];

    public function payments()
    {
        return $this->hasMany(Payment::class, 'payment_method_id');
    }
}
