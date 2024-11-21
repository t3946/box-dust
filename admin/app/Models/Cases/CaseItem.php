<?php

namespace App\Models\Cases;

use App\Models\CSItem;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class CaseItem extends Model
{
    protected $table = 'case_items';

    public function csItem() {
        return $this->belongsTo(CSItem::class, 'cs_item_id', 'id');
    }
}
