// The current app stores the user's name as playerName.
export function hasFullSubjectAccess(username) {
  return username === 'Iman18Aiman23';
}

export function canAccessSubject(username, subject) {
  return hasFullSubjectAccess(username)
    || ['reading', 'bm', 'math', 'jawi', 'pendidikan-islam-v1'].includes(subject);
}
