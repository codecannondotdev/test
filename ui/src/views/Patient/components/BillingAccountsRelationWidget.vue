<template>
	<Card class="billing-accounts-relation-widget">
		<template #title>
			<h4 class="billing-accounts-relation-widget__title">Billing Accounts</h4>
			<Button
				icon="fal fa-link"
				label="Connect"
				outlined
				severity="secondary"
				@click="isRelationAddDialogActive = true" />
			<Button
				icon="fal fa-plus"
				label="Create"
				outlined
				severity="secondary"
				@click="isFormActive = true" />
		</template>
		<template #content>
			<ApiTable
				flat
				:list-state="listState"
				@row-click="openDetails">
				<Column
					field="account_number"
					header="Account Number" />
				<Column
					header=""
					:style="{ maxWidth: '72px', width: '72px' }">
					<template #body="slotProps">
						<Button
							severity="secondary"
							outlined
							rounded
							icon="fal fa-times"
							:loading="dissociateLoading === slotProps.data.id"
							@click.stop.prevent="dissociate(slotProps.data)" />
					</template>
				</Column>
			</ApiTable>
		</template>
	</Card>
	<BillingAccountsRelationAddDialog
		v-model="isRelationAddDialogActive"
		:patient-id="props.patientId"
		@update="refresh()" />
	<BillingAccountForm
		:as-dialog="true"
		:visible="isFormActive"
		:should-redirect="false"
		:force-values="{ patient_id: Number(props.patientId) }"
		:hide-inputs="['patient_id']"
		@close="isFormActive = false"
		@created="refresh()" />
</template>

<script setup lang="ts">
import { defineProps, onBeforeMount, ref } from 'vue'
import BillingAccountsRelationAddDialog from './BillingAccountsRelationAddDialog.vue'
import BillingAccountForm from '@/views/BillingAccount/components/Form.vue'
import Card from 'primevue/card'
import ApiTable from '@/components/Table/ApiTable.vue'
import Column from 'primevue/column'
import Button from 'primevue/button'
import { useRouter } from 'vue-router'
import { useBillingAccountListState } from '@/models/BillingAccount/States'
import type { BillingAccount } from '@/models/BillingAccount/Model'
import type { Patient } from '@/models/Patient/Model'
import PatientsApi from '@/models/Patient/Api'

const emit = defineEmits(['start-loading', 'stop-loading'])

const props = defineProps<{
	patientId: Patient['id']
}>()

const router = useRouter()
const isRelationAddDialogActive = ref(false)
const isFormActive = ref(false)
const dissociateLoading = ref(null as null | number | string)
const listLoading = ref(false)
const listState = useBillingAccountListState()
listState.defaultParams = {
	per_page: 10,
	fromRelation: {
		model: 'App\\Models\\Patient',
		id: props.patientId,
		relation: 'billingAccounts',
	},
}

onBeforeMount(() => {
	refresh()
})

async function refresh() {
	listLoading.value = true
	emit('start-loading')
	try {
		await listState.getList()
	} finally {
		listLoading.value = false
		emit('stop-loading')
	}
}

async function dissociate(item: BillingAccount) {
	dissociateLoading.value = item.id
	emit('start-loading')
	try {
		await new PatientsApi().updateRelation(props.patientId, 'billingAccounts', {
			method: 'dissociate',
			params: [item.id],
		})
		dissociateLoading.value = null
		await refresh()
	} finally {
		dissociateLoading.value = null
		emit('stop-loading')
	}
}

function openDetails(item: { data: BillingAccount }) {
	router.push({ name: 'billing-accounts-edit', params: { id: item.data.id } })
}
</script>

<style lang="scss" scoped>
.billing-accounts-relation-widget {
	width: 100%;
	max-width: 600px;
	overflow: hidden;

	:deep(.p-card-body) {
		padding: 20px 0 0;

		.p-card-caption {
			padding: 0px 20px 12px;

			.p-card-title {
				display: flex;
				align-items: center;
				gap: 10px;

				.billing-accounts-relation-widget__title {
					flex: 1;
					text-align: left;
				}
			}
		}
	}
}
</style>
