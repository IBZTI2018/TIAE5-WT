import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Components
import { SidebarOverlay, SidebarPanel } from './components/Sidebar';
import Navbar from './components/Navbar';

// Pages
import HomePage from './pages/HomePage';
import ResultPage from './pages/ResultPage';
import UserSettingsPage from './pages/UserSettingsPage';

function App() {
    return (
        <div className="App">
            <SidebarOverlay />
            <main role="main" className="container">
                <Navbar />
                <SidebarPanel />
                <Router>
                    <Switch>
                        <Route exact path="/" component={HomePage} />
                        <Route path="/results" component={ResultPage} />
                        <Route path="/user_settings" component={UserSettingsPage} />
                    </Switch>
                </Router>
            </main>
        </div>
    );
}

export default App;
