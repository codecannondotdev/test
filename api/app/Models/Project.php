<?php

namespace App\Models;

use App\Traits\Searchable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory, Searchable;

    protected $table = 'projects';

    protected $guarded = [];

    protected $searchable = [
        'name',
        'code',
        'start_date',
        'end_date',
    ];

    protected $casts = [
        'start_date' => 'datetime',
        'end_date' => 'datetime',
    ];

    public function expenses()
    {
        return $this->hasMany(Expense::class, 'project_id');
    }
}
