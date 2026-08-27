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
        Schema::create('chapters', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('content_detail_id')->comment('コンテンツ詳細ID');
            $table->time('start_time')->comment('時間');
            $table->string('image')->nullable()->comment('画像');
            $table->string('icon')->nullable()->comment('アイコン');
            $table->unsignedBigInteger('chapter_icon_id')->nullable()->comment('チャプター アイコンID');
            $table->text('comment')->nullable()->comment('コメント');
            $table->unsignedBigInteger('created_by')->nullable()->comment('作成者ID');
            $table->unsignedBigInteger('updated_by')->nullable()->comment('更新者ID');
            $table->unsignedBigInteger('deleted_by')->nullable()->comment('削除者ID');
            $table->timestamps();
            $table->softDeletes();
            $table->comment('チャプター');

            // index
            $table->index(['user_id']);
            $table->index(['content_detail_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('chapters');
    }
};
