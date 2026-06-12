
# 📚 Bahasa Melayu — Project Reference

> KSSR Bahasa Melayu Tahap 1 (Tahun 1–3)
> Status key: ✅ Complete | 🔄 In Progress | ⏳ Pending | ❌ Gap | 🆕 New

> ## 🤖 Quick Start for Agents
> New to BM KSSR work? Read in this order:
> 1. **§15 Data Architecture Reference** — what data exists, its shape, and which file it lives in (question banks, in-game item arrays, localStorage progress).
> 2. **§16 Topic Page Patterns Reference** — the 3 topic-page patterns (Pattern 1 lesson+quiz, Pattern 2 reuse, Pattern 3 standalone activity), incl. multi-tier games and same-module vs cross-module "next" navigation.
> 3. **§9 Existing Games Inventory** — full file-by-topic map for all 45 topics across Tahun 1–3.
> 4. **§17 Build Roadmap** — prioritized backlog, one item at a time, each with the data/storage/UI-UX spec needed to build it.
> 5. **`reports/T1_COVERAGE_REPORT.md`** — silibus coverage/gap audit (Tahun 1 only; T2/T3 audits pending — tracked as roadmap items).
> Sections 1–14 below are the original architecture/build-plan record (kept for history); §15–17 are the consolidated reference + roadmap.

---

## Table of Contents

1. [Silibus BM KSSR (Tahap 1)](#-silibus-bahasa-melayu-kssr-tahap-1)
2. [Build Plan & Status](#2-build-plan--status)
3. [HomePage Entry Card Spec](#3-homepage-entry-card-spec)
4. [BahasaMelayuHomePage Visual Wireframe](#4-bahasamelayuhomepage-visual-wireframe)
5. [Architecture Overview](#5-architecture-overview)
6. [Module Card Anatomy](#6-module-card-anatomy)
7. [Navigation Flow](#7-navigation-flow)
8. [Routing Architecture](#8-routing-architecture)
9. [Existing Games Inventory](#9-existing-games-inventory)
10. [Recommended Approach: Navigation Wrapper](#10-recommended-approach-navigation-wrapper)
11. [Shared Components](#11-shared-components)
12. [Module Colour System](#12-module-colour-system)
13. [Responsive Grid Spec](#13-responsive-grid-spec)
14. [File Checklist](#14-file-checklist)
15. [Data Architecture Reference](#15-data-architecture-reference)
16. [Topic Page Patterns Reference](#16-topic-page-patterns-reference)
17. [Build Roadmap (Tahun 1–3)](#17-build-roadmap-tahun-13)

---

# 📚 SILIBUS BAHASA MELAYU KSSR (TAHAP 1)

---

## 💻 MODUL PEMBELAJARAN TAHUN 1

### 🗣️ Modul 1: Kemahiran Mendengar dan Bertutur
* **Topik 1.1: Mendengar dan Menyebut**
    * Mendengar, mengecam, dan menyebut bunyi bahasa (vokal dan konsonan).
    * Menyebut perkataan, frasa, dan ayat tunggal dengan betul dan jelas.
* **Topik 1.2: Bertutur dan Menyampaikan Maklumat**
    * Mendengar dan memberikan respons secara lisan terhadap arahan mudah, soalan berciri bertumpu, dan pesanan.
    * Bertutur untuk menyampaikan maklumat, memperkenalkan diri, dan menyatakan permintaan dengan sopan.

### 📖 Modul 2: Kemahiran Membaca
*(Silibus = 3 KSSR content standards below. The app delivers these as **5 child-facing topics** — see the mapping note after this list.)*
* **Topik 2.1: Asas Membaca dan Memahami**
    * Membaca dan mengenal pasti huruf vokal, konsonan, suku kata terbuka (KV), dan suku kata tertutup (KVK).
    * Membaca dan memahami perkataan, frasa, serta ayat tunggal daripada pelbagai bahan bacaan.
* **Topik 2.2: Membaca secara Mekanis**
    * Membaca ayat tunggal dan ayat majmuk secara mekanis dengan sebutan yang betul dan intonasi yang sesuai.
* **Topik 2.3: Membaca dan Menaakul**
    * Membaca, memahami, dan mengenal pasti idea utama serta idea sampingan daripada teks mudah.

> **App ↔ silibus mapping (M2, since 2026-06-12).** The trail shows 5 nodes: app **2.1 Asas Membaca** + **2.2 Baca Perkataan KVK** deliver silibus 2.1 (KV then KVK); app **2.3 Baca dengan Lancar** (STT read-aloud) delivers silibus 2.2 (mekanis); app **2.4 Fahami Cerita** + **2.5 Baca & Fahami** deliver silibus 2.3 (idea utama / menaakul). Display nums were resequenced for trail order — the underlying topic IDs did not change (see §8 Topic ID table).

### ✍️ Modul 3: Kemahiran Menulis
* **Topik 3.1: Asas Menulis**
    * Menulis huruf, suku kata, perkataan, dan frasa dengan mekanis (tulisan yang kemas dan jelas).
* **Topik 3.2: Menulis dan Membina Ayat**
    * Membina dan menulis ayat tunggal berdasarkan grafik, perkataan, atau frasa yang diberikan.
    * Menulis jawapan pemahaman berdasarkan soalan bertumpu.
* **Topik 3.3: Mencatat Maklumat**
    * Mencatat maklumat penting daripada bahan sastera atau bukan sastera yang mudah.

### 🎭 Modul 4: Aspek Seni Bahasa
* **Topik 4.1: Menghayati Keindahan Bahasa**
    * Mengujarkan dialog dengan sebutan yang betul, intonasi yang jelas, dan gaya yang sesuai melalui lakonan atau didik hibur.
    * Melafazkan pantun dua kerat dan empat kerat dengan irama yang betul.
    * Menyanyikan lagu kanak-kanak sambil melakukan aksi.

### 📐 Modul 5: Aspek Tatabahasa
* **Topik 5.1: Morfologi (Golongan Kata)**
    * Kata Nama: Kata Nama Am, Kata Nama Khas, Kata Ganti Nama Diri.
    * Kata Kerja: Kata Kerja Aktif Transitif.
    * Kata Adjektif: Sifat/Warna/Ukuran/Bentuk.
    * Kata Tugas: Kata Hubung (dan, atau, tetapi), Kata Sendi Nama (di, ke, dari, daripada), Kata Tanya.
* **Topik 5.2: Sintaksis (Struktur Ayat)**
    * Memahami dan membina ayat tunggal serta ayat penyata asas.

---

## 💻 MODUL PEMBELAJARAN TAHUN 2

### 🗣️ Modul 1: Kemahiran Mendengar dan Bertutur
* **Topik 1.1: Mendengar, Memahami dan Merespons**
    * Memberikan respons yang sesuai terhadap soalan berciri bertumpu dan berciri bercapah.
    * Melaksanakan arahan, pesanan, dan permintaan yang mengandungi beberapa maklumat.
* **Topik 1.2: Bercerita dan Berbincang**
    * Bercerita dengan sebutan betul, intonasi sesuai, dan gaya bersahaja.
    * Berbincang secara berpandu untuk memberikan idea atau pendapat.

### 📖 Modul 2: Kemahiran Membaca
* **Topik 2.1: Membaca dan Memahami Perkataan Sukar**
    * Membaca perkataan yang mengandungi digraf (ng, ny, kh, sh) dan diftong (ai, au, oi).
* **Topik 2.2: Membaca Teks Pelbagai Gaya**
    * Membaca dan memahami perenggan serta petikan mudah.
* **Topik 2.3: Membaca, Mentafsir dan Menaakul**
    * Membaca bahan sastera (cerpen, pantun) dan bukan sastera untuk mengenal pasti mesej, nilai murni.

### ✍️ Modul 3: Kemahiran Menulis
* **Topik 3.1: Menulis secara Mekanis dan Kemas**
    * Menulis perkataan, frasa, perenggan, dan ayat majmuk secara mekanis.
* **Topik 3.2: Membina dan Menghasilkan Penulisan**
    * Membina ayat majmuk, menulis karangan pendek secara berpandu.
* **Topik 3.3: Menulis Jawapan Pemahaman**
    * Menulis jawapan secara kritis berdasarkan soalan bertumpu dan bercapah.

### 🎭 Modul 4: Aspek Seni Bahasa
* **Topik 4.1: Apresiasi Sastera Kanak-Kanak**
    * Melafazkan dan menjelaskan maksud pantun empat kerat.
    * Mengujarkan bahasa yang indah (simpulan bahasa dan bandingan semacam).
* **Topik 4.2: Persembahan Karya**
    * Menyanyikan lagu kanak-kanak/rakyat, mengujarkan dialog melalui teater bercerita.

### 📐 Modul 5: Aspek Tatabahasa
* **Topik 5.1: Morfologi (Perluasan Golongan Kata)**
    * Kata Bilangan, Kata Arah, Kata Kerja Pasif, Kata Adjektif (Waktu/Jarak/Cara/Pancaindera).
    * Kata Tugas: Kata Seru, Kata Perintah, Kata Penguat, Kata Nafi.
* **Topik 5.2: Pembentukan Perkataan**
    * Imbuhan awalan (meN-, ber-, di-) dan akhiran (-an, -kan, -i).
* **Topik 5.3: Sintaksis (Ayat Majmuk)**
    * Ayat tunggal dan ayat majmuk menggunakan kata hubung (kerana, sambil, serta, lalu).

---

## 💻 MODUL PEMBELAJARAN TAHUN 3

### 🗣️ Modul 1: Kemahiran Mendengar dan Bertutur
* **Topik 1.1: Mendengar dan Mengulas**
    * Mendengar, memahami, dan memberikan respons dengan tafsiran mudah.
* **Topik 1.2: Berkomunikasi secara Bertatasusila**
    * Menyampaikan maklumat, hujah, atau pesanan menggunakan bahasa santun.

### 📖 Modul 2: Kemahiran Membaca
* **Topik 2.1: Membaca dan Memahami Teks Kompleks**
    * Berita, laporan, dialog, surat rasmi/tidak rasmi.
* **Topik 2.2: Kelancaran Membaca (Mekanis)**
    * Membaca petikan panjang, label, iklan, manual prosedur.
* **Topik 2.3: Membaca Kritikal (Analisis & Sintesis)**
    * Maklumat tersirat dan tersurat, ramalan/kesimpulan mudah.

### ✍️ Modul 3: Kemahiran Menulis
* **Topik 3.1: Menulis Karangan**
    * Penulisan naratif dan bukan naratif secara berpandu.
* **Topik 3.2: Kemahiran Mengedit Teks**
    * Ejaan, tanda baca, penggunaan kata yang tepat.
* **Topik 3.3: Menulis Kreatif**
    * Perenggan imaginatif, melengkapkan cerita.

### 🎭 Modul 4: Aspek Seni Bahasa
* **Topik 4.1: Estetika Bahasa dan Sastera**
    * Menghasilkan puisi mudah (pantun/syair), memahami peribahasa.
* **Topik 4.2: Apresiasi Karya Seni**
    * Mendeklamasikan sajak kanak-kanak.

### 📐 Modul 5: Aspek Tatabahasa
* **Topik 5.1: Morfologi Lanjutan**
    * Kata Hubung Pancangan, Kata Sendi Nama, Kata Sandang, Kata Banyak Makna.
* **Topik 5.2: Pembentukan Perkataan (Imbuhan & Majmuk)**
    * Apitan (meN-...-kan, ber-...-an, di-...-kan), Kata Majmuk, Kata Ganda.
* **Topik 5.3: Sintaksis (Jenis-Jenis Ayat)**
    * Ayat Penyata, Ayat Tanya, Ayat Perintah, Ayat Seruan.

---

## 2. Build Plan & Status

### Decisions

| Decision | Outcome | Date |
|----------|---------|------|
| HomePage entry point | **Separate card** — new "Bahasa Melayu KSSR" card alongside existing pink "Sebutan" BM card. Class `card-bm-kssr`, green gradient, routes to `"bm-kssr"`. Existing `"bm"` card stays unchanged. | 2026-06-07 |
| Gap topic cards | **Show disabled "Segera Hadir"** — gaps always rendered in hub as greyed-out cards with "Segera Hadir" badge. Never hidden — shows curriculum completeness. | 2026-06-07 |
| Topic page layout | **New `BMLessonQuizLayout`** — Duolingo-style, quiz-first with brief explanation card. NOT PI's `Tahun1LessonScrollLayout`. | 2026-06-07 |
| Question bank location | **`ModuleData.js`** — centralized `BM_QUESTIONS` export for spaced repetition reference across topics | 2026-06-07 |
| Quiz model | **Spaced repetition** — each quiz includes ~70% current topic + ~30% review from all previous topics | 2026-06-07 |
| Topic unlock mode | **Fully open** — all topics clickable from the start. No sequential locking. | 2026-06-07 |
| Progress for reused games | **Wrap at App.jsx level** — `ProgressWrapper` component saves progress before calling `onBack`. No edits to existing game files. | 2026-06-07 |
| Topic node display labels | **Child-friendly content names**, not silibus headings — hub labels describe what the child actually does (1.1 "Mengenal Huruf Vokal", 1.5 "Baca Frasa Bergambar"). Module names and nav tabs follow the same policy (T1 M1 = "Huruf Vokal & Frasa Bergambar", tab "Huruf & Frasa" via `NAMES_BY_YEAR` in NavBar). Silibus headings remain in this doc's tables; topic IDs are opaque progress keys — never renumber them. | 2026-06-11 |
| T1 M1 structure | **A–Z letter journey** — 7 nodes: vokal → konsonan B–J → K–R → S–Z → Suku Kata (segmentation bridge) → Dengar & Teka (listening) → Baca Frasa Bergambar. Letter + suku kata topics share one configurable `MengenalHuruf.jsx` (`group` prop); Dengar & Teka is quiz-only (`DengarTeka.jsx`, audioText questions). | 2026-06-11 |
| Letter-topic quiz format | **Emoji-driven** — "Apakah ini?" + big emoji prompt + 4 full-word options (proper casing, smaller `word-opt` font). No TTS in these quizzes: ms-MY TTS reads bare letters / hyphenated fragments unreliably. Correct answers fire a confetti burst (`canvas-confetti`; the old 🎀 ribbon banner was removed from `BMLessonQuizLayout`). | 2026-06-11 |
| Tahun 1 vocabulary rule | **KV/KVK words only** in T1 reading content — no meN-/ber- affixed verbs, no digraphs (ng, ny), no diphthongs (ai, au, oi); those arrive in Tahun 2. STT matching still *accepts* advanced spoken forms (membaca, melompat). | 2026-06-11 |
| Quiz mastery gate | **Pass ≥ 70%** (`PASS_PCT` in `BMLessonQuizLayout`) required before a quiz topic is marked complete. Results screen: pass → "Topik Seterusnya →" (`getNextTopicId`, next node in same module; last node falls back to "Kembali ke Trail") + secondary "Cuba Lagi"; fail → "Cuba Lagi" primary + minimum-score notice, **no completion saved**. The back button no longer marks Pattern-1 quiz topics complete; Pattern-2 reuse games (ProgressWrapper) keep mark-on-back. App.jsx keys topic pages with `key={bmTopic}` so "Topik Seterusnya" remounts shared components (MengenalHuruf groups). | 2026-06-11 |
| Lesson-page header pattern | **`BMHeader` reusable component** (`_shared/BMHeader.jsx`) — glassmorphism topbar with back button (label hidden ≤480px, arrow only), centred truncating title, optional `sectionLabel` with gradient decorative lines, optional `sticky` mode for quiz layouts. Replaces all inline per-prefix topbars (`mh-`, `mmk-`, `mmt-`, `kib-`, `sfb-`, `kv-`, `bm-lesson-`). Applied to `BMLessonQuizLayout`, all learn pages, `BacaFrasaBergambar`, `AsasMembaca`, and `KVLearningPage`. | 2026-06-11 |
| Topic 1.7 ordering | **Ayat tunggal BEFORE frasa** — pedagogically simpler-first. `BacaFrasaBergambar.jsx` (1.7) now runs two STT tiers back-to-back: `sentences` (8 ayat tunggal, KV/KVK-clean, e.g. "Kakak mandi") → tier-transition screen (shows tier score, "→ Seterusnya" / "← Kembali") → `phrases` (original picture-phrase STT). Combined score on the final completion screen. Closes M1 A7 + M2 A7 (T1 report P1 #2). | 2026-06-11 |
| T1 M1 — new Topik 1.8 "Dengar & Buat" | **New "Pattern 3" standalone activity** (`DengarBuat.jsx`) — TTS speaks an arahan/pesanan, child performs it physically, self-reports via "✓ Sudah!" (always enabled except a ~1.6s correct-feedback window; "🔊 Ulang" replays anytime, no artificial delay). 13-item bank (10 arahan + 3 pesanan), 8/round. Closes M1 A9 + A11 (T1 report P1 #3). See §16.3. | 2026-06-11 |
| Cross-module "Modul Seterusnya" | New `getNextModuleId(topicId)` (`ModuleData.js`) + `bmNextModule` callback (`App.jsx`) — jumps to the NEXT module's hub/trail page (not a topic) when the current topic is the last in its module. Used by 1.8's completion screen. **Kept separate from** `getNextTopicId`/`bmNextTopic` (same-module "Topik Seterusnya", used by all Pattern-1 quiz results across 19+ topics) — that contract is UNCHANGED. See §16.5. | 2026-06-11 |
| T1 M3 Topik 3.1 — quiz wiring | `AsasMenulis.jsx` (tracing canvas) gained a second phase: after tracing all 26 letters, transitions to `BMLessonQuizLayout` using the previously-orphaned `1-3-1-asas-menulis` bank (huruf → suku kata → perkataan → frasa dictation, 15 items). Gives 3.1 a mastery gate (≥70%) for the first time. Closes M3 A2 + B7 (T1 report P1 #1). | 2026-06-11 |
| KV/KVK rule scope — guided-reading exception (R9) | **Strict KV/KVK rule for decoding activities only.** Decoding (1.1/1.4 letter quizzes, 1.5 suku kata, 2.1 asas membaca, 2.2 baca perkataan KVK) must use only clean KV/KVK words — `Anggur`/`Singa` swapped to `Alat`/`Siput`. **Exception:** Reading comprehension passages (2.3, 2.5, 3.3) and sentence-building (3.2) may use affixed words (meN-/ber-) — these involve whole-sentence guided reading, not isolated decoding. M5 grammar examples are a separate documented exception (inherent to teaching Kata Kerja). | 2026-06-12 |

### Phase 0 — App Integration

| # | Task | Status |
|---|------|--------|
| 0.1 | Create `src/components/BahasaMelayuPage/` folder | ✅ Complete |
| 0.2 | Save `BAHASA_MELAYU.md` planning doc | ✅ Complete |
| 0.3 | Add "BM KSSR" card on HomePage (green gradient, `card-bm-kssr`) | ✅ Complete |
| 0.4 | Wire card to route `bm-kssr` in App.jsx | ✅ Complete |
| 0.5 | Add state vars to App.jsx: `bmModule`, `bmTopic`, `bmYear` | ✅ Complete |
| 0.6 | Add `case "bm-kssr"` routing block in App.jsx | ✅ Complete |
| 0.7 | Add vars to scroll-reset `useEffect` dependency array | ✅ Complete |
| 0.8 | Add lazy imports for all reusable BM games to App.jsx | ✅ Complete |
| 0.9 | Add `.bm-home-root` to full-bleed exceptions in `index.css` | ✅ Complete |

### Phase 1 — Homepage Shell

| # | Task | Status |
|---|------|--------|
| 1.1 | "Bahasa Melayu" brand with tagline | ✅ Complete |
| 1.2 | 3 large year cards with robot SVG discs | ✅ Complete |
| 1.3 | Responsive grid — 3 col -> 1 col at 840px | ✅ Complete |
| 1.4 | Theme colours per year (.t1 green, .t2 amber, .t3 rose) | ✅ Complete |
| 1.5 | BackButton wired to return to HomePage | ✅ Complete |
| 1.6 | Hover lift animation + disc scale | ✅ Complete |

### Phase 2 — Navigation Infrastructure

| # | Task | Status |
|---|------|--------|
| 2.1 | Create `BahasaMelayuModulePage.jsx` — top bar + NavBar + hub wrapper | ✅ Complete |
| 2.2 | Create `BahasaMelayuModuleNavBar.jsx` — standalone sticky 5-tab nav (mirrors `MatematikModuleNavBar`, `top: 56px`) | ✅ Complete |
| 2.3 | Create `BMModuleHubLayout.jsx` — journey trail content only (nav extracted out) | ✅ Complete |
| 2.4 | Move `BMModuleHubLayout.jsx`, `ModuleData.js`, `BMJourneySvgs.jsx` into `_shared/` (shared across all 3 years, mirrors PI's `_shared/` convention) | ✅ Complete |
| 2.5 | Wire router to show module hub when `bmModule` is set | ✅ Complete |

### Phase 2B — Shared Hooks & Layout Components

| # | Task | Status |
|---|------|--------|
| 2.6 | Create `_shared/useModuleProgress.js` — localStorage progress hook (`isTopicCompleted`, `markTopicCompleted`) | ✅ Complete |
| 2.7 | Create `_shared/useBMQuiz.js` — quiz state hook with weighted merge (70/30), `preparePool()`, `ansRef` security | ✅ Complete |
| 2.8 | Create `_shared/BMLessonQuizLayout.jsx` — Duolingo-style layout (brief explanation card + quiz-focused UI) | ✅ Complete |
| 2.9 | Add `BM_QUESTIONS` bank to `ModuleData.js` — all topic questions centralized for spaced repetition | ✅ Complete |
| 2.10 | Update `BMModuleHubLayout.jsx` — add progress indicators (green checks on completed nodes, trophy count) | ✅ Complete |
| 2.11 | Add BM lesson root class to full-bleed exceptions in `index.css` | ✅ Complete |

### Phase 3 — Tahun 1 Content (Two-Page Routed)

| # | Task | Status |
|---|------|--------|
| 3.1 | `ModuleData.js` — T1 module data (2-5 topics each; M2 = 5 since 2026-06-12) | ✅ Complete |
| 3.2 | T1 Topik 1.1 — Mendengar & Menyebut (app label: "Mengenal Huruf Vokal") | ✅ Complete |
| 3.3 | T1 Topik 1.2 — Bertutur & Menyampaikan Maklumat (app label: "Baca Frasa Bergambar", shows as node 1.7) | ✅ Reuse (redesigned 2026-06-11; extended 2026-06-11 with an ayat-tunggal STT tier before the original frasa tier — see Topic 1.7 ordering decision above) |
| 3.4 | T1 Topik 2.1 — Asas Membaca & Memahami | ✅ Reuse (direct-wired + blue 2026-06-12) |
| 3.4b | T1 Topik 2.2 — Baca Perkataan KVK | ✅ Complete (new 2026-06-12) |
| 3.5 | T1 Topik 2.3 — Baca dengan Lancar (Membaca Mekanis, STT) | ✅ Complete |
| 3.5b | T1 Topik 2.4 — Fahami Cerita (main-idea quiz) | ✅ Complete (new 2026-06-12) |
| 3.6 | T1 Topik 2.5 — Baca & Fahami (Membaca & Menaakul) | ✅ Reuse (direct-wired + blue 2026-06-12) |
| 3.7 | T1 Topik 3.1 — Asas Menulis | ✅ Complete (extended 2026-06-11 with a quiz phase using the `1-3-1-asas-menulis` bank — see decision above) |
| 3.8 | T1 Topik 3.2 — Menulis & Membina Ayat | ✅ Reuse |
| 3.9 | T1 Topik 3.3 — Mencatat Maklumat | ✅ Complete |
| 3.10 | T1 Topik 4.1 — Keindahan Bahasa | ✅ Complete |
| 3.11 | T1 Topik 5.1 — Morfologi (Golongan Kata) | ✅ Reuse |
| 3.12 | T1 Topik 5.2 — Sintaksis (Ayat Tunggal) | ✅ Complete (new `SintaksisAyat.jsx` — was SentenceBuilder duplicate of 3.2) |
| 3.13 | T1 M1 A–Z journey — Konsonan B–J / K–R / S–Z (3 new topics, all 4 letter topics share `MengenalHuruf.jsx`; `MendengarMenyebut.jsx` deleted. IDs `1-1-3/4/5-*`) | ✅ Complete |
| 3.14 | T1 M1 Topik 1.5 — Dengar & Teka (listening; quiz-only `DengarTeka.jsx` + audioText bank `1-1-6-dengar-teka`; frasa shows as 1.6). Also: SpeechManager Malay voice fix — Indonesian (`id-*`) voices now qualify as fallback (Damayanti on iOS, Google Bahasa Indonesia) instead of browser-default English voice | ✅ Complete |
| 3.15 | M1 spaced repetition wired — each konsonan quiz reviews all earlier letter groups (`REVIEW_SOURCES` in `MengenalHuruf.jsx`); Dengar & Teka reviews all letter + suku kata banks (~70% current / ~30% review via `useBMQuiz`) | ✅ Complete |
| 3.16 | T1 M1 Topik 1.5 — Suku Kata. Learn page = full `ReadingPage/KVLearningPage.jsx` flashcard system reused (letter picker A–Z, vowel-series cards, RUMI/ENG/JAWI toggle, tap-to-listen; optional `onStartQuiz` prop added — Age 4–6 usage unaffected) via thin `SukuKata.jsx` wrapper; quiz = bank `1-1-7-suku-kata` (hear word → pick first syllable) + letter reviews. `bm_kv.js` data cleaned (wrong pairings ri/ju/ni fixed, Indonesian *sepeda* removed, non-BM words dropped, digraph/diftong swaps); KVLearningPage vowel labels now item-derived so shortened series stay correct. Dengar & Teka shows as 1.6, frasa as 1.7 | ✅ Complete |
| 3.17 | T1 M1 — new Topik 1.8 "Dengar & Buat" (`DengarBuat.jsx`, new "Pattern 3" standalone activity; 13-item arahan/pesanan bank, 8/round; new icon `M1DengarBuat` in `BMJourneySvgs.jsx`). T1 M1 now has 8 nodes (was 7) | ✅ Complete |

### Phase 4 — Tahun 2 Content

| # | Task | Status |
|---|------|--------|
| 4.1 | `ModuleData.js` — T2 module data (2-3 topics each) | ✅ Complete |
| 4.2 | T2 Topik 1.1 — Mendengar, Memahami & Merespons | ✅ Complete (wired) |
| 4.3 | T2 Topik 1.2 — Bercerita & Berbincang | ✅ Complete (wired) |
| 4.4 | T2 Topik 2.1 — Perkataan Sukar (Digraf/Diftong) | ✅ Complete (new) |
| 4.5 | T2 Topik 2.2 — Teks Pelbagai Gaya | ✅ Complete (wired) |
| 4.6 | T2 Topik 2.3 — Mentafsir & Menaakul | ✅ Complete (wired) |
| 4.7 | T2 Topik 3.1 — Menulis secara Mekanis | ✅ Complete (new) |
| 4.8 | T2 Topik 3.2 — Membina & Menghasilkan Penulisan | ✅ Complete (new) |
| 4.9 | T2 Topik 3.3 — Menulis Jawapan Pemahaman | ✅ Complete (new) |
| 4.10 | T2 Topik 4.1 — Apresiasi Sastera | ✅ Complete (wired) |
| 4.11 | T2 Topik 4.2 — Persembahan Karya | ✅ Complete (new) |
| 4.12 | T2 Topik 5.1 — Morfologi (Perluasan) | ✅ Complete (wired) |
| 4.13 | T2 Topik 5.2 — Pembentukan Perkataan | ✅ Complete (wired) |
| 4.14 | T2 Topik 5.3 — Sintaksis (Ayat Majmuk) | ✅ Complete (new) |

### Phase 5 — Tahun 3 Content

| # | Task | Status |
|---|------|--------|
| 5.1 | `ModuleData.js` — T3 module data (2-3 topics each) | ✅ Complete |
| 5.2 | T3 Topik 1.1 — Mendengar & Mengulas | ✅ Complete (new) |
| 5.3 | T3 Topik 1.2 — Berkomunikasi Bertatasusila | ✅ Complete (new) |
| 5.4 | T3 Topik 2.1 — Teks Kompleks | ✅ Complete (wired) |
| 5.5 | T3 Topik 2.2 — Kelancaran Membaca | ✅ Complete (new) |
| 5.6 | T3 Topik 2.3 — Membaca Kritikal | ✅ Complete (wired) |
| 5.7 | T3 Topik 3.1 — Menulis Karangan | ✅ Complete (new) |
| 5.8 | T3 Topik 3.2 — Kemahiran Mengedit Teks | ✅ Complete (wired) |
| 5.9 | T3 Topik 3.3 — Menulis Kreatif | ✅ Complete (new) |
| 5.10 | T3 Topik 4.1 — Estetika Bahasa & Sastera | ✅ Complete (wired) |
| 5.11 | T3 Topik 4.2 — Apresiasi Karya Seni | ✅ Complete (wired) |
| 5.12 | T3 Topik 5.1 — Morfologi Lanjutan | ✅ Complete (new) |
| 5.13 | T3 Topik 5.2 — Pembentukan Perkataan | ✅ Complete (wired) |
| 5.14 | T3 Topik 5.3 — Sintaksis (Jenis Ayat) | ✅ Complete (wired) |

### Phase 6 — File Migration (After All Phases Complete)

| # | Task | Status |
|---|------|--------|
| 6.1 | Move T1 BM games from AgeGroup-7 to `BahasaMelayuPage/Tahun1/` | ✅ Complete |
| 6.2 | Move T2 BM games from AgeGroup-7/8 to `BahasaMelayuPage/Tahun2/` | ✅ Complete |
| 6.3 | Move T3 BM games from AgeGroup-7/8/9 to `BahasaMelayuPage/Tahun3/` | ✅ Complete |
| 6.4 | Update App.jsx lazy import paths for all moved files | ✅ Complete |
| 6.5 | Fix relative import paths in moved files | ✅ Complete |
| 6.6 | Build verification | ✅ Complete |

### Phase 7 — Curriculum Coverage Audits

Per-module silibus audits live in `reports/` (`_CHECKLIST_TEMPLATE.md` = reusable checklist; one report per modul).

| Report | Verdict | Date |
|--------|---------|------|
| `reports/T1_COVERAGE_REPORT.md` (M1–M5, all of Tahun 1) | ⚠️ Partial — **38✅ · 1⚠️ · 0❌ · 2➖ (41 rows)**. M1 fully closed (12✅, R8+R9). M2 fully closed (10✅). M5 fully closed (8✅, R1+R10). M4 ⚠️ (3✅·1⚠️·0❌·1➖, only A4 lagu ➖ remains). M3 ⚠️ (2✅·3⚠️·0❌, handwriting 3 partial). All ❌ rows closed. R9 (C1) closes KV/KVK rule scope. | 2026-06-12 |
| `reports/T2_COVERAGE_REPORT.md` (M1–M5, all of Tahun 2) | ❌ Major gaps — **7✅ · 7⚠️ · 24❌ · 1➖ (39 rows)**. M2 is the only strong module (5✅·1❌). M1 and M5 5.1 need near-total rebuilds. 7 of 13 topics are Pattern-2 reuses of mismatched content. See R12-R24 action plan. | 2026-06-11 |
| T3 | ⏳ Pending — R11 | |

---

## 3. HomePage Entry Card Spec

The main app `HomePage` gets a new card alongside the existing age-group cards.

| Property | Value |
|----------|-------|
| CSS class | `card-bm-kssr` |
| Gradient | `radial-gradient(ellipse at 50% 38%, #D1FAE5 0%, #6EE7B7 55%, #059669 100%)` (emerald green) |
| Border color | `rgba(16, 185, 129, 0.4)` |
| Routes to | `setCurrentSubject("bm-kssr")` |
| Label | "Bahasa Melayu KSSR" |
| Existing `card-speak` | **Unchanged** — still routes to `"bm"` (speech practice) |

---

## 4. BahasaMelayuHomePage Visual Wireframe

### Desktop (>= 1024px)

```
+------------------------------------------------------------------------+
|                                                                        |
|  [<]  Bahasa Melayu                                                    |  <- Back button + brand
|                                                                        |
|  Bacalah, hayatilah, cintailah Bahasa Melayu!                          |  <- tagline
|                                                                        |
|                          Pilih Tahun                                    |  <- heading
|                                                                        |
|               KLIK PADA ROBOT UNTUK MEMULAKAN...                       |  <- hint
|                                                                        |
|  +---------------------+  +---------------------+  +---------------------+
|  |     +-----------+   |  |     +-----------+   |  |     +-----------+   |
|  |     |    🤖    |   |  |     |    🤖    |   |  |     |    🤖    |   |
|  |     +-----------+   |  |     +-----------+   |  |     +-----------+   |
|  |        📗           |  |        📘           |  |        📕           |
|  |    +----------+     |  |    +----------+     |  |    +----------+     |
|  |    | TAHUN 1  |     |  |    | TAHUN 2  |     |  |    | TAHUN 3  |     |
|  |    +----------+     |  |    +----------+     |  |    +----------+     |
|  |  5 Modul . Mula     |  |  5 Modul .          |  |  5 Modul .          |
|  |    belajar          |  |   Teruskan          |  |   Mula belajar      |
|  |    Mula >           |  |    Mula >           |  |    Mula >           |
|  +---------------------+  +---------------------+  +---------------------+
|                                                                        |
|  - each year card has a circular gradient disc (150x150px)             |
|    with a robot SVG (118x148px) + radial gradient background           |
|  - fitted to viewport, no page scroll on laptop/desktop                |
+------------------------------------------------------------------------+
```

### Tablet / Mobile (< 840px)

```
+------------------------------------------+
|  [<]  Bahasa Melayu                      |
|                                          |
|  Bacalah, hayatilah...                   |
|                                          |
|           Pilih Tahun                    |
|                                          |
|       KLIK PADA ROBOT...                 |
|                                          |
|  +--------------------------------+     |
|  |        +-----------+           |     |
|  |        |    🤖    |           |     |
|  |        +-----------+           |     |
|  |           📗                   |     |
|  |       +----------+            |     |
|  |       | TAHUN 1  |            |     |
|  |       +----------+            |     |
|  |    5 Modul . Mula belajar     |     |
|  |           Mula >              |     |
|  +--------------------------------+     |
|  +--------------------------------+     |
|  |        +-----------+           |     |
|  |        |    🤖    |           |     |
|  |        +-----------+           |     |
|  |           📘                   |     |
|  |       +----------+            |     |
|  |       | TAHUN 2  |            |     |
|  |       +----------+            |     |
|  |    5 Modul . Teruskan         |     |
|  |           Mula >              |     |
|  +--------------------------------+     |
|  +--------------------------------+     |
|  |        +-----------+           |     |
|  |        |    🤖    |           |     |
|  |        +-----------+           |     |
|  |           📕                   |     |
|  |       +----------+            |     |
|  |       | TAHUN 3  |            |     |
|  |       +----------+            |     |
|  |    5 Modul . Mula belajar     |     |
|  |           Mula >              |     |
|  +--------------------------------+     |
+------------------------------------------+
```

---

## 5. Architecture Overview

```
BahasaMelayuPage/                          <- Phase 6 final state
+-- BAHASA_MELAYU.md                  ★ This reference
+-- BahasaMelayuHomePage.jsx          ★ Homepage - year selector with robot cards
+-- BahasaMelayuModulePage.jsx        ★ Top bar + renders BahasaMelayuModuleNavBar + hub content
+-- BahasaMelayuModuleNavBar.jsx      ★ Standalone sticky 5-tab nav (mirrors MatematikModuleNavBar, top:56px)
|
+-- _shared/                           ★ Shared across all 3 years
|   +-- BMHeader.jsx                  ★ Reusable glassmorphism topbar (back button, title, optional sectionLabel/sticky)
|   +-- BMJourneySvgs.jsx             ★ 18 reusable SVG components (badges + topic icons + trophy)
|   +-- ModuleData.js                 ★ All 3 years' module data + BM_QUESTIONS bank
|   +-- BMModuleHubLayout.jsx         ★ Journey trail with progress indicators
|   +-- BMLessonQuizLayout.jsx        ★ Duolingo-style topic page (explanation + quiz)
|   +-- useBMQuiz.js                  ★ Quiz state hook (spaced repetition, ref-hidden answers)
|   +-- useModuleProgress.js          ★ localStorage progress persistence
|
+-- Tahun1/
|   +-- Module1_Mendengar/
|   |   +-- MengenalHuruf.jsx        ★ 1.1–1.4 A–Z letter journey (group: vokal | konsonan-bj | kr | sz)
|   |   +-- SukuKata.jsx             ★ 1.5 (KVLearningPage wrapper)
|   |   +-- DengarTeka.jsx           ★ 1.6 (quiz-only listening)
|   |   +-- BacaFrasaBergambar.jsx   ★ 1.7 (reuse, migrated from AG-7; +ayat-tunggal STT tier)
|   |   +-- DengarBuat.jsx           ★ 1.8 (new — "Pattern 3" standalone activity)
|   +-- Module2_Membaca/
|   |   +-- AsasMembaca.jsx          ★ 2.1 (reuse, migrated from AG-7; direct-wired + blue 2026-06-12)
|   |   +-- BacaPerkataan.jsx        ★ 2.2 (new 2026-06-12 — 15 pure-KVK words)
|   |   +-- MembacaMekanis.jsx       ★ 2.3 (new — STT read-aloud "Baca dengan Lancar")
|   |   +-- FahamiCerita.jsx         ★ 2.4 (new 2026-06-12 — story pager + main-idea quiz)
|   |   +-- MembacaMenaakul.jsx      ★ 2.5 (reuse, migrated from AG-7; direct-wired + blue 2026-06-12)
|   +-- Module3_Menulis/
|   |   +-- AsasMenulis.jsx          ★ 3.1 (new tracing canvas)
|   |   +-- BinaAyat.jsx             ★ 3.2 (reuse, migrated from AG-7)
|   |   +-- MencatatMaklumat.jsx     ★ 3.3 (new)
|   +-- Module4_SeniBahasa/
|   |   +-- KeindahanBahasa.jsx      ★ 4.1 (new)
|   +-- Module5_Tatabahasa/
|       +-- MorfologiGolonganKata.jsx ★ 5.1 (reuse, migrated from AG-7)
|       +-- SintaksisAyat.jsx        ★ 5.2 (new)
|
+-- Tahun2/
|   +-- Module1_Mendengar/
|   |   +-- MendengarMerespons.jsx   ★ 1.1 (reuse, migrated from AG-7)
|   |   +-- BerceritaBerbincang.jsx  ★ 1.2 (reuse, migrated from AG-7)
|   +-- Module2_Membaca/
|   |   +-- PerkataanSukar.jsx       ★ 2.1 (new)
|   |   +-- TeksPelbagaiGaya.jsx     ★ 2.2 (reuse, migrated from AG-8)
|   |   +-- MentafsirMenaakul.jsx    ★ 2.3 (reuse, migrated from AG-8)
|   +-- Module3_Menulis/
|   |   +-- MenulisMekanis.jsx       ★ 3.1 (new)
|   |   +-- HasilkanPenulisan.jsx    ★ 3.2 (new)
|   |   +-- JawapanPemahaman.jsx     ★ 3.3 (new)
|   +-- Module4_SeniBahasa/
|   |   +-- ApresiasiSastera.jsx     ★ 4.1 (reuse, migrated from AG-8)
|   |   +-- PersembahanKarya.jsx     ★ 4.2 (new)
|   +-- Module5_Tatabahasa/
|       +-- MorfologiPerluasan.jsx   ★ 5.1 (reuse, migrated from AG-7)
|       +-- PembentukanPerkataan.jsx ★ 5.2 (reuse, migrated from AG-7)
|       +-- SintaksisAyatMajmuk.jsx  ★ 5.3 (new)
|
+-- Tahun3/
    +-- Module1_Mendengar/
    |   +-- MendengarMengulas.jsx    ★ 1.1 (new)
    |   +-- KomunikasiBertatasusila.jsx ★ 1.2 (new)
    +-- Module2_Membaca/
    |   +-- TeksKompleks.jsx         ★ 2.1 (reuse, migrated from AG-8)
    |   +-- KelancaranMembaca.jsx    ★ 2.2 (new)
    |   +-- MembacaKritikal.jsx      ★ 2.3 (reuse, migrated from AG-9)
    +-- Module3_Menulis/
    |   +-- MenulisKarangan.jsx      ★ 3.1 (new)
    |   +-- MengeditTeks.jsx         ★ 3.2 (reuse, migrated from AG-7)
    |   +-- MenulisKreatif.jsx       ★ 3.3 (new)
    +-- Module4_SeniBahasa/
    |   +-- EstetikaBahasa.jsx       ★ 4.1 (reuse, migrated from AG-9)
    |   +-- ApresiasiKaryaSeni.jsx   ★ 4.2 (reuse, migrated from AG-8)
    +-- Module5_Tatabahasa/
        +-- MorfologiLanjutan.jsx    ★ 5.1 (new)
        +-- ImbuhanMajmukGanda.jsx   ★ 5.2 (reuse, migrated from AG-9)
        +-- JenisJenisAyat.jsx       ★ 5.3 (reuse, migrated from AG-9)
```

> All BM KSSR game files now live under `BahasaMelayuPage/Tahun{N}/Module{M}_{Name}/` — this mirrors `MatematikPage`'s folder convention exactly.
> `AgeGroup-7/`, `AgeGroup-8/`, and `AgeGroup-9/` retain only their hub shells and non-BM subject games (BM originals still present but unused; App.jsx imports point to the migrated copies).

### Component Tree

```
BahasaMelayuHomePage
  +-- BackButton
  +-- .bm-brand -> "Bahasa Melayu" logo
  +-- .bm-tagline
  +-- .bm-home-h1 -> "Pilih Tahun"
  +-- .bm-home-hint -> "KLIK PADA ROBOT..."
  +-- .bm-years -> 3x .bm-year cards
        +-- Tahun 1 (active, green theme)
        |     +-- onClick -> BahasaMelayuModulePage(year=1)
        +-- Tahun 2 (active, amber theme)
        |     +-- onClick -> BahasaMelayuModulePage(year=2)
        +-- Tahun 3 (active, rose theme)
              +-- onClick -> BahasaMelayuModulePage(year=3)

BahasaMelayuModulePage
  +-- bm-top-bar (sticky, top:0, z-index:110)
  |     +-- BackButton
  |     +-- "Tahun X" label
  +-- BahasaMelayuModuleNavBar (sticky, top:56px, z-index:100)
  |     +-- bm-mnav-tab x5 (labels: NAMES_BY_YEAR[year] override -> NAMES fallback)
  |           +-- 1 Huruf & Frasa      (T1 override; T2/T3: Mendengar & Bertutur)
  |           +-- 2 Membaca
  |           +-- 3 Menulis
  |           +-- 4 Seni Bahasa
  |           +-- 5 Tatabahasa
  +-- bm-module-content
        +-- BMModuleHubLayout (_shared/ — journey trail with progress indicators)
              +-- section.module (hidden/shown per active tab)
                    +-- unit-banner
                    +-- trail (journey steps)
                          +-- NodeButton x N (circular 96px, zigzag offsets)
                          |     +-- 🟢 green check if completed (via isTopicCompleted)
                          |     +-- onClick -> setBmTopic(id) via onSelectTopic
                          +-- Trophy end node (shows "X/Y" completion count)
                                +-- onClick -> routes to topic page via App.jsx

App.jsx (case "bm-kssr")
  +-- if bmTopic set -> renders topic page component
  |     +-- Pattern 1 (new): <MengenalHuruf group="vokal" onBack={...} />
  |     |     +-- uses BMLessonQuizLayout + useBMQuiz + BM_QUESTIONS
  |     |     +-- onBack -> markTopicCompleted(id) + setBmTopic(null)
  |     +-- Pattern 2 (reuse): <ProgressWrapper><ExistingGame /></ProgressWrapper>
  |           +-- ProgressWrapper saves progress before onBack
  +-- else if bmModule -> shows module hub
```

---

## 6. Module Card Anatomy

The homepage uses large year-selector cards (`.bm-year`) matching the PI/Matematik design.

### Active Card (Tahun 1, 2, 3)

```
+-------------------------------------+
|  +-----------------------------+    |  <- .bm-disc
|  |  +--------------------+     |    |     150x150px circle
|  |  |    Robot           |     |    |     radial gradient bg
|  |  |    SVG art         |     |    |     (varies per year)
|  |  +--------------------+     |    |
|  +-----------------------------+    |
|          (year emoji)               |
|      +------------------+           |  <- .bm-ribbon
|      |     TAHUN 1      |           |
|      +------------------+           |
|      5 Modul . Mula belajar         |  <- .bm-meta
|             Mula >                  |  <- .bm-go
+-------------------------------------+
```

| Element | Class | Description |
|---------|-------|-------------|
| Disc | `.bm-disc` | 150x150px circle, radial gradient background (varies per year) |
| Robot SVG | `.bm-robot-svg` | 118x148px centred inside disc |
| Emoji | `.bm-emoji` | Book emoji (T1=📗, T2=📘, T3=📕) |
| Ribbon | `.bm-ribbon` | Year label "TAHUN 1/2/3" |
| Meta | `.bm-meta` | Module count + status text |
| Go | `.bm-go` | "Mula >" arrow button |

---

## 7. Navigation Flow

### Layout A - Year Selector Page (BahasaMelayuHomePage)

```
+--------------------------------------------------------------------+
|  BM HOME                                                   (above) |
|  Click "Tahun 1", "Tahun 2", or "Tahun 3"                         |
+----------------------------------+---------------------------------+
                                   |
                                   v
```

### Layout B - Module Hub Page (BahasaMelayuModulePage + BahasaMelayuModuleNavBar + BMModuleHubLayout)

```
+--------------------------------------------------------------------+
|  BAHASAMELAYUMODULEPAGE                                             |
|  +--------------------------------------------------------------+  |
|  |  bm-top-bar (sticky top:0, z-index:110)                      |  |
|  |  [ <- back ]         Tahun  1                                |  |
|  +--------------------------------------------------------------+  |
|  |  BAHASAMELAYUMODULENAVBAR (sticky top:56px, z-index:100)      |  |
|  |  +--------+--------+--------+---------+---------+            |  |
|  |  | Modul 1| Modul 2| Modul 3| Modul 4 | Modul 5 |            |  |
|  |  |Huruf&Fr.|Membaca |Menulis |Seni Ba. |Tatabhs |            |  |
|  |  +--------+--------+--------+---------+---------+            |  |
|  |  (T1 tab labels via NAMES_BY_YEAR; T2/T3 keep silibus names)  |  |
|  |  Standalone component — mirrors MatematikModuleNavBar exactly.|  |
|  |  Stacks cleanly BELOW bm-top-bar (no overlap, unlike the old  |  |
|  |  embedded-at-top:0 nav).                                      |  |
|  +--------------------------------------------------------------+  |
|  |  BMMODULEHUBLAYOUT (_shared/ — content only, no nav)          |  |
|  |  +----------------------------------------------------------+  |  |
|  |  |  JOURNEY TRAIL (only active module shown)                 |  |  |
|  |  |                                                           |  |  |
|  |  |     +------------------------------------------------+   |  |  |
|  |  |     | unit-banner: [badge] Modul 1 · Unit Pembelajaran|   |  |  |
|  |  |     |               Huruf Vokal & Frasa Bergambar     |   |  |  |
|  |  |     +------------------------------------------------+   |  |  |
|  |  |                                                           |  |  |
|  |  |              [MULA]                                      |  |  |
|  |  |             (96px)                                       |  |  |
|  |  |         ⭕ TOPIK 1.1 Mengenal Huruf Vokal               |  |  |
|  |  |                ⭕ TOPIK 1.2 Konsonan B–J                |  |  |
|  |  |         ⭕ TOPIK 1.3 Konsonan K–R                       |  |  |
|  |  |                ⭕ TOPIK 1.4 Konsonan S–Z                |  |  |
|  |  |         ⭕ TOPIK 1.5 Suku Kata                           |  |  |
|  |  |                ⭕ TOPIK 1.6 Dengar & Teka                |  |  |
|  |  |         ⭕ TOPIK 1.7 Baca Frasa Bergambar               |  |  |
|  |  |                                                           |  |  |
|  |  |              🏆 Tamat Modul! (X/7)                       |  |  |
|  |  |               (trophy node)                              |  |  |
|  |  |                                                           |  |  |
|  |  |  - circular 96px node buttons with radial gradient       |  |  |
|  |  |  - zigzag offset: even steps shift right (+138px)        |  |  |
|  |  |    next even step shifts left (-138px) via --x CSS var   |  |  |
|  |  +----------------------------------------------------------+  |  |
|  +--------------------------------------------------------------+  |
+--------------------------------------------------------------------+
                                   |
                                   v
```

### Layout C - Topic Game / Lesson Page

Two patterns exist for topic pages:

**Pattern 1 - New two-page lesson** (learn page + BMLessonQuizLayout quiz):
```
Trail node onClick
  -> setBmTopic("1-1-1-mendengar-menyebut")
  -> App.jsx renders <MengenalHuruf group="vokal" onBack={...} />
  -> Page 1 — LEARN (component's own page, single viewport, no scroll):
       ┌──────────────────────────────────────┐
       │  ←  ·  Mengenal Huruf Vokal          │  <- standardized topbar
       │  [📖 LANGKAH 1 · BELAJAR DULU]        │
       │  Mari Belajar Huruf Vokal             │
       │  ┌────┐ ┌────┐ ┌────┐                │  letter cards (tap = TTS word)
       │  │ Aa │ │ Ee │ │ Ii │                │  3+2 grid (5) / 4+3 (7 letters)
       │  └────┘ └────┘ └────┘                │  one row on ≥680px
       │      ┌────┐ ┌────┐                   │
       │      │ Oo │ │ Uu │                   │
       │      └────┘ └────┘                   │
       │  [ 🎯 Sedia untuk Kuiz? ]            │
       └──────────────────────────────────────┘
  -> Page 2 — QUIZ (BMLessonQuizLayout, emoji format):
       ┌──────────────────────────────────────┐
       │  ←  ·  Mengenal Huruf Vokal          │
       │  Soalan X/15  ██░░░░░   ⭐ score     │
       │              🐫                       │  <- big emoji prompt
       │         Apakah ini?                   │
       │  [ Unta ] [ Itik ] [ Enam ] [Anggur] │  <- full-word options
       │  ✅ confetti burst / ❌ Jawapan: ...  │
       │  [Teruskan →]                         │
       │  🏆 Keputusan ⭐⭐⭐ X/15            │
       └──────────────────────────────────────┘
  -> Quiz uses useBMQuiz hook:
       ~70% current topic questions + ~30% review from previous topics
       ref-hidden answers (ansRef) — invisible to DevTools
       question fields: { question, answer, options, emoji? | audioText? }
  <- onBack -> markTopicCompleted(id) + setBmTopic(null) -> back to hub
```

**Pattern 2 - Reused standalone game** (existing game from AgeGroup-*):
```
Trail node onClick
  -> setBmTopic("...")
  -> App.jsx wraps in <ProgressWrapper topicId="...">
       <ExistingGame onBack={handleOnBack} ... />
     </ProgressWrapper>
  -> ProgressWrapper intercepts onBack to call markTopicCompleted(id)
  <- Game fills screen with its own layout
  <- onBack -> markTopicCompleted + setBmTopic(null) -> back to hub
```

To inspect the UI of any reused game, open its source file in `AgeGroup-*`. For new lesson pages, see the `_shared/BMLessonQuizLayout.jsx` component.

---

## 8. Routing Architecture

### App.jsx State Variables

Three state vars (mirroring PI/Matematik pattern):

```js
const [bmModule, setBmModule] = useState(null);
const [bmTopic,  setBmTopic]  = useState(null);
const [bmYear,   setBmYear]   = useState(1);
```

### Progress Persistence

Progress is stored per-topic in localStorage under key `"bm-progress"`:

```js
// _shared/useModuleProgress.js
isTopicCompleted("1-1-mendengar-menyebut")  // -> true/false
markTopicCompleted("1-1-mendengar-menyebut") // saves to localStorage
```

The hub reads `isTopicCompleted(id)` for each node to show 🟢 indicators. Quiz topics (Pattern 1) are marked complete by `BMLessonQuizLayout` **only when the quiz is passed (≥ 70%)**; reused games (Pattern 2) still mark complete via `ProgressWrapper` on back.

### Topic ID Naming Convention

Topic IDs follow the format `{year}-{module}-{topic}-{slug}`. This avoids routing collisions and matches ModuleData.js.

| Year | Format | Example IDs |
|------|--------|-------------|
| Tahun 1 | `"1-{M}-{T}-{slug}"` | M1: `"1-1-1-mendengar-menyebut"` (shows as 1.1), `"1-1-3-konsonan-bj"` (1.2), `"1-1-4-konsonan-kr"` (1.3), `"1-1-5-konsonan-sz"` (1.4), `"1-1-7-suku-kata"` (1.5), `"1-1-6-dengar-teka"` (1.6), `"1-1-2-bertutur-maklumat"` (1.7 — id kept so saved progress survives), `"1-1-8-dengar-buat"` (1.8 — new 2026-06-11). **M2 — id ≠ display num after the 2026-06-12 renumber** (trail order is set by `topics[]` order in `ModuleData.js`, not by the id): `"1-2-1-asas-membaca"` (shows 2.1), `"1-2-4-baca-perkataan"` (shows **2.2**), `"1-2-2-membaca-mekanis"` (shows **2.3**), `"1-2-5-fahami-cerita"` (shows **2.4**), `"1-2-3-membaca-menaakul"` (shows **2.5**) |
| Tahun 2 | `"2-{M}-{T}-{slug}"` | `"2-1-1-mendengar-merespons"`, `"2-1-2-bercerita"`, `"2-2-1-perkataan-sukar"`, `"2-2-2-teks-pelbagai"`, `"2-2-3-mentafsir-menaakul"` |
| Tahun 3 | `"3-{M}-{T}-{slug}"` | `"3-1-1-mendengar-mengulas"`, `"3-1-2-berkomunikasi"`, `"3-2-1-teks-kompleks"`, `"3-2-2-kelancaran-membaca"`, `"3-2-3-membaca-kritikal"` |

### Module ID Naming Convention

| Year | Module IDs |
|------|-----------|
| Tahun 1 | `"1-mendengar"`, `"1-membaca"`, `"1-menulis"`, `"1-seni-bahasa"`, `"1-tatabahasa"` |
| Tahun 2 | `"2-mendengar"`, `"2-membaca"`, `"2-menulis"`, `"2-seni-bahasa"`, `"2-tatabahasa"` |
| Tahun 3 | `"3-mendengar"`, `"3-membaca"`, `"3-menulis"`, `"3-seni-bahasa"`, `"3-tatabahasa"` |

### Back-Chain State Resets

```
Back from topic game  -> setBmTopic(null)              -> returns to module hub
Back from module hub  -> setBmModule(null) + setBmTopic(null) -> returns to year selector
Back from year select -> setCurrentSubject(null)        -> returns to HomePage
```

**Important:** Back from `BahasaMelayuModulePage` must reset BOTH `bmModule` AND `bmTopic`. Resetting only `bmModule` while `bmTopic` is set will cause the topic game to re-render on next module entry.

```js
const hubOnBack = () => { setBmModule(null); setBmTopic(null); };
```

### Routing Logic in `case "bm-kssr"`

```js
// Helper: wraps onBack to save progress before returning to hub
const topicOnBack = () => { setBmTopic(null); };
const topicComplete = (id) => { markTopicCompleted(id); };

case "bm-kssr":
  // -- Tahun 1 Topics (new — use BMLessonQuizLayout) --
  if (bmTopic === "1-1-1-mendengar-menyebut")
    return <MengenalHuruf group="vokal" onBack={topicOnBack} language={language} topicComplete={topicComplete} />;
  // ...same for "1-1-3-konsonan-bj" / "1-1-4-konsonan-kr" / "1-1-5-konsonan-sz"
  //    with group="konsonan-bj" / "konsonan-kr" / "konsonan-sz"

  // -- Tahun 1 Topics (reuse — wrapped in ProgressWrapper) --
  if (bmTopic === "1-1-2-bertutur-maklumat")
    return <ProgressWrapper topicId={bmTopic} onBack={topicOnBack}>
             <SebutFrasaBergambar language={language} />
           </ProgressWrapper>;
  if (bmTopic === "1-2-1-asas-membaca")
    return <ProgressWrapper topicId={bmTopic} onBack={topicOnBack}>
             <SukuKataBinaPerkataan language={language} />
           </ProgressWrapper>;
  if (bmTopic === "1-2-3-membaca-menaakul")
    return <ProgressWrapper topicId={bmTopic} onBack={topicOnBack}>
             <KefahamanBacaan language={language} />
           </ProgressWrapper>;
  if (bmTopic === "1-3-2-bina-ayat")
    return <ProgressWrapper topicId={bmTopic} onBack={topicOnBack}>
             <SentenceBuilder language={language} />
           </ProgressWrapper>;
  if (bmTopic === "1-5-1-morfologi-kata")
    return <ProgressWrapper topicId={bmTopic} onBack={topicOnBack}>
             <JenisKata language={language} />
           </ProgressWrapper>;
  if (bmTopic === "1-5-2-sintaksis-ayat")
    return <SintaksisAyat onBack={topicOnBack} language={language}
             topicComplete={(id) => markTopicCompleted(id)} />;

  // -- Module hub (bmModule set, no topic) --
  if (bmModule) {
    const hubOnBack = () => { setBmModule(null); setBmTopic(null); };
    return (
      <BahasaMelayuModulePage year={bmYear} activeModule={bmModule} language={language}
        onBack={hubOnBack}
        onModuleChange={(id) => navigate(() => { setBmModule(id); setBmTopic(null); })}
        onSelectTopic={(id) => navigate(() => setBmTopic(id))}>
        <BMModuleHubLayout year={bmYear} activeModule={bmModule} language={language}
          onSelectTopic={(id) => navigate(() => setBmTopic(id))} />
      </BahasaMelayuModulePage>
    );
  }

  // -- Year selector --
  return <BahasaMelayuHomePage onBack={handleBackToHome} language={language}
    onSelectYear={(y) => navigate(() => { setBmYear(y); setBmModule(y === 1 ? 'mendengar' : y + '-mendengar'); })} />;
```
```

### "Next" Navigation: Same-Module vs Cross-Module

Two distinct, non-overlapping helpers exist in `_shared/ModuleData.js`. **Never conflate them** — this caused 3 rounds of bugs when first building Topik 1.8 (2026-06-11).

| Helper | Returns | Used by | Contract |
|---|---|---|---|
| `getNextTopicId(topicId)` | Next topic's `id` in the **same module**, or `null` if `topicId` is the module's last topic | `bmNextTopic` → `BMLessonQuizLayout`'s "Topik Seterusnya →" (Pattern 1, all 19+ quiz topics) | **DO NOT change this contract.** It must stay same-module-only — it is shared by every Pattern-1 topic's pass screen. |
| `getNextModuleId(topicId)` | The **next module's** bare `id` (e.g. `'membaca'`), or `null` if `topicId` is in the year's last module | `bmNextModule` → currently only Topik 1.8's "Modul Seterusnya →" (Pattern 3 completion screen) | Caller adds the year prefix for T2/T3 (`` `${year}-${id}` ``). Lands on the **module hub/trail page** (`bmTopic = null`), not a topic. |

App.jsx wiring (inside the `if (bmTopic)` branch):

```js
const bmNextTopic = getNextTopicId(bmTopic);   // same-module "Topik Seterusnya"

const bmNextModId = getNextModuleId(bmTopic);  // cross-module "Modul Seterusnya"
const bmNextModule = bmNextModId
  ? () => navigate(() => { setBmModule(bmYear === 1 ? bmNextModId : `${bmYear}-${bmNextModId}`); setBmTopic(null); })
  : undefined;
```

When adding a NEW topic that needs a "go to next module" button on its completion screen (Pattern 3, or a Pattern-1 topic that is the LAST in its module), pass `onNextModule={bmNextModule}` — do not repurpose `getNextTopicId`/`onNextTopic` for this.

### Navigation Flow (Simplified)

```
HomePage
  -> [BM KSSR] card -> setCurrentSubject("bm-kssr")
    -> BahasaMelayuHomePage (year selector)
      -> Click "Tahun 1" -> setBmYear(1) + setBmModule("1-mendengar")
        -> BahasaMelayuModulePage + BahasaMelayuModuleNavBar (5 tabs)
          -> M1 hub trail (5 nodes: A–Z journey)
               -> Click "1.1 Mengenal Huruf Vokal"
               -> setBmTopic("1-1-1-mendengar-menyebut")
               -> App.jsx renders: <MengenalHuruf group="vokal" onBack={...} language={...} />
                <- onBack -> setBmTopic(null) -> back to hub
          <- hubOnBack -> setBmModule(null) + setBmTopic(null) -> year selector
```

---

## 9. Existing Games Inventory

### Tahun 1 (all under `BahasaMelayuPage/Tahun1/`)

| File | BM Module | BM Topic | Status |
|------|-----------|----------|--------|
| `Module1_Mendengar/MengenalHuruf.jsx` | M1: Mendengar | 1.1–1.4 A–Z letters | ✅ New shared lesson page (`group` prop) |
| `Module1_Mendengar/DengarTeka.jsx` | M1: Mendengar | 1.6 Dengar & Teka | ✅ New quiz-only |
| `Module1_Mendengar/SukuKata.jsx` | M1: Mendengar | 1.5 Suku Kata | ✅ New wrapper (reuses KVLearningPage) |
| `Module1_Mendengar/BacaFrasaBergambar.jsx` | M1: Mendengar | 1.7 Baca Frasa Bergambar | ✅ Reuse (migrated from AgeGroup-7; +ayat-tunggal STT tier added 2026-06-11) |
| `Module1_Mendengar/DengarBuat.jsx` | M1: Mendengar | 1.8 Dengar & Buat | ✅ New — "Pattern 3" standalone activity (added 2026-06-11) |
| `Module2_Membaca/AsasMembaca.jsx` | M2: Membaca | 2.1 Asas Membaca & Memahami | ✅ Reuse (migrated from AgeGroup-7; direct-wired + blue palette 2026-06-12) |
| `Module2_Membaca/BacaPerkataan.jsx` | M2: Membaca | 2.2 Baca Perkataan KVK | ✅ New (2026-06-12 — 15 pure-KVK words, syllable builder) |
| `Module2_Membaca/MembacaMekanis.jsx` | M2: Membaca | 2.3 Baca dengan Lancar | ✅ New (STT read-aloud, in-file `ITEMS`) |
| `Module2_Membaca/FahamiCerita.jsx` | M2: Membaca | 2.4 Fahami Cerita | ✅ New (2026-06-12 — story pager + Pattern-1 main-idea quiz) |
| `Module2_Membaca/MembacaMenaakul.jsx` | M2: Membaca | 2.5 Baca & Fahami | ✅ Reuse (migrated from AgeGroup-7; direct-wired + blue palette 2026-06-12) |
| `Module3_Menulis/AsasMenulis.jsx` | M3: Menulis | 3.1 Asas Menulis | ✅ New |
| `Module3_Menulis/BinaAyat.jsx` | M3: Menulis | 3.2 Bina Ayat | ✅ Reuse (migrated from AgeGroup-7) |
| `Module3_Menulis/MencatatMaklumat.jsx` | M3: Menulis | 3.3 Mencatat Maklumat | ✅ New |
| `Module4_SeniBahasa/KeindahanBahasa.jsx` | M4: Seni Bahasa | 4.1 Keindahan Bahasa | ✅ New |
| `Module5_Tatabahasa/MorfologiGolonganKata.jsx` | M5: Tatabahasa | 5.1 Morfologi | ✅ Reuse (migrated from AgeGroup-7) |
| `Module5_Tatabahasa/SintaksisAyat.jsx` | M5: Tatabahasa | 5.2 Sintaksis | ✅ New |

### Tahun 2 (all under `BahasaMelayuPage/Tahun2/`)

| File | BM Module | BM Topic | Status |
|------|-----------|----------|--------|
| `Module1_Mendengar/MendengarMerespons.jsx` | M1: Mendengar | 1.1 Mendengar & Merespons | ✅ Reuse (migrated from AgeGroup-7) |
| `Module1_Mendengar/BerceritaBerbincang.jsx` | M1: Mendengar | 1.2 Bercerita & Berbincang | ✅ Reuse (migrated from AgeGroup-7) |
| `Module2_Membaca/PerkataanSukar.jsx` | M2: Membaca | 2.1 Perkataan Sukar | ✅ New |
| `Module2_Membaca/TeksPelbagaiGaya.jsx` | M2: Membaca | 2.2 Teks Pelbagai Gaya | ✅ Reuse (migrated from AgeGroup-8) |
| `Module2_Membaca/MentafsirMenaakul.jsx` | M2: Membaca | 2.3 Mentafsir & Menaakul | ✅ Reuse (migrated from AgeGroup-8) |
| `Module3_Menulis/MenulisMekanis.jsx` | M3: Menulis | 3.1 Menulis Mekanis | ✅ New |
| `Module3_Menulis/HasilkanPenulisan.jsx` | M3: Menulis | 3.2 Hasilkan Penulisan | ✅ New |
| `Module3_Menulis/JawapanPemahaman.jsx` | M3: Menulis | 3.3 Jawapan Pemahaman | ✅ New |
| `Module4_SeniBahasa/ApresiasiSastera.jsx` | M4: Seni Bahasa | 4.1 Apresiasi Sastera | ✅ Reuse (migrated from AgeGroup-8) |
| `Module4_SeniBahasa/PersembahanKarya.jsx` | M4: Seni Bahasa | 4.2 Persembahan Karya | ✅ New |
| `Module5_Tatabahasa/MorfologiPerluasan.jsx` | M5: Tatabahasa | 5.1 Morfologi | ✅ Reuse (migrated from AgeGroup-7) |
| `Module5_Tatabahasa/PembentukanPerkataan.jsx` | M5: Tatabahasa | 5.2 Pembentukan Kata | ✅ Reuse (migrated from AgeGroup-7) |
| `Module5_Tatabahasa/SintaksisAyatMajmuk.jsx` | M5: Tatabahasa | 5.3 Ayat Majmuk | ✅ New |

### Tahun 3 (all under `BahasaMelayuPage/Tahun3/`)

| File | BM Module | BM Topic | Status |
|------|-----------|----------|--------|
| `Module1_Mendengar/MendengarMengulas.jsx` | M1: Mendengar | 1.1 Mendengar & Mengulas | ✅ New |
| `Module1_Mendengar/KomunikasiBertatasusila.jsx` | M1: Mendengar | 1.2 Berkomunikasi | ✅ New |
| `Module2_Membaca/TeksKompleks.jsx` | M2: Membaca | 2.1 Teks Kompleks | ✅ Reuse (migrated from AgeGroup-8) |
| `Module2_Membaca/KelancaranMembaca.jsx` | M2: Membaca | 2.2 Kelancaran Membaca | ✅ New |
| `Module2_Membaca/MembacaKritikal.jsx` | M2: Membaca | 2.3 Membaca Kritikal | ✅ Reuse (migrated from AgeGroup-9) |
| `Module3_Menulis/MenulisKarangan.jsx` | M3: Menulis | 3.1 Menulis Karangan | ✅ New |
| `Module3_Menulis/MengeditTeks.jsx` | M3: Menulis | 3.2 Mengedit Teks | ✅ Reuse (migrated from AgeGroup-7) |
| `Module3_Menulis/MenulisKreatif.jsx` | M3: Menulis | 3.3 Menulis Kreatif | ✅ New |
| `Module4_SeniBahasa/EstetikaBahasa.jsx` | M4: Seni Bahasa | 4.1 Estetika Bahasa | ✅ Reuse (migrated from AgeGroup-9) |
| `Module4_SeniBahasa/ApresiasiKaryaSeni.jsx` | M4: Seni Bahasa | 4.2 Apresiasi Karya | ✅ Reuse (migrated from AgeGroup-8) |
| `Module5_Tatabahasa/MorfologiLanjutan.jsx` | M5: Tatabahasa | 5.1 Morfologi Lanjutan | ✅ New |
| `Module5_Tatabahasa/ImbuhanMajmukGanda.jsx` | M5: Tatabahasa | 5.2 Pembentukan Kata | ✅ Reuse (migrated from AgeGroup-9) |
| `Module5_Tatabahasa/JenisJenisAyat.jsx` | M5: Tatabahasa | 5.3 Jenis Ayat | ✅ Reuse (migrated from AgeGroup-9) |

### Gaps Summary

| Year | Missing Topics |
|------|----------------|
| T1 | ✅ None — all **19 topics** complete (16 files: 11 new + 5 reused — `MengenalHuruf.jsx` covers 4 topics 1.1–1.4 via `group` prop). Topik 1.8 "Dengar & Buat" added 2026-06-11; **M2 expanded 3→5 topics 2026-06-12** (new `BacaPerkataan.jsx` 2.2 + `FahamiCerita.jsx` 2.4). |
| T2 | ✅ None — all 13 topics complete (6 new + 7 reused) |
| T3 | ✅ None — all 13 topics complete (6 new + 7 reused) |

---

## 10. Architecture — Two-Page Routed Approach (Duolingo-Style)

The BM KSSR learning path uses a **two-page routed architecture** — the module hub stays as pure navigation, and each topic is a separate page routed via App.jsx.

### How It Works

App.jsx state: `bmYear` -> `bmModule` -> `bmTopic`

```
bmYear=1, bmModule="1-mendengar", bmTopic=null
  -> Render BahasaMelayuModulePage -> shows M1 journey trail

bmYear=1, bmModule="1-mendengar", bmTopic="1-1-1-mendengar-menyebut"
  -> Render <MengenalHuruf group="vokal" onBack={...} topicComplete={...} language={...} />
  -> Two-page lesson: learn page (letter cards, tap = TTS word) + emoji quiz
  -> onBack -> markTopicCompleted(id) + setBmTopic(null) -> returns to hub
```

### Data Flow

```
Hub:   isTopicCompleted(id) → 🟢 green check on completed nodes
       Trophy: "X/Y" completion count

Topic: useBMQuiz(currentQs, reviewQs, 15)
       → weighted merge: ~70% current + ~30% review
       → preparePool + ansRef (ref-hidden answers)
       → on complete: markTopicCompleted(id) + onBack()

App.jsx:
       → New topics: direct component render
       → Reused topics: <ProgressWrapper> wraps existing game
         (saves progress onBack with no edits to game file)
```

### What New Files Are Needed

| File | Purpose |
|------|---------|
| `BahasaMelayuPage/_shared/useModuleProgress.js` | localStorage read/write for topic completion |
| `BahasaMelayuPage/_shared/useBMQuiz.js` | Quiz hook: weighted merge, preparePool, ansRef, scoring |
| `BahasaMelayuPage/_shared/BMLessonQuizLayout.jsx` | Duolingo-style layout (explanation card + quiz) |
| `BahasaMelayuPage/_shared/ModuleData.js` (extend) | Add `BM_QUESTIONS` bank for all topics |
| `BahasaMelayuPage/_shared/BMModuleHubLayout.jsx` (extend) | Add progress indicators to nodes + trophy |
| `Tahun1/Module1_Mendengar/MengenalHuruf.jsx` | Shared A–Z letter lesson (T1 M1 topics 1.1–1.4 via `group` prop) |

### What Stays UNCHANGED

- Reused game files are wrapped at App.jsx level (no routing edits inside them). Exception: `SebutFrasaBergambar.jsx` was redesigned 2026-06-11 (standardized header, no auto-TTS, KV/KVK phrases) — the upgrade applies in both BM KSSR and the AgeGroup-7 hub.
- All `AgeGroup-*` home pages
- The existing `"bm"` subject routing (speech-practice BMPage)
- The existing PI layouts remain untouched

---

## 11. Shared Components (BM-Specific)

BM has its own shared components — the PI layout components are NOT used for new topic pages.

| Component | Source | Purpose |
|-----------|--------|---------|
| `BMHeader` | `BM/_shared/` | Reusable glassmorphism topbar: back button (label hidden ≤480px), centred title, optional `sectionLabel` (gradient decorative lines), optional `sticky` for quiz layouts |
| `useModuleProgress` | `BM/_shared/` | `isTopicCompleted()`, `markTopicCompleted()`, `clearAllProgress()` |
| `useBMQuiz` | `BM/_shared/` | Quiz state: weighted merge (70/30), preparePool, ansRef, scoring |
| `BMLessonQuizLayout` | `BM/_shared/` | Quiz page layout — renders each question's own text, optional big `emoji` prompt **or** `audioText` (auto-play + replay button), confetti burst on correct, star result screen |
| `Celebration` | `PI/_shared/` | Confetti overlay (shared across subjects) |
| `shuffle` | `PI/_shared/utils.js` | Fisher-Yates shuffle (shared across subjects) |

### BMLessonQuizLayout Usage

Lesson pages are two-page components: a self-contained learn page plus the
shared quiz layout. Current API (see `MengenalHuruf.jsx` / `SintaksisAyat.jsx`):

```jsx
export default function MengenalHuruf({ group = 'vokal', onBack, language = 'bm', topicComplete }) {
  const cfg = GROUPS[group];                       // letters, titles, topicId
  const quiz = useBMQuiz(BM_QUESTIONS[cfg.topicId] || [], [], 15);
  const [page, setPage] = useState('learn');

  const handleBack = () => { topicComplete?.(cfg.topicId); onBack?.(); };

  if (page === 'learn')
    return <LetterLearnPage cfg={cfg} onBack={handleBack}
             onStartQuiz={() => setPage('quiz')} language={language} />;

  return (
    <BMLessonQuizLayout
      onBack={handleBack}
      topicTitle={language === 'bm' ? cfg.title.bm : cfg.title.en}
      quiz={quiz}
      language={language}
      accentColor="#E8821A"
      onShowLearn={() => setPage('learn')}   // "Belajar Dulu" button on quiz start screen
    />
  );
}
```

Question objects support three prompt modes (set per question in `BM_QUESTIONS`):
`{ question, answer, options }` text-only · `+ emoji` big visual prompt ·
`+ audioText` TTS auto-play with replay button.

### BMHeader Usage

All BM topic pages use the shared `BMHeader` instead of inline per-prefix topbars.
Imported from `_shared/BMHeader.jsx`:

```jsx
import BMHeader from '../../_shared/BMHeader';
```

Props:

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `onBack` | `function` | ✅ | Click handler for the back button |
| `language` | `'bm' \| 'en'` | ✅ | Controls "Kembali" / "Back" label |
| `title` | `string` | ✅ | Centred heading text (truncated with ellipsis) |
| `sectionLabel` | `string` | ❌ | If set, renders a decorative sub-label with gradient lines (e.g. "Pilih Huruf untuk Belajar") |
| `sticky` | `boolean` | ❌ | If true, topbar uses `position: sticky; top: 0; z-index: 40` (used by `BMLessonQuizLayout`) |

Example — learn page (single row):
```jsx
<BMHeader onBack={onBack} language={language} title="Mengenal Huruf Vokal" />
```

Example — letter picker with section label:
```jsx
<BMHeader onBack={onBack} language={language} title="Suku Kata"
  sectionLabel={language === 'bm' ? 'Pilih Huruf untuk Belajar' : 'Select a Letter to Learn'} />
```

Example — quiz page (sticky):
```jsx
<BMHeader onBack={onBack} language={language} title={topicTitle} sticky />
```

The component injects its own CSS via an embedded `<style>` tag — no external stylesheet needed.

### ProgressWrapper Pattern (for reused games)

```jsx
function ProgressWrapper({ topicId, onBack, children }) {
  return React.cloneElement(children, {
    onBack: () => { markTopicCompleted(topicId); onBack(); }
  });
}
```

Topic pages are lazy-imported in App.jsx:

```jsx
const MengenalHuruf = lazy(() => import("./components/BahasaMelayuPage/Tahun1/Module1_Mendengar/MengenalHuruf"));
```

---

## 12. Module Colour System

Implemented module themes (`M{N}_THEME` in `_shared/ModuleData.js`):

| Module | Name (T1) | Accent `c` | Dark `cd` | Card Gradient |
|--------|-----------|-----------|-----------|---------------|
| 1 | Huruf Vokal & Frasa Bergambar | `#E8821A` | `#A34F0A` | Orange |
| 2 | Membaca | `#1E7AC9` | `#0E4A7E` | Blue |
| 3 | Menulis | `#7A4FD0` | `#3F2A86` | Purple |
| 4 | Seni Bahasa | `#E8568A` | `#A81E59` | Pink |
| 5 | Tatabahasa | `#159E96` | `#0B5E5A` | Teal |

Per-year theme for homepage:

| Year | Colour | Robot Accent |
|------|--------|-------------|
| Tahun 1 | Green | `#10B981` |
| Tahun 2 | Amber | `#F59E0B` |
| Tahun 3 | Rose | `#E11D48` |

Each module theme object (actual shape in `ModuleData.js`):

```js
const M1_THEME = {
  c: '#E8821A', cd: '#A34F0A',
  stage: 'radial-gradient(ellipse at 50% 34%,#FEE9C8 0%,#F5B76A 55%,#E8821A 100%)',
  background: 'radial-gradient(ellipse at top,#FEF4E6,#FAE0BB)',
};
```

### Theme Usage in BMLessonQuizLayout

Each topic page passes `accentColor` matching the module's theme `c`:

| Module | Color Code | Value |
|--------|-----------|-------|
| M1 — Huruf Vokal & Frasa Bergambar | `accentColor` | `#E8821A` |
| M2 — Membaca | `accentColor` | `#1E7AC9` |
| M3 — Menulis | `accentColor` | `#7A4FD0` |
| M4 — Seni Bahasa | `accentColor` | `#E8568A` |
| M5 — Tatabahasa | `accentColor` | `#159E96` |

The accent color drives the quiz UI (button gradients, borders, progress bar) via CSS custom properties injected by `<style>` in `BMLessonQuizLayout`.

---

## 13. Responsive Grid Spec

### Year selector grid (homepage `.bm-years`)

CSS: `display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; width: 100%; flex: 1; align-content: center;`

- **Always 3 equal columns on desktop** — never `auto-fit`/`auto-fill` with min-widths.
- `flex: 1; align-content: center` — the grid fills remaining viewport height and centres cards vertically.
- **No desktop scroll rule**: The flex chain `root -> scroll -> body -> wrap -> years` cascades `flex: 1` so content fills the viewport without scrolling on laptop/desktop.
- Mobile (`<=840px`): collapses to `1fr` single column, `max-width: 380px`. `overflow-y: auto` on the scroll container allows scrolling when 3 cards stack vertically.
- Mobile (`<=560px`): disc shrinks to 140px, robot SVG to 110x138px, card padding to 16px 14px 16px.

### Module hub topic grid (`.pi-mhub-grid`)

Same as PI: `auto-fit, minmax(230px, 1fr)`, gap 1rem.

### Topic card flexbox (`.scl-grid`)

Same as PI: flexbox wrap, `min-width: 280px`, `max-width: 380px`, container `max-width: 1080px`.

---

## 14. File Checklist

Two columns: **Phase 1-5 state** (hub files only, games still in AgeGroup-*) and **Phase 6 final state** (games migrated in).

### Phase 2-5 Target (build state — current)

```
src/components/BahasaMelayuPage/
+-- BahasaMelayuHomePage.jsx
+-- BahasaMelayuModulePage.jsx
+-- BahasaMelayuModuleNavBar.jsx
+-- _shared/
|   +-- BMJourneySvgs.jsx
|   +-- ModuleData.js                 (+ BM_QUESTIONS bank)
|   +-- BMModuleHubLayout.jsx         (progress indicators)
|   +-- BMHeader.jsx                  ★ NEW — reusable topbar
|   +-- BMLessonQuizLayout.jsx        ★ NEW — Duolingo-style
|   +-- useBMQuiz.js                  ★ NEW — quiz hook
|   +-- useModuleProgress.js          ★ NEW — progress persistence
+-- Tahun1/
|   +-- Module1_Mendengar/
|   |   +-- MengenalHuruf.jsx        ★ 1.1–1.4 A–Z letter journey (group prop)
|   +-- Module2_Membaca/
|   |   +-- BacaPerkataan.jsx        ★ 2.2 (KVK words)
|   |   +-- MembacaMekanis.jsx       ★ 2.3 (STT read-aloud)
|   |   +-- FahamiCerita.jsx         ★ 2.4 (story pager + quiz)
|   +-- Module3_Menulis/
|   |   +-- AsasMenulis.jsx          ★ 3.1 (tracing canvas)
|   |   +-- MencatatMaklumat.jsx     ★ 3.3
|   +-- Module4_SeniBahasa/
|   |   +-- KeindahanBahasa.jsx      ★ 4.1
|   +-- Module5_Tatabahasa/
|       +-- SintaksisAyat.jsx        ★ 5.2
+-- Tahun2/                            (same Module1-5 pattern, skeleton)
+-- Tahun3/                            (same Module1-5 pattern, skeleton)
```

> Reused T1 games (SebutFrasaBergambar, SukuKataBinaPerkataan, KefahamanBacaan,
> SentenceBuilder, JenisKata) still live in `AgeGroup-7/` until Phase 6.

> **Key difference from PI:** BM no longer uses per-module hub files (`M1Module.jsx`, etc.). All 15 modules are data-driven from `_shared/ModuleData.js` and rendered by `BMModuleHubLayout`. New BM-specific shared hooks and layout (`useBMQuiz`, `useModuleProgress`, `BMLessonQuizLayout`) provide the Duolingo-style learning experience.

### Phase 6 Final State (after migration)

```
src/components/BahasaMelayuPage/
+-- BahasaMelayuHomePage.jsx
+-- BahasaMelayuModulePage.jsx
+-- BahasaMelayuModuleNavBar.jsx
+-- _shared/
|   +-- BMJourneySvgs.jsx
|   +-- ModuleData.js
|   +-- BMModuleHubLayout.jsx
+-- Tahun1/
|   +-- Module1_Mendengar/
|   |   +-- MengenalHuruf.jsx             <- built (1.1–1.4)
|   |   +-- SukuKata.jsx                  <- built (1.5, KVLearningPage wrapper)
|   |   +-- DengarTeka.jsx                <- built (1.6, quiz-only)
|   |   +-- BacaFrasaBergambar.jsx        <- from AgeGroup-7/ (SebutFrasaBergambar; +ayat-tunggal tier)
|   |   +-- DengarBuat.jsx                <- built (1.8, new "Pattern 3" activity)
|   +-- Module2_Membaca/
|   |   +-- AsasMembaca.jsx               <- from AgeGroup-7/ (SukuKataBinaPerkataan), 2.1
|   |   +-- BacaPerkataan.jsx             <- built (2.2, KVK words)
|   |   +-- MembacaMekanis.jsx            <- built (2.3, STT read-aloud)
|   |   +-- FahamiCerita.jsx              <- built (2.4, story pager + main-idea quiz)
|   |   +-- MembacaMenaakul.jsx           <- from AgeGroup-7/ (KefahamanBacaan), 2.5
|   +-- Module3_Menulis/
|   |   +-- AsasMenulis.jsx               <- built (tracing canvas)
|   |   +-- BinaAyat.jsx                  <- from AgeGroup-7/ (SentenceBuilder)
|   |   +-- MencatatMaklumat.jsx          <- built
|   +-- Module4_SeniBahasa/
|   |   +-- KeindahanBahasa.jsx           <- built
|   +-- Module5_Tatabahasa/
|       +-- MorfologiGolonganKata.jsx     <- from AgeGroup-7/ (JenisKata)
|       +-- SintaksisAyat.jsx             <- built
+-- Tahun2/
|   +-- Module1_Mendengar/
|   |   +-- M1Module.jsx
|   |   +-- MendengarMerespons.jsx        <- from AgeGroup-7/
|   |   +-- BerceritaBerbincang.jsx       <- from AgeGroup-7/
|   +-- Module2_Membaca/
|   |   +-- M2Module.jsx
|   |   +-- PerkataanSukar.jsx            <- New
|   |   +-- TeksPelbagaiGaya.jsx          <- from AgeGroup-8/
|   |   +-- MentafsirMenaakul.jsx         <- from AgeGroup-8/
|   +-- Module3_Menulis/
|   |   +-- M3Module.jsx
|   |   +-- MenulisMekanis.jsx            <- New
|   |   +-- HasilkanPenulisan.jsx         <- New
|   |   +-- JawapanPemahaman.jsx          <- New
|   +-- Module4_SeniBahasa/
|   |   +-- M4Module.jsx
|   |   +-- ApresiasiSastera.jsx          <- from AgeGroup-8/
|   |   +-- PersembahanKarya.jsx          <- New
|   +-- Module5_Tatabahasa/
|       +-- M5Module.jsx
|       +-- MorfologiPerluasan.jsx        <- from AgeGroup-7/
|       +-- PembentukanPerkataan.jsx      <- from AgeGroup-7/
|       +-- SintaksisAyatMajmuk.jsx       <- New
+-- Tahun3/
    +-- Module1_Mendengar/
    |   +-- M1Module.jsx
    |   +-- MendengarMengulas.jsx         <- New
    |   +-- KomunikasiBertatasusila.jsx   <- New
    +-- Module2_Membaca/
    |   +-- M2Module.jsx
    |   +-- TeksKompleks.jsx              <- from AgeGroup-8/
    |   +-- KelancaranMembaca.jsx         <- New
    |   +-- MembacaKritikal.jsx           <- from AgeGroup-9/
    +-- Module3_Menulis/
    |   +-- M3Module.jsx
    |   +-- MenulisKarangan.jsx           <- New
    |   +-- MengeditTeks.jsx              <- from AgeGroup-7/
    |   +-- MenulisKreatif.jsx            <- New
    +-- Module4_SeniBahasa/
    |   +-- M4Module.jsx
    |   +-- EstetikaBahasa.jsx            <- from AgeGroup-9/
    |   +-- ApresiasiKaryaSeni.jsx        <- from AgeGroup-8/
    +-- Module5_Tatabahasa/
        +-- M5Module.jsx
        +-- MorfologiLanjutan.jsx         <- New
        +-- ImbuhanMajmukGanda.jsx        <- from AgeGroup-7/9/
        +-- JenisJenisAyat.jsx            <- from AgeGroup-9/
```

> After Phase 6: `AgeGroup-7/`, `AgeGroup-8/`, `AgeGroup-9/` retain only their hub shells (`Grade*Home.jsx`, `Grade*Screens.jsx`) and non-BM subject games. All BM curriculum game files live exclusively under `BahasaMelayuPage/`.

### E-Learning Feature Notes

| Feature | Module | Implementation |
|---------|--------|----------------|
| Microphone recording | M1 (all years) | Integrate with SpeechManager TTS/STT for pronunciation |
| Tracing canvas | T1 M3 3.1 | Canvas-based finger/stylus tracing for letter formation |
| Drag-and-drop word builder | T2 M2 2.1 | Phaser mini-game for digraph/diphthong words |
| Ref-hidden quiz | All lesson pages | Use existing preparePool() + ansRef pattern from Tahun1LessonScrollLayout |

---

> **Build Order:** Phase 0 -> Phase 1 -> Phase 2 -> Phase 2B (hooks + layout) -> Phase 3 (T1 content) -> Phase 4 (T2) -> Phase 5 (T3) -> Phase 6 (migration)
> Phase 2B establishes the shared infrastructure (useModuleProgress, useBMQuiz, BMLessonQuizLayout, BM_QUESTIONS). Then Phase 3+ builds topic pages using this foundation.
> **Status (2026-06-12): Phases 0–6 complete!** All **45 topics** across 3 years done (T1=**19**, T2=13, T3=13). T1 grew 16→17 with Topik 1.8 "Dengar & Buat" (2026-06-11), then 17→19 with the M2 rebuild (new 2.2 "Baca Perkataan KVK" + 2.4 "Fahami Cerita", 2026-06-12). Phase 7 (T1 coverage audit) is now at **32✅/41 rows** after R1-R3 + R7 closed all P1 and 5 P2 gaps (R7, 2026-06-12: "Ajuk Saya" mic on 1.1-1.4 + "Main Watak" dialog role-play STT on 4.1). Next: R8 (Kenalkan Diri, needs scope decision), R9 (KV/KVK swaps), T2/T3 audits pending; see §17 Build Roadmap.

---

## 15. Data Architecture Reference

> **Read this first if you're adding or editing any content** (questions, items, banks). It answers: *what data exists, what shape is it, and which file does it live in?*

### 15.1 Question Bank — `BM_QUESTIONS` (Pattern 1 lesson+quiz topics)

**File:** `_shared/ModuleData.js`, exported as `export const BM_QUESTIONS = { ... }`.

Shape: a single object keyed by **topic ID** (e.g. `'1-3-1-asas-menulis'`), each value an array of question objects. `useBMQuiz(currentQuestions, reviewQuestions, totalRounds)` (in `_shared/useBMQuiz.js`) consumes these arrays — `currentQuestions` is `BM_QUESTIONS[topicId]`, `reviewQuestions` is `BM_QUESTIONS[someEarlierTopicId] || []` (spaced repetition: ~30% of the round mix is drawn from `reviewQuestions` when the round size exceeds the current-topic pool).

Three question-object variants, distinguished by which optional fields are present:

| Variant | Fields | Renders as | TTS auto-play? | Used for |
|---|---|---|---|---|
| Text-only | `{ question, answer, options }` | `question` text + 4 option buttons | No | Reading/grammar items where the prompt is the question text itself |
| `+emoji` | `{ question, emoji, answer, options }` | Big emoji + `question` text + options | No | Visual vocabulary (e.g. "Apakah ini?" + 🐔 → Ayam) |
| `+audioText` | `{ question, audioText, answer, options }` | 🔊 speaker icon + "Dengar Semula" replay button + options | **Yes** — auto-plays `audioText` 300ms after the question loads | Listening items (letters, syllables, sentences read aloud) |

Field reference:
- `question` (string, required) — prompt text shown above the options
- `answer` (string, required) — must exactly match one entry in `options`
- `options` (string[4], required) — shuffled per-render by `preparePool()`; options ≤3 chars render uppercase at large size (letters/syllables), options >3 chars render in natural case as smaller "word" buttons
- `emoji` (string, optional) — in practice mutually exclusive with `audioText` (an item has one prompt mode or the other, not both)
- `audioText` (string, optional) — spoken via `SpeechManager.speak(audioText, 'ms-MY', { rate: 0.7, pitch: 1.2 })`, replayable via the "🔊 Dengar Semula" button

Examples (verbatim from `ModuleData.js`):
```js
// +audioText (letter/syllable level — most M1/M3 phonics items use this so the
// child hears the prompt, not just sees it)
{ question: 'Huruf manakah ini?', audioText: 'A', answer: 'A', options: ['A','B','C','D'] }

// +emoji (visual vocabulary — no TTS)
{ question: 'Apakah ini?', emoji: '🐔', answer: 'Ayam', options: ['Ayam','Itik','Epal','Ular'] }

// +audioText (sentence level)
{ question: 'Ayat manakah yang kamu dengar?', audioText: 'Saya suka bola.',
  answer: 'Saya suka bola.',
  options: ['Saya suka bola.','Saya suka buku.','Saya makan bola.','Saya ada bola.'] }
```

**Round size**: `useBMQuiz(currentQuestions, reviewQuestions, totalRounds = 15)`. Most topics use the default 15. **New banks should target ≥15 items** so a default-size quiz doesn't repeat questions in one sitting (smaller banks are acceptable only if `totalRounds` is passed explicitly lower).

### 15.2 In-file Item Arrays — Pattern 2/3 games (NOT in `BM_QUESTIONS`)

These are plain `const ARRAY_NAME = [...]` declarations local to a game's `.jsx` file — not part of the shared question bank, because their shape is game-specific (STT keyword matching, TTS instruction sequencing).

**STT item shape** (e.g. `Tahun1/Module1_Mendengar/BacaFrasaBergambar.jsx`'s `SENTENCES` / `PICTURES` arrays):
```js
{ id: 's1', emoji: '👦🎮', phrase: 'Saya main',
  keywords: [['saya','i','me'], ['main','bermain','play','playing']] }
```
- `id` — unique within the array (React key / debugging)
- `emoji` — visual prompt shown on the card
- `phrase` — the target Malay text the child must say; also used for "model the phrase" TTS fallback after `MAX_ATTEMPTS` (= 3) failed tries
- `keywords` — array of **slot arrays**. Each slot lists acceptable transcribed words for that position in the phrase (covers synonyms / STT misrecognitions, e.g. `'kakak'` / `'kak'` / `'sister'` / `'girl'`). The local `checkMatch(transcript, item)` helper (defined in the same file, NOT part of `SpeechManager`) requires `hit >= Math.ceil(item.keywords.length * 0.6)` slots to match — i.e. **≥60% of slots**. A sibling `grammarFor(item)` helper flattens+dedupes all keywords into a hint-grammar list passed to `SpeechManager.listen(..., { grammarWords })`.

**TTS instruction item shape** (e.g. `Tahun1/Module1_Mendengar/DengarBuat.jsx`'s `INSTRUCTIONS` array):
```js
{ id: 'i1', emoji: '🧠', text: 'Sentuh kepala', audioText: 'Sentuh kepala' }
```
- `id` — unique within the array
- `emoji` — visual icon shown on the activity card
- `text` — on-screen instruction label
- `audioText` — spoken via `SpeechManager.speak(audioText, 'ms')`, auto-played on the `PHASE_READY → PHASE_LISTENING` transition and replayable via "🔊 Ulang"
- Optional `type` discriminator — NOT currently used by DengarBuat (its 10 "arahan" + 3 "pesanan" items are pooled together untyped); add one only if a future activity needs to branch behaviour per item.

**Per-round sizing helper** (both games use this pattern — copy it verbatim for new Pattern 2/3 games):
```js
const shuffleArr = (arr) => [...arr].sort(() => Math.random() - 0.5);
const buildItems = () => shuffleArr(SOURCE_ARRAY).slice(0, Math.min(ITEMS_PER_ROUND, SOURCE_ARRAY.length));
```

### 15.3 Progress Persistence

**File:** `_shared/useModuleProgress.js`. Single localStorage key: `"bm-progress"`, a flat JSON object `{ [topicId]: true }`.

| Function | Signature | Behaviour |
|---|---|---|
| `isTopicCompleted(topicId)` | `(string) => boolean` | `true` iff `progress[topicId] === true` |
| `markTopicCompleted(topicId)` | `(string) => void` | Sets `progress[topicId] = true`, persists to localStorage |
| `clearAllProgress()` | `() => void` | Removes the entire `"bm-progress"` key |

No per-question scores, streaks, or attempt history are persisted — only a binary completed/not-completed flag per topic ID. In-game scores (⭐ stars, 🔥 streaks) are session-only React state, reset on remount/replay.

**Completion trigger differs by pattern** (full pattern descriptions in §16):
- **Pattern 1** (`BMLessonQuizLayout`): `topicComplete(topicId)` fires only when `finished && pct >= passPct` (default `PASS_PCT = 70`, exported from `BMLessonQuizLayout.jsx`). Failing the mastery gate does NOT mark the topic complete — the child sees "Cuba Lagi" (Try Again) instead of "Topik Seterusnya".
- **Pattern 2** (reused game inside `ProgressWrapper`, defined in `App.jsx`): `markTopicCompleted(topicId)` fires unconditionally the instant the child presses ANY "back" button inside the wrapped game — `ProgressWrapper` intercepts `onBack` via `React.cloneElement` and calls `markTopicCompleted(topicId)` before delegating to the real `onBack`. **There is no score gate** — this is the gap §17 R6 addresses.
- **Pattern 3** (standalone activity, e.g. DengarBuat): `topicComplete?.(TOPIC_ID)` fires once, inside `advanceItem()`, when the LAST item in the round is finished — regardless of per-item score.

### 15.4 "Where to Add New Content" — Decision Table

| I want to... | Edit this file | Add to... |
|---|---|---|
| Add/replace quiz questions for an existing Pattern-1 topic | `_shared/ModuleData.js` | The relevant array under `BM_QUESTIONS[topicId]` |
| Create a brand-new Pattern-1 topic (learn page + quiz) | New folder under `Tahun{N}/Module{M}_.../` + `_shared/ModuleData.js` | New `BM_QUESTIONS[newTopicId]` array (≥15 items, §15.1) + new entry in `T{N}_MODULES` |
| Add more sentences/phrases to BacaFrasaBergambar | `Tahun1/Module1_Mendengar/BacaFrasaBergambar.jsx` | `SENTENCES` or `PICTURES` const array (STT shape, §15.2) |
| Add more instructions to DengarBuat | `Tahun1/Module1_Mendengar/DengarBuat.jsx` | `INSTRUCTIONS` const array (TTS shape, §15.2) |
| Build a new Pattern-3 standalone activity | New `.jsx` under the relevant module folder | New in-file item array (STT or TTS shape, §15.2) + new topic ID in `_shared/ModuleData.js` `T{N}_MODULES` |
| Add a module hub icon / change a module's theme | `_shared/ModuleData.js` | `M{N}_THEME`, the relevant `buildModule()` call |
| Change pass threshold for a Pattern-1 quiz | `App.jsx` (caller) | Pass `passPct={N}` prop to `BMLessonQuizLayout` (overrides default `PASS_PCT = 70`) |

---

## 16. Topic Page Patterns Reference

> Three patterns exist for topic pages. When building a new topic (§17), pick the pattern that matches the activity type — don't invent a fourth without updating this section.

### 16.1 Pattern 1 — Lesson + Quiz (most common; 19+ topics)

**Structure:** a "learn" page (teaches the concept, e.g. shows letters/words/rules) + a quiz phase using `BMLessonQuizLayout` (`_shared/BMLessonQuizLayout.jsx`) driven by `useBMQuiz` (`_shared/useBMQuiz.js`). See §7 "Layout C - Topic Game / Lesson Page" for the visual/UX spec of the learn page itself.

**Wiring** (`useBMQuiz` + `BMLessonQuizLayout` props):
```js
const quiz = useBMQuiz(BM_QUESTIONS[topicId], BM_QUESTIONS[reviewTopicId] || [], 15);

<BMLessonQuizLayout
  onBack={onBack}
  topicTitle={topicTitle}
  quiz={quiz}
  language={language}
  accentColor={M_THEME.primary}     // module's theme colour
  onShowLearn={() => setShowLearn(true)}  // optional "Belajar Dulu" button
  topicId={topicId}
  topicComplete={topicComplete}     // from App.jsx: (id) => markTopicCompleted(id)
  onNextTopic={onNextTopic}         // from App.jsx: bmNextTopic (§8 — same-module only)
  // passPct={70}                   // optional override of PASS_PCT
/>
```

**Mastery gate:** `pct = round(score/totalRounds*100)`; `passed = pct >= passPct` (default 70). On `finished && passed`, `topicComplete(topicId)` fires once and a confetti celebration plays. The result screen shows "Topik Seterusnya →" (if `onNextTopic` provided and passed) or "← Kembali ke Trail"; failing shows only "Cuba Lagi" + "← Kembali ke Trail".

### 16.2 Pattern 2 — Reused Standalone Game (`ProgressWrapper`)

For topics that reuse a pre-existing game component (often migrated from `AgeGroup-7/8/9`) without restructuring it into Pattern 1. Defined in `App.jsx`:
```js
function ProgressWrapper({ topicId, onBack, children }) {
  return React.cloneElement(children, {
    onBack: () => { markTopicCompleted(topicId); onBack?.(); }
  });
}
// Usage:
<ProgressWrapper topicId={bmTopic} onBack={topicOnBack}>
  <SomeReusedGame language={language} />
</ProgressWrapper>
```
The wrapped game is unaware of BM progress — `ProgressWrapper` overrides its `onBack` prop so that ANY exit marks the topic complete. **Caveat (tracked in §17 R5/R6):** this means a child can mark a topic "done" by entering and immediately leaving, with zero score gate. Acceptable for now on simple games; flagged for hardening on games with real scoring. **Still on `ProgressWrapper`:** 3.2 (`bina-ayat`) and 1.7 (`bertutur-maklumat`). **No longer wrapped (2026-06-12):** 2.1 (`asas-membaca`) and 2.5 (`membaca-menaakul`) are now direct-wired and fire `topicComplete` on finishing their round — but still have no pass-% gate, so R6 still applies to them.

### 16.3 Pattern 3 — Standalone Activity (new, established by Topik 1.8 "Dengar & Buat", 2026-06-11)

For activities that are not multiple-choice quizzes at all — the child performs a physical/verbal action and self-reports completion. Reference implementation: `Tahun1/Module1_Mendengar/DengarBuat.jsx`.

**Phase machine:**
```
PHASE_READY ──(auto, 400ms)──▶ PHASE_LISTENING ──(TTS speaks item.audioText)──▶ (waits for child)
     ▲                                                                              │
     │                                                          tap "✓ Sudah!"      ▼
     │                                                                        PHASE_DONE
     │                                                                              │
     │                                              setTimeout 1600ms, advanceItem()│
     │                                                                              ▼
     └──────────────── if more items remain ───────────────────────── next item, PHASE_READY
                                  │
                                  │ if last item
                                  ▼
                            PHASE_COMPLETE  →  topicComplete?.(TOPIC_ID) fires once
                                                + confetti(200 particles)
```
- "🔊 Ulang" (Repeat) button re-speaks the current item's `audioText` at any point before `PHASE_DONE`.
- The voice-unsupported fallback screen (`SpeechManager.getUnsupportedReason()`) shows a "← Kembali" button instead of the activity, matching other voice-dependent games.
- **Completion screen** (`PHASE_COMPLETE`) shows score (`score`/`items.length`), best streak (`streak`), and two buttons: "🔄 Main Semula" (`handleReset` — rebuilds a fresh `buildItems()` round, returns to `PHASE_READY`) and "Modul Seterusnya →" (`onNextModule || onBack` — see §16.5 / §8 for the cross-module helper).
- Props: `{ onBack, language, topicComplete, onNextTopic, onNextModule }`. `onNextTopic` is accepted for consistency but DengarBuat doesn't currently render a "Topik Seterusnya" button (it's the LAST topic in M1, so `onNextTopic` is `undefined` for `'1-1-8-dengar-buat'` per `getNextTopicId`'s same-module contract — only `onNextModule` is meaningful here).

### 16.4 Multi-tier Reuse Games (Pattern 2 extension — BacaFrasaBergambar 1.7)

Established when Topik 1.7 (`BacaFrasaBergambar.jsx`, formerly `SebutFrasaBergambar` in AgeGroup-7) was extended with a second, harder tier (2026-06-11). Use this shape when a single topic must cover **two difficulty tiers of the same activity type** (e.g. easier "ayat tunggal" sentences before harder "frasa" phrases).

**Phase additions on top of the base STT phase machine** (`PHASE_READY` / `PHASE_LISTENING` / `PHASE_CORRECT` / `PHASE_WRONG`):
- `tier` state: `'sentences'` (first, easier — `SENTENCES` array) → `'phrases'` (second, harder — `PICTURES` array)
- `PHASE_TIER_COMPLETE` — shown only when `tier === 'sentences'` and the last sentence is answered. Displays the sentences-tier score and a "→ Seterusnya" button (`handleNextTier`) that:
  1. Saves the sentences score into `scoreSent`
  2. Switches `tier` to `'phrases'`, rebuilds `items` via `buildItems('phrases')`
  3. Resets `index`/`score`/`streak`/`attempts`/`micError`, returns to `PHASE_READY`
  - Also offers "← Kembali" (`onBack`) for a child who wants to stop after tier 1 — via `ProgressWrapper` this still marks the topic complete (Pattern 2 caveat, §16.2).
- `PHASE_COMPLETE` — shown after the LAST phrase (end of tier 2). Displays combined score (`scoreSent + score` out of `ITEMS_PER_ROUND + items.length`), per-tier breakdown ("Ayat Tunggal: x/8", "Frasa: y/8"), and best streak. Buttons: "🔄 Main Semula" (`handleReset` — returns fully to `tier='sentences'`, index 0) and "Kembali" (`onBack`).
- `handleSkip` (advance without scoring) and `handleRepeat` (re-speak `item.phrase`, no scoring) are available at any `PHASE_READY`/listening state in both tiers.

When adding a NEW multi-tier game, follow this same `tier` + `PHASE_TIER_COMPLETE` + combined-`PHASE_COMPLETE` shape rather than inventing a different transition model.

### 16.5 "Next" Navigation Cross-reference

Both same-module ("Topik Seterusnya") and cross-module ("Modul Seterusnya") navigation are fully specified in **§8 → "Next" Navigation: Same-Module vs Cross-Module**. Summary:

| Helper | Used by | Lands on |
|---|---|---|
| `getNextTopicId` → `bmNextTopic` → `onNextTopic` | Pattern 1 (`BMLessonQuizLayout`'s "Topik Seterusnya →") | Next topic in the SAME module |
| `getNextModuleId` → `bmNextModule` → `onNextModule` | Pattern 3 completion screens (currently only Topik 1.8); any Pattern-1 topic that is LAST in its module | Next module's hub/trail page (`bmTopic = null`) |

Do not duplicate this table elsewhere — link back to §8 if more detail is needed.

---

## 17. Build Roadmap (Tahun 1–3)

> **How to use this section:** each item below is independently buildable. Tell the assistant "build R{n}" (or describe the item) and it will implement ONLY that item — per the incremental-workflow rule, work proceeds one slice at a time with a status update between slices. Items are ordered by priority (P1 → P2 → P3 → audits), drawn from `reports/T1_COVERAGE_REPORT.md`'s "Consolidated Improvement Actions" table. T2's equivalent (`reports/T2_COVERAGE_REPORT.md`, R10) exists as of 2026-06-11. T3 equivalent (R11) remains pending.

### R1 — Rebuild T1 M5 5.1 "Jenis Kata" as a Pattern-1 bank ✅ DONE (2026-06-12)

- **Closes:** T1_COVERAGE_REPORT M5 A2, A4, A5, B1, B6, B7
- **Delivered:** Topic `'1-5-1-morfologi-kata'` (T1 M5, 5.1, displayed "Golongan Kata") converted from Pattern 2 (`ProgressWrapper` reusing `MorfologiGolonganKata.jsx`, 8 fixed items, no gate) to Pattern 1: new `Tahun1/Module5_Tatabahasa/JenisKataLesson.jsx` (learn page with 8 expandable word-class category cards — Kata Nama Am/Khas, Kerja, Adjektif, Hubung, Sendi Nama, Tanya, Ganti Nama Diri) + a 21-item `BM_QUESTIONS['1-5-1-morfologi-kata']` bank (the 4 existing categories ported as `+emoji` items, plus new Kata Hubung/Sendi Nama/Tanya/Ganti Nama Diri items) via `BMLessonQuizLayout`/`useBMQuiz`, gated at `pct >= 70`.
- **Storage:** Same topic ID `'1-5-1-morfologi-kata'` — no progress migration needed. `App.jsx` wiring switched from the `ProgressWrapper` block to a direct block mirroring `'1-5-2-sintaksis-ayat'` (`topicComplete`/`onNextTopic`/`key={bmTopic}`). Module hub trail label renamed to "Golongan Kata".
- **Preserved:** `MorfologiGolonganKata.jsx` (= old `JenisKata`) kept unchanged — still used standalone by the AgeGroup-7 game card (`App.jsx` `currentAgeGame` path).
- **Unlocks:** R5's "5.2 reviews 5.1" sub-item — 5.1 now has a `BM_QUESTIONS` bank.

### R2 — M4 4.1 "Keindahan Bahasa": add pantun dua kerat + fix garbled pantun #2 ✅ DONE (2026-06-12)

- **Closes:** T1_COVERAGE_REPORT M4 A2, C5
- **Delivered:** Topic `'1-4-1-keindahan-bahasa'` (T1 M4, 4.1) `PANTUNS` array in `KeindahanBahasa.jsx` grew from 3 to 6 entries — 3 new "Pantun Dua Kerat" prepended (Banyak udang banyak garam.../Banyak orang banyak ragam.; Gendang gendut tali kecapi.../Kenyang perut suka hati.; Emas, perak, tembaga, suasa.../Malas bergerak tidak merasa.), sourced from the classic-pantun set in `AgeGroup-8/PantunBacaan.jsx`. The garbled pantun #2 ("Pokok kelura...berpesan-pesann") was replaced with an authentic 4-kerat pantun ("Tingkap papan kayu bersegi, Sampan sakat di Pulau Angsa, Indah tampan kerana budi, Tinggi bangsa kerana bahasa") — thematically apt for "Keindahan Bahasa".
- **Quiz:** `BM_QUESTIONS['1-4-1-keindahan-bahasa']` grew from 15 to 19 items — added a "Pantun Dua Kerat = 2 baris" concept question plus one comprehension question per new dua-kerat pantun.
- **Storage:** Same topic ID `'1-4-1-keindahan-bahasa'`, no new topic, no UI changes — pure content edit in `_shared/ModuleData.js` and `KeindahanBahasa.jsx`.

### R3 — M2 2.3 "Baca dengan Lancar": add ayat majmuk items ✅ DONE (2026-06-12)

- **Closes:** T1_COVERAGE_REPORT M2 A8
- **Delivered:** Topic `'1-2-2-membaca-mekanis'` (T1 M2, displayed 2.3 "Baca dengan Lancar") is Pattern-2 speech read-aloud (`MembacaMekanis.jsx`, own in-file `ITEMS` array). Added 4 new `ITEMS` entries (s16-s19), one per conjunction — dan ("Abang makan nasi dan kakak minum air"), tetapi ("Hujan turun tetapi kami pergi sekolah"), atau ("Kita boleh main bola atau kita boleh berenang"), kerana ("Adik menangis kerana dia jatuh") — each pairing two full clauses (unlike the existing compound-subject items, which were ayat tunggal in disguise).
- **Storage:** Same topic ID `'1-2-2-membaca-mekanis'`, `ITEMS` grew from 15 → 19 (still shuffled to `ITEMS_PER_ROUND = 10` per round). No `BM_QUESTIONS` bank involved — the old `'1-2-2-membaca-mekanis'` MCQ bank was removed in the M2 rebuild (never imported).

### R4 — M2 idea-utama (main idea) questions ✅ DONE (2026-06-12)

- **Closes:** T1_COVERAGE_REPORT M2 A10 (idea-utama).
- **Delivered two ways:** (a) a whole new topic **2.4 "Fahami Cerita"** (`FahamiCerita.jsx`) — Pattern-1 main-idea quiz, 10 items in `BM_QUESTIONS['1-2-5-fahami-cerita']`, distractors are partial details by design; plus a story-pager learn page with per-story 🔊 read-aloud. (b) each passage in **2.5 "Baca & Fahami"** (`MembacaMenaakul.jsx` = `KefahamanBacaan`) now has an "Apakah idea utama petikan ini?" question (3 passages × 4 soalan).
- **Storage:** `KefahamanBacaan.jsx` migrated off `ProgressWrapper` to direct wiring with `BMHeader` + `topicComplete` + `onNextTopic` (matching the rest of M2). `markTopicCompleted('1-2-3-membaca-menaakul')` fires on finishing the round.
- **Remaining:** *idea sampingan* (supporting-detail identification) is still only implicit via distractors — a minor nuance, not separately tracked.

### R5 — Spaced repetition: populate `reviewQs` for M2-M5 ✅ DONE (2026-06-12)

- **Closes:** T1_COVERAGE_REPORT B2 in M2, M3, M5 (M4's B2 remains a known gap — single-topic module, out of scope for this item)
- **Delivered:** Wired `reviewQuestions` into 3 Pattern-1 quiz hosts via `useBMQuiz(currentQuestions, reviewQuestions, 15)`:
  - `'1-2-5-fahami-cerita'` (2.4, `FahamiCerita.jsx`) now reviews M1's `BM_QUESTIONS['1-1-6-dengar-teka']` (10-item vocabulary bank) — chosen as the M2 review host since 2.3 (`MembacaMekanis.jsx`) is Pattern-2 (no `BM_QUESTIONS` bank).
  - `'1-3-3-mencatat-maklumat'` (3.3, `MencatatMaklumat.jsx`) now reviews M2's `BM_QUESTIONS['1-2-5-fahami-cerita']` (10-item idea-utama bank) — redirected from the original "review 2.3" idea since 2.3 has no bank; keeps the reading-comprehension chain M1→M2→M3 conceptually continuous with zero new authoring.
  - `'1-5-2-sintaksis-ayat'` (5.2, `SintaksisAyat.jsx`) now reviews 5.1's `BM_QUESTIONS['1-5-1-morfologi-kata']` (21-item Golongan Kata bank, built by R1) — exactly as originally specified.
- **totalRounds tuning:** `FahamiCerita.jsx` passes `15` (not `10`) to `useBMQuiz` so all 10 of its own items can still surface — `useBMQuiz` reserves ~30% of `totalRounds` for review questions, so a value equal to the bank size would starve ~3 current items.
- **Storage:** Pure quiz-wiring edits (3 lines each) in `FahamiCerita.jsx`, `MencatatMaklumat.jsx`, `SintaksisAyat.jsx` — no new topic IDs, no `ModuleData.js` changes (all 3 review sources already existed as `BM_QUESTIONS` banks).

### R6 — Gate Pattern-2 reuse games + grow banks to ≥12 items (P2) ✅ DONE (2026-06-12)

- **Closes:** T1_COVERAGE_REPORT B6/B7 in M1, M2, M3
- **Delivered:** Added a `PASS_PCT = 70` mastery gate to 5 Pattern-2 games — each now computes a `pct` from its score on finishing and only calls `topicComplete(topicId)` when `pct >= PASS_PCT`; result/complete screens rewritten with pass/fail branches (🎉/💪 emoji, "Tahniah!"/"Cuba Lagi!" heading, fail message when `!passed`, and buttons: passed → "Main Semula" + "Topik Seterusnya →"/"Kembali"; failed → "🔄 Cuba Lagi" + "Kembali"). All 5 migrated off `ProgressWrapper` to direct wiring (`topicComplete={(id) => markTopicCompleted(id)}`, `onNextTopic={bmNextTopic}`, `key={bmTopic}`) in `App.jsx`:
  | Topic | Component | What changed |
  |---|---|---|
  | `'1-2-1-asas-membaca'` (2.1) | `AsasMembaca.jsx` | `QUESTIONS` grown 8 → 12 (4 new KV+KV items: gula/roti/jari/lori); gate + result screen added. |
  | `'1-2-4-baca-perkataan'` (2.2) | `BacaPerkataan.jsx` | Already 15 items (≥12); gate + result screen added. |
  | `'1-2-3-membaca-menaakul'` (2.5) | `MembacaMenaakul.jsx` (KefahamanBacaan) | Already 12 questions (≥12); gate + result screen added. |
  | `'1-3-2-bina-ayat'` (3.2) | `BinaAyat.jsx` (SentenceBuilder) | `QUESTIONS` grown 6 → 12 (6 new ayat-penyata items); header migrated `BackButton` → `BMHeader`, root container `height: '100%'` → `'100dvh'`; gate + result screen added; component now accepts `topicComplete`/`onNextTopic` props. |
  | `'1-1-2-bertutur-maklumat'` (1.7) | `BacaFrasaBergambar.jsx` (SebutFrasaBergambar) | Two-tier game (8 ayat-tunggal + 8 frasa); on reaching `PHASE_COMPLETE`, `pct = (scoreSent+score)/16`, gated via new `scoreRef`/`scoreSentRef` (synced from state via `useEffect`, read inside `advanceItem` to avoid stale-closure issues since `advanceItem`'s deps don't include `score`). Also fixed a pre-existing display bug where `totalItems` was `(scoreSent > 0 ? ITEMS_PER_ROUND : 0) + items.length` (undercounted when `scoreSent === 0` is a legitimate score) — now always `ITEMS_PER_ROUND + items.length`. |
  - *(`'1-5-1-morfologi-kata'` (5.1) was already converted to Pattern 1 by R1 — Pattern 1 has a built-in mastery gate, so it was never part of this list.)*
- **Out of scope:** 2.3 "Baca dengan Lancar" (`MembacaMekanis.jsx`, STT read-aloud, Pattern 2) remains ungated — not part of R6's 5-topic target table.
- **Storage:** All 5 topic IDs unchanged — no progress migration needed.

### R7 — "Ajuk Saya" mic + M4 4.1 dialog role-play STT (P2) ✅ DONE (2026-06-12)

- **Closes:** T1_COVERAGE_REPORT M1 A5, M4 A1
- **Delivered — Part A ("Ajuk Saya" repeat-after-me mic):** Every letter/word card across 1.1–1.4 (`MengenalHuruf.jsx`, all 4 groups served via the `group` prop — `vokal`, `konsonan-bj`, `konsonan-kr`, `konsonan-sz`, 26 cards total) now has a small circular 🎤 mic button in the top-right corner (gated on `SpeechManager.isSupported()`). Tap → `SpeechManager.listen('ms-MY', ...)` captures speech (called synchronously from the click handler, iOS-safe); `checkLetterMatch()` compares the transcript against the letter/word (includes-target-word OR token-matches-letter-name). On match: ✅ icon, `playSound('correct')`, small confetti burst, card border flashes green; on no match: ❌ icon, card border flashes red; either way the card resets after 1.4s. Cards were converted from `<button className="mh-card">` to `<div role="button" tabIndex={0}>` (with Enter/Space keyboard support) so the nested mic `<button>` stays HTML-valid. Fully self-contained per-card ✓/✗ feedback — does **not** gate `topicComplete`.
- **Delivered — Part B (dialog role-play STT):** New "Main Watak" secondary CTA on 4.1's learn page (`KeindahanBahasa.jsx`) opens a third `page` state, `DialogRoleplayPage`. 5 dialog lines selected from the existing `DIALOGUES` (all student-character lines: Ali×3, Ani×1, Adam×1), each paired with a `cue` — the preceding teacher line, auto-played via TTS (`SpeechManager.speak(cue.text, 'ms', ...)`) — for a turn-taking role-play feel. Child taps 🎤 and reads their line; `checkRoleplayMatch()` reuses the §15.2 `keywords` slot-array pattern (≥60% of 3-5 keyword slots per line must match the transcript). Full phase-machine (`READY → LISTENING → CORRECT/WRONG → advance`, `MAX_ATTEMPTS = 3`, refs to avoid stale closures in async STT callbacks) modeled directly on `BacaFrasaBergambar.jsx`'s pattern, including confetti/streak tracking, replay/skip controls, an unsupported-STT fallback screen, and a completion summary with "Main Semula"/"Kembali". Fully self-contained — does **not** gate `topicComplete` (4.1's existing Pattern-1 quiz via `BMLessonQuizLayout` already handles that).
- **Out of scope:** Neither Part A nor Part B changes `topicComplete` wiring or `ModuleData.js` — both are additive bonus activities on top of existing topics.
- **Storage:** No new topic IDs for either part — Part A is a cosmetic addition to 1.1-1.4's existing cards; Part B is a new `page` state (`'roleplay'`) inside 4.1's existing component, reached from its learn page and returning to it.

### R8 — "Kenalkan Diri" guided speaking + polite-request picker (P2, ⚠️ template-gradeable only)

- **Closes:** T1_COVERAGE_REPORT M1 A12, A13, A10
- **Status:** Report flags this as feasible **only as template-gradeable** (STT matched against a fixed sentence template, not free speech).
- **Scope decision needed before building:** M1 already has 8 topics (1.1-1.8); T1 is at **19 topics** total. This content needs either (a) a NEW Topik 1.9 (Pattern 3, similar to how 1.8 was added 2026-06-11 — would require another `T1_MODULES` M1 entry + node-count update across §2/§5/§8/§9/§14, the same set of edits made for 1.8 and for the M2 2.2/2.4 additions), or (b) folding into an existing M1 topic as bonus content. **Ask the user which when this item is picked up.**
- **Target (if new Topik 1.9, Pattern 3):**
  - "Kenalkan Diri": child reads/repeats template sentences ("Nama saya ___", "Saya berumur ___ tahun", "Saya belajar di ___") — STT checks for template structure + any non-empty fill (not exact-match, since names/ages vary).
  - Polite-request picker: multiple-choice — "Macam mana nak minta sesuatu dengan sopan?" → pick "Bolehkah saya..." over a rude phrasing.
- **Data:** New in-file item array (STT template shape, extends §15.2) + possibly a small `BM_QUESTIONS`-style array for the polite-request MCQ portion if built as a Pattern-1 mini-quiz instead.
- **Storage:** New topic ID (e.g. `'1-1-9-kenalkan-diri'`) if (a); existing topic ID if (b).
- **UI/UX:** If Pattern 3 — follow §16.3's phase machine (DengarBuat reference). If folded into existing topic — follow that topic's existing pattern.

### R9 — KV/KVK word swaps for Anggur/Singa (P3, low effort) ✅ DONE (2026-06-12)

- **Closes:** T1_COVERAGE_REPORT C1 across M1/M2/M3
- **Delivered — Part A (word swaps):** `_shared/ModuleData.js` — swapped `Anggur` 🍇 → `Alat` 🔧 in the `'1-1-1-mendengar-menyebut'` bank (vowel A section, answer on line 277 + 3 distractor references on lines 284/286/292, plus the Epal distractor line 279). Swapped `Singa` 🦁 → `Siput` 🐌 in the `'1-1-5-konsonan-sz'` bank (answer on line 330 + 3 distractor references on lines 331/335/339), plus the `'1-1-6-dengar-teka'` zirafah distractor (line 360). All 9 affected item entries updated.
- **Delivered — Part B (KV/KVK rule scope decision):** Guided-reading exception adopted and documented across M2/M3. **Rule:** The strict KV/KVK-only requirement applies to **decoding activities** (1.1/1.4 letter quizzes, 1.5 suku kata, 2.1 asas membaca, 2.2 baca perkataan KVK). **Exception:** Reading comprehension passages (2.3, 2.5, 3.3) and sentence-building (3.2) may use affixed words (meN-/ber-) as they involve whole-sentence guided reading with parent/teacher support, not isolated word decoding. M5 grammar examples are a separate documented exception (inherent to teaching Kata Kerja).

### R10 — Tahun 2 silibus coverage audit ✅ DONE (2026-06-11)

- **Status:** Already complete — `reports/T2_COVERAGE_REPORT.md` (249 lines) was produced in the initial 2026-06-11 audit pass.
- **Key findings:** T2 sits at **7✅ · 7⚠️ · 24❌ · 1➖ (39 rows)**. 7 of 13 topics are Pattern-2 reuses of components built for different silibus objectives. M2 Membaca is the only strong module (5✅·1❌). M1 and M5 5.1 need near-total rebuilds. 13 new improvement actions defined (R12–R24).
- **Output:** `reports/T2_COVERAGE_REPORT.md` — per-module A-row coverage tables, B/C/D standards deltas, ranked new-content roadmap (top 10 items by build effort), and consolidated R12-R24 action plan.
- **Update needed:** §17 BAHASA_MELAYU.md status table updated 2026-06-12 to reflect T2 audit completion and current stats.

### R11 — Tahun 3 silibus coverage audit (pending, not started)

- Same as R10, but for T3 (`reports/T3_COVERAGE_REPORT.md`, 5 modules, 13 topics: M1=2, M2=3, M3=3, M4=2, M5=3). Should be done AFTER R10 (T2) so that any cross-cutting fixes discovered in T2 (e.g. spaced-repetition or gating patterns) can be checked for the same gaps in T3 in one pass.
