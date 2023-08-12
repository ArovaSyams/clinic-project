<?php

namespace App\Http\Controllers;

use App\Models\Document;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class DocumentController extends Controller
{
    public function destroy($id) {
        $document = Document::where('id', $id)->first();

        Storage::delete($document->document);

        $document->delete();

        return redirect()->back();
    }
 
    public function store(Request $request) {
        
        $request->validate([
            'document' => 'required|mimes:pdf'
        ]);

        Document::create([
            'doctor_id' => $request->id,
            'document' => $request->file('document')->store('document')
        ]);

        return redirect()->back();
    }
}
