<?php

namespace App\Models\Cases;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Cases extends Model
{
    use HasFactory;

    protected $table = 'cases';

    public function items(): HasMany
    {
        return $this->hasMany(CaseItem::class, 'case_id');
    }
}
