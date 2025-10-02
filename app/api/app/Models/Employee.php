<?php

namespace App\Models;

use App\Traits\Searchable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Employee extends Model
{
    use HasFactory, Searchable;

    protected $table = 'employees';

    protected $guarded = [];

    protected $searchable = [
        'first_name',
        'last_name',
        'email',
        'job_title',
    ];

    protected $casts = [
    ];

    public function role()
    {
        return $this->belongsTo(Role::class, 'role_id');
    }

    public function transactions()
    {
        return $this->hasMany(Transaction::class, 'employee_id');
    }

    public function damageReports()
    {
        return $this->hasMany(DamageReport::class, 'employee_id');
    }
}
