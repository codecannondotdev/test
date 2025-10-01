<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreResearchStudyRequest;
use App\Http\Requests\UpdateResearchStudyRequest;
use App\Models\ResearchStudy;
use Illuminate\Http\Request;

class ResearchStudyController extends Controller
{
    private $crudControllerHelper;

    public function __construct()
    {
        $this->crudControllerHelper = new CRUDControllerHelper(new ResearchStudy);
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
    public function show(ResearchStudy $entity)
    {
        return $this->crudControllerHelper->show($entity);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreResearchStudyRequest $request)
    {
        return $this->crudControllerHelper->store($request);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateResearchStudyRequest $request, ResearchStudy $entity)
    {
        return $this->crudControllerHelper->update($request, $entity);
    }

    /**
     * Update the specified resource relations in storage.
     */
    public function updateRelation(Request $request, ResearchStudy $entity, string $relation)
    {
        return $this->crudControllerHelper->updateRelation($request, $entity, $relation);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ResearchStudy $entity)
    {
        return $this->crudControllerHelper->destroy($entity);
    }
}
