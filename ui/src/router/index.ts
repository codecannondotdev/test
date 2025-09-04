import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/Auth'
import NotFound from '../views/NotFound.vue'
import authGuard from './guards/authGuard'

import Login from '../views/Auth/Login.vue'
import Register from '../views/Auth/Register.vue'
import VerifyEmail from '../views/Auth/VerifyEmail.vue'
import ForgotPassword from '../views/Auth/ForgotPassword.vue'
import ResetPassword from '../views/Auth/ResetPassword.vue'
import AdminApi from '@/helpers/api/AdminApi'
import AuthApi from '@/helpers/api/AuthApi'
import UserList from '../views/User/List.vue'
import UserEdit from '../views/User/Edit.vue'
import UserDetails from '../views/User/Details.vue'
import MemberList from '../views/Member/List.vue'
import MemberEdit from '../views/Member/Edit.vue'
import ClassModelList from '../views/ClassModel/List.vue'
import ClassModelEdit from '../views/ClassModel/Edit.vue'
import InstructorList from '../views/Instructor/List.vue'
import InstructorEdit from '../views/Instructor/Edit.vue'
import StudioList from '../views/Studio/List.vue'
import StudioEdit from '../views/Studio/Edit.vue'
import EquipmentList from '../views/Equipment/List.vue'
import EquipmentEdit from '../views/Equipment/Edit.vue'
import BookingList from '../views/Booking/List.vue'
import BookingEdit from '../views/Booking/Edit.vue'
import ProgramList from '../views/Program/List.vue'
import ProgramEdit from '../views/Program/Edit.vue'
import FeedbackList from '../views/Feedback/List.vue'
import FeedbackEdit from '../views/Feedback/Edit.vue'
import PaymentList from '../views/Payment/List.vue'
import PaymentEdit from '../views/Payment/Edit.vue'
import ScheduleList from '../views/Schedule/List.vue'
import ScheduleEdit from '../views/Schedule/Edit.vue'
import TesterList from '../views/Tester/List.vue'
import TesterEdit from '../views/Tester/Edit.vue'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/verify-email',
			name: 'verify-email-notice',
			component: VerifyEmail,
			meta: {
				noNavigation: true,
			},
		},
		{
			path: '/email/verify/:id/:hash',
			name: 'email-verification',
			component: () => {},
			beforeEnter: async (to) => {
				const auth = useAuthStore()
				await auth.getUser()

				if (!auth.user) {
					return { name: 'login' }
				}

				await new AuthApi().verifyEmail({
					id: to.params.id as string,
					hash: to.params.hash as string,
					expires: to.query.expires as string,
					signature: to.query.signature as string,
				})

				await auth.getUser()

				return { name: 'root' }
			},
			meta: {
				unprotected: true,
				noNavigation: true,
			},
		},
		{
			path: '/forgot-password',
			name: 'forgot-password',
			component: ForgotPassword,
			meta: {
				unprotected: true,
				noNavigation: true,
			},
		},
		{
			path: '/reset-password',
			name: 'reset-password',
			component: ResetPassword,
			meta: {
				unprotected: true,
				noNavigation: true,
			},
		},
		{
			path: '/login',
			name: 'login',
			component: Login,
			meta: {
				avoidUser: true,
				noNavigation: true,
			},
		},
		{
			path: '/register',
			name: 'register',
			component: Register,
			meta: {
				avoidUser: true,
				noNavigation: true,
			},
		},
		{
			path: '/logout',
			name: 'logout',
			component: () => {},
			beforeEnter: async () => {
				const auth = useAuthStore()
				await auth.logout()
				return { name: 'login' }
			},
			meta: {
				unprotected: true,
				noNavigation: true,
			},
		},
		{
			path: '/clear-data',
			name: 'clear-data',
			component: () => {},
			beforeEnter: async () => {
				await AdminApi.clearData()
				window.location.reload()
				throw new Error('Clear data')
			},
		},
		{
			path: '/users',
			children: [
				{
					path: '',
					name: 'users-list',
					component: UserList,
					meta: {
						roles: ['admin'],
					},
				},
				{
					path: '/users/create',
					name: 'users-create',
					component: UserEdit,
					meta: {
						roles: ['admin'],
					},
				},
				{
					path: '/users/:id',
					name: 'users-edit',
					component: UserEdit,
					meta: {
						roles: ['admin'],
					},
				},
			],
		},
		{
			path: '/members',
			children: [
				{
					path: '',
					name: 'members-list',
					component: MemberList,
				},
				{
					path: '/members/create',
					name: 'members-create',
					component: MemberEdit,
				},
				{
					path: '/members/:id',
					name: 'members-edit',
					component: MemberEdit,
				},
			],
		},
		{
			path: '/classes',
			children: [
				{
					path: '',
					name: 'classes-list',
					component: ClassModelList,
				},
				{
					path: '/classes/create',
					name: 'classes-create',
					component: ClassModelEdit,
				},
				{
					path: '/classes/:id',
					name: 'classes-edit',
					component: ClassModelEdit,
				},
			],
		},
		{
			path: '/instructors',
			children: [
				{
					path: '',
					name: 'instructors-list',
					component: InstructorList,
				},
				{
					path: '/instructors/create',
					name: 'instructors-create',
					component: InstructorEdit,
				},
				{
					path: '/instructors/:id',
					name: 'instructors-edit',
					component: InstructorEdit,
				},
			],
		},
		{
			path: '/studios',
			children: [
				{
					path: '',
					name: 'studios-list',
					component: StudioList,
				},
				{
					path: '/studios/create',
					name: 'studios-create',
					component: StudioEdit,
				},
				{
					path: '/studios/:id',
					name: 'studios-edit',
					component: StudioEdit,
				},
			],
		},
		{
			path: '/equipments',
			children: [
				{
					path: '',
					name: 'equipments-list',
					component: EquipmentList,
				},
				{
					path: '/equipments/create',
					name: 'equipments-create',
					component: EquipmentEdit,
				},
				{
					path: '/equipments/:id',
					name: 'equipments-edit',
					component: EquipmentEdit,
				},
			],
		},
		{
			path: '/bookings',
			children: [
				{
					path: '',
					name: 'bookings-list',
					component: BookingList,
				},
				{
					path: '/bookings/create',
					name: 'bookings-create',
					component: BookingEdit,
				},
				{
					path: '/bookings/:id',
					name: 'bookings-edit',
					component: BookingEdit,
				},
			],
		},
		{
			path: '/programs',
			children: [
				{
					path: '',
					name: 'programs-list',
					component: ProgramList,
				},
				{
					path: '/programs/create',
					name: 'programs-create',
					component: ProgramEdit,
				},
				{
					path: '/programs/:id',
					name: 'programs-edit',
					component: ProgramEdit,
				},
			],
		},
		{
			path: '/feedbacks',
			children: [
				{
					path: '',
					name: 'feedbacks-list',
					component: FeedbackList,
				},
				{
					path: '/feedbacks/create',
					name: 'feedbacks-create',
					component: FeedbackEdit,
				},
				{
					path: '/feedbacks/:id',
					name: 'feedbacks-edit',
					component: FeedbackEdit,
				},
			],
		},
		{
			path: '/payments',
			children: [
				{
					path: '',
					name: 'payments-list',
					component: PaymentList,
				},
				{
					path: '/payments/create',
					name: 'payments-create',
					component: PaymentEdit,
				},
				{
					path: '/payments/:id',
					name: 'payments-edit',
					component: PaymentEdit,
				},
			],
		},
		{
			path: '/schedules',
			children: [
				{
					path: '',
					name: 'schedules-list',
					component: ScheduleList,
				},
				{
					path: '/schedules/create',
					name: 'schedules-create',
					component: ScheduleEdit,
				},
				{
					path: '/schedules/:id',
					name: 'schedules-edit',
					component: ScheduleEdit,
				},
			],
		},
		{
			path: '/testers',
			children: [
				{
					path: '',
					name: 'testers-list',
					component: TesterList,
				},
				{
					path: '/testers/create',
					name: 'testers-create',
					component: TesterEdit,
				},
				{
					path: '/testers/:id',
					name: 'testers-edit',
					component: TesterEdit,
				},
			],
		},
		{
			path: '/404-not-found',
			name: 'not-found',
			component: NotFound,
			meta: {
				unprotected: true,
			},
		},
		{
			path: '/account',
			children: [
				{
					path: '',
					name: 'account-details',
					component: UserDetails,
				},
			],
		},
		{
			name: 'root',
			path: '/:pathMatch(.*)*',
			redirect: '/members',
		},
	],
})

router.beforeEach(authGuard)

export default router
