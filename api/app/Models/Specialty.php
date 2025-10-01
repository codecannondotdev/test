<?php

namespace App\Models;

use App\Traits\Searchable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Specialty extends Model
{
    use HasFactory, Searchable;

    protected $table = 'specialties';

    protected $guarded = [];

    protected $searchable = [
        'name',
    ];

    protected $casts = [
    ];

    public function doctors()
    {
        return $this->belongsToMany(Doctor::class, 'doctors_specialties', 'specialties_id', 'doctors_id');
    }

    public function departments()
    {
        return $this->belongsToMany(Department::class, 'departments_specialties', 'specialties_id', 'departments_id');
    }
}
