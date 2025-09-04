<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePaymentRequest;
use App\Http\Requests\UpdatePaymentRequest;
use App\Models\Payment;
use Illuminate\Http\Request;

class PaymentController extends Controller
{
    private $crudControllerHelper;

    public function __construct()
    {
        $this->crudControllerHelper = new CRUDControllerHelper(new Payment);
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
    public function show(Payment $entity)
    {
        return $this->crudControllerHelper->show($entity);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePaymentRequest $request)
    {
        return $this->crudControllerHelper->store($request);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePaymentRequest $request, Payment $entity)
    {
        return $this->crudControllerHelper->update($request, $entity);
    }

    /**
     * Update the specified resource relations in storage.
     */
    public function updateRelation(Request $request, Payment $entity, string $relation)
    {
        return $this->crudControllerHelper->updateRelation($request, $entity, $relation);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Payment $entity)
    {
        return $this->crudControllerHelper->destroy($entity);
    }
}
