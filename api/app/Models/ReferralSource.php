<?php

namespace App\Models;

use App\Traits\Searchable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ReferralSource extends Model
{
    use HasFactory, Searchable;

    protected $table = 'referral_sources';

    protected $guarded = [];

    protected $searchable = [
        'name',
        'type',
    ];

    protected $casts = [
    ];

    public function referrals()
    {
        return $this->hasMany(Referral::class, 'referral_source_id');
    }

    public function appointments()
    {
        return $this->hasMany(Appointment::class, 'referral_source_id');
    }
}
