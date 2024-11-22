<?php

namespace App\Http\Controllers\Vendor\Voyager;

use App\Models\Cases\Cases;
use Illuminate\Http\Request;
use Illuminate\View\View;
use TCG\Voyager\Facades\Voyager;
use TCG\Voyager\Http\Controllers\VoyagerBaseController;

class VoyagerBoxBreadController extends VoyagerBaseController
{
    /**
     * Edit BREAD.
     *
     * @param string $table
     * @param Request $request
     * @param int $caseId
     *
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function edit(Request $request, $caseId)
    {
        /** @var View $view */
        $view = parent::edit($request, $caseId);

        return $view;
    }

    public function editItems(Request $request, $caseId)
    {
        return Voyager::view('vendor.voyager.cases.edit-items.edit-items', [
            'case' => Cases::find($caseId),
        ]);
    }
}
