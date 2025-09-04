<?php

namespace App\Models;

use App\Traits\Searchable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Equipment extends Model
{
    use HasFactory, Searchable;

    protected $table = 'equipments';

    protected $guarded = [];

    protected $searchable = [
        'name',
        'description',
        'purchase_date',
    ];

    protected $casts = [
        'purchase_date' => 'datetime',
    ];

    public function studio()
    {
        return $this->belongsTo(Studio::class, 'studio_id');
    }
}
