<?php

namespace App\Models;

use App\Traits\Searchable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tag extends Model
{
    use HasFactory, Searchable;

    protected $table = 'tags';

    protected $guarded = [];

    protected $searchable = [
        'name',
    ];

    protected $casts = [
    ];

    public function expenses()
    {
        return $this->belongsToMany(Expense::class, 'expenses_tags', 'tags_id', 'expenses_id');
    }
}
