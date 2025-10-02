<template>
	<Card class="product-relation-widget">
		<template #title>
			<h4 class="product-relation-widget__title">Product</h4>
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
							:loading="detachLoading === slotProps.data.id"
							@click.stop.prevent="detach(slotProps.data)" />
					</template>
				</Column>
			</ApiTable>
		</template>
	</Card>
	<ProductRelationAddDialog
		v-model="isRelationAddDialogActive"
		:return-model-id="props.returnModelId"
		@update="refresh()" />
	<ProductForm
		:as-dialog="true"
		:visible="isFormActive"
		:should-redirect="false"
		:attach-to="{ returns: { method: 'syncWithoutDetaching', id: props.returnModelId } }"
		@close="isFormActive = false"
		@created="refresh()" />
</template>

<script setup lang="ts">
import { defineProps, onBeforeMount, ref } from 'vue'
import ProductRelationAddDialog from './ProductRelationAddDialog.vue'
import ProductForm from '@/views/Product/components/Form.vue'
import Card from 'primevue/card'
import ApiTable from '@/components/Table/ApiTable.vue'
import Column from 'primevue/column'
import Button from 'primevue/button'
import { useRouter } from 'vue-router'
import { useProductListState } from '@/models/Product/States'
import type { Product } from '@/models/Product/Model'
import type { ReturnModel } from '@/models/ReturnModel/Model'
import ReturnModelsApi from '@/models/ReturnModel/Api'

const emit = defineEmits(['start-loading', 'stop-loading'])

const props = defineProps<{
	returnModelId: ReturnModel['id']
}>()

const router = useRouter()
const isRelationAddDialogActive = ref(false)
const isFormActive = ref(false)
const detachLoading = ref(null as null | number | string)
const listLoading = ref(false)
const listState = useProductListState()
listState.defaultParams = {
	per_page: 10,
	fromRelation: {
		model: 'App\\Models\\ReturnModel',
		id: props.returnModelId,
		relation: 'product',
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

async function detach(item: Product) {
	detachLoading.value = item.id
	emit('start-loading')
	try {
		await new ReturnModelsApi().updateRelation(props.returnModelId, 'product', {
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

function openDetails(item: { data: Product }) {
	router.push({ name: 'products-edit', params: { id: item.data.id } })
}
</script>

<style lang="scss" scoped>
.product-relation-widget {
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

				.product-relation-widget__title {
					flex: 1;
					text-align: left;
				}
			}
		}
	}
}
</style>
