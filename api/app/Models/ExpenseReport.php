<?php

namespace App\Models;

use App\Traits\Searchable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ExpenseReport extends Model
{
    use HasFactory, Searchable;

    protected $table = 'expense_reports';

    protected $guarded = [];

    protected $searchable = [
        'title',
        'currency',
        'status',
    ];

    protected $casts = [
        'submitted_at' => 'datetime',
    ];

    public function reportedExpenses()
    {
        return $this->belongsToMany(Expense::class, 'expense_reports_reported_expenses', 'expense_reports_id', 'reported_expenses_id');
    }

    public function expenses()
    {
        return $this->belongsToMany(Expense::class, 'expenses_reports', 'reports_id', 'expenses_id');
    }
}
