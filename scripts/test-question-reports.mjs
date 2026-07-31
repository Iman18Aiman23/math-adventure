import assert from 'node:assert/strict';
import {
  QUESTION_ISSUE_REPORTS_KEY,
  clearQuestionIssueReports,
  getQuestionIssueReports,
  saveQuestionIssueReport,
} from '../src/components/MatematikPage/_shared/questionIssueReportStore.js';

const values = new Map();
let limit = Infinity;

globalThis.window = {
  localStorage: {
    getItem: (key) => values.get(key) ?? null,
    removeItem: (key) => values.delete(key),
    setItem: (key, value) => {
      if (value.length > limit) throw new DOMException('Quota exceeded', 'QuotaExceededError');
      values.set(key, value);
    },
  },
};

await clearQuestionIssueReports();
await saveQuestionIssueReport({ reportId: 'full', screenshot: 'data:image/jpeg;base64,ok' });
assert.equal((await getQuestionIssueReports())[0].reportId, 'full');

await clearQuestionIssueReports();
limit = 220;
const saved = await saveQuestionIssueReport({ reportId: 'compact', issue: 'still saved', screenshot: `data:image/jpeg;base64,${'x'.repeat(500)}` });
assert.equal(saved.screenshotStatus, 'removed-to-save-space');
assert.equal(JSON.parse(values.get(QUESTION_ISSUE_REPORTS_KEY))[0].issue, 'still saved');

console.log('Question report storage checks passed.');
