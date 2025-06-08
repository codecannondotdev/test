<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreMiningOperationRequest;
use App\Http\Requests\UpdateMiningOperationRequest;
use App\Models\MiningOperation;
use Illuminate\Http\Request;

class MiningOperationController extends Controller
{
    private $crudControllerHelper;

    public function __construct()
    {
        $this->crudControllerHelper = new CRUDControllerHelper(new MiningOperation);
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
    public function show(MiningOperation $entity)
    {
        return $this->crudControllerHelper->show($entity);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreMiningOperationRequest $request)
    {
        return $this->crudControllerHelper->store($request);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateMiningOperationRequest $request, MiningOperation $entity)
    {
        return $this->crudControllerHelper->update($request, $entity);
    }

    /**
     * Update the specified resource relations in storage.
     */
    public function updateRelation(Request $request, MiningOperation $entity, string $relation)
    {
        return $this->crudControllerHelper->updateRelation($request, $entity, $relation);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(MiningOperation $entity)
    {
        return $this->crudControllerHelper->destroy($entity);
    }
}
