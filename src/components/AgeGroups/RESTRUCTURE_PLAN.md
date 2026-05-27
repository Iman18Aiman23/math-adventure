# Age Groups Restructure Plan

**Last Updated:** 2026-05-27  
**Status:** Planning Phase

---

## Overview

Restructuring the Math Adventure age groups from 5 groups to 4 groups by combining Early Explorers (4-5) and Kindergarten Scholars (5-6) into a single "Combined Early Learning" group. This includes:
- Updating Homepage age group buttons
- Reorganizing folder structure
- Standardizing all age group home pages to match the EarlyExplorersHome.jsx pattern

---

## Current State

### Folders
- `AgeGroup-4-5/` → EarlyExplorersHome.jsx (fully implemented)
- `AgeGroup-5-6/` → KindergartenScholarsHome.jsx (wrapper to AgeGroupHome)
- `AgeGroup-6-7/` → Grade1AdventurersHome.jsx (wrapper to AgeGroupHome)
- `AgeGroup-7-8/` → Grade2DiscoverersHome.jsx (wrapper to AgeGroupHome)
- `AgeGroup-8-9/` → Grade3AchieversHome.jsx (wrapper to AgeGroupHome)
- `AgeGroups/` → Generic AgeGroupHome.jsx & AgeGroupPage.jsx

### Age Groups in Data (ageCurriculum.js)
1. `age-4-5` → Early Explorers (4–5)
2. `age-5-6` → Kindergarten Scholars (5–6)
3. `age-6-7` → Grade 1 Adventurers (6–7)
4. `age-7-8` → Grade 2 Discoverers (7–8)
5. `age-8-9` → Grade 3 Achievers (8–9)

---

## Target State

### 4 Buttons on Homepage
1. **Button 1:** Combined Early Explorers & Kindergarten Scholars (Ages 4–6)
2. **Button 2:** Grade 1 Adventurers (Age 7)
3. **Button 3:** Grade 2 Discoverers (Age 8)
4. **Button 4:** Grade 3 Achievers (Age 9)

### Folder Structure
- `AgeGroup-4-6/` (renamed from AgeGroup-4-5, contains combined content)
- `AgeGroup-7/` (renamed from AgeGroup-6-7)
- `AgeGroup-8/` (renamed from AgeGroup-7-8)
- `AgeGroup-9/` (renamed from AgeGroup-8-9)
- `AgeGroup-5-6/` → DELETE (merged into AgeGroup-4-6)
- `AgeGroups/` → Keep but update AgeGroupPage.jsx if needed

### Home Pages
Each age group folder should have its own home page component (like EarlyExplorersHome.jsx) instead of relying on generic wrappers. Pattern:
```
AgeGroup-4-6/CombinedEarlyLearnersHome.jsx
AgeGroup-7/Grade1AdventurersHome.jsx
AgeGroup-8/Grade2DiscoverersHome.jsx
AgeGroup-9/Grade3AchieversHome.jsx
```

---

## Implementation Phases

**Status:** Phase 1 Complete ✅ | Phase 2 Complete ✅ | Phase 3 Complete ✅ | Phase 4 Complete ✅ | Phase 5 Ready 🚀

### Phase 1: Data Layer Update ✅ COMPLETE
- [x] Update `ageCurriculum.js` to combine age-4-5 and age-5-6
  - [x] Merge CURRICULUM entries into age-4-6
  - [x] Consolidate games from both groups (6 reading games)
  - [x] Update AGE_GROUPS array (4 entries instead of 5)
  - [x] Rename age-6-7 → age-7, age-7-8 → age-8, age-8-9 → age-9

### Phase 2: Homepage UI Update ✅ COMPLETE
- [x] Update `HomePage.jsx` to render 4 buttons instead of 5
  - [x] Updated nebulaColors array (4 colors for 4 age groups)
  - [x] Updated renderAgeIcon function to handle new age IDs (age-4-6, age-7, age-8, age-9)
  - [x] Added unique icon for age-9 (star pattern)

### Phase 3: Folder Reorganization ✅ COMPLETE
- [x] Merge content from AgeGroup-5-6 into AgeGroup-4-6
  - [x] AgeGroup-5-6 was empty (only wrapper component)
  - [x] Deleted AgeGroup-5-6 folder
- [x] Rename folders:
  - [x] AgeGroup-4-5 → AgeGroup-4-6
  - [x] AgeGroup-6-7 → AgeGroup-7
  - [x] AgeGroup-7-8 → AgeGroup-8
  - [x] AgeGroup-8-9 → AgeGroup-9
- [x] Update import paths in App.jsx

### Phase 4: Home Page Standardization ✅ COMPLETE
- [x] Created AgeGroupHomeTemplate.jsx as reusable factory function
- [x] Created standardized home pages for each age group:
  - [x] Grade1AdventurersHome.jsx (AgeGroup-7) - 5,813 bytes
  - [x] Grade2DiscoverersHome.jsx (AgeGroup-8) - 5,787 bytes
  - [x] Grade3AchieversHome.jsx (AgeGroup-9) - 5,828 bytes
- [x] All follow PageLayout + GameCard pattern from EarlyExplorersHome
- [x] All include bilingual support (BM + English)
- [x] All include "Coming Soon" fallback UI
- [x] All include age-appropriate theming and icons
- [x] All include How-To guide sections

### Phase 5: Import Path Updates
- [ ] Update all imports in App.jsx or routing layer
- [ ] Update navigation that references age group IDs
- [ ] Update any other components that import from old paths

### Phase 6: Testing & Validation
- [ ] Verify Homepage displays 4 buttons correctly
- [ ] Test navigation to each age group home page
- [ ] Confirm all games are accessible from new home pages
- [ ] Check for broken imports or routing issues

---

## Key Files to Modify

| File | Change |
|------|--------|
| `src/data/ageCurriculum.js` | Merge age-4-5 + age-5-6, update AGE_GROUPS |
| `src/components/HomePage.jsx` | Update rendering logic for 4 groups |
| `src/components/AgeGroups/AgeGroupHome.jsx` | Update theme config for new IDs |
| `src/components/AgeGroups/AgeGroupPage.jsx` | Update age group ID mapping |
| App routing layer | Update path references |

---

## Files to Delete

- `src/components/AgeGroup-5-6/` (entire folder)

---

## Risk Mitigation

- **Curriculum Data Loss:** Review AgeGroup-5-6 curriculum before merging; keep backups
- **Broken Routes:** Search codebase for hardcoded age group IDs (age-4-5, age-5-6, etc.)
- **Game References:** Ensure all game imports are updated after folder rename

---

## Notes

- EarlyExplorersHome.jsx demonstrates the target pattern: uses PageLayout + GameCard with SVG icons
- Consider creating a shared `AgeGroupHomeTemplate.jsx` to reduce duplication across age group home pages
- All age group folders currently have Jawi/, Math/, Reading/, Speaking/ subdirectories—verify merge strategy for these
