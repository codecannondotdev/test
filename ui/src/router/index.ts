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
import ExpenseList from '../views/Expense/List.vue'
import ExpenseEdit from '../views/Expense/Edit.vue'
import CategoryList from '../views/Category/List.vue'
import CategoryEdit from '../views/Category/Edit.vue'
import VendorList from '../views/Vendor/List.vue'
import VendorEdit from '../views/Vendor/Edit.vue'
import ProjectList from '../views/Project/List.vue'
import ProjectEdit from '../views/Project/Edit.vue'
import BudgetList from '../views/Budget/List.vue'
import BudgetEdit from '../views/Budget/Edit.vue'
import ReceiptList from '../views/Receipt/List.vue'
import ReceiptEdit from '../views/Receipt/Edit.vue'
import ExpenseReportList from '../views/ExpenseReport/List.vue'
import ExpenseReportEdit from '../views/ExpenseReport/Edit.vue'
import TagList from '../views/Tag/List.vue'
import TagEdit from '../views/Tag/Edit.vue'
import CurrencyList from '../views/Currency/List.vue'
import CurrencyEdit from '../views/Currency/Edit.vue'

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
			path: '/expenses',
			children: [
				{
					path: '',
					name: 'expenses-list',
					component: ExpenseList,
				},
				{
					path: '/expenses/create',
					name: 'expenses-create',
					component: ExpenseEdit,
				},
				{
					path: '/expenses/:id',
					name: 'expenses-edit',
					component: ExpenseEdit,
				},
			],
		},
		{
			path: '/categories',
			children: [
				{
					path: '',
					name: 'categories-list',
					component: CategoryList,
				},
				{
					path: '/categories/create',
					name: 'categories-create',
					component: CategoryEdit,
				},
				{
					path: '/categories/:id',
					name: 'categories-edit',
					component: CategoryEdit,
				},
			],
		},
		{
			path: '/vendors',
			children: [
				{
					path: '',
					name: 'vendors-list',
					component: VendorList,
				},
				{
					path: '/vendors/create',
					name: 'vendors-create',
					component: VendorEdit,
				},
				{
					path: '/vendors/:id',
					name: 'vendors-edit',
					component: VendorEdit,
				},
			],
		},
		{
			path: '/projects',
			children: [
				{
					path: '',
					name: 'projects-list',
					component: ProjectList,
				},
				{
					path: '/projects/create',
					name: 'projects-create',
					component: ProjectEdit,
				},
				{
					path: '/projects/:id',
					name: 'projects-edit',
					component: ProjectEdit,
				},
			],
		},
		{
			path: '/budgets',
			children: [
				{
					path: '',
					name: 'budgets-list',
					component: BudgetList,
				},
				{
					path: '/budgets/create',
					name: 'budgets-create',
					component: BudgetEdit,
				},
				{
					path: '/budgets/:id',
					name: 'budgets-edit',
					component: BudgetEdit,
				},
			],
		},
		{
			path: '/receipts',
			children: [
				{
					path: '',
					name: 'receipts-list',
					component: ReceiptList,
				},
				{
					path: '/receipts/create',
					name: 'receipts-create',
					component: ReceiptEdit,
				},
				{
					path: '/receipts/:id',
					name: 'receipts-edit',
					component: ReceiptEdit,
				},
			],
		},
		{
			path: '/expense-reports',
			children: [
				{
					path: '',
					name: 'expense-reports-list',
					component: ExpenseReportList,
				},
				{
					path: '/expense-reports/create',
					name: 'expense-reports-create',
					component: ExpenseReportEdit,
				},
				{
					path: '/expense-reports/:id',
					name: 'expense-reports-edit',
					component: ExpenseReportEdit,
				},
			],
		},
		{
			path: '/tags',
			children: [
				{
					path: '',
					name: 'tags-list',
					component: TagList,
				},
				{
					path: '/tags/create',
					name: 'tags-create',
					component: TagEdit,
				},
				{
					path: '/tags/:id',
					name: 'tags-edit',
					component: TagEdit,
				},
			],
		},
		{
			path: '/currencies',
			children: [
				{
					path: '',
					name: 'currencies-list',
					component: CurrencyList,
				},
				{
					path: '/currencies/create',
					name: 'currencies-create',
					component: CurrencyEdit,
				},
				{
					path: '/currencies/:id',
					name: 'currencies-edit',
					component: CurrencyEdit,
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
			redirect: '/expenses',
		},
	],
})

router.beforeEach(authGuard)

export default router
