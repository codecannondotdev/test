<?php

namespace App\Models;

use App\Traits\Searchable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Integration extends Model
{
    use HasFactory, Searchable;

    protected $table = 'integrations';

    protected $guarded = [];

    protected $searchable = [
        'name',
        'type',
        'endpoint',
    ];

    protected $casts = [
    ];

    public function apiKey()
    {
        return $this->belongsTo(APIKey::class, 'api_key_id');
    }

    public function hl7Messages()
    {
        return $this->hasMany(HL7Message::class, 'integration_id');
    }

    public function dicomInstances()
    {
        return $this->hasMany(DICOMInstance::class, 'integration_id');
    }
}
