const LEGACY_KEY = 'mathQuestionIssueReports';
export const QUESTION_ISSUE_REPORTS_KEY = `${LEGACY_KEY}:v2`;
const MAX_REPORTS = 25;

function readRaw() {
  if (typeof window === 'undefined') return [];
  try {
    const value = window.localStorage.getItem(QUESTION_ISSUE_REPORTS_KEY)
      || window.localStorage.getItem(LEGACY_KEY);
    return value ? JSON.parse(value) : [];
  } catch {
    return [];
  }
}

export async function getQuestionIssueReports() {
  return readRaw();
}

export async function saveQuestionIssueReport(report) {
  if (typeof window === 'undefined') return report;
  const reports = [...readRaw(), report].slice(-MAX_REPORTS);
  try {
    window.localStorage.setItem(QUESTION_ISSUE_REPORTS_KEY, JSON.stringify(reports));
    return report;
  } catch {
    const compactReports = reports.map((item, index) => (
      index === reports.length - 1 ? item : { ...item, screenshot: undefined, screenshotStatus: item.screenshot ? 'removed-to-save-space' : item.screenshotStatus }
    ));
    try {
      window.localStorage.setItem(QUESTION_ISSUE_REPORTS_KEY, JSON.stringify(compactReports));
      return report;
    } catch {
      const compactReport = { ...report, screenshot: undefined, screenshotStatus: 'removed-to-save-space' };
      window.localStorage.setItem(QUESTION_ISSUE_REPORTS_KEY, JSON.stringify([...compactReports.slice(1, -1), compactReport]));
      return compactReport;
    }
  }
}

export async function clearQuestionIssueReports() {
  if (typeof window === 'undefined') return;
  window.localStorage.removeItem(QUESTION_ISSUE_REPORTS_KEY);
  window.localStorage.removeItem(LEGACY_KEY);
}
