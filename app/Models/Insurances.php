<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Insurances extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'price'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
