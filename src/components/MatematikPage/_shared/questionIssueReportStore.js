export const QUESTION_ISSUE_REPORTS_KEY = 'mathQuestionIssueReports';

function readRaw() {
  if (typeof window === 'undefined') return [];
  try {
    const value = window.localStorage.getItem(QUESTION_ISSUE_REPORTS_KEY);
    return value ? JSON.parse(value) : [];
  } catch {
    return [];
  }
}

export async function getQuestionIssueReports() {
  return readRaw();
}

export async function saveQuestionIssueReport(report) {
  if (typeof window === 'undefined') return;
  const reports = readRaw();
  reports.push(report);
  window.localStorage.setItem(QUESTION_ISSUE_REPORTS_KEY, JSON.stringify(reports));
}

export async function clearQuestionIssueReports() {
  if (typeof window === 'undefined') return;
  window.localStorage.removeItem(QUESTION_ISSUE_REPORTS_KEY);
}
