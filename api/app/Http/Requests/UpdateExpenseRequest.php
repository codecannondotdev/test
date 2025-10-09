<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class UpdateExpenseRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => 'sometimes|required',
            'amount' => 'sometimes|required',
            'date_incurred' => 'sometimes|required',
            'payment_date' => 'nullable',
            'status' => 'nullable',
            'payment_method' => 'nullable',
            'notes' => 'nullable',
            'is_recurring' => 'sometimes|required|boolean',
            'receipt_attached' => 'sometimes|required|boolean',
            'category_id' => 'nullable',
            'vendor_id' => 'nullable',
            'project_id' => 'nullable',
            'budget_id' => 'nullable',
            'currency_id' => 'nullable',
        ];
    }

    /**
     * Handle a failed validation attempt.
     *
     * @return void
     *
     * @throws \Illuminate\Http\Exceptions\HttpResponseException
     */
    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(
            response()->json(
                [
                    'message' => 'The given data was invalid.',
                    'errors' => $validator->errors(),
                ],
                422
            )
        );
    }
}
