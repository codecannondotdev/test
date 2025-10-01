<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreBloodProductRequest;
use App\Http\Requests\UpdateBloodProductRequest;
use App\Models\BloodProduct;
use Illuminate\Http\Request;

class BloodProductController extends Controller
{
    private $crudControllerHelper;

    public function __construct()
    {
        $this->crudControllerHelper = new CRUDControllerHelper(new BloodProduct);
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
    public function show(BloodProduct $entity)
    {
        return $this->crudControllerHelper->show($entity);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreBloodProductRequest $request)
    {
        return $this->crudControllerHelper->store($request);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateBloodProductRequest $request, BloodProduct $entity)
    {
        return $this->crudControllerHelper->update($request, $entity);
    }

    /**
     * Update the specified resource relations in storage.
     */
    public function updateRelation(Request $request, BloodProduct $entity, string $relation)
    {
        return $this->crudControllerHelper->updateRelation($request, $entity, $relation);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(BloodProduct $entity)
    {
        return $this->crudControllerHelper->destroy($entity);
    }
}
