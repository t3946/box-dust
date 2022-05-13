<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BoxItemModel extends Model
{
    use HasFactory;

    protected $primaryKey = 'item_id';
    protected $table = 'box_items';
    protected $fillable = ['name'];
}
