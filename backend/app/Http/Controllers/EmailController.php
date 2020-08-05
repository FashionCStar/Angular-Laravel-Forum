<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Validator;

class EmailController extends Controller
{
    public function sendEmail(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'content' => 'required',
            'email' => 'required',
            'name'=> 'required',
            'subject'=> 'required',
        ]);
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 404);
        }

        $data['email'] = $request->get('email');
        $data['name'] = $request->get('name');
        $data['subject'] = $request->get('subject');
        $data['content'] = $request->get('content');


        Mail::send([], [], function ($message) use($data){
            $message->to('msjkgoodluck@gmail.com')
            ->from($data['email'], $data['name'])
            ->subject($data['subject'])
            ->setBody($data['content'], 'text/html'); // for HTML rich messages
        });

        if (Mail::failures()) {
            return response()->json(['message'=>'Error send message', 'success'=>false], 400);
        }else{
            return response()->json(['message'=>'Success sent message', 'success'=>true], 201);
        }
    }
}
