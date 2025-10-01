<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreImagingStudyRequest;
use App\Http\Requests\UpdateImagingStudyRequest;
use App\Models\ImagingStudy;
use Illuminate\Http\Request;

class ImagingStudyController extends Controller
{
    private $crudControllerHelper;

    public function __construct()
    {
        $this->crudControllerHelper = new CRUDControllerHelper(new ImagingStudy);
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
    public function show(ImagingStudy $entity)
    {
        return $this->crudControllerHelper->show($entity);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreImagingStudyRequest $request)
    {
        return $this->crudControllerHelper->store($request);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateImagingStudyRequest $request, ImagingStudy $entity)
    {
        return $this->crudControllerHelper->update($request, $entity);
    }

    /**
     * Update the specified resource relations in storage.
     */
    public function updateRelation(Request $request, ImagingStudy $entity, string $relation)
    {
        return $this->crudControllerHelper->updateRelation($request, $entity, $relation);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ImagingStudy $entity)
    {
        return $this->crudControllerHelper->destroy($entity);
    }
}
