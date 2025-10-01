<?php

namespace App\Models;

use App\Traits\Searchable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Procedure extends Model
{
    use HasFactory, Searchable;

    protected $table = 'procedures';

    protected $guarded = [];

    protected $searchable = [
        'name',
        'description',
        'duration',
    ];

    protected $casts = [
    ];

    public function treatment()
    {
        return $this->belongsTo(Treatment::class, 'treatment_id');
    }

    public function surgeries()
    {
        return $this->belongsToMany(Surgery::class, 'procedures_surgeries', 'procedures_id', 'surgeries_id');
    }

    public function consentForms()
    {
        return $this->hasMany(ConsentForm::class, 'procedure_id');
    }
}
