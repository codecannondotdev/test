<?php

namespace App\Models;

use App\Traits\Searchable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DietOrder extends Model
{
    use HasFactory, Searchable;

    protected $table = 'diet_orders';

    protected $guarded = [];

    protected $searchable = [
        'meal_type',
        'start_date',
        'end_date',
    ];

    protected $casts = [
        'start_date' => 'datetime',
        'end_date' => 'datetime',
    ];

    public function patient()
    {
        return $this->belongsTo(Patient::class, 'patient_id');
    }

    public function nutritionalPlan()
    {
        return $this->belongsTo(NutritionalPlan::class, 'nutritional_plan_id');
    }
}
