<template>
	<Header :title="isEdit ? 'Edit Product' : 'Create Product'" />
	<ProgressBar
		v-if="loaders.size > 0"
		mode="indeterminate"
		class="edit__progress-bar" />
	<Container class="edit">
		<Form
			:id="route.params.id as string"
			:is-edit="isEdit"
			@start-loading="loaders.add('form')"
			@stop-loading="loaders.delete('form')"
			@deleted="router.push({ name: 'products-list' })" />
		<InventoryRelationWidget
			v-if="isEdit"
			:product-id="route.params.id as string"
			@start-loading="loaders.add('Inventory')"
			@stop-loading="loaders.delete('Inventory')" />
		<DamageReportsRelationWidget
			v-if="isEdit"
			:product-id="route.params.id as string"
			@start-loading="loaders.add('Damage Reports')"
			@stop-loading="loaders.delete('Damage Reports')" />
		<OrderItemsRelationWidget
			v-if="isEdit"
			:product-id="route.params.id as string"
			@start-loading="loaders.add('Order Items')"
			@stop-loading="loaders.delete('Order Items')" />
		<ShipmentItemsRelationWidget
			v-if="isEdit"
			:product-id="route.params.id as string"
			@start-loading="loaders.add('Shipment Items')"
			@stop-loading="loaders.delete('Shipment Items')" />
		<PurchaseOrderItemsRelationWidget
			v-if="isEdit"
			:product-id="route.params.id as string"
			@start-loading="loaders.add('Purchase Order Items')"
			@stop-loading="loaders.delete('Purchase Order Items')" />
		<ReturnsRelationWidget
			v-if="isEdit"
			:product-id="route.params.id as string"
			@start-loading="loaders.add('Returns')"
			@stop-loading="loaders.delete('Returns')" />
	</Container>
</template>

<script setup lang="ts">
import { reactive, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Header from './components/Header.vue'
import Form from './components/Form.vue'
import ProgressBar from 'primevue/progressbar'
import Container from '@/components/Container.vue'
import InventoryRelationWidget from './components/InventoryRelationWidget.vue'
import DamageReportsRelationWidget from './components/DamageReportsRelationWidget.vue'
import OrderItemsRelationWidget from './components/OrderItemsRelationWidget.vue'
import ShipmentItemsRelationWidget from './components/ShipmentItemsRelationWidget.vue'
import PurchaseOrderItemsRelationWidget from './components/PurchaseOrderItemsRelationWidget.vue'
import ReturnsRelationWidget from './components/ReturnsRelationWidget.vue'

const route = useRoute()
const router = useRouter()
const isEdit = computed(() => route.name === 'products-edit')
const loaders = reactive(new Set<string>())
</script>

<style lang="scss" scoped>
.edit__progress-bar {
	height: 4px;
	margin-bottom: -4px;
	width: 100%;
	border-radius: 0;
}

.edit {
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
	gap: 20px;
	justify-items: center;
	align-items: start;
}
</style>
