<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreAutopsyReportRequest;
use App\Http\Requests\UpdateAutopsyReportRequest;
use App\Models\AutopsyReport;
use Illuminate\Http\Request;

class AutopsyReportController extends Controller
{
    private $crudControllerHelper;

    public function __construct()
    {
        $this->crudControllerHelper = new CRUDControllerHelper(new AutopsyReport);
    }

    /**
     * Display a listing of the resource.
     */
    public function list(Request $request)
    {
        return $this->crudControllerHelper->list($request);
    }

    /**
     * Display the specified resource.
     */
    public function show(AutopsyReport $entity)
    {
        return $this->crudControllerHelper->show($entity);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreAutopsyReportRequest $request)
    {
        return $this->crudControllerHelper->store($request);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateAutopsyReportRequest $request, AutopsyReport $entity)
    {
        return $this->crudControllerHelper->update($request, $entity);
    }

    /**
     * Update the specified resource relations in storage.
     */
    public function updateRelation(Request $request, AutopsyReport $entity, string $relation)
    {
        return $this->crudControllerHelper->updateRelation($request, $entity, $relation);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(AutopsyReport $entity)
    {
        return $this->crudControllerHelper->destroy($entity);
    }
}
