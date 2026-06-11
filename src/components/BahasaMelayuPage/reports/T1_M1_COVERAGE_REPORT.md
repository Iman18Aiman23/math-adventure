# 📋 Coverage Report — Tahun 1 · Modul 1

> Template: `_CHECKLIST_TEMPLATE.md` · Silibus source: `BAHASA_MELAYU.md` §Silibus Tahun 1 Modul 1
> (Kemahiran Mendengar dan Bertutur — Topik 1.1 Mendengar dan Menyebut · Topik 1.2 Bertutur dan
> Menyampaikan Maklumat).
>
> **Status key:** ✅ PASS · ⚠️ PARTIAL · ❌ GAP · ➖ N/A (not feasible digitally)

## Report Header

| Field | Value |
|---|---|
| Tahun / Modul | Tahun 1 · Modul 1 — Kemahiran Mendengar dan Bertutur |
| App module name (hub) | "Huruf Vokal & Frasa Bergambar" (A–Z journey, 7 nodes) |
| Topics audited | 1.1–1.4 `MengenalHuruf.jsx` (vokal / B–J / K–R / S–Z) · 1.5 `SukuKata.jsx` (KVLearningPage) · 1.6 `DengarTeka.jsx` · 1.7 `BacaFrasaBergambar.jsx` (STT) |
| Question banks audited | `1-1-1-mendengar-menyebut`, `1-1-3-konsonan-bj`, `1-1-4-konsonan-kr`, `1-1-5-konsonan-sz`, `1-1-6-dengar-teka`, `1-1-7-suku-kata` + 1.7 in-file phrase list |
| Audit date / by | 2026-06-11 · Claude Code audit |
| Overall verdict | ⚠️ **PARTIAL** — Mendengar (Topik 1.1 receptive side) is excellent; the Bertutur half (Topik 1.2: arahan, pesanan, perkenalan diri, permintaan sopan) is largely uncovered. 5 ✅ · 3 ⚠️ · 5 ❌ · 1 ➖ |

---

## A. Silibus Coverage

### Topik 1.1 — Mendengar dan Menyebut

| # | Keperluan silibus (atomic skill) | Status | Evidence | Notes & gap detail |
|---|---|---|---|---|
| A1 | Mendengar & mengecam bunyi **vokal** | ✅ | 1.1 learn cards (tap = TTS word) + emoji quiz; reviewed again in 1.5/1.6 | Strong: recognition + spaced repetition. |
| A2 | Mendengar & mengecam bunyi **konsonan** | ✅ | 1.2–1.4 cover B–Z in three groups; `REVIEW_SOURCES` re-tests earlier groups | Full A–Z coverage. |
| A3 | Mengecam bunyi pada peringkat **suku kata** (KV/KVK) | ✅ | 1.5 flashcards (tap-to-listen) + quiz "hear word → pick first syllable" | Doubles as bridge to Modul 2 membaca. |
| A4 | Mendengar & mengecam **perkataan** yang diujarkan | ✅ | 1.6 Dengar & Teka — TTS word → pick written word; sound-alike distractors | Auto-play + replay button. |
| A5 | **Menyebut** bunyi bahasa / perkataan dengan betul | ⚠️ | TTS models every letter-word on tap (1.1–1.5); child imitates | Imitation is invited but never **verified** — no mic at letter/word level. |
| A6 | Menyebut **frasa** dengan betul dan jelas | ✅ | 1.7 — child reads phrase aloud; STT passes at ≥60% keyword match; 🔊 model + praise TTS | The only verified-speech node. Phrases are KV/KVK-clean. |
| A7 | Menyebut **ayat tunggal** dengan betul dan jelas | ❌ | — | 1.7 stops at phrase level (2–3 words). M2's 2.2 handles ayat *receptively* (pick the heard sentence), not spoken. |
| A8 | Menentukan **arah bunyi** (mengajuk & menentukan arah) | ➖ | — | Not feasible: requires physical/stereo sound-direction perception; out of scope per coverage-honesty policy. |

### Topik 1.2 — Bertutur dan Menyampaikan Maklumat

| # | Keperluan silibus (atomic skill) | Status | Evidence | Notes & gap detail |
|---|---|---|---|---|
| A9 | Memberikan respons terhadap **arahan mudah** | ❌ | — | No instruction-following activity anywhere in M1. |
| A10 | Memberikan respons terhadap **soalan berciri bertumpu** | ⚠️ | Quiz questions ("Apakah ini?", "Perkataan mana…?") are bertumpu-style | Child responds by **tapping**, not **lisan** — receptive coverage only. |
| A11 | Memberikan respons terhadap **pesanan** | ❌ | — | No pesanan (relayed-message) activity. |
| A12 | Bertutur untuk **menyampaikan maklumat / memperkenalkan diri** | ❌ | — | No self-introduction activity. |
| A13 | **Menyatakan permintaan dengan sopan** | ❌ | — | No polite-request activity (also untouched receptively). |

**Score: 5 ✅ · 3 ⚠️ (A5, A10 + B1 note below) · 5 ❌ · 1 ➖ of 13 rows**

> **Structural insight:** the app's M1 was deliberately rebuilt as a letter journey, so it
> front-loads *asas membaca* foundations (huruf, suku kata) brilliantly — but that means it now
> covers Topik 1.1's listening half far better than the silibus' own Modul 1 demands, while
> Topik 1.2 (interactive speaking) became the module's blind spot. Every ❌ above is from Topik 1.2
> except A7.

---

## B. Pedagogy Standards

| # | Check | Status | Notes |
|---|---|---|---|
| B1 | Learn-before-quiz on every topic | ⚠️ | 1.1–1.5, 1.7 ✅. 1.6 is quiz-only **by documented decision** (it *is* a listening drill) — acceptable, noted for completeness. |
| B2 | Spaced repetition (~70/30) | ✅ | `REVIEW_SOURCES` chains all konsonan groups; 1.6 reviews all letter + suku kata banks. |
| B3 | Immediate feedback | ✅ | Confetti on correct, correct answer revealed on mistakes, TTS praise in 1.7. |
| B4 | Progress persisted + hub ✓ | ✅ | `markTopicCompleted` on back; corner badge on node; trophy count 7/7. |
| B5 | Audio modelling for oral skills | ✅ | TTS model on every card tap; 1.7 models the phrase after failure and on 🔊. |
| B6 | Bank size ≥ 12, plausible distractors | ✅ | Banks: 15/13/14/12/15/15 items; distractors are same-initial or sound-alike words. |
| B7 | Mastery gate (pass ≥ 70% to complete; next-topic / retry prompt) | ✅ | Added 2026-06-11: `BMLessonQuizLayout` gates completion at `PASS_PCT = 70`; pass → "Topik Seterusnya →" / "Cuba Lagi", fail → retry with minimum-score notice. Found by this audit cycle. |

---

## C. Content Rules (Tahun 1)

| # | Check | Status | Notes |
|---|---|---|---|
| C1 | KV/KVK-only vocabulary | ⚠️ | **2 violations:** `Anggur` (bank 1-1-1) and `Singa` (bank 1-1-5) contain the digraph **ng**, which is Tahun 2 material. 1.7 phrases are clean. |
| C2 | One game = one topic | ✅ | 1.1–1.4 share `MengenalHuruf.jsx` but as four distinct letter-group topics with distinct banks — compliant. |
| C3 | Child-friendly hub labels | ✅ | "Mengenal Huruf Vokal", "Dengar & Teka", "Baca Frasa Bergambar". |
| C4 | Topic IDs never renumbered | ✅ | `1-1-2-bertutur-maklumat` kept for node 1.7 so saved progress survives. |
| C5 | BM language quality | ✅ | Indonesian *sepeda* already purged from `bm_kv.js`; banks read naturally. |

---

## D. Technical / UX Standards

| # | Check | Status | Notes |
|---|---|---|---|
| D1 | Leaf games lazy-loaded | ✅ | All M1 topic pages lazy in App.jsx. |
| D2 | TTS voice policy | ✅ | `ms-MY` preferred, `id-*` fallback tier (Damayanti/Google Bahasa Indonesia); stops on nav/unmount. |
| D3 | STT safety (1.7) | ✅ | `listenActiveRef` double-start guard; `not-allowed`/`audio-capture` handled; forgiving ≥60% match with "Tak mengapa" encouragement path. |
| D4 | iOS-safe CSS | ✅ | Icons have width/height attrs; hub hover behind `@media(hover:hover)`. |
| D5 | Responsive 320px+ | ✅ | Serpentine `--amp: clamp(48px,24vw,118px)`; labels no longer clip (fixed 2026-06-11). |
| D6 | Gradient full-cover icon standard | ✅ | All 7 nodes have distinct per-topic icons (2026-06-11). |

---

## E. Improvement Actions

| Priority | Action | Closes | Effort | Feasible? |
|---|---|---|---|---|
| P1 | **New topic "Dengar & Buat"** — TTS speaks an arahan mudah ("Sentuh bola merah", "Letak buku atas meja" as drag-drop) → child performs it by tapping/dragging. A pesanan variant relays a 2-part message. | A9, A11 | Medium (new game, reuses `BMLessonQuizLayout` shell + audioText pattern) | ✅ Yes |
| P1 | **Extend 1.7 with ayat tunggal set** — add a third difficulty tier of simple sentences ("Saya suka bola", "Adik minum susu" already proven) using existing STT; KV/KVK rule respected. | A7 | Low (data + tier flag in existing game) | ✅ Yes |
| P2 | **"Ajuk Saya" mic on letter/word cards** — optional mic button on `MengenalHuruf`/`SukuKata` cards reusing 1.7's forgiving STT to verify single-word pronunciation. Practice-graded (never blocks progress). | A5 → ✅ | Medium | ✅ Yes |
| P2 | **"Kenalkan Diri" guided speaking** — template prompts ("Nama saya …", "Umur saya … tahun", "Tolong…", "Terima kasih") with STT checking the scaffold words only; polite-request scenarios as picker quiz for the receptive side. | A12, A13 (partial), A10 → ✅ | Medium | ⚠️ Partially (free content ungradeable; template words gradeable) |
| P3 | **Fix C1 violations** — replace `Anggur` → e.g. `Awan`/`Asam` variant and `Singa` → `Sudu` 🥄 / `Sampan` in the two banks (swap distractor lists accordingly). | C1 → ✅ | Trivial | ✅ Yes |
| ➖ | **Out of scope (documented):** menentukan arah bunyi (A8 — needs real-world sound direction) and free-conversation grading. Keep coverage wording "Berdasarkan KSSR". | A8 | — | ❌ No |

> **Bottom line:** Modul 1 passes as a *Mendengar* module and as a reading-readiness journey, but
> to honestly claim Topik 1.2 the module needs one new listening-response game (P1) and one guided
> speaking activity (P2). The two P1 items would lift the score from 5/13 ✅ to 8/13 ✅ with
> modest effort.
