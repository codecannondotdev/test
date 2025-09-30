<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreAsdfasdfasdRequest;
use App\Http\Requests\UpdateAsdfasdfasdRequest;
use App\Models\Asdfasdfasd;
use Illuminate\Http\Request;

class AsdfasdfasdController extends Controller
{
    private $crudControllerHelper;

    public function __construct()
    {
        $this->crudControllerHelper = new CRUDControllerHelper(new Asdfasdfasd);
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
    public function show(Asdfasdfasd $entity)
    {
        return $this->crudControllerHelper->show($entity);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreAsdfasdfasdRequest $request)
    {
        return $this->crudControllerHelper->store($request);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateAsdfasdfasdRequest $request, Asdfasdfasd $entity)
    {
        return $this->crudControllerHelper->update($request, $entity);
    }

    /**
     * Update the specified resource relations in storage.
     */
    public function updateRelation(Request $request, Asdfasdfasd $entity, string $relation)
    {
        return $this->crudControllerHelper->updateRelation($request, $entity, $relation);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Asdfasdfasd $entity)
    {
        return $this->crudControllerHelper->destroy($entity);
    }
}
