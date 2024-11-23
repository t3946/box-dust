<?php

namespace App\Models\Box;

use Illuminate\Database\Eloquent\Model;

class Design extends Model
{
    protected $table = 'box_designs';
    public $timestamps = false;
    protected $fillable = ['*'];
}
