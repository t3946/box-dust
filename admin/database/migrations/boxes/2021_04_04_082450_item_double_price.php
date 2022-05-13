<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ItemDoublePrice extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('box_items', function (Blueprint $table) {
            $table->renameColumn('price', 'list_price');
            $table->unsignedFloat( 'cost_to_us' );
        });
    }
}
