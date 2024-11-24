<?php

namespace App\Models\Box;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Box extends Model
{
    use HasFactory;

    protected $table = 'boxes';

    public function items(): HasMany
    {
        return $this->hasMany(BoxItem::class, 'case_id');
    }

    public function design()
    {
        return $this->belongsTo(Design::class, 'design_id');
    }
}
