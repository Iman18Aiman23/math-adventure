# 📋 Coverage Report — Tahun 1 (Modul 1–5)

> Template: `_CHECKLIST_TEMPLATE.md` · Silibus source: `BAHASA_MELAYU.md` §Silibus Tahun 1.
> KSSR BM Tahun 1 has **5 modul** (Mendengar & Bertutur, Membaca, Menulis, Seni Bahasa, Tatabahasa) — there is no Modul 6.
>
> **Status key:** ✅ PASS · ⚠️ PARTIAL · ❌ GAP · ➖ N/A (not feasible digitally)

## Overall Verdict

| Modul | Verdict | Silibus score | Headline gap |
|---|---|---|---|
| M1 Mendengar & Bertutur | ⚠️ PARTIAL | 8✅ · 2⚠️ · 2❌ · 1➖ | Topik 1.2 Bertutur — perkenalan diri (Kenalkan Diri) & permintaan sopan still untaught (R8) |
| M2 Membaca | ✅ NEAR-COMPLETE | 9✅ · 0⚠️ · 1❌ | **Rebuilt to 5 topics (2026-06-12):** new 2.2 "Baca Perkataan KVK" closes A3; new 2.4 "Fahami Cerita" + 2.5 idea-utama questions close A10. Only ayat majmuk mekanis (A8/R3) still missing |
| M3 Menulis | ⚠️ PARTIAL | 2✅ · 3⚠️ · 0❌ | Tracing/handwriting still stops at letters; suku kata/perkataan/frasa now recognition-quizzed via dictation, not yet handwritten |
| M4 Seni Bahasa | ⚠️ PARTIAL | 1✅ · 2⚠️ · 1❌ · 1➖ | All receptive; pantun **dua kerat** content missing entirely |
| M5 Tatabahasa | ⚠️ PARTIAL | 5✅ · 1⚠️ · 2❌ | Kata Ganti Nama Diri + Kata Tugas (hubung/sendi/tanya) untaught |
| **Tahun 1 overall** | **⚠️ PARTIAL — 25✅ · 8⚠️ · 6❌ · 2➖ (41 rows)** | | Receptive skills strong everywhere; M5 Tatabahasa (Kata Tugas/Ganti Nama Diri rebuild, P1 #4) is now the last major content gap |

| Field | Value |
|---|---|
| Audit date / by | 2026-06-11 · Claude Code audit (M1 audited first, M2–M5 same day) |
| Question banks audited | All 12 T1 keys in `BM_QUESTIONS` + in-file data of 6 reuse/standalone games |
| **Update (2026-06-11, later same day)** | **P1 #1-3 implemented**: AsasMenulis quiz wiring (M3 A2/B7), 1.7 ayat-tunggal STT tier (M1 A7, M2 A7), Topik 1.8 "Dengar & Buat" (M1 A9, A11). M1/M2/M3 sections + scores + Consolidated Improvement Actions below updated accordingly. P1 #4 (M5 5.1 rebuild) remains — see `BAHASA_MELAYU.md` §17 R1. |
| **Update (2026-06-12) — M2 rebuild** | **Modul 2 expanded from 3 → 5 topics** (T1 now 19 topics total). Two new topics: **2.2 "Baca Perkataan KVK"** (`BacaPerkataan.jsx`, 15 pure-KVK words → closes A3) and **2.4 "Fahami Cerita"** (`FahamiCerita.jsx`, Pattern-1 main-idea quiz, 10 items → closes A10). Existing topics renumbered for sequential trail order (2.1 Asas · 2.2 KVK · 2.3 Baca dengan Lancar [was 2.2 mekanis] · 2.4 Fahami Cerita · 2.5 Baca & Fahami [was 2.3 menaakul]); opaque IDs unchanged so progress survives. All 5 topics reskinned to the M2 blue palette; 2.1 & 2.5 migrated off `ProgressWrapper` to direct wiring (`topicComplete`/`onNextTopic`). Two dead `BM_QUESTIONS` banks (`'1-2-2-membaca-mekanis'`, `'1-2-4-baca-perkataan'`) removed (never imported). M2 lifts from 6✅·2⚠️·2❌ to **9✅·0⚠️·1❌**; T1 overall 22✅→**25✅**. |

---

# Modul 1 — Kemahiran Mendengar dan Bertutur

| Field | Value |
|---|---|
| App module name (hub) | "Huruf Vokal & Frasa Bergambar" (A–Z journey, 7 nodes) |
| Topics audited | 1.1–1.4 `MengenalHuruf.jsx` · 1.5 `SukuKata.jsx` · 1.6 `DengarTeka.jsx` · 1.7 `BacaFrasaBergambar.jsx` (STT, now 2 tiers — see A6/A7) · 1.8 `DengarBuat.jsx` (TTS arahan/pesanan, new 2026-06-11) |

## A. Silibus Coverage

### Topik 1.1 — Mendengar dan Menyebut

| # | Keperluan silibus | Status | Evidence | Notes |
|---|---|---|---|---|
| A1 | Mendengar & mengecam bunyi **vokal** | ✅ | 1.1 learn cards (tap = TTS) + quiz; reviewed in 1.5/1.6 | Strong, spaced repetition. |
| A2 | Mendengar & mengecam bunyi **konsonan** | ✅ | 1.2–1.4 cover B–Z; `REVIEW_SOURCES` chains groups | Full A–Z. |
| A3 | Mengecam bunyi **suku kata** (KV/KVK) | ✅ | 1.5 flashcards + first-syllable quiz | Bridge to M2. |
| A4 | Mendengar & mengecam **perkataan** | ✅ | 1.6 Dengar & Teka (TTS word → written word) | Sound-alike distractors. |
| A5 | **Menyebut** bunyi / perkataan dengan betul | ⚠️ | TTS models on tap; child imitates | Never **verified** — no mic at letter/word level. |
| A6 | Menyebut **frasa** dengan betul dan jelas | ✅ | 1.7 STT ≥60% keyword match + 🔊 model | Tier 2 ("frasa", `PICTURES`) of the now-2-tier 1.7. |
| A7 | Menyebut **ayat tunggal** | ✅ | **(2026-06-11)** 1.7 now opens with an "ayat tunggal" tier (`SENTENCES`, 8 items) — STT ≥60% keyword match, same as A6 — BEFORE the frasa tier | Closed alongside M2 A7 in one extension (P1 #2). |
| A8 | Mengajuk & menentukan **arah bunyi** | ➖ | — | Needs physical sound direction; out of scope. |

### Topik 1.2 — Bertutur dan Menyampaikan Maklumat

| # | Keperluan silibus | Status | Evidence | Notes |
|---|---|---|---|---|
| A9 | Respons terhadap **arahan mudah** | ✅ | **(2026-06-11)** New Topik 1.8 "Dengar & Buat" (`DengarBuat.jsx`) — TTS speaks an arahan (e.g. "Sentuh kepala"), child performs it physically and self-reports "✓ Sudah!"; 10 arahan items in the bank | Pattern 3 (standalone activity), self-report not STT-verified. |
| A10 | Respons terhadap **soalan bertumpu** | ⚠️ | Quiz Q&A is bertumpu-style | Answered by tapping, not lisan. |
| A11 | Respons terhadap **pesanan** | ✅ | **(2026-06-11)** Same Topik 1.8 bank also includes 3 "pesanan" (2-part relay-message) items, e.g. "Beritahu ibu kamu berlari" | Pooled with arahan items, 8 of 13 drawn per round. |
| A12 | **Memperkenalkan diri** / menyampaikan maklumat | ❌ | — | No self-introduction activity. Tracked as R8 (⚠️ template-gradeable only). |
| A13 | **Permintaan dengan sopan** | ❌ | — | Untouched receptively & productively. Tracked as R8. |

**Score: 8✅ · 2⚠️ · 2❌ · 1➖** — remaining ❌ (A12, A13) are both Topik 1.2 "Kenalkan Diri"/permintaan-sopan items (R8, ⚠️ template-gradeable only). A7/A9/A11 closed 2026-06-11 via 1.7's new ayat-tunggal tier and the new Topik 1.8 "Dengar & Buat".

## B/C/D — Standards (M1)

| # | Check | Status | Notes |
|---|---|---|---|
| B1 | Learn-before-quiz | ⚠️ | 1.6 quiz-only by documented decision; others ✅. |
| B2 | Spaced repetition | ✅ | Only module with review wiring (`REVIEW_SOURCES`, 1.5/1.6 review chains). |
| B3–B5 | Feedback / progress / audio modelling | ✅ | Confetti, ✓ hub badge, TTS everywhere. |
| B6 | Banks ≥12, plausible distractors | ✅ | 15/13/14/12/15/15. 1.8's `INSTRUCTIONS` bank (13 items, in-file array not `BM_QUESTIONS`) also meets the threshold. |
| B7 | Mastery gate ≥70% | ✅ quiz topics · ⚠️ 1.7 · ➖ 1.8 | 1.7 (STT, Pattern 2, now 2 tiers) still completes on back — no pass criterion (R6). 1.8 (Pattern 3) is a self-report activity by design — `topicComplete` fires on finishing the round regardless of score, no gate intended. |
| C1 | KV/KVK rule | ⚠️ | `Anggur` (1.1) & `Singa` (1.4) contain digraph **ng**. 1.7 phrases/sentences clean. |
| C2–C5 | One-game-one-topic / labels / IDs / BM quality | ✅ | |
| D1–D6 | Lazy, TTS policy, STT guards, iOS CSS, responsive, icons | ✅ | |

---

# Modul 2 — Kemahiran Membaca

| Field | Value |
|---|---|
| Topics audited (5, rebuilt 2026-06-12) | 2.1 `AsasMembaca.jsx` (complete the missing KV syllable, 8 items, picture + hint) · 2.2 `BacaPerkataan.jsx` (**new** — complete the missing syllable for 15 pure-KVK words, picture + hint) · 2.3 `MembacaMekanis.jsx` ("Baca dengan Lancar" — STT read-aloud, 15 in-file `ITEMS`, child reads each sentence via mic) · 2.4 `FahamiCerita.jsx` (**new** — story pager + Pattern-1 main-idea quiz, 10 items) · 2.5 `MembacaMenaakul.jsx` (= KefahamanBacaan: 3 passages × 4 soalan incl. an idea-utama Q each, explanation cites the petikan) |

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
| A8 | Membaca **ayat majmuk** secara mekanis | ❌ | — | 2.3's `ITEMS` are ayat tunggal only ("Kakak **dan** abang…" is a compound subject, not ayat majmuk). Tracked as R3 (now: add ayat-majmuk items to 2.3's in-file `ITEMS`). |
| A9 | Memahami teks mudah (maklumat tersurat) | ✅ | 2.5 passages + 2.4 stories; explanations quote the petikan line | Good feedback design. |
| A10 | Mengenal pasti **idea utama & idea sampingan** | ✅ | **(2026-06-12)** New topic 2.4 "Fahami Cerita" is entirely main-idea practice (10 items, distractors are partial details by design) + each 2.5 passage now has an "Apakah idea utama petikan ini?" question | *Idea utama* solidly covered; *idea sampingan* (supporting detail) is touched only via the distractors — a minor remaining nuance, not a gap. |

**Score: 9✅ · 0⚠️ · 1❌** — A3/A5/A7/A9/A10 closed 2026-06-12 by the 5-topic rebuild; only A8 (ayat majmuk mekanis, R3) remains.

## B/C — Standards deltas (M2)

| # | Check | Status | Notes |
|---|---|---|---|
| B1 | Learn-before-quiz | ⚠️ | 2.4 ✅ (story pager → quiz); 2.5 ✅ (passage *is* the learn step); 2.3 ✅ (model TTS before reading); 2.1/2.2 quiz-only with picture + 🔊 hints. |
| B2 | Spaced repetition | ❌ | No `reviewQs` wired in M2. 2.4 ("fahami-cerita") is the only Pattern-1 host available for review mixing (R5). |
| B6 | Bank ≥12 | ⚠️ | 2.2 ✅ 15 · 2.3 ✅ 15 `ITEMS` · 2.5 ✅ 12 · 2.4 ⚠️ 10 · 2.1 ❌ 8 fixed. |
| B7 | Mastery gate | ⚠️ | 2.4 ✅ gated (Pattern 1, ≥70%) · 2.1/2.2/2.3/2.5 fire `topicComplete` on finishing the round with any score (no pass gate — R6). |
| C1 | KV/KVK rule | ⚠️ | 2.5 passages still use meN-/ber- words (mempunyai, bermain, membawa) — predate the rule. 2.1/2.2/2.4 are clean. Needs the same decision as before: simplify texts or document passages as a guided-reading exception (R9). |
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
| B2 | Spaced repetition | ❌ | 3.3 `reviewQs = []`. Tracked as R5. |
| B6 | Bank ≥12 | ⚠️ | 3.3 ✅ 15 · 3.1 ✅ 15 (`1-3-1-asas-menulis`, now wired) · 3.2 ❌ 6 fixed items. |
| B7 | Mastery gate | ✅ 3.1, 3.3 · ❌ 3.2 | 3.1 **(2026-06-11)**: tracing all 26 letters unlocks a gated quiz (`pct >= 70%` via `BMLessonQuizLayout`/`PASS_PCT`) — `topicComplete` only fires on pass. 3.2 still Pattern 2, completes on back regardless of score (R6). |
| C1 | KV/KVK rule | ⚠️ | 3.2 sentences use membaca/memasak/berlari/bermain; 3.3 petikan likewise. Same decision needed as M2 (R9). |

---

# Modul 4 — Aspek Seni Bahasa

| Field | Value |
|---|---|
| Topics audited | 4.1 `KeindahanBahasa.jsx` (learn tabs: 2 dialog with per-line TTS · 3 pantun · 2 lagu lyrics; quiz bank 15) |

## A. Silibus Coverage

| # | Keperluan silibus | Status | Evidence | Notes |
|---|---|---|---|---|
| A1 | **Mengujarkan dialog** — sebutan, intonasi, gaya (lakonan/didik hibur) | ⚠️ | Dialog lines play via TTS; quiz tests comprehension | Child never speaks a line. STT role-play ("be Ali, read his line") is feasible with the 1.7 engine. |
| A2 | Melafazkan **pantun dua kerat** | ❌ | — | All 3 pantun are Empat Kerat; dua kerat exists only as a quiz distractor. Content gap, trivially fillable. |
| A3 | Melafazkan **pantun empat kerat** dengan irama | ⚠️ | 3 pantun displayed + quiz on pembayang/maksud structure | Receptive only; *irama* itself is unverifiable (see ➖). |
| A4 | **Menyanyikan lagu** kanak-kanak sambil aksi | ➖ | Lyrics shown as reading content | Singing/rhythm capture not feasible digitally (consistent with the Age-7 Obj-15 precedent). |
| A5 | Memahami struktur & nilai (pembayang/maksud, mesej pantun, isi dialog) | ✅ | Quiz 15 items incl. "Pisang emas" budi lesson | Solid receptive coverage. |

**Score: 1✅ · 2⚠️ · 1❌ · 1➖**

## B/C — Standards deltas (M4)

| # | Check | Status | Notes |
|---|---|---|---|
| B2 | Spaced repetition | ❌ | `reviewQs = []`. |
| B7 | Mastery gate | ✅ | Quiz topic, gated. |
| C5 | BM language quality | ⚠️ | **Pantun #2 is garbled**: "Pokok **kelura**…", "berpesan-pesann" (typo, double n), and the rhyme scheme a-b-a-b doesn't hold (tebing/helang/bersenang/berpesan-pesann). Replace with an authentic pantun. |

---

# Modul 5 — Aspek Tatabahasa

| Field | Value |
|---|---|
| Topics audited | 5.1 `MorfologiGolonganKata.jsx` (= JenisKata: classify 8 words into Kata Nama Am/Khas/Kerja/Adjektif, with example sentence + explanation) · 5.2 `SintaksisAyat.jsx` (learn: subjek/predikat, 5 contoh; quiz bank 15: subjek, predikat, ayat penyata, ayat tunggal lengkap, susunan ayat) |

## A. Silibus Coverage

| # | Keperluan silibus | Status | Evidence | Notes |
|---|---|---|---|---|
| A1 | Kata Nama **Am** & **Khas** | ✅ | 5.1 (kucing/sekolah vs Ahmad/Malaysia) | |
| A2 | **Kata Ganti Nama Diri** (saya, kamu, dia…) | ❌ | — | Not taught anywhere; appears only incidentally in sentences. |
| A3 | **Kata Kerja** (aktif transitif) | ✅ | 5.1 (berlari, membaca) | Transitif/tak transitif distinction not made — acceptable at intro level. |
| A4 | **Kata Adjektif** (sifat/warna/ukuran/bentuk) | ⚠️ | 5.1 (cantik=sifat, besar=ukuran) | Warna & bentuk categories absent. |
| A5 | **Kata Tugas** — kata hubung (dan/atau/tetapi), kata sendi (di/ke/dari/daripada), kata tanya | ❌ | — | Biggest M5 gap; sendi nama appears in 3.2 sentences but is never the learning target. |
| A6 | Memahami **ayat tunggal** (subjek + predikat) | ✅ | 5.2 learn + quiz | Clean, well-structured bank. |
| A7 | **Ayat penyata** asas | ✅ | 5.2 (incl. tanda noktah item) | |
| A8 | **Membina** ayat tunggal | ✅ | 5.2 susunan-ayat items + 3.2 BinaAyat | |

**Score: 5✅ · 1⚠️ · 2❌**

## B/C — Standards deltas (M5)

| # | Check | Status | Notes |
|---|---|---|---|
| B1 | Learn-before-quiz | ⚠️ | 5.2 ✅ · 5.1 quiz-only (explanations shown after answering). |
| B2 | Spaced repetition | ❌ | 5.2 `reviewQs = []`. |
| B6 | Bank ≥12 | ⚠️ | 5.2 ✅ 15 · 5.1 ❌ 8 fixed. |
| B7 | Mastery gate | ⚠️ | 5.2 ✅ · 5.1 (Pattern 2) ❌. |
| C1 | KV/KVK rule | ➖ | 5.1's affixed examples (berlari, membaca) are inherent to teaching Kata Kerja — legitimate exception. |

---

# Consolidated Improvement Actions (Tahun 1)

| Status | Priority | Action | Closes | Effort | Feasible? |
|---|---|---|---|---|---|
| ✅ Done (2026-06-11) | P1 | **Wire the orphaned `1-3-1-asas-menulis` bank into AsasMenulis** as its quiz step (trace → dictation quiz). Gives 3.1 a mastery gate AND covers suku kata/perkataan/frasa (M3 A2 ❌→⚠️). | M3 A2, B7 | Trivial — bank already written | ✅ |
| ✅ Done (2026-06-11) | P1 | **Ayat tunggal STT tier in 1.7** — covers M1 A7 (menyebut ayat) **and** M2 A7 (membaca mekanis secara lisan) in a single stroke. | M1 A7, M2 A7 | Low | ✅ |
| ✅ Done (2026-06-11) | P1 | **"Dengar & Buat" arahan game** (TTS arahan → child performs + self-reports "✓ Sudah!"; pesanan variant). New Topik 1.8. | M1 A9, A11 | Medium | ✅ |
| ⏳ Pending → **R1** | P1 | **Kata Tugas + Kata Ganti Nama Diri content in M5** — rebuild 5.1 as a Pattern-1 bank (≥15 items incl. dan/atau/tetapi, di/ke/dari/daripada, kata tanya, saya/kamu/dia) → also fixes its gate, bank size, and learn page in one move. | M5 A2, A4, A5, B1, B6, B7 | Medium | ✅ |
| ✅ Done (2026-06-12) | P2 | **R4 — idea-utama questions** delivered via the new 2.4 "Fahami Cerita" topic (10 main-idea items) + an idea-utama question added to each 2.5 passage. | M2 A10 | — | ✅ |
| ⏳ Pending → **R2 / R3** | P2 | **Add pantun dua kerat (2-3 contoh) + replace garbled pantun #2** (R2); add ayat majmuk items to **2.3's in-file `ITEMS`** (R3 — retargeted: 2.3 is now STT read-aloud, not a `BM_QUESTIONS` bank). | M4 A2, C5; M2 A8 | Low (content only) | ✅ |
| ⏳ Pending → **R7** | P2 | **"Ajuk Saya" mic** on letter/word cards (M1 A5) and **dialog role-play STT** in 4.1 (M4 A1). | M1 A5, M4 A1 | Medium | ✅ |
| ⏳ Pending → **R5** | P2 | **Spaced repetition beyond M1** — populate `reviewQs` for 2.2 (review 1.6/1.5), 3.3 (review 2.3 passages), 5.2 (review 5.1 once it has a bank). | B2 across M2–M5 | Low | ✅ |
| ⏳ Pending → **R6** | P2 | **Gate the Pattern-2 reuse games** (2.1, 2.3, 3.2, 5.1, 1.7) — internal pass threshold before `topicComplete`, and grow fixed banks to ≥12 items. | B6/B7 across modules | Medium | ✅ |
| ⏳ Pending → **R8** | P2 | **"Kenalkan Diri" guided speaking** (template STT) + polite-request picker. | M1 A12, A13, A10 | Medium | ⚠️ template-gradeable only |
| ⏳ Pending → **R9** | P3 | Swap `Anggur`/`Singa` for KV/KVK-clean words; **decide the KV/KVK rule scope** for passages (2.3/3.3/3.2 texts use meN-/ber- words) — either simplify or document the exception. | C1 across modules | Trivial–Low | ✅ |
| ➖ Out of scope | ➖ | Documented: arah bunyi (M1 A8), irama pantun & menyanyi sambil aksi (M4 A3/A4), free handwriting grading. Keep wording "Berdasarkan KSSR". | — | — | ❌ |

> **Bottom line for Tahun 1 (updated 2026-06-12):** the **M2 rebuild** (3→5 topics: new 2.2 KVK +
> 2.4 Fahami Cerita, plus idea-utama questions in 2.5) closed M2 A3/A5/A10 and made M2 the strongest
> modul (**9✅·0⚠️·1❌**, only ayat-majmuk mekanis left). Combined with the 2026-06-11 P1 work
> (`asas-menulis` quiz wiring, 1.7 ayat-tunggal STT tier, Topik 1.8 "Dengar & Buat"), the tally is now
> **25✅** (of 41 rows), up from 18✅ at first audit. **The only remaining P1 is the M5 Tatabahasa
> rebuild** (5.1 Kata Tugas + Kata Ganti Nama Diri — see `BAHASA_MELAYU.md` §17 **R1**, the recommended
> next slice). The P2/P3 items (**R2/R3, R5–R9** in §17) round out the remaining production-skill gaps —
> ayat-majmuk reading, speaking beyond frasa, writing beyond huruf, note-taking, and dialog performance.
