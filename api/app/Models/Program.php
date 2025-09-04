<?php

namespace App\Models;

use App\Traits\Searchable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Program extends Model
{
    use HasFactory, Searchable;

    protected $table = 'programs';

    protected $guarded = [];

    protected $searchable = [
        'name',
        'description',
        'duration_weeks',
    ];

    protected $casts = [
    ];

    public function classes()
    {
        return $this->hasMany(ClassModel::class, 'program_id');
    }

    public function instructor()
    {
        return $this->belongsTo(Instructor::class, 'instructor_id');
    }
}
