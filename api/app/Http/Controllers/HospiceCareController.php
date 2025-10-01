<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreHospiceCareRequest;
use App\Http\Requests\UpdateHospiceCareRequest;
use App\Models\HospiceCare;
use Illuminate\Http\Request;

class HospiceCareController extends Controller
{
    private $crudControllerHelper;

    public function __construct()
    {
        $this->crudControllerHelper = new CRUDControllerHelper(new HospiceCare);
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
    public function show(HospiceCare $entity)
    {
        return $this->crudControllerHelper->show($entity);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreHospiceCareRequest $request)
    {
        return $this->crudControllerHelper->store($request);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateHospiceCareRequest $request, HospiceCare $entity)
    {
        return $this->crudControllerHelper->update($request, $entity);
    }

    /**
     * Update the specified resource relations in storage.
     */
    public function updateRelation(Request $request, HospiceCare $entity, string $relation)
    {
        return $this->crudControllerHelper->updateRelation($request, $entity, $relation);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(HospiceCare $entity)
    {
        return $this->crudControllerHelper->destroy($entity);
    }
}
