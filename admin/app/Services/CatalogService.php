<?php

namespace App\Services;

use App\Models\Box\Box;
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
                $boxes = Box::query()->all();
            } else {
                $boxes = Box::query()->where('category_id', '=', $category['category_id'])->all();
            }

            $category['cases'] = $boxes;
            $catalog[] = $category;
        }

        return $catalog;
    }
}
