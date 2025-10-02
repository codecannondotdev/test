<template>
	<Card class="billings-relation-widget">
		<template #title>
			<h4 class="billings-relation-widget__title">Billings</h4>
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
					field="invoice_number"
					header="Invoice Number" />
				<Column
					header=""
					:style="{ maxWidth: '72px', width: '72px' }">
					<template #body="slotProps">
						<Button
							severity="secondary"
							outlined
							rounded
							icon="fal fa-times"
							:loading="detachLoading === slotProps.data.id"
							@click.stop.prevent="detach(slotProps.data)" />
					</template>
				</Column>
			</ApiTable>
		</template>
	</Card>
	<BillingsRelationAddDialog
		v-model="isRelationAddDialogActive"
		:treatment-id="props.treatmentId"
		@update="refresh()" />
	<BillingForm
		:as-dialog="true"
		:visible="isFormActive"
		:should-redirect="false"
		:attach-to="{ treatments: { method: 'syncWithoutDetaching', id: props.treatmentId } }"
		@close="isFormActive = false"
		@created="refresh()" />
</template>

<script setup lang="ts">
import { defineProps, onBeforeMount, ref } from 'vue'
import BillingsRelationAddDialog from './BillingsRelationAddDialog.vue'
import BillingForm from '@/views/Billing/components/Form.vue'
import Card from 'primevue/card'
import ApiTable from '@/components/Table/ApiTable.vue'
import Column from 'primevue/column'
import Button from 'primevue/button'
import { useRouter } from 'vue-router'
import { useBillingListState } from '@/models/Billing/States'
import type { Billing } from '@/models/Billing/Model'
import type { Treatment } from '@/models/Treatment/Model'
import TreatmentsApi from '@/models/Treatment/Api'

const emit = defineEmits(['start-loading', 'stop-loading'])

const props = defineProps<{
	treatmentId: Treatment['id']
}>()

const router = useRouter()
const isRelationAddDialogActive = ref(false)
const isFormActive = ref(false)
const detachLoading = ref(null as null | number | string)
const listLoading = ref(false)
const listState = useBillingListState()
listState.defaultParams = {
	per_page: 10,
	fromRelation: {
		model: 'App\\Models\\Treatment',
		id: props.treatmentId,
		relation: 'billings',
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

async function detach(item: Billing) {
	detachLoading.value = item.id
	emit('start-loading')
	try {
		await new TreatmentsApi().updateRelation(props.treatmentId, 'billings', {
			method: 'detach',
			params: [item.id],
		})
		detachLoading.value = null
		await refresh()
	} finally {
		detachLoading.value = null
		emit('stop-loading')
	}
}

function openDetails(item: { data: Billing }) {
	router.push({ name: 'billings-edit', params: { id: item.data.id } })
}
</script>

<style lang="scss" scoped>
.billings-relation-widget {
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

				.billings-relation-widget__title {
					flex: 1;
					text-align: left;
				}
			}
		}
	}
}
</style>
