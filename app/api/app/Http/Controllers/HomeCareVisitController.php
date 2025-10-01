<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreHomeCareVisitRequest;
use App\Http\Requests\UpdateHomeCareVisitRequest;
use App\Models\HomeCareVisit;
use Illuminate\Http\Request;

class HomeCareVisitController extends Controller
{
    private $crudControllerHelper;

    public function __construct()
    {
        $this->crudControllerHelper = new CRUDControllerHelper(new HomeCareVisit);
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
    public function show(HomeCareVisit $entity)
    {
        return $this->crudControllerHelper->show($entity);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreHomeCareVisitRequest $request)
    {
        return $this->crudControllerHelper->store($request);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateHomeCareVisitRequest $request, HomeCareVisit $entity)
    {
        return $this->crudControllerHelper->update($request, $entity);
    }

    /**
     * Update the specified resource relations in storage.
     */
    public function updateRelation(Request $request, HomeCareVisit $entity, string $relation)
    {
        return $this->crudControllerHelper->updateRelation($request, $entity, $relation);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(HomeCareVisit $entity)
    {
        return $this->crudControllerHelper->destroy($entity);
    }
}
