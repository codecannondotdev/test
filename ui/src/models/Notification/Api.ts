import type {
	NotificationModel,
	NotificationStorePayload,
	NotificationUpdatePayload,
} from '@/models/Notification/Model'
import Api from '@/helpers/models/Api'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export default class NotificationsApi extends Api<
	NotificationModel,
	LaravelPaginationResponse<NotificationModel>,
	NotificationStorePayload,
	NotificationUpdatePayload
> {
	route = 'notifications'
}
