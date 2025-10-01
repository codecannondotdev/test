<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreBillingAccountRequest;
use App\Http\Requests\UpdateBillingAccountRequest;
use App\Models\BillingAccount;
use Illuminate\Http\Request;

class BillingAccountController extends Controller
{
    private $crudControllerHelper;

    public function __construct()
    {
        $this->crudControllerHelper = new CRUDControllerHelper(new BillingAccount);
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
    public function show(BillingAccount $entity)
    {
        return $this->crudControllerHelper->show($entity);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreBillingAccountRequest $request)
    {
        return $this->crudControllerHelper->store($request);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateBillingAccountRequest $request, BillingAccount $entity)
    {
        return $this->crudControllerHelper->update($request, $entity);
    }

    /**
     * Update the specified resource relations in storage.
     */
    public function updateRelation(Request $request, BillingAccount $entity, string $relation)
    {
        return $this->crudControllerHelper->updateRelation($request, $entity, $relation);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(BillingAccount $entity)
    {
        return $this->crudControllerHelper->destroy($entity);
    }
}
