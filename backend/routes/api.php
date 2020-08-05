<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

//Route::middleware('auth:api')->get('/user', function (Request $request) {
//    return $request->user();
//});

Route::group([
    'middleware' => 'api',
], function ($router) {
    Route::post('login', 'AuthController@login');
    Route::post('register', 'AuthController@registerUser');
    Route::post('forgotpasswd', 'PasswordResetController@create');


    Route::post('setUserRole', 'AuthController@setUserRole');
    Route::post('logout', 'AuthController@logout');
    Route::post('refresh', 'AuthController@refresh');
    Route::post('me', 'AuthController@me');
    Route::post('sendPasswordResetLink', 'ResetPasswordController@sendPasswordResetEmail');
    Route::post('changePassword', 'ResetPasswordController@resetPassword');
    Route::post('createUser', 'ManageUsersController@createUser');
    Route::post('updateUser', 'ManageUsersController@updateUser');
    Route::post('activeUser', 'ManageUsersController@activeUser');
    Route::delete('user/{id}', 'ManageUsersController@deleteUser');
    Route::post('user/{id}/photo', 'ManageUsersController@fileUpload');

    Route::post('topic', 'TopicController@addTopic');
    Route::post('alltopic', 'TopicController@getAllTopicByFilter');
    Route::post('alluser', 'TopicController@getAllUserByFilter');

    Route::get('topic/{id}', 'TopicController@getTopicById');
    Route::get('topic/addviewcount/{id}', 'TopicController@addViewCountById');
    Route::get('topics/{category}', 'TopicController@getTopics');
    Route::get('latesttopics', 'TopicController@getLatestTopics');
    Route::delete('topic/{id}', 'TopicController@deleteTopic');
    Route::post('contact', 'EmailController@sendEmail');
    Route::post('search', 'TopicController@filterBySearch');

    Route::post('post', 'PostController@addPost');
    Route::get('post/{id}', 'PostController@getPostById');
    Route::get('posts/{category}', 'PostController@getPosts');
    Route::delete('post/{id}', 'PostController@deletePost');

    Route::get('getRoleNames', 'ManageUsersController@getRoleNames');
    Route::get('getUsers', 'ManageUsersController@getUsers');
    Route::get('getUser/{id}', 'ManageUsersController@getUserByID');
    Route::get('forum/user/verify/{token}', 'AuthController@verifyUser');

    Route::post('addPermission', 'ManageUsersController@addPermission');
    Route::post('updatePermission', 'ManageUsersController@updatePermission');
    Route::post('deletePermission', 'ManageUsersController@deletePermission');
    Route::post('getPermissions', 'ManageUsersController@getPermissions');
    Route::post('addRole', 'ManageUsersController@addRole');
    Route::post('updateRole', 'ManageUsersController@updateRole');
    Route::post('deleteRole', 'ManageUsersController@deleteRole');
    Route::post('getRoles', 'ManageUsersController@getRoles');
    Route::get('getRole', 'ManageUsersController@getRoleByID');
    Route::post('addWebsite', 'WebsiteController@addWebsite');
    Route::post('updateWebsite', 'WebsiteController@updateWebsite');
    Route::post('deleteWebsite', 'WebsiteController@deleteWebsite');
    Route::get('getWebsites', 'WebsiteController@getWebsites');
    Route::get('getWebsiteById', 'WebsiteController@getWebsiteById');
    Route::post('fileUpload', 'WebsiteController@fileUpload');
});