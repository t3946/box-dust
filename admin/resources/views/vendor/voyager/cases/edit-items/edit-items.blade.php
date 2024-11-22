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

                <div class="mb-3 text-[20px]">
                    @php
                        $stats = [
                            [
                                'title' => 'Control probability sum is',
                                'class' => 'controlSum',
                                'postfix' => '%',
                                'value' => 0,
                            ],
                            [
                                'title' => 'Optimal price is',
                                'class' => 'optimalPrice',
                                'postfix' => '$',
                                'value' => 0,
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

                        @include('vendor.voyager.cases.edit-items.item')
                    @endforeach

                    @include('vendor.voyager.cases.edit-items.AddItem')
                </div>

                @include('vendor.voyager.cases.edit-items.AddItemForm')
            </div>

            <div class="panel-footer">
            </div>
        </div>
    </div>
@stop
