import React, { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { baseApplications, getAppSlug } from "./MobileApps";
import "../styles/detailsmobileapp.css";

const STORAGE_KEY = "developer-console-downloads-v1";

async function getRepoCounters() {
	if (typeof window === "undefined") return {};

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
	if (typeof window === "undefined") return {};

	try {
		const raw = window.localStorage.getItem(STORAGE_KEY);
		return raw ? JSON.parse(raw) : {};
	} catch (error) {
		return {};
	}
}

function persistDownloads(apps) {
	if (typeof window === "undefined") return;

	const snapshot = {};
	apps.forEach((app) => {
		snapshot[app.packageName] = { downloads: app.downloads };
	});
	window.localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot));
}

function formatCompactNumber(value) {
	if (typeof value !== "number" || Number.isNaN(value)) return "—";
	if (value >= 1000000) return `${(value / 1000000).toFixed(1).replace(/\.0$/, "")}M+`;
	if (value >= 1000) return `${(value / 1000).toFixed(1).replace(/\.0$/, "")}K+`;
	return `${value.toLocaleString()}`;
}

function AppIcon({ app, large = false }) {
	if (app.image) {
		return (
			<img
				src={app.image}
				alt={`${app.name} logo`}
				className={`detail-app-logo ${large ? "detail-app-logo-large" : ""}`}
			/>
		);
	}

	return <div className="detail-app-icon">{app.icon}</div>;
}

function StatusBadge({ status }) {
	return <span className="detail-status-badge">{status}</span>;
}

function DetailMeta({ label, value }) {
	return (
		<div className="detail-meta-card">
			<span className="detail-meta-label">{label}</span>
			<strong className="detail-meta-value">{value}</strong>
		</div>
	);
}

export default function DetailsMobileApp() {
	const navigate = useNavigate();
	const { appId } = useParams();
	const [theme, setTheme] = useState("dark");

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

	const app = useMemo(() => {
		if (!appId) return null;
		return apps.find((item) => getAppSlug(item) === appId) || null;
	}, [appId, apps]);

	const handleDownload = () => {
		if (!app) return;

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

		// Increment the download counter
		setApps((currentApps) => {
			const nextApps = currentApps.map((item) => {
				if (item.packageName !== app.packageName) return item;
				return { ...item, downloads: item.downloads + 1 };
			});
			persistDownloads(nextApps);
			return nextApps;
		});
	};

	if (!app) {
		return (
			<div className="detail-mobile-page empty-detail-page">
				<div className="detail-empty-card">
					<h2>App not found</h2>
					<button className="detail-primary-button" type="button" onClick={() => navigate("/androidapps_store")}>
						Back to dashboard
					</button>
				</div>
			</div>
		);
	}

	return (
		<div className={`detail-mobile-page ${theme === "light" ? "light-mode" : "dark-mode"}`}>
			<div className="detail-mobile-shell">
				<header className="detail-mobile-header">
					<button className="detail-back-button" type="button" onClick={() => navigate("/androidapps_store")}>
						← Back
					</button>

					<div className="detail-mobile-actions">
						<button
							className="detail-theme-toggle"
							type="button"
							onClick={() => setTheme((current) => (current === "dark" ? "light" : "dark"))}
						>
							{theme === "dark" ? "☀ Light" : "☾ Dark"}
						</button>
						<button className="detail-home-button" type="button" onClick={() => navigate("/")}>
							Home
						</button>
					</div>
				</header>

				<main className="detail-app-main">
					<section className="detail-hero-card">
						<div className="detail-hero-left">
							<AppIcon app={app} large />
							<div className="detail-app-text">
								<span className="detail-app-kicker">Application</span>
								<h1>{app.name}</h1>
								<p>{app.packageName}</p>
								<StatusBadge status={app.status} />
							</div>
						</div>

						<div className="detail-hero-actions">
							<button className="detail-primary-button" type="button" onClick={handleDownload}>
								Download app
							</button>
						</div>
					</section>

					<section className="detail-metrics-grid">
						<DetailMeta label="Current users" value={formatCompactNumber(app.downloads)} />
						<DetailMeta label="Category" value={app.category} />
						<DetailMeta label="Version" value={app.version} />
						<DetailMeta label="Last updated" value={app.updated} />
					</section>

					<section className="detail-info-card">
						<h2>About this app</h2>
						<p>{app.summary}</p>
					</section>

					<section className="detail-info-card">
						<h2>Release information</h2>
						<div className="detail-table">
							<div className="detail-row">
								<span>Package name</span>
								<strong>{app.packageName}</strong>
							</div>
							<div className="detail-row">
								<span>Platform</span>
								<strong>Android</strong>
							</div>
							<div className="detail-row">
								<span>API</span>
								<strong>{app.api}</strong>
							</div>
							<div className="detail-row">
								<span>SDK</span>
								<strong>{app.sdk}</strong>
							</div>
							
						</div>
					</section>

					<section className="detail-gallery-card">
						<h2>Screenshots</h2>
						<div className="detail-screenshot-grid">
							{(app.screenshots || []).map((image, index) => (
								<img
									key={`${app.packageName}-screen-${index}`}
									className="detail-screenshot"
									src={image}
									alt={`${app.name} screenshot ${index + 1}`}
								/>
							))}
						</div>
					</section>

					<section className="detail-feature-card">
						<h2>Features</h2>
						<ul className="detail-feature-list">
							{(app.features || []).map((feature) => (
								<li key={`${app.packageName}-${feature}`}>{feature}</li>
							))}
						</ul>
					</section>
				</main>
			</div>
		</div>
	);
}
