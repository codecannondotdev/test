<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreOperatingRoomRequest;
use App\Http\Requests\UpdateOperatingRoomRequest;
use App\Models\OperatingRoom;
use Illuminate\Http\Request;

class OperatingRoomController extends Controller
{
    private $crudControllerHelper;

    public function __construct()
    {
        $this->crudControllerHelper = new CRUDControllerHelper(new OperatingRoom);
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
    public function show(OperatingRoom $entity)
    {
        return $this->crudControllerHelper->show($entity);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreOperatingRoomRequest $request)
    {
        return $this->crudControllerHelper->store($request);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateOperatingRoomRequest $request, OperatingRoom $entity)
    {
        return $this->crudControllerHelper->update($request, $entity);
    }

    /**
     * Update the specified resource relations in storage.
     */
    public function updateRelation(Request $request, OperatingRoom $entity, string $relation)
    {
        return $this->crudControllerHelper->updateRelation($request, $entity, $relation);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(OperatingRoom $entity)
    {
        return $this->crudControllerHelper->destroy($entity);
    }
}
