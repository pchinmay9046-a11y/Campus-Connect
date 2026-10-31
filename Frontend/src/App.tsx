import { useCallback, useEffect, useMemo, useState } from "react";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Bookmark,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Compass,
  Info,
  MapPin,
  Menu,
  Search,
  Ticket,
  Users,
  X,
} from "lucide-react";

const API_BASE_URL = (import.meta.env.VITE_API_URL || import.meta.env.VITE_API_BASE_URL || "http://localhost:8000").replace(/\/$/, "");
const USER_ID = import.meta.env.VITE_USER_ID || "22222222-2222-2222-2222-222222222222";

type EventItem = {
  id: string;
  title: string;
  capacity?: number;
  status?: string;
  organizer_id?: string;
  booked_seats?: number;
  seats_left?: number;
  description?: string;
  location?: string;
  venue?: string;
  event_date?: string;
  date?: string;
  start_time?: string;
  starts_at?: string;
  image_url?: string;
  category?: string;
};

type Registration = {
  id: string;
  created_at?: string;
  events?: EventItem;
};

type Page = "explore" | "detail" | "registrations";

const eventImages = [
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=85",
  "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=85",
  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=85",
];

const categories = ["All", "AI", "Robotics", "Open Source", "Hardware", "Workshop"];

function getCategory(event: EventItem) {
  if (event.category) return event.category;
  const title = event.title.toLowerCase();
  if (title.includes("ai") || title.includes("build")) return "AI & Machine Learning";
  if (title.includes("rover") || title.includes("robot")) return "Hardware";
  if (title.includes("git") || title.includes("open source") || title.includes("oss")) return "Open Source";
  return "Workshop";
}

function getLocation(event: EventItem) {
  return event.location || event.venue || "Campus venue";
}

function getDate(event: EventItem) {
  const raw = event.event_date || event.date || event.starts_at || event.start_time;
  if (!raw) return "Date to be announced";
  const parsed = new Date(raw);
  if (Number.isNaN(parsed.getTime())) return raw;
  return new Intl.DateTimeFormat("en", { month: "short", day: "numeric", year: "numeric" }).format(parsed);
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      ...init,
      headers: {
        "Content-Type": "application/json",
        "X-User-Id": USER_ID,
        ...init?.headers,
      },
    });
  } catch {
    throw new Error("Could not reach CampusConnect. Check that the backend is running and try again.");
  }

  if (!response.ok) {
    let message = `Request failed (${response.status}).`;
    try {
      const body = await response.json();
      if (typeof body.detail === "string") {
        const messages: Record<string, string> = {
          DUPLICATE_REGISTRATION: "You’re already registered for this event.",
          EVENT_FULL: "This event is full.",
        };
        message = messages[body.detail] || body.detail;
      }
    } catch {
      // Keep the HTTP status message when the server does not return JSON.
    }
    throw new Error(message);
  }
  return response.json() as Promise<T>;
}

function App() {
  const [page, setPage] = useState<Page>("explore");
  const [events, setEvents] = useState<EventItem[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [detailLoading, setDetailLoading] = useState(false);
  const [registrationsLoading, setRegistrationsLoading] = useState(false);
  const [registering, setRegistering] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [savedEvents, setSavedEvents] = useState<string[]>([]);

  const loadEvents = useCallback(async (query: string) => {
    setLoading(true);
    setError("");
    try {
      const params = query.trim() ? `?search=${encodeURIComponent(query.trim())}` : "";
      setEvents(await request<EventItem[]>(`/api/events${params}`));
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Unable to load events.");
    } finally {
      setLoading(false);
    }
  }, []);

  const loadRegistrations = useCallback(async () => {
    setRegistrationsLoading(true);
    setError("");
    try {
      setRegistrations(await request<Registration[]>("/api/me/registrations"));
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Unable to load registrations.");
    } finally {
      setRegistrationsLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => void loadEvents(search), 250);
    return () => window.clearTimeout(timer);
  }, [loadEvents, search]);

  const visibleEvents = useMemo(() => {
    if (activeCategory === "All") return events;
    const filter = activeCategory.toLowerCase();
    return events.filter((event) => {
      const category = getCategory(event).toLowerCase();
      const title = event.title.toLowerCase();
      return category.includes(filter) || title.includes(filter);
    });
  }, [activeCategory, events]);

  const openEvent = async (event: EventItem) => {
    setPage("detail");
    setSelectedEvent(event);
    setDetailLoading(true);
    setError("");
    setSuccess("");
    try {
      setSelectedEvent(await request<EventItem>(`/api/events/${encodeURIComponent(event.id)}`));
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Unable to load event details.");
    } finally {
      setDetailLoading(false);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const register = async () => {
    if (!selectedEvent) return;
    setRegistering(true);
    setError("");
    setSuccess("");
    try {
      await request("/api/registrations", {
        method: "POST",
        body: JSON.stringify({ event_id: selectedEvent.id }),
      });
      setSuccess("You’re registered! Your place is confirmed.");
      void loadRegistrations();
      const updated = await request<EventItem>(`/api/events/${encodeURIComponent(selectedEvent.id)}`);
      setSelectedEvent(updated);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Registration could not be completed.");
    } finally {
      setRegistering(false);
    }
  };

  const navigate = (next: Page) => {
    setError("");
    setSuccess("");
    setPage(next);
    if (next === "registrations") void loadRegistrations();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleSaved = (id: string) => {
    setSavedEvents((current) => current.includes(id) ? current.filter((saved) => saved !== id) : [...current, id]);
  };

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="topbar-inner">
          <button className="brand" onClick={() => navigate("explore")} aria-label="CampusConnect home">
            <span className="brand-mark"><Compass size={21} /></span>
            <span>CampusConnect</span>
          </button>
          <nav className="desktop-nav" aria-label="Main navigation">
            <button className={page !== "registrations" ? "nav-link selected" : "nav-link"} onClick={() => navigate("explore")}>Explore</button>
            <button className={page === "registrations" ? "nav-link selected" : "nav-link"} onClick={() => navigate("registrations")}>My registrations</button>
          </nav>
          <div className="profile-chip"><span className="avatar">S</span><span>Student</span><Menu size={16} className="menu-icon" /></div>
        </div>
      </header>

      <main className="main-content">
        {page === "explore" && (
          <section className="explore-page">
            <div className="welcome-row">
              <div>
                <p className="eyebrow"><span className="live-dot" /> CAMPUS, CONNECTED</p>
                <h1>Find your next campus experience.</h1>
                <p className="intro">Discover hackathons, workshops, and student tech gatherings.</p>
              </div>
              <div className="hero-art" aria-hidden="true"><div className="orb orb-one" /><div className="orb orb-two" /><Users size={58} strokeWidth={1.3} /></div>
            </div>

            <div className="search-wrap">
              <Search size={19} />
              <input aria-label="Search events" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search events, workshops, clubs..." />
              {search && <button className="clear-search" onClick={() => setSearch("")} aria-label="Clear search"><X size={17} /></button>}
            </div>

            <div className="filters" aria-label="Filter by category">
              {categories.map((category) => <button key={category} className={activeCategory === category ? "filter-chip active" : "filter-chip"} onClick={() => setActiveCategory(category)}>{category}</button>)}
            </div>

            <div className="section-heading">
              <div><p className="eyebrow">YOUR CAMPUS, YOUR CALENDAR</p><h2>Upcoming events <span className="count-badge">{error ? "!" : visibleEvents.length}</span></h2></div>
              <span className="sort-label"><CalendarDays size={15} /> Happening soon</span>
            </div>

            {error && <ErrorBanner message={error} onRetry={() => void loadEvents(search)} />}
            {loading ? <LoadingState label="Finding campus events..." /> : error ? null : visibleEvents.length === 0 ? (
              <div className="empty-state"><div className="empty-icon"><Search size={24} /></div><h3>No events found</h3><p>Try another search or check back soon for new campus events.</p></div>
            ) : (
              <div className="event-grid">
                {visibleEvents.map((event, index) => (
                  <EventCard key={event.id} event={event} index={index} saved={savedEvents.includes(event.id)} onOpen={() => void openEvent(event)} onSave={() => toggleSaved(event.id)} />
                ))}
              </div>
            )}

            <div className="host-banner">
              <div className="host-icon"><Info size={20} /></div>
              <div><strong>Hosting an event?</strong><p>Bring your campus community together.</p></div>
              <span className="host-badge">Coming soon</span>
            </div>
          </section>
        )}

        {page === "detail" && selectedEvent && (
          <section className="detail-page">
            <button className="back-link" onClick={() => navigate("explore")}><ArrowLeft size={17} /> Back to events</button>
            {error && <ErrorBanner message={error} onRetry={() => void openEvent(selectedEvent)} />}
            {success && <div className="success-banner"><CheckCircle2 size={20} /><span>{success}</span></div>}
            <div className="detail-layout">
              <div className="detail-main">
                <div className="detail-cover" style={{ backgroundImage: `linear-gradient(180deg, transparent 38%, rgba(12, 14, 33, .78)), url("${selectedEvent.image_url || eventImages[0]}")` }}>
                  <span className="cover-tag">{getCategory(selectedEvent)}</span>
                  <span className="cover-caption"><Users size={16} /> Make something remarkable, together.</span>
                </div>
                <div className="detail-panel">
                  <div className="detail-label-row"><span className="pill purple">{getCategory(selectedEvent)}</span><span className={selectedEvent.status === "open" ? "pill green" : "pill muted"}>{selectedEvent.status || "Event"}</span></div>
                  <h1>{selectedEvent.title}</h1>
                  <p className="detail-organizer">Hosted by the CampusConnect community</p>
                  <div className="detail-facts">
                    <div className="fact-card"><CalendarDays size={18} /><div><small>DATE</small><strong>{getDate(selectedEvent)}</strong></div></div>
                    <div className="fact-card"><MapPin size={18} /><div><small>VENUE</small><strong>{getLocation(selectedEvent)}</strong></div></div>
                    <div className="fact-card"><Clock3 size={18} /><div><small>CAPACITY</small><strong>{selectedEvent.capacity ?? "—"} seats</strong></div></div>
                    <div className="fact-card"><Users size={18} /><div><small>SEATS LEFT</small><strong>{selectedEvent.seats_left ?? (selectedEvent.capacity != null && selectedEvent.booked_seats != null ? Math.max(selectedEvent.capacity - selectedEvent.booked_seats, 0) : "See availability")}</strong></div></div>
                  </div>
                </div>
                <div className="detail-panel about-panel">
                  <h2><Info size={19} /> About this event</h2>
                  <p>{selectedEvent.description || `Join fellow students at ${selectedEvent.title}. Meet campus builders, learn something new, and connect with your community. Event information is provided by the organizer.`}</p>
                  <div className="capacity-row"><span>Session capacity</span><strong>{selectedEvent.booked_seats ?? "—"} / {selectedEvent.capacity ?? "—"} registered</strong></div>
                  {selectedEvent.capacity != null && <div className="capacity-track"><span style={{ width: `${Math.min(100, ((selectedEvent.booked_seats || 0) / selectedEvent.capacity) * 100)}%` }} /></div>}
                </div>
              </div>
              <aside className="register-panel">
                <span className="eyebrow">SAVE YOUR SPOT</span>
                <h2>Be part of it.</h2>
                <p>Register now and join your fellow students at {selectedEvent.title}.</p>
                <div className="aside-fact"><MapPin size={16} /><span>{getLocation(selectedEvent)}</span></div>
                <div className="aside-fact"><CalendarDays size={16} /><span>{getDate(selectedEvent)}</span></div>
                <button className="primary-button full-button" onClick={() => void register()} disabled={registering || detailLoading || selectedEvent.status !== "open" || selectedEvent.seats_left === 0}>
                  {registering ? "Registering..." : selectedEvent.status !== "open" ? "Registration closed" : selectedEvent.seats_left === 0 ? "Event full" : "Register now"}
                  {!registering && <ArrowRight size={17} />}
                </button>
                <p className="fine-print"><Check size={14} /> Free to join. Your seat is confirmed instantly.</p>
                {detailLoading && <p className="loading-note">Refreshing event details…</p>}
              </aside>
            </div>
            <button className="text-button registrations-cta" onClick={() => navigate("registrations")}>See my registrations <ArrowRight size={16} /></button>
          </section>
        )}

        {page === "registrations" && (
          <section className="registrations-page">
            <div className="section-heading registrations-heading">
              <div><p className="eyebrow">YOUR CAMPUS PLANS</p><h1>My registrations</h1></div>
              <button className="secondary-button" onClick={() => void loadRegistrations()} disabled={registrationsLoading}>↻ <span>Sync</span></button>
            </div>
            {error && <ErrorBanner message={error} onRetry={() => void loadRegistrations()} />}
            {registrationsLoading ? <LoadingState label="Loading your registrations..." /> : registrations.length === 0 ? (
              <div className="empty-state"><div className="empty-icon"><Ticket size={24} /></div><h3>Your next great experience starts here</h3><p>You haven’t registered for any events yet. Explore what’s happening on campus.</p><button className="primary-button" onClick={() => navigate("explore")}>Explore events <ArrowRight size={16} /></button></div>
            ) : (
              <>
                <div className="confirmed-card">
                  <div className="confirmed-icon"><CheckCircle2 size={27} /></div>
                  <span className="pill green">Confirmed</span>
                  <h2>You’re on the list!</h2>
                  <p>Your registration is confirmed. We’ll see you at your next campus event.</p>
                  <div className="ticket-code"><div><small>REGISTRATION ID</small><strong>#{registrations[0].id.slice(0, 8).toUpperCase()}</strong></div><Ticket size={25} /></div>
                  <button className="primary-button full-button" onClick={() => { const found = events.find((event) => event.id === registrations[0].events?.id); if (found) void openEvent(found); else navigate("explore"); }}>Explore your event <ArrowDown size={17} /></button>
                </div>
                <div className="registrations-list-heading"><h2>Active registrations <span className="count-badge">{registrations.length}</span></h2><span className="upcoming-tab">All registrations</span></div>
                <div className="registration-list">
                  {registrations.map((registration, index) => (
                    <article className="registration-card" key={registration.id}>
                      <div className={`registration-date date-${index % 3}`}><CalendarDays size={19} /></div>
                      <div className="registration-info">
                        <div className="registration-title-row"><h3>{registration.events?.title || "Campus event"}</h3><span className="pill green"><Check size={13} /> Registered</span></div>
                        <p><MapPin size={15} /> {registration.events ? getLocation(registration.events) : "Campus venue"}</p>
                        {registration.created_at && <p><Clock3 size={15} /> Registered {new Intl.DateTimeFormat("en", { month: "short", day: "numeric" }).format(new Date(registration.created_at))}</p>}
                      </div>
                      <span className="registration-id">#{registration.id.slice(0, 8).toUpperCase()}</span>
                    </article>
                  ))}
                </div>
              </>
            )}
          </section>
        )}
      </main>

      <footer className="footer"><div className="footer-inner"><button className="footer-brand" onClick={() => navigate("explore")}><Compass size={18} /> CampusConnect</button><span>Made for campus communities</span><span>© 2025 CampusConnect</span></div></footer>
      <nav className="mobile-nav" aria-label="Mobile navigation">
        <button className={page !== "registrations" ? "mobile-nav-item active" : "mobile-nav-item"} onClick={() => navigate("explore")}><Compass size={20} /><span>Explore</span></button>
        <button className={page === "registrations" ? "mobile-nav-item active" : "mobile-nav-item"} onClick={() => navigate("registrations")}><Ticket size={20} /><span>Registrations</span></button>
        <button className="mobile-nav-item" onClick={() => navigate("explore")}><Users size={20} /><span>Clubs</span></button>
        <button className="mobile-nav-item" onClick={() => navigate("explore")}><span className="profile-nav-icon">S</span><span>Profile</span></button>
      </nav>
    </div>
  );
}

function EventCard({ event, index, saved, onOpen, onSave }: {
  event: EventItem;
  index: number;
  saved: boolean;
  onOpen: () => void;
  onSave: () => void;
}) {
  const remaining = event.seats_left ?? (event.capacity != null && event.booked_seats != null ? Math.max(event.capacity - event.booked_seats, 0) : null);
  const isLow = remaining !== null && remaining <= 8;
  const image = event.image_url || eventImages[index % eventImages.length];
  return (
    <article className="event-card">
      <button className="event-image" style={{ backgroundImage: `linear-gradient(180deg, rgba(14, 17, 38, .08), rgba(14, 17, 38, .62)), url("${image}")` }} onClick={onOpen} aria-label={`View ${event.title}`}>
        <span className="image-category">{getCategory(event)}</span>
        <span className={isLow ? "image-seats low" : "image-seats"}>{remaining == null ? "Registration open" : remaining === 0 ? "Event full" : `${remaining} seats left`}</span>
        <span className="image-date"><CalendarDays size={14} /> {getDate(event)}</span>
      </button>
      <div className="event-content">
        <div className="event-title-row"><h3>{event.title}</h3><span className={event.status === "open" ? "status-dot open" : "status-dot"} title={event.status || "Unknown status"} /></div>
        <p className="event-description">{event.description || `Meet, make, and learn with fellow students at ${event.title}.`}</p>
        <div className="event-meta"><span><MapPin size={15} /> {getLocation(event)}</span><span><Users size={15} /> {event.capacity ?? "—"} spots</span></div>
        {event.capacity != null && event.booked_seats != null && <div className="mini-capacity"><span style={{ width: `${Math.min(100, (event.booked_seats / event.capacity) * 100)}%` }} /></div>}
        <div className="event-actions"><button className="primary-button" onClick={onOpen}>View details <ChevronRight size={17} /></button><button className={saved ? "save-button saved" : "save-button"} onClick={onSave} aria-label={saved ? "Remove saved event" : "Save event"}><Bookmark size={18} fill={saved ? "currentColor" : "none"} /></button></div>
      </div>
    </article>
  );
}

function ErrorBanner({ message, onRetry }: { message: string; onRetry: () => void }) {
  return <div className="error-banner" role="alert"><Info size={18} /><span>{message}</span><button onClick={onRetry}>Try again</button></div>;
}

function LoadingState({ label }: { label: string }) {
  return <div className="loading-state"><span className="spinner" /><p>{label}</p></div>;
}

export default App;
