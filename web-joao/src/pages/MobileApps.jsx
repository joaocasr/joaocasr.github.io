import React, { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/developerconsole.css";

const STORAGE_KEY = "developer-console-downloads-v1";

export const baseApplications = [
	{
		name: "Found Footage Creep",
		packageName: "com.movies.foundfootage",
		category: "Entertainment",
		status: "Published",
		version: "1.0",
		updated: "14/09/2022",
		icon: "🎥",
		iconClass: "red",
		image: "/p0-icon.png",
		downloads: 2,
        apk:"/apk/ffc.apk",
        api:"+24",
        sdk:31,
		summary:
			"FFC is a database app of information related to found footage movies. Here you'll be able to find all the found footage genre movies and the future realeases as well. More than 1,000 movies, shorts and videos. You can create your own watchlist to never forget that one found footage movie that you're interested on. You'll be able to like the movies you love so much.",
		screenshots: ["/demos/sc1.jpg", "/demos/sc2.jpg", "/demos/sc3.jpg"],
		features: [
			"Search and filter by criteria found-footage movies",
			"Handle your watchlist and likes."
		],
	},
	{
		name: "HPHSounds",
		packageName: "com.harrypotter.potteraudio",
		category: "Music & Audio",
		status: "Published",
		version: "1.4",
		updated: "03/10/2023",
		icon: "♫",
		iconClass: "purple",
		image: "/p18-icon.png",
		downloads: 0,
        api:"+24",
        sdk:33,
        apk:"/apk/hpsounds.apk",
		summary:
			"A compact audio-visual app for curated sounds, ambient loops, and music-inspired listening moments of Harry Potter Universe.",
		screenshots: ["/demos/sc35.jpg", "/demos/sc36.jpg", "/demos/sc37.jpg"],
		features: [
			"Curated ambient audio loops",
			"Designed for calm listening sessions",
			"Simple and lightweight app experience",
		],
	},
	{
		name: "JMaster — Learn Basic Japanese",
		packageName: "com.jmaster.japaneseapp",
		category: "Education",
		status: "Published",
		version: "1.0",
		updated: "20/08/2022",
		icon: "あ",
		iconClass: "blue",
		image: "/p10-icon.png",
		downloads: 1,
        apk:"/apk/jmaster.apk",
        api:"+21",
        sdk:31,
		summary:
			"JMaster is an application for learning and deepening your knowledge in Japanese. This is an application for all those who want to master and study the Japanese language. In this app you can find hiragana and katakana quizzes, dictionary, as well as N4 and N5 kanji. There is a complementary section with listening and reading exercises. Note that this application is still at an early stage and that future upgrades will be carried out.",
		screenshots: ["/demos/sc24.JPG","/demos/sc25.jpg","/demos/sc26.jpg"],
		features: [
			"Basic vocabulary learning flow",
			"Reading and recognition practice",
            "Quizzes and japanese dictionary",
			"Beginner-friendly progression structure",
		],
	},
	{
		name: "Japanese Kanji — Flashcards",
		packageName: "com.japanese.KanjiCards",
		category: "Education",
		status: "Published",
		version: "1.0",
		updated: "2022-2026",
		icon: "漢",
		iconClass: "amber",
		image: "/p17-icon.png",
		downloads: 1,
        apk:"/apk/kanji.apk",
        api:"+24",
        sdk:31,
		summary:
			"A flashcard-driven Kanji study app focused on recall, recognition, and daily practice for learners. 2,000 Kanji ready for you to learn.",
		screenshots: ["/demos/sc17-01.jpg", "/demos/sc17-02.jpg", "/demos/sc17-03.jpg", "/demos/sc17-04.jpg"],
		features: [
			"Flashcards list section",
			"Kanji search section",
			"Flashcard Kanji creation section",
			"Flashcard Study section"
		],
	},
];

function formatCompactNumber(value) {
	if (typeof value !== "number" || Number.isNaN(value)) {
		return "—";
	}

	if (value >= 1000000) {
		return `${(value / 1000000).toFixed(1).replace(/\.0$/, "")}M+`;
	}

	if (value >= 1000) {
		return `${(value / 1000).toFixed(1).replace(/\.0$/, "")}K+`;
	}

	return `${value.toLocaleString()}`;
}

export function getAppSlug(app) {
	return app.packageName
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-+|-+$/g, "");
}

async function getRepoCounters() {
	if (typeof window === "undefined") {
		return {};
	}

	try {
		const response = await fetch("/counters.json");
		if (!response.ok) throw new Error("Failed to load counters");
		return await response.json();
	} catch (error) {
		console.warn("Could not load counters.json:", error);
		return {};
	}
}

function getStoredDownloads() {
	if (typeof window === "undefined") {
		return {};
	}

	try {
		const raw = window.localStorage.getItem(STORAGE_KEY);
		return raw ? JSON.parse(raw) : {};
	} catch (error) {
		return {};
	}
}

function persistDownloads(apps) {
	if (typeof window === "undefined") {
		return;
	}

	const snapshot = {};

	apps.forEach((app) => {
		snapshot[app.packageName] = {
			downloads: app.downloads,
		};
	});

	window.localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot));
}

function AppIcon({ app, large = false }) {
	if (app.image) {
		return (
			<img
				src={app.image}
				alt={`${app.name} logo`}
				className={`app-logo ${large ? "app-logo-large" : ""}`}
			/>
		);
	}

	return (
		<div
			className={`app-icon app-icon-${app.iconClass} ${
				large ? "app-icon-large" : ""
			}`}
		>
			{app.icon}
		</div>
	);
}

function StatusBadge({ status }) {
	return (
		<span className={`status-badge status-${status.toLowerCase()}`}>
			<span className="status-dot" />
			{status}
		</span>
	);
}

function Sidebar({ active, onGoHome }) {
	const items = [{ id: "dashboard", label: "Store", icon: "꓂" }];

	return (
		<aside className="sidebar">
			<div className="sidebar-header">
				<div className="developer-logo">JC</div>

				<div>
					<div className="console-title">Android Apps Store</div>
					<div className="console-subtitle">João Castro</div>
				</div>
			</div>

			<nav className="sidebar-nav">
				<button className="nav-item home-link" type="button" onClick={onGoHome}>
					<span className="nav-icon">⌂</span>
					Home
				</button>

				{items.map((item) => (
					<button
						key={item.id}
						className={`nav-item ${
							active === item.id ? "nav-item-active" : ""
						}`}
						type="button"
					>
						<span className="nav-icon">{item.icon}</span>
						{item.label}
					</button>
				))}
			</nav>
		</aside>
	);
}

function SummaryCard({ label, value }) {
	return (
		<div className="summary-card">
			<div className="summary-label">{label}</div>
			<div className="summary-value">{value}</div>
		</div>
	);
}

function AppRow({ app, onClick, onDownload }) {
	return (
		<div
			className="app-row"
			onClick={onClick}
			role="button"
			tabIndex={0}
			onKeyDown={(event) => {
				if (event.key === "Enter" || event.key === " ") {
					event.preventDefault();
					onClick();
				}
			}}
		>
			<div className="app-name-cell">
				<AppIcon app={app} />

				<div className="app-main-info">
					<div className="app-name">{app.name}</div>
					<div className="package-name">{app.packageName}</div>
				</div>
			</div>

			<div className="app-column category-column">
				<div className="column-label">Category</div>
				<div className="column-value">{app.category}</div>
			</div>

			<div className="app-column version-column">
				<div className="column-label">Version</div>
				<div className="column-value">{app.version}</div>
			</div>

			<div className="app-column downloads-column">
				<div className="column-label">Downloads</div>
				<div className="column-value">{formatCompactNumber(app.downloads)}</div>
			</div>

			<div className="status-column">
				<StatusBadge status={app.status} />
			</div>

			<div className="app-actions">
				<button
					className="download-row-button"
					type="button"
					onClick={(event) => {
						event.stopPropagation();
						onDownload(app);
					}}
				>
					Download APK
				</button>
			</div>
		</div>
	);
}

function InfoCard({ label, value }) {
	return (
		<div className="info-card">
			<div className="info-label">{label}</div>
			<div className="info-value">{value}</div>
		</div>
	);
}

function DetailRow({ label, value }) {
	return (
		<div className="detail-row">
			<span className="detail-label">{label}</span>
			<span className="detail-value">{value}</span>
		</div>
	);
}

function AppDetails({ app, onClose, onDownload }) {
	return (
		<div className="details-overlay">
			<div className="details-panel">
				<div className="details-header">
					<button className="back-button" onClick={onClose} type="button">
						← Back
					</button>

					<button className="close-button" onClick={onClose} type="button">
						×
					</button>
				</div>

				<div className="details-content">
					<div className="app-details-heading">
						<AppIcon app={app} large />

						<div>
							<h2>{app.name}</h2>
							<p>{app.packageName}</p>
						</div>
					</div>

					<div className="details-status">
						<StatusBadge status={app.status} />
					</div>

					<div className="info-grid">
						<InfoCard label="Users now" value={app.downloads} />
						<InfoCard label="Category" value={app.category} />
					</div>

					<section className="details-section">
						<h3>Release information</h3>

						<div className="details-table">
							<DetailRow label="Last updated" value={app.updated} />
							<DetailRow label="Package name" value={app.packageName} />
							<DetailRow label="Platform" value="Android" />
							<DetailRow label="SDK" value={app.sdk} />
						</div>
					</section>

					<section className="details-section">
						<h3>Distribution</h3>

						<div className="distribution-card">
							<div>
								<div className="distribution-title">Android APK</div>
								<div className="distribution-subtitle">Direct distribution</div>
							</div>

							<button
								className="download-button"
								type="button"
								onClick={() => onDownload(app)}
							>
								Download
							</button>
						</div>
					</section>

					<section className="details-section">
						<h3>Screenshots</h3>

						<div className="screenshots-grid">
							{app.screenshots.map((screenshot, index) => (
								<img
									key={index}
									src={screenshot}
									alt={`Screenshot ${index + 1} of ${app.name}`}
									className="app-screenshot"
								/>
							))}
						</div>
					</section>

					<section className="details-section">
						<h3>Features</h3>

						<ul className="features-list">
							{app.features.map((feature, index) => (
								<li key={index} className="feature-item">
									{feature}
								</li>
							))}
						</ul>
					</section>
				</div>
			</div>
		</div>
	);
}

function AppStoreDetailPage({ app, onDownload, onBack }) {
	return (
		<div className="app-page-shell">
			<div className="app-page-header">
				<button className="back-button app-page-back" onClick={onBack} type="button">
					← Back to dashboard
				</button>
			</div>

			<div className="app-page-hero">
				<AppIcon app={app} large />

				<div className="app-page-identity">
					<div className="eyebrow">APPLICATION</div>
					<h1>{app.name}</h1>
					<p>{app.packageName}</p>
					<div className="detail-page-status">
						<StatusBadge status={app.status} />
					</div>
				</div>
			</div>

			<div className="app-page-grid">
				<InfoCard label="Current users" value={formatCompactNumber(app.downloads)} />
				<InfoCard label="Category" value={app.category} />
				<InfoCard label="Version" value={app.version} />
				<InfoCard label="Last updated" value={app.updated} />
			</div>

			<div className="app-page-content">
				<section className="details-section">
					<h3>About this app</h3>
					<p className="story-copy">{app.summary}</p>
				</section>

				<section className="details-section">
					<h3>Release information</h3>

					<div className="details-table">
						<DetailRow label="Package name" value={app.packageName} />
						<DetailRow label="Platform" value="Android" />
						<DetailRow label="SDK" value={app.sdk} />
					</div>
				</section>

				<section className="details-section">
					<h3>Screenshots</h3>

					<div className="screenshots-grid">
						{app.screenshots.map((screenshot, index) => (
							<img
								key={index}
								src={screenshot}
								alt={`Screenshot ${index + 1} of ${app.name}`}
								className="app-screenshot"
							/>
						))}
					</div>
				</section>

				<section className="details-section">
					<h3>Features</h3>

					<ul className="features-list">
						{app.features.map((feature, index) => (
							<li key={index} className="feature-item">
								{feature}
							</li>
						))}
					</ul>
				</section>
			</div>

			<div className="app-page-actions">
				<button
					className="download-button app-page-download"
					type="button"
					onClick={() => onDownload(app)}
				>
					Download app
				</button>
			</div>
		</div>
	);
}

export default function DeveloperConsole() {
	const navigate = useNavigate();
	const { appId } = useParams();
	const [theme, setTheme] = useState("dark");
	const [active, setActive] = useState("dashboard");
	const [query, setQuery] = useState("");
	const [filter, setFilter] = useState("All");
	const [selectedApp, setSelectedApp] = useState(null);

	const [apps, setApps] = useState(() => {
		const persisted = getStoredDownloads();

		return baseApplications.map((app) => {
			const saved = persisted[app.packageName] || {};
			const downloads = Number(saved.downloads ?? app.downloads);

			return {
				...app,
				downloads: Number.isFinite(downloads) ? downloads : app.downloads,
			};
		});
	});

	// Load repo counters on mount
	React.useEffect(() => {
		const loadRepoCounters = async () => {
			const repoCounters = await getRepoCounters();
			const persisted = getStoredDownloads();

			// Only update if repo counters are newer (no local override)
			if (Object.keys(repoCounters).length > 0) {
				setApps((currentApps) =>
					currentApps.map((app) => {
						const hasLocalOverride = persisted[app.packageName];
						if (!hasLocalOverride && repoCounters[app.packageName]) {
							return {
								...app,
								downloads: repoCounters[app.packageName].downloads,
							};
						}
						return app;
					})
			);
			}
		};

		loadRepoCounters();
	}, []);

	const filteredApps = useMemo(() => {
		return apps.filter((app) => {
			const search = query.toLowerCase();

			const matchesQuery =
				app.name.toLowerCase().includes(search) ||
				app.packageName.toLowerCase().includes(search);

			const matchesFilter = filter === "All" || app.status === filter;

			return matchesQuery && matchesFilter;
		});
	}, [apps, query, filter]);

	const selectedRouteApp = useMemo(() => {
		if (!appId) {
			return null;
		}

		return apps.find((app) => getAppSlug(app) === appId) || null;
	}, [appId, apps]);

	const publishedCount = apps.filter((app) => app.status === "Published").length;
	const totalDownloads = apps.reduce((sum, app) => sum + app.downloads, 0);

	const handleDownload = (app) => {
		if (!app.apk) {
			alert("APK file not available for this app.");
			return;
		}

		// Create a temporary link and trigger download
		const link = document.createElement("a");
		link.href = app.apk;
		link.download = `${app.packageName.replace(/\./g, "_")}.apk`;
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);

		// Also increment the download counter
		setApps((currentApps) => {
			const nextApps = currentApps.map((item) => {
				if (item.packageName !== app.packageName) {
					return item;
				}

				return {
					...item,
					downloads: item.downloads + 1,
				};
			});

			persistDownloads(nextApps);
			return nextApps;
		});
	};

	if (selectedRouteApp) {
		return (
			<div className={`console ${theme === "light" ? "light" : "dark"}`}>
				<div className="console-layout">
					<Sidebar active={active} onGoHome={() => navigate("/")} />

					<main className="main-content">
						<header className="topbar">
							<div className="mobile-brand">
								<div className="developer-logo">JC</div>
								<span>Developer Console</span>
							</div>

							<div className="topbar-page">App details</div>

							<div className="topbar-actions">
								<button
									className="theme-toggle"
									type="button"
									onClick={() =>
										setTheme((current) =>
											current === "dark" ? "light" : "dark"
										)
									}
								>
									{theme === "dark" ? "☀ Light" : "☾ Dark"}
								</button>

								<button
									className="user-avatar-button"
									type="button"
									onClick={() => navigate("/")}
									aria-label="Go to home page"
								>
									<img
										className="user-avatar-image"
										src="/profile.png"
										alt="Default profile"
									/>
								</button>
							</div>
						</header>

						<div className="page app-page-wrap">
							<AppStoreDetailPage
								app={selectedRouteApp}
								onDownload={handleDownload}
								onBack={() => navigate("/androidapps_store")}
							/>
						</div>
					</main>
				</div>
			</div>
		);
	}

	return (
		<div className={`console ${theme === "light" ? "light" : "dark"}`}>
			<div className="console-layout">
				<Sidebar active={active} onGoHome={() => navigate("/")} />

				<main className="main-content">
					<header className="topbar">
						<div className="mobile-brand">
							<div className="developer-logo">JC</div>
							<span>Developer Console</span>
						</div>

						<div className="topbar-page">Android Apps Store - programmer: João Castro</div>

						<div className="topbar-actions">
							<button
								className="theme-toggle"
								type="button"
								onClick={() =>
									setTheme((current) =>
										current === "dark" ? "light" : "dark"
									)
								}
							>
								{theme === "dark" ? "☀ Light" : "☾ Dark"}
							</button>

							<button
								className="user-avatar-button"
								type="button"
								onClick={() => navigate("/")}
								aria-label="Go to home page"
							>
								<img
									className="user-avatar-image"
									src="/profile.png"
									alt="Default profile"
								/>
							</button>
						</div>
					</header>

					<div className="page">
						<div className="page-heading">
							<div>
								<div className="eyebrow">STORE</div>

								<h1>Android Apps | João's Store</h1>

								<p>
									This is an android app store with applications within categories like entertainment, music and education.
                                    Previous versions had ads for rentability, but now they are all add-free and free to use. Happy downloads!
								</p>
							</div>
						</div>

						<div className="summary-grid">
							<SummaryCard label="Total apps" value={apps.length} />
							<SummaryCard label="Published" value={publishedCount} />
							<SummaryCard
								label="Downloads"
								value={formatCompactNumber(totalDownloads)}
							/>
							<SummaryCard label="Platform" value="Android" />
						</div>

						<div className="toolbar">
							<div className="search-wrapper">
								<span className="search-icon">⌕</span>

								<input
									value={query}
									onChange={(e) => setQuery(e.target.value)}
									placeholder="Search apps or package names"
								/>
							</div>

							<div className="filter-tabs">
								{["All", "Published"].map((option) => (
									<button
										key={option}
										onClick={() => setFilter(option)}
										className={
											filter === option
												? "filter-tab filter-tab-active"
												: "filter-tab"
										}
										type="button"
									>
										{option}
									</button>
								))}
							</div>
						</div>

						<section className="apps-container">
							<div className="apps-header">
								<div>Application</div>
								<div>Category</div>
								<div>Version</div>
								<div>Downloads</div>
								<div>Status</div>
								<div>Actions</div>
							</div>

							{filteredApps.length > 0 ? (
								<div className="apps-list">
									{filteredApps.map((app) => (
										<AppRow
											key={app.packageName}
											app={app}
											onClick={() =>
												navigate(`/androidapps_store/${getAppSlug(app)}`)
											}
											onDownload={handleDownload}
										/>
									))}
								</div>
							) : (
								<div className="empty-state">
									<div className="empty-title">No applications found</div>

									<div className="empty-description">
										Try another search term or filter.
									</div>
								</div>
							)}
						</section>

						<footer className="footer">
						</footer>
					</div>
				</main>
			</div>

			{selectedApp && (
				<AppDetails
					app={selectedApp}
					onClose={() => setSelectedApp(null)}
					onDownload={handleDownload}
				/>
			)}
		</div>
	);
}
