<?php

namespace App\Models;

use App\Traits\Searchable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Shift extends Model
{
    use HasFactory, Searchable;

    protected $table = 'shifts';

    protected $guarded = [];

    protected $searchable = [
        'name',
    ];

    protected $casts = [
    ];

    public function assignments()
    {
        return $this->hasMany(ShiftAssignment::class, 'shift_id');
    }

    public function staffRoles()
    {
        return $this->belongsToMany(StaffRole::class, 'shifts_staff_roles', 'shifts_id', 'staff_roles_id');
    }
}
