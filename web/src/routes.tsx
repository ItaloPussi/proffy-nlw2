import React from 'react'
import {BrowserRouter, Route, Redirect} from 'react-router-dom'
import Landing from './pages/Landing'
import TeacherList from './pages/TeacherList'
import TeacherForm from './pages/TeacherForm'
import Login from './pages/Login'
import Register from './pages/Register'
import {isAuthenticated} from './services/auth'
const PrivateRoute = ({component: Component, ...rest}:any) =>(
	<Route
		{...rest}
		render={props=> isAuthenticated() ? (
			<Component {...props} />
			):(
				<Redirect to="/login" />
			)
		}
	/>
)
const PublicRoute = ({component: Component, restricted, ...rest}:any) => {
    return (
        // restricted = false meaning public route
        // restricted = true meaning restricted route
        <Route {...rest} render={props => (
            isAuthenticated() && restricted ?
                <Redirect to="/" />
            : <Component {...props} />
        )} />
    );
};

function Routes(){
	return(
		<BrowserRouter>
			<Route path="/" exact component={Landing} />
			<PublicRoute path="/login" restricted={true} component={Login} />
			<PublicRoute path="/register" restricted={true} component={Register} />
			<PrivateRoute path="/study" component={TeacherList} />
			<PrivateRoute path="/give-classes" component={TeacherForm} />
		</BrowserRouter>
	)
}

export default Routes