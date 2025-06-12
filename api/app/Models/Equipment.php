<?php

namespace App\Models;

use App\Traits\Searchable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Equipment extends Model
{
    use HasFactory, Searchable;

    protected $table = 'equipment';

    protected $guarded = [];

    protected $searchable = [
        'name',
        'description',
        'status',
    ];

    protected $casts = [
    ];

    public function facility()
    {
        return $this->belongsTo(Facility::class, 'facility_id');
    }
}
