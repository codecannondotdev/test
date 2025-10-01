<?php

namespace App\Models;

use App\Traits\Searchable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Allergy extends Model
{
    use HasFactory, Searchable;

    protected $table = 'allergies';

    protected $guarded = [];

    protected $searchable = [
        'allergen',
        'reaction',
        'severity',
    ];

    protected $casts = [
    ];

    public function patient()
    {
        return $this->belongsTo(Patient::class, 'patient_id');
    }

    public function alerts()
    {
        return $this->hasMany(Notification::class, 'allergy_id');
    }
}
