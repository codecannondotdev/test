<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreDischargeSummaryRequest;
use App\Http\Requests\UpdateDischargeSummaryRequest;
use App\Models\DischargeSummary;
use Illuminate\Http\Request;

class DischargeSummaryController extends Controller
{
    private $crudControllerHelper;

    public function __construct()
    {
        $this->crudControllerHelper = new CRUDControllerHelper(new DischargeSummary);
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
    public function show(DischargeSummary $entity)
    {
        return $this->crudControllerHelper->show($entity);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreDischargeSummaryRequest $request)
    {
        return $this->crudControllerHelper->store($request);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateDischargeSummaryRequest $request, DischargeSummary $entity)
    {
        return $this->crudControllerHelper->update($request, $entity);
    }

    /**
     * Update the specified resource relations in storage.
     */
    public function updateRelation(Request $request, DischargeSummary $entity, string $relation)
    {
        return $this->crudControllerHelper->updateRelation($request, $entity, $relation);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(DischargeSummary $entity)
    {
        return $this->crudControllerHelper->destroy($entity);
    }
}
