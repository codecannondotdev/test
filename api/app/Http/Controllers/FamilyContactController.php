<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreFamilyContactRequest;
use App\Http\Requests\UpdateFamilyContactRequest;
use App\Models\FamilyContact;
use Illuminate\Http\Request;

class FamilyContactController extends Controller
{
    private $crudControllerHelper;

    public function __construct()
    {
        $this->crudControllerHelper = new CRUDControllerHelper(new FamilyContact);
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
    public function show(FamilyContact $entity)
    {
        return $this->crudControllerHelper->show($entity);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreFamilyContactRequest $request)
    {
        return $this->crudControllerHelper->store($request);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateFamilyContactRequest $request, FamilyContact $entity)
    {
        return $this->crudControllerHelper->update($request, $entity);
    }

    /**
     * Update the specified resource relations in storage.
     */
    public function updateRelation(Request $request, FamilyContact $entity, string $relation)
    {
        return $this->crudControllerHelper->updateRelation($request, $entity, $relation);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(FamilyContact $entity)
    {
        return $this->crudControllerHelper->destroy($entity);
    }
}
