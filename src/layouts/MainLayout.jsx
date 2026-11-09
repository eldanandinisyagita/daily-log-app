import { Outlet, NavLink, Link } from "react-router-dom";
import DeadlineNotes from "../components/DeadlineNotes";

function MainLayout() {
  return (
    <div className="app">
      <Link to="/" className="brand">
        <small>Gita's</small>
        <span>daily log</span>
      </Link>

      <section className="hero">
        <em>Welcome to Gita's</em>
        <h1>daily log</h1>
      </section>

      <div className="layout">
        <div className="aside-nav">
          <DeadlineNotes className="deadline-mobile" />

          <aside className="aside-left">
            <h2 className="side-title">Quick Access</h2>
            <nav className="quick-nav">
              <NavLink to="/history/day">Task perday</NavLink>
              <NavLink to="/history/week">Task perweek</NavLink>
              <NavLink to="/history/month">Task permonth</NavLink>
              <NavLink to="/stats">Task graphic</NavLink>
            </nav>
          </aside>
        </div>

        <main className="log-card">
          <Outlet />
        </main>

        <DeadlineNotes className="deadline-desktop" />
      </div>
    </div>
  );
}

export default MainLayout;