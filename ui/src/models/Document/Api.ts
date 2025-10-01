import type {
	DocumentModel,
	DocumentStorePayload,
	DocumentUpdatePayload,
} from '@/models/Document/Model'
import Api from '@/helpers/models/Api'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export default class DocumentsApi extends Api<
	DocumentModel,
	LaravelPaginationResponse<DocumentModel>,
	DocumentStorePayload,
	DocumentUpdatePayload
> {
	route = 'documents'
}
