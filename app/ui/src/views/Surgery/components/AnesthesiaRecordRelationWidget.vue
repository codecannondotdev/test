<template>
	<Card class="anesthesia-record-relation-widget">
		<template #title>
			<h4 class="anesthesia-record-relation-widget__title">Anesthesia Record</h4>
			<Button
				v-if="detailsState.details.value?.anesthesia_record"
				icon="fal fa-link"
				label="Reconnect"
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
			<div class="anesthesia-record-relation-widget__content-container">
				<Button
					v-if="!detailsState.details.value?.anesthesia_record"
					icon="fal fa-link"
					severity="secondary"
					outlined
					class="anesthesia-record-relation-widget__add-button"
					label="Click to add Anesthesia"
					@click="isRelationAddDialogActive = true" />
				<Card
					v-else
					icon="fal fa-link"
					class="anesthesia-record-relation-widget__entity-card"
					@click="openDetails">
					<template #content>
						<p>{{ detailsState.details.value!.anesthesia_record!.start_time }}</p>
						<Button
							class="anesthesia-record-relation-widget__dissociate-button"
							severity="secondary"
							text
							rounded
							icon="fal fa-times"
							@click.stop="dissociate" />
					</template>
				</Card>
			</div>
		</template>
	</Card>
	<AnesthesiaRecordRelationAddDialog
		v-model="isRelationAddDialogActive"
		:surgery-id="props.surgeryId"
		@update="refresh()" />
	<AnesthesiaForm
		:as-dialog="true"
		:visible="isFormActive"
		:should-redirect="false"
		:force-values="{ surgery_id: Number(props.surgeryId) }"
		:hide-inputs="['surgery_id']"
		@close="isFormActive = false"
		@created="refresh()" />
</template>

<script setup lang="ts">
import { defineProps, onBeforeMount, ref } from 'vue'
import AnesthesiaRecordRelationAddDialog from './AnesthesiaRecordRelationAddDialog.vue'
import AnesthesiaForm from '@/views/Anesthesia/components/Form.vue'
import Card from 'primevue/card'
import Button from 'primevue/button'
import { useRouter } from 'vue-router'
import { useSurgeryDetailsState } from '@/models/Surgery/States'
import type { Surgery } from '@/models/Surgery/Model'
import SurgerysApi from '@/models/Surgery/Api'

const emit = defineEmits(['start-loading', 'stop-loading'])

const props = defineProps<{
	surgeryId: Surgery['id']
}>()

const router = useRouter()
const isRelationAddDialogActive = ref(false)
const isFormActive = ref(false)
const dissociateLoading = ref(false)
const listLoading = ref(false)
const detailsState = useSurgeryDetailsState()

onBeforeMount(() => {
	refresh()
})

async function refresh() {
	listLoading.value = true
	emit('start-loading')
	try {
		await detailsState.getDetails(props.surgeryId, { with: ['anesthesiaRecord'] })
	} finally {
		listLoading.value = false
		emit('stop-loading')
	}
}

async function dissociate() {
	if (!detailsState.details.value) return
	dissociateLoading.value = true
	emit('start-loading')
	try {
		await new SurgerysApi().updateRelation(props.surgeryId, 'anesthesiaRecord', {
			method: 'dissociate',
			params: [detailsState.details.value.id],
		})
		dissociateLoading.value = false
		await refresh()
	} finally {
		dissociateLoading.value = false
		emit('stop-loading')
	}
}

function openDetails() {
	if (!detailsState.details.value) return
	router.push({ name: 'anesthesias-edit', params: { id: detailsState.details.value.id } })
}
</script>

<style lang="scss" scoped>
.anesthesia-record-relation-widget {
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

				.anesthesia-record-relation-widget__title {
					flex: 1;
					text-align: left;
				}
			}
		}
	}

	.anesthesia-record-relation-widget__content-container {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		padding: 0 10px 10px;

		.anesthesia-record-relation-widget__add-button {
			width: 100%;
		}

		.anesthesia-record-relation-widget__entity-card {
			width: 100%;

			@media (prefers-color-scheme: dark) {
				background: var(--p-surface-800);
			}

			&:hover {
				cursor: pointer;
			}

			:deep(.p-card-body) {
				padding: 0;

				.p-card-content {
					display: flex;
					align-items: center;
					justify-content: space-between;
					width: 100%;
					padding: 10px 10px 10px 20px;

					.anesthesia-record-relation-widget__dissociate-button:hover {
						@media (prefers-color-scheme: dark) {
							background: var(--p-surface-700);
						}
					}
				}
			}
		}
	}
}
</style>
