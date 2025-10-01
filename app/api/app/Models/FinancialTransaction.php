<?php

namespace App\Models;

use App\Traits\Searchable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FinancialTransaction extends Model
{
    use HasFactory, Searchable;

    protected $table = 'financial_transactions';

    protected $guarded = [];

    protected $searchable = [
        'date',
        'amount',
        'description',
    ];

    protected $casts = [
        'date' => 'datetime',
    ];

    public function ledgerAccount()
    {
        return $this->belongsTo(LedgerAccount::class, 'ledger_account_id');
    }

    public function payment()
    {
        return $this->belongsTo(Payment::class, 'payment_id');
    }

    public function claimAdjustment()
    {
        return $this->belongsTo(ClaimAdjustment::class, 'claim_adjustment_id');
    }
}
