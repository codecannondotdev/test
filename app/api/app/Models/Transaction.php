<?php

namespace App\Models;

use App\Traits\Searchable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    use HasFactory, Searchable;

    protected $table = 'transactions';

    protected $guarded = [];

    protected $searchable = [
        'transaction_date',
        'amount',
        'type',
    ];

    protected $casts = [
        'transaction_date' => 'datetime',
    ];

    public function order()
    {
        return $this->belongsToMany(Order::class, 'order_transactions', 'transactions_id', 'order_id');
    }

    public function employee()
    {
        return $this->belongsTo(Employee::class, 'employee_id');
    }
}
