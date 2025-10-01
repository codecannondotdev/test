<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreMedicalDeviceMaintenanceRequest;
use App\Http\Requests\UpdateMedicalDeviceMaintenanceRequest;
use App\Models\MedicalDeviceMaintenance;
use Illuminate\Http\Request;

class MedicalDeviceMaintenanceController extends Controller
{
    private $crudControllerHelper;

    public function __construct()
    {
        $this->crudControllerHelper = new CRUDControllerHelper(new MedicalDeviceMaintenance);
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
    public function show(MedicalDeviceMaintenance $entity)
    {
        return $this->crudControllerHelper->show($entity);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreMedicalDeviceMaintenanceRequest $request)
    {
        return $this->crudControllerHelper->store($request);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateMedicalDeviceMaintenanceRequest $request, MedicalDeviceMaintenance $entity)
    {
        return $this->crudControllerHelper->update($request, $entity);
    }

    /**
     * Update the specified resource relations in storage.
     */
    public function updateRelation(Request $request, MedicalDeviceMaintenance $entity, string $relation)
    {
        return $this->crudControllerHelper->updateRelation($request, $entity, $relation);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(MedicalDeviceMaintenance $entity)
    {
        return $this->crudControllerHelper->destroy($entity);
    }
}
