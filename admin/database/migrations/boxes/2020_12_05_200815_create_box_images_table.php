<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBoxImagesTable extends Migration
{
    protected $connection = 'mysql';

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create( 'box_images', function ( Blueprint $table ) {
            $table->id( 'image_id' );
            $table->string( 'name', 32 )->unique();
            $table->unsignedSmallInteger( 'width' );
            $table->unsignedSmallInteger( 'height' );
            $table->timestamps();
        } );
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists( 'box_images' );
    }
}
