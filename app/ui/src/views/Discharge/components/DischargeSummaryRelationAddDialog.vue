<template>
	<Drawer
		v-model:visible="isActive"
		position="right"
		class="discharge-discharge-summary-add-dialog"
		header="Add Discharge Summary">
		<div class="discharge-discharge-summary-add-dialog__header">
			<div class="discharge-discharge-summary-add-dialog__assigned-filter-container">
				<div class="discharge-discharge-summary-add-dialog__assigned-filter-label-container">
					<label>Show all Discharge Summaries</label>
					<label
						><small
							>Assigning Discharge Summary to this Discharge will change their current
							assignment</small
						></label
					>
				</div>
				<ToggleSwitch v-model="withAssigned" />
			</div>
			<div class="discharge-discharge-summary-add-dialog__search-container">
				<IconField>
					<InputIcon class="fal fa-search" />
					<InputText
						v-model="searchString"
						class="discharge-discharge-summary-add-dialog__search-input"
						placeholder="Search"
						@update:model-value="listState.getList({ search: searchString })"
						@keyup.enter="listState.getList({ search: searchString })"></InputText>
				</IconField>
			</div>
		</div>
		<div class="discharge-discharge-summary-add-dialog__table-container">
			<ApiTable
				v-model:selection="selected"
				selection-mode="single"
				flat
				:list-state="listState">
				<Column
					selection-mode="single"
					header-style="width: 3rem"></Column>
				<Column
					field="summary_text"
					header="Summary Text" />
			</ApiTable>
		</div>
		<div class="discharge-discharge-summary-add-dialog__add-buttton-container">
			<Button
				class="discharge-discharge-summary-add-dialog__add-button"
				:disabled="!selected"
				:loading="isLoading"
				:label="`Change Discharge Summary`"
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
import type { Discharge } from '@/models/Discharge/Model'
import { defineModel, ref, watch } from 'vue'
import type { DischargeSummary } from '@/models/DischargeSummary/Model'
import { useDischargeSummaryListState } from '@/models/DischargeSummary/States'
import DischargesApi from '@/models/Discharge/Api'

const emit = defineEmits(['update'])

const isActive = defineModel<boolean>()

const props = defineProps<{
	dischargeId: Discharge['id']
}>()

const selected = ref<DischargeSummary | null>()
const isLoading = ref(false)
const searchString = ref('')
const withAssigned = ref(false)

const listState = useDischargeSummaryListState()
listState.defaultParams = {
	notFromRelation: {
		model: 'App\\Models\\Discharge',
		id: props.dischargeId,
		relation: 'dischargeSummary',
	},
}

watch(
	withAssigned,
	() => {
		if (withAssigned.value) {
			listState.query().save()
		} else {
			listState.query().whereDoesntHave('discharge').save()
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
			selected.value = null
			listState.clearList()
		} else {
			listState.getList()
		}
	},
	{ immediate: true },
)

async function submit() {
	if (!selected.value) {
		return
	}
	isLoading.value = true
	try {
		await new DischargesApi().updateRelation(props.dischargeId, 'dischargeSummary', {
			method: 'associate',
			params: [selected.value.id],
		})
		isActive.value = false
		emit('update')
		selected.value = null
	} finally {
		isLoading.value = false
	}
}
</script>

<style lang="scss">
.discharge-discharge-summary-add-dialog {
	width: 800px !important;

	.p-drawer-content {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		padding: 0;
	}

	.discharge-discharge-summary-add-dialog__header {
		padding: 10px;
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		justify-content: space-between;
		gap: 20px;

		.discharge-discharge-summary-add-dialog__search-container {
			flex: 1;
			width: 100%;

			.discharge-discharge-summary-add-dialog__search-input {
				width: 100%;
			}
		}

		.discharge-discharge-summary-add-dialog__assigned-filter-container {
			display: flex;
			align-items: center;
			justify-content: space-between;
			gap: 10px;

			.discharge-discharge-summary-add-dialog__assigned-filter-label-container {
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

	.discharge-discharge-summary-add-dialog__table-container {
		border-top: 1px solid var(--p-datatable-body-cell-border-color);
		flex: 1;
		overflow: auto;
		display: flex;

		.ui-api-table__table {
			flex: 1;
		}
	}

	.discharge-discharge-summary-add-dialog__add-buttton-container {
		padding: 20px;
		display: flex;
		justify-content: flex-end;
		border-top: 1px solid var(--p-datatable-body-cell-border-color);

		.discharge-discharge-summary-add-dialog__add-button {
			min-height: 39px;
		}
	}
}
</style>
