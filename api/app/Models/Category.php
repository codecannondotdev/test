<?php

namespace App\Models;

use App\Traits\Searchable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory, Searchable;

    protected $table = 'categories';

    protected $guarded = [];

    protected $searchable = [
        'name',
    ];

    protected $casts = [
    ];

    public function products()
    {
        return $this->hasMany(Product::class, 'category_id');
    }
}
