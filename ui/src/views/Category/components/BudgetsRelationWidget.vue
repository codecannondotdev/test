<template>
	<Card class="budgets-relation-widget">
		<template #title>
			<h4 class="budgets-relation-widget__title">Budgets</h4>
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
	<BudgetsRelationAddDialog
		v-model="isRelationAddDialogActive"
		:category-id="props.categoryId"
		@update="refresh()" />
	<BudgetForm
		:as-dialog="true"
		:visible="isFormActive"
		:should-redirect="false"
		:force-values="{ category_id: Number(props.categoryId) }"
		:hide-inputs="['category_id']"
		@close="isFormActive = false"
		@created="refresh()" />
</template>

<script setup lang="ts">
import { defineProps, onBeforeMount, ref } from 'vue'
import BudgetsRelationAddDialog from './BudgetsRelationAddDialog.vue'
import BudgetForm from '@/views/Budget/components/Form.vue'
import Card from 'primevue/card'
import ApiTable from '@/components/Table/ApiTable.vue'
import Column from 'primevue/column'
import Button from 'primevue/button'
import { useRouter } from 'vue-router'
import { useBudgetListState } from '@/models/Budget/States'
import type { Budget } from '@/models/Budget/Model'
import type { Category } from '@/models/Category/Model'
import CategorysApi from '@/models/Category/Api'

const emit = defineEmits(['start-loading', 'stop-loading'])

const props = defineProps<{
	categoryId: Category['id']
}>()

const router = useRouter()
const isRelationAddDialogActive = ref(false)
const isFormActive = ref(false)
const dissociateLoading = ref(null as null | number | string)
const listLoading = ref(false)
const listState = useBudgetListState()
listState.defaultParams = {
	per_page: 10,
	fromRelation: {
		model: 'App\\Models\\Category',
		id: props.categoryId,
		relation: 'budgets',
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

async function dissociate(item: Budget) {
	dissociateLoading.value = item.id
	emit('start-loading')
	try {
		await new CategorysApi().updateRelation(props.categoryId, 'budgets', {
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

function openDetails(item: { data: Budget }) {
	router.push({ name: 'budgets-edit', params: { id: item.data.id } })
}
</script>

<style lang="scss" scoped>
.budgets-relation-widget {
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

				.budgets-relation-widget__title {
					flex: 1;
					text-align: left;
				}
			}
		}
	}
}
</style>
