<template>
	<div
		class="navigation"
		:class="{ 'navigation--expanded': locked }"
		@mouseover="isSidebarOpen = true"
		@mouseleave="isSidebarOpen = false">
		<div class="navigation__header">
			<img
				class="navigation__logo"
				src="@/assets/logo.png"
				alt="logo" />
			<Button
				v-tooltip.bottom="locked ? 'Unlock sidebar' : 'Lock sidebar'"
				severity="secondary"
				:icon="lockIcon"
				text
				@click="toggleLocked" />
		</div>
		<div class="navigation__links-container">
			<router-link
				class="navigation__link-item"
				:to="{ name: 'patients-list' }">
				<i class="navigation__link-icon far fa-light fa-user"></i>
				<div class="navigation__link-title">Patients</div>
			</router-link>
			<router-link
				class="navigation__link-item"
				:to="{ name: 'doctors-list' }">
				<i class="navigation__link-icon far fa-light fa-user-md"></i>
				<div class="navigation__link-title">Doctors</div>
			</router-link>
			<router-link
				class="navigation__link-item"
				:to="{ name: 'nurses-list' }">
				<i class="navigation__link-icon far fa-light fa-nurse"></i>
				<div class="navigation__link-title">Nurses</div>
			</router-link>
			<router-link
				class="navigation__link-item"
				:to="{ name: 'appointments-list' }">
				<i class="navigation__link-icon far fa-light fa-calendar"></i>
				<div class="navigation__link-title">Appointments</div>
			</router-link>
			<router-link
				class="navigation__link-item"
				:to="{ name: 'departments-list' }">
				<i class="navigation__link-icon far fa-light fa-building"></i>
				<div class="navigation__link-title">Departments</div>
			</router-link>
			<router-link
				class="navigation__link-item"
				:to="{ name: 'treatments-list' }">
				<i class="navigation__link-icon far fa-light fa-tooth"></i>
				<div class="navigation__link-title">Treatments</div>
			</router-link>
			<router-link
				class="navigation__link-item"
				:to="{ name: 'medications-list' }">
				<i class="navigation__link-icon far fa-light fa-pills"></i>
				<div class="navigation__link-title">Medications</div>
			</router-link>
			<router-link
				class="navigation__link-item"
				:to="{ name: 'billing-accounts-list' }">
				<i class="navigation__link-icon far fa-light fa-bill"></i>
				<div class="navigation__link-title">Billing Accounts</div>
			</router-link>
			<router-link
				class="navigation__link-item"
				:to="{ name: 'invoices-list' }">
				<i class="navigation__link-icon far fa-light fa-file-invoice"></i>
				<div class="navigation__link-title">Invoices</div>
			</router-link>
			<router-link
				class="navigation__link-item"
				:to="{ name: 'payments-list' }">
				<i class="navigation__link-icon far fa-light fa-money-bill"></i>
				<div class="navigation__link-title">Payments</div>
			</router-link>
			<router-link
				class="navigation__link-item"
				:to="{ name: 'insurances-list' }">
				<i class="navigation__link-icon far fa-light fa-shield-alt"></i>
				<div class="navigation__link-title">Insurances</div>
			</router-link>
			<router-link
				class="navigation__link-item"
				:to="{ name: 'allergies-list' }">
				<i class="navigation__link-icon far fa-light fa-band-aid"></i>
				<div class="navigation__link-title">Allergies</div>
			</router-link>
			<router-link
				class="navigation__link-item"
				:to="{ name: 'medical-records-list' }">
				<i class="navigation__link-icon far fa-light fa-notes-medical"></i>
				<div class="navigation__link-title">Medical Records</div>
			</router-link>
			<router-link
				class="navigation__link-item"
				:to="{ name: 'prescriptions-list' }">
				<i class="navigation__link-icon far fa-light fa-prescription-bottle"></i>
				<div class="navigation__link-title">Prescriptions</div>
			</router-link>
			<router-link
				class="navigation__link-item"
				:to="{ name: 'lab-tests-list' }">
				<i class="navigation__link-icon far fa-light fa-flask"></i>
				<div class="navigation__link-title">Lab Tests</div>
			</router-link>
			<router-link
				class="navigation__link-item"
				:to="{ name: 'radiology-reports-list' }">
				<i class="navigation__link-icon far fa-light fa-xray"></i>
				<div class="navigation__link-title">Radiology Reports</div>
			</router-link>
			<router-link
				class="navigation__link-item"
				:to="{ name: 'admissions-list' }">
				<i class="navigation__link-icon far fa-light fa-hospital"></i>
				<div class="navigation__link-title">Admissions</div>
			</router-link>
			<router-link
				class="navigation__link-item"
				:to="{ name: 'discharges-list' }">
				<i class="navigation__link-icon far fa-light fa-notes-medical"></i>
				<div class="navigation__link-title">Discharges</div>
			</router-link>
			<router-link
				class="navigation__link-item"
				:to="{ name: 'beds-list' }">
				<i class="navigation__link-icon far fa-light fa-bed"></i>
				<div class="navigation__link-title">Beds</div>
			</router-link>
			<router-link
				class="navigation__link-item"
				:to="{ name: 'wards-list' }">
				<i class="navigation__link-icon far fa-light fa-ward"></i>
				<div class="navigation__link-title">Wards</div>
			</router-link>
			<router-link
				class="navigation__link-item"
				:to="{ name: 'operating-rooms-list' }">
				<i class="navigation__link-icon far fa-light fa-procedures"></i>
				<div class="navigation__link-title">Operating Rooms</div>
			</router-link>
			<router-link
				class="navigation__link-item"
				:to="{ name: 'surgeries-list' }">
				<i class="navigation__link-icon far fa-light fa-user-md"></i>
				<div class="navigation__link-title">Surgeries</div>
			</router-link>
			<router-link
				class="navigation__link-item"
				:to="{ name: 'anesthesia-list' }">
				<i class="navigation__link-icon far fa-light fa-stethoscope"></i>
				<div class="navigation__link-title">Anesthesia</div>
			</router-link>
			<router-link
				class="navigation__link-item"
				:to="{ name: 'consent-forms-list' }">
				<i class="navigation__link-icon far fa-light fa-file-contract"></i>
				<div class="navigation__link-title">Consent Forms</div>
			</router-link>
			<router-link
				class="navigation__link-item"
				:to="{ name: 'referrals-list' }">
				<i class="navigation__link-icon far fa-light fa-handshake"></i>
				<div class="navigation__link-title">Referrals</div>
			</router-link>
			<router-link
				class="navigation__link-item"
				:to="{ name: 'visits-list' }">
				<i class="navigation__link-icon far fa-light fa-calendar"></i>
				<div class="navigation__link-title">Visits</div>
			</router-link>
			<router-link
				class="navigation__link-item"
				:to="{ name: 'vital-signs-list' }">
				<i class="navigation__link-icon far fa-light fa-heartbeat"></i>
				<div class="navigation__link-title">Vital Signs</div>
			</router-link>
			<router-link
				class="navigation__link-item"
				:to="{ name: 'diagnoses-list' }">
				<i class="navigation__link-icon far fa-light fa-notes-medical"></i>
				<div class="navigation__link-title">Diagnoses</div>
			</router-link>
			<router-link
				class="navigation__link-item"
				:to="{ name: 'procedures-list' }">
				<i class="navigation__link-icon far fa-light fa-briefcase"></i>
				<div class="navigation__link-title">Procedures</div>
			</router-link>
			<router-link
				class="navigation__link-item"
				:to="{ name: 'rooms-list' }">
				<i class="navigation__link-icon far fa-light fa-door-closed"></i>
				<div class="navigation__link-title">Rooms</div>
			</router-link>
			<router-link
				class="navigation__link-item"
				:to="{ name: 'shifts-list' }">
				<i class="navigation__link-icon far fa-light fa-clock"></i>
				<div class="navigation__link-title">Shifts</div>
			</router-link>
			<router-link
				class="navigation__link-item"
				:to="{ name: 'schedules-list' }">
				<i class="navigation__link-icon far fa-light fa-calendar"></i>
				<div class="navigation__link-title">Schedules</div>
			</router-link>
			<router-link
				class="navigation__link-item"
				:to="{ name: 'staff-roles-list' }">
				<i class="navigation__link-icon far fa-light fa-user-triends"></i>
				<div class="navigation__link-title">Staff Roles</div>
			</router-link>
			<router-link
				class="navigation__link-item"
				:to="{ name: 'specialties-list' }">
				<i class="navigation__link-icon far fa-light fa-medal"></i>
				<div class="navigation__link-title">Specialties</div>
			</router-link>
			<router-link
				class="navigation__link-item"
				:to="{ name: 'notes-list' }">
				<i class="navigation__link-icon far fa-light fa-note-sticky"></i>
				<div class="navigation__link-title">Notes</div>
			</router-link>
			<router-link
				class="navigation__link-item"
				:to="{ name: 'family-contacts-list' }">
				<i class="navigation__link-icon far fa-light fa-address-book"></i>
				<div class="navigation__link-title">Family Contacts</div>
			</router-link>
			<router-link
				class="navigation__link-item"
				:to="{ name: 'emergency-contacts-list' }">
				<i class="navigation__link-icon far fa-light fa-ambulance"></i>
				<div class="navigation__link-title">Emergency Contacts</div>
			</router-link>
			<router-link
				class="navigation__link-item"
				:to="{ name: 'pharmacy-orders-list' }">
				<i class="navigation__link-icon far fa-light fa-pills"></i>
				<div class="navigation__link-title">Pharmacy Orders</div>
			</router-link>
			<router-link
				class="navigation__link-item"
				:to="{ name: 'medication-stocks-list' }">
				<i class="navigation__link-icon far fa-light fa-prescription-basket"></i>
				<div class="navigation__link-title">Medication Stocks</div>
			</router-link>
			<router-link
				class="navigation__link-item"
				:to="{ name: 'suppliers-list' }">
				<i class="navigation__link-icon far fa-light fa-truck"></i>
				<div class="navigation__link-title">Suppliers</div>
			</router-link>
			<router-link
				class="navigation__link-item"
				:to="{ name: 'procurement-orders-list' }">
				<i class="navigation__link-icon far fa-light fa-box"></i>
				<div class="navigation__link-title">Procurement Orders</div>
			</router-link>
			<router-link
				class="navigation__link-item"
				:to="{ name: 'inventory-items-list' }">
				<i class="navigation__link-icon far fa-light fa-box"></i>
				<div class="navigation__link-title">Inventory Items</div>
			</router-link>
			<router-link
				class="navigation__link-item"
				:to="{ name: 'billing-items-list' }">
				<i class="navigation__link-icon far fa-light fa-bill"></i>
				<div class="navigation__link-title">Billing Items</div>
			</router-link>
			<router-link
				class="navigation__link-item"
				:to="{ name: 'currencies-list' }">
				<i class="navigation__link-icon far fa-light fa-money-bill-wave"></i>
				<div class="navigation__link-title">Currencies</div>
			</router-link>
			<router-link
				class="navigation__link-item"
				:to="{ name: 'tax-rates-list' }">
				<i class="navigation__link-icon far fa-light fa-calculator"></i>
				<div class="navigation__link-title">Tax Rates</div>
			</router-link>
			<router-link
				class="navigation__link-item"
				:to="{ name: 'insurance-claims-list' }">
				<i class="navigation__link-icon far fa-light fa-file-contract"></i>
				<div class="navigation__link-title">Insurance Claims</div>
			</router-link>
			<router-link
				class="navigation__link-item"
				:to="{ name: 'claim-adjustments-list' }">
				<i class="navigation__link-icon far fa-light fa-hand-holding-usd"></i>
				<div class="navigation__link-title">Claim Adjustments</div>
			</router-link>
			<router-link
				class="navigation__link-item"
				:to="{ name: 'payment-methods-list' }">
				<i class="navigation__link-icon far fa-light fa-credit-card"></i>
				<div class="navigation__link-title">Payment Methods</div>
			</router-link>
			<router-link
				class="navigation__link-item"
				:to="{ name: 'ledger-accounts-list' }">
				<i class="navigation__link-icon far fa-light fa-wallet"></i>
				<div class="navigation__link-title">Ledger Accounts</div>
			</router-link>
			<router-link
				class="navigation__link-item"
				:to="{ name: 'financial-transactions-list' }">
				<i class="navigation__link-icon far fa-light fa-dollar-sign"></i>
				<div class="navigation__link-title">Financial Transactions</div>
			</router-link>
			<router-link
				class="navigation__link-item"
				:to="{ name: 'staff-credentials-list' }">
				<i class="navigation__link-icon far fa-light fa-id-card"></i>
				<div class="navigation__link-title">Staff Credentials</div>
			</router-link>
			<router-link
				class="navigation__link-item"
				:to="{ name: 'certifications-list' }">
				<i class="navigation__link-icon far fa-light fa-certificate"></i>
				<div class="navigation__link-title">Certifications</div>
			</router-link>
			<router-link
				class="navigation__link-item"
				:to="{ name: 'training-records-list' }">
				<i class="navigation__link-icon far fa-light fa-book"></i>
				<div class="navigation__link-title">Training Records</div>
			</router-link>
			<router-link
				class="navigation__link-item"
				:to="{ name: 'attendances-list' }">
				<i class="navigation__link-icon far fa-light fa-calendar-check"></i>
				<div class="navigation__link-title">Attendances</div>
			</router-link>
			<router-link
				class="navigation__link-item"
				:to="{ name: 'leave-requests-list' }">
				<i class="navigation__link-icon far fa-light fa-calendar"></i>
				<div class="navigation__link-title">Leave Requests</div>
			</router-link>
			<router-link
				class="navigation__link-item"
				:to="{ name: 'shift-assignments-list' }">
				<i class="navigation__link-icon far fa-light fa-user-clock"></i>
				<div class="navigation__link-title">Shift Assignments</div>
			</router-link>
			<router-link
				class="navigation__link-item"
				:to="{ name: 'care-plans-list' }">
				<i class="navigation__link-icon far fa-light fa-clipboard"></i>
				<div class="navigation__link-title">Care Plans</div>
			</router-link>
			<router-link
				class="navigation__link-item"
				:to="{ name: 'care-teams-list' }">
				<i class="navigation__link-icon far fa-light fa-users"></i>
				<div class="navigation__link-title">Care Teams</div>
			</router-link>
			<router-link
				class="navigation__link-item"
				:to="{ name: 'devices-list' }">
				<i class="navigation__link-icon far fa-light fa-droplet"></i>
				<div class="navigation__link-title">Devices</div>
			</router-link>
			<router-link
				class="navigation__link-item"
				:to="{ name: 'medical-device-maintenances-list' }">
				<i class="navigation__link-icon far fa-light fa-hard-hat"></i>
				<div class="navigation__link-title">Medical Device Maintenances</div>
			</router-link>
			<router-link
				class="navigation__link-item"
				:to="{ name: 'queues-list' }">
				<i class="navigation__link-icon far fa-light fa-fw fa-queue"></i>
				<div class="navigation__link-title">Queues</div>
			</router-link>
			<router-link
				class="navigation__link-item"
				:to="{ name: 'waiting-lists-list' }">
				<i class="navigation__link-icon far fa-light fa-clock"></i>
				<div class="navigation__link-title">Waiting Lists</div>
			</router-link>
			<router-link
				class="navigation__link-item"
				:to="{ name: 'telemedicine-sessions-list' }">
				<i class="navigation__link-icon far fa-light fa-video"></i>
				<div class="navigation__link-title">Telemedicine Sessions</div>
			</router-link>
			<router-link
				class="navigation__link-item"
				:to="{ name: 'messages-list' }">
				<i class="navigation__link-icon far fa-light fa-comment-dots"></i>
				<div class="navigation__link-title">Messages</div>
			</router-link>
			<router-link
				class="navigation__link-item"
				:to="{ name: 'notifications-list' }">
				<i class="navigation__link-icon far fa-light fa-bell"></i>
				<div class="navigation__link-title">Notifications</div>
			</router-link>
			<router-link
				class="navigation__link-item"
				:to="{ name: 'documents-list' }">
				<i class="navigation__link-icon far fa-light fa-file"></i>
				<div class="navigation__link-title">Documents</div>
			</router-link>
			<router-link
				class="navigation__link-item"
				:to="{ name: 'imaging-studies-list' }">
				<i class="navigation__link-icon far fa-light fa-x-ray"></i>
				<div class="navigation__link-title">Imaging Studies</div>
			</router-link>
			<router-link
				class="navigation__link-item"
				:to="{ name: 'pathology-reports-list' }">
				<i class="navigation__link-icon far fa-light fa-flask"></i>
				<div class="navigation__link-title">Pathology Reports</div>
			</router-link>
			<router-link
				class="navigation__link-item"
				:to="{ name: 'lab-orders-list' }">
				<i class="navigation__link-icon far fa-light fa-flask"></i>
				<div class="navigation__link-title">Lab Orders</div>
			</router-link>
			<router-link
				class="navigation__link-item"
				:to="{ name: 'samples-list' }">
				<i class="navigation__link-icon far fa-light fa-flask"></i>
				<div class="navigation__link-title">Samples</div>
			</router-link>
			<router-link
				class="navigation__link-item"
				:to="{ name: 'specimens-list' }">
				<i class="navigation__link-icon far fa-light fa-flask"></i>
				<div class="navigation__link-title">Specimens</div>
			</router-link>
			<router-link
				class="navigation__link-item"
				:to="{ name: 'test-results-list' }">
				<i class="navigation__link-icon far fa-light fa-flask"></i>
				<div class="navigation__link-title">Test Results</div>
			</router-link>
			<router-link
				class="navigation__link-item"
				:to="{ name: 'barcode-labels-list' }">
				<i class="navigation__link-icon far fa-light fa-barcode"></i>
				<div class="navigation__link-title">Barcode Labels</div>
			</router-link>
			<router-link
				class="navigation__link-item"
				:to="{ name: 'consents-list' }">
				<i class="navigation__link-icon far fa-light fa-handshake"></i>
				<div class="navigation__link-title">Consents</div>
			</router-link>
			<router-link
				class="navigation__link-item"
				:to="{ name: 'clinical-trials-list' }">
				<i class="navigation__link-icon far fa-light fa-flask"></i>
				<div class="navigation__link-title">Clinical Trials</div>
			</router-link>
			<router-link
				class="navigation__link-item"
				:to="{ name: 'research-studies-list' }">
				<i class="navigation__link-icon far fa-light fa-flask"></i>
				<div class="navigation__link-title">Research Studies</div>
			</router-link>
			<router-link
				class="navigation__link-item"
				:to="{ name: 'appointment-types-list' }">
				<i class="navigation__link-icon far fa-light fa-calendar-alt"></i>
				<div class="navigation__link-title">Appointment Types</div>
			</router-link>
			<router-link
				class="navigation__link-item"
				:to="{ name: 'follow-ups-list' }">
				<i class="navigation__link-icon far fa-light fa-calendar-check"></i>
				<div class="navigation__link-title">Follow Ups</div>
			</router-link>
			<router-link
				class="navigation__link-item"
				:to="{ name: 'referral-sources-list' }">
				<i class="navigation__link-icon far fa-light fa-bullseye"></i>
				<div class="navigation__link-title">Referral Sources</div>
			</router-link>
			<router-link
				class="navigation__link-item"
				:to="{ name: 'discharge-summaries-list' }">
				<i class="navigation__link-icon far fa-light fa-file-alt"></i>
				<div class="navigation__link-title">Discharge Summaries</div>
			</router-link>
			<router-link
				class="navigation__link-item"
				:to="{ name: 'nutritional-plans-list' }">
				<i class="navigation__link-icon far fa-light fa-apple-alt"></i>
				<div class="navigation__link-title">Nutritional Plans</div>
			</router-link>
			<router-link
				class="navigation__link-item"
				:to="{ name: 'diet-orders-list' }">
				<i class="navigation__link-icon far fa-light fa-utensils"></i>
				<div class="navigation__link-title">Diet Orders</div>
			</router-link>
			<router-link
				class="navigation__link-item"
				:to="{ name: 'physical-therapy-sessions-list' }">
				<i class="navigation__link-icon far fa-light fa-bone"></i>
				<div class="navigation__link-title">Physical Therapy Sessions</div>
			</router-link>
			<router-link
				class="navigation__link-item"
				:to="{ name: 'occupational-therapy-sessions-list' }">
				<i class="navigation__link-icon far fa-light fa-user-doctor"></i>
				<div class="navigation__link-title">Occupational Therapy Sessions</div>
			</router-link>
			<router-link
				class="navigation__link-item"
				:to="{ name: 'social-work-notes-list' }">
				<i class="navigation__link-icon far fa-light fa-book"></i>
				<div class="navigation__link-title">Social Work Notes</div>
			</router-link>
			<router-link
				class="navigation__link-item"
				:to="{ name: 'case-managers-list' }">
				<i class="navigation__link-icon far fa-light fa-briefcase"></i>
				<div class="navigation__link-title">Case Managers</div>
			</router-link>
			<router-link
				class="navigation__link-item"
				:to="{ name: 'home-care-visits-list' }">
				<i class="navigation__link-icon far fa-light fa-house-user"></i>
				<div class="navigation__link-title">Home Care Visits</div>
			</router-link>
			<router-link
				class="navigation__link-item"
				:to="{ name: 'hospice-cares-list' }">
				<i class="navigation__link-icon far fa-light fa-heart"></i>
				<div class="navigation__link-title">Hospice Cares</div>
			</router-link>
			<router-link
				class="navigation__link-item"
				:to="{ name: 'palliative-care-plans-list' }">
				<i class="navigation__link-icon far fa-light fa-heart"></i>
				<div class="navigation__link-title">Palliative Care Plans</div>
			</router-link>
			<router-link
				class="navigation__link-item"
				:to="{ name: 'mortality-reports-list' }">
				<i class="navigation__link-icon far fa-light fa-file-medical"></i>
				<div class="navigation__link-title">Mortality Reports</div>
			</router-link>
			<router-link
				class="navigation__link-item"
				:to="{ name: 'autopsy-reports-list' }">
				<i class="navigation__link-icon far fa-light fa-file-medical"></i>
				<div class="navigation__link-title">Autopsy Reports</div>
			</router-link>
			<router-link
				class="navigation__link-item"
				:to="{ name: 'legal-holds-list' }">
				<i class="navigation__link-icon far fa-light fa-gavel"></i>
				<div class="navigation__link-title">Legal Holds</div>
			</router-link>
			<router-link
				class="navigation__link-item"
				:to="{ name: 'audit-logs-list' }">
				<i class="navigation__link-icon far fa-light fa-shield-alt"></i>
				<div class="navigation__link-title">Audit Logs</div>
			</router-link>
			<router-link
				class="navigation__link-item"
				:to="{ name: 'settings-list' }">
				<i class="navigation__link-icon far fa-light fa-gear"></i>
				<div class="navigation__link-title">Settings</div>
			</router-link>
			<router-link
				class="navigation__link-item"
				:to="{ name: 'roles-list' }">
				<i class="navigation__link-icon far fa-light fa-user-tag"></i>
				<div class="navigation__link-title">Roles</div>
			</router-link>
			<router-link
				class="navigation__link-item"
				:to="{ name: 'permissions-list' }">
				<i class="navigation__link-icon far fa-light fa-shield-alt"></i>
				<div class="navigation__link-title">Permissions</div>
			</router-link>
			<router-link
				class="navigation__link-item"
				:to="{ name: 'activity-logs-list' }">
				<i class="navigation__link-icon far fa-light fa-clock"></i>
				<div class="navigation__link-title">Activity Logs</div>
			</router-link>
			<router-link
				class="navigation__link-item"
				:to="{ name: 'api-keys-list' }">
				<i class="navigation__link-icon far fa-light fa-key"></i>
				<div class="navigation__link-title">A P I Keys</div>
			</router-link>
			<router-link
				class="navigation__link-item"
				:to="{ name: 'integrations-list' }">
				<i class="navigation__link-icon far fa-light fa-plug"></i>
				<div class="navigation__link-title">Integrations</div>
			</router-link>
			<router-link
				class="navigation__link-item"
				:to="{ name: 'hl7-messages-list' }">
				<i class="navigation__link-icon far fa-light fa-hashtag"></i>
				<div class="navigation__link-title">H L7 Messages</div>
			</router-link>
			<router-link
				class="navigation__link-item"
				:to="{ name: 'dicom-instances-list' }">
				<i class="navigation__link-icon far fa-light fa-file-medical"></i>
				<div class="navigation__link-title">D I C O M Instances</div>
			</router-link>
			<router-link
				class="navigation__link-item"
				:to="{ name: 'blood-banks-list' }">
				<i class="navigation__link-icon far fa-light fa-tint"></i>
				<div class="navigation__link-title">Blood Banks</div>
			</router-link>
			<router-link
				class="navigation__link-item"
				:to="{ name: 'donors-list' }">
				<i class="navigation__link-icon far fa-light fa-hand-holding-heart"></i>
				<div class="navigation__link-title">Donors</div>
			</router-link>
			<router-link
				class="navigation__link-item"
				:to="{ name: 'transfusions-list' }">
				<i class="navigation__link-icon far fa-light fa-tint"></i>
				<div class="navigation__link-title">Transfusions</div>
			</router-link>
			<router-link
				class="navigation__link-item"
				:to="{ name: 'blood-products-list' }">
				<i class="navigation__link-icon far fa-light fa-blood-drop"></i>
				<div class="navigation__link-title">Blood Products</div>
			</router-link>
			<router-link
				class="navigation__link-item"
				:to="{ name: 'vaccine-records-list' }">
				<i class="navigation__link-icon far fa-light fa-vial"></i>
				<div class="navigation__link-title">Vaccine Records</div>
			</router-link>
			<router-link
				class="navigation__link-item"
				:to="{ name: 'immunizations-list' }">
				<i class="navigation__link-icon far fa-light fa-syringe"></i>
				<div class="navigation__link-title">Immunizations</div>
			</router-link>
			<router-link
				class="navigation__link-item"
				:to="{ name: 'growth-charts-list' }">
				<i class="navigation__link-icon far fa-light fa-chart-line"></i>
				<div class="navigation__link-title">Growth Charts</div>
			</router-link>
			<router-link
				class="navigation__link-item"
				:to="{ name: 'screenings-list' }">
				<i class="navigation__link-icon far fa-light fa-stethoscope"></i>
				<div class="navigation__link-title">Screenings</div>
			</router-link>
			<router-link
				class="navigation__link-item"
				:to="{ name: 'risk-assessments-list' }">
				<i class="navigation__link-icon far fa-light fa-shield-alt"></i>
				<div class="navigation__link-title">Risk Assessments</div>
			</router-link>
			<router-link
				class="navigation__link-item"
				:to="{ name: 'scores-list' }">
				<i class="navigation__link-icon far fa-light fa-chart-line"></i>
				<div class="navigation__link-title">Scores</div>
			</router-link>
			<router-link
				class="navigation__link-item"
				:to="{ name: 'geo-locations-list' }">
				<i class="navigation__link-icon far fa-light fa-map-marker"></i>
				<div class="navigation__link-title">Geo Locations</div>
			</router-link>
			<router-link
				class="navigation__link-item"
				:to="{ name: 'facilities-list' }">
				<i class="navigation__link-icon far fa-light fa-warehouse"></i>
				<div class="navigation__link-title">Facilities</div>
			</router-link>
			<router-link
				v-if="auth.user!.role === 'admin'"
				class="navigation__link-item"
				:to="{ name: 'users-list' }">
				<i class="navigation__link-icon far fa-light fa-user"></i>
				<div class="navigation__link-title">Users</div>
			</router-link>
		</div>
		<div class="navigation__links-container navigation__links-container--bottom">
			<router-link
				class="navigation__link-item"
				:to="{ name: 'clear-data' }">
				<i class="navigation__link-icon far fa-database"></i>
				<div class="navigation__link-title">Clear Data</div>
			</router-link>
		</div>
		<div
			class="navigation__footer"
			:class="{ 'navigation__footer--active': currentRouteName === 'account-details' }"
			@click="router.push({ name: 'account-details' })">
			<Avatar
				:label="initials"
				class="navigation__avatar" />
			<span class="navigation__email">{{ auth.user!.email }}</span>
			<Button
				class="navigation__logout-button"
				severity="secondary"
				icon="fat fa-arrow-right-from-bracket"
				text
				@click.stop="router.push({ name: 'logout' })" />
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useAuthStore } from '@/stores/Auth'
import Button from 'primevue/button'
import Avatar from 'primevue/avatar'
import { useRouter } from 'vue-router'

const router = useRouter()
const auth = useAuthStore()
const currentRouteName = computed(() => router.currentRoute.value.name)

const locked = ref(
	localStorage.getItem('sidebarLocked') ? localStorage.getItem('sidebarLocked') === 'true' : true,
)
const isSidebarOpen = ref(false)

const initials = computed(
	() => auth.user!.email[0]!.toUpperCase() + auth.user!.email[1]!.toUpperCase(),
)
const lockIcon = computed(() => {
	if (locked.value) {
		return 'fal fa-lock'
	} else {
		return 'fal fa-lock-open'
	}
})

function toggleLocked() {
	locked.value = !locked.value
	localStorage.setItem('sidebarLocked', locked.value.toString())
}
</script>

<style scoped lang="scss">
.navigation {
	border-right: 1px solid var(--p-surface-200);
	display: flex;
	flex-direction: column;
	overflow: hidden;
	width: 52px;
	transition: width 0.3s;
	background-color: var(--p-surface-0);

	@media (prefers-color-scheme: dark) {
		border-right-color: var(--p-surface-900);
		background-color: var(--p-surface-950);
	}

	&.navigation--expanded,
	&:hover {
		width: 255px;

		.navigation__header {
			.navigation__logo {
				max-width: 88.83px;
			}
		}
	}

	.navigation__header {
		display: flex;
		align-items: center;
		padding: 10px;
		gap: 10px;
		border-bottom: 1px solid var(--p-surface-200);
		width: 255px;
		height: 64px;
		text-overflow: ellipsis;
		justify-content: space-between;

		@media (prefers-color-scheme: dark) {
			border-bottom-color: var(--p-surface-950);
		}

		.navigation__logo {
			max-width: 32px;
			transition: max-width 0.3s;
			flex-basis: content;
			max-height: 100%;
		}
	}

	.navigation__footer {
		display: flex;
		align-items: center;
		padding: 10px;
		gap: 10px;
		border-top: 1px solid var(--p-surface-200);
		width: 255px;
		height: 64px;
		text-overflow: ellipsis;

		&:has(:not(.navigation__logout-button:hover)):hover,
		&--active {
			background-color: var(--p-surface-100);
			cursor: pointer;

			@media (prefers-color-scheme: dark) {
				background-color: var(--p-surface-900);
			}
		}

		@media (prefers-color-scheme: dark) {
			border-top-color: var(--p-surface-950);
		}

		.navigation__email {
			flex: 1;
			text-overflow: ellipsis;
			overflow: hidden;
		}

		.navigation__avatar {
			min-width: 30px;
		}
	}

	.navigation__links-container {
		width: 255px;
		flex: 1;
		overflow: auto;

		&--bottom {
			flex: unset;
		}

		.navigation__link-item {
			display: flex;
			align-items: center;
			padding: 10px;
			gap: 10px;
			color: var(--p-text-color);
			text-decoration: none;

			&:hover {
				background-color: var(--p-surface-100);

				@media (prefers-color-scheme: dark) {
					background-color: var(--p-surface-900);
				}
			}

			&.router-link-active {
				background-color: var(--p-surface-100);

				@media (prefers-color-scheme: dark) {
					background-color: var(--p-surface-900);
				}
			}

			.navigation__link-title {
				flex: 1;
			}

			.navigation__link-icon {
				font-size: 22px;
				color: var(--p-surface-500);
				width: 32px;
				display: flex;
				justify-content: center;

				@media (prefers-color-scheme: dark) {
					color: var(--p-surface-400);
				}
			}
		}
	}

	.navigation__logo-container {
		padding: 8px;
	}
}
</style>
