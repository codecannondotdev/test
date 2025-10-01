<template>
	<Card class="departments-relation-widget">
		<template #title>
			<h4 class="departments-relation-widget__title">Departments</h4>
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
	<DepartmentsRelationAddDialog
		v-model="isRelationAddDialogActive"
		:facility-id="props.facilityId"
		@update="refresh()" />
	<DepartmentForm
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
import DepartmentsRelationAddDialog from './DepartmentsRelationAddDialog.vue'
import DepartmentForm from '@/views/Department/components/Form.vue'
import Card from 'primevue/card'
import ApiTable from '@/components/Table/ApiTable.vue'
import Column from 'primevue/column'
import Button from 'primevue/button'
import { useRouter } from 'vue-router'
import { useDepartmentListState } from '@/models/Department/States'
import type { Department } from '@/models/Department/Model'
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
const listState = useDepartmentListState()
listState.defaultParams = {
	per_page: 10,
	fromRelation: {
		model: 'App\\Models\\Facility',
		id: props.facilityId,
		relation: 'departments',
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

async function dissociate(item: Department) {
	dissociateLoading.value = item.id
	emit('start-loading')
	try {
		await new FacilitysApi().updateRelation(props.facilityId, 'departments', {
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

function openDetails(item: { data: Department }) {
	router.push({ name: 'departments-edit', params: { id: item.data.id } })
}
</script>

<style lang="scss" scoped>
.departments-relation-widget {
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

				.departments-relation-widget__title {
					flex: 1;
					text-align: left;
				}
			}
		}
	}
}
</style>
