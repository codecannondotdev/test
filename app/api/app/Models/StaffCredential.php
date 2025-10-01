<?php

namespace App\Models;

use App\Traits\Searchable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StaffCredential extends Model
{
    use HasFactory, Searchable;

    protected $table = 'staff_credentials';

    protected $guarded = [];

    protected $searchable = [
        'type',
        'number',
        'issued_date',
        'expiry_date',
    ];

    protected $casts = [
        'issued_date' => 'datetime',
        'expiry_date' => 'datetime',
    ];

    public function alerts()
    {
        return $this->hasMany(Notification::class, 'credential_id');
    }
}
