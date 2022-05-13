<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class BoxRareStatuses extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('box_rare_statuses', function (Blueprint $table) {
            $table->id('rare_status_id');
            $table->string('name')->unique();
            $table->string('slug')->unique();
            $table->timestamps();
        });

        Schema::table('box_items', function (Blueprint $table) {
            $table
                ->foreignId('rare_status_id')
                ->nullable()
                ->constrained('box_rare_statuses', 'rare_status_id')
                ->nullOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('box_items', function (Blueprint $table) {
            $table->dropForeign('box_items_rare_status_id_foreign');
            $table->dropColumn('rare_status_id');
        });

        Schema::table('box_rare_statuses', function (Blueprint $table) {
            $table->dropIfExists();
        });
    }
}
