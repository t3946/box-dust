<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BoxCategoryModel extends Model
{
    use HasFactory;

    protected $primaryKey = 'category_id';
    protected $table = 'box_categories';
}
