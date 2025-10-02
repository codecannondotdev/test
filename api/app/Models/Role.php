<?php

namespace App\Models;

use App\Traits\Searchable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    use HasFactory, Searchable;

    protected $table = 'roles';

    protected $guarded = [];

    protected $searchable = [
        'name',
        'description',
    ];

    protected $casts = [
    ];

    public function employees()
    {
        return $this->hasMany(Employee::class, 'role_id');
    }
}
