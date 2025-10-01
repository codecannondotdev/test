<?php

namespace App\Models;

use App\Traits\Searchable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BloodBank extends Model
{
    use HasFactory, Searchable;

    protected $table = 'blood_banks';

    protected $guarded = [];

    protected $searchable = [
        'unit_number',
        'blood_type',
        'status',
    ];

    protected $casts = [
    ];

    public function donors()
    {
        return $this->belongsToMany(Donor::class, 'blood_banks_donors', 'blood_banks_id', 'donors_id');
    }

    public function transfusions()
    {
        return $this->hasMany(Transfusion::class, 'blood_bank_id');
    }
}
