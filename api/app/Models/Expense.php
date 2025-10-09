<?php

namespace App\Models;

use App\Traits\Searchable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Expense extends Model
{
    use HasFactory, Searchable;

    protected $table = 'expenses';

    protected $guarded = [];

    protected $searchable = [
        'title',
        'amount',
        'date_incurred',
        'status',
        'payment_method',
    ];

    protected $casts = [
        'date_incurred' => 'datetime',
        'payment_date' => 'datetime',
        'is_recurring' => 'boolean',
        'receipt_attached' => 'boolean',
    ];

    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id');
    }

    public function vendor()
    {
        return $this->belongsTo(Vendor::class, 'vendor_id');
    }

    public function project()
    {
        return $this->belongsTo(Project::class, 'project_id');
    }

    public function budget()
    {
        return $this->belongsTo(Budget::class, 'budget_id');
    }

    public function receipts()
    {
        return $this->hasMany(Receipt::class, 'expense_id');
    }

    public function tags()
    {
        return $this->belongsToMany(Tag::class, 'expenses_tags', 'expenses_id', 'tags_id');
    }

    public function reports()
    {
        return $this->belongsToMany(ExpenseReport::class, 'expenses_reports', 'expenses_id', 'reports_id');
    }

    public function expenseReports()
    {
        return $this->belongsToMany(ExpenseReport::class, 'expense_reports_reported_expenses', 'reported_expenses_id', 'expense_reports_id');
    }

    public function currency()
    {
        return $this->belongsTo(Currency::class, 'currency_id');
    }
}
