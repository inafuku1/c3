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
        Schema::create('encoding_jobs', function (Blueprint $table) {
            $table->id();
            $table->text('source_path')->comment('ソースファイル');
            $table->integer('order')->default(0)->comment('処理順');
            $table->integer('status')->default(0)->comment('ステータス');
            $table->text('error_message')->nullable()->comment('エラーメッセージ');
            $table->timestamp('started_at')->nullable()->comment('処理開始時間');
            $table->timestamp('completed_at')->nullable()->comment('処理終了時間');
            $table->timestamps();
            $table->comment('エンコードジョブ');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('encoding_jobs');
    }
};
