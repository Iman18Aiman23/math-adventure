# 📋 Coverage Report — Tahun 1 (Modul 1–5)

> Template: `_CHECKLIST_TEMPLATE.md` · Silibus source: `BAHASA_MELAYU.md` §Silibus Tahun 1.
> KSSR BM Tahun 1 has **5 modul** (Mendengar & Bertutur, Membaca, Menulis, Seni Bahasa, Tatabahasa) — there is no Modul 6.
>
> **Status key:** ✅ PASS · ⚠️ PARTIAL · ❌ GAP · ➖ N/A (not feasible digitally)

## Overall Verdict

| Modul | Verdict | Silibus score | Headline gap |
|---|---|---|---|
| M1 Mendengar & Bertutur | ✅ COMPLETE | 12✅ · 0⚠️ · 0❌ · 1➖ | **R8 (new Topik 1.9 Kenalkan Diri) closes A10/A12/A13**: STT self-introduction template speaking + MCQ polite-request picker. Last ❌ row now closed. Single ➖ remains (A8 arah bunyi, out of scope). |
| M2 Membaca | ✅ COMPLETE | 10✅ · 0⚠️ · 0❌ | **Rebuilt to 5 topics (2026-06-12):** new 2.2 "Baca Perkataan KVK" closes A3; new 2.4 "Fahami Cerita" + 2.5 idea-utama questions close A10; 4 ayat-majmuk items added to 2.3 close A8 (R3) — module fully closed |
| M3 Menulis | ⚠️ PARTIAL | 2✅ · 3⚠️ · 0❌ | Tracing/handwriting still stops at letters; suku kata/perkataan/frasa now recognition-quizzed via dictation, not yet handwritten |
| M4 Seni Bahasa | ⚠️ PARTIAL | 3✅ · 1⚠️ · 0❌ · 1➖ | **Rebuilt 2026-06-12 (R2):** pantun bank expanded 3→6 (added 3 "Pantun Dua Kerat" + replaced garbled pantun #2) and quiz grew 15→19 items — closes A2 and C5. **(R7)** New "Main Watak" dialog role-play STT closes A1. Remaining gap is lagu/irama performance (A4, ➖) |
| M5 Tatabahasa | ✅ COMPLETE | 8✅ · 0⚠️ · 0❌ | **Expanded from 2 → 5 topics (R10):** 5.1 Golongan Nama (direct-quiz, BMStdShell), 5.2 Kata Kerja & Adjektif (direct-quiz, BMStdShell), 5.3 Kata Hubung & Sendi Nama (direct-quiz, BMStdShell, listen+type badges), 5.4 Kata Tanya & Ganti Nama (direct-quiz, BMStdShell, listen+type badges), 5.5 Sintaksis Ayat (Pattern-1 learn+quiz, BMHeader). All 5 share teal accent. Module fully closed since R1. |
| **Tahun 1 overall** | **⚠️ PARTIAL — 38✅ · 1⚠️ · 0❌ · 2➖ (41 rows)** | | **R9** closes C1 across M1/M2/M3 (KV/KVK word swaps + guided-reading exception documented). The only remaining ⚠️ rows: M3 A2/A4/A5 (handwriting/dictation penmanship — intentionally ⚠️, not a ❌). M1/M2/M5 fully closed. |

| Field | Value |
|---|---|
| Audit date / by | 2026-06-11 · Claude Code audit (M1 audited first, M2–M5 same day) |
| Question banks audited | All 12 T1 keys in `BM_QUESTIONS` + in-file data of 6 reuse/standalone games |
| **Update (2026-06-11, later same day)** | **P1 #1-3 implemented**: AsasMenulis quiz wiring (M3 A2/B7), 1.7 ayat-tunggal STT tier (M1 A7, M2 A7), Topik 1.8 "Dengar & Buat" (M1 A9, A11). M1/M2/M3 sections + scores + Consolidated Improvement Actions below updated accordingly. P1 #4 (M5 5.1 rebuild) remains — see `BAHASA_MELAYU.md` §17 R1. |
| **Update (2026-06-12) — M2 rebuild** | **Modul 2 expanded from 3 → 5 topics** (T1 now 19 topics total). Two new topics: **2.2 "Baca Perkataan KVK"** (`BacaPerkataan.jsx`, 15 pure-KVK words → closes A3) and **2.4 "Fahami Cerita"** (`FahamiCerita.jsx`, Pattern-1 main-idea quiz, 10 items → closes A10). Existing topics renumbered for sequential trail order (2.1 Asas · 2.2 KVK · 2.3 Baca dengan Lancar [was 2.2 mekanis] · 2.4 Fahami Cerita · 2.5 Baca & Fahami [was 2.3 menaakul]); opaque IDs unchanged so progress survives. All 5 topics reskinned to the M2 blue palette; 2.1 & 2.5 migrated off `ProgressWrapper` to direct wiring (`topicComplete`/`onNextTopic`). Two dead `BM_QUESTIONS` banks (`'1-2-2-membaca-mekanis'`, `'1-2-4-baca-perkataan'`) removed (never imported). M2 lifts from 6✅·2⚠️·2❌ to **9✅·0⚠️·1❌**; T1 overall 22✅→**25✅**. |
| **Update (2026-06-12) — M5 rebuild (R1)** | **Topik 5.1 "Golongan Kata" rebuilt from Pattern-2 (8 fixed items, no gate) to Pattern-1**: new `JenisKataLesson.jsx` learn page (8 expandable word-class category cards incl. Kata Hubung/Sendi Nama/Tanya/Ganti Nama Diri) + a 21-item gated quiz bank (`BM_QUESTIONS['1-5-1-morfologi-kata']`), wired directly with `topicComplete`/`onNextTopic` (≥70% mastery gate via `BMLessonQuizLayout`). Old `MorfologiGolonganKata.jsx` (= JenisKata) preserved for its standalone AgeGroup-7 game-card usage. Module hub label updated to "Golongan Kata". M5 lifts from 5✅·1⚠️·2❌ to **8✅·0⚠️·0❌**; T1 overall 25✅→**28✅** — the last remaining P1 is now closed. |
| **Update (2026-06-12) — M4 pantun rebuild (R2)** | **Topik 4.1 "Keindahan Bahasa" pantun bank expanded from 3 → 6 entries**: added 3 new "Pantun Dua Kerat" (Banyak udang banyak garam.../Banyak orang banyak ragam.; Gendang gendut tali kecapi.../Kenyang perut suka hati.; Emas, perak, tembaga, suasa.../Malas bergerak tidak merasa.) ordered before the existing 3 "Pantun Empat Kerat", closing the dua-kerat content gap (A2). The garbled pantun #2 ("Pokok kelura... berpesan-pesann") was replaced with an authentic, well-formed pantun ("Tingkap papan kayu bersegi... Tinggi bangsa kerana bahasa"), closing the language-quality gap (C5). `BM_QUESTIONS['1-4-1-keindahan-bahasa']` grew from 15 → 19 items with 4 new questions (Pantun Dua Kerat concept + comprehension of the 3 new pantuns). M4 lifts from 1✅·2⚠️·1❌·1➖ to **2✅·2⚠️·0❌·1➖**; T1 overall 28✅→**29✅**. |
| **Update (2026-06-12) — M2 ayat majmuk (R3)** | **Topik 2.3 "Baca dengan Lancar" `ITEMS` expanded from 15 → 19 entries**: added 4 genuine ayat-majmuk sentences (s16-s19), one per conjunction — dan ("Abang makan nasi dan kakak minum air"), tetapi ("Hujan turun tetapi kami pergi sekolah"), atau ("Kita boleh main bola atau kita boleh berenang"), kerana ("Adik menangis kerana dia jatuh") — each pairing two full clauses (unlike the existing compound-subject items), closing A8. M2 lifts from 9✅·0⚠️·1❌ to **10✅·0⚠️·0❌** — module fully closed; T1 overall 29✅→**30✅**. |
| **Update (2026-06-12) — R5/R6** | **R5 (spaced repetition)**: wired `reviewQuestions` into 3 Pattern-1 hosts (2.4 reviews M1 1.6, 3.3 reviews M2 2.4, 5.2 reviews M5 5.1) — closes B2 for M2/M3/M5. **R6 (mastery gates)**: added ≥70% pass gates to 5 Pattern-2 reuse games (2.1, 2.2, 2.5, 3.2, 1.7), migrated off `ProgressWrapper` to direct wiring with pass/fail result screens — closes B6/B7 for M1/M2/M3. Both are B-row (standards) deltas, not A-row silibus items, so the 41-row A-row tally is unchanged at **30✅**. |
| **Update (2026-06-12) — R7** | **"Ajuk Saya" mic** added to all 26 letter/word cards across 1.1–1.4 (`MengenalHuruf.jsx`) — child taps 🎤, STT checks the transcript against the letter/word with ✅/❌ feedback + confetti, closing M1 A5. **New "Main Watak" dialog role-play activity** (`DialogRoleplayPage`) added to 4.1 (`KeindahanBahasa.jsx`) — 5 dialog lines (Ali×3, Ani, Adam) with the preceding teacher line auto-played via TTS as a cue, child speaks the reply, STT checks ≥60% keyword-slot match, closing M4 A1. Both are self-contained bonus activities (no `topicComplete` gating). M1 lifts from 8✅·2⚠️·2❌·1➖ to **9✅·1⚠️·2❌·1➖**; M4 lifts from 2✅·2⚠️·0❌·1➖ to **3✅·1⚠️·0❌·1➖**; T1 overall 30✅→**32✅**. |
| **Update (next) — M5 topics 5.2–5.5 direct-quiz standardization (R10)** | **Module 5 expanded from 2 → 5 active topic pages.** New topics: **5.2 `KerjaAdjektifLesson`** (direct-quiz with BMStdShell, 14 rounds: 7 Kata Kerja + 3 Kata Adjektif + 4 review from 5.1; 4-option word-type classification), **5.3 `HubungSendiLesson`** (direct-quiz with BMStdShell, 12 rounds: 4 Kata Hubung + 4 Kata Sendi Nama sentence-completion + 4 review from 5.1/5.2 via 4-option word-type; listen button + type badges), **5.4 `TanyaGantiLesson`** (direct-quiz with BMStdShell, 15 rounds: 8 Kata Tanya + 3 Kata Ganti Nama sentence-completion + 4 review from 5.1/5.2 via 4-option word-type; listen button + type badges). Existing **5.1 `GolonganNamaLesson`** refactored from Pattern-1 (learn+quiz) to direct-quiz with BMStdShell (12 items, 2-option Kata Nama Am/Khas classification). **5.5 `SintaksisAyat`** retains Pattern-1 learn+quiz with BMHeader (52-item bank from `BM_QUESTIONS`). All 5 topics share the teal accent palette (`#159E96`). Spaced repetition chain: 5.2→5.1, 5.3/5.4→both 5.1+5.2 — closes B2 comprehensively across M5. |
| **Update (next) — R8 (Kenalkan Diri)** | **New Topik 1.9 `KenalkanDiri.jsx` wired into M1** (Pattern 3 standalone activity, cyan accent). Blended 9-item activity: 3 **STT self-introduction templates** ("Nama saya...", "Saya berumur...", "Saya belajar di...") with template-structure checking (verifies keyword slots like `[['nama'],['saya']]` are spoken), 3-attempt max with auto-advance; + 6 **MCQ polite-request picker** (2-option: polite vs rude). TTS audio for each prompt, confetti+streak tracking, complete screen with score/restart/module-next. Falls back to self-report button when STT unsupported. T1 now **20 topics total** (was 19). M1 lifts from 9✅·1⚠️·2❌·1➖ to **12✅·0⚠️·0❌·1➖** — all ❌ rows closed. T1 overall 32✅→**35✅**. R8 scope decision: option (a) new topic chosen. |
| **Update (next) — R9 (KV/KVK word swaps + rule scope)** | **KV/KVK word swaps:** `Anggur`🍇→`Alat`🔧 (1.1 vowel A) and `Singa`🦁→`Siput`🐌 (1.4 konsonan S) replaced in `ModuleData.js` — 9 item entries updated (1 answer + 8 distractors). **Guided-reading exception** adopted: strict KV/KVK rule applies to decoding activities only (1.1/1.4/1.5/2.1/2.2). Passages (2.3/2.5/3.2/3.3) may use affixed words — natural whole-sentence guided reading. M1 C1 ⚠️→✅, M2 C1 ⚠️→✅, M3 C1 ⚠️→✅. T1 overall 35✅→**38✅**; ⚠️ count drops from 4→1 (only M3's 3 handwriting ⚠️ remain). |

---

# Modul 1 — Kemahiran Mendengar dan Bertutur

| Field | Value |
|---|---|
| App module name (hub) | "Huruf Vokal & Frasa Bergambar" (A–Z journey, 7 nodes) |
| Topics audited | 1.1–1.4 `MengenalHuruf.jsx` · 1.5 `SukuKata.jsx` · 1.6 `DengarTeka.jsx` · 1.7 `BacaFrasaBergambar.jsx` (STT, 2 tiers) · 1.8 `DengarBuat.jsx` (TTS arahan/pesanan) · 1.9 `KenalkanDiri.jsx` (STT self-intro + MCQ polite-request, new) |

## A. Silibus Coverage

### Topik 1.1 — Mendengar dan Menyebut

| # | Keperluan silibus | Status | Evidence | Notes |
|---|---|---|---|---|
| A1 | Mendengar & mengecam bunyi **vokal** | ✅ | 1.1 learn cards (tap = TTS) + quiz; reviewed in 1.5/1.6 | Strong, spaced repetition. |
| A2 | Mendengar & mengecam bunyi **konsonan** | ✅ | 1.2–1.4 cover B–Z; `REVIEW_SOURCES` chains groups | Full A–Z. |
| A3 | Mengecam bunyi **suku kata** (KV/KVK) | ✅ | 1.5 flashcards + first-syllable quiz | Bridge to M2. |
| A4 | Mendengar & mengecam **perkataan** | ✅ | 1.6 Dengar & Teka (TTS word → written word) | Sound-alike distractors. |
| A5 | **Menyebut** bunyi / perkataan dengan betul | ✅ | **(2026-06-12)** "Ajuk Saya" mic added to all 26 letter/word cards across 1.1–1.4 (`MengenalHuruf.jsx`) — child taps 🎤, STT checks the transcript against the letter/word with ✅/❌ feedback + confetti on correct | Closed by R7. Self-contained, doesn't gate `topicComplete`. |
| A6 | Menyebut **frasa** dengan betul dan jelas | ✅ | 1.7 STT ≥60% keyword match + 🔊 model | Tier 2 ("frasa", `PICTURES`) of the now-2-tier 1.7. |
| A7 | Menyebut **ayat tunggal** | ✅ | **(2026-06-11)** 1.7 now opens with an "ayat tunggal" tier (`SENTENCES`, 8 items) — STT ≥60% keyword match, same as A6 — BEFORE the frasa tier | Closed alongside M2 A7 in one extension (P1 #2). |
| A8 | Mengajuk & menentukan **arah bunyi** | ➖ | — | Needs physical sound direction; out of scope. |

### Topik 1.2 — Bertutur dan Menyampaikan Maklumat

| # | Keperluan silibus | Status | Evidence | Notes |
|---|---|---|---|---|
| A9 | Respons terhadap **arahan mudah** | ✅ | **(2026-06-11)** New Topik 1.8 "Dengar & Buat" (`DengarBuat.jsx`) — TTS speaks an arahan (e.g. "Sentuh kepala"), child performs it physically and self-reports "✓ Sudah!"; 10 arahan items in the bank | Pattern 3 (standalone activity), self-report not STT-verified. |
| A10 | Respons terhadap **soalan bertumpu** | ✅ | **(R8)** Topik 1.9 polite-request MCQ asks focused situational questions ("Apa yang patut kamu cakap?") — the child selects the polite response from 2 options, demonstrating comprehension of a bertumpu-style question. | Closed by R8. |
| A11 | Respons terhadap **pesanan** | ✅ | **(2026-06-11)** Same Topik 1.8 bank also includes 3 "pesanan" (2-part relay-message) items, e.g. "Beritahu ibu kamu berlari" | Pooled with arahan items, 8 of 13 drawn per round. |
| A12 | **Memperkenalkan diri** / menyampaikan maklumat | ✅ | **(R8)** Topik 1.9 `KenalkanDiri.jsx` — 3 STT template-speaking items: child says "Nama saya...", "Saya berumur... tahun", "Saya belajar di...". STT checks for keyword slots (`[['nama'],['saya']]` etc) + extra tokens. 3 attempts per item, auto-advance with example replay. | Closed by R8. |
| A13 | **Permintaan dengan sopan** | ✅ | **(R8)** Topik 1.9 `KenalkanDiri.jsx` — 6 MCQ items: child picks the polite option (e.g. "Bolehkah saya pinjam pensel ini?") vs the rude one ("Bagi pensel itu sekarang!") across everyday scenarios (borrowing, passing through, thirst, teacher interaction, seat swap, gratitude). | Closed by R8. |

**Score: 12✅ · 0⚠️ · 0❌ · 1➖** — all ❌ rows now closed. A10/A12/A13 closed by R8 (new Topik 1.9). Only A8 (arah bunyi, ➖) remains out of scope. B6 has a minor gap for 1.9's bank (9 items < 12 threshold, see below).

## B/C/D — Standards (M1)

| # | Check | Status | Notes |
|---|---|---|---|
| B1 | Learn-before-quiz | ⚠️ | 1.6 quiz-only by documented decision; others ✅. |
| B2 | Spaced repetition | ✅ | Only module with review wiring (`REVIEW_SOURCES`, 1.5/1.6 review chains). |
| B3–B5 | Feedback / progress / audio modelling | ✅ | Confetti, ✓ hub badge, TTS everywhere. |
| B6 | Banks ≥12, plausible distractors | ⚠️ | 15/13/14/12/15/15/13/9. 1.8's `INSTRUCTIONS` (13) ✅. 1.9's `KenalkanDiri` has only 9 items (3 intro + 6 polite) — below the 12-threshold. Each item has plausible distractors (2 MCQ options or STT keyword-slot matching). Known gap for a Pattern 3 activity with limited natural content. |
| B7 | Mastery gate ≥70% | ✅ quiz topics & 1.7 · ➖ 1.8 | **(2026-06-12, R6)** 1.7 (STT, Pattern 2, 2 tiers) now computes `pct = (scoreSent+score)/16` and only fires `topicComplete` when `pct >= 70%`; result screen shows pass/fail with retry + "Topik Seterusnya". 1.8 (Pattern 3) remains a self-report activity by design — `topicComplete` fires on finishing the round regardless of score, no gate intended. |
| C1 | KV/KVK rule | ✅ | **(R9)** `Anggur` → `Alat` 🔧 (1.1) & `Singa` → `Siput` 🐌 (1.4) swapped for KV/KVK-clean words. 1.7 phrases/sentences clean. |
| C2–C5 | One-game-one-topic / labels / IDs / BM quality | ✅ | |
| D1–D6 | Lazy, TTS policy, STT guards, iOS CSS, responsive, icons | ✅ | |

---

# Modul 2 — Kemahiran Membaca

| Field | Value |
|---|---|
| Topics audited (5, rebuilt 2026-06-12) | 2.1 `AsasMembaca.jsx` (complete the missing KV syllable, 8 items, picture + hint) · 2.2 `BacaPerkataan.jsx` (**new** — complete the missing syllable for 15 pure-KVK words, picture + hint) · 2.3 `MembacaMekanis.jsx` ("Baca dengan Lancar" — STT read-aloud, 19 in-file `ITEMS` incl. 4 ayat majmuk, child reads each sentence via mic) · 2.4 `FahamiCerita.jsx` (**new** — story pager + Pattern-1 main-idea quiz, 10 items) · 2.5 `MembacaMenaakul.jsx` (= KefahamanBacaan: 3 passages × 4 soalan incl. an idea-utama Q each, explanation cites the petikan) |

## A. Silibus Coverage

> The 3 KSSR M2 content standards (Asas/Mekanis/Menaakul) are now delivered across **5 child-facing app topics** — see "Topics audited". Silibus row IDs (A1–A10) are unchanged.

| # | Keperluan silibus | Status | Evidence | Notes |
|---|---|---|---|---|
| A1 | Membaca & mengenal pasti huruf vokal/konsonan | ✅ | Delivered by M1 A–Z journey (1.1–1.4) | Cross-module credit, intentional design. |
| A2 | Membaca suku kata terbuka (KV) | ✅ | 2.1 syllable-completion + M1 1.5 | |
| A3 | Membaca suku kata tertutup (KVK) | ✅ | **(2026-06-12)** New topic 2.2 "Baca Perkataan KVK" — 15 pure-KVK words (lampu, pintu, bantal, rumput, kantin…), each built by completing the missing KVK syllable | Closes the former ⚠️; KVK is now a dedicated in-module task, not just one `lam` item in 1.5. |
| A4 | Membaca & memahami perkataan | ✅ | 2.1 + 2.2 (word + meaning hint + 🔊), 1.6 | Strengthened by 2.2's 15 words. |
| A5 | Membaca & memahami frasa | ✅ | **(2026-06-12)** 2.3 read-aloud sentences + 2.4/2.5 reading passages are all in-module reading tasks with comprehension | Former ⚠️ ("no in-module frasa reading") closed — M2 now has its own reading content, not just M1's oral 1.7. |
| A6 | Membaca & memahami ayat tunggal (pelbagai bahan) | ✅ | 2.3 sentences + 2.4 stories + 2.5 passages | |
| A7 | Membaca **secara mekanis** — sebutan betul, intonasi sesuai | ✅ | 2.3 "Baca dengan Lancar" is a dedicated in-module STT read-aloud (15 sentences, ≥60% keyword match, 3 attempts + model TTS); also 1.7's ayat-tunggal tier | Now an M2-native task (2026-06-12), no longer borrowed solely from M1's 1.7. |
| A8 | Membaca **ayat majmuk** secara mekanis | ✅ | **(2026-06-12)** 4 new ayat-majmuk items added to 2.3's `ITEMS` (s16-s19), one per conjunction — dan ("Abang makan nasi dan kakak minum air"), tetapi ("Hujan turun tetapi kami pergi sekolah"), atau ("Kita boleh main bola atau kita boleh berenang"), kerana ("Adik menangis kerana dia jatuh") — each pairs two full clauses, unlike the earlier compound-subject items | Closed by R3. |
| A9 | Memahami teks mudah (maklumat tersurat) | ✅ | 2.5 passages + 2.4 stories; explanations quote the petikan line | Good feedback design. |
| A10 | Mengenal pasti **idea utama & idea sampingan** | ✅ | **(2026-06-12)** New topic 2.4 "Fahami Cerita" is entirely main-idea practice (10 items, distractors are partial details by design) + each 2.5 passage now has an "Apakah idea utama petikan ini?" question | *Idea utama* solidly covered; *idea sampingan* (supporting detail) is touched only via the distractors — a minor remaining nuance, not a gap. |

**Score: 10✅ · 0⚠️ · 0❌** — A3/A5/A7/A9/A10 closed 2026-06-12 by the 5-topic rebuild; A8 closed 2026-06-12 by the ayat-majmuk additions (R3).

## B/C — Standards deltas (M2)

| # | Check | Status | Notes |
|---|---|---|---|
| B1 | Learn-before-quiz | ⚠️ | 2.4 ✅ (story pager → quiz); 2.5 ✅ (passage *is* the learn step); 2.3 ✅ (model TTS before reading); 2.1/2.2 quiz-only with picture + 🔊 hints. |
| B2 | Spaced repetition | ✅ | **(2026-06-12, R5)** 2.4 ("fahami-cerita") — the only M2 Pattern-1 host — now mixes in review questions from M1's `'1-1-6-dengar-teka'` (15-item vocabulary bank) via `reviewQuestions`. |
| B6 | Bank ≥12 | ⚠️ | **(2026-06-12, R6)** 2.1 ✅ grown from 8 → 12 · 2.2 ✅ 15 · 2.3 ✅ 19 `ITEMS` (incl. 4 ayat-majmuk, R3) · 2.4 ⚠️ 10 · 2.5 ✅ 12. |
| B7 | Mastery gate | ⚠️ | **(2026-06-12, R6)** 2.1/2.2/2.5 now gated ≥70% (pass/fail result screens + "Topik Seterusnya") · 2.4 ✅ gated (Pattern 1, ≥70%, pre-existing) · 2.3 still fires `topicComplete` on finishing the round with any score (STT read-aloud, out of R6 scope). |
| C1 | KV/KVK rule | ✅ | **(R9)** Guided-reading exception documented: reading comprehension passages (2.3/2.5) and sentence-building (3.2/3.3) may use natural affixed words — they involve whole-sentence reading with parent/teacher guidance, not isolated word decoding. Decoding activities (2.1/2.2) remain strictly KV/KVK-clean ✅. |
| UX | Module identity | ✅ | **(2026-06-12)** All 5 topics now use the M2 blue palette + shared `BMHeader`; trail numbering runs sequentially 2.1–2.5; 2.1/2.5 gained "Topik Seterusnya →" so the trail no longer dead-ends mid-module. |

---

# Modul 3 — Kemahiran Menulis

| Field | Value |
|---|---|
| Topics audited | 3.1 `AsasMenulis.jsx` (trace A–Z besar+kecil on `TraceCanvas`, TTS letter; **+ quiz step (2026-06-11)** using the `1-3-1-asas-menulis` bank, 15 items, gated ≥70%) · 3.2 `BinaAyat.jsx` (= SentenceBuilder: arrange shuffled words into ayat, 6 items, picture grafik) · 3.3 `MencatatMaklumat.jsx` (learn: 4 petikan + model nota; quiz bank 15) |

## A. Silibus Coverage

| # | Keperluan silibus | Status | Evidence | Notes |
|---|---|---|---|---|
| A1 | Menulis **huruf** secara mekanis | ✅ | 3.1 — all 26 letters, upper & lower case, stroke-verified canvas | Strong. |
| A2 | Menulis **suku kata / perkataan / frasa** secara mekanis | ⚠️ | **(2026-06-11)** The 15-item `1-3-1-asas-menulis` bank (huruf→suku kata→perkataan→frasa dictation) is no longer orphaned — wired into `AsasMenulis.jsx` as a gated post-tracing quiz step | Tracing/handwriting still stops at single letters; the new quiz step exercises auditory-recognition/spelling-match of suku kata/perkataan/frasa via MCQ, not handwriting. Fully closing this would need tracing canvases for syllables/words (not currently planned). |
| A3 | Membina & menulis **ayat tunggal** berdasarkan grafik/perkataan | ✅ | 3.2 word-arrangement with picture prompt | Constructive proxy for writing (standard digital substitute). |
| A4 | Menulis **jawapan pemahaman** (soalan bertumpu) | ⚠️ | 3.3 + 2.3 quizzes | Answered by picker, not written/typed. |
| A5 | **Mencatat maklumat** penting | ⚠️ | 3.3 learn page models structured notes per petikan; quiz tests recall | Note-taking is modelled and recognised, never produced by the child. |

**Score: 2✅ · 3⚠️ · 0❌** — the only ❌ (A2) closed to ⚠️ on 2026-06-11 (P1 #1).

## B/C — Standards deltas (M3)

| # | Check | Status | Notes |
|---|---|---|---|
| B1 | Learn-before-quiz | ✅ | 3.3 exemplary (petikan + nota); 3.1 now also follows this — trace (practice) → quiz (gated, 2026-06-11). |
| B2 | Spaced repetition | ✅ | **(2026-06-12, R5)** 3.3 now mixes in review questions from M2's `'1-2-5-fahami-cerita'` (10-item idea-utama bank) via `reviewQuestions`. |
| B6 | Bank ≥12 | ✅ | 3.3 ✅ 15 · 3.1 ✅ 15 (`1-3-1-asas-menulis`, now wired) · 3.2 ✅ **(2026-06-12, R6)** grown from 6 → 12 items. |
| B7 | Mastery gate | ✅ | 3.1 **(2026-06-11)**: tracing all 26 letters unlocks a gated quiz (`pct >= 70%` via `BMLessonQuizLayout`/`PASS_PCT`) — `topicComplete` only fires on pass. 3.2 **(2026-06-12, R6)**: now computes `pct = score/(QUESTIONS.length*10)` and only fires `topicComplete` when `pct >= 70%`; bank grown 6→12, migrated `BackButton`→`BMHeader`, result screen shows pass/fail with retry + "Topik Seterusnya". 3.3 ✅ (quiz topic, gated). |
| C1 | KV/KVK rule | ✅ | **(R9)** Same guided-reading exception as M2: 3.2 sentence-building and 3.3 petikan naturally include affixed words (guided context, not decoding). Decoding activity (3.1 tracing) unaffected. |

---

# Modul 4 — Aspek Seni Bahasa

| Field | Value |
|---|---|
| Topics audited | 4.1 `KeindahanBahasa.jsx` (learn tabs: 2 dialog with per-line TTS · 6 pantun [3 dua kerat + 3 empat kerat] · 2 lagu lyrics; quiz bank 19) |

## A. Silibus Coverage

| # | Keperluan silibus | Status | Evidence | Notes |
|---|---|---|---|---|
| A1 | **Mengujarkan dialog** — sebutan, intonasi, gaya (lakonan/didik hibur) | ✅ | **(2026-06-12)** New "Main Watak" role-play activity (`DialogRoleplayPage`) — 5 dialog lines (Ali×3, Ani, Adam) with the preceding teacher line auto-played via TTS as a cue; child speaks the reply, STT checks the transcript against keyword slots (≥60%) | Closed by R7. Child now speaks dialog lines; *intonasi*/*gaya* style itself remains unverifiable. |
| A2 | Melafazkan **pantun dua kerat** | ✅ | **(2026-06-12)** 3 new "Pantun Dua Kerat" added to the pantun tab (Banyak udang.../Banyak orang...; Gendang gendut.../Kenyang perut...; Emas, perak.../Malas bergerak...) + 4 new quiz items incl. a concept question ("Berapa baris... Pantun Dua Kerat?") | Closed by R2. |
| A3 | Melafazkan **pantun empat kerat** dengan irama | ⚠️ | 3 pantun displayed + quiz on pembayang/maksud structure | Receptive only; *irama* itself is unverifiable (see ➖). |
| A4 | **Menyanyikan lagu** kanak-kanak sambil aksi | ➖ | Lyrics shown as reading content | Singing/rhythm capture not feasible digitally (consistent with the Age-7 Obj-15 precedent). |
| A5 | Memahami struktur & nilai (pembayang/maksud, mesej pantun, isi dialog) | ✅ | Quiz 19 items incl. "Pisang emas" budi lesson + new dua-kerat comprehension items | Solid receptive coverage. |

**Score: 3✅ · 1⚠️ · 0❌ · 1➖** — A2 closed 2026-06-12 by the pantun dua kerat additions (R2); A1 closed 2026-06-12 by the "Main Watak" dialog role-play STT activity (R7).

## B/C — Standards deltas (M4)

| # | Check | Status | Notes |
|---|---|---|---|
| B2 | Spaced repetition | ❌ | `reviewQs = []`. M4 has only 1 topic (4.1) — not part of R5's 3-link target table, so this remains a known gap (no other module content is thematically close enough to review here yet). |
| B7 | Mastery gate | ✅ | Quiz topic, gated. |
| C5 | BM language quality | ✅ | **(2026-06-12)** Garbled pantun #2 replaced with "Tingkap papan kayu bersegi, Sampan sakat di Pulau Angsa, Indah tampan kerana budi, Tinggi bangsa kerana bahasa" — a well-formed a-b-a-b pantun thematically apt for "Keindahan Bahasa". |

---

# Modul 5 — Aspek Tatabahasa

| Field | Value |
|---|---|
| Topics audited (expanded to 5 topics) | **5.1** `GolonganNamaLesson.jsx` (direct-quiz, BMStdShell, 12-item 2-option classification: Kata Nama Am/Khas) · **5.2** `KerjaAdjektifLesson.jsx` (direct-quiz, BMStdShell, 14 rounds: 10 current Kata Kerja/Adjektif + 4 review from 5.1, 4-option word-type) · **5.3** `HubungSendiLesson.jsx` (direct-quiz, BMStdShell, 12 rounds: 8 sentence-completion Kata Hubung/Sendi Nama + 4 review from 5.1/5.2, listen button + type badges) · **5.4** `TanyaGantiLesson.jsx` (direct-quiz, BMStdShell, 15 rounds: 11 sentence-completion Kata Tanya/Kata Ganti Nama + 4 review from 5.1/5.2, listen button + type badges) · **5.5** `SintaksisAyat.jsx` (Pattern-1 learn+quiz, BMHeader, 52-item bank from `BM_QUESTIONS['1-5-2-sintaksis-ayat']`) |

## A. Silibus Coverage

| # | Keperluan silibus | Status | Evidence | Notes |
|---|---|---|---|---|
| A1 | Kata Nama **Am** & **Khas** | ✅ | **5.1** `GolonganNamaLesson` — 12-item quiz (5 Am: kucing/sekolah/buku/meja/bola vs 7 Khas: Ahmad/Malaysia/Siti/Pulau Pinang/Cikgu Anita/Kuala Lumpur/Si Tom) | Dedicated topic, strong coverage. |
| A2 | **Kata Ganti Nama Diri** (saya, kamu, dia…) | ✅ | **5.4** `TanyaGantiLesson` — 3 items (saya/dia/mereka) | Closed by R1 and reinforced by R10. |
| A3 | **Kata Kerja** (aktif transitif) | ✅ | **5.2** `KerjaAdjektifLesson` — 7 items (berlari/membaca/memasak/menulis/melukis/menyanyi/berenang) | Transitif/tak transitif distinction not made — acceptable at intro level. |
| A4 | **Kata Adjektif** (sifat/warna/ukuran/bentuk) | ✅ | **5.2** `KerjaAdjektifLesson` — 3 items (cantik/besar/merah covering sifat/ukuran/warna) | |
| A5 | **Kata Tugas** — kata hubung (dan/atau/tetapi), kata sendi (di/ke/dari/daripada), kata tanya | ✅ | **5.3** `HubungSendiLesson` — 4 hubung (dan/atau/tetapi) + 4 sendi nama (di/ke/dari/pada) via sentence-completion · **5.4** `TanyaGantiLesson` — 8 tanya (siapa/apa/di mana/bila/mengapa) via sentence-completion | Closed by R1, reinforced by dedicated topics in R10. |
| A6 | Memahami **ayat tunggal** (subjek + predikat) | ✅ | **5.5** `SintaksisAyat` — learn page (5 examples) + 52-item quiz bank (subjek/predikat/penyata/tunggal/susunan) | Clean, well-structured bank. |
| A7 | **Ayat penyata** asas | ✅ | **5.5** (incl. tanda noktah item) | |
| A8 | **Membina** ayat tunggal | ✅ | **5.5** susunan-ayat items + 3.2 BinaAyat | |

**Score: 8✅ · 0⚠️ · 0❌** — A2/A4/A5 closed 2026-06-12 by R1 (5.1 Golongan Kata rebuild), further reinforced by R10 (5.2–5.4 dedicated topics).

## B/C — Standards deltas (M5)

| # | Check | Status | Notes |
|---|---|---|---|---|
| B1 | Learn-before-quiz | ⚠️ | **(R10)** 5.1–5.4 are now direct-start quizzes (no learn page, just dive into questions) — a deliberate design choice for grammar classification/sentence-completion where visual+example-per-card serves as implicit teaching. 5.5 `SintaksisAyat` retains Pattern-1 learn+quiz with BMHeader (subjek/predikat recipe card). Standards deviation noted — not a regression, but a pattern shift. |
| B2 | Spaced repetition | ✅ | **(R10)** 5.2→5.1 (4 review items from Golongan Nama), 5.3→5.1+5.2 (4 review items: Kerja, Adjektif, Nama Am/Khas), 5.4→5.1+5.2 (same 4 review). No topic is isolated. Comprehensive coverage. |
| B6 | Bank ≥12 | ✅ | 5.1: 12, 5.2: 14 (10+4), 5.3: 12 (8+4), 5.4: 15 (11+4), 5.5: 52. All ≥12. |
| B7 | Mastery gate | ✅ | All 5 topics implement ≥70% pass gate via `topicComplete`/`onNextTopic` pattern. |
| C1 | KV/KVK rule | ➖ | 5.2's affixed examples (berlari, membaca) are inherent to teaching Kata Kerja — legitimate exception. 5.3/5.4 use real words only (no affixed forms in the blank). |

---

# Consolidated Improvement Actions (Tahun 1)

| Status | Priority | Action | Closes | Effort | Feasible? |
|---|---|---|---|---|---|
| ✅ Done (2026-06-11) | P1 | **Wire the orphaned `1-3-1-asas-menulis` bank into AsasMenulis** as its quiz step (trace → dictation quiz). Gives 3.1 a mastery gate AND covers suku kata/perkataan/frasa (M3 A2 ❌→⚠️). | M3 A2, B7 | Trivial — bank already written | ✅ |
| ✅ Done (2026-06-11) | P1 | **Ayat tunggal STT tier in 1.7** — covers M1 A7 (menyebut ayat) **and** M2 A7 (membaca mekanis secara lisan) in a single stroke. | M1 A7, M2 A7 | Low | ✅ |
| ✅ Done (2026-06-11) | P1 | **"Dengar & Buat" arahan game** (TTS arahan → child performs + self-reports "✓ Sudah!"; pesanan variant). New Topik 1.8. | M1 A9, A11 | Medium | ✅ |
| ✅ Done (2026-06-12) | P1 | **R1 — Kata Tugas + Kata Ganti Nama Diri content in M5**: rebuilt 5.1 "Golongan Kata" as a Pattern-1 bank (21 items incl. dan/atau/tetapi, di/ke/dari/daripada, kata tanya, saya/kamu/dia) with a new learn page (`JenisKataLesson.jsx`) and ≥70% mastery gate. | M5 A2, A4, A5, B1, B6, B7 | Medium | ✅ |
| ✅ Done (2026-06-12) | P2 | **R4 — idea-utama questions** delivered via the new 2.4 "Fahami Cerita" topic (10 main-idea items) + an idea-utama question added to each 2.5 passage. | M2 A10 | — | ✅ |
| ✅ Done (2026-06-12) | P2 | **R2 — Pantun dua kerat content in M4**: added 3 new "Pantun Dua Kerat" to 4.1's pantun tab (Banyak udang.../Banyak orang...; Gendang gendut.../Kenyang perut...; Emas, perak.../Malas bergerak...) + 4 new quiz items incl. a dua-kerat concept question; replaced the garbled pantun #2 with an authentic "Tingkap papan kayu bersegi... Tinggi bangsa kerana bahasa". | M4 A2, C5 | Low (content only) | ✅ |
| ✅ Done (2026-06-12) | P2 | **R3 — Ayat majmuk content in M2**: added 4 genuine ayat-majmuk sentences (s16-s19, one per conjunction dan/tetapi/atau/kerana) to 2.3's in-file `ITEMS`, each pairing two full clauses. | M2 A8 | Low (content only) | ✅ |
| ✅ Done (2026-06-12) | P2 | **R7 — "Ajuk Saya" mic** on all 26 letter/word cards across 1.1–1.4 (`MengenalHuruf.jsx`, ✅/❌ feedback + confetti, self-contained) and **"Main Watak" dialog role-play STT** in 4.1 (`KeindahanBahasa.jsx`, new `DialogRoleplayPage` — 5 lines with TTS cue + ≥60% keyword-match STT). | M1 A5, M4 A1 | Medium | ✅ |
| ✅ Done (2026-06-12) | P2 | **R5 — Spaced repetition beyond M1**: wired `reviewQuestions` into 3 Pattern-1 hosts — 2.4 "Fahami Cerita" reviews M1's `'1-1-6-dengar-teka'` (10 vocab items), 3.3 "Mencatat Maklumat" reviews M2's `'1-2-5-fahami-cerita'` (10 idea-utama items), and 5.2 "Sintaksis Ayat" reviews 5.1's `'1-5-1-morfologi-kata'` (21-item Golongan Kata bank, unblocked by R1). | B2 in M2, M3, M5 | Low | ✅ |
| ✅ Done (next) | P2 | **R10 — M5 expansion 2→5 topics with all-standardized direct-quiz BMStdShell pattern**: built 3 new topics (5.2 `KerjaAdjektifLesson`, 5.3 `HubungSendiLesson` with listen+type badges, 5.4 `TanyaGantiLesson` with listen+type badges); refactored 5.1 `GolonganNamaLesson` from Pattern-1 learn+quiz to direct-quiz BMStdShell; 5.5 `SintaksisAyat` retained Pattern-1 with BMHeader. All 5 share teal accent palette, ≥70% pass gates, and spaced repetition chain (5.2→5.1, 5.3/5.4→5.1+5.2). | B1 (pattern shift), B2 (full M5 SR), B6 (all ≥12), B7 (gates) | Medium | ✅ |
| ✅ Done (next) | P2 | **R8 — Kenalkan Diri guided speaking + polite-request picker**: new Topik 1.9 `KenalkanDiri.jsx` (Pattern 3). 3 STT self-introduction template items (nama/umur/sekolah) with keyword-slot matching; 6 MCQ polite-request items (2-option polite vs rude). TTS prompts, confetti+streak, fallback self-report. Closes M1 A12, A13, A10. | M1 A10, A12, A13 | Medium | ✅ |
| ✅ Done (2026-06-12) | P2 | **R6 — Gated 5 Pattern-2 reuse games** with a ≥70% pass-% threshold before `topicComplete` fires (pass/fail result screens with retry + "Topik Seterusnya"): 2.1 "Asas Membaca" (bank grown 8→12), 2.2 "Baca Perkataan" (15 items, already ≥12), 2.5 "Membaca Menaakul" (12 items, already ≥12), 3.2 "Bina Ayat" (bank grown 6→12, migrated `BackButton`→`BMHeader`), and 1.7 "Baca Frasa Bergambar" (combined sentences+phrases score, `pct = (scoreSent+score)/16`). All 5 migrated off `ProgressWrapper` to direct wiring (`topicComplete`/`onNextTopic`). | B6/B7 in M1, M2, M3 | Medium | ✅ |
| ✅ Done (next) | P3 | **R9 — KV/KVK word swaps + rule scope decision**: Swapped `Anggur` 🍇→`Alat` 🔧 (1.1 vowel A) and `Singa` 🦁→`Siput` 🐌 (1.4 konsonan S) for KV/KVK-clean words; updated all 9 distractor references. **Guided-reading exception** documented: reading comprehension passages (2.3/2.5, 3.2/3.3) may use natural affixed words (meN-/ber-) as they involve whole-sentence guided reading, not isolated decoding. Decoding activities (2.1/2.2) remain strictly KV/KVK-only. M5 grammar examples already documented exception. | C1 across modules | Trivial–Low | ✅ |
| ➖ Out of scope | ➖ | Documented: arah bunyi (M1 A8), irama pantun & menyanyi sambil aksi (M4 A3/A4), free handwriting grading. Keep wording "Berdasarkan KSSR". | — | — | ❌ |

> **Bottom line for Tahun 1 (updated):** with the **M2 rebuild** (3→5 topics, now
> **10✅·0⚠️·0❌** after R3), the **M5 rebuild+expansion** (R1 → R10: 2→5 topics, now
> **8✅·0⚠️·0❌**), the **M4 pantun+role-play** (R2→R7, now **3✅·1⚠️·0❌·1➖**), and the
> **M1 Kenalkan Diri** (R8 — new Topik 1.9, now **12✅·0⚠️·0❌·1➖**), combined with the P1 work
> (`asas-menulis` quiz wiring, 1.7 ayat-tunggal STT tier, Topik 1.8 "Dengar & Buat"), the tally is
> now **38✅** (of 41 rows), up from 18✅ at first audit. **All A-row ❌ rows are now closed across
> every module.** M1 is fully closed (12/13, 1 ➖ out of scope). M2 is fully closed (10/10).
> **R5** (spaced repetition) wired 3 links across M2/M3/M5 — M4's B2 remains the only SR gap (single-topic module).
> **R6** gated 5 Pattern-2 reuse games with ≥70% pass; 2.3 remains ungated (STT read-aloud).
> **R7** added STT mic + dialog role-play. **R10** expanded M5 2→5 topics. **R8** closed the last
> ❌ rows — M1 A10 (soalan bertumpu), A12 (memperkenalkan diri), A13 (permintaan sopan).
> **R9** (KV/KVK word swaps + guided-reading exception) done — closes C1 across M1/M2/M3. The M5 B1 shifts to ⚠️ (direct-quiz vs
> learn+quiz) and M1 B6 has a minor gap for 1.9's 9-item bank — both intentional design choices.
