<?php

namespace App\Models;

use App\Traits\Searchable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ClaimAdjustment extends Model
{
    use HasFactory, Searchable;

    protected $table = 'claim_adjustments';

    protected $guarded = [];

    protected $searchable = [
        'adjustment_code',
        'amount_adjusted',
        'reason',
    ];

    protected $casts = [
    ];

    public function insuranceClaim()
    {
        return $this->belongsTo(InsuranceClaim::class, 'insurance_claim_id');
    }

    public function financialTransaction()
    {
        return $this->hasOne(FinancialTransaction::class, 'claim_adjustment_id');
    }
}
