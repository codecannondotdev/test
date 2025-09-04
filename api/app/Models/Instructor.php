<?php

namespace App\Models;

use App\Traits\Searchable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Instructor extends Model
{
    use HasFactory, Searchable;

    protected $table = 'instructors';

    protected $guarded = [];

    protected $searchable = [
        'first_name',
        'last_name',
        'email',
    ];

    protected $casts = [
    ];

    public function classes()
    {
        return $this->hasMany(ClassModel::class, 'instructor_id');
    }

    public function programs()
    {
        return $this->hasMany(Program::class, 'instructor_id');
    }
}
