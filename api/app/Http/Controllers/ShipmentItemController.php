<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreShipmentItemRequest;
use App\Http\Requests\UpdateShipmentItemRequest;
use App\Models\ShipmentItem;
use Illuminate\Http\Request;

class ShipmentItemController extends Controller
{
    private $crudControllerHelper;

    public function __construct()
    {
        $this->crudControllerHelper = new CRUDControllerHelper(new ShipmentItem);
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
    public function show(ShipmentItem $entity)
    {
        return $this->crudControllerHelper->show($entity);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreShipmentItemRequest $request)
    {
        return $this->crudControllerHelper->store($request);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateShipmentItemRequest $request, ShipmentItem $entity)
    {
        return $this->crudControllerHelper->update($request, $entity);
    }

    /**
     * Update the specified resource relations in storage.
     */
    public function updateRelation(Request $request, ShipmentItem $entity, string $relation)
    {
        return $this->crudControllerHelper->updateRelation($request, $entity, $relation);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ShipmentItem $entity)
    {
        return $this->crudControllerHelper->destroy($entity);
    }
}
