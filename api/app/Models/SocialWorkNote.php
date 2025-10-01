<?php

namespace App\Models;

use App\Traits\Searchable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SocialWorkNote extends Model
{
    use HasFactory, Searchable;

    protected $table = 'social_work_notes';

    protected $guarded = [];

    protected $searchable = [
        'summary',
    ];

    protected $casts = [
    ];

    public function patient()
    {
        return $this->belongsTo(Patient::class, 'patient_id');
    }
}
