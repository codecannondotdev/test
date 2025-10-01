<?php

namespace App\Models;

use App\Traits\Searchable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NutritionalPlan extends Model
{
    use HasFactory, Searchable;

    protected $table = 'nutritional_plans';

    protected $guarded = [];

    protected $searchable = [
        'diet_type',
        'calorie_goal',
    ];

    protected $casts = [
    ];

    public function patient()
    {
        return $this->belongsTo(Patient::class, 'patient_id');
    }

    public function dietOrders()
    {
        return $this->hasMany(DietOrder::class, 'nutritional_plan_id');
    }
}
