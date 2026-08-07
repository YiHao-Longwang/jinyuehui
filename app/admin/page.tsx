import { Footer, Header, SectionHead } from "../site-common";

export default function AdminPage() {
  return (
    <>
      <Header active="Cart" />
      <main>
        <section className="admin-section">
          <SectionHead
            eyebrow="Reservation Admin"
            title="Live Booking Dashboard"
            sub="View new reservations through the websocket backend and update each booking status."
          />
          <div className="container">
            <div className="admin-shell" data-admin-page>
              <div className="admin-toolbar">
                <label>
                  <span>Admin token</span>
                  <input data-admin-token type="password" autoComplete="current-password" placeholder="ADMIN_TOKEN" />
                </label>
                <label>
                  <span>Status</span>
                  <select data-admin-filter defaultValue="all">
                    <option value="all">All</option>
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                    <option value="no_show">No show</option>
                  </select>
                </label>
                <button className="btn" type="button" data-admin-save>
                  Connect
                </button>
                <button className="btn line" type="button" data-admin-refresh>
                  Refresh
                </button>
              </div>
              <div className="admin-status" data-admin-status />
              <div className="admin-list" data-admin-list>
                <div className="admin-empty">Enter your admin token to load reservations.</div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <script src="/admin-reservations.js?v=20260807-token-only" defer />
    </>
  );
}
