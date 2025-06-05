<template>
	<Card class="mining-operations-relation-widget">
		<template #title>
			<h4 class="mining-operations-relation-widget__title">Mining Operations</h4>
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
				<Column header="Extraction Date">
					<template #body="slotProps">
						{{ format(new Date(slotProps.data.extraction_date), 'yyyy-MM-dd') }}
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
	<MiningOperationsRelationAddDialog
		v-model="isRelationAddDialogActive"
		:material-id="props.materialId"
		@update="refresh()" />
	<MiningOperationForm
		:as-dialog="true"
		:visible="isFormActive"
		:should-redirect="false"
		:force-values="{ material_id: Number(props.materialId) }"
		:hide-inputs="['material_id']"
		@close="isFormActive = false"
		@created="refresh()" />
</template>

<script setup lang="ts">
import { defineProps, onBeforeMount, ref } from 'vue'
import MiningOperationsRelationAddDialog from './MiningOperationsRelationAddDialog.vue'
import MiningOperationForm from '@/views/MiningOperation/components/Form.vue'
import Card from 'primevue/card'
import ApiTable from '@/components/Table/ApiTable.vue'
import Column from 'primevue/column'
import Button from 'primevue/button'
import { useRouter } from 'vue-router'
import { useMiningOperationListState } from '@/models/MiningOperation/States'
import type { MiningOperation } from '@/models/MiningOperation/Model'
import type { Material } from '@/models/Material/Model'
import MaterialsApi from '@/models/Material/Api'
import { format } from 'date-fns'

const emit = defineEmits(['start-loading', 'stop-loading'])

const props = defineProps<{
	materialId: Material['id']
}>()

const router = useRouter()
const isRelationAddDialogActive = ref(false)
const isFormActive = ref(false)
const dissociateLoading = ref(null as null | number | string)
const listLoading = ref(false)
const listState = useMiningOperationListState()
listState.defaultParams = {
	per_page: 10,
	fromRelation: {
		model: 'App\\Models\\Material',
		id: props.materialId,
		relation: 'miningOperations',
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

async function dissociate(item: MiningOperation) {
	dissociateLoading.value = item.id
	emit('start-loading')
	try {
		await new MaterialsApi().updateRelation(props.materialId, 'miningOperations', {
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

function openDetails(item: { data: MiningOperation }) {
	router.push({ name: 'mining-operations-edit', params: { id: item.data.id } })
}
</script>

<style lang="scss" scoped>
.mining-operations-relation-widget {
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

				.mining-operations-relation-widget__title {
					flex: 1;
					text-align: left;
				}
			}
		}
	}
}
</style>
