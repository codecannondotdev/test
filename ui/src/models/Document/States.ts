import type { DocumentModel } from '@/models/Document/Model'
import DocumentsApi from '@/models/Document/Api'
import DetailsState from '@/helpers/models/DetailsState'
import ListState from '@/helpers/models/ListState'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export class DocumentDetailsState extends DetailsState<DocumentsApi, DocumentModel> {
	api = new DocumentsApi()
}

export function useDocumentDetailsState() {
	return new DocumentDetailsState()
}

export class DocumentListState extends ListState<
	DocumentsApi,
	DocumentModel,
	LaravelPaginationResponse<DocumentModel>
> {
	api = new DocumentsApi()
}

export function useDocumentListState() {
	return new DocumentListState()
}
