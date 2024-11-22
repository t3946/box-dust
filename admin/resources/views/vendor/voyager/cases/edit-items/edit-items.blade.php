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
                            <div class="text-[20px] controlSum">Control probability sum is: <span
                                    class="font-bold value"><span class="number">100</span>%</span></div>
                            <div class="mb-3 text-[20px] optimalPrice">Optimal price is: <span
                                    class="font-bold value"><span class="number">0</span>$</span></div>

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

                                    @include('vendor.voyager.cases.edit-items.item')
                                @endforeach

                                @include('vendor.voyager.cases.edit-items.AddItem')
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
