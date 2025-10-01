<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCaseManagerRequest;
use App\Http\Requests\UpdateCaseManagerRequest;
use App\Models\CaseManager;
use Illuminate\Http\Request;

class CaseManagerController extends Controller
{
    private $crudControllerHelper;

    public function __construct()
    {
        $this->crudControllerHelper = new CRUDControllerHelper(new CaseManager);
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
    public function show(CaseManager $entity)
    {
        return $this->crudControllerHelper->show($entity);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCaseManagerRequest $request)
    {
        return $this->crudControllerHelper->store($request);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCaseManagerRequest $request, CaseManager $entity)
    {
        return $this->crudControllerHelper->update($request, $entity);
    }

    /**
     * Update the specified resource relations in storage.
     */
    public function updateRelation(Request $request, CaseManager $entity, string $relation)
    {
        return $this->crudControllerHelper->updateRelation($request, $entity, $relation);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(CaseManager $entity)
    {
        return $this->crudControllerHelper->destroy($entity);
    }
}
