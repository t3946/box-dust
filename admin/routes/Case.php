<?php

use App\Models\Cases\CaseItem;
use Illuminate\Support\Facades\Route;

Route
    ::middleware('role:admin')
    ->prefix('case')
    ->group(function () {
        Route::post('update-probability', function () {
            CaseItem::query()
                ->where('id', request()->post('itemId'))
                ->update([
                    'probability' => request()->post('probability'),
                ]);
        });

        Route::post('add-random-item', function () {
            $ids = CaseItem::query()
                ->where('case_id', request()->post('caseId'))
                ->get()
                ->map(fn($e) => $e->cs_item_id)
                ->toArray();

            $query = \App\Models\CSItem::query()
                ->select('id')
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

            $items = $query
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
        });

        Route::post('remove-item', function () {
            CaseItem::query()
                ->where('id', request()->post('itemId'))
                ->delete();
        });
    });
