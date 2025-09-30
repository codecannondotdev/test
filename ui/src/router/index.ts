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
import AsdfasdfasdList from '../views/Asdfasdfasd/List.vue'
import AsdfasdfasdEdit from '../views/Asdfasdfasd/Edit.vue'
import TrainerList from '../views/Trainer/List.vue'
import TrainerEdit from '../views/Trainer/Edit.vue'
import FitnessClassList from '../views/FitnessClass/List.vue'
import FitnessClassEdit from '../views/FitnessClass/Edit.vue'
import BookingList from '../views/Booking/List.vue'
import BookingEdit from '../views/Booking/Edit.vue'
import MembershipList from '../views/Membership/List.vue'
import MembershipEdit from '../views/Membership/Edit.vue'

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
			path: '/asdfasdfasds',
			children: [
				{
					path: '',
					name: 'asdfasdfasds-list',
					component: AsdfasdfasdList,
				},
				{
					path: '/asdfasdfasds/create',
					name: 'asdfasdfasds-create',
					component: AsdfasdfasdEdit,
				},
				{
					path: '/asdfasdfasds/:id',
					name: 'asdfasdfasds-edit',
					component: AsdfasdfasdEdit,
				},
			],
		},
		{
			path: '/trainers',
			children: [
				{
					path: '',
					name: 'trainers-list',
					component: TrainerList,
				},
				{
					path: '/trainers/create',
					name: 'trainers-create',
					component: TrainerEdit,
				},
				{
					path: '/trainers/:id',
					name: 'trainers-edit',
					component: TrainerEdit,
				},
			],
		},
		{
			path: '/fitness-classs',
			children: [
				{
					path: '',
					name: 'fitness-classs-list',
					component: FitnessClassList,
				},
				{
					path: '/fitness-classs/create',
					name: 'fitness-classs-create',
					component: FitnessClassEdit,
				},
				{
					path: '/fitness-classs/:id',
					name: 'fitness-classs-edit',
					component: FitnessClassEdit,
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
			path: '/memberships',
			children: [
				{
					path: '',
					name: 'memberships-list',
					component: MembershipList,
				},
				{
					path: '/memberships/create',
					name: 'memberships-create',
					component: MembershipEdit,
				},
				{
					path: '/memberships/:id',
					name: 'memberships-edit',
					component: MembershipEdit,
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
			redirect: '/asdfasdfasds',
		},
	],
})

router.beforeEach(authGuard)

export default router
