<template>
	<Card class="lab-orders-relation-widget">
		<template #title>
			<h4 class="lab-orders-relation-widget__title">Lab Orders</h4>
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
				<Column header="Order Date">
					<template #body="slotProps">
						{{ format(new Date(slotProps.data.order_date), 'yyyy-MM-dd HH:mm') }}
					</template>
				</Column>
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
	<LabOrdersRelationAddDialog
		v-model="isRelationAddDialogActive"
		:doctor-id="props.doctorId"
		@update="refresh()" />
	<LabOrderForm
		:as-dialog="true"
		:visible="isFormActive"
		:should-redirect="false"
		:force-values="{ ordered_by_id: Number(props.doctorId) }"
		:hide-inputs="['ordered_by_id']"
		@close="isFormActive = false"
		@created="refresh()" />
</template>

<script setup lang="ts">
import { defineProps, onBeforeMount, ref } from 'vue'
import LabOrdersRelationAddDialog from './LabOrdersRelationAddDialog.vue'
import LabOrderForm from '@/views/LabOrder/components/Form.vue'
import Card from 'primevue/card'
import ApiTable from '@/components/Table/ApiTable.vue'
import Column from 'primevue/column'
import Button from 'primevue/button'
import { useRouter } from 'vue-router'
import { useLabOrderListState } from '@/models/LabOrder/States'
import type { LabOrder } from '@/models/LabOrder/Model'
import type { Doctor } from '@/models/Doctor/Model'
import DoctorsApi from '@/models/Doctor/Api'
import { format } from 'date-fns'

const emit = defineEmits(['start-loading', 'stop-loading'])

const props = defineProps<{
	doctorId: Doctor['id']
}>()

const router = useRouter()
const isRelationAddDialogActive = ref(false)
const isFormActive = ref(false)
const dissociateLoading = ref(null as null | number | string)
const listLoading = ref(false)
const listState = useLabOrderListState()
listState.defaultParams = {
	per_page: 10,
	fromRelation: {
		model: 'App\\Models\\Doctor',
		id: props.doctorId,
		relation: 'labOrders',
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

async function dissociate(item: LabOrder) {
	dissociateLoading.value = item.id
	emit('start-loading')
	try {
		await new DoctorsApi().updateRelation(props.doctorId, 'labOrders', {
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

function openDetails(item: { data: LabOrder }) {
	router.push({ name: 'lab-orders-edit', params: { id: item.data.id } })
}
</script>

<style lang="scss" scoped>
.lab-orders-relation-widget {
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

				.lab-orders-relation-widget__title {
					flex: 1;
					text-align: left;
				}
			}
		}
	}
}
</style>
