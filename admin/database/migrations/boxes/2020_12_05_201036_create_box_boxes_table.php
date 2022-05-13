<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBoxBoxesTable extends Migration
{
    protected $connection = 'mysql';

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up(): void
    {
        Schema::create( 'box_boxes', function ( Blueprint $table ) {
            $table->id( 'box_id' );
            $table->string( 'name' )->unique();
            $table->unsignedFloat( 'old_price' )->nullable();
            $table->unsignedFloat( 'price' );
            $table->unsignedInteger( 'open_count' )->default( 0 );
            $table->boolean('is_recommend')->default(false);
            $table->timestamps();

            $table
                ->foreignId( 'small_image_id' )
                ->nullable()
                ->constrained( 'box_images', 'image_id' )
                ->cascadeOnDelete();

            $table
                ->foreignId( 'big_image_id' )
                ->nullable()
                ->constrained( 'box_images', 'image_id' )
                ->nullOnDelete();

            $table
                ->foreignId( 'category_id' )
                ->nullable()
                ->constrained( 'box_categories', 'category_id' )
                ->nullOnDelete();
        } );
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down(): void
    {
        Schema::table( 'box_boxes', function ( Blueprint $table ) {
            $table->dropForeign( 'box_boxes_small_image_id_foreign' );
            $table->dropForeign( 'box_boxes_big_image_id_foreign' );
            $table->dropForeign( 'box_boxes_category_id_foreign' );
            $table->dropIfExists();
        } );
    }
}
