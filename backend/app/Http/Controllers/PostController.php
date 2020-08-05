<?php

namespace App\Http\Controllers;

use App\Category;
use App\Discussion;
use App\Post;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\User;
use JWTFactory;
use JWTAuth;
use Symfony\Component\HttpFoundation\Exception\RequestExceptionInterface;
use Validator;
use Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;


class PostController extends Controller
{
    public function addPost(Request $request) {
        $validator = Validator::make($request->all(), [
            'discussion_id' => 'required',
            'user_id' => 'required',
            'content'=> 'required',
        ]);
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 404);
        }

        $user = User::find($request->get('user_id'));
        if ($user->verified != 1) {
            return response()->json(['error'=>'Your email is not verified, Try register again'], 401);
        }

        if ($user->is_activated != 1) {
            return response()->json(['error'=>'Your Account is deactivated by admin, Contact to admin'], 401);
        }

        Post::create([
            'discussion_id' => $request->get('discussion_id'),
            'user_id' => $request->get('user_id'),
            'content' => $request->get('content')
        ]);
        $post = Post::first();
        return response()->json(['success'=>true, 'data'=>$post], 201);
        }

    public function getPosts($category_name) {
//        try {
//            $category = DB::table('categories')->where('name', $category_name)->first();
//            $topics = DB::table('discussions')
//                ->join('users', 'discussions.user_id', '=', 'users.id')
//                ->select('discussions.*', 'users.username')
//                ->where('category_id', $category->id)
//                ->orderBy('created_at', 'desc')
//                ->get();
//            foreach ($topics as $topic) {
//                $posts = DB::table('posts')
//                    ->join('users', 'posts.user_id', '=', 'users.id')
//                    ->select('posts.*', 'users.username')
//                    ->where('discussion_id', $topic->id)
//                    ->orderBy('created_at', 'desc')
//                    ->get();
//                $user = User::find($topic->user_id);
//                $topic->user = $user;
//                $topic->posts = $posts;
////                $topic->latestpost = $posts[0];
//            }
//            return response()->json(['success'=>true, 'data'=>$topics], 201);
//        } catch(\Exception $e) {
//            return response()->json(['error'=>$e], 500);
//        }

    }

    public function getPostById($id) {
//        try {
////            $topic = DB::table('discussions')
////                ->join('users', 'discussions.user_id', '=', 'users.id')
////                ->select('discussions.*', 'users.username')
////                ->where('discussions.id', $id)
////                ->first();
//            $topic = Discussion::find($id);
//            $posts = DB::table('posts')
//                ->join('users', 'posts.user_id', '=', 'users.id')
//                ->select('posts.*', 'users.username')
//                ->where('posts.discussion_id', $id)
//                ->orderBy('created_at', 'desc')
//                ->get();
//            $user = User::find($topic->user_id);
//            $topic->user = $user;
//            $topic->posts = $posts;
//            return response()->json(['success'=>true, 'data'=>$topic], 201);
//        } catch(\Exception $e) {
//            return response()->json(['error'=>$e], 500);
//        }

    }

    public function deletePost($id) {
        $post = Post::find($id);
        try {
            $post->delete();
            return response()->json(['success'=>true], 201);
        } catch(\Exception $e) {
            return response()->json(['error'=>$e], 500);
        }
    }
}
