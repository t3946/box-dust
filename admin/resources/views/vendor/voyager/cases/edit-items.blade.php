@extends('voyager::master')

@section('css')
    <meta name="csrf-token" content="{{ csrf_token() }}">
@stop

@section('page_title', 'Edit Items')

@section('page_header')
    <h1 class="page-title">Edit Items</h1>
    @include('voyager::multilingual.language-selector')
@stop

@section('content')
    <div class="page-content caseItemsPage edit-add container-fluid" data-case-id="{{ $case->id }}">
        <div class="row">
            <div class="col-md-12">

                <div class="panel panel-bordered">
                    <!-- form start -->
                    <form role="form"
                          class="form-edit-add"
                          method="POST"
                          enctype="multipart/form-data"
                    >
                        {{ csrf_field() }}

                        <div class="panel-body">
                            <div class="mb-3 text-[20px] controlSum">Control probability sum is: <span
                                    class="font-bold value"><span class="number">100</span>%</span></div>

                            <div class="itemsTable">
                                @php
                                    $sortMap = [
                                        'knife' => 1,
                                        'contraband' => 2,
                                        'covert' => 3,
                                        'classified' => 4,
                                        'restricted' => 5,
                                        'mil-spec-grade' => 6,
                                        'industrial-grade' => 7,
                                        'consumer-grade' => 8,
                                    ];

                                    $items = $case->items->sortBy(function ($item) use ($sortMap) {
                                        return $item->csItem->price;
                                    })->reverse();
                                @endphp

                                @foreach($items as $item)
                                    @php
                                        $csItem = $item->csItem;
                                    @endphp

                                    <div
                                        @class(['item', 'item_rarity_' . $csItem->rarity ]) data-probability="{{$item->probability}}"
                                        data-item-id="{{ $item->id }}">
                                        <div class="title" title="{{ $csItem->name }}">{{ $csItem->name }}</div>

                                        <div>
                                            <img src="{{ Storage::disk('s3')->url($csItem->image) }}" alt=""
                                                 class="image">
                                        </div>

                                        <div class="probability">
                                            <div class="font-bold">Win Chance:</div>
                                            <input value="{{ $item->probability * 100 }}" type="number" step="1" min="1"
                                                   max="100" />
                                            <span class="font-bold">%</span>
                                        </div>

                                        <div class="range">
                                            <span class="button dec">➖</span>
                                            <input type="range" min="1" max="100"
                                                   value="{{ $item->probability * 100 }}" />
                                            <span class="button inc">➕</span>
                                        </div>

                                        <div class="flex gap-2">
                                            <div class="font-bold">Price USD:</div> {{ $csItem->price_usd }}$
                                        </div>
                                    </div>
                                @endforeach
                            </div>
                        </div>

                        <div class="panel-footer">
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
@stop
