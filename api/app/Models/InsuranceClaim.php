<?php

namespace App\Models;

use App\Traits\Searchable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InsuranceClaim extends Model
{
    use HasFactory, Searchable;

    protected $table = 'insurance_claims';

    protected $guarded = [];

    protected $searchable = [
        'claim_number',
        'submission_date',
        'status',
    ];

    protected $casts = [
        'submission_date' => 'datetime',
    ];

    public function insurance()
    {
        return $this->belongsTo(Insurance::class, 'insurance_id');
    }

    public function billingAccount()
    {
        return $this->belongsTo(BillingAccount::class, 'billing_account_id');
    }

    public function invoices()
    {
        return $this->hasMany(Invoice::class, 'insurance_claim_id');
    }

    public function claimAdjustments()
    {
        return $this->hasMany(ClaimAdjustment::class, 'insurance_claim_id');
    }
}
