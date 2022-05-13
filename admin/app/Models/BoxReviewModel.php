<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BoxReviewModel extends Model
{
    use HasFactory;

    protected $primaryKey = 'review_id';
    protected $table = 'box_reviews';
}
