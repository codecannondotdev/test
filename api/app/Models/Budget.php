<?php

namespace App\Models;

use App\Traits\Searchable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Budget extends Model
{
    use HasFactory, Searchable;

    protected $table = 'budgets';

    protected $guarded = [];

    protected $searchable = [
        'name',
    ];

    protected $casts = [
        'start_date' => 'datetime',
        'end_date' => 'datetime',
    ];

    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id');
    }

    public function expenses()
    {
        return $this->hasMany(Expense::class, 'budget_id');
    }
}
