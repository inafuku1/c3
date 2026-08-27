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
        Schema::create('playlists', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->string('title')->nullable()->comment('タイトル');
            $table->string('image')->nullable()->comment('画像');
            $table->text('remarks')->nullable()->comment('備考');
            $table->integer('count')->default(0)->comment('表示回数');
            $table->integer('order')->default(0)->comment('表示順');
            $table->unsignedBigInteger('created_by')->nullable()->comment('作成者ID');
            $table->unsignedBigInteger('updated_by')->nullable()->comment('更新者ID');
            $table->unsignedBigInteger('deleted_by')->nullable()->comment('削除者ID');
            $table->timestamps();
            $table->softDeletes();
            $table->comment('プレイリスト');

            // index
            $table->index(['user_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('playlists');
    }
};
