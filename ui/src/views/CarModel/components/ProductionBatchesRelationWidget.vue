<template>
	<Card class="production-batches-relation-widget">
		<template #title>
			<h4 class="production-batches-relation-widget__title">Production Batches</h4>
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
					field="batch_identifier"
					header="Batch Identifier" />
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
	<ProductionBatchesRelationAddDialog
		v-model="isRelationAddDialogActive"
		:car-model-id="props.carModelId"
		@update="refresh()" />
	<ProductionBatchForm
		:as-dialog="true"
		:visible="isFormActive"
		:should-redirect="false"
		:force-values="{ car_model_id: Number(props.carModelId) }"
		:hide-inputs="['car_model_id']"
		@close="isFormActive = false"
		@created="refresh()" />
</template>

<script setup lang="ts">
import { defineProps, onBeforeMount, ref } from 'vue'
import ProductionBatchesRelationAddDialog from './ProductionBatchesRelationAddDialog.vue'
import ProductionBatchForm from '@/views/ProductionBatch/components/Form.vue'
import Card from 'primevue/card'
import ApiTable from '@/components/Table/ApiTable.vue'
import Column from 'primevue/column'
import Button from 'primevue/button'
import { useRouter } from 'vue-router'
import { useProductionBatchListState } from '@/models/ProductionBatch/States'
import type { ProductionBatch } from '@/models/ProductionBatch/Model'
import type { CarModel } from '@/models/CarModel/Model'
import CarModelsApi from '@/models/CarModel/Api'

const emit = defineEmits(['start-loading', 'stop-loading'])

const props = defineProps<{
	carModelId: CarModel['id']
}>()

const router = useRouter()
const isRelationAddDialogActive = ref(false)
const isFormActive = ref(false)
const dissociateLoading = ref(null as null | number | string)
const listLoading = ref(false)
const listState = useProductionBatchListState()
listState.defaultParams = {
	per_page: 10,
	fromRelation: {
		model: 'App\\Models\\CarModel',
		id: props.carModelId,
		relation: 'productionBatches',
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

async function dissociate(item: ProductionBatch) {
	dissociateLoading.value = item.id
	emit('start-loading')
	try {
		await new CarModelsApi().updateRelation(props.carModelId, 'productionBatches', {
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

function openDetails(item: { data: ProductionBatch }) {
	router.push({ name: 'production-batches-edit', params: { id: item.data.id } })
}
</script>

<style lang="scss" scoped>
.production-batches-relation-widget {
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

				.production-batches-relation-widget__title {
					flex: 1;
					text-align: left;
				}
			}
		}
	}
}
</style>
