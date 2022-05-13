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
            ->leftJoin('box_fake_users', 'box_reviews.review_id', '=', 'box_fake_users.fake_user_id')
            ->limit($limit)
            ->offset($offset)
            ->get();
    }
}
