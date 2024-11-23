<?php

namespace App\Services;

use App\Models\BoxFakeUserModel;
use App\Models\Box\Box;
use App\Models\CSItem;
use Carbon\Carbon;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Facades\Image;

/**
 * different prizes related functionality
 */
class PrizesService
{
    /**
     * get number of seconds passed from month begin
     * @param Carbon $date
     * @return int
     */
    private static function getMonthSecond(Carbon $date): int
    {
        return (Carbon::now()->day - 1) * 24 * 60
            + Carbon::now()->hour * 60 * 60
            + Carbon::now()->minute * 60
            + Carbon::now()->second;
    }

    public static function getHistory(): array
    {
        define('HISTORY_SIZE', 20);

        $history = [
            'users' => [],
            'items' => [],
        ];
        $today = Carbon::today();
        $second = self::getMonthSecond($today);
        $fake_users = BoxFakeUserModel::all();
        $items = CSItem::all();
        /**
         * binary power that need to present max index of fake_users or items array item
         */
        $binary_power_ceil = 1;
        $max_index = max($fake_users->count(), $items->count());
        while ($max_index >= 16) {
            ++$binary_power_ceil;
            $max_index /= 16;
        }


        for ($i = 1; $i <= HISTORY_SIZE; $i++) {
            //get last second previous day
            if ($second === 0) {
                $second = ($today->subDays($today->day)->day + 1) * 24 * 60 * 60;
            }

            $time_hash = md5($second);

            //get random time based user
            $i_user = hexdec(substr($time_hash, 0, $binary_power_ceil)) % $fake_users->count();
            $history['users'][] = $fake_users[$i_user];

            //get random time based item
            $i_item = hexdec(substr($time_hash, 0, $binary_power_ceil)) % $items->count();
            $history['items'][] = $fake_users[$i_item];

            --$second;
        }

        return $history;
    }

    /**
     * get public storage image size
    */
    private static function getImageSize ($path) {
        $file = Storage::disk('public')->get($path);

        $img = Image::make($file);

        return [
            'width' => $img->width(),
            'height' => $img->height(),
        ];
    }

    /**
     * 5 last top prizes
     * @return Object
     */
    public static function getLastTopPrizes(): array
    {
        $prizes_list = [];

        for ($i = 1; $i <= 5; $i++) {
            $seed = date('H') * date('j') + $i;
            $item = CSItem::all()->where('demo', 1)->shuffle($seed)->first();
            $box = Box::all()->where('id', $item->box_id)->first();
            $user = BoxFakeUserModel::all()->shuffle($seed)->first();

            $prizes_list[] = [
                'item' => $item,
                'box' => $box,
                'user' => $user,
                'image' => self::getImageSize($item['image']),
            ];
        }

        return $prizes_list;
    }
}
