<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Skin extends Model
{
    protected $table = 'cs_items';

    protected $fillable = [
        'type',
        'name',
        'quality',
        'name_ru',
        'price',
        'stattrak',
        'category',
        'rarity',
        'popularity',
        'image',
    ];

    public $timestamps = false;
}
