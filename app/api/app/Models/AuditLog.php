<?php

namespace App\Models;

use App\Traits\Searchable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AuditLog extends Model
{
    use HasFactory, Searchable;

    protected $table = 'audit_logs';

    protected $guarded = [];

    protected $searchable = [
        'event_type',
        'performed_at',
    ];

    protected $casts = [
        'performed_at' => 'datetime',
    ];

    public function affectedRecord()
    {
        return $this->belongsTo(Document::class, 'affected_record_id');
    }
}
