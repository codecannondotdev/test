<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        if (User::count() > 0) {
            return;
        }
        $this->call([UserSeeder::class, PatientSeeder::class, DoctorSeeder::class, NurseSeeder::class, AppointmentSeeder::class, DepartmentSeeder::class, TreatmentSeeder::class, MedicationSeeder::class, BillingAccountSeeder::class, InvoiceSeeder::class, PaymentSeeder::class, InsuranceSeeder::class, AllergySeeder::class, MedicalRecordSeeder::class, PrescriptionSeeder::class, LabTestSeeder::class, RadiologyReportSeeder::class, AdmissionSeeder::class, DischargeSeeder::class, BedSeeder::class, WardSeeder::class, OperatingRoomSeeder::class, SurgerySeeder::class, AnesthesiaSeeder::class, ConsentFormSeeder::class, ReferralSeeder::class, VisitSeeder::class, VitalSignSeeder::class, DiagnosisSeeder::class, ProcedureSeeder::class, RoomSeeder::class, ShiftSeeder::class, ScheduleSeeder::class, StaffRoleSeeder::class, SpecialtySeeder::class, NoteSeeder::class, FamilyContactSeeder::class, EmergencyContactSeeder::class, PharmacyOrderSeeder::class, MedicationStockSeeder::class, SupplierSeeder::class, ProcurementOrderSeeder::class, InventoryItemSeeder::class, BillingItemSeeder::class, CurrencySeeder::class, TaxRateSeeder::class, InsuranceClaimSeeder::class, ClaimAdjustmentSeeder::class, PaymentMethodSeeder::class, LedgerAccountSeeder::class, FinancialTransactionSeeder::class, StaffCredentialSeeder::class, CertificationSeeder::class, TrainingRecordSeeder::class, AttendanceSeeder::class, LeaveRequestSeeder::class, ShiftAssignmentSeeder::class, CarePlanSeeder::class, CareTeamSeeder::class, DeviceSeeder::class, MedicalDeviceMaintenanceSeeder::class, QueueSeeder::class, WaitingListSeeder::class, TelemedicineSessionSeeder::class, MessageSeeder::class, NotificationSeeder::class, DocumentSeeder::class, ImagingStudySeeder::class, PathologyReportSeeder::class, LabOrderSeeder::class, SampleSeeder::class, SpecimenSeeder::class, TestResultSeeder::class, BarcodeLabelSeeder::class, ConsentSeeder::class, ClinicalTrialSeeder::class, ResearchStudySeeder::class, AppointmentTypeSeeder::class, FollowUpSeeder::class, ReferralSourceSeeder::class, DischargeSummarySeeder::class, NutritionalPlanSeeder::class, DietOrderSeeder::class, PhysicalTherapySessionSeeder::class, OccupationalTherapySessionSeeder::class, SocialWorkNoteSeeder::class, CaseManagerSeeder::class, HomeCareVisitSeeder::class, HospiceCareSeeder::class, PalliativeCarePlanSeeder::class, MortalityReportSeeder::class, AutopsyReportSeeder::class, LegalHoldSeeder::class, AuditLogSeeder::class, SettingsSeeder::class, RoleSeeder::class, PermissionSeeder::class, ActivityLogSeeder::class, APIKeySeeder::class, IntegrationSeeder::class, HL7MessageSeeder::class, DICOMInstanceSeeder::class, BloodBankSeeder::class, DonorSeeder::class, TransfusionSeeder::class, BloodProductSeeder::class, VaccineRecordSeeder::class, ImmunizationSeeder::class, GrowthChartSeeder::class, ScreeningSeeder::class, RiskAssessmentSeeder::class, ScoreSeeder::class, GeoLocationSeeder::class, FacilitySeeder::class]);
    }
}
