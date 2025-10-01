<template>
	<Drawer
		v-model:visible="isActive"
		position="right"
		class="device-barcode-labels-add-dialog"
		header="Add Barcode Label">
		<div class="device-barcode-labels-add-dialog__header">
			<div class="device-barcode-labels-add-dialog__assigned-filter-container">
				<div class="device-barcode-labels-add-dialog__assigned-filter-label-container">
					<label>Show all Barcode Labels</label>
					<label
						><small
							>Assigning Barcode Labels to this Device will change their current assignment</small
						></label
					>
				</div>
				<ToggleSwitch v-model="withAssigned" />
			</div>
			<div class="device-barcode-labels-add-dialog__search-container">
				<IconField>
					<InputIcon class="fal fa-search" />
					<InputText
						v-model="searchString"
						class="device-barcode-labels-add-dialog__search-input"
						placeholder="Search"
						@update:model-value="listState.getList({ search: searchString })"
						@keyup.enter="listState.getList({ search: searchString })"></InputText>
				</IconField>
			</div>
		</div>
		<div class="device-barcode-labels-add-dialog__table-container">
			<ApiTable
				v-model:selection="selected"
				selection-mode="multiple"
				flat
				:list-state="listState">
				<Column
					selection-mode="multiple"
					header-style="width: 3rem"></Column>
				<Column
					field="code"
					header="Code" />
			</ApiTable>
		</div>
		<div class="device-barcode-labels-add-dialog__add-buttton-container">
			<Button
				class="device-barcode-labels-add-dialog__add-button"
				:disabled="selected.length === 0"
				:loading="isLoading"
				:label="`Add ${selected.length} Barcode Labels`"
				icon="fal fa-plus"
				@click="submit" />
		</div>
	</Drawer>
</template>

<script setup lang="ts">
import Drawer from 'primevue/drawer'
import Button from 'primevue/button'
import ApiTable from '@/components/Table/ApiTable.vue'
import Column from 'primevue/column'
import InputText from 'primevue/inputtext'
import InputIcon from 'primevue/inputicon'
import IconField from 'primevue/iconfield'
import ToggleSwitch from 'primevue/toggleswitch'
import type { Device } from '@/models/Device/Model'
import { defineModel, ref, watch } from 'vue'
import type { BarcodeLabel } from '@/models/BarcodeLabel/Model'
import { useBarcodeLabelListState } from '@/models/BarcodeLabel/States'
import DevicesApi from '@/models/Device/Api'

const emit = defineEmits(['update'])

const isActive = defineModel<boolean>()

const props = defineProps<{
	deviceId: Device['id']
}>()

const selected = ref<BarcodeLabel[]>([])
const isLoading = ref(false)
const searchString = ref('')
const withAssigned = ref(false)

const listState = useBarcodeLabelListState()
listState.defaultParams = {
	notFromRelation: {
		model: 'App\\Models\\Device',
		id: props.deviceId,
		relation: 'barcodeLabels',
	},
}

watch(
	withAssigned,
	() => {
		if (withAssigned.value) {
			listState.query().save()
		} else {
			listState.query().whereDoesntHave('device').save()
		}
		if (isActive.value) {
			listState.getList()
		}
	},
	{ immediate: true },
)

watch(
	isActive,
	() => {
		if (!isActive.value) {
			withAssigned.value = false
			searchString.value = ''
			selected.value = []
			listState.clearList()
		} else {
			listState.getList()
		}
	},
	{ immediate: true },
)

async function submit() {
	isLoading.value = true
	try {
		await new DevicesApi().updateRelation(props.deviceId, 'barcodeLabels', {
			method: 'associate',
			params: selected.value.map((item) => item.id),
		})
		isActive.value = false
		emit('update')
		selected.value = []
	} finally {
		isLoading.value = false
	}
}
</script>

<style lang="scss">
.device-barcode-labels-add-dialog {
	width: 800px !important;

	.p-drawer-content {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		padding: 0;
	}

	.device-barcode-labels-add-dialog__header {
		padding: 10px;
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		justify-content: space-between;
		gap: 20px;

		.device-barcode-labels-add-dialog__search-container {
			flex: 1;
			width: 100%;

			.device-barcode-labels-add-dialog__search-input {
				width: 100%;
			}
		}

		.device-barcode-labels-add-dialog__assigned-filter-container {
			display: flex;
			align-items: center;
			justify-content: space-between;
			gap: 10px;

			.device-barcode-labels-add-dialog__assigned-filter-label-container {
				display: flex;
				flex-direction: column;

				& > label {
					line-height: 1.2;
					text-align: right;

					small {
						opacity: 0.5;
					}
				}
			}
		}
	}

	.device-barcode-labels-add-dialog__table-container {
		border-top: 1px solid var(--p-datatable-body-cell-border-color);
		flex: 1;
		overflow: auto;
		display: flex;

		.ui-api-table__table {
			flex: 1;
		}
	}

	.device-barcode-labels-add-dialog__add-buttton-container {
		padding: 20px;
		display: flex;
		justify-content: flex-end;
		border-top: 1px solid var(--p-datatable-body-cell-border-color);

		.device-barcode-labels-add-dialog__add-button {
			min-height: 39px;
		}
	}
}
</style>
