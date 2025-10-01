<?php

namespace App\Models;

use App\Traits\Searchable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Queue extends Model
{
    use HasFactory, Searchable;

    protected $table = 'queues';

    protected $guarded = [];

    protected $searchable = [
        'name',
        'location',
    ];

    protected $casts = [
    ];

    public function waitingEntries()
    {
        return $this->hasMany(WaitingList::class, 'queue_id');
    }

    public function appointments()
    {
        return $this->hasMany(Appointment::class, 'queue_id');
    }
}
