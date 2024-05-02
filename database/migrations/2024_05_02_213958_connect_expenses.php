<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('expenses', function (Blueprint $table) {
            $table->increments('id');
            $table->foreignId('payment_id')->nullable();
            $table->foreignId('insurance_id')->nullable();
            $table->foreignId('subscription_id')->nullable();
            $table->foreignId('shopping_list_id')->nullable();
            $table->foreignId('user_id')->nullable();
            $table->foreignId('invoice_id')->nullable();
            $table->foreignId('transaction_id')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('expenses');
    }
};
