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

            $items = \App\Models\CSItem::query()
                ->select('id')
                ->where('price_usd', '>=', request()->post('minPrice'))
                ->where('price_usd', '<=', request()->post('maxPrice'))
                ->where('rarity', request()->post('rarity'))
                ->whereNotIn('id', $ids)
                ->get()
                ->map(fn($e) => $e->id)
                ->toArray();


            $randomId = $items[mt_rand(0, 103)];

            $caseItem = new CaseItem();
            $caseItem->case_id = request()->post('caseId');
            $caseItem->cs_item_id = $randomId;
            $caseItem->probability = 0;
            $caseItem->save();
        });
    });
