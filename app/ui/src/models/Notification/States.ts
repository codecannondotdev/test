import type { NotificationModel } from '@/models/Notification/Model'
import NotificationsApi from '@/models/Notification/Api'
import DetailsState from '@/helpers/models/DetailsState'
import ListState from '@/helpers/models/ListState'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export class NotificationDetailsState extends DetailsState<NotificationsApi, NotificationModel> {
	api = new NotificationsApi()
}

export function useNotificationDetailsState() {
	return new NotificationDetailsState()
}

export class NotificationListState extends ListState<
	NotificationsApi,
	NotificationModel,
	LaravelPaginationResponse<NotificationModel>
> {
	api = new NotificationsApi()
}

export function useNotificationListState() {
	return new NotificationListState()
}
