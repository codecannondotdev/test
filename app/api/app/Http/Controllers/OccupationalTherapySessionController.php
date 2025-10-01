<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreOccupationalTherapySessionRequest;
use App\Http\Requests\UpdateOccupationalTherapySessionRequest;
use App\Models\OccupationalTherapySession;
use Illuminate\Http\Request;

class OccupationalTherapySessionController extends Controller
{
    private $crudControllerHelper;

    public function __construct()
    {
        $this->crudControllerHelper = new CRUDControllerHelper(new OccupationalTherapySession);
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
    public function show(OccupationalTherapySession $entity)
    {
        return $this->crudControllerHelper->show($entity);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreOccupationalTherapySessionRequest $request)
    {
        return $this->crudControllerHelper->store($request);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateOccupationalTherapySessionRequest $request, OccupationalTherapySession $entity)
    {
        return $this->crudControllerHelper->update($request, $entity);
    }

    /**
     * Update the specified resource relations in storage.
     */
    public function updateRelation(Request $request, OccupationalTherapySession $entity, string $relation)
    {
        return $this->crudControllerHelper->updateRelation($request, $entity, $relation);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(OccupationalTherapySession $entity)
    {
        return $this->crudControllerHelper->destroy($entity);
    }
}
