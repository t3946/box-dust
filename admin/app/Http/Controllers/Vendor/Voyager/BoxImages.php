<?php

namespace App\Http\Controllers\Vendor\Voyager;

use App\Models\BoxImageModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use TCG\Voyager\Http\Controllers\VoyagerBaseController;

class BoxImages extends VoyagerBaseController
{
    public function update(Request $request, $id)
    {
        [$width, $height] = getimagesize($_FILES['name']['tmp_name']);
        $request->request->set("width", $width);
        $request->request->set("height", $height);

        if (isset($_FILES['name'])) {
            Storage::disk("public")->delete(BoxImageModel::where("image_id", "=", $id)->first()->name);
        }

        return parent::update($request, $id);
    }

    public function store(Request $request  )
    {
        [$width, $height] = getimagesize($_FILES['name']['tmp_name']);
        $request->request->set("width", $width);
        $request->request->set("height", $height);

        return parent::store($request);
    }

    public function destroy(Request $request, $id)
    {
        Storage::disk("public")->delete(BoxImageModel::where("image_id", "=", $id)->first()->name);

        return parent::destroy($request, $id);
    }
}
