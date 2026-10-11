import { cloneElement, isValidElement } from 'react';

export function prioritizeHeroMascot(mascot) {
  if (!isValidElement(mascot) || mascot.type !== 'img') return mascot;

  return cloneElement(mascot, {
    fetchPriority: mascot.props.fetchPriority ?? 'high',
    loading: mascot.props.loading ?? 'eager',
  });
}
