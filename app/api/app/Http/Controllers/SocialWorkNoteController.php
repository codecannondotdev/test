<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreSocialWorkNoteRequest;
use App\Http\Requests\UpdateSocialWorkNoteRequest;
use App\Models\SocialWorkNote;
use Illuminate\Http\Request;

class SocialWorkNoteController extends Controller
{
    private $crudControllerHelper;

    public function __construct()
    {
        $this->crudControllerHelper = new CRUDControllerHelper(new SocialWorkNote);
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
    public function show(SocialWorkNote $entity)
    {
        return $this->crudControllerHelper->show($entity);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSocialWorkNoteRequest $request)
    {
        return $this->crudControllerHelper->store($request);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSocialWorkNoteRequest $request, SocialWorkNote $entity)
    {
        return $this->crudControllerHelper->update($request, $entity);
    }

    /**
     * Update the specified resource relations in storage.
     */
    public function updateRelation(Request $request, SocialWorkNote $entity, string $relation)
    {
        return $this->crudControllerHelper->updateRelation($request, $entity, $relation);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(SocialWorkNote $entity)
    {
        return $this->crudControllerHelper->destroy($entity);
    }
}
