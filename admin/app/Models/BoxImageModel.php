<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BoxImageModel extends Model
{
    use HasFactory;

    protected $primaryKey = 'image_id';
    protected $table = 'box_images';
}
