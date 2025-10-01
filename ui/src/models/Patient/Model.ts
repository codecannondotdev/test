import type { Column, Plain, Model, Relation } from '@/helpers/models/Model'
import type { AppointmentModel } from '@/models/Appointment/Model'
import type { MedicalRecordModel } from '@/models/MedicalRecord/Model'
import type { PrescriptionModel } from '@/models/Prescription/Model'
import type { InsuranceModel } from '@/models/Insurance/Model'
import type { AllergyModel } from '@/models/Allergy/Model'
import type { AdmissionModel } from '@/models/Admission/Model'
import type { BillingAccountModel } from '@/models/BillingAccount/Model'
import type { TreatmentModel } from '@/models/Treatment/Model'
import type { LabTestModel } from '@/models/LabTest/Model'
import type { RadiologyReportModel } from '@/models/RadiologyReport/Model'
import type { SurgeryModel } from '@/models/Surgery/Model'
import type { ConsentFormModel } from '@/models/ConsentForm/Model'
import type { ReferralModel } from '@/models/Referral/Model'
import type { VisitModel } from '@/models/Visit/Model'
import type { VitalSignModel } from '@/models/VitalSign/Model'
import type { DiagnosisModel } from '@/models/Diagnosis/Model'
import type { FamilyContactModel } from '@/models/FamilyContact/Model'
import type { EmergencyContactModel } from '@/models/EmergencyContact/Model'
import type { CarePlanModel } from '@/models/CarePlan/Model'
import type { CareTeamModel } from '@/models/CareTeam/Model'
import type { WaitingListModel } from '@/models/WaitingList/Model'
import type { MessageModel } from '@/models/Message/Model'
import type { NotificationModel } from '@/models/Notification/Model'
import type { ImagingStudyModel } from '@/models/ImagingStudy/Model'
import type { PathologyReportModel } from '@/models/PathologyReport/Model'
import type { LabOrderModel } from '@/models/LabOrder/Model'
import type { ConsentModel } from '@/models/Consent/Model'
import type { ClinicalTrialModel } from '@/models/ClinicalTrial/Model'
import type { ResearchStudyModel } from '@/models/ResearchStudy/Model'
import type { NutritionalPlanModel } from '@/models/NutritionalPlan/Model'
import type { DietOrderModel } from '@/models/DietOrder/Model'
import type { PhysicalTherapySessionModel } from '@/models/PhysicalTherapySession/Model'
import type { OccupationalTherapySessionModel } from '@/models/OccupationalTherapySession/Model'
import type { SocialWorkNoteModel } from '@/models/SocialWorkNote/Model'
import type { CaseManagerModel } from '@/models/CaseManager/Model'
import type { HomeCareVisitModel } from '@/models/HomeCareVisit/Model'
import type { HospiceCareModel } from '@/models/HospiceCare/Model'
import type { PalliativeCarePlanModel } from '@/models/PalliativeCarePlan/Model'
import type { MortalityReportModel } from '@/models/MortalityReport/Model'
import type { LegalHoldModel } from '@/models/LegalHold/Model'
import type { TransfusionModel } from '@/models/Transfusion/Model'
import type { VaccineRecordModel } from '@/models/VaccineRecord/Model'
import type { ImmunizationModel } from '@/models/Immunization/Model'
import type { GrowthChartModel } from '@/models/GrowthChart/Model'
import type { ScreeningModel } from '@/models/Screening/Model'
import type { RiskAssessmentModel } from '@/models/RiskAssessment/Model'
import type { ScoreModel } from '@/models/Score/Model'

export interface PatientStorePayload {
	last_name: string
	first_name: string
	date_of_birth: string
	gender: 'Male' | 'Female' | 'Other'
	phone?: string
	email?: string
	address?: string
	medical_record_number: string
	primary_language?: string
	emergency_contact_name?: string
}

export interface PatientUpdatePayload {
	last_name?: string
	first_name?: string
	date_of_birth?: string
	gender?: 'Male' | 'Female' | 'Other'
	phone?: string
	email?: string
	address?: string
	medical_record_number?: string
	primary_language?: string
	emergency_contact_name?: string
}

export interface PatientModel extends Model {
	id: Column<string | number>
	last_name: Column<string>
	first_name: Column<string>
	date_of_birth: Column<string>
	gender: Column<'Male' | 'Female' | 'Other'>
	phone?: Column<string>
	email?: Column<string>
	address?: Column<string>
	medical_record_number: Column<string>
	primary_language?: Column<string>
	emergency_contact_name?: Column<string>
	created_at: Column<string>
	updated_at: Column<string>
	appointments?: Relation<AppointmentModel>
	medicalRecords?: Relation<MedicalRecordModel>
	prescriptions?: Relation<PrescriptionModel>
	insurances?: Relation<InsuranceModel>
	allergies?: Relation<AllergyModel>
	admissions?: Relation<AdmissionModel>
	billingAccounts?: Relation<BillingAccountModel>
	treatments?: Relation<TreatmentModel>
	labTests?: Relation<LabTestModel>
	radiologyReports?: Relation<RadiologyReportModel>
	surgeries?: Relation<SurgeryModel>
	consentForms?: Relation<ConsentFormModel>
	referrals?: Relation<ReferralModel>
	visits?: Relation<VisitModel>
	vitalSigns?: Relation<VitalSignModel>
	diagnoses?: Relation<DiagnosisModel>
	familyContacts?: Relation<FamilyContactModel>
	emergencyContacts?: Relation<EmergencyContactModel>
	carePlans?: Relation<CarePlanModel>
	careTeam?: Relation<CareTeamModel>
	waitingLists?: Relation<WaitingListModel>
	messages?: Relation<MessageModel>
	notifications?: Relation<NotificationModel>
	imagingStudies?: Relation<ImagingStudyModel>
	pathologyReports?: Relation<PathologyReportModel>
	labOrders?: Relation<LabOrderModel>
	consents?: Relation<ConsentModel>
	clinicalTrials?: Relation<ClinicalTrialModel>
	researchStudies?: Relation<ResearchStudyModel>
	nutritionalPlans?: Relation<NutritionalPlanModel>
	dietOrders?: Relation<DietOrderModel>
	physicalTherapySessions?: Relation<PhysicalTherapySessionModel>
	occupationalTherapySessions?: Relation<OccupationalTherapySessionModel>
	socialWorkNotes?: Relation<SocialWorkNoteModel>
	caseManager?: Relation<CaseManagerModel>
	homeCareVisits?: Relation<HomeCareVisitModel>
	hospiceCare?: Relation<HospiceCareModel>
	palliativeCarePlans?: Relation<PalliativeCarePlanModel>
	mortalityReports?: Relation<MortalityReportModel>
	legalHolds?: Relation<LegalHoldModel>
	transfusions?: Relation<TransfusionModel>
	vaccineRecords?: Relation<VaccineRecordModel>
	immunizations?: Relation<ImmunizationModel>
	growthCharts?: Relation<GrowthChartModel>
	screenings?: Relation<ScreeningModel>
	riskAssessments?: Relation<RiskAssessmentModel>
	scores?: Relation<ScoreModel>
}

export type Patient = Plain<PatientModel>

export const title: keyof Patient = 'first_name'
