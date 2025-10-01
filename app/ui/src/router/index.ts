import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/Auth'
import NotFound from '../views/NotFound.vue'
import authGuard from './guards/authGuard'

import Login from '../views/Auth/Login.vue'
import Register from '../views/Auth/Register.vue'
import VerifyEmail from '../views/Auth/VerifyEmail.vue'
import ForgotPassword from '../views/Auth/ForgotPassword.vue'
import ResetPassword from '../views/Auth/ResetPassword.vue'
import AdminApi from '@/helpers/api/AdminApi'
import AuthApi from '@/helpers/api/AuthApi'
import UserList from '../views/User/List.vue'
import UserEdit from '../views/User/Edit.vue'
import UserDetails from '../views/User/Details.vue'
import PatientList from '../views/Patient/List.vue'
import PatientEdit from '../views/Patient/Edit.vue'
import DoctorList from '../views/Doctor/List.vue'
import DoctorEdit from '../views/Doctor/Edit.vue'
import NurseList from '../views/Nurse/List.vue'
import NurseEdit from '../views/Nurse/Edit.vue'
import AppointmentList from '../views/Appointment/List.vue'
import AppointmentEdit from '../views/Appointment/Edit.vue'
import DepartmentList from '../views/Department/List.vue'
import DepartmentEdit from '../views/Department/Edit.vue'
import TreatmentList from '../views/Treatment/List.vue'
import TreatmentEdit from '../views/Treatment/Edit.vue'
import MedicationList from '../views/Medication/List.vue'
import MedicationEdit from '../views/Medication/Edit.vue'
import BillingAccountList from '../views/BillingAccount/List.vue'
import BillingAccountEdit from '../views/BillingAccount/Edit.vue'
import InvoiceList from '../views/Invoice/List.vue'
import InvoiceEdit from '../views/Invoice/Edit.vue'
import PaymentList from '../views/Payment/List.vue'
import PaymentEdit from '../views/Payment/Edit.vue'
import InsuranceList from '../views/Insurance/List.vue'
import InsuranceEdit from '../views/Insurance/Edit.vue'
import AllergyList from '../views/Allergy/List.vue'
import AllergyEdit from '../views/Allergy/Edit.vue'
import MedicalRecordList from '../views/MedicalRecord/List.vue'
import MedicalRecordEdit from '../views/MedicalRecord/Edit.vue'
import PrescriptionList from '../views/Prescription/List.vue'
import PrescriptionEdit from '../views/Prescription/Edit.vue'
import LabTestList from '../views/LabTest/List.vue'
import LabTestEdit from '../views/LabTest/Edit.vue'
import RadiologyReportList from '../views/RadiologyReport/List.vue'
import RadiologyReportEdit from '../views/RadiologyReport/Edit.vue'
import AdmissionList from '../views/Admission/List.vue'
import AdmissionEdit from '../views/Admission/Edit.vue'
import DischargeList from '../views/Discharge/List.vue'
import DischargeEdit from '../views/Discharge/Edit.vue'
import BedList from '../views/Bed/List.vue'
import BedEdit from '../views/Bed/Edit.vue'
import WardList from '../views/Ward/List.vue'
import WardEdit from '../views/Ward/Edit.vue'
import OperatingRoomList from '../views/OperatingRoom/List.vue'
import OperatingRoomEdit from '../views/OperatingRoom/Edit.vue'
import SurgeryList from '../views/Surgery/List.vue'
import SurgeryEdit from '../views/Surgery/Edit.vue'
import AnesthesiaList from '../views/Anesthesia/List.vue'
import AnesthesiaEdit from '../views/Anesthesia/Edit.vue'
import ConsentFormList from '../views/ConsentForm/List.vue'
import ConsentFormEdit from '../views/ConsentForm/Edit.vue'
import ReferralList from '../views/Referral/List.vue'
import ReferralEdit from '../views/Referral/Edit.vue'
import VisitList from '../views/Visit/List.vue'
import VisitEdit from '../views/Visit/Edit.vue'
import VitalSignList from '../views/VitalSign/List.vue'
import VitalSignEdit from '../views/VitalSign/Edit.vue'
import DiagnosisList from '../views/Diagnosis/List.vue'
import DiagnosisEdit from '../views/Diagnosis/Edit.vue'
import ProcedureList from '../views/Procedure/List.vue'
import ProcedureEdit from '../views/Procedure/Edit.vue'
import RoomList from '../views/Room/List.vue'
import RoomEdit from '../views/Room/Edit.vue'
import ShiftList from '../views/Shift/List.vue'
import ShiftEdit from '../views/Shift/Edit.vue'
import ScheduleList from '../views/Schedule/List.vue'
import ScheduleEdit from '../views/Schedule/Edit.vue'
import StaffRoleList from '../views/StaffRole/List.vue'
import StaffRoleEdit from '../views/StaffRole/Edit.vue'
import SpecialtyList from '../views/Specialty/List.vue'
import SpecialtyEdit from '../views/Specialty/Edit.vue'
import NoteList from '../views/Note/List.vue'
import NoteEdit from '../views/Note/Edit.vue'
import FamilyContactList from '../views/FamilyContact/List.vue'
import FamilyContactEdit from '../views/FamilyContact/Edit.vue'
import EmergencyContactList from '../views/EmergencyContact/List.vue'
import EmergencyContactEdit from '../views/EmergencyContact/Edit.vue'
import PharmacyOrderList from '../views/PharmacyOrder/List.vue'
import PharmacyOrderEdit from '../views/PharmacyOrder/Edit.vue'
import MedicationStockList from '../views/MedicationStock/List.vue'
import MedicationStockEdit from '../views/MedicationStock/Edit.vue'
import SupplierList from '../views/Supplier/List.vue'
import SupplierEdit from '../views/Supplier/Edit.vue'
import ProcurementOrderList from '../views/ProcurementOrder/List.vue'
import ProcurementOrderEdit from '../views/ProcurementOrder/Edit.vue'
import InventoryItemList from '../views/InventoryItem/List.vue'
import InventoryItemEdit from '../views/InventoryItem/Edit.vue'
import BillingItemList from '../views/BillingItem/List.vue'
import BillingItemEdit from '../views/BillingItem/Edit.vue'
import CurrencyList from '../views/Currency/List.vue'
import CurrencyEdit from '../views/Currency/Edit.vue'
import TaxRateList from '../views/TaxRate/List.vue'
import TaxRateEdit from '../views/TaxRate/Edit.vue'
import InsuranceClaimList from '../views/InsuranceClaim/List.vue'
import InsuranceClaimEdit from '../views/InsuranceClaim/Edit.vue'
import ClaimAdjustmentList from '../views/ClaimAdjustment/List.vue'
import ClaimAdjustmentEdit from '../views/ClaimAdjustment/Edit.vue'
import PaymentMethodList from '../views/PaymentMethod/List.vue'
import PaymentMethodEdit from '../views/PaymentMethod/Edit.vue'
import LedgerAccountList from '../views/LedgerAccount/List.vue'
import LedgerAccountEdit from '../views/LedgerAccount/Edit.vue'
import FinancialTransactionList from '../views/FinancialTransaction/List.vue'
import FinancialTransactionEdit from '../views/FinancialTransaction/Edit.vue'
import StaffCredentialList from '../views/StaffCredential/List.vue'
import StaffCredentialEdit from '../views/StaffCredential/Edit.vue'
import CertificationList from '../views/Certification/List.vue'
import CertificationEdit from '../views/Certification/Edit.vue'
import TrainingRecordList from '../views/TrainingRecord/List.vue'
import TrainingRecordEdit from '../views/TrainingRecord/Edit.vue'
import AttendanceList from '../views/Attendance/List.vue'
import AttendanceEdit from '../views/Attendance/Edit.vue'
import LeaveRequestList from '../views/LeaveRequest/List.vue'
import LeaveRequestEdit from '../views/LeaveRequest/Edit.vue'
import ShiftAssignmentList from '../views/ShiftAssignment/List.vue'
import ShiftAssignmentEdit from '../views/ShiftAssignment/Edit.vue'
import CarePlanList from '../views/CarePlan/List.vue'
import CarePlanEdit from '../views/CarePlan/Edit.vue'
import CareTeamList from '../views/CareTeam/List.vue'
import CareTeamEdit from '../views/CareTeam/Edit.vue'
import DeviceList from '../views/Device/List.vue'
import DeviceEdit from '../views/Device/Edit.vue'
import MedicalDeviceMaintenanceList from '../views/MedicalDeviceMaintenance/List.vue'
import MedicalDeviceMaintenanceEdit from '../views/MedicalDeviceMaintenance/Edit.vue'
import QueueList from '../views/Queue/List.vue'
import QueueEdit from '../views/Queue/Edit.vue'
import WaitingListList from '../views/WaitingList/List.vue'
import WaitingListEdit from '../views/WaitingList/Edit.vue'
import TelemedicineSessionList from '../views/TelemedicineSession/List.vue'
import TelemedicineSessionEdit from '../views/TelemedicineSession/Edit.vue'
import MessageList from '../views/Message/List.vue'
import MessageEdit from '../views/Message/Edit.vue'
import NotificationList from '../views/Notification/List.vue'
import NotificationEdit from '../views/Notification/Edit.vue'
import DocumentList from '../views/Document/List.vue'
import DocumentEdit from '../views/Document/Edit.vue'
import ImagingStudyList from '../views/ImagingStudy/List.vue'
import ImagingStudyEdit from '../views/ImagingStudy/Edit.vue'
import PathologyReportList from '../views/PathologyReport/List.vue'
import PathologyReportEdit from '../views/PathologyReport/Edit.vue'
import LabOrderList from '../views/LabOrder/List.vue'
import LabOrderEdit from '../views/LabOrder/Edit.vue'
import SampleList from '../views/Sample/List.vue'
import SampleEdit from '../views/Sample/Edit.vue'
import SpecimenList from '../views/Specimen/List.vue'
import SpecimenEdit from '../views/Specimen/Edit.vue'
import TestResultList from '../views/TestResult/List.vue'
import TestResultEdit from '../views/TestResult/Edit.vue'
import BarcodeLabelList from '../views/BarcodeLabel/List.vue'
import BarcodeLabelEdit from '../views/BarcodeLabel/Edit.vue'
import ConsentList from '../views/Consent/List.vue'
import ConsentEdit from '../views/Consent/Edit.vue'
import ClinicalTrialList from '../views/ClinicalTrial/List.vue'
import ClinicalTrialEdit from '../views/ClinicalTrial/Edit.vue'
import ResearchStudyList from '../views/ResearchStudy/List.vue'
import ResearchStudyEdit from '../views/ResearchStudy/Edit.vue'
import AppointmentTypeList from '../views/AppointmentType/List.vue'
import AppointmentTypeEdit from '../views/AppointmentType/Edit.vue'
import FollowUpList from '../views/FollowUp/List.vue'
import FollowUpEdit from '../views/FollowUp/Edit.vue'
import ReferralSourceList from '../views/ReferralSource/List.vue'
import ReferralSourceEdit from '../views/ReferralSource/Edit.vue'
import DischargeSummaryList from '../views/DischargeSummary/List.vue'
import DischargeSummaryEdit from '../views/DischargeSummary/Edit.vue'
import NutritionalPlanList from '../views/NutritionalPlan/List.vue'
import NutritionalPlanEdit from '../views/NutritionalPlan/Edit.vue'
import DietOrderList from '../views/DietOrder/List.vue'
import DietOrderEdit from '../views/DietOrder/Edit.vue'
import PhysicalTherapySessionList from '../views/PhysicalTherapySession/List.vue'
import PhysicalTherapySessionEdit from '../views/PhysicalTherapySession/Edit.vue'
import OccupationalTherapySessionList from '../views/OccupationalTherapySession/List.vue'
import OccupationalTherapySessionEdit from '../views/OccupationalTherapySession/Edit.vue'
import SocialWorkNoteList from '../views/SocialWorkNote/List.vue'
import SocialWorkNoteEdit from '../views/SocialWorkNote/Edit.vue'
import CaseManagerList from '../views/CaseManager/List.vue'
import CaseManagerEdit from '../views/CaseManager/Edit.vue'
import HomeCareVisitList from '../views/HomeCareVisit/List.vue'
import HomeCareVisitEdit from '../views/HomeCareVisit/Edit.vue'
import HospiceCareList from '../views/HospiceCare/List.vue'
import HospiceCareEdit from '../views/HospiceCare/Edit.vue'
import PalliativeCarePlanList from '../views/PalliativeCarePlan/List.vue'
import PalliativeCarePlanEdit from '../views/PalliativeCarePlan/Edit.vue'
import MortalityReportList from '../views/MortalityReport/List.vue'
import MortalityReportEdit from '../views/MortalityReport/Edit.vue'
import AutopsyReportList from '../views/AutopsyReport/List.vue'
import AutopsyReportEdit from '../views/AutopsyReport/Edit.vue'
import LegalHoldList from '../views/LegalHold/List.vue'
import LegalHoldEdit from '../views/LegalHold/Edit.vue'
import AuditLogList from '../views/AuditLog/List.vue'
import AuditLogEdit from '../views/AuditLog/Edit.vue'
import SettingsList from '../views/Settings/List.vue'
import SettingsEdit from '../views/Settings/Edit.vue'
import RoleList from '../views/Role/List.vue'
import RoleEdit from '../views/Role/Edit.vue'
import PermissionList from '../views/Permission/List.vue'
import PermissionEdit from '../views/Permission/Edit.vue'
import ActivityLogList from '../views/ActivityLog/List.vue'
import ActivityLogEdit from '../views/ActivityLog/Edit.vue'
import APIKeyList from '../views/APIKey/List.vue'
import APIKeyEdit from '../views/APIKey/Edit.vue'
import IntegrationList from '../views/Integration/List.vue'
import IntegrationEdit from '../views/Integration/Edit.vue'
import HL7MessageList from '../views/HL7Message/List.vue'
import HL7MessageEdit from '../views/HL7Message/Edit.vue'
import DICOMInstanceList from '../views/DICOMInstance/List.vue'
import DICOMInstanceEdit from '../views/DICOMInstance/Edit.vue'
import BloodBankList from '../views/BloodBank/List.vue'
import BloodBankEdit from '../views/BloodBank/Edit.vue'
import DonorList from '../views/Donor/List.vue'
import DonorEdit from '../views/Donor/Edit.vue'
import TransfusionList from '../views/Transfusion/List.vue'
import TransfusionEdit from '../views/Transfusion/Edit.vue'
import BloodProductList from '../views/BloodProduct/List.vue'
import BloodProductEdit from '../views/BloodProduct/Edit.vue'
import VaccineRecordList from '../views/VaccineRecord/List.vue'
import VaccineRecordEdit from '../views/VaccineRecord/Edit.vue'
import ImmunizationList from '../views/Immunization/List.vue'
import ImmunizationEdit from '../views/Immunization/Edit.vue'
import GrowthChartList from '../views/GrowthChart/List.vue'
import GrowthChartEdit from '../views/GrowthChart/Edit.vue'
import ScreeningList from '../views/Screening/List.vue'
import ScreeningEdit from '../views/Screening/Edit.vue'
import RiskAssessmentList from '../views/RiskAssessment/List.vue'
import RiskAssessmentEdit from '../views/RiskAssessment/Edit.vue'
import ScoreList from '../views/Score/List.vue'
import ScoreEdit from '../views/Score/Edit.vue'
import GeoLocationList from '../views/GeoLocation/List.vue'
import GeoLocationEdit from '../views/GeoLocation/Edit.vue'
import FacilityList from '../views/Facility/List.vue'
import FacilityEdit from '../views/Facility/Edit.vue'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/verify-email',
			name: 'verify-email-notice',
			component: VerifyEmail,
			meta: {
				noNavigation: true,
			},
		},
		{
			path: '/email/verify/:id/:hash',
			name: 'email-verification',
			component: () => {},
			beforeEnter: async (to) => {
				const auth = useAuthStore()
				await auth.getUser()

				if (!auth.user) {
					return { name: 'login' }
				}

				await new AuthApi().verifyEmail({
					id: to.params.id as string,
					hash: to.params.hash as string,
					expires: to.query.expires as string,
					signature: to.query.signature as string,
				})

				await auth.getUser()

				return { name: 'root' }
			},
			meta: {
				unprotected: true,
				noNavigation: true,
			},
		},
		{
			path: '/forgot-password',
			name: 'forgot-password',
			component: ForgotPassword,
			meta: {
				unprotected: true,
				noNavigation: true,
			},
		},
		{
			path: '/reset-password',
			name: 'reset-password',
			component: ResetPassword,
			meta: {
				unprotected: true,
				noNavigation: true,
			},
		},
		{
			path: '/login',
			name: 'login',
			component: Login,
			meta: {
				avoidUser: true,
				noNavigation: true,
			},
		},
		{
			path: '/register',
			name: 'register',
			component: Register,
			meta: {
				avoidUser: true,
				noNavigation: true,
			},
		},
		{
			path: '/logout',
			name: 'logout',
			component: () => {},
			beforeEnter: async () => {
				const auth = useAuthStore()
				await auth.logout()
				return { name: 'login' }
			},
			meta: {
				unprotected: true,
				noNavigation: true,
			},
		},
		{
			path: '/clear-data',
			name: 'clear-data',
			component: () => {},
			beforeEnter: async () => {
				await AdminApi.clearData()
				window.location.reload()
				throw new Error('Clear data')
			},
		},
		{
			path: '/users',
			children: [
				{
					path: '',
					name: 'users-list',
					component: UserList,
					meta: {
						roles: ['admin'],
					},
				},
				{
					path: '/users/create',
					name: 'users-create',
					component: UserEdit,
					meta: {
						roles: ['admin'],
					},
				},
				{
					path: '/users/:id',
					name: 'users-edit',
					component: UserEdit,
					meta: {
						roles: ['admin'],
					},
				},
			],
		},
		{
			path: '/patients',
			children: [
				{
					path: '',
					name: 'patients-list',
					component: PatientList,
				},
				{
					path: '/patients/create',
					name: 'patients-create',
					component: PatientEdit,
				},
				{
					path: '/patients/:id',
					name: 'patients-edit',
					component: PatientEdit,
				},
			],
		},
		{
			path: '/doctors',
			children: [
				{
					path: '',
					name: 'doctors-list',
					component: DoctorList,
				},
				{
					path: '/doctors/create',
					name: 'doctors-create',
					component: DoctorEdit,
				},
				{
					path: '/doctors/:id',
					name: 'doctors-edit',
					component: DoctorEdit,
				},
			],
		},
		{
			path: '/nurses',
			children: [
				{
					path: '',
					name: 'nurses-list',
					component: NurseList,
				},
				{
					path: '/nurses/create',
					name: 'nurses-create',
					component: NurseEdit,
				},
				{
					path: '/nurses/:id',
					name: 'nurses-edit',
					component: NurseEdit,
				},
			],
		},
		{
			path: '/appointments',
			children: [
				{
					path: '',
					name: 'appointments-list',
					component: AppointmentList,
				},
				{
					path: '/appointments/create',
					name: 'appointments-create',
					component: AppointmentEdit,
				},
				{
					path: '/appointments/:id',
					name: 'appointments-edit',
					component: AppointmentEdit,
				},
			],
		},
		{
			path: '/departments',
			children: [
				{
					path: '',
					name: 'departments-list',
					component: DepartmentList,
				},
				{
					path: '/departments/create',
					name: 'departments-create',
					component: DepartmentEdit,
				},
				{
					path: '/departments/:id',
					name: 'departments-edit',
					component: DepartmentEdit,
				},
			],
		},
		{
			path: '/treatments',
			children: [
				{
					path: '',
					name: 'treatments-list',
					component: TreatmentList,
				},
				{
					path: '/treatments/create',
					name: 'treatments-create',
					component: TreatmentEdit,
				},
				{
					path: '/treatments/:id',
					name: 'treatments-edit',
					component: TreatmentEdit,
				},
			],
		},
		{
			path: '/medications',
			children: [
				{
					path: '',
					name: 'medications-list',
					component: MedicationList,
				},
				{
					path: '/medications/create',
					name: 'medications-create',
					component: MedicationEdit,
				},
				{
					path: '/medications/:id',
					name: 'medications-edit',
					component: MedicationEdit,
				},
			],
		},
		{
			path: '/billing-accounts',
			children: [
				{
					path: '',
					name: 'billing-accounts-list',
					component: BillingAccountList,
				},
				{
					path: '/billing-accounts/create',
					name: 'billing-accounts-create',
					component: BillingAccountEdit,
				},
				{
					path: '/billing-accounts/:id',
					name: 'billing-accounts-edit',
					component: BillingAccountEdit,
				},
			],
		},
		{
			path: '/invoices',
			children: [
				{
					path: '',
					name: 'invoices-list',
					component: InvoiceList,
				},
				{
					path: '/invoices/create',
					name: 'invoices-create',
					component: InvoiceEdit,
				},
				{
					path: '/invoices/:id',
					name: 'invoices-edit',
					component: InvoiceEdit,
				},
			],
		},
		{
			path: '/payments',
			children: [
				{
					path: '',
					name: 'payments-list',
					component: PaymentList,
				},
				{
					path: '/payments/create',
					name: 'payments-create',
					component: PaymentEdit,
				},
				{
					path: '/payments/:id',
					name: 'payments-edit',
					component: PaymentEdit,
				},
			],
		},
		{
			path: '/insurances',
			children: [
				{
					path: '',
					name: 'insurances-list',
					component: InsuranceList,
				},
				{
					path: '/insurances/create',
					name: 'insurances-create',
					component: InsuranceEdit,
				},
				{
					path: '/insurances/:id',
					name: 'insurances-edit',
					component: InsuranceEdit,
				},
			],
		},
		{
			path: '/allergies',
			children: [
				{
					path: '',
					name: 'allergies-list',
					component: AllergyList,
				},
				{
					path: '/allergies/create',
					name: 'allergies-create',
					component: AllergyEdit,
				},
				{
					path: '/allergies/:id',
					name: 'allergies-edit',
					component: AllergyEdit,
				},
			],
		},
		{
			path: '/medical-records',
			children: [
				{
					path: '',
					name: 'medical-records-list',
					component: MedicalRecordList,
				},
				{
					path: '/medical-records/create',
					name: 'medical-records-create',
					component: MedicalRecordEdit,
				},
				{
					path: '/medical-records/:id',
					name: 'medical-records-edit',
					component: MedicalRecordEdit,
				},
			],
		},
		{
			path: '/prescriptions',
			children: [
				{
					path: '',
					name: 'prescriptions-list',
					component: PrescriptionList,
				},
				{
					path: '/prescriptions/create',
					name: 'prescriptions-create',
					component: PrescriptionEdit,
				},
				{
					path: '/prescriptions/:id',
					name: 'prescriptions-edit',
					component: PrescriptionEdit,
				},
			],
		},
		{
			path: '/lab-tests',
			children: [
				{
					path: '',
					name: 'lab-tests-list',
					component: LabTestList,
				},
				{
					path: '/lab-tests/create',
					name: 'lab-tests-create',
					component: LabTestEdit,
				},
				{
					path: '/lab-tests/:id',
					name: 'lab-tests-edit',
					component: LabTestEdit,
				},
			],
		},
		{
			path: '/radiology-reports',
			children: [
				{
					path: '',
					name: 'radiology-reports-list',
					component: RadiologyReportList,
				},
				{
					path: '/radiology-reports/create',
					name: 'radiology-reports-create',
					component: RadiologyReportEdit,
				},
				{
					path: '/radiology-reports/:id',
					name: 'radiology-reports-edit',
					component: RadiologyReportEdit,
				},
			],
		},
		{
			path: '/admissions',
			children: [
				{
					path: '',
					name: 'admissions-list',
					component: AdmissionList,
				},
				{
					path: '/admissions/create',
					name: 'admissions-create',
					component: AdmissionEdit,
				},
				{
					path: '/admissions/:id',
					name: 'admissions-edit',
					component: AdmissionEdit,
				},
			],
		},
		{
			path: '/discharges',
			children: [
				{
					path: '',
					name: 'discharges-list',
					component: DischargeList,
				},
				{
					path: '/discharges/create',
					name: 'discharges-create',
					component: DischargeEdit,
				},
				{
					path: '/discharges/:id',
					name: 'discharges-edit',
					component: DischargeEdit,
				},
			],
		},
		{
			path: '/beds',
			children: [
				{
					path: '',
					name: 'beds-list',
					component: BedList,
				},
				{
					path: '/beds/create',
					name: 'beds-create',
					component: BedEdit,
				},
				{
					path: '/beds/:id',
					name: 'beds-edit',
					component: BedEdit,
				},
			],
		},
		{
			path: '/wards',
			children: [
				{
					path: '',
					name: 'wards-list',
					component: WardList,
				},
				{
					path: '/wards/create',
					name: 'wards-create',
					component: WardEdit,
				},
				{
					path: '/wards/:id',
					name: 'wards-edit',
					component: WardEdit,
				},
			],
		},
		{
			path: '/operating-rooms',
			children: [
				{
					path: '',
					name: 'operating-rooms-list',
					component: OperatingRoomList,
				},
				{
					path: '/operating-rooms/create',
					name: 'operating-rooms-create',
					component: OperatingRoomEdit,
				},
				{
					path: '/operating-rooms/:id',
					name: 'operating-rooms-edit',
					component: OperatingRoomEdit,
				},
			],
		},
		{
			path: '/surgeries',
			children: [
				{
					path: '',
					name: 'surgeries-list',
					component: SurgeryList,
				},
				{
					path: '/surgeries/create',
					name: 'surgeries-create',
					component: SurgeryEdit,
				},
				{
					path: '/surgeries/:id',
					name: 'surgeries-edit',
					component: SurgeryEdit,
				},
			],
		},
		{
			path: '/anesthesia',
			children: [
				{
					path: '',
					name: 'anesthesia-list',
					component: AnesthesiaList,
				},
				{
					path: '/anesthesia/create',
					name: 'anesthesia-create',
					component: AnesthesiaEdit,
				},
				{
					path: '/anesthesia/:id',
					name: 'anesthesia-edit',
					component: AnesthesiaEdit,
				},
			],
		},
		{
			path: '/consent-forms',
			children: [
				{
					path: '',
					name: 'consent-forms-list',
					component: ConsentFormList,
				},
				{
					path: '/consent-forms/create',
					name: 'consent-forms-create',
					component: ConsentFormEdit,
				},
				{
					path: '/consent-forms/:id',
					name: 'consent-forms-edit',
					component: ConsentFormEdit,
				},
			],
		},
		{
			path: '/referrals',
			children: [
				{
					path: '',
					name: 'referrals-list',
					component: ReferralList,
				},
				{
					path: '/referrals/create',
					name: 'referrals-create',
					component: ReferralEdit,
				},
				{
					path: '/referrals/:id',
					name: 'referrals-edit',
					component: ReferralEdit,
				},
			],
		},
		{
			path: '/visits',
			children: [
				{
					path: '',
					name: 'visits-list',
					component: VisitList,
				},
				{
					path: '/visits/create',
					name: 'visits-create',
					component: VisitEdit,
				},
				{
					path: '/visits/:id',
					name: 'visits-edit',
					component: VisitEdit,
				},
			],
		},
		{
			path: '/vital-signs',
			children: [
				{
					path: '',
					name: 'vital-signs-list',
					component: VitalSignList,
				},
				{
					path: '/vital-signs/create',
					name: 'vital-signs-create',
					component: VitalSignEdit,
				},
				{
					path: '/vital-signs/:id',
					name: 'vital-signs-edit',
					component: VitalSignEdit,
				},
			],
		},
		{
			path: '/diagnoses',
			children: [
				{
					path: '',
					name: 'diagnoses-list',
					component: DiagnosisList,
				},
				{
					path: '/diagnoses/create',
					name: 'diagnoses-create',
					component: DiagnosisEdit,
				},
				{
					path: '/diagnoses/:id',
					name: 'diagnoses-edit',
					component: DiagnosisEdit,
				},
			],
		},
		{
			path: '/procedures',
			children: [
				{
					path: '',
					name: 'procedures-list',
					component: ProcedureList,
				},
				{
					path: '/procedures/create',
					name: 'procedures-create',
					component: ProcedureEdit,
				},
				{
					path: '/procedures/:id',
					name: 'procedures-edit',
					component: ProcedureEdit,
				},
			],
		},
		{
			path: '/rooms',
			children: [
				{
					path: '',
					name: 'rooms-list',
					component: RoomList,
				},
				{
					path: '/rooms/create',
					name: 'rooms-create',
					component: RoomEdit,
				},
				{
					path: '/rooms/:id',
					name: 'rooms-edit',
					component: RoomEdit,
				},
			],
		},
		{
			path: '/shifts',
			children: [
				{
					path: '',
					name: 'shifts-list',
					component: ShiftList,
				},
				{
					path: '/shifts/create',
					name: 'shifts-create',
					component: ShiftEdit,
				},
				{
					path: '/shifts/:id',
					name: 'shifts-edit',
					component: ShiftEdit,
				},
			],
		},
		{
			path: '/schedules',
			children: [
				{
					path: '',
					name: 'schedules-list',
					component: ScheduleList,
				},
				{
					path: '/schedules/create',
					name: 'schedules-create',
					component: ScheduleEdit,
				},
				{
					path: '/schedules/:id',
					name: 'schedules-edit',
					component: ScheduleEdit,
				},
			],
		},
		{
			path: '/staff-roles',
			children: [
				{
					path: '',
					name: 'staff-roles-list',
					component: StaffRoleList,
				},
				{
					path: '/staff-roles/create',
					name: 'staff-roles-create',
					component: StaffRoleEdit,
				},
				{
					path: '/staff-roles/:id',
					name: 'staff-roles-edit',
					component: StaffRoleEdit,
				},
			],
		},
		{
			path: '/specialties',
			children: [
				{
					path: '',
					name: 'specialties-list',
					component: SpecialtyList,
				},
				{
					path: '/specialties/create',
					name: 'specialties-create',
					component: SpecialtyEdit,
				},
				{
					path: '/specialties/:id',
					name: 'specialties-edit',
					component: SpecialtyEdit,
				},
			],
		},
		{
			path: '/notes',
			children: [
				{
					path: '',
					name: 'notes-list',
					component: NoteList,
				},
				{
					path: '/notes/create',
					name: 'notes-create',
					component: NoteEdit,
				},
				{
					path: '/notes/:id',
					name: 'notes-edit',
					component: NoteEdit,
				},
			],
		},
		{
			path: '/family-contacts',
			children: [
				{
					path: '',
					name: 'family-contacts-list',
					component: FamilyContactList,
				},
				{
					path: '/family-contacts/create',
					name: 'family-contacts-create',
					component: FamilyContactEdit,
				},
				{
					path: '/family-contacts/:id',
					name: 'family-contacts-edit',
					component: FamilyContactEdit,
				},
			],
		},
		{
			path: '/emergency-contacts',
			children: [
				{
					path: '',
					name: 'emergency-contacts-list',
					component: EmergencyContactList,
				},
				{
					path: '/emergency-contacts/create',
					name: 'emergency-contacts-create',
					component: EmergencyContactEdit,
				},
				{
					path: '/emergency-contacts/:id',
					name: 'emergency-contacts-edit',
					component: EmergencyContactEdit,
				},
			],
		},
		{
			path: '/pharmacy-orders',
			children: [
				{
					path: '',
					name: 'pharmacy-orders-list',
					component: PharmacyOrderList,
				},
				{
					path: '/pharmacy-orders/create',
					name: 'pharmacy-orders-create',
					component: PharmacyOrderEdit,
				},
				{
					path: '/pharmacy-orders/:id',
					name: 'pharmacy-orders-edit',
					component: PharmacyOrderEdit,
				},
			],
		},
		{
			path: '/medication-stocks',
			children: [
				{
					path: '',
					name: 'medication-stocks-list',
					component: MedicationStockList,
				},
				{
					path: '/medication-stocks/create',
					name: 'medication-stocks-create',
					component: MedicationStockEdit,
				},
				{
					path: '/medication-stocks/:id',
					name: 'medication-stocks-edit',
					component: MedicationStockEdit,
				},
			],
		},
		{
			path: '/suppliers',
			children: [
				{
					path: '',
					name: 'suppliers-list',
					component: SupplierList,
				},
				{
					path: '/suppliers/create',
					name: 'suppliers-create',
					component: SupplierEdit,
				},
				{
					path: '/suppliers/:id',
					name: 'suppliers-edit',
					component: SupplierEdit,
				},
			],
		},
		{
			path: '/procurement-orders',
			children: [
				{
					path: '',
					name: 'procurement-orders-list',
					component: ProcurementOrderList,
				},
				{
					path: '/procurement-orders/create',
					name: 'procurement-orders-create',
					component: ProcurementOrderEdit,
				},
				{
					path: '/procurement-orders/:id',
					name: 'procurement-orders-edit',
					component: ProcurementOrderEdit,
				},
			],
		},
		{
			path: '/inventory-items',
			children: [
				{
					path: '',
					name: 'inventory-items-list',
					component: InventoryItemList,
				},
				{
					path: '/inventory-items/create',
					name: 'inventory-items-create',
					component: InventoryItemEdit,
				},
				{
					path: '/inventory-items/:id',
					name: 'inventory-items-edit',
					component: InventoryItemEdit,
				},
			],
		},
		{
			path: '/billing-items',
			children: [
				{
					path: '',
					name: 'billing-items-list',
					component: BillingItemList,
				},
				{
					path: '/billing-items/create',
					name: 'billing-items-create',
					component: BillingItemEdit,
				},
				{
					path: '/billing-items/:id',
					name: 'billing-items-edit',
					component: BillingItemEdit,
				},
			],
		},
		{
			path: '/currencies',
			children: [
				{
					path: '',
					name: 'currencies-list',
					component: CurrencyList,
				},
				{
					path: '/currencies/create',
					name: 'currencies-create',
					component: CurrencyEdit,
				},
				{
					path: '/currencies/:id',
					name: 'currencies-edit',
					component: CurrencyEdit,
				},
			],
		},
		{
			path: '/tax-rates',
			children: [
				{
					path: '',
					name: 'tax-rates-list',
					component: TaxRateList,
				},
				{
					path: '/tax-rates/create',
					name: 'tax-rates-create',
					component: TaxRateEdit,
				},
				{
					path: '/tax-rates/:id',
					name: 'tax-rates-edit',
					component: TaxRateEdit,
				},
			],
		},
		{
			path: '/insurance-claims',
			children: [
				{
					path: '',
					name: 'insurance-claims-list',
					component: InsuranceClaimList,
				},
				{
					path: '/insurance-claims/create',
					name: 'insurance-claims-create',
					component: InsuranceClaimEdit,
				},
				{
					path: '/insurance-claims/:id',
					name: 'insurance-claims-edit',
					component: InsuranceClaimEdit,
				},
			],
		},
		{
			path: '/claim-adjustments',
			children: [
				{
					path: '',
					name: 'claim-adjustments-list',
					component: ClaimAdjustmentList,
				},
				{
					path: '/claim-adjustments/create',
					name: 'claim-adjustments-create',
					component: ClaimAdjustmentEdit,
				},
				{
					path: '/claim-adjustments/:id',
					name: 'claim-adjustments-edit',
					component: ClaimAdjustmentEdit,
				},
			],
		},
		{
			path: '/payment-methods',
			children: [
				{
					path: '',
					name: 'payment-methods-list',
					component: PaymentMethodList,
				},
				{
					path: '/payment-methods/create',
					name: 'payment-methods-create',
					component: PaymentMethodEdit,
				},
				{
					path: '/payment-methods/:id',
					name: 'payment-methods-edit',
					component: PaymentMethodEdit,
				},
			],
		},
		{
			path: '/ledger-accounts',
			children: [
				{
					path: '',
					name: 'ledger-accounts-list',
					component: LedgerAccountList,
				},
				{
					path: '/ledger-accounts/create',
					name: 'ledger-accounts-create',
					component: LedgerAccountEdit,
				},
				{
					path: '/ledger-accounts/:id',
					name: 'ledger-accounts-edit',
					component: LedgerAccountEdit,
				},
			],
		},
		{
			path: '/financial-transactions',
			children: [
				{
					path: '',
					name: 'financial-transactions-list',
					component: FinancialTransactionList,
				},
				{
					path: '/financial-transactions/create',
					name: 'financial-transactions-create',
					component: FinancialTransactionEdit,
				},
				{
					path: '/financial-transactions/:id',
					name: 'financial-transactions-edit',
					component: FinancialTransactionEdit,
				},
			],
		},
		{
			path: '/staff-credentials',
			children: [
				{
					path: '',
					name: 'staff-credentials-list',
					component: StaffCredentialList,
				},
				{
					path: '/staff-credentials/create',
					name: 'staff-credentials-create',
					component: StaffCredentialEdit,
				},
				{
					path: '/staff-credentials/:id',
					name: 'staff-credentials-edit',
					component: StaffCredentialEdit,
				},
			],
		},
		{
			path: '/certifications',
			children: [
				{
					path: '',
					name: 'certifications-list',
					component: CertificationList,
				},
				{
					path: '/certifications/create',
					name: 'certifications-create',
					component: CertificationEdit,
				},
				{
					path: '/certifications/:id',
					name: 'certifications-edit',
					component: CertificationEdit,
				},
			],
		},
		{
			path: '/training-records',
			children: [
				{
					path: '',
					name: 'training-records-list',
					component: TrainingRecordList,
				},
				{
					path: '/training-records/create',
					name: 'training-records-create',
					component: TrainingRecordEdit,
				},
				{
					path: '/training-records/:id',
					name: 'training-records-edit',
					component: TrainingRecordEdit,
				},
			],
		},
		{
			path: '/attendances',
			children: [
				{
					path: '',
					name: 'attendances-list',
					component: AttendanceList,
				},
				{
					path: '/attendances/create',
					name: 'attendances-create',
					component: AttendanceEdit,
				},
				{
					path: '/attendances/:id',
					name: 'attendances-edit',
					component: AttendanceEdit,
				},
			],
		},
		{
			path: '/leave-requests',
			children: [
				{
					path: '',
					name: 'leave-requests-list',
					component: LeaveRequestList,
				},
				{
					path: '/leave-requests/create',
					name: 'leave-requests-create',
					component: LeaveRequestEdit,
				},
				{
					path: '/leave-requests/:id',
					name: 'leave-requests-edit',
					component: LeaveRequestEdit,
				},
			],
		},
		{
			path: '/shift-assignments',
			children: [
				{
					path: '',
					name: 'shift-assignments-list',
					component: ShiftAssignmentList,
				},
				{
					path: '/shift-assignments/create',
					name: 'shift-assignments-create',
					component: ShiftAssignmentEdit,
				},
				{
					path: '/shift-assignments/:id',
					name: 'shift-assignments-edit',
					component: ShiftAssignmentEdit,
				},
			],
		},
		{
			path: '/care-plans',
			children: [
				{
					path: '',
					name: 'care-plans-list',
					component: CarePlanList,
				},
				{
					path: '/care-plans/create',
					name: 'care-plans-create',
					component: CarePlanEdit,
				},
				{
					path: '/care-plans/:id',
					name: 'care-plans-edit',
					component: CarePlanEdit,
				},
			],
		},
		{
			path: '/care-teams',
			children: [
				{
					path: '',
					name: 'care-teams-list',
					component: CareTeamList,
				},
				{
					path: '/care-teams/create',
					name: 'care-teams-create',
					component: CareTeamEdit,
				},
				{
					path: '/care-teams/:id',
					name: 'care-teams-edit',
					component: CareTeamEdit,
				},
			],
		},
		{
			path: '/devices',
			children: [
				{
					path: '',
					name: 'devices-list',
					component: DeviceList,
				},
				{
					path: '/devices/create',
					name: 'devices-create',
					component: DeviceEdit,
				},
				{
					path: '/devices/:id',
					name: 'devices-edit',
					component: DeviceEdit,
				},
			],
		},
		{
			path: '/medical-device-maintenances',
			children: [
				{
					path: '',
					name: 'medical-device-maintenances-list',
					component: MedicalDeviceMaintenanceList,
				},
				{
					path: '/medical-device-maintenances/create',
					name: 'medical-device-maintenances-create',
					component: MedicalDeviceMaintenanceEdit,
				},
				{
					path: '/medical-device-maintenances/:id',
					name: 'medical-device-maintenances-edit',
					component: MedicalDeviceMaintenanceEdit,
				},
			],
		},
		{
			path: '/queues',
			children: [
				{
					path: '',
					name: 'queues-list',
					component: QueueList,
				},
				{
					path: '/queues/create',
					name: 'queues-create',
					component: QueueEdit,
				},
				{
					path: '/queues/:id',
					name: 'queues-edit',
					component: QueueEdit,
				},
			],
		},
		{
			path: '/waiting-lists',
			children: [
				{
					path: '',
					name: 'waiting-lists-list',
					component: WaitingListList,
				},
				{
					path: '/waiting-lists/create',
					name: 'waiting-lists-create',
					component: WaitingListEdit,
				},
				{
					path: '/waiting-lists/:id',
					name: 'waiting-lists-edit',
					component: WaitingListEdit,
				},
			],
		},
		{
			path: '/telemedicine-sessions',
			children: [
				{
					path: '',
					name: 'telemedicine-sessions-list',
					component: TelemedicineSessionList,
				},
				{
					path: '/telemedicine-sessions/create',
					name: 'telemedicine-sessions-create',
					component: TelemedicineSessionEdit,
				},
				{
					path: '/telemedicine-sessions/:id',
					name: 'telemedicine-sessions-edit',
					component: TelemedicineSessionEdit,
				},
			],
		},
		{
			path: '/messages',
			children: [
				{
					path: '',
					name: 'messages-list',
					component: MessageList,
				},
				{
					path: '/messages/create',
					name: 'messages-create',
					component: MessageEdit,
				},
				{
					path: '/messages/:id',
					name: 'messages-edit',
					component: MessageEdit,
				},
			],
		},
		{
			path: '/notifications',
			children: [
				{
					path: '',
					name: 'notifications-list',
					component: NotificationList,
				},
				{
					path: '/notifications/create',
					name: 'notifications-create',
					component: NotificationEdit,
				},
				{
					path: '/notifications/:id',
					name: 'notifications-edit',
					component: NotificationEdit,
				},
			],
		},
		{
			path: '/documents',
			children: [
				{
					path: '',
					name: 'documents-list',
					component: DocumentList,
				},
				{
					path: '/documents/create',
					name: 'documents-create',
					component: DocumentEdit,
				},
				{
					path: '/documents/:id',
					name: 'documents-edit',
					component: DocumentEdit,
				},
			],
		},
		{
			path: '/imaging-studies',
			children: [
				{
					path: '',
					name: 'imaging-studies-list',
					component: ImagingStudyList,
				},
				{
					path: '/imaging-studies/create',
					name: 'imaging-studies-create',
					component: ImagingStudyEdit,
				},
				{
					path: '/imaging-studies/:id',
					name: 'imaging-studies-edit',
					component: ImagingStudyEdit,
				},
			],
		},
		{
			path: '/pathology-reports',
			children: [
				{
					path: '',
					name: 'pathology-reports-list',
					component: PathologyReportList,
				},
				{
					path: '/pathology-reports/create',
					name: 'pathology-reports-create',
					component: PathologyReportEdit,
				},
				{
					path: '/pathology-reports/:id',
					name: 'pathology-reports-edit',
					component: PathologyReportEdit,
				},
			],
		},
		{
			path: '/lab-orders',
			children: [
				{
					path: '',
					name: 'lab-orders-list',
					component: LabOrderList,
				},
				{
					path: '/lab-orders/create',
					name: 'lab-orders-create',
					component: LabOrderEdit,
				},
				{
					path: '/lab-orders/:id',
					name: 'lab-orders-edit',
					component: LabOrderEdit,
				},
			],
		},
		{
			path: '/samples',
			children: [
				{
					path: '',
					name: 'samples-list',
					component: SampleList,
				},
				{
					path: '/samples/create',
					name: 'samples-create',
					component: SampleEdit,
				},
				{
					path: '/samples/:id',
					name: 'samples-edit',
					component: SampleEdit,
				},
			],
		},
		{
			path: '/specimens',
			children: [
				{
					path: '',
					name: 'specimens-list',
					component: SpecimenList,
				},
				{
					path: '/specimens/create',
					name: 'specimens-create',
					component: SpecimenEdit,
				},
				{
					path: '/specimens/:id',
					name: 'specimens-edit',
					component: SpecimenEdit,
				},
			],
		},
		{
			path: '/test-results',
			children: [
				{
					path: '',
					name: 'test-results-list',
					component: TestResultList,
				},
				{
					path: '/test-results/create',
					name: 'test-results-create',
					component: TestResultEdit,
				},
				{
					path: '/test-results/:id',
					name: 'test-results-edit',
					component: TestResultEdit,
				},
			],
		},
		{
			path: '/barcode-labels',
			children: [
				{
					path: '',
					name: 'barcode-labels-list',
					component: BarcodeLabelList,
				},
				{
					path: '/barcode-labels/create',
					name: 'barcode-labels-create',
					component: BarcodeLabelEdit,
				},
				{
					path: '/barcode-labels/:id',
					name: 'barcode-labels-edit',
					component: BarcodeLabelEdit,
				},
			],
		},
		{
			path: '/consents',
			children: [
				{
					path: '',
					name: 'consents-list',
					component: ConsentList,
				},
				{
					path: '/consents/create',
					name: 'consents-create',
					component: ConsentEdit,
				},
				{
					path: '/consents/:id',
					name: 'consents-edit',
					component: ConsentEdit,
				},
			],
		},
		{
			path: '/clinical-trials',
			children: [
				{
					path: '',
					name: 'clinical-trials-list',
					component: ClinicalTrialList,
				},
				{
					path: '/clinical-trials/create',
					name: 'clinical-trials-create',
					component: ClinicalTrialEdit,
				},
				{
					path: '/clinical-trials/:id',
					name: 'clinical-trials-edit',
					component: ClinicalTrialEdit,
				},
			],
		},
		{
			path: '/research-studies',
			children: [
				{
					path: '',
					name: 'research-studies-list',
					component: ResearchStudyList,
				},
				{
					path: '/research-studies/create',
					name: 'research-studies-create',
					component: ResearchStudyEdit,
				},
				{
					path: '/research-studies/:id',
					name: 'research-studies-edit',
					component: ResearchStudyEdit,
				},
			],
		},
		{
			path: '/appointment-types',
			children: [
				{
					path: '',
					name: 'appointment-types-list',
					component: AppointmentTypeList,
				},
				{
					path: '/appointment-types/create',
					name: 'appointment-types-create',
					component: AppointmentTypeEdit,
				},
				{
					path: '/appointment-types/:id',
					name: 'appointment-types-edit',
					component: AppointmentTypeEdit,
				},
			],
		},
		{
			path: '/follow-ups',
			children: [
				{
					path: '',
					name: 'follow-ups-list',
					component: FollowUpList,
				},
				{
					path: '/follow-ups/create',
					name: 'follow-ups-create',
					component: FollowUpEdit,
				},
				{
					path: '/follow-ups/:id',
					name: 'follow-ups-edit',
					component: FollowUpEdit,
				},
			],
		},
		{
			path: '/referral-sources',
			children: [
				{
					path: '',
					name: 'referral-sources-list',
					component: ReferralSourceList,
				},
				{
					path: '/referral-sources/create',
					name: 'referral-sources-create',
					component: ReferralSourceEdit,
				},
				{
					path: '/referral-sources/:id',
					name: 'referral-sources-edit',
					component: ReferralSourceEdit,
				},
			],
		},
		{
			path: '/discharge-summaries',
			children: [
				{
					path: '',
					name: 'discharge-summaries-list',
					component: DischargeSummaryList,
				},
				{
					path: '/discharge-summaries/create',
					name: 'discharge-summaries-create',
					component: DischargeSummaryEdit,
				},
				{
					path: '/discharge-summaries/:id',
					name: 'discharge-summaries-edit',
					component: DischargeSummaryEdit,
				},
			],
		},
		{
			path: '/nutritional-plans',
			children: [
				{
					path: '',
					name: 'nutritional-plans-list',
					component: NutritionalPlanList,
				},
				{
					path: '/nutritional-plans/create',
					name: 'nutritional-plans-create',
					component: NutritionalPlanEdit,
				},
				{
					path: '/nutritional-plans/:id',
					name: 'nutritional-plans-edit',
					component: NutritionalPlanEdit,
				},
			],
		},
		{
			path: '/diet-orders',
			children: [
				{
					path: '',
					name: 'diet-orders-list',
					component: DietOrderList,
				},
				{
					path: '/diet-orders/create',
					name: 'diet-orders-create',
					component: DietOrderEdit,
				},
				{
					path: '/diet-orders/:id',
					name: 'diet-orders-edit',
					component: DietOrderEdit,
				},
			],
		},
		{
			path: '/physical-therapy-sessions',
			children: [
				{
					path: '',
					name: 'physical-therapy-sessions-list',
					component: PhysicalTherapySessionList,
				},
				{
					path: '/physical-therapy-sessions/create',
					name: 'physical-therapy-sessions-create',
					component: PhysicalTherapySessionEdit,
				},
				{
					path: '/physical-therapy-sessions/:id',
					name: 'physical-therapy-sessions-edit',
					component: PhysicalTherapySessionEdit,
				},
			],
		},
		{
			path: '/occupational-therapy-sessions',
			children: [
				{
					path: '',
					name: 'occupational-therapy-sessions-list',
					component: OccupationalTherapySessionList,
				},
				{
					path: '/occupational-therapy-sessions/create',
					name: 'occupational-therapy-sessions-create',
					component: OccupationalTherapySessionEdit,
				},
				{
					path: '/occupational-therapy-sessions/:id',
					name: 'occupational-therapy-sessions-edit',
					component: OccupationalTherapySessionEdit,
				},
			],
		},
		{
			path: '/social-work-notes',
			children: [
				{
					path: '',
					name: 'social-work-notes-list',
					component: SocialWorkNoteList,
				},
				{
					path: '/social-work-notes/create',
					name: 'social-work-notes-create',
					component: SocialWorkNoteEdit,
				},
				{
					path: '/social-work-notes/:id',
					name: 'social-work-notes-edit',
					component: SocialWorkNoteEdit,
				},
			],
		},
		{
			path: '/case-managers',
			children: [
				{
					path: '',
					name: 'case-managers-list',
					component: CaseManagerList,
				},
				{
					path: '/case-managers/create',
					name: 'case-managers-create',
					component: CaseManagerEdit,
				},
				{
					path: '/case-managers/:id',
					name: 'case-managers-edit',
					component: CaseManagerEdit,
				},
			],
		},
		{
			path: '/hospice-cares-care-visits-care-visits',
			children: [
				{
					path: '',
					name: 'home-care-visits-list',
					component: HomeCareVisitList,
				},
				{
					path: '/palliative-care-plans-care-visits/create',
					name: 'home-care-visits-create',
					component: HomeCareVisitEdit,
				},
				{
					path: '/mortality-reports-care-visits/:id',
					name: 'home-care-visits-edit',
					component: HomeCareVisitEdit,
				},
			],
		},
		{
			path: '/hospice-cares',
			children: [
				{
					path: '',
					name: 'hospice-cares-list',
					component: HospiceCareList,
				},
				{
					path: '/hospice-cares/create',
					name: 'hospice-cares-create',
					component: HospiceCareEdit,
				},
				{
					path: '/hospice-cares/:id',
					name: 'hospice-cares-edit',
					component: HospiceCareEdit,
				},
			],
		},
		{
			path: '/palliative-care-plans',
			children: [
				{
					path: '',
					name: 'palliative-care-plans-list',
					component: PalliativeCarePlanList,
				},
				{
					path: '/palliative-care-plans/create',
					name: 'palliative-care-plans-create',
					component: PalliativeCarePlanEdit,
				},
				{
					path: '/palliative-care-plans/:id',
					name: 'palliative-care-plans-edit',
					component: PalliativeCarePlanEdit,
				},
			],
		},
		{
			path: '/mortality-reports',
			children: [
				{
					path: '',
					name: 'mortality-reports-list',
					component: MortalityReportList,
				},
				{
					path: '/mortality-reports/create',
					name: 'mortality-reports-create',
					component: MortalityReportEdit,
				},
				{
					path: '/mortality-reports/:id',
					name: 'mortality-reports-edit',
					component: MortalityReportEdit,
				},
			],
		},
		{
			path: '/autopsy-reports',
			children: [
				{
					path: '',
					name: 'autopsy-reports-list',
					component: AutopsyReportList,
				},
				{
					path: '/autopsy-reports/create',
					name: 'autopsy-reports-create',
					component: AutopsyReportEdit,
				},
				{
					path: '/autopsy-reports/:id',
					name: 'autopsy-reports-edit',
					component: AutopsyReportEdit,
				},
			],
		},
		{
			path: '/legal-holds',
			children: [
				{
					path: '',
					name: 'legal-holds-list',
					component: LegalHoldList,
				},
				{
					path: '/legal-holds/create',
					name: 'legal-holds-create',
					component: LegalHoldEdit,
				},
				{
					path: '/legal-holds/:id',
					name: 'legal-holds-edit',
					component: LegalHoldEdit,
				},
			],
		},
		{
			path: '/audit-logs',
			children: [
				{
					path: '',
					name: 'audit-logs-list',
					component: AuditLogList,
				},
				{
					path: '/audit-logs/create',
					name: 'audit-logs-create',
					component: AuditLogEdit,
				},
				{
					path: '/audit-logs/:id',
					name: 'audit-logs-edit',
					component: AuditLogEdit,
				},
			],
		},
		{
			path: '/settings',
			children: [
				{
					path: '',
					name: 'settings-list',
					component: SettingsList,
				},
				{
					path: '/settings/create',
					name: 'settings-create',
					component: SettingsEdit,
				},
				{
					path: '/settings/:id',
					name: 'settings-edit',
					component: SettingsEdit,
				},
			],
		},
		{
			path: '/roles',
			children: [
				{
					path: '',
					name: 'roles-list',
					component: RoleList,
				},
				{
					path: '/roles/create',
					name: 'roles-create',
					component: RoleEdit,
				},
				{
					path: '/roles/:id',
					name: 'roles-edit',
					component: RoleEdit,
				},
			],
		},
		{
			path: '/permissions',
			children: [
				{
					path: '',
					name: 'permissions-list',
					component: PermissionList,
				},
				{
					path: '/permissions/create',
					name: 'permissions-create',
					component: PermissionEdit,
				},
				{
					path: '/permissions/:id',
					name: 'permissions-edit',
					component: PermissionEdit,
				},
			],
		},
		{
			path: '/activity-logs',
			children: [
				{
					path: '',
					name: 'activity-logs-list',
					component: ActivityLogList,
				},
				{
					path: '/activity-logs/create',
					name: 'activity-logs-create',
					component: ActivityLogEdit,
				},
				{
					path: '/activity-logs/:id',
					name: 'activity-logs-edit',
					component: ActivityLogEdit,
				},
			],
		},
		{
			path: '/api-keys',
			children: [
				{
					path: '',
					name: 'api-keys-list',
					component: APIKeyList,
				},
				{
					path: '/api-keys/create',
					name: 'api-keys-create',
					component: APIKeyEdit,
				},
				{
					path: '/api-keys/:id',
					name: 'api-keys-edit',
					component: APIKeyEdit,
				},
			],
		},
		{
			path: '/integrations',
			children: [
				{
					path: '',
					name: 'integrations-list',
					component: IntegrationList,
				},
				{
					path: '/integrations/create',
					name: 'integrations-create',
					component: IntegrationEdit,
				},
				{
					path: '/integrations/:id',
					name: 'integrations-edit',
					component: IntegrationEdit,
				},
			],
		},
		{
			path: '/hl7-messages',
			children: [
				{
					path: '',
					name: 'hl7-messages-list',
					component: HL7MessageList,
				},
				{
					path: '/hl7-messages/create',
					name: 'hl7-messages-create',
					component: HL7MessageEdit,
				},
				{
					path: '/hl7-messages/:id',
					name: 'hl7-messages-edit',
					component: HL7MessageEdit,
				},
			],
		},
		{
			path: '/dicom-instances',
			children: [
				{
					path: '',
					name: 'dicom-instances-list',
					component: DICOMInstanceList,
				},
				{
					path: '/dicom-instances/create',
					name: 'dicom-instances-create',
					component: DICOMInstanceEdit,
				},
				{
					path: '/dicom-instances/:id',
					name: 'dicom-instances-edit',
					component: DICOMInstanceEdit,
				},
			],
		},
		{
			path: '/blood-banks',
			children: [
				{
					path: '',
					name: 'blood-banks-list',
					component: BloodBankList,
				},
				{
					path: '/blood-banks/create',
					name: 'blood-banks-create',
					component: BloodBankEdit,
				},
				{
					path: '/blood-banks/:id',
					name: 'blood-banks-edit',
					component: BloodBankEdit,
				},
			],
		},
		{
			path: '/donors',
			children: [
				{
					path: '',
					name: 'donors-list',
					component: DonorList,
				},
				{
					path: '/donors/create',
					name: 'donors-create',
					component: DonorEdit,
				},
				{
					path: '/donors/:id',
					name: 'donors-edit',
					component: DonorEdit,
				},
			],
		},
		{
			path: '/transfusions',
			children: [
				{
					path: '',
					name: 'transfusions-list',
					component: TransfusionList,
				},
				{
					path: '/transfusions/create',
					name: 'transfusions-create',
					component: TransfusionEdit,
				},
				{
					path: '/transfusions/:id',
					name: 'transfusions-edit',
					component: TransfusionEdit,
				},
			],
		},
		{
			path: '/blood-products',
			children: [
				{
					path: '',
					name: 'blood-products-list',
					component: BloodProductList,
				},
				{
					path: '/blood-products/create',
					name: 'blood-products-create',
					component: BloodProductEdit,
				},
				{
					path: '/blood-products/:id',
					name: 'blood-products-edit',
					component: BloodProductEdit,
				},
			],
		},
		{
			path: '/vaccine-records',
			children: [
				{
					path: '',
					name: 'vaccine-records-list',
					component: VaccineRecordList,
				},
				{
					path: '/vaccine-records/create',
					name: 'vaccine-records-create',
					component: VaccineRecordEdit,
				},
				{
					path: '/vaccine-records/:id',
					name: 'vaccine-records-edit',
					component: VaccineRecordEdit,
				},
			],
		},
		{
			path: '/immunizations',
			children: [
				{
					path: '',
					name: 'immunizations-list',
					component: ImmunizationList,
				},
				{
					path: '/immunizations/create',
					name: 'immunizations-create',
					component: ImmunizationEdit,
				},
				{
					path: '/immunizations/:id',
					name: 'immunizations-edit',
					component: ImmunizationEdit,
				},
			],
		},
		{
			path: '/growth-charts',
			children: [
				{
					path: '',
					name: 'growth-charts-list',
					component: GrowthChartList,
				},
				{
					path: '/growth-charts/create',
					name: 'growth-charts-create',
					component: GrowthChartEdit,
				},
				{
					path: '/growth-charts/:id',
					name: 'growth-charts-edit',
					component: GrowthChartEdit,
				},
			],
		},
		{
			path: '/screenings',
			children: [
				{
					path: '',
					name: 'screenings-list',
					component: ScreeningList,
				},
				{
					path: '/screenings/create',
					name: 'screenings-create',
					component: ScreeningEdit,
				},
				{
					path: '/screenings/:id',
					name: 'screenings-edit',
					component: ScreeningEdit,
				},
			],
		},
		{
			path: '/risk-assessments',
			children: [
				{
					path: '',
					name: 'risk-assessments-list',
					component: RiskAssessmentList,
				},
				{
					path: '/risk-assessments/create',
					name: 'risk-assessments-create',
					component: RiskAssessmentEdit,
				},
				{
					path: '/risk-assessments/:id',
					name: 'risk-assessments-edit',
					component: RiskAssessmentEdit,
				},
			],
		},
		{
			path: '/scores',
			children: [
				{
					path: '',
					name: 'scores-list',
					component: ScoreList,
				},
				{
					path: '/scores/create',
					name: 'scores-create',
					component: ScoreEdit,
				},
				{
					path: '/scores/:id',
					name: 'scores-edit',
					component: ScoreEdit,
				},
			],
		},
		{
			path: '/geo-locations',
			children: [
				{
					path: '',
					name: 'geo-locations-list',
					component: GeoLocationList,
				},
				{
					path: '/geo-locations/create',
					name: 'geo-locations-create',
					component: GeoLocationEdit,
				},
				{
					path: '/geo-locations/:id',
					name: 'geo-locations-edit',
					component: GeoLocationEdit,
				},
			],
		},
		{
			path: '/facilities',
			children: [
				{
					path: '',
					name: 'facilities-list',
					component: FacilityList,
				},
				{
					path: '/facilities/create',
					name: 'facilities-create',
					component: FacilityEdit,
				},
				{
					path: '/facilities/:id',
					name: 'facilities-edit',
					component: FacilityEdit,
				},
			],
		},
		{
			path: '/404-not-found',
			name: 'not-found',
			component: NotFound,
			meta: {
				unprotected: true,
			},
		},
		{
			path: '/account',
			children: [
				{
					path: '',
					name: 'account-details',
					component: UserDetails,
				},
			],
		},
		{
			name: 'root',
			path: '/:pathMatch(.*)*',
			redirect: '/patients',
		},
	],
})

router.beforeEach(authGuard)

export default router
