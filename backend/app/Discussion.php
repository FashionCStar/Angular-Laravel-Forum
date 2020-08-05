<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Discussion extends Model
{
    protected $fillable = [
        'id', 'title', 'content', 'category_id', 'user_id', 'view_count', 'is_approved', 'is_private'
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
    public function posts()
    {
        return $this->hasMany(Post::class);
    }
}
