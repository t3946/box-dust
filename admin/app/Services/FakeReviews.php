<?php

namespace App\Services;

use Illuminate\Support\Facades\DB;

/**
 * different catalog related functionality
 */
class FakeReviews
{
    public static function get($offset, $limit)
    {
        return DB::table('box_reviews')
            ->leftJoin('box_f_users', 'box_reviews.review_id', '=', 'box_f_users.f_user_id')
            ->limit($limit)
            ->offset($offset)
            ->get();
    }
}
