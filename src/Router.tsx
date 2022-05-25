import {BrowserRouter, Switch, Route} from "react-router-dom";
import Coins from "./routes/Coins";
import Coin from "./routes/Coin";

function Router() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/react-masterclass-typescript/">
                    <Coins />
                </Route>
                <Route path="/react-masterclass-typescript/:coinId">
                    <Coin />
                </Route>
            </Switch>
        </BrowserRouter>
    );
}

export default Router;
