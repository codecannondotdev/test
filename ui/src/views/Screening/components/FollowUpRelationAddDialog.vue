<template>
	<Drawer
		v-model:visible="isActive"
		position="right"
		class="screening-follow-up-add-dialog"
		header="Add Follow Up">
		<div class="screening-follow-up-add-dialog__header">
			<div class="screening-follow-up-add-dialog__assigned-filter-container">
				<div class="screening-follow-up-add-dialog__assigned-filter-label-container">
					<label>Show all Follow Ups</label>
					<label
						><small
							>Assigning Follow Up to this Screening will change their current assignment</small
						></label
					>
				</div>
				<ToggleSwitch v-model="withAssigned" />
			</div>
			<div class="screening-follow-up-add-dialog__search-container">
				<IconField>
					<InputIcon class="fal fa-search" />
					<InputText
						v-model="searchString"
						class="screening-follow-up-add-dialog__search-input"
						placeholder="Search"
						@update:model-value="listState.getList({ search: searchString })"
						@keyup.enter="listState.getList({ search: searchString })"></InputText>
				</IconField>
			</div>
		</div>
		<div class="screening-follow-up-add-dialog__table-container">
			<ApiTable
				v-model:selection="selected"
				selection-mode="single"
				flat
				:list-state="listState">
				<Column
					selection-mode="single"
					header-style="width: 3rem"></Column>
				<Column
					field="follow_up_interval"
					header="Follow Up Interval" />
			</ApiTable>
		</div>
		<div class="screening-follow-up-add-dialog__add-buttton-container">
			<Button
				class="screening-follow-up-add-dialog__add-button"
				:disabled="!selected"
				:loading="isLoading"
				:label="`Change Follow Up`"
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
import type { Screening } from '@/models/Screening/Model'
import { defineModel, ref, watch } from 'vue'
import type { FollowUp } from '@/models/FollowUp/Model'
import { useFollowUpListState } from '@/models/FollowUp/States'
import ScreeningsApi from '@/models/Screening/Api'

const emit = defineEmits(['update'])

const isActive = defineModel<boolean>()

const props = defineProps<{
	screeningId: Screening['id']
}>()

const selected = ref<FollowUp | null>()
const isLoading = ref(false)
const searchString = ref('')
const withAssigned = ref(false)

const listState = useFollowUpListState()
listState.defaultParams = {
	notFromRelation: {
		model: 'App\\Models\\Screening',
		id: props.screeningId,
		relation: 'followUp',
	},
}

watch(
	withAssigned,
	() => {
		if (withAssigned.value) {
			listState.query().save()
		} else {
			listState.query().whereDoesntHave('screening').save()
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
		await new ScreeningsApi().updateRelation(props.screeningId, 'followUp', {
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
.screening-follow-up-add-dialog {
	width: 800px !important;

	.p-drawer-content {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		padding: 0;
	}

	.screening-follow-up-add-dialog__header {
		padding: 10px;
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		justify-content: space-between;
		gap: 20px;

		.screening-follow-up-add-dialog__search-container {
			flex: 1;
			width: 100%;

			.screening-follow-up-add-dialog__search-input {
				width: 100%;
			}
		}

		.screening-follow-up-add-dialog__assigned-filter-container {
			display: flex;
			align-items: center;
			justify-content: space-between;
			gap: 10px;

			.screening-follow-up-add-dialog__assigned-filter-label-container {
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

	.screening-follow-up-add-dialog__table-container {
		border-top: 1px solid var(--p-datatable-body-cell-border-color);
		flex: 1;
		overflow: auto;
		display: flex;

		.ui-api-table__table {
			flex: 1;
		}
	}

	.screening-follow-up-add-dialog__add-buttton-container {
		padding: 20px;
		display: flex;
		justify-content: flex-end;
		border-top: 1px solid var(--p-datatable-body-cell-border-color);

		.screening-follow-up-add-dialog__add-button {
			min-height: 39px;
		}
	}
}
</style>
