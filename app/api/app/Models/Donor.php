<?php

namespace App\Models;

use App\Traits\Searchable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Donor extends Model
{
    use HasFactory, Searchable;

    protected $table = 'donors';

    protected $guarded = [];

    protected $searchable = [
        'name',
        'donor_identifier',
        'blood_type',
    ];

    protected $casts = [
    ];

    public function donationEvents()
    {
        return $this->hasMany(ProcurementOrder::class, 'donor_id');
    }

    public function bloodBanks()
    {
        return $this->belongsToMany(BloodBank::class, 'blood_banks_donors', 'donors_id', 'blood_banks_id');
    }
}
