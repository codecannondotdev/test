<?php

namespace App\Models;

use App\Traits\Searchable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LegalHold extends Model
{
    use HasFactory, Searchable;

    protected $table = 'legal_holds';

    protected $guarded = [];

    protected $searchable = [
        'reason',
        'start_date',
        'end_date',
    ];

    protected $casts = [
        'start_date' => 'datetime',
        'end_date' => 'datetime',
    ];

    public function patient()
    {
        return $this->belongsTo(Patient::class, 'patient_id');
    }

    public function documents()
    {
        return $this->hasMany(Document::class, 'legal_hold_id');
    }
}
