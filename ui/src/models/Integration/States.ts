import type { IntegrationModel } from '@/models/Integration/Model'
import IntegrationsApi from '@/models/Integration/Api'
import DetailsState from '@/helpers/models/DetailsState'
import ListState from '@/helpers/models/ListState'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export class IntegrationDetailsState extends DetailsState<IntegrationsApi, IntegrationModel> {
	api = new IntegrationsApi()
}

export function useIntegrationDetailsState() {
	return new IntegrationDetailsState()
}

export class IntegrationListState extends ListState<
	IntegrationsApi,
	IntegrationModel,
	LaravelPaginationResponse<IntegrationModel>
> {
	api = new IntegrationsApi()
}

export function useIntegrationListState() {
	return new IntegrationListState()
}
