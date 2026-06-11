# 📋 Coverage Report — Tahun 1 (Modul 1–5)

> Template: `_CHECKLIST_TEMPLATE.md` · Silibus source: `BAHASA_MELAYU.md` §Silibus Tahun 1.
> KSSR BM Tahun 1 has **5 modul** (Mendengar & Bertutur, Membaca, Menulis, Seni Bahasa, Tatabahasa) — there is no Modul 6.
>
> **Status key:** ✅ PASS · ⚠️ PARTIAL · ❌ GAP · ➖ N/A (not feasible digitally)

## Overall Verdict

| Modul | Verdict | Silibus score | Headline gap |
|---|---|---|---|
| M1 Mendengar & Bertutur | ⚠️ PARTIAL | 5✅ · 3⚠️ · 5❌ · 1➖ | Topik 1.2 Bertutur (arahan, pesanan, perkenalan diri, permintaan sopan) |
| M2 Membaca | ⚠️ PARTIAL | 5✅ · 3⚠️ · 2❌ | Oral mekanis unverified; ayat majmuk + idea utama/sampingan missing |
| M3 Menulis | ⚠️ PARTIAL | 2✅ · 2⚠️ · 1❌ | Writing stops at letters; suku kata/perkataan/frasa never written |
| M4 Seni Bahasa | ⚠️ PARTIAL | 1✅ · 2⚠️ · 1❌ · 1➖ | All receptive; pantun **dua kerat** content missing entirely |
| M5 Tatabahasa | ⚠️ PARTIAL | 5✅ · 1⚠️ · 2❌ | Kata Ganti Nama Diri + Kata Tugas (hubung/sendi/tanya) untaught |
| **Tahun 1 overall** | **⚠️ PARTIAL — 18✅ · 11⚠️ · 11❌ · 2➖ (42 rows)** | | Receptive skills strong everywhere; production skills (speak/write) and 4 content gaps |

| Field | Value |
|---|---|
| Audit date / by | 2026-06-11 · Claude Code audit (M1 audited first, M2–M5 same day) |
| Question banks audited | All 12 T1 keys in `BM_QUESTIONS` + in-file data of 6 reuse/standalone games |

---

# Modul 1 — Kemahiran Mendengar dan Bertutur

| Field | Value |
|---|---|
| App module name (hub) | "Huruf Vokal & Frasa Bergambar" (A–Z journey, 7 nodes) |
| Topics audited | 1.1–1.4 `MengenalHuruf.jsx` · 1.5 `SukuKata.jsx` · 1.6 `DengarTeka.jsx` · 1.7 `BacaFrasaBergambar.jsx` (STT) |

## A. Silibus Coverage

### Topik 1.1 — Mendengar dan Menyebut

| # | Keperluan silibus | Status | Evidence | Notes |
|---|---|---|---|---|
| A1 | Mendengar & mengecam bunyi **vokal** | ✅ | 1.1 learn cards (tap = TTS) + quiz; reviewed in 1.5/1.6 | Strong, spaced repetition. |
| A2 | Mendengar & mengecam bunyi **konsonan** | ✅ | 1.2–1.4 cover B–Z; `REVIEW_SOURCES` chains groups | Full A–Z. |
| A3 | Mengecam bunyi **suku kata** (KV/KVK) | ✅ | 1.5 flashcards + first-syllable quiz | Bridge to M2. |
| A4 | Mendengar & mengecam **perkataan** | ✅ | 1.6 Dengar & Teka (TTS word → written word) | Sound-alike distractors. |
| A5 | **Menyebut** bunyi / perkataan dengan betul | ⚠️ | TTS models on tap; child imitates | Never **verified** — no mic at letter/word level. |
| A6 | Menyebut **frasa** dengan betul dan jelas | ✅ | 1.7 STT ≥60% keyword match + 🔊 model | Only verified-speech node. |
| A7 | Menyebut **ayat tunggal** | ❌ | — | 1.7 stops at phrases; M2 2.2 is receptive. |
| A8 | Mengajuk & menentukan **arah bunyi** | ➖ | — | Needs physical sound direction; out of scope. |

### Topik 1.2 — Bertutur dan Menyampaikan Maklumat

| # | Keperluan silibus | Status | Evidence | Notes |
|---|---|---|---|---|
| A9 | Respons terhadap **arahan mudah** | ❌ | — | No instruction-following activity. |
| A10 | Respons terhadap **soalan bertumpu** | ⚠️ | Quiz Q&A is bertumpu-style | Answered by tapping, not lisan. |
| A11 | Respons terhadap **pesanan** | ❌ | — | No relayed-message activity. |
| A12 | **Memperkenalkan diri** / menyampaikan maklumat | ❌ | — | No self-introduction activity. |
| A13 | **Permintaan dengan sopan** | ❌ | — | Untouched receptively & productively. |

**Score: 5✅ · 3⚠️ · 5❌ · 1➖** — every ❌ except A7 is from Topik 1.2: the letter-journey redesign made M1 superb at listening foundations but left interactive speaking as the blind spot.

## B/C/D — Standards (M1)

| # | Check | Status | Notes |
|---|---|---|---|
| B1 | Learn-before-quiz | ⚠️ | 1.6 quiz-only by documented decision; others ✅. |
| B2 | Spaced repetition | ✅ | Only module with review wiring (`REVIEW_SOURCES`, 1.5/1.6 review chains). |
| B3–B5 | Feedback / progress / audio modelling | ✅ | Confetti, ✓ hub badge, TTS everywhere. |
| B6 | Banks ≥12, plausible distractors | ✅ | 15/13/14/12/15/15. |
| B7 | Mastery gate ≥70% | ✅ quiz topics · ⚠️ 1.7 | 1.7 (STT, Pattern 2) still completes on back — no pass criterion. |
| C1 | KV/KVK rule | ⚠️ | `Anggur` (1.1) & `Singa` (1.4) contain digraph **ng**. 1.7 phrases clean. |
| C2–C5 | One-game-one-topic / labels / IDs / BM quality | ✅ | |
| D1–D6 | Lazy, TTS policy, STT guards, iOS CSS, responsive, icons | ✅ | |

---

# Modul 2 — Kemahiran Membaca

| Field | Value |
|---|---|
| Topics audited | 2.1 `AsasMembaca.jsx` (= SukuKataBinaPerkataan: complete the missing syllable, 8 items, picture + hint) · 2.2 `MembacaMekanis.jsx` (hear sentence → pick text, bank 15) · 2.3 `MembacaMenaakul.jsx` (= KefahamanBacaan: 3 passages × 3 soalan, jawapan + explanation citing the petikan) |

## A. Silibus Coverage

| # | Keperluan silibus | Status | Evidence | Notes |
|---|---|---|---|---|
| A1 | Membaca & mengenal pasti huruf vokal/konsonan | ✅ | Delivered by M1 A–Z journey (1.1–1.4) | Cross-module credit, intentional design. |
| A2 | Membaca suku kata terbuka (KV) | ✅ | 2.1 syllable-completion + M1 1.5 | |
| A3 | Membaca suku kata tertutup (KVK) | ⚠️ | — | All 8 items in 2.1 are KV+KV words (buku, bola…); KVK appears once in 1.5's bank (`lam`). |
| A4 | Membaca & memahami perkataan | ✅ | 2.1 (word + meaning hint), 1.6 | |
| A5 | Membaca & memahami frasa | ⚠️ | 1.7 phrases (oral) | No in-module frasa **reading** task; the frasa items that exist sit in the orphaned `1-3-1-asas-menulis` bank (see M3). |
| A6 | Membaca & memahami ayat tunggal (pelbagai bahan) | ✅ | 2.2 bank + 2.3 passages | |
| A7 | Membaca **secara mekanis** — sebutan betul, intonasi sesuai | ⚠️ | 2.2: listen→match + punctuation/intonation items (?, !, .) | Receptive proxy only — the child never reads aloud. STT already proven in 1.7. |
| A8 | Membaca **ayat majmuk** secara mekanis | ❌ | — | Bank is ayat tunggal only ("Kakak **dan** abang…" is a compound subject, not ayat majmuk). |
| A9 | Memahami teks mudah (maklumat tersurat) | ✅ | 2.3 passages; explanations quote the petikan line | Good feedback design. |
| A10 | Mengenal pasti **idea utama & idea sampingan** | ❌ | — | All 9 questions are detail-retrieval; no "Apakah idea utama…?" tasks. |

**Score: 5✅ · 3⚠️ · 2❌**

## B/C — Standards deltas (M2)

| # | Check | Status | Notes |
|---|---|---|---|
| B1 | Learn-before-quiz | ⚠️ | 2.2 ✅ two-page; 2.3 ✅ (passage *is* the learn step); 2.1 quiz-only with hints. |
| B2 | Spaced repetition | ❌ | 2.2 `reviewQs = []`; 2.1/2.3 have no review mechanism. |
| B6 | Bank ≥12 | ⚠️ | 2.2 ✅ 15 · 2.1 ❌ 8 fixed · 2.3 ❌ 9 fixed (only options shuffle). |
| B7 | Mastery gate | ⚠️ | 2.2 ✅ gated · 2.1/2.3 (Pattern 2) ❌ complete on back with any score. |
| C1 | KV/KVK rule | ⚠️ | 2.3 passages are full of meN-/ber- words (mempunyai, bermain, berenang, membawa) — predate the rule. Needs a decision: simplify texts, or document passages as a guided-reading exception. |

---

# Modul 3 — Kemahiran Menulis

| Field | Value |
|---|---|
| Topics audited | 3.1 `AsasMenulis.jsx` (trace A–Z besar+kecil on `TraceCanvas`, TTS letter) · 3.2 `BinaAyat.jsx` (= SentenceBuilder: arrange shuffled words into ayat, 6 items, picture grafik) · 3.3 `MencatatMaklumat.jsx` (learn: 4 petikan + model nota; quiz bank 15) |

## A. Silibus Coverage

| # | Keperluan silibus | Status | Evidence | Notes |
|---|---|---|---|---|
| A1 | Menulis **huruf** secara mekanis | ✅ | 3.1 — all 26 letters, upper & lower case, stroke-verified canvas | Strong. |
| A2 | Menulis **suku kata / perkataan / frasa** secara mekanis | ❌ | — | Tracing stops at single letters. **Finding:** a ready-made 15-item bank `1-3-1-asas-menulis` (huruf→suku kata→perkataan→frasa dictation) exists in `ModuleData.js` but is **orphaned** — `AsasMenulis.jsx` never uses it. |
| A3 | Membina & menulis **ayat tunggal** berdasarkan grafik/perkataan | ✅ | 3.2 word-arrangement with picture prompt | Constructive proxy for writing (standard digital substitute). |
| A4 | Menulis **jawapan pemahaman** (soalan bertumpu) | ⚠️ | 3.3 + 2.3 quizzes | Answered by picker, not written/typed. |
| A5 | **Mencatat maklumat** penting | ⚠️ | 3.3 learn page models structured notes per petikan; quiz tests recall | Note-taking is modelled and recognised, never produced by the child. |

**Score: 2✅ · 2⚠️ · 1❌**

## B/C — Standards deltas (M3)

| # | Check | Status | Notes |
|---|---|---|---|
| B1 | Learn-before-quiz | ✅ | 3.3 exemplary (petikan + nota); 3.1 practice-only by design. |
| B2 | Spaced repetition | ❌ | 3.3 `reviewQs = []`. |
| B6 | Bank ≥12 | ⚠️ | 3.3 ✅ 15 · 3.2 ❌ 6 fixed items. |
| B7 | Mastery gate | ⚠️ | 3.3 ✅ · 3.1 ❌ (back marks complete even at letter 1 of 26) · 3.2 ❌. |
| C1 | KV/KVK rule | ⚠️ | 3.2 sentences use membaca/memasak/berlari/bermain; 3.3 petikan likewise. Same decision needed as M2. |

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

| Priority | Action | Closes | Effort | Feasible? |
|---|---|---|---|---|
| P1 | **Wire the orphaned `1-3-1-asas-menulis` bank into AsasMenulis** as its quiz step (trace → dictation quiz). Instantly gives 3.1 a mastery gate AND covers suku kata/perkataan/frasa (M3 A2 → ⚠️/✅). | M3 A2, B7 | **Trivial** — bank already written | ✅ |
| P1 | **Ayat tunggal STT tier in 1.7** — one extension covers M1 A7 (menyebut ayat) **and** M2 A7 (membaca mekanis secara lisan) in a single stroke. | M1 A7, M2 A7 | Low | ✅ |
| P1 | **"Dengar & Buat" arahan game** (TTS arahan → tap/drag to perform; pesanan variant). | M1 A9, A11 | Medium | ✅ |
| P1 | **Kata Tugas + Kata Ganti Nama Diri content in M5** — rebuild 5.1 as a Pattern-1 bank (≥15 items incl. dan/atau/tetapi, di/ke/dari/daripada, kata tanya, saya/kamu/dia) → also fixes its gate, bank size, and learn page in one move. | M5 A2, A4, A5, B1, B6, B7 | Medium | ✅ |
| P2 | **Add pantun dua kerat (2-3 contoh) + replace garbled pantun #2**; add idea-utama questions to 2.3; add ayat majmuk items to 2.2's bank. | M4 A2, C5; M2 A8, A10 | Low (content only) | ✅ |
| P2 | **"Ajuk Saya" mic** on letter/word cards (M1 A5) and **dialog role-play STT** in 4.1 (M4 A1). | M1 A5, M4 A1 | Medium | ✅ |
| P2 | **Spaced repetition beyond M1** — populate `reviewQs` for 2.2 (review 1.6/1.5), 3.3 (review 2.3 passages), 5.2 (review 5.1 once it has a bank). | B2 across M2–M5 | Low | ✅ |
| P2 | **Gate the Pattern-2 reuse games** (2.1, 2.3, 3.2, 5.1, 1.7) — internal pass threshold before `topicComplete`, and grow fixed banks to ≥12 items. | B6/B7 across modules | Medium | ✅ |
| P2 | **"Kenalkan Diri" guided speaking** (template STT) + polite-request picker. | M1 A12, A13, A10 | Medium | ⚠️ template-gradeable only |
| P3 | Swap `Anggur`/`Singa` for KV/KVK-clean words; **decide the KV/KVK rule scope** for passages (2.3/3.3/3.2 texts use meN-/ber- words) — either simplify or document the exception. | C1 across modules | Trivial–Low | ✅ |
| ➖ | Out of scope (documented): arah bunyi (M1 A8), irama pantun & menyanyi sambil aksi (M4 A3/A4), free handwriting grading. Keep wording "Berdasarkan KSSR". | — | — | ❌ |

> **Bottom line for Tahun 1:** every modul lands at ⚠️ PARTIAL with the same shape — receptive/recognition
> skills are well built (18✅), production skills are the systematic gap (speaking beyond frasa, writing
> beyond huruf, note-taking, dialog performance). The two cheapest high-impact wins are wiring the
> already-written `asas-menulis` bank (P1, trivial) and the 1.7 ayat-tunggal STT tier (P1, closes a gap
> in two modules at once).
