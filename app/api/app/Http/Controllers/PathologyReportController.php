<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePathologyReportRequest;
use App\Http\Requests\UpdatePathologyReportRequest;
use App\Models\PathologyReport;
use Illuminate\Http\Request;

class PathologyReportController extends Controller
{
    private $crudControllerHelper;

    public function __construct()
    {
        $this->crudControllerHelper = new CRUDControllerHelper(new PathologyReport);
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
    public function show(PathologyReport $entity)
    {
        return $this->crudControllerHelper->show($entity);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePathologyReportRequest $request)
    {
        return $this->crudControllerHelper->store($request);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePathologyReportRequest $request, PathologyReport $entity)
    {
        return $this->crudControllerHelper->update($request, $entity);
    }

    /**
     * Update the specified resource relations in storage.
     */
    public function updateRelation(Request $request, PathologyReport $entity, string $relation)
    {
        return $this->crudControllerHelper->updateRelation($request, $entity, $relation);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(PathologyReport $entity)
    {
        return $this->crudControllerHelper->destroy($entity);
    }
}
