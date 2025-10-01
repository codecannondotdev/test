<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreMedicationStockRequest;
use App\Http\Requests\UpdateMedicationStockRequest;
use App\Models\MedicationStock;
use Illuminate\Http\Request;

class MedicationStockController extends Controller
{
    private $crudControllerHelper;

    public function __construct()
    {
        $this->crudControllerHelper = new CRUDControllerHelper(new MedicationStock);
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
    public function show(MedicationStock $entity)
    {
        return $this->crudControllerHelper->show($entity);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreMedicationStockRequest $request)
    {
        return $this->crudControllerHelper->store($request);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateMedicationStockRequest $request, MedicationStock $entity)
    {
        return $this->crudControllerHelper->update($request, $entity);
    }

    /**
     * Update the specified resource relations in storage.
     */
    public function updateRelation(Request $request, MedicationStock $entity, string $relation)
    {
        return $this->crudControllerHelper->updateRelation($request, $entity, $relation);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(MedicationStock $entity)
    {
        return $this->crudControllerHelper->destroy($entity);
    }
}
