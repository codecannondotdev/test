<?php

namespace App\Models;

use App\Traits\Searchable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Medication extends Model
{
    use HasFactory, Searchable;

    protected $table = 'medications';

    protected $guarded = [];

    protected $searchable = [
        'name',
        'dosage_form',
        'strength',
    ];

    protected $casts = [
    ];

    public function treatments()
    {
        return $this->belongsToMany(Treatment::class, 'medications_treatments', 'medications_id', 'treatments_id');
    }

    public function billings()
    {
        return $this->belongsToMany(Billing::class, 'billings_medications', 'medications_id', 'billings_id');
    }
}
