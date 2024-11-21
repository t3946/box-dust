<?php

namespace App\Services;

use Illuminate\Support\Facades\Storage;
use App\Models\BoxFakeUserModel;
use App\Models\Cases;
use App\Models\BoxItemModel;

/**
 * different catalog related functionality
 */
class FakeHistory
{
    private const FILE_NAME = 'fake-history.json';

    public static function generate()
    {
        $history = [
            'map' => [
                'winners' => [],
            ],
            'library' => [
                'winners' => [],
            ],
            'created' => time(),
        ];

        $prizes_number = 300;

        //сгенерировать данные о победителях
        $fake_users = BoxFakeUserModel::all();
        $total_users = count($fake_users);
        $last_winner = null;

        for ($i = 0; $i < $prizes_number; $i++) {
            $winner = ($last_winner && (mt_rand(0, 100) > 75)) ? $last_winner : $fake_users[mt_rand(0, $total_users - 1)];
            $history['map']['winners'][] = $winner->f_user_id;

            if (!isset($history['library']['winners'][$winner->f_user_id])) {
                $history['library']['winners'][$winner->f_user_id] = [
                    'name' => $winner->name,
                ];
            }

            $last_winner = $winner;
        }

        //сгенерировать данные о коробках и продуктах
        $all_boxes = Cases::all();
        $total_boxes = count($all_boxes);
        $boxes = [];
        $prev_box = null;
        $items = [];

        // get items from db
        for ($i = 0; $i < $total_boxes; $i++) {
            $box = $all_boxes[$i];
            $box_id = $box->box_id;
            $box_items = BoxItemModel::where('box_id', $box_id)->get();

            // отсеять пустые коробки
            if (count($box_items) > 0) {
                $items[$box_id] = $box_items;
                array_push($boxes, $box);
            }
        }

        $total_boxes = count($boxes);

        for ($i = 0; $i < $prizes_number; $i++) {
            $random_box = $boxes[mt_rand(0, $total_boxes - 1)];

            if ($i > 0) {
                $prev_winner = $history['map']['winners'][$i - 1];
                $current_winner = $history['map']['winners'][$i];

                if ($current_winner === $prev_winner) {
                    $box = $prev_box;
                } else {
                    $box = $random_box;
                }
            } else {
                $box = $random_box;
            }

            // save box
            $history['map']['cases'][] = $box->box_id;

            if (!isset($history['library']['cases'][$box->box_id])) {
                $history['library']['cases'][$box->box_id] = [
                    'name' => $box['name'],
                    'image' => '/images/box-default.png',//$box->small_image_id,
                ];
            }

            //save item
            $box_items = $items[$box->box_id];
            $total_box_items = count($box_items);
            $dummy_item = new BoxItemModel(['name' => 'dummy']);
            $item = $total_box_items > 0 ? $box_items[mt_rand(0, $total_box_items - 1)] : $dummy_item;
            $item_id = $item->item_id ?? 0;
            $history['map']['items'][] = $item_id;

            if (!isset($history['library']['items'][$item_id])) {
                $history['library']['items'][$item_id] = [
                    'name' => $item['name'],
                    'image' => '/storage/' . $item['image'],
                ];
            }

            $prev_box = $box;
        }

        Storage::disk('local')->put(self::FILE_NAME, json_encode($history));
    }

    public static function get()
    {
        if (!Storage::disk('local')->exists(self::FILE_NAME)) {
            self::generate();
        }

        $json = Storage::disk('local')->get(self::FILE_NAME);
        $data = json_decode($json, true);

        // обновить файл если устарел
        $life_time_s = 60 * 10;

        if ($data["created"] + $life_time_s < time()) {
            self::generate();
            $json = Storage::disk('local')->get(self::FILE_NAME);
            $data = json_decode($json, true);
        }

        return $data;
    }
}
