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
    <div class="page-content edit-add container-fluid">
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
                            <div>{{ json_encode($case->probabilities) }}</div>

                            @foreach($case->items as $item)
                                <div>
                                    <div>{{ $item->csItem->name }}</div>
                                    <input value="{{ $item->probability }}" />
                                </div>
                            @endforeach
                            {{ json_encode($case->items) }}
                        </div>

                        <div class="panel-footer">
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
@stop

@section('javascript')
    <script>
    </script>
@stop
