<?php

namespace App\Models;

use App\Traits\Searchable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Invoice extends Model
{
    use HasFactory, Searchable;

    protected $table = 'invoices';

    protected $guarded = [];

    protected $searchable = [
        'invoice_number',
        'issue_date',
        'due_date',
        'total_amount',
        'status',
    ];

    protected $casts = [
        'issue_date' => 'datetime',
        'due_date' => 'datetime',
    ];

    public function billingAccount()
    {
        return $this->belongsTo(BillingAccount::class, 'billing_account_id');
    }

    public function items()
    {
        return $this->hasMany(BillingItem::class, 'invoice_id');
    }

    public function payments()
    {
        return $this->hasMany(Payment::class, 'invoice_id');
    }

    public function insuranceClaim()
    {
        return $this->belongsTo(InsuranceClaim::class, 'insurance_claim_id');
    }

    public function currency()
    {
        return $this->belongsTo(Currency::class, 'currency_id');
    }

    public function taxRate()
    {
        return $this->belongsTo(TaxRate::class, 'tax_rate_id');
    }
}
