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
import MaterialList from '../views/Material/List.vue'
import MaterialEdit from '../views/Material/Edit.vue'
import MineList from '../views/Mine/List.vue'
import MineEdit from '../views/Mine/Edit.vue'
import MiningOperationList from '../views/MiningOperation/List.vue'
import MiningOperationEdit from '../views/MiningOperation/Edit.vue'
import FactoryList from '../views/Factory/List.vue'
import FactoryEdit from '../views/Factory/Edit.vue'
import CarModelList from '../views/CarModel/List.vue'
import CarModelEdit from '../views/CarModel/Edit.vue'
import ProductionBatchList from '../views/ProductionBatch/List.vue'
import ProductionBatchEdit from '../views/ProductionBatch/Edit.vue'
import SupplierList from '../views/Supplier/List.vue'
import SupplierEdit from '../views/Supplier/Edit.vue'
import PurchaseOrderList from '../views/PurchaseOrder/List.vue'
import PurchaseOrderEdit from '../views/PurchaseOrder/Edit.vue'
import InventoryList from '../views/Inventory/List.vue'
import InventoryEdit from '../views/Inventory/Edit.vue'
import CustomerList from '../views/Customer/List.vue'
import CustomerEdit from '../views/Customer/Edit.vue'
import SalesOrderList from '../views/SalesOrder/List.vue'
import SalesOrderEdit from '../views/SalesOrder/Edit.vue'
import ShipmentList from '../views/Shipment/List.vue'
import ShipmentEdit from '../views/Shipment/Edit.vue'

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
				await new AuthApi().verifyEmail({
					id: to.params.id as string,
					hash: to.params.hash as string,
					expires: to.query.expires as string,
					signature: to.query.signature as string,
				})

				const auth = useAuthStore()
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
			path: '/materials',
			children: [
				{
					path: '',
					name: 'materials-list',
					component: MaterialList,
				},
				{
					path: '/materials/create',
					name: 'materials-create',
					component: MaterialEdit,
				},
				{
					path: '/materials/:id',
					name: 'materials-edit',
					component: MaterialEdit,
				},
			],
		},
		{
			path: '/mines',
			children: [
				{
					path: '',
					name: 'mines-list',
					component: MineList,
				},
				{
					path: '/mines/create',
					name: 'mines-create',
					component: MineEdit,
				},
				{
					path: '/mines/:id',
					name: 'mines-edit',
					component: MineEdit,
				},
			],
		},
		{
			path: '/mining-operations',
			children: [
				{
					path: '',
					name: 'mining-operations-list',
					component: MiningOperationList,
				},
				{
					path: '/mining-operations/create',
					name: 'mining-operations-create',
					component: MiningOperationEdit,
				},
				{
					path: '/mining-operations/:id',
					name: 'mining-operations-edit',
					component: MiningOperationEdit,
				},
			],
		},
		{
			path: '/factories',
			children: [
				{
					path: '',
					name: 'factories-list',
					component: FactoryList,
				},
				{
					path: '/factories/create',
					name: 'factories-create',
					component: FactoryEdit,
				},
				{
					path: '/factories/:id',
					name: 'factories-edit',
					component: FactoryEdit,
				},
			],
		},
		{
			path: '/car-models',
			children: [
				{
					path: '',
					name: 'car-models-list',
					component: CarModelList,
				},
				{
					path: '/car-models/create',
					name: 'car-models-create',
					component: CarModelEdit,
				},
				{
					path: '/car-models/:id',
					name: 'car-models-edit',
					component: CarModelEdit,
				},
			],
		},
		{
			path: '/production-batches',
			children: [
				{
					path: '',
					name: 'production-batches-list',
					component: ProductionBatchList,
				},
				{
					path: '/production-batches/create',
					name: 'production-batches-create',
					component: ProductionBatchEdit,
				},
				{
					path: '/production-batches/:id',
					name: 'production-batches-edit',
					component: ProductionBatchEdit,
				},
			],
		},
		{
			path: '/suppliers',
			children: [
				{
					path: '',
					name: 'suppliers-list',
					component: SupplierList,
				},
				{
					path: '/suppliers/create',
					name: 'suppliers-create',
					component: SupplierEdit,
				},
				{
					path: '/suppliers/:id',
					name: 'suppliers-edit',
					component: SupplierEdit,
				},
			],
		},
		{
			path: '/purchase-orders',
			children: [
				{
					path: '',
					name: 'purchase-orders-list',
					component: PurchaseOrderList,
				},
				{
					path: '/purchase-orders/create',
					name: 'purchase-orders-create',
					component: PurchaseOrderEdit,
				},
				{
					path: '/purchase-orders/:id',
					name: 'purchase-orders-edit',
					component: PurchaseOrderEdit,
				},
			],
		},
		{
			path: '/inventories',
			children: [
				{
					path: '',
					name: 'inventories-list',
					component: InventoryList,
				},
				{
					path: '/inventories/create',
					name: 'inventories-create',
					component: InventoryEdit,
				},
				{
					path: '/inventories/:id',
					name: 'inventories-edit',
					component: InventoryEdit,
				},
			],
		},
		{
			path: '/customers',
			children: [
				{
					path: '',
					name: 'customers-list',
					component: CustomerList,
				},
				{
					path: '/customers/create',
					name: 'customers-create',
					component: CustomerEdit,
				},
				{
					path: '/customers/:id',
					name: 'customers-edit',
					component: CustomerEdit,
				},
			],
		},
		{
			path: '/sales-orders',
			children: [
				{
					path: '',
					name: 'sales-orders-list',
					component: SalesOrderList,
				},
				{
					path: '/sales-orders/create',
					name: 'sales-orders-create',
					component: SalesOrderEdit,
				},
				{
					path: '/sales-orders/:id',
					name: 'sales-orders-edit',
					component: SalesOrderEdit,
				},
			],
		},
		{
			path: '/shipments',
			children: [
				{
					path: '',
					name: 'shipments-list',
					component: ShipmentList,
				},
				{
					path: '/shipments/create',
					name: 'shipments-create',
					component: ShipmentEdit,
				},
				{
					path: '/shipments/:id',
					name: 'shipments-edit',
					component: ShipmentEdit,
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
			redirect: '/materials',
		},
	],
})

router.beforeEach(authGuard)

export default router
