<?php

use App\Http\Controllers\ActivityLogController;
use App\Http\Controllers\AdmissionController;
use App\Http\Controllers\AllergyController;
use App\Http\Controllers\AnesthesiaController;
use App\Http\Controllers\APIKeyController;
use App\Http\Controllers\AppointmentController;
use App\Http\Controllers\AppointmentTypeController;
use App\Http\Controllers\AttendanceController;
use App\Http\Controllers\AuditLogController;
use App\Http\Controllers\AutopsyReportController;
use App\Http\Controllers\BarcodeLabelController;
use App\Http\Controllers\BedController;
use App\Http\Controllers\BillingAccountController;
use App\Http\Controllers\BillingItemController;
use App\Http\Controllers\BloodBankController;
use App\Http\Controllers\BloodProductController;
use App\Http\Controllers\CarePlanController;
use App\Http\Controllers\CareTeamController;
use App\Http\Controllers\CaseManagerController;
use App\Http\Controllers\CertificationController;
use App\Http\Controllers\ClaimAdjustmentController;
use App\Http\Controllers\ClinicalTrialController;
use App\Http\Controllers\ConsentController;
use App\Http\Controllers\ConsentFormController;
use App\Http\Controllers\CurrencyController;
use App\Http\Controllers\DepartmentController;
use App\Http\Controllers\DeviceController;
use App\Http\Controllers\DiagnosisController;
use App\Http\Controllers\DICOMInstanceController;
use App\Http\Controllers\DietOrderController;
use App\Http\Controllers\DischargeController;
use App\Http\Controllers\DischargeSummaryController;
use App\Http\Controllers\DoctorController;
use App\Http\Controllers\DocumentController;
use App\Http\Controllers\DonorController;
use App\Http\Controllers\EmergencyContactController;
use App\Http\Controllers\FacilityController;
use App\Http\Controllers\FamilyContactController;
use App\Http\Controllers\FinancialTransactionController;
use App\Http\Controllers\FollowUpController;
use App\Http\Controllers\GeoLocationController;
use App\Http\Controllers\GrowthChartController;
use App\Http\Controllers\HL7MessageController;
use App\Http\Controllers\HomeCareVisitController;
use App\Http\Controllers\HospiceCareController;
use App\Http\Controllers\ImagingStudyController;
use App\Http\Controllers\ImmunizationController;
use App\Http\Controllers\InsuranceClaimController;
use App\Http\Controllers\InsuranceController;
use App\Http\Controllers\IntegrationController;
use App\Http\Controllers\InventoryItemController;
use App\Http\Controllers\InvoiceController;
use App\Http\Controllers\LabOrderController;
use App\Http\Controllers\LabTestController;
use App\Http\Controllers\LeaveRequestController;
use App\Http\Controllers\LedgerAccountController;
use App\Http\Controllers\LegalHoldController;
use App\Http\Controllers\MedicalDeviceMaintenanceController;
use App\Http\Controllers\MedicalRecordController;
use App\Http\Controllers\MedicationController;
use App\Http\Controllers\MedicationStockController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\MortalityReportController;
use App\Http\Controllers\NoteController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\NurseController;
use App\Http\Controllers\NutritionalPlanController;
use App\Http\Controllers\OccupationalTherapySessionController;
use App\Http\Controllers\OperatingRoomController;
use App\Http\Controllers\PalliativeCarePlanController;
use App\Http\Controllers\PathologyReportController;
use App\Http\Controllers\PatientController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\PaymentMethodController;
use App\Http\Controllers\PermissionController;
use App\Http\Controllers\PharmacyOrderController;
use App\Http\Controllers\PhysicalTherapySessionController;
use App\Http\Controllers\PrescriptionController;
use App\Http\Controllers\ProcedureController;
use App\Http\Controllers\ProcurementOrderController;
use App\Http\Controllers\QueueController;
use App\Http\Controllers\RadiologyReportController;
use App\Http\Controllers\ReferralController;
use App\Http\Controllers\ReferralSourceController;
use App\Http\Controllers\ResearchStudyController;
use App\Http\Controllers\RiskAssessmentController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\RoomController;
use App\Http\Controllers\SampleController;
use App\Http\Controllers\ScheduleController;
use App\Http\Controllers\ScoreController;
use App\Http\Controllers\ScreeningController;
use App\Http\Controllers\SettingsController;
use App\Http\Controllers\ShiftAssignmentController;
use App\Http\Controllers\ShiftController;
use App\Http\Controllers\SocialWorkNoteController;
use App\Http\Controllers\SpecialtyController;
use App\Http\Controllers\SpecimenController;
use App\Http\Controllers\StaffCredentialController;
use App\Http\Controllers\StaffRoleController;
use App\Http\Controllers\SupplierController;
use App\Http\Controllers\SurgeryController;
use App\Http\Controllers\TaxRateController;
use App\Http\Controllers\TelemedicineSessionController;
use App\Http\Controllers\TestResultController;
use App\Http\Controllers\TrainingRecordController;
use App\Http\Controllers\TransfusionController;
use App\Http\Controllers\TreatmentController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\VaccineRecordController;
use App\Http\Controllers\VisitController;
use App\Http\Controllers\VitalSignController;
use App\Http\Controllers\WaitingListController;
use App\Http\Controllers\WardController;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/
Route::get('/', function () {
    return redirect(config('app.ui_url'));
});

Route::group(['middleware' => 'auth:sanctum'], function () {
    Route::post('/clear-data', function () {
        Artisan::call('migrate:fresh', [
            '--force' => true,
        ]);
        Artisan::call('db:seed', [
            '--class' => 'UserSeeder',
            '--force' => true,
        ]);
    });

    Route::resource('/users', UserController::class)->except('index', 'create', 'edit');
    Route::put('/users/{entity}/{relation}', [UserController::class, 'updateRelation']);
    Route::post('/users/list', [UserController::class, 'list']);

    Route::resource('/patients', PatientController::class)->parameters([
        'patients' => 'entity',
    ])->except('index', 'create', 'edit');
    Route::put('/patients/{entity}/{relation}', [PatientController::class, 'updateRelation']);
    Route::post('/patients/list', [PatientController::class, 'list']);

    Route::resource('/doctors', DoctorController::class)->parameters([
        'doctors' => 'entity',
    ])->except('index', 'create', 'edit');
    Route::put('/doctors/{entity}/{relation}', [DoctorController::class, 'updateRelation']);
    Route::post('/doctors/list', [DoctorController::class, 'list']);

    Route::resource('/nurses', NurseController::class)->parameters([
        'nurses' => 'entity',
    ])->except('index', 'create', 'edit');
    Route::put('/nurses/{entity}/{relation}', [NurseController::class, 'updateRelation']);
    Route::post('/nurses/list', [NurseController::class, 'list']);

    Route::resource('/appointments', AppointmentController::class)->parameters([
        'appointments' => 'entity',
    ])->except('index', 'create', 'edit');
    Route::put('/appointments/{entity}/{relation}', [AppointmentController::class, 'updateRelation']);
    Route::post('/appointments/list', [AppointmentController::class, 'list']);

    Route::resource('/departments', DepartmentController::class)->parameters([
        'departments' => 'entity',
    ])->except('index', 'create', 'edit');
    Route::put('/departments/{entity}/{relation}', [DepartmentController::class, 'updateRelation']);
    Route::post('/departments/list', [DepartmentController::class, 'list']);

    Route::resource('/treatments', TreatmentController::class)->parameters([
        'treatments' => 'entity',
    ])->except('index', 'create', 'edit');
    Route::put('/treatments/{entity}/{relation}', [TreatmentController::class, 'updateRelation']);
    Route::post('/treatments/list', [TreatmentController::class, 'list']);

    Route::resource('/medications', MedicationController::class)->parameters([
        'medications' => 'entity',
    ])->except('index', 'create', 'edit');
    Route::put('/medications/{entity}/{relation}', [MedicationController::class, 'updateRelation']);
    Route::post('/medications/list', [MedicationController::class, 'list']);

    Route::resource('/billing-accounts', BillingAccountController::class)->parameters([
        'billing-accounts' => 'entity',
    ])->except('index', 'create', 'edit');
    Route::put('/billing-accounts/{entity}/{relation}', [BillingAccountController::class, 'updateRelation']);
    Route::post('/billing-accounts/list', [BillingAccountController::class, 'list']);

    Route::resource('/invoices', InvoiceController::class)->parameters([
        'invoices' => 'entity',
    ])->except('index', 'create', 'edit');
    Route::put('/invoices/{entity}/{relation}', [InvoiceController::class, 'updateRelation']);
    Route::post('/invoices/list', [InvoiceController::class, 'list']);

    Route::resource('/payments', PaymentController::class)->parameters([
        'payments' => 'entity',
    ])->except('index', 'create', 'edit');
    Route::put('/payments/{entity}/{relation}', [PaymentController::class, 'updateRelation']);
    Route::post('/payments/list', [PaymentController::class, 'list']);

    Route::resource('/insurances', InsuranceController::class)->parameters([
        'insurances' => 'entity',
    ])->except('index', 'create', 'edit');
    Route::put('/insurances/{entity}/{relation}', [InsuranceController::class, 'updateRelation']);
    Route::post('/insurances/list', [InsuranceController::class, 'list']);

    Route::resource('/allergies', AllergyController::class)->parameters([
        'allergies' => 'entity',
    ])->except('index', 'create', 'edit');
    Route::put('/allergies/{entity}/{relation}', [AllergyController::class, 'updateRelation']);
    Route::post('/allergies/list', [AllergyController::class, 'list']);

    Route::resource('/medical-records', MedicalRecordController::class)->parameters([
        'medical-records' => 'entity',
    ])->except('index', 'create', 'edit');
    Route::put('/medical-records/{entity}/{relation}', [MedicalRecordController::class, 'updateRelation']);
    Route::post('/medical-records/list', [MedicalRecordController::class, 'list']);

    Route::resource('/prescriptions', PrescriptionController::class)->parameters([
        'prescriptions' => 'entity',
    ])->except('index', 'create', 'edit');
    Route::put('/prescriptions/{entity}/{relation}', [PrescriptionController::class, 'updateRelation']);
    Route::post('/prescriptions/list', [PrescriptionController::class, 'list']);

    Route::resource('/lab-tests', LabTestController::class)->parameters([
        'lab-tests' => 'entity',
    ])->except('index', 'create', 'edit');
    Route::put('/lab-tests/{entity}/{relation}', [LabTestController::class, 'updateRelation']);
    Route::post('/lab-tests/list', [LabTestController::class, 'list']);

    Route::resource('/radiology-reports', RadiologyReportController::class)->parameters([
        'radiology-reports' => 'entity',
    ])->except('index', 'create', 'edit');
    Route::put('/radiology-reports/{entity}/{relation}', [RadiologyReportController::class, 'updateRelation']);
    Route::post('/radiology-reports/list', [RadiologyReportController::class, 'list']);

    Route::resource('/admissions', AdmissionController::class)->parameters([
        'admissions' => 'entity',
    ])->except('index', 'create', 'edit');
    Route::put('/admissions/{entity}/{relation}', [AdmissionController::class, 'updateRelation']);
    Route::post('/admissions/list', [AdmissionController::class, 'list']);

    Route::resource('/discharges', DischargeController::class)->parameters([
        'discharges' => 'entity',
    ])->except('index', 'create', 'edit');
    Route::put('/discharges/{entity}/{relation}', [DischargeController::class, 'updateRelation']);
    Route::post('/discharges/list', [DischargeController::class, 'list']);

    Route::resource('/beds', BedController::class)->parameters([
        'beds' => 'entity',
    ])->except('index', 'create', 'edit');
    Route::put('/beds/{entity}/{relation}', [BedController::class, 'updateRelation']);
    Route::post('/beds/list', [BedController::class, 'list']);

    Route::resource('/wards', WardController::class)->parameters([
        'wards' => 'entity',
    ])->except('index', 'create', 'edit');
    Route::put('/wards/{entity}/{relation}', [WardController::class, 'updateRelation']);
    Route::post('/wards/list', [WardController::class, 'list']);

    Route::resource('/operating-rooms', OperatingRoomController::class)->parameters([
        'operating-rooms' => 'entity',
    ])->except('index', 'create', 'edit');
    Route::put('/operating-rooms/{entity}/{relation}', [OperatingRoomController::class, 'updateRelation']);
    Route::post('/operating-rooms/list', [OperatingRoomController::class, 'list']);

    Route::resource('/surgeries', SurgeryController::class)->parameters([
        'surgeries' => 'entity',
    ])->except('index', 'create', 'edit');
    Route::put('/surgeries/{entity}/{relation}', [SurgeryController::class, 'updateRelation']);
    Route::post('/surgeries/list', [SurgeryController::class, 'list']);

    Route::resource('/anesthesia', AnesthesiaController::class)->parameters([
        'anesthesia' => 'entity',
    ])->except('index', 'create', 'edit');
    Route::put('/anesthesia/{entity}/{relation}', [AnesthesiaController::class, 'updateRelation']);
    Route::post('/anesthesia/list', [AnesthesiaController::class, 'list']);

    Route::resource('/consent-forms', ConsentFormController::class)->parameters([
        'consent-forms' => 'entity',
    ])->except('index', 'create', 'edit');
    Route::put('/consent-forms/{entity}/{relation}', [ConsentFormController::class, 'updateRelation']);
    Route::post('/consent-forms/list', [ConsentFormController::class, 'list']);

    Route::resource('/referrals', ReferralController::class)->parameters([
        'referrals' => 'entity',
    ])->except('index', 'create', 'edit');
    Route::put('/referrals/{entity}/{relation}', [ReferralController::class, 'updateRelation']);
    Route::post('/referrals/list', [ReferralController::class, 'list']);

    Route::resource('/visits', VisitController::class)->parameters([
        'visits' => 'entity',
    ])->except('index', 'create', 'edit');
    Route::put('/visits/{entity}/{relation}', [VisitController::class, 'updateRelation']);
    Route::post('/visits/list', [VisitController::class, 'list']);

    Route::resource('/vital-signs', VitalSignController::class)->parameters([
        'vital-signs' => 'entity',
    ])->except('index', 'create', 'edit');
    Route::put('/vital-signs/{entity}/{relation}', [VitalSignController::class, 'updateRelation']);
    Route::post('/vital-signs/list', [VitalSignController::class, 'list']);

    Route::resource('/diagnoses', DiagnosisController::class)->parameters([
        'diagnoses' => 'entity',
    ])->except('index', 'create', 'edit');
    Route::put('/diagnoses/{entity}/{relation}', [DiagnosisController::class, 'updateRelation']);
    Route::post('/diagnoses/list', [DiagnosisController::class, 'list']);

    Route::resource('/procedures', ProcedureController::class)->parameters([
        'procedures' => 'entity',
    ])->except('index', 'create', 'edit');
    Route::put('/procedures/{entity}/{relation}', [ProcedureController::class, 'updateRelation']);
    Route::post('/procedures/list', [ProcedureController::class, 'list']);

    Route::resource('/rooms', RoomController::class)->parameters([
        'rooms' => 'entity',
    ])->except('index', 'create', 'edit');
    Route::put('/rooms/{entity}/{relation}', [RoomController::class, 'updateRelation']);
    Route::post('/rooms/list', [RoomController::class, 'list']);

    Route::resource('/shifts', ShiftController::class)->parameters([
        'shifts' => 'entity',
    ])->except('index', 'create', 'edit');
    Route::put('/shifts/{entity}/{relation}', [ShiftController::class, 'updateRelation']);
    Route::post('/shifts/list', [ShiftController::class, 'list']);

    Route::resource('/schedules', ScheduleController::class)->parameters([
        'schedules' => 'entity',
    ])->except('index', 'create', 'edit');
    Route::put('/schedules/{entity}/{relation}', [ScheduleController::class, 'updateRelation']);
    Route::post('/schedules/list', [ScheduleController::class, 'list']);

    Route::resource('/staff-roles', StaffRoleController::class)->parameters([
        'staff-roles' => 'entity',
    ])->except('index', 'create', 'edit');
    Route::put('/staff-roles/{entity}/{relation}', [StaffRoleController::class, 'updateRelation']);
    Route::post('/staff-roles/list', [StaffRoleController::class, 'list']);

    Route::resource('/specialties', SpecialtyController::class)->parameters([
        'specialties' => 'entity',
    ])->except('index', 'create', 'edit');
    Route::put('/specialties/{entity}/{relation}', [SpecialtyController::class, 'updateRelation']);
    Route::post('/specialties/list', [SpecialtyController::class, 'list']);

    Route::resource('/notes', NoteController::class)->parameters([
        'notes' => 'entity',
    ])->except('index', 'create', 'edit');
    Route::put('/notes/{entity}/{relation}', [NoteController::class, 'updateRelation']);
    Route::post('/notes/list', [NoteController::class, 'list']);

    Route::resource('/family-contacts', FamilyContactController::class)->parameters([
        'family-contacts' => 'entity',
    ])->except('index', 'create', 'edit');
    Route::put('/family-contacts/{entity}/{relation}', [FamilyContactController::class, 'updateRelation']);
    Route::post('/family-contacts/list', [FamilyContactController::class, 'list']);

    Route::resource('/emergency-contacts', EmergencyContactController::class)->parameters([
        'emergency-contacts' => 'entity',
    ])->except('index', 'create', 'edit');
    Route::put('/emergency-contacts/{entity}/{relation}', [EmergencyContactController::class, 'updateRelation']);
    Route::post('/emergency-contacts/list', [EmergencyContactController::class, 'list']);

    Route::resource('/pharmacy-orders', PharmacyOrderController::class)->parameters([
        'pharmacy-orders' => 'entity',
    ])->except('index', 'create', 'edit');
    Route::put('/pharmacy-orders/{entity}/{relation}', [PharmacyOrderController::class, 'updateRelation']);
    Route::post('/pharmacy-orders/list', [PharmacyOrderController::class, 'list']);

    Route::resource('/medication-stocks', MedicationStockController::class)->parameters([
        'medication-stocks' => 'entity',
    ])->except('index', 'create', 'edit');
    Route::put('/medication-stocks/{entity}/{relation}', [MedicationStockController::class, 'updateRelation']);
    Route::post('/medication-stocks/list', [MedicationStockController::class, 'list']);

    Route::resource('/suppliers', SupplierController::class)->parameters([
        'suppliers' => 'entity',
    ])->except('index', 'create', 'edit');
    Route::put('/suppliers/{entity}/{relation}', [SupplierController::class, 'updateRelation']);
    Route::post('/suppliers/list', [SupplierController::class, 'list']);

    Route::resource('/procurement-orders', ProcurementOrderController::class)->parameters([
        'procurement-orders' => 'entity',
    ])->except('index', 'create', 'edit');
    Route::put('/procurement-orders/{entity}/{relation}', [ProcurementOrderController::class, 'updateRelation']);
    Route::post('/procurement-orders/list', [ProcurementOrderController::class, 'list']);

    Route::resource('/inventory-items', InventoryItemController::class)->parameters([
        'inventory-items' => 'entity',
    ])->except('index', 'create', 'edit');
    Route::put('/inventory-items/{entity}/{relation}', [InventoryItemController::class, 'updateRelation']);
    Route::post('/inventory-items/list', [InventoryItemController::class, 'list']);

    Route::resource('/billing-items', BillingItemController::class)->parameters([
        'billing-items' => 'entity',
    ])->except('index', 'create', 'edit');
    Route::put('/billing-items/{entity}/{relation}', [BillingItemController::class, 'updateRelation']);
    Route::post('/billing-items/list', [BillingItemController::class, 'list']);

    Route::resource('/currencies', CurrencyController::class)->parameters([
        'currencies' => 'entity',
    ])->except('index', 'create', 'edit');
    Route::put('/currencies/{entity}/{relation}', [CurrencyController::class, 'updateRelation']);
    Route::post('/currencies/list', [CurrencyController::class, 'list']);

    Route::resource('/tax-rates', TaxRateController::class)->parameters([
        'tax-rates' => 'entity',
    ])->except('index', 'create', 'edit');
    Route::put('/tax-rates/{entity}/{relation}', [TaxRateController::class, 'updateRelation']);
    Route::post('/tax-rates/list', [TaxRateController::class, 'list']);

    Route::resource('/insurance-claims', InsuranceClaimController::class)->parameters([
        'insurance-claims' => 'entity',
    ])->except('index', 'create', 'edit');
    Route::put('/insurance-claims/{entity}/{relation}', [InsuranceClaimController::class, 'updateRelation']);
    Route::post('/insurance-claims/list', [InsuranceClaimController::class, 'list']);

    Route::resource('/claim-adjustments', ClaimAdjustmentController::class)->parameters([
        'claim-adjustments' => 'entity',
    ])->except('index', 'create', 'edit');
    Route::put('/claim-adjustments/{entity}/{relation}', [ClaimAdjustmentController::class, 'updateRelation']);
    Route::post('/claim-adjustments/list', [ClaimAdjustmentController::class, 'list']);

    Route::resource('/payment-methods', PaymentMethodController::class)->parameters([
        'payment-methods' => 'entity',
    ])->except('index', 'create', 'edit');
    Route::put('/payment-methods/{entity}/{relation}', [PaymentMethodController::class, 'updateRelation']);
    Route::post('/payment-methods/list', [PaymentMethodController::class, 'list']);

    Route::resource('/ledger-accounts', LedgerAccountController::class)->parameters([
        'ledger-accounts' => 'entity',
    ])->except('index', 'create', 'edit');
    Route::put('/ledger-accounts/{entity}/{relation}', [LedgerAccountController::class, 'updateRelation']);
    Route::post('/ledger-accounts/list', [LedgerAccountController::class, 'list']);

    Route::resource('/financial-transactions', FinancialTransactionController::class)->parameters([
        'financial-transactions' => 'entity',
    ])->except('index', 'create', 'edit');
    Route::put('/financial-transactions/{entity}/{relation}', [FinancialTransactionController::class, 'updateRelation']);
    Route::post('/financial-transactions/list', [FinancialTransactionController::class, 'list']);

    Route::resource('/staff-credentials', StaffCredentialController::class)->parameters([
        'staff-credentials' => 'entity',
    ])->except('index', 'create', 'edit');
    Route::put('/staff-credentials/{entity}/{relation}', [StaffCredentialController::class, 'updateRelation']);
    Route::post('/staff-credentials/list', [StaffCredentialController::class, 'list']);

    Route::resource('/certifications', CertificationController::class)->parameters([
        'certifications' => 'entity',
    ])->except('index', 'create', 'edit');
    Route::put('/certifications/{entity}/{relation}', [CertificationController::class, 'updateRelation']);
    Route::post('/certifications/list', [CertificationController::class, 'list']);

    Route::resource('/training-records', TrainingRecordController::class)->parameters([
        'training-records' => 'entity',
    ])->except('index', 'create', 'edit');
    Route::put('/training-records/{entity}/{relation}', [TrainingRecordController::class, 'updateRelation']);
    Route::post('/training-records/list', [TrainingRecordController::class, 'list']);

    Route::resource('/attendances', AttendanceController::class)->parameters([
        'attendances' => 'entity',
    ])->except('index', 'create', 'edit');
    Route::put('/attendances/{entity}/{relation}', [AttendanceController::class, 'updateRelation']);
    Route::post('/attendances/list', [AttendanceController::class, 'list']);

    Route::resource('/leave-requests', LeaveRequestController::class)->parameters([
        'leave-requests' => 'entity',
    ])->except('index', 'create', 'edit');
    Route::put('/leave-requests/{entity}/{relation}', [LeaveRequestController::class, 'updateRelation']);
    Route::post('/leave-requests/list', [LeaveRequestController::class, 'list']);

    Route::resource('/shift-assignments', ShiftAssignmentController::class)->parameters([
        'shift-assignments' => 'entity',
    ])->except('index', 'create', 'edit');
    Route::put('/shift-assignments/{entity}/{relation}', [ShiftAssignmentController::class, 'updateRelation']);
    Route::post('/shift-assignments/list', [ShiftAssignmentController::class, 'list']);

    Route::resource('/care-plans', CarePlanController::class)->parameters([
        'care-plans' => 'entity',
    ])->except('index', 'create', 'edit');
    Route::put('/care-plans/{entity}/{relation}', [CarePlanController::class, 'updateRelation']);
    Route::post('/care-plans/list', [CarePlanController::class, 'list']);

    Route::resource('/care-teams', CareTeamController::class)->parameters([
        'care-teams' => 'entity',
    ])->except('index', 'create', 'edit');
    Route::put('/care-teams/{entity}/{relation}', [CareTeamController::class, 'updateRelation']);
    Route::post('/care-teams/list', [CareTeamController::class, 'list']);

    Route::resource('/devices', DeviceController::class)->parameters([
        'devices' => 'entity',
    ])->except('index', 'create', 'edit');
    Route::put('/devices/{entity}/{relation}', [DeviceController::class, 'updateRelation']);
    Route::post('/devices/list', [DeviceController::class, 'list']);

    Route::resource('/medical-device-maintenances', MedicalDeviceMaintenanceController::class)->parameters([
        'medical-device-maintenances' => 'entity',
    ])->except('index', 'create', 'edit');
    Route::put('/medical-device-maintenances/{entity}/{relation}', [MedicalDeviceMaintenanceController::class, 'updateRelation']);
    Route::post('/medical-device-maintenances/list', [MedicalDeviceMaintenanceController::class, 'list']);

    Route::resource('/queues', QueueController::class)->parameters([
        'queues' => 'entity',
    ])->except('index', 'create', 'edit');
    Route::put('/queues/{entity}/{relation}', [QueueController::class, 'updateRelation']);
    Route::post('/queues/list', [QueueController::class, 'list']);

    Route::resource('/waiting-lists', WaitingListController::class)->parameters([
        'waiting-lists' => 'entity',
    ])->except('index', 'create', 'edit');
    Route::put('/waiting-lists/{entity}/{relation}', [WaitingListController::class, 'updateRelation']);
    Route::post('/waiting-lists/list', [WaitingListController::class, 'list']);

    Route::resource('/telemedicine-sessions', TelemedicineSessionController::class)->parameters([
        'telemedicine-sessions' => 'entity',
    ])->except('index', 'create', 'edit');
    Route::put('/telemedicine-sessions/{entity}/{relation}', [TelemedicineSessionController::class, 'updateRelation']);
    Route::post('/telemedicine-sessions/list', [TelemedicineSessionController::class, 'list']);

    Route::resource('/messages', MessageController::class)->parameters([
        'messages' => 'entity',
    ])->except('index', 'create', 'edit');
    Route::put('/messages/{entity}/{relation}', [MessageController::class, 'updateRelation']);
    Route::post('/messages/list', [MessageController::class, 'list']);

    Route::resource('/notifications', NotificationController::class)->parameters([
        'notifications' => 'entity',
    ])->except('index', 'create', 'edit');
    Route::put('/notifications/{entity}/{relation}', [NotificationController::class, 'updateRelation']);
    Route::post('/notifications/list', [NotificationController::class, 'list']);

    Route::resource('/documents', DocumentController::class)->parameters([
        'documents' => 'entity',
    ])->except('index', 'create', 'edit');
    Route::put('/documents/{entity}/{relation}', [DocumentController::class, 'updateRelation']);
    Route::post('/documents/list', [DocumentController::class, 'list']);

    Route::resource('/imaging-studies', ImagingStudyController::class)->parameters([
        'imaging-studies' => 'entity',
    ])->except('index', 'create', 'edit');
    Route::put('/imaging-studies/{entity}/{relation}', [ImagingStudyController::class, 'updateRelation']);
    Route::post('/imaging-studies/list', [ImagingStudyController::class, 'list']);

    Route::resource('/pathology-reports', PathologyReportController::class)->parameters([
        'pathology-reports' => 'entity',
    ])->except('index', 'create', 'edit');
    Route::put('/pathology-reports/{entity}/{relation}', [PathologyReportController::class, 'updateRelation']);
    Route::post('/pathology-reports/list', [PathologyReportController::class, 'list']);

    Route::resource('/lab-orders', LabOrderController::class)->parameters([
        'lab-orders' => 'entity',
    ])->except('index', 'create', 'edit');
    Route::put('/lab-orders/{entity}/{relation}', [LabOrderController::class, 'updateRelation']);
    Route::post('/lab-orders/list', [LabOrderController::class, 'list']);

    Route::resource('/samples', SampleController::class)->parameters([
        'samples' => 'entity',
    ])->except('index', 'create', 'edit');
    Route::put('/samples/{entity}/{relation}', [SampleController::class, 'updateRelation']);
    Route::post('/samples/list', [SampleController::class, 'list']);

    Route::resource('/specimens', SpecimenController::class)->parameters([
        'specimens' => 'entity',
    ])->except('index', 'create', 'edit');
    Route::put('/specimens/{entity}/{relation}', [SpecimenController::class, 'updateRelation']);
    Route::post('/specimens/list', [SpecimenController::class, 'list']);

    Route::resource('/test-results', TestResultController::class)->parameters([
        'test-results' => 'entity',
    ])->except('index', 'create', 'edit');
    Route::put('/test-results/{entity}/{relation}', [TestResultController::class, 'updateRelation']);
    Route::post('/test-results/list', [TestResultController::class, 'list']);

    Route::resource('/barcode-labels', BarcodeLabelController::class)->parameters([
        'barcode-labels' => 'entity',
    ])->except('index', 'create', 'edit');
    Route::put('/barcode-labels/{entity}/{relation}', [BarcodeLabelController::class, 'updateRelation']);
    Route::post('/barcode-labels/list', [BarcodeLabelController::class, 'list']);

    Route::resource('/consents', ConsentController::class)->parameters([
        'consents' => 'entity',
    ])->except('index', 'create', 'edit');
    Route::put('/consents/{entity}/{relation}', [ConsentController::class, 'updateRelation']);
    Route::post('/consents/list', [ConsentController::class, 'list']);

    Route::resource('/clinical-trials', ClinicalTrialController::class)->parameters([
        'clinical-trials' => 'entity',
    ])->except('index', 'create', 'edit');
    Route::put('/clinical-trials/{entity}/{relation}', [ClinicalTrialController::class, 'updateRelation']);
    Route::post('/clinical-trials/list', [ClinicalTrialController::class, 'list']);

    Route::resource('/research-studies', ResearchStudyController::class)->parameters([
        'research-studies' => 'entity',
    ])->except('index', 'create', 'edit');
    Route::put('/research-studies/{entity}/{relation}', [ResearchStudyController::class, 'updateRelation']);
    Route::post('/research-studies/list', [ResearchStudyController::class, 'list']);

    Route::resource('/appointment-types', AppointmentTypeController::class)->parameters([
        'appointment-types' => 'entity',
    ])->except('index', 'create', 'edit');
    Route::put('/appointment-types/{entity}/{relation}', [AppointmentTypeController::class, 'updateRelation']);
    Route::post('/appointment-types/list', [AppointmentTypeController::class, 'list']);

    Route::resource('/follow-ups', FollowUpController::class)->parameters([
        'follow-ups' => 'entity',
    ])->except('index', 'create', 'edit');
    Route::put('/follow-ups/{entity}/{relation}', [FollowUpController::class, 'updateRelation']);
    Route::post('/follow-ups/list', [FollowUpController::class, 'list']);

    Route::resource('/referral-sources', ReferralSourceController::class)->parameters([
        'referral-sources' => 'entity',
    ])->except('index', 'create', 'edit');
    Route::put('/referral-sources/{entity}/{relation}', [ReferralSourceController::class, 'updateRelation']);
    Route::post('/referral-sources/list', [ReferralSourceController::class, 'list']);

    Route::resource('/discharge-summaries', DischargeSummaryController::class)->parameters([
        'discharge-summaries' => 'entity',
    ])->except('index', 'create', 'edit');
    Route::put('/discharge-summaries/{entity}/{relation}', [DischargeSummaryController::class, 'updateRelation']);
    Route::post('/discharge-summaries/list', [DischargeSummaryController::class, 'list']);

    Route::resource('/nutritional-plans', NutritionalPlanController::class)->parameters([
        'nutritional-plans' => 'entity',
    ])->except('index', 'create', 'edit');
    Route::put('/nutritional-plans/{entity}/{relation}', [NutritionalPlanController::class, 'updateRelation']);
    Route::post('/nutritional-plans/list', [NutritionalPlanController::class, 'list']);

    Route::resource('/diet-orders', DietOrderController::class)->parameters([
        'diet-orders' => 'entity',
    ])->except('index', 'create', 'edit');
    Route::put('/diet-orders/{entity}/{relation}', [DietOrderController::class, 'updateRelation']);
    Route::post('/diet-orders/list', [DietOrderController::class, 'list']);

    Route::resource('/physical-therapy-sessions', PhysicalTherapySessionController::class)->parameters([
        'physical-therapy-sessions' => 'entity',
    ])->except('index', 'create', 'edit');
    Route::put('/physical-therapy-sessions/{entity}/{relation}', [PhysicalTherapySessionController::class, 'updateRelation']);
    Route::post('/physical-therapy-sessions/list', [PhysicalTherapySessionController::class, 'list']);

    Route::resource('/occupational-therapy-sessions', OccupationalTherapySessionController::class)->parameters([
        'occupational-therapy-sessions' => 'entity',
    ])->except('index', 'create', 'edit');
    Route::put('/occupational-therapy-sessions/{entity}/{relation}', [OccupationalTherapySessionController::class, 'updateRelation']);
    Route::post('/occupational-therapy-sessions/list', [OccupationalTherapySessionController::class, 'list']);

    Route::resource('/social-work-notes', SocialWorkNoteController::class)->parameters([
        'social-work-notes' => 'entity',
    ])->except('index', 'create', 'edit');
    Route::put('/social-work-notes/{entity}/{relation}', [SocialWorkNoteController::class, 'updateRelation']);
    Route::post('/social-work-notes/list', [SocialWorkNoteController::class, 'list']);

    Route::resource('/case-managers', CaseManagerController::class)->parameters([
        'case-managers' => 'entity',
    ])->except('index', 'create', 'edit');
    Route::put('/case-managers/{entity}/{relation}', [CaseManagerController::class, 'updateRelation']);
    Route::post('/case-managers/list', [CaseManagerController::class, 'list']);

    Route::resource('/home-care-visits', HomeCareVisitController::class)->parameters([
        'home-care-visits' => 'entity',
    ])->except('index', 'create', 'edit');
    Route::put('/home-care-visits/{entity}/{relation}', [HomeCareVisitController::class, 'updateRelation']);
    Route::post('/home-care-visits/list', [HomeCareVisitController::class, 'list']);

    Route::resource('/hospice-cares', HospiceCareController::class)->parameters([
        'hospice-cares' => 'entity',
    ])->except('index', 'create', 'edit');
    Route::put('/hospice-cares/{entity}/{relation}', [HospiceCareController::class, 'updateRelation']);
    Route::post('/hospice-cares/list', [HospiceCareController::class, 'list']);

    Route::resource('/palliative-care-plans', PalliativeCarePlanController::class)->parameters([
        'palliative-care-plans' => 'entity',
    ])->except('index', 'create', 'edit');
    Route::put('/palliative-care-plans/{entity}/{relation}', [PalliativeCarePlanController::class, 'updateRelation']);
    Route::post('/palliative-care-plans/list', [PalliativeCarePlanController::class, 'list']);

    Route::resource('/mortality-reports', MortalityReportController::class)->parameters([
        'mortality-reports' => 'entity',
    ])->except('index', 'create', 'edit');
    Route::put('/mortality-reports/{entity}/{relation}', [MortalityReportController::class, 'updateRelation']);
    Route::post('/mortality-reports/list', [MortalityReportController::class, 'list']);

    Route::resource('/autopsy-reports', AutopsyReportController::class)->parameters([
        'autopsy-reports' => 'entity',
    ])->except('index', 'create', 'edit');
    Route::put('/autopsy-reports/{entity}/{relation}', [AutopsyReportController::class, 'updateRelation']);
    Route::post('/autopsy-reports/list', [AutopsyReportController::class, 'list']);

    Route::resource('/legal-holds', LegalHoldController::class)->parameters([
        'legal-holds' => 'entity',
    ])->except('index', 'create', 'edit');
    Route::put('/legal-holds/{entity}/{relation}', [LegalHoldController::class, 'updateRelation']);
    Route::post('/legal-holds/list', [LegalHoldController::class, 'list']);

    Route::resource('/audit-logs', AuditLogController::class)->parameters([
        'audit-logs' => 'entity',
    ])->except('index', 'create', 'edit');
    Route::put('/audit-logs/{entity}/{relation}', [AuditLogController::class, 'updateRelation']);
    Route::post('/audit-logs/list', [AuditLogController::class, 'list']);

    Route::resource('/settings', SettingsController::class)->parameters([
        'settings' => 'entity',
    ])->except('index', 'create', 'edit');
    Route::put('/settings/{entity}/{relation}', [SettingsController::class, 'updateRelation']);
    Route::post('/settings/list', [SettingsController::class, 'list']);

    Route::resource('/roles', RoleController::class)->parameters([
        'roles' => 'entity',
    ])->except('index', 'create', 'edit');
    Route::put('/roles/{entity}/{relation}', [RoleController::class, 'updateRelation']);
    Route::post('/roles/list', [RoleController::class, 'list']);

    Route::resource('/permissions', PermissionController::class)->parameters([
        'permissions' => 'entity',
    ])->except('index', 'create', 'edit');
    Route::put('/permissions/{entity}/{relation}', [PermissionController::class, 'updateRelation']);
    Route::post('/permissions/list', [PermissionController::class, 'list']);

    Route::resource('/activity-logs', ActivityLogController::class)->parameters([
        'activity-logs' => 'entity',
    ])->except('index', 'create', 'edit');
    Route::put('/activity-logs/{entity}/{relation}', [ActivityLogController::class, 'updateRelation']);
    Route::post('/activity-logs/list', [ActivityLogController::class, 'list']);

    Route::resource('/api-keys', APIKeyController::class)->parameters([
        'api-keys' => 'entity',
    ])->except('index', 'create', 'edit');
    Route::put('/api-keys/{entity}/{relation}', [APIKeyController::class, 'updateRelation']);
    Route::post('/api-keys/list', [APIKeyController::class, 'list']);

    Route::resource('/integrations', IntegrationController::class)->parameters([
        'integrations' => 'entity',
    ])->except('index', 'create', 'edit');
    Route::put('/integrations/{entity}/{relation}', [IntegrationController::class, 'updateRelation']);
    Route::post('/integrations/list', [IntegrationController::class, 'list']);

    Route::resource('/hl7-messages', HL7MessageController::class)->parameters([
        'hl7-messages' => 'entity',
    ])->except('index', 'create', 'edit');
    Route::put('/hl7-messages/{entity}/{relation}', [HL7MessageController::class, 'updateRelation']);
    Route::post('/hl7-messages/list', [HL7MessageController::class, 'list']);

    Route::resource('/dicom-instances', DICOMInstanceController::class)->parameters([
        'dicom-instances' => 'entity',
    ])->except('index', 'create', 'edit');
    Route::put('/dicom-instances/{entity}/{relation}', [DICOMInstanceController::class, 'updateRelation']);
    Route::post('/dicom-instances/list', [DICOMInstanceController::class, 'list']);

    Route::resource('/blood-banks', BloodBankController::class)->parameters([
        'blood-banks' => 'entity',
    ])->except('index', 'create', 'edit');
    Route::put('/blood-banks/{entity}/{relation}', [BloodBankController::class, 'updateRelation']);
    Route::post('/blood-banks/list', [BloodBankController::class, 'list']);

    Route::resource('/donors', DonorController::class)->parameters([
        'donors' => 'entity',
    ])->except('index', 'create', 'edit');
    Route::put('/donors/{entity}/{relation}', [DonorController::class, 'updateRelation']);
    Route::post('/donors/list', [DonorController::class, 'list']);

    Route::resource('/transfusions', TransfusionController::class)->parameters([
        'transfusions' => 'entity',
    ])->except('index', 'create', 'edit');
    Route::put('/transfusions/{entity}/{relation}', [TransfusionController::class, 'updateRelation']);
    Route::post('/transfusions/list', [TransfusionController::class, 'list']);

    Route::resource('/blood-products', BloodProductController::class)->parameters([
        'blood-products' => 'entity',
    ])->except('index', 'create', 'edit');
    Route::put('/blood-products/{entity}/{relation}', [BloodProductController::class, 'updateRelation']);
    Route::post('/blood-products/list', [BloodProductController::class, 'list']);

    Route::resource('/vaccine-records', VaccineRecordController::class)->parameters([
        'vaccine-records' => 'entity',
    ])->except('index', 'create', 'edit');
    Route::put('/vaccine-records/{entity}/{relation}', [VaccineRecordController::class, 'updateRelation']);
    Route::post('/vaccine-records/list', [VaccineRecordController::class, 'list']);

    Route::resource('/immunizations', ImmunizationController::class)->parameters([
        'immunizations' => 'entity',
    ])->except('index', 'create', 'edit');
    Route::put('/immunizations/{entity}/{relation}', [ImmunizationController::class, 'updateRelation']);
    Route::post('/immunizations/list', [ImmunizationController::class, 'list']);

    Route::resource('/growth-charts', GrowthChartController::class)->parameters([
        'growth-charts' => 'entity',
    ])->except('index', 'create', 'edit');
    Route::put('/growth-charts/{entity}/{relation}', [GrowthChartController::class, 'updateRelation']);
    Route::post('/growth-charts/list', [GrowthChartController::class, 'list']);

    Route::resource('/screenings', ScreeningController::class)->parameters([
        'screenings' => 'entity',
    ])->except('index', 'create', 'edit');
    Route::put('/screenings/{entity}/{relation}', [ScreeningController::class, 'updateRelation']);
    Route::post('/screenings/list', [ScreeningController::class, 'list']);

    Route::resource('/risk-assessments', RiskAssessmentController::class)->parameters([
        'risk-assessments' => 'entity',
    ])->except('index', 'create', 'edit');
    Route::put('/risk-assessments/{entity}/{relation}', [RiskAssessmentController::class, 'updateRelation']);
    Route::post('/risk-assessments/list', [RiskAssessmentController::class, 'list']);

    Route::resource('/scores', ScoreController::class)->parameters([
        'scores' => 'entity',
    ])->except('index', 'create', 'edit');
    Route::put('/scores/{entity}/{relation}', [ScoreController::class, 'updateRelation']);
    Route::post('/scores/list', [ScoreController::class, 'list']);

    Route::resource('/geo-locations', GeoLocationController::class)->parameters([
        'geo-locations' => 'entity',
    ])->except('index', 'create', 'edit');
    Route::put('/geo-locations/{entity}/{relation}', [GeoLocationController::class, 'updateRelation']);
    Route::post('/geo-locations/list', [GeoLocationController::class, 'list']);

    Route::resource('/facilities', FacilityController::class)->parameters([
        'facilities' => 'entity',
    ])->except('index', 'create', 'edit');
    Route::put('/facilities/{entity}/{relation}', [FacilityController::class, 'updateRelation']);
    Route::post('/facilities/list', [FacilityController::class, 'list']);
});
