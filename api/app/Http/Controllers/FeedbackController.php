<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreFeedbackRequest;
use App\Http\Requests\UpdateFeedbackRequest;
use App\Models\Feedback;
use Illuminate\Http\Request;

class FeedbackController extends Controller
{
    private $crudControllerHelper;

    public function __construct()
    {
        $this->crudControllerHelper = new CRUDControllerHelper(new Feedback);
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
    public function show(Feedback $entity)
    {
        return $this->crudControllerHelper->show($entity);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreFeedbackRequest $request)
    {
        return $this->crudControllerHelper->store($request);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateFeedbackRequest $request, Feedback $entity)
    {
        return $this->crudControllerHelper->update($request, $entity);
    }

    /**
     * Update the specified resource relations in storage.
     */
    public function updateRelation(Request $request, Feedback $entity, string $relation)
    {
        return $this->crudControllerHelper->updateRelation($request, $entity, $relation);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Feedback $entity)
    {
        return $this->crudControllerHelper->destroy($entity);
    }
}
