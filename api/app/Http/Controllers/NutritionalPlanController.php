<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreNutritionalPlanRequest;
use App\Http\Requests\UpdateNutritionalPlanRequest;
use App\Models\NutritionalPlan;
use Illuminate\Http\Request;

class NutritionalPlanController extends Controller
{
    private $crudControllerHelper;

    public function __construct()
    {
        $this->crudControllerHelper = new CRUDControllerHelper(new NutritionalPlan);
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
    public function show(NutritionalPlan $entity)
    {
        return $this->crudControllerHelper->show($entity);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreNutritionalPlanRequest $request)
    {
        return $this->crudControllerHelper->store($request);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateNutritionalPlanRequest $request, NutritionalPlan $entity)
    {
        return $this->crudControllerHelper->update($request, $entity);
    }

    /**
     * Update the specified resource relations in storage.
     */
    public function updateRelation(Request $request, NutritionalPlan $entity, string $relation)
    {
        return $this->crudControllerHelper->updateRelation($request, $entity, $relation);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(NutritionalPlan $entity)
    {
        return $this->crudControllerHelper->destroy($entity);
    }
}
