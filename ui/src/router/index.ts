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
import ProductList from '../views/Product/List.vue'
import ProductEdit from '../views/Product/Edit.vue'
import CategoryList from '../views/Category/List.vue'
import CategoryEdit from '../views/Category/Edit.vue'
import SupplierList from '../views/Supplier/List.vue'
import SupplierEdit from '../views/Supplier/Edit.vue'
import CustomerList from '../views/Customer/List.vue'
import CustomerEdit from '../views/Customer/Edit.vue'
import OrderList from '../views/Order/List.vue'
import OrderEdit from '../views/Order/Edit.vue'
import OrderItemList from '../views/OrderItem/List.vue'
import OrderItemEdit from '../views/OrderItem/Edit.vue'
import InventoryList from '../views/Inventory/List.vue'
import InventoryEdit from '../views/Inventory/Edit.vue'
import WarehouseList from '../views/Warehouse/List.vue'
import WarehouseEdit from '../views/Warehouse/Edit.vue'
import ShipmentList from '../views/Shipment/List.vue'
import ShipmentEdit from '../views/Shipment/Edit.vue'
import ShipmentItemList from '../views/ShipmentItem/List.vue'
import ShipmentItemEdit from '../views/ShipmentItem/Edit.vue'
import PurchaseOrderList from '../views/PurchaseOrder/List.vue'
import PurchaseOrderEdit from '../views/PurchaseOrder/Edit.vue'
import PurchaseOrderItemList from '../views/PurchaseOrderItem/List.vue'
import PurchaseOrderItemEdit from '../views/PurchaseOrderItem/Edit.vue'
import EmployeeList from '../views/Employee/List.vue'
import EmployeeEdit from '../views/Employee/Edit.vue'
import RoleList from '../views/Role/List.vue'
import RoleEdit from '../views/Role/Edit.vue'
import TransactionList from '../views/Transaction/List.vue'
import TransactionEdit from '../views/Transaction/Edit.vue'
import PaymentList from '../views/Payment/List.vue'
import PaymentEdit from '../views/Payment/Edit.vue'
import ShippingMethodList from '../views/ShippingMethod/List.vue'
import ShippingMethodEdit from '../views/ShippingMethod/Edit.vue'
import LocationList from '../views/Location/List.vue'
import LocationEdit from '../views/Location/Edit.vue'
import DamageReportList from '../views/DamageReport/List.vue'
import DamageReportEdit from '../views/DamageReport/Edit.vue'
import ReturnModelList from '../views/ReturnModel/List.vue'
import ReturnModelEdit from '../views/ReturnModel/Edit.vue'

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
			path: '/products',
			children: [
				{
					path: '',
					name: 'products-list',
					component: ProductList,
				},
				{
					path: '/products/create',
					name: 'products-create',
					component: ProductEdit,
				},
				{
					path: '/products/:id',
					name: 'products-edit',
					component: ProductEdit,
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
			path: '/orders',
			children: [
				{
					path: '',
					name: 'orders-list',
					component: OrderList,
				},
				{
					path: '/orders/create',
					name: 'orders-create',
					component: OrderEdit,
				},
				{
					path: '/orders/:id',
					name: 'orders-edit',
					component: OrderEdit,
				},
			],
		},
		{
			path: '/order-items',
			children: [
				{
					path: '',
					name: 'order-items-list',
					component: OrderItemList,
				},
				{
					path: '/order-items/create',
					name: 'order-items-create',
					component: OrderItemEdit,
				},
				{
					path: '/order-items/:id',
					name: 'order-items-edit',
					component: OrderItemEdit,
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
			path: '/warehouses',
			children: [
				{
					path: '',
					name: 'warehouses-list',
					component: WarehouseList,
				},
				{
					path: '/warehouses/create',
					name: 'warehouses-create',
					component: WarehouseEdit,
				},
				{
					path: '/warehouses/:id',
					name: 'warehouses-edit',
					component: WarehouseEdit,
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
			path: '/shipment-items',
			children: [
				{
					path: '',
					name: 'shipment-items-list',
					component: ShipmentItemList,
				},
				{
					path: '/shipment-items/create',
					name: 'shipment-items-create',
					component: ShipmentItemEdit,
				},
				{
					path: '/shipment-items/:id',
					name: 'shipment-items-edit',
					component: ShipmentItemEdit,
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
			path: '/purchase-order-items',
			children: [
				{
					path: '',
					name: 'purchase-order-items-list',
					component: PurchaseOrderItemList,
				},
				{
					path: '/purchase-order-items/create',
					name: 'purchase-order-items-create',
					component: PurchaseOrderItemEdit,
				},
				{
					path: '/purchase-order-items/:id',
					name: 'purchase-order-items-edit',
					component: PurchaseOrderItemEdit,
				},
			],
		},
		{
			path: '/employees',
			children: [
				{
					path: '',
					name: 'employees-list',
					component: EmployeeList,
				},
				{
					path: '/employees/create',
					name: 'employees-create',
					component: EmployeeEdit,
				},
				{
					path: '/employees/:id',
					name: 'employees-edit',
					component: EmployeeEdit,
				},
			],
		},
		{
			path: '/roles',
			children: [
				{
					path: '',
					name: 'roles-list',
					component: RoleList,
				},
				{
					path: '/roles/create',
					name: 'roles-create',
					component: RoleEdit,
				},
				{
					path: '/roles/:id',
					name: 'roles-edit',
					component: RoleEdit,
				},
			],
		},
		{
			path: '/transactions',
			children: [
				{
					path: '',
					name: 'transactions-list',
					component: TransactionList,
				},
				{
					path: '/transactions/create',
					name: 'transactions-create',
					component: TransactionEdit,
				},
				{
					path: '/transactions/:id',
					name: 'transactions-edit',
					component: TransactionEdit,
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
			path: '/shipping-methods',
			children: [
				{
					path: '',
					name: 'shipping-methods-list',
					component: ShippingMethodList,
				},
				{
					path: '/shipping-methods/create',
					name: 'shipping-methods-create',
					component: ShippingMethodEdit,
				},
				{
					path: '/shipping-methods/:id',
					name: 'shipping-methods-edit',
					component: ShippingMethodEdit,
				},
			],
		},
		{
			path: '/locations',
			children: [
				{
					path: '',
					name: 'locations-list',
					component: LocationList,
				},
				{
					path: '/locations/create',
					name: 'locations-create',
					component: LocationEdit,
				},
				{
					path: '/locations/:id',
					name: 'locations-edit',
					component: LocationEdit,
				},
			],
		},
		{
			path: '/damage-reports',
			children: [
				{
					path: '',
					name: 'damage-reports-list',
					component: DamageReportList,
				},
				{
					path: '/damage-reports/create',
					name: 'damage-reports-create',
					component: DamageReportEdit,
				},
				{
					path: '/damage-reports/:id',
					name: 'damage-reports-edit',
					component: DamageReportEdit,
				},
			],
		},
		{
			path: '/returns',
			children: [
				{
					path: '',
					name: 'returns-list',
					component: ReturnModelList,
				},
				{
					path: '/returns/create',
					name: 'returns-create',
					component: ReturnModelEdit,
				},
				{
					path: '/returns/:id',
					name: 'returns-edit',
					component: ReturnModelEdit,
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
			redirect: '/products',
		},
	],
})

router.beforeEach(authGuard)

export default router
