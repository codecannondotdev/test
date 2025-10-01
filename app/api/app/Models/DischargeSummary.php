<?php

namespace App\Models;

use App\Traits\Searchable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DischargeSummary extends Model
{
    use HasFactory, Searchable;

    protected $table = 'discharge_summaries';

    protected $guarded = [];

    protected $searchable = [
    ];

    protected $casts = [
    ];

    public function discharge()
    {
        return $this->belongsTo(Discharge::class, 'discharge_id');
    }
}
