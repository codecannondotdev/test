import type { NoteModel } from '@/models/Note/Model'
import NotesApi from '@/models/Note/Api'
import DetailsState from '@/helpers/models/DetailsState'
import ListState from '@/helpers/models/ListState'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export class NoteDetailsState extends DetailsState<NotesApi, NoteModel> {
	api = new NotesApi()
}

export function useNoteDetailsState() {
	return new NoteDetailsState()
}

export class NoteListState extends ListState<
	NotesApi,
	NoteModel,
	LaravelPaginationResponse<NoteModel>
> {
	api = new NotesApi()
}

export function useNoteListState() {
	return new NoteListState()
}
