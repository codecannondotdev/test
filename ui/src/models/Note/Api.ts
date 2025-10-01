import type { NoteModel, NoteStorePayload, NoteUpdatePayload } from '@/models/Note/Model'
import Api from '@/helpers/models/Api'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export default class NotesApi extends Api<
	NoteModel,
	LaravelPaginationResponse<NoteModel>,
	NoteStorePayload,
	NoteUpdatePayload
> {
	route = 'notes'
}
