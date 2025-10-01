<?php

namespace App\Models;

use App\Traits\Searchable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class APIKey extends Model
{
    use HasFactory, Searchable;

    protected $table = '_api_keys';

    protected $guarded = [];

    protected $searchable = [
        'name',
        'expires_at',
    ];

    protected $casts = [
        'expires_at' => 'datetime',
    ];

    public function integrations()
    {
        return $this->hasMany(Integration::class, 'api_key_id');
    }
}
