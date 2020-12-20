import React, {Fragment, useEffect} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import {connect} from 'react-redux';
import {createStructuredSelector} from "reselect";
import {selectCurrentUser} from "./redux/user/user.selector";
import ShopPage from "./pages/shop/shop.component";
import HomePage from "./pages/homepage/homepage.component";
import {checkUserSession, googleSignInStart, signOutStart} from "./redux/user/user.actions";
import Header from "./components/header/header.component";
const App = ({currentUser,checkUserSession, signInWithGoogle, signOutStart}) => {
    useEffect(() => {
        checkUserSession()
    }, [checkUserSession])
    return (
        <Fragment>
            <Header/>
            <div>
            {
                currentUser ? <div>login success </div> : <div>login failure</div>
            }
            {
                currentUser ? <button onClick={signOutStart}>Logout</button> :
                    <button onClick={signInWithGoogle}>Login</button>
            }
            </div>
            <Switch>
                {/*<Route exact path="/" component={() => <HomePage {...currentUser}/>}/>*/}
                {/*<Route path="/shop" component={ShopPage} />*/}
                <Route
                    exact
                    path="/signin"
                    render={() =>
                        currentUser ? <Redirect to="/"/> : null
                    }
                />
            </Switch>
        </Fragment>
    )
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser
})

const mapDispatchToProps = dispatch => ({
    checkUserSession: () => dispatch(checkUserSession()),
    signInWithGoogle : () => dispatch(googleSignInStart()),
    signOutStart: () => dispatch(signOutStart())
})
// export default App;
export default connect(mapStateToProps, mapDispatchToProps)(App);