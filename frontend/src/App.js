import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Components
import { SidebarOverlay, SidebarPanel } from './components/Sidebar';
import Navbar from './components/Navbar';
import Breadcrumbs from './components/Breadcrumbs';

// Pages
import HomePage from './pages/HomePage';
import OffersPage from './pages/OffersPage';
import HotelsPage from './pages/HotelsPage';
import UserSettingsPage from './pages/UserSettingsPage';

function App() {
    return (
        <div className="App">
            <Router>
                <SidebarOverlay />
                <Navbar />
                <Breadcrumbs />
                <main role="main" className="container">
                    <SidebarPanel />
                    <Switch>
                        <Route exact path="/" component={HomePage} />
                        <Route path="/offers" component={OffersPage} />
                        <Route path="/hotels" component={HotelsPage} />
                        <Route path="/user_settings" component={UserSettingsPage} />
                    </Switch>
                </main>
            </Router>
        </div>
    );
}

export default App;
