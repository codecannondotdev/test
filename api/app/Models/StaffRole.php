<?php

namespace App\Models;

use App\Traits\Searchable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StaffRole extends Model
{
    use HasFactory, Searchable;

    protected $table = 'staff_roles';

    protected $guarded = [];

    protected $searchable = [
        'title',
    ];

    protected $casts = [
    ];

    public function shifts()
    {
        return $this->belongsToMany(Shift::class, 'shifts_staff_roles', 'staff_roles_id', 'shifts_id');
    }
}
