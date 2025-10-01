<template>
	<Card class="barcode-labels-relation-widget">
		<template #title>
			<h4 class="barcode-labels-relation-widget__title">Barcode Labels</h4>
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
					field="code"
					header="Code" />
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
	<BarcodeLabelsRelationAddDialog
		v-model="isRelationAddDialogActive"
		:medication-id="props.medicationId"
		@update="refresh()" />
	<BarcodeLabelForm
		:as-dialog="true"
		:visible="isFormActive"
		:should-redirect="false"
		:force-values="{ medication_id: Number(props.medicationId) }"
		:hide-inputs="['medication_id']"
		@close="isFormActive = false"
		@created="refresh()" />
</template>

<script setup lang="ts">
import { defineProps, onBeforeMount, ref } from 'vue'
import BarcodeLabelsRelationAddDialog from './BarcodeLabelsRelationAddDialog.vue'
import BarcodeLabelForm from '@/views/BarcodeLabel/components/Form.vue'
import Card from 'primevue/card'
import ApiTable from '@/components/Table/ApiTable.vue'
import Column from 'primevue/column'
import Button from 'primevue/button'
import { useRouter } from 'vue-router'
import { useBarcodeLabelListState } from '@/models/BarcodeLabel/States'
import type { BarcodeLabel } from '@/models/BarcodeLabel/Model'
import type { Medication } from '@/models/Medication/Model'
import MedicationsApi from '@/models/Medication/Api'

const emit = defineEmits(['start-loading', 'stop-loading'])

const props = defineProps<{
	medicationId: Medication['id']
}>()

const router = useRouter()
const isRelationAddDialogActive = ref(false)
const isFormActive = ref(false)
const dissociateLoading = ref(null as null | number | string)
const listLoading = ref(false)
const listState = useBarcodeLabelListState()
listState.defaultParams = {
	per_page: 10,
	fromRelation: {
		model: 'App\\Models\\Medication',
		id: props.medicationId,
		relation: 'barcodeLabels',
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

async function dissociate(item: BarcodeLabel) {
	dissociateLoading.value = item.id
	emit('start-loading')
	try {
		await new MedicationsApi().updateRelation(props.medicationId, 'barcodeLabels', {
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

function openDetails(item: { data: BarcodeLabel }) {
	router.push({ name: 'barcode-labels-edit', params: { id: item.data.id } })
}
</script>

<style lang="scss" scoped>
.barcode-labels-relation-widget {
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

				.barcode-labels-relation-widget__title {
					flex: 1;
					text-align: left;
				}
			}
		}
	}
}
</style>
