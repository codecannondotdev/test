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
    ];

    protected $casts = [
    ];

    public function permissions()
    {
        return $this->belongsToMany(Permission::class, 'permissions_roles', 'roles_id', 'permissions_id');
    }
}
