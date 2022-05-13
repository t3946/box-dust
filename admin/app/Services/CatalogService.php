<?php

namespace App\Services;

use Illuminate\Support\Facades\DB;

/**
 * different catalog related functionality
 */
class CatalogService
{
    /**
     * select from db all categories and boxes, and return it as one array - boxes catalog
     * @return array
     */
    public static function buildCatalog(): array
    {
        $catalog = [];
        $categories = DB::table('box_categories')->orderBy('order')->get(['category_id', 'name'])->all();

        foreach ($categories as $category) {
            $category = (array)$category;

            if ($category['name'] === 'Все') {
                $boxes = DB::table('box_boxes')->get()->all();
            } else {
                $boxes = DB::table('box_boxes')->get()->where('category_id', '=', $category['category_id'])->all();
            }

            $category['boxes'] = $boxes;
            $catalog[] = $category;
        }

        return $catalog;
    }
}
