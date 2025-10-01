<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class UpdateAppointmentRequest extends FormRequest
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
            'type' => 'nullable',
            'start_time' => 'sometimes|required',
            'end_time' => 'sometimes|required',
            'status' => 'nullable',
            'reason' => 'nullable',
            'location' => 'nullable',
            'patient_id' => 'nullable',
            'doctor_id' => 'nullable',
            'nurse_id' => 'nullable',
            'department_id' => 'nullable',
            'discharge_id' => 'nullable',
            'location_id' => 'nullable',
            'queue_id' => 'nullable',
            'type_id' => 'nullable',
            'referral_source_id' => 'nullable',
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
