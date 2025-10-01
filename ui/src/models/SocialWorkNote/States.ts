import type { SocialWorkNoteModel } from '@/models/SocialWorkNote/Model'
import SocialWorkNotesApi from '@/models/SocialWorkNote/Api'
import DetailsState from '@/helpers/models/DetailsState'
import ListState from '@/helpers/models/ListState'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export class SocialWorkNoteDetailsState extends DetailsState<
	SocialWorkNotesApi,
	SocialWorkNoteModel
> {
	api = new SocialWorkNotesApi()
}

export function useSocialWorkNoteDetailsState() {
	return new SocialWorkNoteDetailsState()
}

export class SocialWorkNoteListState extends ListState<
	SocialWorkNotesApi,
	SocialWorkNoteModel,
	LaravelPaginationResponse<SocialWorkNoteModel>
> {
	api = new SocialWorkNotesApi()
}

export function useSocialWorkNoteListState() {
	return new SocialWorkNoteListState()
}
