<?php

namespace App\Models;

use App\Traits\Searchable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Certification extends Model
{
    use HasFactory, Searchable;

    protected $table = 'certifications';

    protected $guarded = [];

    protected $searchable = [
        'name',
        'authority',
        'date_awarded',
    ];

    protected $casts = [
        'date_awarded' => 'datetime',
    ];

    public function trainingRecords()
    {
        return $this->hasMany(TrainingRecord::class, 'certification_id');
    }
}
