<?php

namespace App\Models;

use App\Traits\Searchable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Patient extends Model
{
    use HasFactory, Searchable;

    protected $table = 'patients';

    protected $guarded = [];

    protected $searchable = [
        'last_name',
        'first_name',
        'date_of_birth',
        'gender',
        'phone',
        'email',
        'address',
        'medical_record_number',
        'primary_language',
        'emergency_contact_name',
    ];

    protected $casts = [
        'date_of_birth' => 'datetime',
    ];

    public function appointments()
    {
        return $this->hasMany(Appointment::class, 'patient_id');
    }

    public function medicalRecords()
    {
        return $this->hasMany(MedicalRecord::class, 'patient_id');
    }

    public function prescriptions()
    {
        return $this->hasMany(Prescription::class, 'patient_id');
    }

    public function insurances()
    {
        return $this->belongsToMany(Insurance::class, 'insurances_patients', 'patients_id', 'insurances_id');
    }

    public function allergies()
    {
        return $this->hasMany(Allergy::class, 'patient_id');
    }

    public function admissions()
    {
        return $this->hasMany(Admission::class, 'patient_id');
    }

    public function billingAccounts()
    {
        return $this->hasMany(BillingAccount::class, 'patient_id');
    }

    public function treatments()
    {
        return $this->hasMany(Treatment::class, 'patient_id');
    }

    public function labTests()
    {
        return $this->hasMany(LabTest::class, 'patient_id');
    }

    public function radiologyReports()
    {
        return $this->hasMany(RadiologyReport::class, 'patient_id');
    }

    public function surgeries()
    {
        return $this->hasMany(Surgery::class, 'patient_id');
    }

    public function consentForms()
    {
        return $this->hasMany(ConsentForm::class, 'patient_id');
    }

    public function referrals()
    {
        return $this->hasMany(Referral::class, 'patient_id');
    }

    public function visits()
    {
        return $this->hasMany(Visit::class, 'patient_id');
    }

    public function vitalSigns()
    {
        return $this->hasMany(VitalSign::class, 'patient_id');
    }

    public function diagnoses()
    {
        return $this->hasMany(Diagnosis::class, 'patient_id');
    }

    public function familyContacts()
    {
        return $this->hasMany(FamilyContact::class, 'patient_id');
    }

    public function emergencyContacts()
    {
        return $this->hasMany(EmergencyContact::class, 'patient_id');
    }

    public function carePlans()
    {
        return $this->hasMany(CarePlan::class, 'patient_id');
    }

    public function careTeam()
    {
        return $this->belongsToMany(CareTeam::class, 'care_team_patients', 'patients_id', 'care_team_id');
    }

    public function waitingLists()
    {
        return $this->hasMany(WaitingList::class, 'patient_id');
    }

    public function messages()
    {
        return $this->hasMany(Message::class, 'patient_id');
    }

    public function notifications()
    {
        return $this->hasMany(Notification::class, 'related_patient_id');
    }

    public function imagingStudies()
    {
        return $this->hasMany(ImagingStudy::class, 'patient_id');
    }

    public function pathologyReports()
    {
        return $this->hasMany(PathologyReport::class, 'patient_id');
    }

    public function labOrders()
    {
        return $this->hasMany(LabOrder::class, 'patient_id');
    }

    public function consents()
    {
        return $this->hasMany(Consent::class, 'patient_id');
    }

    public function clinicalTrials()
    {
        return $this->belongsToMany(ClinicalTrial::class, 'clinical_trials_patients', 'patients_id', 'clinical_trials_id');
    }

    public function researchStudies()
    {
        return $this->belongsToMany(ResearchStudy::class, 'participants_research_studies', 'participants_id', 'research_studies_id');
    }

    public function nutritionalPlans()
    {
        return $this->hasMany(NutritionalPlan::class, 'patient_id');
    }

    public function dietOrders()
    {
        return $this->hasMany(DietOrder::class, 'patient_id');
    }

    public function physicalTherapySessions()
    {
        return $this->hasMany(PhysicalTherapySession::class, 'patient_id');
    }

    public function occupationalTherapySessions()
    {
        return $this->hasMany(OccupationalTherapySession::class, 'patient_id');
    }

    public function socialWorkNotes()
    {
        return $this->hasMany(SocialWorkNote::class, 'patient_id');
    }

    public function caseManager()
    {
        return $this->belongsToMany(CaseManager::class, 'case_manager_patients', 'patients_id', 'case_manager_id');
    }

    public function homeCareVisits()
    {
        return $this->hasMany(HomeCareVisit::class, 'patient_id');
    }

    public function hospiceCare()
    {
        return $this->hasMany(HospiceCare::class, 'patient_id');
    }

    public function palliativeCarePlans()
    {
        return $this->hasMany(PalliativeCarePlan::class, 'patient_id');
    }

    public function mortalityReports()
    {
        return $this->hasMany(MortalityReport::class, 'patient_id');
    }

    public function legalHolds()
    {
        return $this->hasMany(LegalHold::class, 'patient_id');
    }

    public function transfusions()
    {
        return $this->hasMany(Transfusion::class, 'patient_id');
    }

    public function vaccineRecords()
    {
        return $this->hasMany(VaccineRecord::class, 'patient_id');
    }

    public function immunizations()
    {
        return $this->belongsToMany(Immunization::class, 'immunizations_patients', 'patients_id', 'immunizations_id');
    }

    public function growthCharts()
    {
        return $this->hasMany(GrowthChart::class, 'patient_id');
    }

    public function screenings()
    {
        return $this->hasMany(Screening::class, 'patient_id');
    }

    public function riskAssessments()
    {
        return $this->hasMany(RiskAssessment::class, 'patient_id');
    }

    public function scores()
    {
        return $this->hasMany(Score::class, 'patient_id');
    }
}
