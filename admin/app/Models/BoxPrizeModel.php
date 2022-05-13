<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BoxPrizeModel extends Model
{
    use HasFactory;

    protected $primaryKey = 'prize_id';
    protected $table = 'box_prizes';
}
