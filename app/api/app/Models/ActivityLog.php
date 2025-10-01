<?php

namespace App\Models;

use App\Traits\Searchable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ActivityLog extends Model
{
    use HasFactory, Searchable;

    protected $table = 'activity_logs';

    protected $guarded = [];

    protected $searchable = [
        'action',
        'timestamp',
        'details',
    ];

    protected $casts = [
        'timestamp' => 'datetime',
    ];

    public function relatedModel()
    {
        return $this->belongsTo(Document::class, 'related_model_id');
    }
}
