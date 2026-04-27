/**
 * Analytics utility — wraps both Firebase Analytics and GA4 gtag.
 * Only initialises in production (NEXT_PUBLIC_ANALYTICS_ENABLED=true or NODE_ENV=production).
 */

import type { Analytics } from 'firebase/analytics';

let analytics: Analytics | null = null;

async function getAnalytics(): Promise<Analytics | null> {
  if (typeof window === 'undefined') return null;
  if (process.env.NODE_ENV !== 'production') return null;

  if (analytics) return analytics;

  const { getAnalytics: _getAnalytics, isSupported } = await import('firebase/analytics');
  const { app } = await import('./firebase');

  if (!(await isSupported())) return null;

  analytics = _getAnalytics(app);
  return analytics;
}

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

function gtagEvent(eventName: string, params?: Record<string, unknown>) {
  if (typeof window === 'undefined') return;
  if (process.env.NODE_ENV !== 'production') return;
  if (typeof (window as Window & { gtag?: Function }).gtag !== 'function') return;
  (window as Window & { gtag: Function }).gtag('event', eventName, params);
}

async function firebaseEvent(eventName: string, params?: Record<string, unknown>) {
  const a = await getAnalytics();
  if (!a) return;
  const { logEvent } = await import('firebase/analytics');
  logEvent(a, eventName, params);
}

async function track(eventName: string, params?: Record<string, unknown>) {
  gtagEvent(eventName, params);
  await firebaseEvent(eventName, params);
}

// ---------------------------------------------------------------------------
// Typed event helpers
// ---------------------------------------------------------------------------

export async function trackPageView(url: string) {
  await track('page_view', { page_path: url });
}

export async function trackVideoPlay(params: {
  playbackId: string;
  title: string;
  pageUrl?: string;
}) {
  await track('video_play', params);
}

export async function trackStudyOpened(params: {
  studyId: string;
  title: string;
}) {
  await track('study_opened', params);
}

export async function trackGameStarted(params: {
  gameId: string;
  title: string;
}) {
  await track('game_started', params);
}

export async function trackDevotionOpened(params: {
  devotionId: string;
  title: string;
}) {
  await track('devotion_opened', params);
}

export async function trackSubscribeClicked(params?: {
  location?: string;
}) {
  await track('subscribe_clicked', params);
}
