<?php

namespace App\Models;

use App\Traits\Searchable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    use HasFactory, Searchable;

    protected $table = 'payments';

    protected $guarded = [];

    protected $searchable = [
        'amount',
        'payment_date',
        'payment_method',
    ];

    protected $casts = [
        'payment_date' => 'datetime',
    ];

    public function member()
    {
        return $this->belongsTo(Member::class, 'member_id');
    }
}
