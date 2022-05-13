<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBoxPrizesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create( 'box_prizes', function ( Blueprint $table ) {
            $table->id( 'prize_id' );
            $table->timestamps();

            $table
                ->foreignId( 'item_id' )
                ->nullable()
                ->constrained( 'box_items', 'item_id' )
                ->cascadeOnDelete();

            $table
                ->foreignId( 'user_id' )
                ->nullable()
                ->constrained( 'users' )
                ->cascadeOnDelete();
        } );
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table( 'box_prizes', function ( Blueprint $table ) {
            $table->dropForeign( 'box_prizes_item_id_foreign' );
            $table->dropForeign( 'box_prizes_user_id_foreign' );
            $table->dropIfExists();
        } );
    }
}
