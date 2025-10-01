<?php

namespace App\Models;

use App\Traits\Searchable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FamilyContact extends Model
{
    use HasFactory, Searchable;

    protected $table = 'family_contacts';

    protected $guarded = [];

    protected $searchable = [
        'name',
        'relationship',
        'phone',
        'email',
    ];

    protected $casts = [
    ];

    public function patient()
    {
        return $this->belongsTo(Patient::class, 'patient_id');
    }

    public function notifications()
    {
        return $this->hasMany(Notification::class, 'contact_id');
    }
}
