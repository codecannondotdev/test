<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreBarcodeLabelRequest;
use App\Http\Requests\UpdateBarcodeLabelRequest;
use App\Models\BarcodeLabel;
use Illuminate\Http\Request;

class BarcodeLabelController extends Controller
{
    private $crudControllerHelper;

    public function __construct()
    {
        $this->crudControllerHelper = new CRUDControllerHelper(new BarcodeLabel);
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
    public function show(BarcodeLabel $entity)
    {
        return $this->crudControllerHelper->show($entity);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreBarcodeLabelRequest $request)
    {
        return $this->crudControllerHelper->store($request);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateBarcodeLabelRequest $request, BarcodeLabel $entity)
    {
        return $this->crudControllerHelper->update($request, $entity);
    }

    /**
     * Update the specified resource relations in storage.
     */
    public function updateRelation(Request $request, BarcodeLabel $entity, string $relation)
    {
        return $this->crudControllerHelper->updateRelation($request, $entity, $relation);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(BarcodeLabel $entity)
    {
        return $this->crudControllerHelper->destroy($entity);
    }
}
