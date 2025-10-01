<?php

namespace App\Models;

use App\Traits\Searchable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Notification extends Model
{
    use HasFactory, Searchable;

    protected $table = 'notifications';

    protected $guarded = [];

    protected $searchable = [
        'title',
        'body',
    ];

    protected $casts = [
        'sent_at' => 'datetime',
        'read' => 'boolean',
    ];

    public function relatedPatient()
    {
        return $this->belongsTo(Patient::class, 'related_patient_id');
    }

    public function allergy()
    {
        return $this->belongsTo(Allergy::class, 'allergy_id');
    }

    public function contact()
    {
        return $this->belongsTo(FamilyContact::class, 'contact_id');
    }

    public function credential()
    {
        return $this->belongsTo(StaffCredential::class, 'credential_id');
    }
}
