<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreWarehouseRequest;
use App\Http\Requests\UpdateWarehouseRequest;
use App\Models\Warehouse;
use Illuminate\Http\Request;

class WarehouseController extends Controller
{
    private $crudControllerHelper;

    public function __construct()
    {
        $this->crudControllerHelper = new CRUDControllerHelper(new Warehouse);
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
    public function show(Warehouse $entity)
    {
        return $this->crudControllerHelper->show($entity);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreWarehouseRequest $request)
    {
        return $this->crudControllerHelper->store($request);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateWarehouseRequest $request, Warehouse $entity)
    {
        return $this->crudControllerHelper->update($request, $entity);
    }

    /**
     * Update the specified resource relations in storage.
     */
    public function updateRelation(Request $request, Warehouse $entity, string $relation)
    {
        return $this->crudControllerHelper->updateRelation($request, $entity, $relation);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Warehouse $entity)
    {
        return $this->crudControllerHelper->destroy($entity);
    }
}
