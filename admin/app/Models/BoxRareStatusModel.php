<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BoxRareStatusModel extends Model
{
    use HasFactory;

    protected $primaryKey = 'rare_status_id';
    protected $table = 'box_rare_statuses';
}
