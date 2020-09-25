import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import SurveyPage from "../components/SurveyPage";
import AdminPage from "../components/AdminPage";
import AdminLoginPage from "../components/AdminLoginPage";
import { createBrowserHistory } from "history";
import AdminPageRoute from "./AdminPageRoute";
import NotFoundPage from "../components/NotFoundPage";
import ThanksPage from "../components/ThanksPage";
export const history = createBrowserHistory();

function AppRouter() {
    return (
        <Router history={history}>
            <div>
                <Switch>
                    <AdminPageRoute path="/administration" component={AdminPage} exact={true} />
                    <Route path="/" component={AdminLoginPage} exact={true} />
                    <Route path="/survey/:id" component={SurveyPage} exact={true} />
                    <Route component={NotFoundPage} />
                    <Route path="/form-response" component={ThanksPage} exact={true} />
                </Switch>
            </div>
        </Router>
    )
}
export default AppRouter;