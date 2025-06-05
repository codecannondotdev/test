<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProductionBatchRequest;
use App\Http\Requests\UpdateProductionBatchRequest;
use App\Models\ProductionBatch;
use Illuminate\Http\Request;

class ProductionBatchController extends Controller
{
    private $crudControllerHelper;

    public function __construct()
    {
        $this->crudControllerHelper = new CRUDControllerHelper(new ProductionBatch);
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
    public function show(ProductionBatch $entity)
    {
        return $this->crudControllerHelper->show($entity);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProductionBatchRequest $request)
    {
        return $this->crudControllerHelper->store($request);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProductionBatchRequest $request, ProductionBatch $entity)
    {
        return $this->crudControllerHelper->update($request, $entity);
    }

    /**
     * Update the specified resource relations in storage.
     */
    public function updateRelation(Request $request, ProductionBatch $entity, string $relation)
    {
        return $this->crudControllerHelper->updateRelation($request, $entity, $relation);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ProductionBatch $entity)
    {
        return $this->crudControllerHelper->destroy($entity);
    }
}
