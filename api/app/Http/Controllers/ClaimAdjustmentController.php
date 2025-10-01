<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreClaimAdjustmentRequest;
use App\Http\Requests\UpdateClaimAdjustmentRequest;
use App\Models\ClaimAdjustment;
use Illuminate\Http\Request;

class ClaimAdjustmentController extends Controller
{
    private $crudControllerHelper;

    public function __construct()
    {
        $this->crudControllerHelper = new CRUDControllerHelper(new ClaimAdjustment);
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
    public function show(ClaimAdjustment $entity)
    {
        return $this->crudControllerHelper->show($entity);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreClaimAdjustmentRequest $request)
    {
        return $this->crudControllerHelper->store($request);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateClaimAdjustmentRequest $request, ClaimAdjustment $entity)
    {
        return $this->crudControllerHelper->update($request, $entity);
    }

    /**
     * Update the specified resource relations in storage.
     */
    public function updateRelation(Request $request, ClaimAdjustment $entity, string $relation)
    {
        return $this->crudControllerHelper->updateRelation($request, $entity, $relation);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ClaimAdjustment $entity)
    {
        return $this->crudControllerHelper->destroy($entity);
    }
}
