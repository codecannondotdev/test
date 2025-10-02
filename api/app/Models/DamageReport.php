<?php

namespace App\Models;

use App\Traits\Searchable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DamageReport extends Model
{
    use HasFactory, Searchable;

    protected $table = 'damage_reports';

    protected $guarded = [];

    protected $searchable = [
        'report_date',
        'description',
        'severity',
    ];

    protected $casts = [
        'report_date' => 'datetime',
    ];

    public function product()
    {
        return $this->belongsToMany(Product::class, 'damage_reports_product', 'damage_reports_id', 'product_id');
    }

    public function employee()
    {
        return $this->belongsTo(Employee::class, 'employee_id');
    }
}
