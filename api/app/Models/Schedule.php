<?php

namespace App\Models;

use App\Traits\Searchable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Schedule extends Model
{
    use HasFactory, Searchable;

    protected $table = 'schedules';

    protected $guarded = [];

    protected $searchable = [
        'title',
        'description',
        'start_date',
        'end_date',
    ];

    protected $casts = [
        'start_date' => 'datetime',
        'end_date' => 'datetime',
    ];

    public function sessions()
    {
        return $this->hasMany(Session::class, 'schedule_id');
    }
}
