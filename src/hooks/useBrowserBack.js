import { useCallback, useEffect, useRef } from 'react';

const GUARD_KEY = '__mathAdventureBackGuard';
const LISTENER_KEY = '__mathAdventureBackListener';
const handlers = [];
let fallbackRef = null;
let guardArmed = false;

function guardState() {
  const current = window.history.state;
  return { ...(current && typeof current === 'object' ? current : {}), [GUARD_KEY]: true };
}

function armGuard() {
  if (!window.history.state?.[GUARD_KEY]) {
    window.history.pushState(guardState(), '', window.location.href);
  }
  guardArmed = true;
}

function onPopState(event) {
  if (!guardArmed) {
    guardArmed = Boolean(event.state?.[GUARD_KEY]);
    return;
  }

  guardArmed = false;
  const handler = handlers.at(-1)?.current || fallbackRef?.current;
  if (!handler) {
    window.history.back();
    return;
  }

  armGuard();
  handler();
}

function installListener() {
  const previous = window[LISTENER_KEY];
  if (previous) window.removeEventListener('popstate', previous);
  window[LISTENER_KEY] = onPopState;
  window.addEventListener('popstate', onPopState);
  guardArmed = Boolean(window.history.state?.[GUARD_KEY]);
  armGuard();

  return () => {
    if (window[LISTENER_KEY] !== onPopState) return;
    window.removeEventListener('popstate', onPopState);
    delete window[LISTENER_KEY];
  };
}

export function useBrowserBackHandler(onBack) {
  const handlerRef = useRef(onBack);
  const enabled = typeof onBack === 'function';

  useEffect(() => {
    handlerRef.current = onBack;
  }, [onBack]);

  useEffect(() => {
    if (!enabled) return undefined;
    handlers.push(handlerRef);
    return () => {
      const index = handlers.lastIndexOf(handlerRef);
      if (index >= 0) handlers.splice(index, 1);
    };
  }, [enabled]);

  return handlerRef;
}

export function useBrowserBackFallback(onBack, enabled) {
  const handlerRef = useRef(onBack);

  useEffect(() => {
    handlerRef.current = enabled ? onBack : null;
  }, [enabled, onBack]);

  useEffect(() => {
    fallbackRef = handlerRef;
    const uninstall = installListener();
    return () => {
      if (fallbackRef === handlerRef) fallbackRef = null;
      uninstall();
    };
  }, []);
}

export default function useBrowserBack(onBack) {
  const handlerRef = useBrowserBackHandler(onBack);

  return useCallback(() => {
    if (!handlerRef.current) return;
    if (guardArmed) window.history.back();
    else handlerRef.current();
  }, [handlerRef]);
}
