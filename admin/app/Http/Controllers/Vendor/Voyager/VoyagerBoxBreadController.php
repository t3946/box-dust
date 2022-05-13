<?php

namespace App\Http\Controllers\Vendor\Voyager;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\View\View;
use TCG\Voyager\Http\Controllers\VoyagerBaseController;

class VoyagerBoxBreadController extends VoyagerBaseController
{
    /**
     * Edit BREAD.
     *
     * @param string $table
     * @param Request $request
     * @param int $box_id
     *
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function edit(Request $request, $box_id)
    {
        /** @var View $view */
        $view = parent::edit($request, $box_id);

        // add box items to view data
        $box_items = DB::table('box_items as items')
            ->where('box_id', $box_id)
            ->join('box_rare_statuses as rare_statuses',
                'items.rare_status_id',
                '=',
                'rare_statuses.rare_status_id'
            )
            ->get([
                'items.name as name',
                'items.cost_to_us as price',
                'rare_statuses.name as rare_name',
                'rare_statuses.slug as rare_slug',
            ])
            ->groupBy('rare_slug')
            ->all();

        usort($box_items, static function ($a, $b) {
            $rare_order = [ 'frequently', 'normal', 'rare' ];

            $a_slug = $a[0]->rare_slug;
            $b_slug = $b[0]->rare_slug;


            $a_rare_rang = array_search($a_slug, $rare_order);
            $b_rare_rang = array_search($b_slug, $rare_order);

            if ($a_rare_rang === false || $b_rare_rang === false) {
                return 0;
            }

            if ($a_rare_rang > $b_rare_rang) {
                return 1;
            }

            return -1;
        });

        $view->with('box_items', $box_items);

        return $view;
    }
}
