# 📋 Coverage Report — Tahun 2 (Modul 1–5)

> Template: `_CHECKLIST_TEMPLATE.md` · Silibus source: `BAHASA_MELAYU.md` §MODUL PEMBELAJARAN TAHUN 2.
> KSSR BM Tahun 2 has **5 modul** (Mendengar & Bertutur, Membaca, Menulis, Seni Bahasa, Tatabahasa), **13 topik** total (M1=2, M2=3, M3=3, M4=2, M5=3) — same shape as Tahun 1.
> See also: [`T1_COVERAGE_REPORT.md`](./T1_COVERAGE_REPORT.md) (Tahun 1, audited 2026-06-11).
>
> **Status key:** ✅ PASS · ⚠️ PARTIAL · ❌ GAP · ➖ N/A (not feasible digitally)
>
> **📄 Nota:** Dokumen ini ialah **satu-satunya sumber kebenaran** untuk status & rancangan T2 (digabungkan daripada bekas `T2_IMPROVEMENT_PLAN.md` pada 2026-06-13). Kemas kini bahagian **🟢 Keputusan & Progress** di bawah sahaja — jangan cipta dokumen plan berasingan lagi.

---

## 🟢 Keputusan & Progress (living section — kemas kini di sini)

### Alur kerja & pengesahan (build → verify loop)

Setiap tugas (R-item) dibina oleh **satu agen pada satu masa**, kemudian disahkan sebelum ditanda siap:

1. **Agen bina SATU tugas sahaja**, ikut spec berkaitan (cth. `BUILD_SPEC_R15_5.1a.md`).
2. Bila siap, agen set status tugas itu ke **🔍 PENDING VERIFICATION** dalam papan status di bawah, dan tinggalkan **Nota serah-tangan** dalam slice log: (a) fail yang diubah, (b) ringkasan perubahan, (c) cara ia diuji.
3. Agen **JANGAN** tanda ✅ sendiri. Pemilik akan minta pengesahan bebas; hanya selepas itu status jadi **✅ COMPLETED**.
4. Ulang untuk tugas seterusnya.

**Status legend:** ⏳ Pending · 🔨 Building · 🔍 Pending verification · 🟡 Partial · ✅ Completed

**Apa "verified" bermakna** (semakan bebas terhadap Definition of Done dalam spec): fail betul-betul wujud & ikut Pattern 1 · bank ≥ minima & setiap `options` bebas-duplikat & `answer` ∈ `options` · node trail + routing App.jsx betul (Pattern-1, bukan `ProgressWrapper`) · gate 70% + ganjaran (XP/hearts/gems) berfungsi tanpa wiring manual · tiada ralat konsol. Pengesah baca kod sebenar (tidak hanya percaya dakwaan agen); jika perlu, jalankan app (`run-math-adventure`) untuk semakan tingkah laku — **tiada skrip ujian Python**.

### Papan status tugas (task board)

| Tugas | Spec | Status | Disahkan |
|-------|------|--------|----------|
| Slice 1 — Distractor fixes (R24a) | — | ✅ Completed | 2026-06-13 |
| R15 / 5.1a — Kata Bilangan & Kata Arah | `BUILD_SPEC_R15_5.1a.md` | 🔍 Pending verification | — |
| R15 / 5.1b — Kata Kerja Pasif & Adjektif | _(spec TBD)_ | ⏳ Pending | — |
| R15 / 5.1c — Kata Tugas | _(spec TBD)_ | ⏳ Pending | — |
| R13 / 1.2 — Bercerita (baca kuat) & Berbincang | _(spec TBD)_ | ⏳ Pending | — |
| R12, R14, R16–R24 | _(see action table below)_ | ⏳ Pending | — |

### Progress (slice log)

- **2026-06-13 — R15 / 5.1a — Kata Bilangan & Kata Arah 🔍 Pending verification.** Fail diubah: (1) `KataBilanganArah.jsx` — komponen Pattern-1 baru (learn page 2 kategori expandable + kuiz 12 soalan via `BMLessonQuizLayout`); (2) `ModuleData.js` — tambah bank soalan 16 item (8 Kata Bilangan + 8 Kata Arah) & gantikan 3 node trail M5 dengan 5 node (5.1a aktif + 5.1b/5.1c disabled placeholder); (3) `App.jsx` — tambah lazy import `KataBilanganArah` + route Pattern-1 (tiada `ProgressWrapper`). Diuji: `npm run dev` → dev server HTTP 200 tanpa ralat.
- **2026-06-13 — Slice 1: Pembaikan duplikasi distractor ✅ SELESAI (R24a).** Imbasan automatik seluruh bank `ModuleData.js` (396 array `options`) jumpa **21 item** dengan nilai berulang dalam pilihan (audit asal hanya kesan 5). Terburuk: `kerusi` (line 508) jawapan muncul **3×** → cuma 1 distractor benar (peluang teka betul 75%). Semua 21 dibaiki — distractor berulang diganti salah-eja munasabah; jawapan kekal unik, 4 pilihan berbeza. Imbasan ulang: **CLEAN** seluruh `BahasaMelayuPage`. Bank terjejas: `2-2-1-perkataan-sukar` (3), `2-3-1-menulis-mekanis` (17), `2-5-3-sintaksis-ayat-majmuk` (1). _Baki R24: (b) lumba-lari, (c) "serta" tak diajar, (d) typo sh→sy masih pending._

### Keputusan reka bentuk (2026-06-13)

- **Soalan 1 — Quantity vs quality → KEDUA-DUANYA.** Sasaran 13 → 18+ topik, tetapi setiap topik baru/dikembang mesti penuhi minima Pattern 1 (bank ≥ 12 item, gate 70%, learn card + contoh). Jangan tambah topik nipis semata-mata untuk angka.
- **Soalan 2 — M5 5.1 satu komponen vs pecah → PECAH.** Pecah **R15** jadi 3 topik/node berasingan (murid boleh berhenti & sambung ikut level): **5.1a** Kata Bilangan & Kata Arah · **5.1b** Kata Kerja Pasif & Kata Adjektif (waktu/jarak/cara/pancaindera) · **5.1c** Kata Tugas (Seru/Perintah/Penguat/Nafi). Setiap satu bank Pattern 1 sendiri + gate 70%. M5 jadi 5 topik.
- **Soalan 3 — M1 1.2 Bercerita via STT → BACA KUAT, bukan cerita bebas.** Tolak free-form (grading keyword = sia-sia). **R13** Tier Bercerita = anak baca kuat 6-8 cerita disediakan; STT semak sebutan terhadap **teks yang diketahui** (boleh dinilai tepat). Tier Berbincang = MCQ terbimbing, tiada pergantungan grading STT terbuka.

**Cadangan turutan slice seterusnya:** R15→5.1a (bersih, tiada STT, tetapkan corak split) → R13 1.2 (besar, perlu plumbing baca-kuat STT).

---

## Overall Verdict

| Modul | Verdict | Silibus score | Headline gap |
|---|---|---|---|
| M1 Mendengar & Bertutur | ❌ REBUILD NEEDED | 1✅ · 0⚠️ · 6❌ (7 rows) | Both topics are **verbatim Tahun-1 reuses** repointed to T2 IDs — bercapah, arahan/pesanan/permintaan multi-info, bercerita, and berbincang are all untaught |
| M2 Membaca | ✅ STRONG | 5✅ · 0⚠️ · 1❌ (6 rows) | Best T2 module — only "bahan sastera (cerpen/pantun) → mesej/nilai murni" (A6) is missing |
| M3 Menulis | ⚠️ PARTIAL | 0✅ · 4⚠️ · 4❌ (8 rows) | No real writing **production** anywhere — perenggan/ayat-majmuk mekanis, karangan pendek, and jawapan bercapah all missing |
| M4 Seni Bahasa | ❌ MOSTLY GAPS | 0✅ · 1⚠️ · 4❌ · 1➖ (6 rows) | Pantun empat kerat recitation, simpulan bahasa, bandingan semacam, and dialog teater bercerita all missing |
| M5 Tatabahasa | ❌ REBUILD NEEDED | 1✅ · 2⚠️ · 9❌ (12 rows) | Topik 5.1 is a **complete content mismatch** (0 of 8 required categories taught); 5.2 missing imbuhan di- and akhiran -an/-kan/-i |
| **Tahun 2 overall** | **❌ MAJOR GAPS — 7✅ · 7⚠️ · 24❌ · 1➖ (39 rows)** | | Compare T1's 22✅·10⚠️·7❌·2➖ (41 rows) — T2 is far less complete. M1 + M5.1 need near-total rebuilds; M2 is the only module that's essentially done |

| Field | Value |
|---|---|
| Audit date / by | 2026-06-11 · Claude Code audit (all 5 modules audited in one pass) |
| Question banks audited | All 6 T2 `BM_QUESTIONS` keys (`2-2-1-perkataan-sukar`, `2-3-1-menulis-mekanis`, `2-3-2-hasilkan-penulisan`, `2-3-3-jawapan-pemahaman`, `2-4-2-persembahan-karya`, `2-5-3-sintaksis-ayat-majmuk`) + in-file item arrays of all 7 Pattern-2 reuse components (`JawabSoalan`, `BertuturBertatasusila`, `BacaanPemahaman`, `KosaKataKontekstual`, `PantunBacaan`, `KataHubungSendi`, `KataImbuhan`) |
| **Cross-cutting finding** | **7 of 13 T2 topics (1.1, 1.2, 2.2, 2.3, 4.1, 5.1, 5.2) are Pattern 2** — they reuse a component built for a *different* silibus objective (mostly Tahun-1 / AgeGroup-7 / AgeGroup-8 standalone games) and complete on any back-press. Only the 6 Pattern-1 topics (2.1, 3.1, 3.2, 3.3, 4.2, 5.3) have purpose-written `BM_QUESTIONS` banks and a 70% mastery gate. |

---

# Modul 1 — Kemahiran Mendengar dan Bertutur

| Field | Value |
|---|---|
| Silibus (BAHASA_MELAYU.md §MODUL TAHUN 2) | **1.1** "Memberikan respons yang sesuai terhadap soalan berciri bertumpu dan berciri bercapah. Melaksanakan arahan, pesanan, dan permintaan yang mengandungi beberapa maklumat." · **1.2** "Bercerita dengan sebutan betul, intonasi sesuai, dan gaya bersahaja. Berbincang secara berpandu untuk memberikan idea atau pendapat." |
| Topics audited | 1.1 `2-1-1-mendengar-merespons` → `JawabSoalan.jsx` (`src/components/AgeGroup-7/`, Pattern 2/`ProgressWrapper`, 10-item STT Q&A bank, in-file comment "Tahun 1 — Obj 14") · 1.2 `2-1-2-bercerita` → `BertuturBertatasusila.jsx` (`src/components/AgeGroup-7/`, Pattern 2/`ProgressWrapper`, 10-item STT politeness-phrase bank, in-file comment "Tahun 1 — Obj 3") |

## A. Silibus Coverage

### Topik 1.1 — Mendengar, Memahami dan Merespons

| # | Keperluan silibus (atomic skill) | Status | Evidence | Notes |
|---|---|---|---|---|
| A1 | Respons soalan **bertumpu** (jawapan tunggal/faktual) | ✅ | `JawabSoalan.jsx` — 10 items (e.g. "Apakah warna langit?" → Biru), TTS asks aloud, child answers via mic, STT checked against an `accept[]` list | Direct content fit — "soalan berciri bertumpu" is exactly what this game does. |
| A2 | Respons soalan **bercapah** (pendapat/jawapan terbuka) | ❌ | — | All 10 items have ONE fixed `answer` + `accept[]` list — none are open-ended ("Apa pendapat kamu...?", "Mengapa kamu suka...?"). |
| A3 | Melaksanakan **arahan** mengandungi beberapa maklumat | ❌ | — | T1 Topik 1.8 "Dengar & Buat" (single-step arahan, self-report) is a *different* topic ID and not reused here. T2 1.1 has no multi-info arahan activity at all. |
| A4 | Melaksanakan **pesanan** mengandungi beberapa maklumat | ❌ | — | No pesanan-relay activity exists in T2. |
| A5 | Melaksanakan **permintaan** mengandungi beberapa maklumat | ❌ | — | No permintaan activity exists in T2. |

### Topik 1.2 — Bercerita dan Berbincang

| # | Keperluan silibus (atomic skill) | Status | Evidence | Notes |
|---|---|---|---|---|
| A6 | **Bercerita** — sebutan betul, intonasi sesuai, gaya bersahaja | ❌ | — | `BertuturBertatasusila.jsx` is a politeness-phrase STT drill (10 social scenarios → say "Terima kasih" / "Minta maaf" / "Selamat pagi, cikgu" / etc.) — not storytelling in any sense. |
| A7 | **Berbincang** secara berpandu untuk memberi idea/pendapat | ❌ | — | Same component — fixed-phrase responses to a depicted situation, not a discussion or opinion-giving activity. |

**Score: 1✅ · 0⚠️ · 6❌ · 0➖** — Both T2 M1 topics currently run **verbatim Tahun-1 content** (`JawabSoalan` = T1 Obj 14, `BertuturBertatasusila` = T1 Obj 3) repointed to T2 topic IDs. The STT engine, mic UX, and item-bank shape are solid and reusable — only the *content* needs to change.

## B/C/D — Standards (M1)

| # | Check | Status | Notes |
|---|---|---|---|
| B1 | Learn-before-quiz | ✅ | Both Pattern 2 — TTS speaks the question/situation aloud before the child must respond, which doubles as the model (same design as T1 1.7). |
| B2 | Spaced repetition | ➖ | N/A — neither topic uses `useBMQuiz`/`BM_QUESTIONS`; STT activities have no review mechanism by design (consistent with T1 1.7/1.8). |
| B6 | Bank ≥12 items | ❌ | Both 10 items (< 12). |
| B7 | Mastery gate ≥70% | ❌ | Both Pattern 2 — `topicComplete` fires on any back-press via `ProgressWrapper`, regardless of score. |
| C1 | Vocabulary level rule | ➖ | No documented T2 vocabulary-level rule yet (T2 explicitly introduces digraf/diftong/imbuhan, broadening beyond T1's KV/KVK-only rule — see M2 C1 below). |
| C2 | One game serves exactly one topic | ✅ | `JawabSoalan`/`BertuturBertatasusila` each map to exactly one T2 topic ID; no duplicate topic-ID wiring. |
| C3–C4 | Hub labels / topic IDs | ✅ | "Jawab Soalan" / "Bertutur Bertatasusila" read as child-friendly names; topic IDs (`2-1-1-...`, `2-1-2-...`) are stable. |
| C5 | BM language quality | ✅ | Content itself (questions/scenarios) is correct, age-appropriate BM — the issue is topical fit, not language quality. |
| D1–D6 | Lazy-loading, TTS policy, STT guards, iOS CSS, responsive, hub icons | ✅ | Both components share T1's STT engine (`SpeechManager`, double-start guard via `listenActiveRef`, mic-permission/network/no-speech error states) and `BMJourneySvgs` hub icons — same shared infrastructure as T1, already audited. |

---

# Modul 2 — Kemahiran Membaca

| Field | Value |
|---|---|
| Silibus | **2.1** "Membaca perkataan yang mengandungi digraf (ng, ny, kh, sy*) dan diftong (ai, au, oi)." · **2.2** "Membaca dan memahami perenggan serta petikan mudah." · **2.3** "Membaca bahan sastera (cerpen, pantun) dan bukan sastera untuk mengenal pasti mesej, nilai murni." |
| Topics audited | 2.1 `2-2-1-perkataan-sukar` → `PerkataanSukar.jsx` (Pattern 1, gated, `BM_QUESTIONS['2-2-1-perkataan-sukar']` — 24 items) · 2.2 `2-2-2-teks-pelbagai` → `BacaanPemahaman.jsx` (`src/components/AgeGroup-8/`, Pattern 2/`ProgressWrapper`, 3 petikan × 4 soalan = 12 items) · 2.3 `2-2-3-mentafsir-menaakul` → `KosaKataKontekstual.jsx` (`src/components/AgeGroup-8/`, Pattern 2/`ProgressWrapper`, 12-item kosa-kata-dalam-konteks bank, in-file comment "Tahun 2 — Obj 4") |

\* `BAHASA_MELAYU.md`'s silibus text says "(ng, ny, kh, **sh**)" — this is a pre-existing typo. The actual game (`PerkataanSukar`) correctly drills **sy** (as in "syukur"), which is the real KSSR digraf. Fix the doc typo as part of R24.

## A. Silibus Coverage

| # | Keperluan silibus (atomic skill) | Status | Evidence | Notes |
|---|---|---|---|---|
| A1 | Membaca perkataan dengan **digraf** (ng, ny, kh, sy) | ✅ | 2.1 `PerkataanSukar` — digraf items (e.g. "khabar", "nyanyi", "syukur", "bunga") in a 24-item gated bank | Strong, audio-recognition + word-meaning. |
| A2 | Membaca perkataan dengan **diftong** (ai, au, oi) | ✅ | 2.1 `PerkataanSukar` — diftong items (e.g. "pandai", "harimau", "boikot"/"sepoi") in the same 24-item bank | Same bank as A1 — both phonics targets covered in one topic. |
| A3 | Membaca & memahami **perenggan** | ✅ | 2.2 `BacaanPemahaman` — 3 petikan, each a multi-sentence perenggan, 4 soalan each | |
| A4 | Membaca & memahami **petikan mudah** | ✅ | 2.2 `BacaanPemahaman` — same 3 petikan | A3/A4 delivered together by one topic, as in T1 M2 2.3. |
| A5 | **Mentafsir** — menaakul makna perkataan daripada konteks | ✅ | 2.3 `KosaKataKontekstual` — 12 items, each a 1-2 sentence context + "Apakah maksud [word]?" 3-option MCQ + explanation (e.g. "bersinar", "gelisah", "tulus", "waspada") | A genuine **mentafsir** task — child infers meaning from context, not just recall. |
| A6 | Membaca **bahan sastera** (cerpen/pantun) untuk kenal pasti **mesej / nilai murni** | ❌ | — | Nothing in M2 reads a cerpen or pantun and asks "apakah mesej/pengajaran cerita ini?". `KosaKataKontekstual`'s contexts are 1-2 sentence snippets, not cerpen/pantun; M4's `PantunBacaan` (4.1) has pantun + "huraian" but no quiz and isn't in M2. |

**Score: 5✅ · 0⚠️ · 1❌** — the strongest T2 module. Only the "bahan sastera → mesej/nilai murni" requirement (A6) is unaddressed.

## B/C — Standards deltas (M2)

| # | Check | Status | Notes |
|---|---|---|---|
| B1 | Learn-before-quiz | ⚠️ | 2.1 — quiz-only with in-quiz explanations (not yet confirmed to have a separate learn page; same pattern as several T1 M5-style topics). 2.2/2.3 — the petikan/context itself *is* the learn step (✅, mirrors T1 2.3). |
| B2 | Spaced repetition | ❌ | 2.1's `useBMQuiz` call uses `reviewQuestions = []` — same universal gap as all T2 Pattern-1 topics (R22). |
| B6 | Bank ≥12 | ✅ | 2.1 = 24 · 2.2 = 12 · 2.3 = 12 — all meet the threshold (2.2/2.3 exactly at the floor). |
| B7 | Mastery gate | ⚠️ | 2.1 ✅ gated (Pattern 1) · 2.2/2.3 ❌ Pattern 2, complete on back regardless of score. |
| C1 | Vocabulary level rule | ✅ | T2 2.1 *intentionally* introduces digraf/diftong (ng/ny/kh/sy, ai/au/oi) — this is the T2 vocabulary expansion, by design (no rule violation; T1's KV/KVK-only rule does not apply past T1). |
| C5 | BM language quality | ⚠️ | 2.2's passage uses "berlari" but a question asks about "lumba lari" (wording mismatch — same word, different surface form) — minor, tracked in R24. |

---

# Modul 3 — Kemahiran Menulis

| Field | Value |
|---|---|
| Silibus | **3.1** "Menulis perkataan, frasa, perenggan, dan ayat majmuk secara mekanis." · **3.2** "Membina ayat majmuk, menulis karangan pendek secara berpandu." · **3.3** "Menulis jawapan secara kritis berdasarkan soalan bertumpu dan bercapah." |
| Topics audited | 3.1 `2-3-1-menulis-mekanis` → `MenulisMekanis.jsx` (Pattern 1, gated, `BM_QUESTIONS['2-3-1-menulis-mekanis']` — 21 items, dictation/spelling-match MCQ) · 3.2 `2-3-2-hasilkan-penulisan` → `HasilkanPenulisan.jsx` (Pattern 1, gated, `BM_QUESTIONS['2-3-2-hasilkan-penulisan']` — 15 items, ayat-majmuk/kata-hubung MCQ) · 3.3 `2-3-3-jawapan-pemahaman` → `JawapanPemahaman.jsx` (Pattern 1, gated, `BM_QUESTIONS['2-3-3-jawapan-pemahaman']` — 15 items, bertumpu MCQ on 2 petikan: gotong-royong/Taman Murni & Rani's family) |

## A. Silibus Coverage

| # | Keperluan silibus (atomic skill) | Status | Evidence | Notes |
|---|---|---|---|---|
| A1 | Menulis **perkataan** secara mekanis | ⚠️ | 3.1 `MenulisMekanis` — word dictation/spelling-match MCQ items | Recognition/spelling-match, not handwriting — same caveat as T1 M3 A2. |
| A2 | Menulis **frasa** secara mekanis | ⚠️ | 3.1 `MenulisMekanis` — phrase dictation/spelling-match MCQ items | Same caveat. |
| A3 | Menulis **perenggan** secara mekanis | ❌ | — | No perenggan-level dictation/spelling item in 3.1's 21-item bank — items stop at perkataan/frasa/sentence level. |
| A4 | Menulis **ayat majmuk** secara mekanis | ❌ | — | 3.1's bank has no ayat-majmuk dictation items. (5.3's bank teaches ayat-majmuk *recognition* via kata hubung, but that's M5, not "menulis ... secara mekanis".) |
| A5 | **Membina** ayat majmuk | ⚠️ | 3.2 `HasilkanPenulisan` — 15-item MCQ on ayat majmuk / kata hubung (recognise/select the correct kata hubung or compound form) | Recognition/selection, not constructing a compound sentence from two given simple sentences. |
| A6 | Menulis **karangan pendek** secara berpandu | ❌ | — | 3.2's 15 items are all MCQ about kata hubung/ayat majmuk — zero guided-composition content despite the topic name "Hasilkan Penulisan". |
| A7 | Menulis jawapan kritis — soalan **bertumpu** | ⚠️ | 3.3 `JawapanPemahaman` — 15-item MCQ, all literal-recall ("bertumpu") questions about 2 petikan | Answered by picker, not written/typed — same caveat as T1 M3 A4. |
| A8 | Menulis jawapan kritis — soalan **bercapah** | ❌ | — | All 15 items in 3.3's bank are literal-recall ("bertumpu" per the agent audit) — none ask for opinion/inference ("Apa pendapat kamu...?", "Patutkah Rani...? Mengapa?"). |

**Score: 0✅ · 4⚠️ · 4❌** — the recurring theme across all 3 topics is **zero writing production**: every activity is MCQ/picker-based. This mirrors T1 M3's "constructive proxy for writing" approach (3.2 BinaAyat / word-arrangement) but T2's HasilkanPenulisan doesn't even have that — it's pure recognition.

## B/C — Standards deltas (M3)

| # | Check | Status | Notes |
|---|---|---|---|
| B1 | Learn-before-quiz | ⚠️ | All 3 topics appear quiz-only with in-quiz explanations (not confirmed to have separate learn pages — same caveat as M2 2.1). |
| B2 | Spaced repetition | ❌ | All 3 `useBM Quiz` calls use `reviewQuestions = []` — part of the universal T2 gap (R22). |
| B6 | Bank ≥12 | ✅ | 3.1 = 21 · 3.2 = 15 · 3.3 = 15 — all comfortably above the floor. |
| B7 | Mastery gate | ✅ | All 3 are Pattern 1, gated at 70% via `BMLessonQuizLayout`. |
| C5 | BM language quality | ⚠️ | 3.1's bank has several duplicate-correct-answer-as-distractor items (e.g. "bapa" appearing as both the answer and a distractor alongside "papa"/"baba") — tracked in R24. |

---

# Modul 4 — Aspek Seni Bahasa

| Field | Value |
|---|---|
| Silibus | **4.1** "Melafazkan dan menjelaskan maksud pantun empat kerat. Mengujarkan bahasa yang indah (simpulan bahasa dan bandingan semacam)." · **4.2** "Menyanyikan lagu kanak-kanak/rakyat, mengujarkan dialog melalui teater bercerita." |
| Topics audited | 4.1 `2-4-1-apresiasi-sastera` → `PantunBacaan.jsx` (`src/components/AgeGroup-8/`, Pattern 2/`ProgressWrapper`, 8-pantun browse — 4× pantun **dua kerat** + 4× pantun **empat kerat**, each with tema + huraian, **no quiz**) · 4.2 `2-4-2-persembahan-karya` → `PersembahanKarya.jsx` (`src/components/BahasaMelayuPage/Tahun2/Module4_SeniBahasa/`, Pattern 1, gated, `BM_QUESTIONS['2-4-2-persembahan-karya']` — 15 items, 3 lagu + lirik + TTS, receptive MCQ) |

## A. Silibus Coverage

| # | Keperluan silibus (atomic skill) | Status | Evidence | Notes |
|---|---|---|---|---|
| A1 | **Melafazkan** pantun empat kerat (recitation/irama) | ❌ | — | `PantunBacaan` has no audio at all — no TTS playback, no mic/STT. The pantun text is silently displayed only. |
| A2 | **Menjelaskan maksud** pantun empat kerat | ⚠️ | `PantunBacaan` — each of the 4 pantun-empat-kerat entries has a "Huraian" block explaining tema + maksud | The APP explains the meaning to the child (passive reading) — the child never explains/produces the maksud themselves. |
| A3 | **Simpulan bahasa** | ❌ | — | Not present anywhere in T2 (or T1). |
| A4 | **Bandingan semacam** | ❌ | — | Not present anywhere in T2 (or T1). |
| A5 | **Menyanyikan lagu** kanak-kanak/rakyat | ➖ | 4.2 `PersembahanKarya` — 3 lagu with full lirik + TTS playback (Bangun Pagi, Sayang Keluarga, Kawan Baik) | Singing/rhythm capture is not feasible digitally (consistent with the T1 M4 A4 precedent) — but lyric exposure + TTS pronunciation modelling is a reasonable digital substitute, already present. |
| A6 | **Mengujarkan dialog** melalui teater bercerita | ❌ | — | `PersembahanKarya`'s 15 items are receptive MCQ about the 3 songs + abstract performance concepts — no dialog lines, no role-play, no STT. |

**Score: 0✅ · 1⚠️ · 4❌ · 1➖** — `PantunBacaan` (4.1) is purely a content-browsing component (no quiz, no gate at all) containing **bonus pantun-dua-kerat content beyond the T2 4.1 silibus** (useful for cross-linking with T1 M4's R2 "add pantun dua kerat" item) but missing every silibus-required skill for empat-kerat (recitation) and the two new "bahasa indah" categories (simpulan bahasa, bandingan semacam).

## B/C — Standards deltas (M4)

| # | Check | Status | Notes |
|---|---|---|---|
| B2 | Spaced repetition | ❌ | 4.2's `useBMQuiz` call uses `reviewQuestions = []`. |
| B6 | Bank ≥12 | ⚠️ | 4.2 ✅ 15 · 4.1 has 8 pantun but **no quiz at all** — bank-size check doesn't apply until a quiz exists. |
| B7 | Mastery gate | ✅ 4.2 · ❌ 4.1 | 4.2 gated at 70% (Pattern 1). 4.1 (Pattern 2) completes on back regardless — and has no scoreable activity to gate in the first place. |
| C5 | BM language quality | ✅ | `PantunBacaan`'s 8 pantun (incl. the 4 empat-kerat: "Pisang Emas"/budi, "Tingkap Papan"/keperibadian, "Asam Kandis"/ibadah, "Kalau Ada Sumur"/persaudaraan) are authentic, well-formed, and age-appropriate — a clear quality upgrade over T1 M4's flagged "garbled pantun #2" (T1 R2). |

---

# Modul 5 — Aspek Tatabahasa

| Field | Value |
|---|---|
| Silibus | **5.1** "Kata Bilangan, Kata Arah, Kata Kerja Pasif, Kata Adjektif (Waktu/Jarak/Cara/Pancaindera). Kata Tugas: Kata Seru, Kata Perintah, Kata Penguat, Kata Nafi." · **5.2** "Imbuhan awalan (meN-, ber-, di-) dan akhiran (-an, -kan, -i)." · **5.3** "Ayat tunggal dan ayat majmuk menggunakan kata hubung (kerana, sambil, serta, lalu)." |
| Topics audited | 5.1 `2-5-1-morfologi-perluasan` → `KataHubungSendi.jsx` (`src/components/AgeGroup-7/`, Pattern 2/`ProgressWrapper`, 8-item MCQ — kata hubung dan/tetapi/atau + kata sendi nama di/ke/dari/pada, in-file comment "Tahun 1 — Obj 18") · 5.2 `2-5-2-pembentukan-perkataan` → `KataImbuhan.jsx` (`src/components/AgeGroup-7/`, Pattern 2/`ProgressWrapper`, 8-item MCQ — imbuhan awalan ber-/me- only, in-file comment "Tahun 1 — Obj 19") · 5.3 `2-5-3-sintaksis-ayat-majmuk` → `SintaksisAyatMajmuk.jsx` (Pattern 1, gated, `BM_QUESTIONS['2-5-3-sintaksis-ayat-majmuk']` — 15 items, kata hubung dan/sambil/kerana/lalu/serta) |

## A. Silibus Coverage

| # | Keperluan silibus (atomic skill) | Status | Evidence | Notes |
|---|---|---|---|---|
| A1 | **Kata Bilangan** (numbers/quantity words: dua, beberapa, semua, setiap...) | ❌ | — | Not present in `KataHubungSendi` (kata hubung + kata sendi nama only) or anywhere else in T2. |
| A2 | **Kata Arah** (direction words: atas, bawah, kiri, kanan, hadapan, belakang...) | ❌ | — | `KataHubungSendi`'s "Kata Sendi Nama" items (di/ke/dari/pada) are spatial *prepositions*, not the direction-noun "Kata Arah" category required here — different grammatical category. |
| A3 | **Kata Kerja Pasif** (passive verbs: dibaca, dimakan, ditulis...) | ❌ | — | Not present anywhere in T2. |
| A4 | **Kata Adjektif** (Waktu/Jarak/Cara/Pancaindera — e.g. lambat/cepat, jauh/dekat, perlahan-lahan, harum/pahit) | ❌ | — | Not present anywhere in T2. T1 M5 A4 covered sifat/ukuran adjectives, but waktu/jarak/cara/pancaindera are 4 entirely new sub-categories. |
| A5 | **Kata Seru** (interjections: Wah!, Aduh!, Amboi!...) | ❌ | — | Not present anywhere in T2. |
| A6 | **Kata Perintah** (imperatives: Duduk!, Jangan bising!, Tolong tutup pintu...) | ❌ | — | Not present anywhere in T2. |
| A7 | **Kata Penguat** (intensifiers: sangat, sungguh, amat, terlalu...) | ❌ | — | Not present anywhere in T2. |
| A8 | **Kata Nafi** (negators: tidak, bukan, jangan...) | ❌ | — | Not present anywhere in T2. |
| A9 | **Imbuhan awalan** meN-/ber-/di- | ⚠️ | 5.2 `KataImbuhan` — 8 items, 4× ber- (berlari, bermain, berjalan, bercerita) + 4× me- (melukis, memasak, menyanyi, melompat) | meN- (as "me-") and ber- both covered for non-allomorph roots; **di-** (passive prefix) entirely absent; meN-'s sound-change allomorphs (men-/meng-/meny-/mem-) not exercised. |
| A10 | **Imbuhan akhiran** -an/-kan/-i | ❌ | — | Zero suffix items in `KataImbuhan` — all 8 items test prefixes only. |
| A11 | **Ayat tunggal** vs **ayat majmuk** (distinguish) | ⚠️ | 5.3 `SintaksisAyatMajmuk` — some of the 15 items address the tunggal-vs-majmuk distinction | Present but not the bank's main focus (which is kata-hubung recognition); not comprehensively drilled as its own skill. |
| A12 | **Ayat majmuk** menggunakan kata hubung (kerana/sambil/serta/lalu) | ✅ | 5.3 `SintaksisAyatMajmuk` — 15-item gated bank, fill-blank/recognition/combining items using dan/sambil/kerana/lalu/serta | Solid, well-built bank — the strongest topic in M5. |

**Score: 1✅ · 2⚠️ · 9❌** — the most severe module in T2. Topik 5.1 is a **complete content mismatch**: `KataHubungSendi` teaches kata hubung (dan/tetapi/atau) and kata sendi nama (di/ke/dari/pada) — content that belongs to T1 Obj 18 — and **0 of the 8 categories required by T2 5.1** (Kata Bilangan/Arah/Kerja Pasif/Adjektif W-J-C-P + 4 Kata Tugas) are taught. Note: "dan" (kata hubung) is *also* covered by 5.3's bank, so 5.1's "dan/tetapi/atau" content is partly redundant with 5.3 even before considering the mismatch.

## B/C — Standards deltas (M5)

| # | Check | Status | Notes |
|---|---|---|---|
| B1 | Learn-before-quiz | ⚠️ 5.3 · ➖ 5.1/5.2 | 5.3 appears quiz-only with in-quiz explanations (not confirmed to have a learn page). 5.1/5.2 are Pattern 2 MCQ-with-explanation — no separate learn step, by design. |
| B2 | Spaced repetition | ❌ | 5.3's `useBMQuiz` call uses `reviewQuestions = []`. |
| B6 | Bank ≥12 | ❌ 5.1, 5.2 · ✅ 5.3 | 5.1 = 8, 5.2 = 8 (both < 12) · 5.3 = 15. |
| B7 | Mastery gate | ❌ 5.1, 5.2 · ✅ 5.3 | 5.1/5.2 (Pattern 2) complete on back regardless of score; 5.3 gated at 70%. |
| C2 | One game serves exactly one topic | ✅* | `KataHubungSendi`/`KataImbuhan` each map to exactly one T2 topic (5.1/5.2) — no duplicate T2 wiring. *Both files are ALSO used as standalone AgeGroup-7 games (`currentAgeGame === 'kata-hubung-sendi'`/`'kata-imbuhan'`) — this cross-program dual-use is the same accepted pattern as T1's R1 (5.1 `MorfologiGolonganKata`/`JenisKata`); **do not delete or break the AgeGroup-7 usage** when rebuilding 5.1/5.2 for T2. |
| C5 | BM language quality | ✅ | Both 5.1/5.2 banks are correct, well-formed BM — issue is topical fit (A1-A8), not language quality. |

---

# Consolidated Improvement Actions (Tahun 2)

| Status | Priority | Action | Closes | Effort | Feasible? |
|---|---|---|---|---|---|
| ⏳ Pending → **R12** | P1 | **M1 1.1 — extend `JawabSoalan`'s bank**: add bercapah (open-ended/opinion) Q&A items, AND add a NEW "Arahan, Pesanan & Permintaan dengan info tambahan" multi-step activity (TTS speaks a 2-3-part instruction; child performs/relays + self-reports, à la T1's "Dengar & Buat" but with compound instructions). | M1 A2, A3, A4, A5 | Medium | ✅ |
| ⏳ Pending → **R13** | P1 | **M1 1.2 — full rebuild**: replace `BertuturBertatasusila` with a NEW "Bercerita & Berbincang" component. **(Keputusan Soalan 3: BACA KUAT, bukan cerita bebas — free-form ditolak.)** (a) Bercerita: child **reads aloud** one of 6-8 short provided stories; STT checks pronunciation against the **known text** (reliably gradeable). (b) Berbincang: guided discussion — TTS poses a scenario, child picks an idea/opinion from a small set of MCQ options + reasoning. No open-ended STT grading. | M1 A6, A7, B6 (1.2), B7 (1.2) | High — biggest net-new build in T2 | ✅ (read-aloud vs known text) |
| ⏳ Pending → **R14** | P1 | **M2 — bahan sastera → mesej/nilai murni**: add 2-3 short cerpen and/or pantun passages (could live in 2.3 alongside `KosaKataKontekstual`, or as a new sub-tier) with "Apakah mesej/pengajaran cerita/pantun ini?" and "Apakah nilai murni yang ditunjukkan?" MCQ items. | M2 A6 | Medium | ✅ |
| ⏳ Pending → **R15** | P1 | **M5 5.1 — full rebuild, SPLIT into 3 topics/nodes** (Keputusan Soalan 2 — murid boleh berhenti & sambung ikut level). Each its own Pattern-1 bank (≥12 items) + learn page + `BMLessonQuizLayout` gate 70%: **5.1a** Kata Bilangan (dua/beberapa/semua/setiap) & Kata Arah (atas/bawah/kiri/kanan/hadapan/belakang) · **5.1b** Kata Kerja Pasif (dibaca/dimakan/ditulis) & Kata Adjektif Waktu/Jarak/Cara/Pancaindera (lambat-cepat/jauh-dekat/perlahan-lahan/harum-pahit) · **5.1c** Kata Tugas — Kata Seru (Wah!/Aduh!), Kata Perintah (Duduk!/Jangan bising!), Kata Penguat (sangat/amat), Kata Nafi (tidak/bukan/jangan). **Do not break the AgeGroup-7 standalone `KataHubungSendi` usage.** | M5 A1-A8, B6 (5.1), B7 (5.1) | High — second-biggest net-new build (3 nodes) | ✅ |
| ⏳ Pending → **R16** | P1 | **M5 5.2 — extend `KataImbuhan`'s bank**: add **di-** prefix items (passive: ditulis/dibaca/dimakan) and **-an/-kan/-i** suffix items (e.g. makanan, minuman / bersihkan, naikkan / jauhi, sertai). Convert to Pattern 1 (`BM_QUESTIONS['2-5-2-pembentukan-perkataan']`, ≥12 items) for a real mastery gate. **Do not break the AgeGroup-7 standalone `KataImbuhan` usage.** | M5 A9 (upgrade), A10, B6 (5.2), B7 (5.2) | Medium | ✅ |
| ⏳ Pending → **R17** | P2 | **M4 4.1 — add a gated quiz layer to `PantunBacaan`**: (a) add TTS recitation playback per pantun (closes A1 "melafazkan"); (b) add a "apa maksud pantun ini?" production quiz instead of just showing huraian (upgrades A2); (c) add NEW simpulan bahasa (e.g. "ringan tulang" = rajin) and bandingan semacam (e.g. "secantik bidadari") content categories with their own items. Wrap in `BMLessonQuizLayout`, gate at 70%. | M4 A1, A2 (upgrade), A3, A4, B7 (4.1) | High | ✅ |
| ⏳ Pending → **R18** | P2 | **M4 4.2 — add dialog/teater-bercerita activity** to `PersembahanKarya`: a new tier where short dialog lines from a "teater bercerita" scene are read aloud by the child (STT, keyword-slot matching — same engine as T1 R7 Part B). | M4 A6 | Medium | ✅ |
| ⏳ Pending → **R19** | P2 | **M3 3.1 — extend `MenulisMekanis`**: (a) add a tracing/handwriting tier for perkataan/frasa (upgrades A1/A2 ⚠️→✅, mirrors T1 R-precedent of `AsasMenulis`'s `TraceCanvas`); (b) add NEW perenggan-level and ayat-majmuk dictation/spelling items to the bank (closes A3, A4). | M3 A1, A2 (upgrade), A3, A4 | High | ✅ |
| ⏳ Pending → **R20** | P2 | **M3 3.2 — add a guided "karangan pendek" composition activity** to `HasilkanPenulisan`: e.g. a picture-sequence + sentence-bank builder where the child arranges/selects 3-4 sentences (with kata hubung) into a short guided paragraph — a constructive proxy for writing, same philosophy as T1 M3 A3's `BinaAyat`. | M3 A6 | Medium | ✅ |
| ⏳ Pending → **R21** | P2 | **M3 3.3 — add bercapah (critical/inferential) questions** to `JawapanPemahaman`'s bank ("Patutkah Rani...? Mengapa?", "Apa yang akan berlaku jika...?") with MCQ-based reasoning options; closes the A8 gap and brings 3.3 to a balanced bertumpu+bercapah mix. | M3 A8 | Medium | ✅ |
| ⏳ Pending → **R22** | P2 | **Spaced repetition (B2) for all 6 gated T2 topics** (2.1, 3.1, 3.2, 3.3, 4.2, 5.3) — populate `reviewQuestions` (currently `[]` for all 6), e.g. 3.1 reviews 2.1's digraf/diftong items, 5.3 reviews 3.2's kata-hubung items, etc. — same approach as T1 R5. | B2 across M2-M5 | Low | ✅ |
| ⏳ Pending → **R23** | P2 | **Gate the remaining Pattern-2 topics**: 2.2 (`BacaanPemahaman`) and 2.3 (`KosaKataKontekstual`) already have ≥12-item banks with right/wrong scoring — add an internal pass threshold + `topicComplete`/`onNextTopic` call (same as T1 R6's approach), removing them from `App.jsx`'s `ProgressWrapper` list. (1.1/1.2/5.1/5.2 are covered by R12/R13/R15/R16's rebuilds; 4.1 has no scoreable content until R17.) | B7 (2.2, 2.3) | Medium | ✅ |
| 🟡 Partial → **R24** | P3 | **T2 content/doc quality fixes**: (a) ✅ **DONE 2026-06-13** — duplicate-correct-answer-as-distractor bugs: full-bank scan found **21** affected items (not just khas/khabar/baloi/bapa), all fixed; re-scan CLEAN (see Progress log); (b) ⏳ `2-2-2-teks-pelbagai` passage/question wording mismatch ("lumba lari" vs "berlari"); (c) ⏳ `2-3-2-hasilkan-penulisan` quizzes "serta" (item near line 529) which is never taught beforehand — either teach it first or swap the item; (d) ⏳ `BAHASA_MELAYU.md` silibus typo "digraf (ng, ny, kh, **sh**)" → "**sy**" (M2 2.1, doc-only). | C5 across M2/M3; doc accuracy | Low | ✅ |
| ➖ Out of scope | ➖ | Documented: menyanyikan lagu sambil aksi (M4 A5, same as T1 M4 A4 precedent — singing/rhythm capture not feasible digitally). Lyric+TTS exposure already mitigates. Keep wording "Berdasarkan KSSR". | — | — | ❌ |

---

# New Topics / Components Needed (Tahun 2)

The user asked specifically what **new topics/content** must be added for T2 to be "completely perfect". Ranked by how much net-new build work each represents:

1. **M1 1.2 "Bercerita & Berbincang"** (R13) — **entirely new component**. The current `BertuturBertatasusila` reuse covers 0 of 2 required skills. Needs: a **read-aloud** story activity (STT vs known text — _not_ free-form storytelling, per Keputusan Soalan 3) + a guided-discussion/opinion-picker (MCQ) activity. Largest single build in T2.
2. **M5 5.1 "Golongan Kata Lanjutan"** (R15) — **3 new topic nodes** (split per Keputusan Soalan 2): 5.1a Kata Bilangan & Kata Arah · 5.1b Kata Kerja Pasif & Kata Adjektif (4 sub-types) · 5.1c Kata Tugas (Seru/Perintah/Penguat/Nafi). Each its own ≥12-item Pattern-1 bank. Current `KataHubungSendi` reuse covers 0 of 8 categories.
3. **M1 1.1 "Arahan, Pesanan & Permintaan"** (R12) — new multi-step instruction/relay/request activity (extends T1's "Dengar & Buat" pattern with 2-3-part compound instructions), plus bercapah items added to the existing `JawabSoalan` bank.
4. **M2 "Cerpen/Pantun → Mesej & Nilai Murni"** (R14) — new short cerpen/pantun passages with message/value-identification questions, likely as a 2.3 sub-tier alongside `KosaKataKontekstual`.
5. **M4 4.1 "Simpulan Bahasa & Bandingan Semacam"** (R17) — two brand-new content categories, plus a recitation (TTS) tier and a "maksud pantun" production quiz layered onto the existing `PantunBacaan` browse.
6. **M4 4.2 "Dialog Teater Bercerita"** (R18) — new STT dialog/role-play tier appended to `PersembahanKarya`.
7. **M5 5.2 "Imbuhan di- / -an / -kan / -i"** (R16) — new items appended to `KataImbuhan`'s existing bank (8 → ≥12), converted to Pattern 1.
8. **M3 3.2 "Karangan Pendek Berpandu"** (R20) — new guided-composition activity (picture-sequence / sentence-bank builder) appended to `HasilkanPenulisan`.
9. **M3 3.1 "Menulis Perenggan & Ayat Majmuk"** (R19) — new perenggan/ayat-majmuk dictation items + a tracing/handwriting tier for `MenulisMekanis`.
10. **M3 3.3 "Jawapan Bercapah"** (R21) — new bercapah/inferential questions appended to `JawapanPemahaman`'s bank.

---

> **Bottom line for Tahun 2:** T2 sits at **7✅ · 7⚠️ · 24❌ · 1➖ of 39 rows** — far behind T1's 22✅·10⚠️·7❌·2➖ (41 rows). The root cause is structural: **7 of 13 T2 topics (1.1, 1.2, 2.2, 2.3, 4.1, 5.1, 5.2) are Pattern-2 reuses of components built for a different silibus objective** (mostly Tahun-1 AgeGroup-7/8 games), and two of those — **M1 (both topics) and M5 5.1 — are near-total content mismatches** requiring full rebuilds (R12/R13/R15, the three highest-effort items). By contrast, **M2 Membaca is essentially done** (5✅·1❌, only the cerpen/pantun-mesej gap at R14 remains) and **M5 5.3 / M3's three topics already have solid ≥12-item gated banks** — they need *additional* content tiers (R16, R19-R21), not rebuilds. Recommended build order: **R15 (M5 5.1) and R13 (M1 1.2) are the two highest-priority/highest-effort items** since they're complete mismatches affecting an entire module each; R12/R14/R16 are medium-effort closes; R17-R21 round out M3/M4; R22-R24 are cross-cutting polish (spaced repetition, gating, content-quality bugs) that mirror T1's R5/R6/R9.
