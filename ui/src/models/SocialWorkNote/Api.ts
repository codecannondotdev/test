import type {
	SocialWorkNoteModel,
	SocialWorkNoteStorePayload,
	SocialWorkNoteUpdatePayload,
} from '@/models/SocialWorkNote/Model'
import Api from '@/helpers/models/Api'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export default class SocialWorkNotesApi extends Api<
	SocialWorkNoteModel,
	LaravelPaginationResponse<SocialWorkNoteModel>,
	SocialWorkNoteStorePayload,
	SocialWorkNoteUpdatePayload
> {
	route = 'social-work-notes'
}
