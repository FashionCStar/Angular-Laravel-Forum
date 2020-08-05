<?php

namespace App\Http\Controllers;

use App\Website;
use Illuminate\Http\Request;
use DB;
use App\User;
use Tymon\JWTAuth\Exceptions\JWTException;
use Validator;
use Response;

use App\Http\Controllers\Controller;
use JWTFactory;
use JWTAuth;
use Symfony\Component\HttpFoundation\Exception\RequestExceptionInterface;
use Illuminate\Support\Facades\Input;

class WebsiteController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    public function fileUpload(Request $request) {
        $request->validate(['input_img' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        if ($request->hasFile('input_img')) {
            $image = $request->file('input_img');
            $name = time().'.'.$image->getClientOriginalExtension();
            $destinationPath = 'public/assets/images';
            $image->move($destinationPath, $name);
            return response()->json(['success' => 'Image Uploaded Successfully!!!', 'image_url'=>$destinationPath.'/'.$name], 200);
        } else {
            return response()->json(['error' => "Image Upload error"], 500);
        }
    }

    public function addWebsite(Request $request) {
        $validator = Validator::make($request->all(), [
            'domain_name' => 'required|string|max:255|unique:websites',
            'site_title' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 500);
        }

        try {
            $website = Website::create([
                'domain_name' => $request->get('domain_name'),
                'site_title' => $request->get('site_title'),
                'logo_url' => $request->get('logo_url'),
                'about' => $request->get('about'),
                'theme_type' => $request->get('theme_type'),
            ]);
            return Response::json(['success' => 'Website is Successfully created', 'website'=>$website], 200);
        } catch (JWTException $e) {
            return Response::json(['error' => 'This Website is already exist'], 500);
        }
    }

    public function updateWebsite(Request $request) {
        $validator = Validator::make($request->all(), [
            'domain_name' => 'required|string|max:255',
            'site_title' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 500);
        }

        try {
            $website = Website::find($request->get('id'));
            if ($website['domain_name'] === $request->get('domain_name')) {
                $website->update([
                    'site_title' => $request->get('site_title'),
                    'logo_url' => $request->get('logo_url'),
                    'about' => $request->get('about'),
                    'theme_type' => $request->get('theme_type'),
                ]);
            } else {
                $website->update([
                    'domain_name' => $request->get('domain_name'),
                    'site_title' => $request->get('site_title'),
                    'logo_url' => $request->get('logo_url'),
                    'about' => $request->get('about'),
                    'theme_type' => $request->get('theme_type'),
                ]);
            }
            return Response::json(['success' => 'Website is Successfully updated', 'website'=>$website], 200);
        } catch (JWTException $e) {
            return Response::json(['error' => 'This Website is already exist'], 500);
        }
    }

    public function deleteWebsite(Request $request) {
        $website = Website::find($request->get('id'));
        try {
            $website->delete();
            return response()->json(['success'=>'Website Successfully Removed']);
        } catch(JWTException $e) {
            return response()->json(['error'=>'Website Remove Failed']);
        }
    }

    public function getWebsites() {
        $page = Input::get('pageNo') != "null" ? Input::get('pageNo') : 1;
        $limit = Input::get('numPerPage') != "null" ? Input::get('numPerPage') : 10;
        $totalCount = count(Website::all());
        $websites = Website::orderBy('updated_at', 'desc')->skip(($page - 1) * $limit)->take($limit)->get();
        if ($totalCount == 0) {
            return response()->json(['totalCount'=>$totalCount, 'data'=>[]], 200);
        } else {
            return response()->json(['totalCount'=>$totalCount, 'data'=>$websites], 200);
        }
    }

    public function getWebsiteById() {
        $webID = Input::get('webId') != "null" ? Input::get('webId') : 1;
        try {
            $website = Website::find($webID);
            return response()->json(['result'=>'success', 'data'=>$website], 200);
        } catch (JWTException $e) {
            return response()->json(['error'=>'Website with this id is not exist'], 404);
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Website  $website
     * @return \Illuminate\Http\Response
     */
    public function show(Website $website)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Website  $website
     * @return \Illuminate\Http\Response
     */
    public function edit(Website $website)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Website  $website
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Website $website)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Website  $website
     * @return \Illuminate\Http\Response
     */
    public function destroy(Website $website)
    {
        //
    }
}
