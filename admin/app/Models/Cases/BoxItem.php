<?php

namespace App\Models\Cases;

use App\Models\CSItem;
use Illuminate\Database\Eloquent\Model;

class BoxItem extends Model
{
    protected $table = 'box_items';
    public $timestamps = false;
    protected $fillable = ['*'];

    public function csItem()
    {
        return $this->belongsTo(CSItem::class, 'cs_item_id', 'id');
    }
}
