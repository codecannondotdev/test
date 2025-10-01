<?php

namespace App\Models;

use App\Traits\Searchable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MedicalRecord extends Model
{
    use HasFactory, Searchable;

    protected $table = 'medical_records';

    protected $guarded = [];

    protected $searchable = [
        'title',
        'date',
    ];

    protected $casts = [
        'date' => 'datetime',
    ];

    public function patient()
    {
        return $this->belongsTo(Patient::class, 'patient_id');
    }

    public function attachments()
    {
        return $this->hasMany(Document::class, 'medical_record_id');
    }

    public function notes()
    {
        return $this->hasMany(Note::class, 'medical_record_id');
    }
}
