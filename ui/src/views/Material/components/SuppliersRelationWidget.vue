<template>
	<Card class="suppliers-relation-widget">
		<template #title>
			<h4 class="suppliers-relation-widget__title">Suppliers</h4>
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
					field="company_name"
					header="Company Name" />
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
	<SuppliersRelationAddDialog
		v-model="isRelationAddDialogActive"
		:material-id="props.materialId"
		@update="refresh()" />
	<SupplierForm
		:as-dialog="true"
		:visible="isFormActive"
		:should-redirect="false"
		:attach-to="{ materials: { method: 'syncWithoutDetaching', id: props.materialId } }"
		@close="isFormActive = false"
		@created="refresh()" />
</template>

<script setup lang="ts">
import { defineProps, onBeforeMount, ref } from 'vue'
import SuppliersRelationAddDialog from './SuppliersRelationAddDialog.vue'
import SupplierForm from '@/views/Supplier/components/Form.vue'
import Card from 'primevue/card'
import ApiTable from '@/components/Table/ApiTable.vue'
import Column from 'primevue/column'
import Button from 'primevue/button'
import { useRouter } from 'vue-router'
import { useSupplierListState } from '@/models/Supplier/States'
import type { Supplier } from '@/models/Supplier/Model'
import type { Material } from '@/models/Material/Model'
import MaterialsApi from '@/models/Material/Api'

const emit = defineEmits(['start-loading', 'stop-loading'])

const props = defineProps<{
	materialId: Material['id']
}>()

const router = useRouter()
const isRelationAddDialogActive = ref(false)
const isFormActive = ref(false)
const detachLoading = ref(null as null | number | string)
const listLoading = ref(false)
const listState = useSupplierListState()
listState.defaultParams = {
	per_page: 10,
	fromRelation: {
		model: 'App\\Models\\Material',
		id: props.materialId,
		relation: 'suppliers',
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

async function detach(item: Supplier) {
	detachLoading.value = item.id
	emit('start-loading')
	try {
		await new MaterialsApi().updateRelation(props.materialId, 'suppliers', {
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

function openDetails(item: { data: Supplier }) {
	router.push({ name: 'suppliers-edit', params: { id: item.data.id } })
}
</script>

<style lang="scss" scoped>
.suppliers-relation-widget {
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

				.suppliers-relation-widget__title {
					flex: 1;
					text-align: left;
				}
			}
		}
	}
}
</style>
