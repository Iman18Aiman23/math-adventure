# Gamification Implementation Index

**Status:** Planning Complete — Ready for Phase 0 Implementation

**Last Updated:** 2026-06-12

---

## Documents Overview

### 1. **GAMIFICATION_UNIFIED_PLAN_REVISED.md** ⭐ START HERE
   - **What:** Complete implementation plan with all critical gaps fixed
   - **Changes from v1:** 
     - Timeline adjusted: 30 days → 34-37 days (realistic)
     - 6 critical gaps integrated into Phase 0-8
     - Phased rollout strategy for Phase 1 (BM → MT → PI)
     - Phase 6-7 deferred to week 3+ (post-launch)
   - **Sections:**
     - Critical Gaps & Mitigations (§5) — localStorage quota, cross-tab sync, rate limiting, error recovery, offline sync, TypeScript
     - Revised Phase 0 (§6) — Now 5 days instead of 3
     - Revised Phase 1 (§7) — Phased rollout: BM (2d) → MT (2d) → PI (2d) → Testing (1d)
     - Revised Phase 5 (§11) — 8 days instead of 5 (realistic for 20+ files)
     - Post-Launch Roadmap (§18) — Week 2: Analytics, Week 3: Review+Dashboard, Week 4: Achievements
   - **Use for:** High-level planning, timeline estimates, phase dependencies

---

### 2. **GAMIFICATION_TYPES.md**
   - **What:** TypeScript definitions for all interfaces
   - **Includes:**
     - Core interfaces: `PlayerStats`, `TopicProgress`, `StreakData`, `DailyLogEntry`
     - Repository interface: `GamificationRepository` (abstract)
     - Hook return types: `UseGamificationReturn`, `UseDailyStreakReturn`, `UseReviewModeReturn`
     - Utility types: `Subject`, `QuotaStatus`, `RepairResult`, `ReviewQuestion`
     - JSDoc annotation examples (for `.js` files)
     - Helper function signatures: `levelForXp()`, `estimateSize()`
   - **Use for:** Code implementation — copy interfaces into `src/types/gamification.d.ts` or use as JSDoc

---

### 3. **GAMIFICATION_A11Y_MOBILE_SPEC.md**
   - **What:** Accessibility + mobile-first design requirements
   - **Key Requirements:**
     - Touch targets ≥44×44px on mobile
     - WCAG AA color contrast (4.5:1 for text)
     - ARIA labels + live regions for dynamic updates
     - Keyboard navigation (Tab, Enter, Escape)
     - Dark mode support (`@media (prefers-color-scheme: dark)`)
     - Responsive breakpoints: 375px (mobile) → 480px → 768px (tablet) → 1024px (desktop)
   - **Component-specific specs:**
     - StatsBar: Persistent header showing XP, level, streak, coins
     - Crown Display: 0–5 star levels on topic cards
     - Progress Ring: Daily goal conic-gradient ring
     - Animated Counter: XP earned slide-in animation
     - Streak Counter: Fire emoji with milestone badges
     - Dashboard (deferred): Multi-card layout with donut charts
   - **Use for:** CSS/styling — reference when building components

---

### 4. **GAMIFICATION_UI_MOCKUPS.md**
   - **What:** ASCII mockups + detailed design specifications
   - **Includes:**
     - Mobile, tablet, desktop layouts for each component
     - Visual states (default, hover, active, locked, mastered, broken)
     - Animation sequences with timing
     - Color progressions and gradients
     - CSS custom properties / design tokens
     - Grid system (12-column, responsive)
     - Font sizes and spacing at each breakpoint
     - Prerequisite lock screen modal
     - Analytics event schema
   - **Use for:** UI design reference — screenshot mockups, style measurements, spacing

---

## Implementation Checklist

### Before Phase 0 Starts ✅

- [ ] Read `GAMIFICATION_UNIFIED_PLAN_REVISED.md` (§1–11, skip deferred phases 6–7)
- [ ] Review critical gaps (§5): understand quota, cross-tab sync, rate limiting requirements
- [ ] Copy TypeScript definitions from `GAMIFICATION_TYPES.md` → `src/types/gamification.d.ts`
- [ ] Review `GAMIFICATION_A11Y_MOBILE_SPEC.md` for accessibility + mobile rules
- [ ] Review `GAMIFICATION_UI_MOCKUPS.md` for design tokens + component layouts

### Phase 0 (Days 1–5)

- [ ] Create 9 service files (per revised plan §6)
- [ ] Add quota monitoring to `LocalGamificationRepo.js`
- [ ] Add cross-tab sync (versioning + storage event listener)
- [ ] Add error recovery (try-catch, repair UI)
- [ ] Add rate limiting to `useGamification.awardXP()`
- [ ] Write legacy migration logic
- [ ] Wire `App.jsx` with `GamificationProvider`
- [ ] Test all Phase 0 scenarios (quota, cross-tab, error handling)

### Phase 1 (Days 6–12)

**Day 6–7: BM Only**
- [ ] Integrate `useGamification('bm')` in `BMLessonQuizLayout.jsx`
- [ ] Implement StatsBar component (temp placement on result screen)
- [ ] Award XP on correct answers + quiz completion
- [ ] Test all BM topics end-to-end
- [ ] Verify no regressions in existing BM gameplay

**Day 8–9: Matematik (26 games)**
- [ ] Create pattern game file with `useGamification('mt')`
- [ ] Copy pattern to all 26 game files
- [ ] Test Tahun1 Module1 subset fully
- [ ] Rollout to all 9 hubs + test

**Day 10–11: Pendidikan Islam**
- [ ] Integrate `useGamification('pi')` in `Tahun1LessonScrollLayout.jsx`
- [ ] Update PI `Celebration.jsx` → replace emoji with `canvas-confetti`
- [ ] Test all PI modules

**Day 12: Cross-Subject Testing**
- [ ] Verify XP earned in BM appears in MT + PI
- [ ] Test shared level/coins across subjects
- [ ] Full regression test (all 3 subjects playable)

### Phases 2–5 (Days 13–31)

- [ ] Follow timeline in revised plan (§16)
- [ ] Test each phase thoroughly before proceeding
- [ ] Document any deviations from plan

### Phases 6–7 (Deferred → Week 3+)

- [ ] Start after Phase 5 stabilizes (after ~1 week of user testing)
- [ ] Implement Review Mode (Phase 6)
- [ ] Implement Dashboard + persistent StatsBar (Phase 7)

### Phase 8 (Days 32–34)

- [ ] Implement `ApiGamificationRepo.js` + `DualWriteRepo.js`
- [ ] Test offline sync + conflict resolution
- [ ] Verify rollback procedure

---

## Critical Dependencies

| Phase | Depends On | Blocker If |
|-------|-----------|-----------|
| P0 | None | Can't start implementation |
| P1 | P0 | Missing TypeScript types, quota mgmt, error handling |
| P2 | P1 | Phase 1 XP not working |
| P3 | P2 | Streak data structure not implemented |
| P4 | P3 | Crown system not visible |
| P5 | P4 | Legacy apps still using old system |
| P6 | P5 | No unified question bank |
| P7 | P5 | Need analytics data to design dashboard |
| P8 | P5 | Need stable client before API migration |

---

## Risk Mitigation

| Risk | Mitigation | Owner |
|------|-----------|-------|
| localStorage quota exceeded mid-phase | Implement quota monitoring + archiving in Phase 0 | Implementation |
| Cross-tab data loss | Add optimistic locking + storage event listener in Phase 0 | Implementation |
| Legacy data corruption during migration | Test migration with real sample data before Phase 0 deployment | QA |
| Phase 1 breaks all 3 subjects | Phased rollout: BM → test → MT → test → PI → cross-test | Implementation |
| Phase 5 timeline slips | Realistic estimate: 8 days (not 5); consider deferring Phase 6-7 | Planning |

---

## Testing Strategy

### Phase 0 Manual Tests

```
✓ localStorage write/read cycle
✓ Parse error recovery (corrupted JSON)
✓ Cross-tab sync (two tabs, simultaneous writes)
✓ Version conflict resolution (take max XP)
✓ Rate limiting (awardXP called twice <2s apart)
✓ Quota status reporting
✓ Legacy migration (real mathAdventureData + gameData keys)
```

### Phase 1 Manual Tests

```
✓ Correct answer → +10 XP (all 3 subjects)
✓ 3 correct answers → streak bonus +15
✓ Earn 10 XP → +1 coin
✓ Complete quiz → crownLevel increments
✓ Cross-subject XP totals (BM 50 + MT 40 = 90 visible in both)
✓ PI confetti fires (canvas-confetti, not emoji)
```

### Phase 2+ Tests

*(See GAMIFICATION_UNIFIED_PLAN_REVISED.md §17)*

---

## File Structure After Implementation

```
src/
├── types/
│   └── gamification.d.ts          ← TypeScript definitions
├── services/
│   ├── GamificationRepo.js        ← Abstract interface
│   ├── LocalGamificationRepo.js   ← localStorage impl (with quota + sync)
│   ├── ApiGamificationRepo.js     ← API impl (Phase 8)
│   ├── DualWriteRepo.js           ← Migration bridge (Phase 8)
│   ├── UserId.js                  ← UUID utility
│   ├── gamificationConstants.js   ← XP rates, level thresholds
│   ├── QuotaManager.js            ← Quota monitoring + archiving
│   └── legacyMigration.js         ← Old system data absorption
├── contexts/
│   └── GamificationContext.js     ← React Context + Provider
├── hooks/
│   ├── useGamification.js         ← Main hook (all subjects)
│   ├── useDailyStreak.js          ← Streak + daily goal (Phase 2)
│   └── useReviewMode.js           ← Review mode (Phase 6, deferred)
├── components/
│   ├── BahasaMelayuPage/
│   │   ├── _shared/
│   │   │   ├── BMLessonQuizLayout.jsx (+ useGamification)
│   │   │   └── BMModuleHubLayout.jsx (+ crown display)
│   │   └── Tahun1–3/ (modified for XP awards)
│   ├── MatematikPage/
│   │   ├── Tahun1–3/Module1–4/
│   │   │   └── (26 game files, all + useGamification)
│   │   └── (9 module hubs, + crown display)
│   ├── PendidikanIslamPage/
│   │   ├── Tahun1/
│   │   │   ├── Tahun1LessonScrollLayout.jsx (+ useGamification)
│   │   │   └── Tahun1ModuleHubLayout.jsx (+ crown display)
│   │   └── _shared/
│   │       └── Celebration.jsx (+ canvas-confetti)
│   ├── _shared/
│   │   ├── StatsBar.jsx           ← Phase 1 (temp on result screens)
│   │   ├── AnimatedCounter.jsx    ← Phase 1 (XP counter)
│   │   └── (moved to persistent header Phase 7)
│   └── Dashboard/
│       └── ProgressDashboard.jsx  ← Phase 7 (deferred)
└── App.jsx                         ← Wrapped with GamificationProvider
```

---

## Success Criteria

### Phase 0 Complete When:
- ✅ All 7 service files created + tested
- ✅ localStorage read/write cycle works
- ✅ Cross-tab sync tested (two browser tabs)
- ✅ Error recovery verified
- ✅ Legacy data absorbed without loss
- ✅ Zero console errors

### Phase 1 Complete When:
- ✅ XP awarded in all 3 subjects
- ✅ Shared player.xp visible across subjects
- ✅ Coins auto-calculate from XP
- ✅ PI confetti standardised (canvas-confetti)
- ✅ StatsBar shows real-time updates
- ✅ All subjects playable (no regressions)

### Phase 5 (Legacy Consolidation) Complete When:
- ✅ 20+ legacy consumer components migrated
- ✅ Deprecated files deleted
- ✅ No old `GameStateContext` references remain
- ✅ AppHeader, Profile, Leaderboard show new system data
- ✅ Zero console errors
- ✅ All 3 subjects + legacy games work end-to-end

---

## Post-Launch (Weeks 2–5)

**Week 2:** Analytics dashboard (track engagement)
**Week 3:** Phase 6 (Review Mode) + Phase 7 (Dashboard)
**Week 4:** Achievements + Notifications
**Week 5:** Refinements + API migration (Phase 8)

---

## Questions & Clarifications

**Q: Should we migrate to TypeScript?**
A: Not required for this implementation. Use JSDoc annotations in `.js` files; types in `gamification.d.ts`. Can migrate to `.ts` in future.

**Q: What if localStorage quota is exceeded?**
A: QuotaManager auto-archives old logs (>30 days); keeps live logs compressed. User can manual "Clear Old Data" in settings (Phase 5).

**Q: How is offline handled?**
A: LocalGamificationRepo works fully offline. Phase 8 (ApiGamificationRepo) buffers writes; syncs on reconnect with timestamp-based merge.

**Q: Can users lose XP if app crashes mid-save?**
A: Unlikely — localStorage is atomic (write succeeds or fails completely). If corrupted, validateAndRepair() recovers data.

**Q: Should we A/B test XP rates?**
A: Yes, post-launch (Week 4). Framework defined in Phase 7 dashboard section.

---

## Next Steps

1. ✅ Review all 4 planning docs (this file is a summary)
2. ✅ Confirm timeline (34 days) realistic with your team
3. → **Start Phase 0** (Day 1: Create 9 service files)

---

**Document Versions:**
- v1.0: Original plan (30 days, 6 gaps, timeline optimistic)
- v2.0: REVISED (34 days, all gaps fixed, realistic timeline, deferred phases 6–7)

**Approval Status:**
- [ ] Product Owner sign-off
- [ ] Tech Lead review
- [ ] QA confirms testing plan feasible

---

**Ready to begin Phase 0? Answer "yes" and I'll create the first 7 service files without any further discussion.**
