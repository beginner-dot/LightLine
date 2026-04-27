'use client';

import { useEffect, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import {
  trackDevotionOpened,
  trackGameStarted,
  trackPageView,
  trackStudyOpened,
  trackSubscribeClicked,
  trackVideoPlay,
} from '@/lib/analytics';

function getPathWithQuery(pathname: string, searchParams: URLSearchParams) {
  const qs = searchParams.toString();
  return qs ? `${pathname}?${qs}` : pathname;
}

export function AnalyticsTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const trackedMedia = useRef<Set<string>>(new Set());

  useEffect(() => {
    if (!pathname) return;
    void trackPageView(getPathWithQuery(pathname, searchParams));

    const lessonMatch = pathname.match(/^\/course\/([^/]+)\/([^/]+)$/);
    if (lessonMatch) {
      const [, moduleId, lessonId] = lessonMatch;
      void trackStudyOpened({
        studyId: `${moduleId}/${lessonId}`,
        title: `Lesson ${lessonId}`,
      });
    }

    const devotionMatch = pathname.match(/^\/devotion(?:\/([^/]+))?$/);
    if (devotionMatch) {
      const devotionId = devotionMatch[1] ?? 'daily';
      void trackDevotionOpened({
        devotionId,
        title: `Devotion ${devotionId}`,
      });
    }
  }, [pathname, searchParams]);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const trackedEl = target?.closest<HTMLElement>('[data-analytics-event]');
      if (!trackedEl) return;

      const eventName = trackedEl.dataset.analyticsEvent;
      const id = trackedEl.dataset.analyticsId ?? 'unknown';
      const title = trackedEl.dataset.analyticsTitle ?? trackedEl.textContent?.trim() ?? 'unknown';
      const location = trackedEl.dataset.analyticsLocation ?? pathname ?? '/';

      if (eventName === 'study_opened') {
        void trackStudyOpened({ studyId: id, title });
      }
      if (eventName === 'game_started') {
        void trackGameStarted({ gameId: id, title });
      }
      if (eventName === 'devotion_opened') {
        void trackDevotionOpened({ devotionId: id, title });
      }
      if (eventName === 'subscribe_clicked') {
        void trackSubscribeClicked({ location });
      }
    };

    const onPlay = (event: Event) => {
      const media = event.target as HTMLMediaElement | null;
      if (!media || media.tagName.toLowerCase() !== 'video') return;

      const playbackId = media.getAttribute('data-playback-id') ?? media.currentSrc ?? 'unknown';
      const dedupeKey = `${pathname ?? ''}|${playbackId}`;
      if (trackedMedia.current.has(dedupeKey)) return;
      trackedMedia.current.add(dedupeKey);

      const title = media.getAttribute('title') ?? document.title;
      void trackVideoPlay({
        playbackId,
        title,
        pageUrl: pathname ?? '/',
      });
    };

    document.addEventListener('click', onClick);
    document.addEventListener('play', onPlay, true);

    return () => {
      document.removeEventListener('click', onClick);
      document.removeEventListener('play', onPlay, true);
    };
  }, [pathname]);

  return null;
}
