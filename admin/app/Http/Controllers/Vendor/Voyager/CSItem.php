<?php

namespace App\Http\Controllers\Vendor\Voyager;

use App\Models\CSItem as CSItemModel;
use Illuminate\Http\Request;
use Illuminate\View\View;
use TCG\Voyager\Http\Controllers\VoyagerBaseController;

class CSItem extends VoyagerBaseController
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
    public function edit(Request $request, $csItemId)
    {
        /** @var View $view */
        $view = parent::edit($request, $csItemId);
        $view->with( 'csItem', CSItemModel::find($csItemId));

        return $view;
    }
}
