<?php

namespace App\Models;

use App\Traits\Searchable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HL7Message extends Model
{
    use HasFactory, Searchable;

    protected $table = 'hl7_messages';

    protected $guarded = [];

    protected $searchable = [
        'message_type',
        'received_at',
    ];

    protected $casts = [
        'received_at' => 'datetime',
    ];

    public function integration()
    {
        return $this->belongsTo(Integration::class, 'integration_id');
    }
}
