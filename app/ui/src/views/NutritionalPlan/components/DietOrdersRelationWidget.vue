<template>
	<Card class="diet-orders-relation-widget">
		<template #title>
			<h4 class="diet-orders-relation-widget__title">Diet Orders</h4>
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
				<Column header="Start Date">
					<template #body="slotProps">
						{{ format(new Date(slotProps.data.start_date), 'yyyy-MM-dd') }}
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
	<DietOrdersRelationAddDialog
		v-model="isRelationAddDialogActive"
		:nutritional-plan-id="props.nutritionalPlanId"
		@update="refresh()" />
	<DietOrderForm
		:as-dialog="true"
		:visible="isFormActive"
		:should-redirect="false"
		:force-values="{ nutritional_plan_id: Number(props.nutritionalPlanId) }"
		:hide-inputs="['nutritional_plan_id']"
		@close="isFormActive = false"
		@created="refresh()" />
</template>

<script setup lang="ts">
import { defineProps, onBeforeMount, ref } from 'vue'
import DietOrdersRelationAddDialog from './DietOrdersRelationAddDialog.vue'
import DietOrderForm from '@/views/DietOrder/components/Form.vue'
import Card from 'primevue/card'
import ApiTable from '@/components/Table/ApiTable.vue'
import Column from 'primevue/column'
import Button from 'primevue/button'
import { useRouter } from 'vue-router'
import { useDietOrderListState } from '@/models/DietOrder/States'
import type { DietOrder } from '@/models/DietOrder/Model'
import type { NutritionalPlan } from '@/models/NutritionalPlan/Model'
import NutritionalPlansApi from '@/models/NutritionalPlan/Api'
import { format } from 'date-fns'

const emit = defineEmits(['start-loading', 'stop-loading'])

const props = defineProps<{
	nutritionalPlanId: NutritionalPlan['id']
}>()

const router = useRouter()
const isRelationAddDialogActive = ref(false)
const isFormActive = ref(false)
const dissociateLoading = ref(null as null | number | string)
const listLoading = ref(false)
const listState = useDietOrderListState()
listState.defaultParams = {
	per_page: 10,
	fromRelation: {
		model: 'App\\Models\\NutritionalPlan',
		id: props.nutritionalPlanId,
		relation: 'dietOrders',
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

async function dissociate(item: DietOrder) {
	dissociateLoading.value = item.id
	emit('start-loading')
	try {
		await new NutritionalPlansApi().updateRelation(props.nutritionalPlanId, 'dietOrders', {
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

function openDetails(item: { data: DietOrder }) {
	router.push({ name: 'diet-orders-edit', params: { id: item.data.id } })
}
</script>

<style lang="scss" scoped>
.diet-orders-relation-widget {
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

				.diet-orders-relation-widget__title {
					flex: 1;
					text-align: left;
				}
			}
		}
	}
}
</style>
