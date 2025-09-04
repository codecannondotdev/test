import type { TesterModel } from '@/models/Tester/Model'
import TestersApi from '@/models/Tester/Api'
import DetailsState from '@/helpers/models/DetailsState'
import ListState from '@/helpers/models/ListState'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export class TesterDetailsState extends DetailsState<TestersApi, TesterModel> {
	api = new TestersApi()
}

export function useTesterDetailsState() {
	return new TesterDetailsState()
}

export class TesterListState extends ListState<
	TestersApi,
	TesterModel,
	LaravelPaginationResponse<TesterModel>
> {
	api = new TestersApi()
}

export function useTesterListState() {
	return new TesterListState()
}
