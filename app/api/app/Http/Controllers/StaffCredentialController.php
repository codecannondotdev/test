<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreStaffCredentialRequest;
use App\Http\Requests\UpdateStaffCredentialRequest;
use App\Models\StaffCredential;
use Illuminate\Http\Request;

class StaffCredentialController extends Controller
{
    private $crudControllerHelper;

    public function __construct()
    {
        $this->crudControllerHelper = new CRUDControllerHelper(new StaffCredential);
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
    public function show(StaffCredential $entity)
    {
        return $this->crudControllerHelper->show($entity);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreStaffCredentialRequest $request)
    {
        return $this->crudControllerHelper->store($request);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateStaffCredentialRequest $request, StaffCredential $entity)
    {
        return $this->crudControllerHelper->update($request, $entity);
    }

    /**
     * Update the specified resource relations in storage.
     */
    public function updateRelation(Request $request, StaffCredential $entity, string $relation)
    {
        return $this->crudControllerHelper->updateRelation($request, $entity, $relation);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(StaffCredential $entity)
    {
        return $this->crudControllerHelper->destroy($entity);
    }
}
