<?php

namespace App\Models;

use App\Traits\Searchable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Bed extends Model
{
    use HasFactory, Searchable;

    protected $table = 'beds';

    protected $guarded = [];

    protected $searchable = [
        'bed_number',
        'type',
        'status',
    ];

    protected $casts = [
    ];

    public function ward()
    {
        return $this->belongsTo(Ward::class, 'ward_id');
    }

    public function admissions()
    {
        return $this->hasMany(Admission::class, 'bed_id');
    }
}
