<?php

namespace App\Models;

use App\Traits\Searchable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TrainingRecord extends Model
{
    use HasFactory, Searchable;

    protected $table = 'training_records';

    protected $guarded = [];

    protected $searchable = [
        'course_name',
        'completion_date',
        'status',
    ];

    protected $casts = [
        'completion_date' => 'datetime',
    ];

    public function nurse()
    {
        return $this->belongsTo(Nurse::class, 'nurse_id');
    }

    public function certification()
    {
        return $this->belongsTo(Certification::class, 'certification_id');
    }
}
