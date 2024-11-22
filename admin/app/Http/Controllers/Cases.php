<?php

namespace App\Http\Controllers;

use App\Models\Cases\CaseItem;

class Cases extends Controller
{
    private function getItems($limit = null)
    {
        $ids = CaseItem::query()
            ->where('case_id', request()->post('caseId'))
            ->get()
            ->map(fn($e) => $e->cs_item_id)
            ->toArray();

        $query = \App\Models\CSItem::query()
            ->whereNotIn('id', $ids);

        if ($minPrice = request()->post('minPrice')) {
            $query->where('price_usd', '>=', $minPrice);
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

        $caseItem = new CaseItem();
        $caseItem->case_id = request()->post('caseId');
        $caseItem->cs_item_id = $randomId;
        $caseItem->probability = 0;
        $caseItem->save();
    }

    public function removeItem()
    {
        CaseItem::query()
            ->where('id', request()->post('itemId'))
            ->delete();
    }

    public function addItem()
    {
        $item = new CaseItem();
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
        CaseItem::query()
            ->where('id', request()->post('itemId'))
            ->update([
                'probability' => request()->post('probability'),
            ]);
    }

}
