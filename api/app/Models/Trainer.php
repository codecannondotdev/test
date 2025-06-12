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
        'specialty',
        'email',
    ];

    protected $casts = [
    ];

    public function sessions()
    {
        return $this->hasMany(Session::class, 'trainer_id');
    }

    public function classes()
    {
        return $this->hasMany(ClassModel::class, 'trainer_id');
    }
}
