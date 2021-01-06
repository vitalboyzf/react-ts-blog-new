import { lazy, Suspense } from "react";
import "./Layout.scss";
import { Route, BrowserRouter, Redirect, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import Home from "./views/home";
import Footer from "./views/home/Footer";
import NavHead from "./views/nav-head";
import Loading from "./views/Loading";
const TechnicalArticles = lazy(() => import("./views/technical-articles"));
const Detail = lazy(() => import("./views/detail"));
const Register = lazy(() => import("./views/auth/Register"));
const MessageBoard = lazy(() => import("./views/message"));
const About = lazy(() => import("./views/about/About"));
const MoodEssay = lazy(() => import("./views/mood-essay"));
const Login = lazy(() => import("./views/auth/Login"));
const Book = lazy(() => import("./views/book"));
const Person = lazy(() => import("./views/nav-head/Person"));

const RouterConfig = () => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <NavHead />
                <div className="layout-container">
                    <div className="main">
                        <Suspense fallback={<Loading />}>
                            <Switch>
                                <Route path={"/home"} component={Home} />
                                <Route path={"/technical-articles"} component={TechnicalArticles} />
                                <Route path={"/about"} component={About} />
                                <Route path={"/message-board"} component={MessageBoard} />
                                <Route path={"/mode-essay"} component={MoodEssay} />
                                <Route path={"/detail/:id"} component={Detail} />
                                <Route path={"/book"} component={Book} />
                                <Route path={"/login"} component={Login} />
                                <Route path={"/register"} component={Register} />
                                <Route path={"/person"} component={Person} />
                                <Redirect to={"/home"} />
                            </Switch>
                        </Suspense>
                    </div>
                    <Footer></Footer>
                </div>
            </BrowserRouter>
        </Provider>
    );
};

export default RouterConfig;
