<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TransactionSummary extends Model
{
    use HasFactory;
    use \Staudenmeir\EloquentEagerLimit\HasEagerLimit;

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function tab(): BelongsTo
    {
        return $this->belongsTo(Tab::class);
    }
}
