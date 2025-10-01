<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreRadiologyReportRequest;
use App\Http\Requests\UpdateRadiologyReportRequest;
use App\Models\RadiologyReport;
use Illuminate\Http\Request;

class RadiologyReportController extends Controller
{
    private $crudControllerHelper;

    public function __construct()
    {
        $this->crudControllerHelper = new CRUDControllerHelper(new RadiologyReport);
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
    public function show(RadiologyReport $entity)
    {
        return $this->crudControllerHelper->show($entity);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRadiologyReportRequest $request)
    {
        return $this->crudControllerHelper->store($request);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRadiologyReportRequest $request, RadiologyReport $entity)
    {
        return $this->crudControllerHelper->update($request, $entity);
    }

    /**
     * Update the specified resource relations in storage.
     */
    public function updateRelation(Request $request, RadiologyReport $entity, string $relation)
    {
        return $this->crudControllerHelper->updateRelation($request, $entity, $relation);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(RadiologyReport $entity)
    {
        return $this->crudControllerHelper->destroy($entity);
    }
}
