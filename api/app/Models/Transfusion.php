<?php

namespace App\Models;

use App\Traits\Searchable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transfusion extends Model
{
    use HasFactory, Searchable;

    protected $table = 'transfusions';

    protected $guarded = [];

    protected $searchable = [
        'transfusion_date',
        'volume',
        'reaction_observed',
    ];

    protected $casts = [
        'transfusion_date' => 'datetime',
    ];

    public function patient()
    {
        return $this->belongsTo(Patient::class, 'patient_id');
    }

    public function bloodBank()
    {
        return $this->belongsTo(BloodBank::class, 'blood_bank_id');
    }

    public function bloodProduct()
    {
        return $this->belongsTo(BloodProduct::class, 'blood_product_id');
    }
}
