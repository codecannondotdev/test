import type { TestResultModel } from '@/models/TestResult/Model'
import TestResultsApi from '@/models/TestResult/Api'
import DetailsState from '@/helpers/models/DetailsState'
import ListState from '@/helpers/models/ListState'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export class TestResultDetailsState extends DetailsState<TestResultsApi, TestResultModel> {
	api = new TestResultsApi()
}

export function useTestResultDetailsState() {
	return new TestResultDetailsState()
}

export class TestResultListState extends ListState<
	TestResultsApi,
	TestResultModel,
	LaravelPaginationResponse<TestResultModel>
> {
	api = new TestResultsApi()
}

export function useTestResultListState() {
	return new TestResultListState()
}
