import React from 'react'
import {BrowserRouter, Route, Redirect} from 'react-router-dom'
import Landing from './pages/Landing'
import TeacherList from './pages/TeacherList'
import TeacherForm from './pages/TeacherForm'
import Login from './pages/Login'
import {isAuthenticated} from './services/auth'
const PrivateRoute = ({component: Component, ...rest}:any) =>(
	<Route
		{...rest}
		render={props=> isAuthenticated() ? (
			<Component {...props} />
			):(
				<Redirect to={{pathname: "/login"}} />
			)
		}
	/>
)
function Routes(){
	return(
		<BrowserRouter>
			<Route path="/" exact component={Landing} />
			<Route path="/login" exact component={Login} />
			<PrivateRoute path="/study" component={TeacherList} />
			<PrivateRoute path="/give-classes" component={TeacherForm} />
		</BrowserRouter>
	)
}

export default Routes