<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTrainingRecordRequest;
use App\Http\Requests\UpdateTrainingRecordRequest;
use App\Models\TrainingRecord;
use Illuminate\Http\Request;

class TrainingRecordController extends Controller
{
    private $crudControllerHelper;

    public function __construct()
    {
        $this->crudControllerHelper = new CRUDControllerHelper(new TrainingRecord);
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
    public function show(TrainingRecord $entity)
    {
        return $this->crudControllerHelper->show($entity);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTrainingRecordRequest $request)
    {
        return $this->crudControllerHelper->store($request);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTrainingRecordRequest $request, TrainingRecord $entity)
    {
        return $this->crudControllerHelper->update($request, $entity);
    }

    /**
     * Update the specified resource relations in storage.
     */
    public function updateRelation(Request $request, TrainingRecord $entity, string $relation)
    {
        return $this->crudControllerHelper->updateRelation($request, $entity, $relation);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(TrainingRecord $entity)
    {
        return $this->crudControllerHelper->destroy($entity);
    }
}
