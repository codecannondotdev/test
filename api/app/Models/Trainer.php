<?php

namespace App\Models;

use App\Traits\Searchable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Trainer extends Model
{
    use HasFactory, Searchable;

    protected $table = 'trainers';

    protected $guarded = [];

    protected $searchable = [
        'first_name',
        'last_name',
        'email',
        'specialty',
    ];

    protected $casts = [
    ];

    public function classes()
    {
        return $this->hasMany(FitnessClass::class, 'trainer_id');
    }
}
