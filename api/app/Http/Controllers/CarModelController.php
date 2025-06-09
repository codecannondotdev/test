<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCarModelRequest;
use App\Http\Requests\UpdateCarModelRequest;
use App\Models\CarModel;
use Illuminate\Http\Request;

class CarModelController extends Controller
{
    private $crudControllerHelper;

    public function __construct()
    {
        $this->crudControllerHelper = new CRUDControllerHelper(new CarModel);
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
    public function show(CarModel $entity)
    {
        return $this->crudControllerHelper->show($entity);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCarModelRequest $request)
    {
        return $this->crudControllerHelper->store($request);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCarModelRequest $request, CarModel $entity)
    {
        return $this->crudControllerHelper->update($request, $entity);
    }

    /**
     * Update the specified resource relations in storage.
     */
    public function updateRelation(Request $request, CarModel $entity, string $relation)
    {
        return $this->crudControllerHelper->updateRelation($request, $entity, $relation);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(CarModel $entity)
    {
        return $this->crudControllerHelper->destroy($entity);
    }
}
