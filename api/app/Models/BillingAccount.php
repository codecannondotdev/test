<?php

namespace App\Models;

use App\Traits\Searchable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BillingAccount extends Model
{
    use HasFactory, Searchable;

    protected $table = 'billing_accounts';

    protected $guarded = [];

    protected $searchable = [
        'account_number',
        'status',
        'balance',
    ];

    protected $casts = [
    ];

    public function patient()
    {
        return $this->belongsTo(Patient::class, 'patient_id');
    }

    public function invoices()
    {
        return $this->hasMany(Invoice::class, 'billing_account_id');
    }

    public function payments()
    {
        return $this->hasMany(Payment::class, 'billing_account_id');
    }

    public function insuranceClaims()
    {
        return $this->hasMany(InsuranceClaim::class, 'billing_account_id');
    }
}
