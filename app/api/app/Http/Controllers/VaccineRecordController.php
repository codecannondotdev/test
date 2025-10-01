<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreVaccineRecordRequest;
use App\Http\Requests\UpdateVaccineRecordRequest;
use App\Models\VaccineRecord;
use Illuminate\Http\Request;

class VaccineRecordController extends Controller
{
    private $crudControllerHelper;

    public function __construct()
    {
        $this->crudControllerHelper = new CRUDControllerHelper(new VaccineRecord);
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
    public function show(VaccineRecord $entity)
    {
        return $this->crudControllerHelper->show($entity);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreVaccineRecordRequest $request)
    {
        return $this->crudControllerHelper->store($request);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateVaccineRecordRequest $request, VaccineRecord $entity)
    {
        return $this->crudControllerHelper->update($request, $entity);
    }

    /**
     * Update the specified resource relations in storage.
     */
    public function updateRelation(Request $request, VaccineRecord $entity, string $relation)
    {
        return $this->crudControllerHelper->updateRelation($request, $entity, $relation);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(VaccineRecord $entity)
    {
        return $this->crudControllerHelper->destroy($entity);
    }
}
