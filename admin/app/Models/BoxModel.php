<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BoxModel extends Model
{
    use HasFactory;

    protected $primaryKey = 'box_id';
    protected $table = 'box_boxes';
}
