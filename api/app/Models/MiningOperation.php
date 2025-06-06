<?php

namespace App\Models;

use App\Traits\Searchable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MiningOperation extends Model
{
    use HasFactory, Searchable;

    protected $table = 'mining_operations';

    protected $guarded = [];

    protected $searchable = [
        'extraction_date',
        'quantity_extracted',
    ];

    protected $casts = [
        'extraction_date' => 'datetime',
    ];

    public function material()
    {
        return $this->belongsTo(Material::class, 'material_id');
    }

    public function mine()
    {
        return $this->belongsTo(Mine::class, 'mine_id');
    }
}
