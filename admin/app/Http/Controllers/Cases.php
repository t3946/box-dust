<?php

namespace App\Http\Controllers;

use App\Models\Box\BoxItem;

class Cases extends Controller
{
    private function getItems($limit = null)
    {
        $ids = BoxItem::query()
            ->where('case_id', request()->post('caseId'))
            ->get()
            ->map(fn($e) => $e->cs_item_id)
            ->toArray();

        $query = \App\Models\CSItem::query()
            ->whereNotIn('id', $ids);

        if ($text = request()->post('text')) {
            $filters = array_map(fn ($field) => "$field like \"%$text%\"", ['name', 'name_ru']);
            $query->whereRaw('(' . implode(' || ', $filters) . ')');
        }

        if ($minPrice = request()->post('minPrice')) {
            $query->where('price_usd', '>=', $minPrice);
        }

        if ($quality = request()->post('quality')) {
            $query->where('quality', $quality);
        }

        if ($maxPrice = request()->post('maxPrice')) {
            $query->where('price_usd', '<=', $maxPrice);
        }

        if ($rarity = request()->post('rarity')) {
            $query->whereIn('rarity', $rarity);
        }

        if ($limit) {
            $query->limit($limit);
        }

        return $query;
    }

    public function addRandomItem()
    {
        $items = $this
            ->getItems()
            ->select('id')
            ->get()
            ->map(fn($e) => $e->id)
            ->toArray();

        if (!$items) {
            return ['error' => 'No items found'];
        }

        $randomId = $items[mt_rand(0, count($items) - 1)];

        $caseItem = new BoxItem();
        $caseItem->case_id = request()->post('caseId');
        $caseItem->cs_item_id = $randomId;
        $caseItem->probability = 0;
        $caseItem->save();
    }

    public function removeItem()
    {
        BoxItem::query()
            ->where('id', request()->post('itemId'))
            ->delete();
    }

    public function setOnPreview()
    {
        $item = BoxItem::find( request()->post('itemId'));

        BoxItem::query()
            ->where('case_id', $item->case_id)
            ->update(['is_box_item_preview' => 0]);

        $item->is_box_item_preview = 1;
        $item->save();
    }

    public function addItem()
    {
        $item = new BoxItem();
        $item->case_id = request()->post('caseId');
        $item->cs_item_id = request()->post('csItemId');
        $item->probability = 0;
        $item->save();
    }

    public function searchItems()
    {
        return ['items' => $this->getItems(100)->get()];
    }

    public function updateProbability()
    {
        BoxItem::query()
            ->where('id', request()->post('itemId'))
            ->update([
                'probability' => request()->post('probability'),
            ]);
    }

}
