<?php

namespace App\Models;

use App\Traits\Searchable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sample extends Model
{
    use HasFactory, Searchable;

    protected $table = 'samples';

    protected $guarded = [];

    protected $searchable = [
        'sample_type',
        'collection_time',
        'condition',
    ];

    protected $casts = [
        'collection_time' => 'datetime',
    ];

    public function specimen()
    {
        return $this->belongsTo(Specimen::class, 'specimen_id');
    }
}
