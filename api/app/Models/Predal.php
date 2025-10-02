<?php

namespace App\Models;

use App\Traits\Searchable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Predal extends Model
{
    use HasFactory, Searchable;

    protected $table = 'predals';

    protected $guarded = [];

    protected $searchable = [
    ];

    protected $casts = [
    ];

    public function kartas()
    {
        return $this->hasMany(Karta::class, 'predal_id');
    }
}
