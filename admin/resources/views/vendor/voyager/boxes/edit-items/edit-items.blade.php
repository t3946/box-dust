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
        <div class="panel panel-bordered">
            <div class="panel-body">
                <h1>{{ $case->name }}</h1>
                <div class="mb-3 text-[20px]">
                    @php
                        $stats = [
                            [
                                'title' => 'Control probability sum',
                                'class' => 'controlSum',
                                'postfix' => '%',
                                'value' => 0,
                            ],
                            [
                                'title' => 'Optimal price',
                                'class' => 'optimalPrice',
                                'postfix' => '$',
                                'value' => 0,
                            ],
                            [
                                'title' => 'Price',
                                'class' => '',
                                'postfix' => '$',
                                'value' => $case->price / 10,
                            ],
                            [
                                'title' => 'Margin',
                                'class' => '',
                                'postfix' => '%',
                                'value' => 15,
                            ],
                        ]
                    @endphp

                    @foreach($stats as $stat)
                        <div class="{{ $stat['class'] }}">
                            {{ $stat['title'] }}:
                            <span class="font-bold value">
                            <span class="number">{{ $stat['value'] }}</span>
                            {{ $stat['postfix'] }}
                        </span>
                        </div>
                    @endforeach
                </div>

                <div class="itemsTable">
                    @php
                        $items = $case->items->sortBy(function ($item) {
                            return $item->csItem->price_usd;
                        })->reverse();
                    @endphp

                    @foreach($items as $item)
                        @php
                            $csItem = $item->csItem;
                        @endphp

                        @include('vendor.voyager.boxes.edit-items.item')
                    @endforeach
                </div>

                @include('vendor.voyager.boxes.edit-items.AddItemForm')

                <div class="foundVariants">
                    <div class="hidden example">
                        <div class="item">
                            <div class="name font-bold"></div>
                            <img src="" />
                            <div class="price font-bold">Price: <span class="number"></span>$</div>
                        </div>
                    </div>

                    <div class="items"></div>
                </div>
            </div>

            <div class="panel-footer">
            </div>
        </div>
    </div>
@stop