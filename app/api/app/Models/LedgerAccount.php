<?php

namespace App\Models;

use App\Traits\Searchable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LedgerAccount extends Model
{
    use HasFactory, Searchable;

    protected $table = 'ledger_accounts';

    protected $guarded = [];

    protected $searchable = [
        'account_number',
        'name',
        'type',
    ];

    protected $casts = [
    ];

    public function financialTransactions()
    {
        return $this->hasMany(FinancialTransaction::class, 'ledger_account_id');
    }
}
