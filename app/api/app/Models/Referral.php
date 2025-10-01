<?php

namespace App\Models;

use App\Traits\Searchable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Referral extends Model
{
    use HasFactory, Searchable;

    protected $table = 'referrals';

    protected $guarded = [];

    protected $searchable = [
        'referral_source',
        'reason',
        'date',
    ];

    protected $casts = [
        'date' => 'datetime',
    ];

    public function patient()
    {
        return $this->belongsTo(Patient::class, 'patient_id');
    }

    public function referringProvider()
    {
        return $this->belongsTo(Doctor::class, 'referring_provider_id');
    }

    public function receivingProvider()
    {
        return $this->belongsTo(Doctor::class, 'receiving_provider_id');
    }

    public function referralSource()
    {
        return $this->belongsTo(ReferralSource::class, 'referral_source_id');
    }
}
