import type { ReceiptModel } from '@/models/Receipt/Model'
import ReceiptsApi from '@/models/Receipt/Api'
import DetailsState from '@/helpers/models/DetailsState'
import ListState from '@/helpers/models/ListState'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export class ReceiptDetailsState extends DetailsState<ReceiptsApi, ReceiptModel> {
	api = new ReceiptsApi()
}

export function useReceiptDetailsState() {
	return new ReceiptDetailsState()
}

export class ReceiptListState extends ListState<
	ReceiptsApi,
	ReceiptModel,
	LaravelPaginationResponse<ReceiptModel>
> {
	api = new ReceiptsApi()
}

export function useReceiptListState() {
	return new ReceiptListState()
}
