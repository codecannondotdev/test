<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePharmacyOrderRequest;
use App\Http\Requests\UpdatePharmacyOrderRequest;
use App\Models\PharmacyOrder;
use Illuminate\Http\Request;

class PharmacyOrderController extends Controller
{
    private $crudControllerHelper;

    public function __construct()
    {
        $this->crudControllerHelper = new CRUDControllerHelper(new PharmacyOrder);
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
    public function show(PharmacyOrder $entity)
    {
        return $this->crudControllerHelper->show($entity);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePharmacyOrderRequest $request)
    {
        return $this->crudControllerHelper->store($request);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePharmacyOrderRequest $request, PharmacyOrder $entity)
    {
        return $this->crudControllerHelper->update($request, $entity);
    }

    /**
     * Update the specified resource relations in storage.
     */
    public function updateRelation(Request $request, PharmacyOrder $entity, string $relation)
    {
        return $this->crudControllerHelper->updateRelation($request, $entity, $relation);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(PharmacyOrder $entity)
    {
        return $this->crudControllerHelper->destroy($entity);
    }
}
