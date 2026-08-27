<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tag_images', function (Blueprint $table) {
            $table->id();
            $table->integer('type')->default(0)->comment('タイプ');
            $table->string('image')->comment('画像');
            $table->string('tag')->nullable()->comment('タグ');
            $table->text('remarks')->nullable()->comment('備考');
            $table->integer('order')->default(0)->comment('表示順');
            $table->unsignedBigInteger('created_by')->nullable()->comment('作成者ID');
            $table->unsignedBigInteger('updated_by')->nullable()->comment('更新者ID');
            $table->unsignedBigInteger('deleted_by')->nullable()->comment('削除者ID');
            $table->timestamps();
            $table->softDeletes();
            $table->comment('タグ画像');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tag_images');
    }
};
