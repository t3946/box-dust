<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBoxItemsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create( 'box_items', function ( Blueprint $table ) {
            $table->id( 'item_id' );
            $table->string( 'name' );
            $table->text( 'description' );
            $table->unsignedFloat( 'price' );
            $table->boolean( 'stock' );
            $table->boolean( 'demo' );
            $table->timestamps();

            $table
                ->foreignId( 'box_id' )
                ->nullable()
                ->constrained( 'cases', 'box_id' )
                ->cascadeOnDelete();

            $table
                ->foreignId( 'image_id' )
                ->nullable()
                ->constrained( 'box_images', 'image_id' )
                ->nullOnDelete();
        } );
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table( 'box_items', function ( Blueprint $table ) {
            $table->dropForeign( 'box_items_box_id_foreign' );
            $table->dropForeign( 'box_items_image_id_foreign' );
            $table->dropIfExists();
        } );
    }
}
