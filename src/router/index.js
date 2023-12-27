import { createRouter, createWebHistory } from 'vue-router'


// User
import IndexUser from '../views/user/Index.vue'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import LogoutView from '../views/LogoutView.vue'

//book
import IndexBook from '../views/book/Index.vue'

//loan
import IndexLoan from '../views/loan/Index.vue'

//category
import IndexCategory from '../views/category/Index.vue'
import IndexSubCategory from '../views/subcategory/Index.vue'

//forbidden page
import Forbidden from '../views/Forbidden.vue'


const routes = [

	//appIndex
	{
		path: '/',
		name: 'home',
		component: HomeView
	},

	//login
	{
		path: '/login',
		name: 'login',
		component: LoginView
	},

	//logout
	{
		path: '/logout',
		name: 'logout',
		component: LogoutView
	},

	//user
	{
		path: '/user',
		name: 'IndexUser',
		component: IndexUser
	},

	//book
	{
		path: '/book',
		name: 'IndexBook',
		component: IndexBook
	},

	//loan
	{
		path: '/loan',
		name: 'IndexLoan',
		component: IndexLoan
	},

	
	//category
	{
		path: '/category',
		name: 'IndexCategory',
		component: IndexCategory
	},

	//sub category
	{
		path: '/subcategory',
		name: 'IndexSubCategory',
		component: IndexSubCategory
	},

	//sub category
	{
		path: '/forbidden',
		name: 'Forbidden',
		component: Forbidden
	}


]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
});


// Router navigation guard
router.beforeEach((to, from, next) => {
	if (to.matched.some(record => record.meta.requiresAuth) && !userIsAuthenticated) {
		// Redirect to the login page or show a 403 Forbidden page
		next({ name: 'login' });
	} else {
		next();
	}
});

export default router
