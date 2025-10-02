<template>
	<Card class="inventory-relation-widget">
		<template #title>
			<h4 class="inventory-relation-widget__title">Inventory</h4>
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
					field="item_name"
					header="Item Name" />
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
	<InventoryRelationAddDialog
		v-model="isRelationAddDialogActive"
		:product-id="props.productId"
		@update="refresh()" />
	<InventoryForm
		:as-dialog="true"
		:visible="isFormActive"
		:should-redirect="false"
		:force-values="{ product_id: Number(props.productId) }"
		:hide-inputs="['product_id']"
		@close="isFormActive = false"
		@created="refresh()" />
</template>

<script setup lang="ts">
import { defineProps, onBeforeMount, ref } from 'vue'
import InventoryRelationAddDialog from './InventoryRelationAddDialog.vue'
import InventoryForm from '@/views/Inventory/components/Form.vue'
import Card from 'primevue/card'
import ApiTable from '@/components/Table/ApiTable.vue'
import Column from 'primevue/column'
import Button from 'primevue/button'
import { useRouter } from 'vue-router'
import { useInventoryListState } from '@/models/Inventory/States'
import type { Inventory } from '@/models/Inventory/Model'
import type { Product } from '@/models/Product/Model'
import ProductsApi from '@/models/Product/Api'

const emit = defineEmits(['start-loading', 'stop-loading'])

const props = defineProps<{
	productId: Product['id']
}>()

const router = useRouter()
const isRelationAddDialogActive = ref(false)
const isFormActive = ref(false)
const dissociateLoading = ref(null as null | number | string)
const listLoading = ref(false)
const listState = useInventoryListState()
listState.defaultParams = {
	per_page: 10,
	fromRelation: {
		model: 'App\\Models\\Product',
		id: props.productId,
		relation: 'inventory',
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

async function dissociate(item: Inventory) {
	dissociateLoading.value = item.id
	emit('start-loading')
	try {
		await new ProductsApi().updateRelation(props.productId, 'inventory', {
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

function openDetails(item: { data: Inventory }) {
	router.push({ name: 'inventories-edit', params: { id: item.data.id } })
}
</script>

<style lang="scss" scoped>
.inventory-relation-widget {
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

				.inventory-relation-widget__title {
					flex: 1;
					text-align: left;
				}
			}
		}
	}
}
</style>
