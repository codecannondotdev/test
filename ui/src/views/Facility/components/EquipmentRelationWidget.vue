<template>
	<Card class="equipment-relation-widget">
		<template #title>
			<h4 class="equipment-relation-widget__title">Equipment</h4>
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
					field="name"
					header="Name" />
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
	<EquipmentRelationAddDialog
		v-model="isRelationAddDialogActive"
		:facility-id="props.facilityId"
		@update="refresh()" />
	<EquipmentForm
		:as-dialog="true"
		:visible="isFormActive"
		:should-redirect="false"
		:force-values="{ facility_id: Number(props.facilityId) }"
		:hide-inputs="['facility_id']"
		@close="isFormActive = false"
		@created="refresh()" />
</template>

<script setup lang="ts">
import { defineProps, onBeforeMount, ref } from 'vue'
import EquipmentRelationAddDialog from './EquipmentRelationAddDialog.vue'
import EquipmentForm from '@/views/Equipment/components/Form.vue'
import Card from 'primevue/card'
import ApiTable from '@/components/Table/ApiTable.vue'
import Column from 'primevue/column'
import Button from 'primevue/button'
import { useRouter } from 'vue-router'
import { useEquipmentListState } from '@/models/Equipment/States'
import type { Equipment } from '@/models/Equipment/Model'
import type { Facility } from '@/models/Facility/Model'
import FacilitysApi from '@/models/Facility/Api'

const emit = defineEmits(['start-loading', 'stop-loading'])

const props = defineProps<{
	facilityId: Facility['id']
}>()

const router = useRouter()
const isRelationAddDialogActive = ref(false)
const isFormActive = ref(false)
const dissociateLoading = ref(null as null | number | string)
const listLoading = ref(false)
const listState = useEquipmentListState()
listState.defaultParams = {
	per_page: 10,
	fromRelation: {
		model: 'App\\Models\\Facility',
		id: props.facilityId,
		relation: 'equipment',
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

async function dissociate(item: Equipment) {
	dissociateLoading.value = item.id
	emit('start-loading')
	try {
		await new FacilitysApi().updateRelation(props.facilityId, 'equipment', {
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

function openDetails(item: { data: Equipment }) {
	router.push({ name: 'equipment-edit', params: { id: item.data.id } })
}
</script>

<style lang="scss" scoped>
.equipment-relation-widget {
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

				.equipment-relation-widget__title {
					flex: 1;
					text-align: left;
				}
			}
		}
	}
}
</style>
