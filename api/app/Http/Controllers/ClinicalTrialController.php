<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreClinicalTrialRequest;
use App\Http\Requests\UpdateClinicalTrialRequest;
use App\Models\ClinicalTrial;
use Illuminate\Http\Request;

class ClinicalTrialController extends Controller
{
    private $crudControllerHelper;

    public function __construct()
    {
        $this->crudControllerHelper = new CRUDControllerHelper(new ClinicalTrial);
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
    public function show(ClinicalTrial $entity)
    {
        return $this->crudControllerHelper->show($entity);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreClinicalTrialRequest $request)
    {
        return $this->crudControllerHelper->store($request);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateClinicalTrialRequest $request, ClinicalTrial $entity)
    {
        return $this->crudControllerHelper->update($request, $entity);
    }

    /**
     * Update the specified resource relations in storage.
     */
    public function updateRelation(Request $request, ClinicalTrial $entity, string $relation)
    {
        return $this->crudControllerHelper->updateRelation($request, $entity, $relation);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ClinicalTrial $entity)
    {
        return $this->crudControllerHelper->destroy($entity);
    }
}
