<div
    @class(['item', 'item_rarity_' . $csItem->rarity ])
    data-probability="{{$item->probability}}"
    data-item-id="{{ $item->id }}"
    data-price="{{ $csItem->price_usd }}"
>
    <div class="title" title="{{ $csItem->type . ' ' . $csItem->name }}">
        <div>{{ $csItem->name }}</div>
        <div class="flex gap-2 items-center">{{ $csItem->type }}
            <i class="icon flex voyager-edit"></i>
        </div>
    </div>

    <div>
        <img src="{{ Storage::disk('s3')->url($csItem->image) }}" alt=""
             class="image" />
    </div>

    <div class="probability">
        <div class="font-bold">Win Chance:</div>
        <input value="{{ $item->probability * 100 }}" type="number" step="1" min="0"
               max="100" />
        <span class="font-bold">%</span>
    </div>

    <div class="range">
        <span class="button dec">➖</span>
        <input type="range" min="0" max="100"
               value="{{ $item->probability * 100 }}" />
        <span class="button inc">➕</span>
    </div>

    <div class="flex gap-2">
        <div class="font-bold">Price USD:</div> {{ $csItem->price_usd }}$
    </div>
</div>
