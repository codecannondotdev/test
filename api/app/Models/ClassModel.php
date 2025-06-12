<?php

namespace App\Models;

use App\Traits\Searchable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ClassModel extends Model
{
    use HasFactory, Searchable;

    protected $table = 'classes';

    protected $guarded = [];

    protected $searchable = [
        'name',
        'description',
        'difficulty_level',
        'duration',
    ];

    protected $casts = [
    ];

    public function trainer()
    {
        return $this->belongsTo(Trainer::class, 'trainer_id');
    }

    public function sessions()
    {
        return $this->hasMany(Session::class, 'fitness_class_id');
    }
}
