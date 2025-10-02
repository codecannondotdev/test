<?php

namespace App\Models;

use App\Traits\Searchable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Karta extends Model
{
    use HasFactory, Searchable;

    protected $table = 'kartas';

    protected $guarded = [];

    protected $searchable = [
    ];

    protected $casts = [
    ];

    public function predal()
    {
        return $this->belongsTo(Predal::class, 'predal_id');
    }
}
