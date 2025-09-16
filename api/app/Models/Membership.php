<?php

namespace App\Models;

use App\Traits\Searchable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Membership extends Model
{
    use HasFactory, Searchable;

    protected $table = 'memberships';

    protected $guarded = [];

    protected $searchable = [
        'plan_name',
        'price',
    ];

    protected $casts = [
    ];

    public function member()
    {
        return $this->belongsTo(Asdfasdfasd::class, 'member_id');
    }
}
