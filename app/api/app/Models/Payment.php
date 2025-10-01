<?php

namespace App\Models;

use App\Traits\Searchable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    use HasFactory, Searchable;

    protected $table = 'payments';

    protected $guarded = [];

    protected $searchable = [
        'amount',
        'date',
        'method',
        'reference',
    ];

    protected $casts = [
        'date' => 'datetime',
    ];

    public function billingAccount()
    {
        return $this->belongsTo(BillingAccount::class, 'billing_account_id');
    }

    public function invoice()
    {
        return $this->belongsTo(Invoice::class, 'invoice_id');
    }

    public function paymentMethod()
    {
        return $this->belongsTo(PaymentMethod::class, 'payment_method_id');
    }

    public function financialTransaction()
    {
        return $this->hasOne(FinancialTransaction::class, 'payment_id');
    }

    public function currency()
    {
        return $this->belongsTo(Currency::class, 'currency_id');
    }
}
