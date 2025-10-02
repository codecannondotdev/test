<?php

namespace App\Models;

use App\Traits\Searchable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Billing extends Model
{
    use HasFactory, Searchable;

    protected $table = 'billings';

    protected $guarded = [];

    protected $searchable = [
        'invoice_number',
        'billing_date',
        'total_amount',
        'status',
        'payment_method',
        'insurance_claim_number',
        'notes',
    ];

    protected $casts = [
        'billing_date' => 'datetime',
    ];

    public function patient()
    {
        return $this->belongsTo(Patient::class, 'patient_id');
    }

    public function treatments()
    {
        return $this->belongsToMany(Treatment::class, 'billings_treatments', 'billings_id', 'treatments_id');
    }

    public function medications()
    {
        return $this->belongsToMany(Medication::class, 'billings_medications', 'billings_id', 'medications_id');
    }
}
