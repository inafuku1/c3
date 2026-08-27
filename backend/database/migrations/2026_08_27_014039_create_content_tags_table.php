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
        Schema::create('content_tags', function (Blueprint $table) {
            $table->id();
            $table->foreignId('content_id')->constrained()->onDelete('cascade');
            $table->string('name')->comment('タグ');
            $table->unsignedBigInteger('created_by')->nullable()->comment('作成者ID');
            $table->unsignedBigInteger('updated_by')->nullable()->comment('更新者ID');
            $table->unsignedBigInteger('deleted_by')->nullable()->comment('削除者ID');
            $table->timestamps();
            $table->softDeletes();
            $table->comment('コンテンツタグ');

            // index
            $table->index(['content_id']);
            $table->index(['name']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('content_tags');
    }
};
