<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProcurementOrderRequest;
use App\Http\Requests\UpdateProcurementOrderRequest;
use App\Models\ProcurementOrder;
use Illuminate\Http\Request;

class ProcurementOrderController extends Controller
{
    private $crudControllerHelper;

    public function __construct()
    {
        $this->crudControllerHelper = new CRUDControllerHelper(new ProcurementOrder);
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
    public function show(ProcurementOrder $entity)
    {
        return $this->crudControllerHelper->show($entity);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProcurementOrderRequest $request)
    {
        return $this->crudControllerHelper->store($request);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProcurementOrderRequest $request, ProcurementOrder $entity)
    {
        return $this->crudControllerHelper->update($request, $entity);
    }

    /**
     * Update the specified resource relations in storage.
     */
    public function updateRelation(Request $request, ProcurementOrder $entity, string $relation)
    {
        return $this->crudControllerHelper->updateRelation($request, $entity, $relation);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ProcurementOrder $entity)
    {
        return $this->crudControllerHelper->destroy($entity);
    }
}
