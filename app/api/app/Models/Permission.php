<?php

namespace App\Models;

use App\Traits\Searchable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Permission extends Model
{
    use HasFactory, Searchable;

    protected $table = 'permissions';

    protected $guarded = [];

    protected $searchable = [
        'name',
        'description',
    ];

    protected $casts = [
    ];

    public function roles()
    {
        return $this->belongsToMany(Role::class, 'permissions_roles', 'permissions_id', 'roles_id');
    }
}
