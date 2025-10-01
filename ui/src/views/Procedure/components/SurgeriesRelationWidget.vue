<template>
	<Card class="surgeries-relation-widget">
		<template #title>
			<h4 class="surgeries-relation-widget__title">Surgeries</h4>
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
					field="procedure_name"
					header="Procedure Name" />
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
	<SurgeriesRelationAddDialog
		v-model="isRelationAddDialogActive"
		:procedure-id="props.procedureId"
		@update="refresh()" />
	<SurgeryForm
		:as-dialog="true"
		:visible="isFormActive"
		:should-redirect="false"
		:attach-to="{ procedures: { method: 'syncWithoutDetaching', id: props.procedureId } }"
		@close="isFormActive = false"
		@created="refresh()" />
</template>

<script setup lang="ts">
import { defineProps, onBeforeMount, ref } from 'vue'
import SurgeriesRelationAddDialog from './SurgeriesRelationAddDialog.vue'
import SurgeryForm from '@/views/Surgery/components/Form.vue'
import Card from 'primevue/card'
import ApiTable from '@/components/Table/ApiTable.vue'
import Column from 'primevue/column'
import Button from 'primevue/button'
import { useRouter } from 'vue-router'
import { useSurgeryListState } from '@/models/Surgery/States'
import type { Surgery } from '@/models/Surgery/Model'
import type { Procedure } from '@/models/Procedure/Model'
import ProceduresApi from '@/models/Procedure/Api'

const emit = defineEmits(['start-loading', 'stop-loading'])

const props = defineProps<{
	procedureId: Procedure['id']
}>()

const router = useRouter()
const isRelationAddDialogActive = ref(false)
const isFormActive = ref(false)
const detachLoading = ref(null as null | number | string)
const listLoading = ref(false)
const listState = useSurgeryListState()
listState.defaultParams = {
	per_page: 10,
	fromRelation: {
		model: 'App\\Models\\Procedure',
		id: props.procedureId,
		relation: 'surgeries',
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

async function detach(item: Surgery) {
	detachLoading.value = item.id
	emit('start-loading')
	try {
		await new ProceduresApi().updateRelation(props.procedureId, 'surgeries', {
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

function openDetails(item: { data: Surgery }) {
	router.push({ name: 'surgeries-edit', params: { id: item.data.id } })
}
</script>

<style lang="scss" scoped>
.surgeries-relation-widget {
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

				.surgeries-relation-widget__title {
					flex: 1;
					text-align: left;
				}
			}
		}
	}
}
</style>
