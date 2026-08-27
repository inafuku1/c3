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
        Schema::create('contents', function (Blueprint $table) {
            $table->id()->comment('ID');
            $table->foreignId('category_id')->nullable()->constrained()->onDelete('cascade')->comment('カテゴリID');
            $table->string('title')->nullable()->comment('タイトル');
            $table->date('published_at')->nullable()->comment('公開日');
            $table->string('image')->nullable()->comment('画像');
            $table->text('remarks')->nullable()->comment('備考');
            $table->integer('count')->default(0)->comment('表示回数');
            $table->integer('order')->default(0)->comment('表示順');
            $table->unsignedBigInteger('created_by')->nullable()->comment('作成者ID');
            $table->unsignedBigInteger('updated_by')->nullable()->comment('更新者ID');
            $table->unsignedBigInteger('deleted_by')->nullable()->comment('削除者ID');
            $table->timestamps();
            $table->softDeletes();
            $table->comment('コンテンツ');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('contents');
    }
};
