<template>
	<Card class="follow-up-relation-widget">
		<template #title>
			<h4 class="follow-up-relation-widget__title">Follow Up</h4>
			<Button
				v-if="detailsState.details.value?.follow_up"
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
			<div class="follow-up-relation-widget__content-container">
				<Button
					v-if="!detailsState.details.value?.follow_up"
					icon="fal fa-link"
					severity="secondary"
					outlined
					class="follow-up-relation-widget__add-button"
					label="Click to add Follow Up"
					@click="isRelationAddDialogActive = true" />
				<Card
					v-else
					icon="fal fa-link"
					class="follow-up-relation-widget__entity-card"
					@click="openDetails">
					<template #content>
						<p>{{ detailsState.details.value!.follow_up!.follow_up_interval }}</p>
						<Button
							class="follow-up-relation-widget__dissociate-button"
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
	<FollowUpRelationAddDialog
		v-model="isRelationAddDialogActive"
		:screening-id="props.screeningId"
		@update="refresh()" />
	<FollowUpForm
		:as-dialog="true"
		:visible="isFormActive"
		:should-redirect="false"
		:force-values="{ screening_id: Number(props.screeningId) }"
		:hide-inputs="['screening_id']"
		@close="isFormActive = false"
		@created="refresh()" />
</template>

<script setup lang="ts">
import { defineProps, onBeforeMount, ref } from 'vue'
import FollowUpRelationAddDialog from './FollowUpRelationAddDialog.vue'
import FollowUpForm from '@/views/FollowUp/components/Form.vue'
import Card from 'primevue/card'
import Button from 'primevue/button'
import { useRouter } from 'vue-router'
import { useScreeningDetailsState } from '@/models/Screening/States'
import type { Screening } from '@/models/Screening/Model'
import ScreeningsApi from '@/models/Screening/Api'

const emit = defineEmits(['start-loading', 'stop-loading'])

const props = defineProps<{
	screeningId: Screening['id']
}>()

const router = useRouter()
const isRelationAddDialogActive = ref(false)
const isFormActive = ref(false)
const dissociateLoading = ref(false)
const listLoading = ref(false)
const detailsState = useScreeningDetailsState()

onBeforeMount(() => {
	refresh()
})

async function refresh() {
	listLoading.value = true
	emit('start-loading')
	try {
		await detailsState.getDetails(props.screeningId, { with: ['followUp'] })
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
		await new ScreeningsApi().updateRelation(props.screeningId, 'followUp', {
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
	router.push({ name: 'follow-ups-edit', params: { id: detailsState.details.value.id } })
}
</script>

<style lang="scss" scoped>
.follow-up-relation-widget {
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

				.follow-up-relation-widget__title {
					flex: 1;
					text-align: left;
				}
			}
		}
	}

	.follow-up-relation-widget__content-container {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		padding: 0 10px 10px;

		.follow-up-relation-widget__add-button {
			width: 100%;
		}

		.follow-up-relation-widget__entity-card {
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

					.follow-up-relation-widget__dissociate-button:hover {
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
