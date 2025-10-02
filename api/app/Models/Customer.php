<?php

namespace App\Models;

use App\Traits\Searchable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    use HasFactory, Searchable;

    protected $table = 'customers';

    protected $guarded = [];

    protected $searchable = [
        'first_name',
        'last_name',
        'email',
        'phone_number',
    ];

    protected $casts = [
    ];

    public function orders()
    {
        return $this->hasMany(Order::class, 'customer_id');
    }

    public function payments()
    {
        return $this->hasMany(Payment::class, 'customer_id');
    }

    public function returns()
    {
        return $this->hasMany(ReturnModel::class, 'customer_id');
    }
}
