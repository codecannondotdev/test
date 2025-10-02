<template>
	<Header :title="isEdit ? 'Edit PurchaseOrder' : 'Create PurchaseOrder'" />
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
			@deleted="router.push({ name: 'purchase-orders-list' })" />
		<PurchaseOrderItemsRelationWidget
			v-if="isEdit"
			:purchase-order-id="route.params.id as string"
			@start-loading="loaders.add('Purchase Order Items')"
			@stop-loading="loaders.delete('Purchase Order Items')" />
	</Container>
</template>

<script setup lang="ts">
import { reactive, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Header from './components/Header.vue'
import Form from './components/Form.vue'
import ProgressBar from 'primevue/progressbar'
import Container from '@/components/Container.vue'
import PurchaseOrderItemsRelationWidget from './components/PurchaseOrderItemsRelationWidget.vue'

const route = useRoute()
const router = useRouter()
const isEdit = computed(() => route.name === 'purchase-orders-edit')
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
