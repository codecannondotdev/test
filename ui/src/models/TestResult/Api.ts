import type {
	TestResultModel,
	TestResultStorePayload,
	TestResultUpdatePayload,
} from '@/models/TestResult/Model'
import Api from '@/helpers/models/Api'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export default class TestResultsApi extends Api<
	TestResultModel,
	LaravelPaginationResponse<TestResultModel>,
	TestResultStorePayload,
	TestResultUpdatePayload
> {
	route = 'test-results'
}
