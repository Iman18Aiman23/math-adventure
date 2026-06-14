# 🛠️ Build Spec — Split Topik 1.1 → 1.1a + 1.1b + 1.1c (BM Tahun 2)

> **Audience:** an agent/developer with **no prior context**. Read the whole file first.
> **Goal:** rebuild T2 topic 1.1 ("Mendengar, Memahami & Merespons") as **3 separate topics**, each ≥12 items + 70% gate:
> - **1.1a Merespons Soalan** — answer questions aloud (**custom STT**): bertumpu (graded) + bercapah (opinion).
> - **1.1b Melaksanakan Arahan** — **Pattern-1 MCQ**: a multi-step instruction plays as audio; MCQ tests comprehension.
> - **1.1c Pesanan & Permintaan** — **Pattern-1 MCQ**: a multi-info message/request plays as audio; MCQ tests the details.
> **ONE task, three topics.** **Source of truth:** [`T2_COVERAGE_REPORT.md`](./T2_COVERAGE_REPORT.md) — M1 split decision (2026-06-14). Superseded combined draft: `BUILD_SPEC_R12_1.1.md` (content reference only).

---

## 0. Why this shape

Syllabus 1.1: respond to **bertumpu** + **bercapah** questions; **melaksanakan arahan/pesanan/permintaan** with **several pieces of info**.
- **1.1a** = the "merespons" skill → genuine spoken response (STT). Bertumpu graded by keyword; bercapah = any opinion (≥2 words) — no "wrong" opinion (project STT philosophy).
- **1.1b / 1.1c** = "melaksanakan ... beberapa maklumat." We can't verify a child physically performed an action, so the honest digital substitute is **comprehension of the multi-info instruction**: the instruction plays as TTS audio, then an MCQ checks whether the child caught the key detail/step/order. This is gradeable (gives the 70% gate real teeth) and consistent with the "Berdasarkan KSSR" honesty rule.

---

## 1. IDs, files, naming

| | 1.1a Merespons Soalan | 1.1b Melaksanakan Arahan | 1.1c Pesanan & Permintaan |
|---|---|---|---|
| `TOPIC_ID` | `2-1-1a-merespons-soalan` | `2-1-1b-arahan` | `2-1-1c-pesanan-permintaan` |
| num / label | `1.1a` / `Merespons Soalan` | `1.1b` / `Melaksanakan Arahan` | `1.1c` / `Pesanan & Permintaan` |
| File | `Tahun2/Module1_Mendengar/MeresponsSoalan.jsx` | `…/MelaksanakanArahan.jsx` | `…/PesananPermintaan.jsx` |
| Export / lazy var | `MeresponsSoalan` | `MelaksanakanArahan` | `PesananPermintaan` |
| Pattern | **Custom STT** (copy `Bercerita.jsx`) | **Pattern-1 MCQ** (copy `Berbincang.jsx`) | **Pattern-1 MCQ** (copy `Berbincang.jsx`) |
| Items / gate | ~13 Q&A / 70% | 12 MCQ / 70% | 12 MCQ / 70% |
| Accent | `#FF9600` (orange) | `#E8821A` (M1 orange) | `#E8821A` |

**Migration:** in `ModuleData.js`, replace the single `2-1-1-mendengar-merespons` M1 node with the three new nodes (see §5). In `App.jsx`, remove the old `2-1-1-mendengar-merespons` `<ProgressWrapper>` route and add 3 Pattern-1 routes. **Leave `MendengarMerespons.jsx` (the file) + the AG7 `jawab-soalan` standalone untouched** (same dual-use trap as before).

---

## 2. Topic 1.1a — Merespons Soalan (custom STT)

**Build:** copy [`Bercerita.jsx`](../Tahun2/Module1_Mendengar/Bercerita.jsx) → `MeresponsSoalan.jsx`. Bercerita already has the correct **`completedRef`-guarded completion**, self-report fallback, HUD, lenient helpers — keep all of that. Change the item model from "stories of sentences" to a **flat list of questions**, and **auto-speak the question** (the child answers, not reads).

Changes:
1. `const TOPIC_ID = '2-1-1a-merespons-soalan';`
2. Replace `STORIES` with `QUESTIONS` (flat, see content below). `TOTAL_ITEMS = QUESTIONS.length;` (13). Drop the story/sentence nesting — track a single `idx`; `currentItemNum = idx`.
3. **Ask the question aloud:** when a new item appears, `SpeechManager.speak(question,'ms')` then go to `T1_READY` (mirror the `PHASE_SPEAKING` auto-ask in [`MendengarMerespons.jsx`](../Tahun2/Module1_Mendengar/MendengarMerespons.jsx) lines ~291-300). Show the question text on the card too.
4. **Grade by type:**
   - `type:'bertumpu'` → `checkMatch(transcript, item.accept)` (reuse `checkMatch`/`grammarFor` from `MendengarMerespons.jsx`). On the 3rd failed attempt, reveal + TTS the `answer`.
   - `type:'bercapah'` → pass if `wordCount(transcript) >= 2` (any opinion). Never hard-fail; on too-short/no-speech, gently re-prompt. No `answer`/`accept`.
   ```js
   const wordCount = (t) => normalize(t).split(' ').filter(Boolean).length;
   const passed = item.type === 'bercapah' ? wordCount(transcript) >= 2 : checkMatch(transcript, item);
   ```
5. Self-report fallback ("✅ Saya dah jawab") on `permanentFallback`/perm/net — same as Bercerita. Keep the `completedRef` `useEffect`: `completeTopic(score, TOTAL_ITEMS, 70)` + `topicComplete?.(...)`. ⚠️ Never call completion in render.
6. `topicTitle` = `'Merespons Soalan'` / `'Answer the Question'`. Card label uses `item.type` ("Soalan" badge optional).

**Content — `QUESTIONS` (9 bertumpu graded + 4 bercapah open = 13):**
```js
const QUESTIONS = [
  { id: 'q1', emoji: '☁️', type: 'bertumpu', question: 'Apakah warna langit?', answer: 'Biru', accept: ['biru','blue'] },
  { id: 'q2', emoji: '🌱', type: 'bertumpu', question: 'Apakah warna rumput?', answer: 'Hijau', accept: ['hijau','green'] },
  { id: 'q3', emoji: '🐱', type: 'bertumpu', question: 'Berapa kaki seekor kucing?', answer: 'Empat', accept: ['empat','4','four'] },
  { id: 'q4', emoji: '🍌', type: 'bertumpu', question: 'Apakah warna pisang yang masak?', answer: 'Kuning', accept: ['kuning','yellow'] },
  { id: 'q5', emoji: '🐔', type: 'bertumpu', question: 'Haiwan apakah yang berkokok pada waktu pagi?', answer: 'Ayam', accept: ['ayam','ayam jantan','rooster','chicken'] },
  { id: 'q6', emoji: '📅', type: 'bertumpu', question: 'Berapa hari dalam seminggu?', answer: 'Tujuh', accept: ['tujuh','7','seven'] },
  { id: 'q7', emoji: '🍎', type: 'bertumpu', question: 'Apakah warna epal yang merah?', answer: 'Merah', accept: ['merah','red'] },
  { id: 'q8', emoji: '🐟', type: 'bertumpu', question: 'Di manakah ikan hidup?', answer: 'Di dalam air', accept: ['air','dalam air','laut','kolam','sungai','water'] },
  { id: 'q9', emoji: '👀', type: 'bertumpu', question: 'Apakah yang kita guna untuk melihat?', answer: 'Mata', accept: ['mata','eyes','eye'] },
  { id: 'q10', emoji: '🤔', type: 'bercapah', question: 'Pada pendapat kamu, apakah haiwan yang paling comel? Mengapa?' },
  { id: 'q11', emoji: '💭', type: 'bercapah', question: 'Mengapa kita perlu rajin belajar di sekolah?' },
  { id: 'q12', emoji: '🍽️', type: 'bercapah', question: 'Apakah makanan kegemaran kamu?' },
  { id: 'q13', emoji: '🎈', type: 'bercapah', question: 'Apakah yang kamu suka buat pada hujung minggu?' },
];
```
> 9 bertumpu (real grading) give the gate teeth; bercapah always pass. Even auto-passing all 4 bercapah, a child must get ~5/9 bertumpu to reach 70%.

---

## 3. Topic 1.1b — Melaksanakan Arahan (Pattern-1 MCQ)

**Build:** copy [`Berbincang.jsx`](../Tahun2/Module1_Mendengar/Berbincang.jsx) → `MelaksanakanArahan.jsx`. Change `TOPIC_ID`, learn cards, names, heading/title. Point at the bank below. `useBMQuiz(currentQs, [], 10)`.

The instruction plays via **`audioText`** (BMLessonQuizLayout auto-plays it + shows a "Dengar Semula" replay button); the MCQ `question` asks about it.

**Learn page (2 cards):**
```js
const CATEGORIES = [
  { title: 'Dengar Arahan dengan Teliti', desc: 'Arahan ada beberapa langkah. Dengar semuanya dahulu.',
    example: '"Ambil pensel, lukis bulatan, warnakan kuning." → 3 langkah', usage: 'Ingat langkah PERTAMA hingga TERAKHIR.' },
  { title: 'Ikut Susunan', desc: 'Buat mengikut urutan yang betul, satu demi satu.',
    example: 'Langkah 1 → Langkah 2 → Langkah 3', usage: 'Tanya: "Apa dulu? Apa kemudian?"' },
];
```

**Bank — paste into `BM_QUESTIONS` in [`_shared/ModuleData.js`](../_shared/ModuleData.js) (M1 area):**
```js
  // ── T2 M1 T1.1b: Melaksanakan Arahan (dengar arahan berbilang langkah → faham) ──
  '2-1-1b-arahan': [
    { audioText: 'Ambil pensel merah, lukis sebuah bulatan, kemudian warnakan ia kuning.', question: 'Apakah langkah PERTAMA?', answer: 'Ambil pensel merah', options: ['Ambil pensel merah', 'Lukis bulatan', 'Warnakan kuning', 'Padam bulatan'] },
    { audioText: 'Buka buku, cari muka surat lima, dan baca ayat pertama.', question: 'Muka surat yang mana perlu dicari?', answer: 'Lima', options: ['Lima', 'Tiga', 'Sepuluh', 'Lapan'] },
    { audioText: 'Berdiri, pusing ke kiri, kemudian duduk semula.', question: 'Pusing ke arah mana?', answer: 'Kiri', options: ['Kiri', 'Kanan', 'Belakang', 'Hadapan'] },
    { audioText: 'Ambil buku biru, letak di atas meja, dan tutup pintu.', question: 'Apakah langkah TERAKHIR?', answer: 'Tutup pintu', options: ['Tutup pintu', 'Ambil buku biru', 'Buka tingkap', 'Letak di lantai'] },
    { audioText: 'Susun kerusi, kutip sampah, dan padamkan papan tulis.', question: 'Berapa tugas yang diberi?', answer: 'Tiga', options: ['Tiga', 'Dua', 'Empat', 'Satu'] },
    { audioText: 'Ambil bakul, masukkan tiga biji epal, dan bawa ke dapur.', question: 'Berapa biji epal perlu dimasukkan?', answer: 'Tiga', options: ['Tiga', 'Dua', 'Lima', 'Empat'] },
    { audioText: 'Pakai kasut, ambil beg, dan tunggu di pintu.', question: 'Di mana perlu tunggu?', answer: 'Di pintu', options: ['Di pintu', 'Di dapur', 'Di bilik', 'Di taman'] },
    { audioText: 'Lukis matahari, warnakan ia kuning, kemudian lukis awan.', question: 'Apakah warna matahari?', answer: 'Kuning', options: ['Kuning', 'Biru', 'Merah', 'Hijau'] },
    { audioText: 'Ambil air, siram pokok bunga, dan simpan baldi.', question: 'Apa yang perlu disiram?', answer: 'Pokok bunga', options: ['Pokok bunga', 'Lantai', 'Kereta', 'Baju'] },
    { audioText: 'Lipat baju, masukkan ke dalam almari, dan kemas katil.', question: 'Apakah langkah PERTAMA?', answer: 'Lipat baju', options: ['Lipat baju', 'Kemas katil', 'Basuh baju', 'Sapu lantai'] },
    { audioText: 'Basuh tangan, lap hingga kering, kemudian mula makan.', question: 'Apa dibuat sebelum makan?', answer: 'Lap tangan kering', options: ['Lap tangan kering', 'Tidur', 'Bermain', 'Menyanyi'] },
    { audioText: 'Buka tingkap, sapu lantai, dan buang sampah ke tong.', question: 'Ke mana sampah dibuang?', answer: 'Ke tong sampah', options: ['Ke tong sampah', 'Ke luar tingkap', 'Ke meja', 'Ke beg'] },
  ],
```

---

## 4. Topic 1.1c — Pesanan & Permintaan (Pattern-1 MCQ)

**Build:** copy `Berbincang.jsx` → `PesananPermintaan.jsx` (same pattern as 1.1b). The message/request plays via `audioText`; the MCQ tests the key info (when/where/what/why).

**Learn page (2 cards):**
```js
const CATEGORIES = [
  { title: 'Pesanan', desc: 'Mesej untuk disampaikan kepada orang lain — ingat butirannya (siapa, apa, bila, di mana).',
    example: '"Beritahu emak: kelas tambahan Sabtu pukul lapan." → bila? Sabtu pukul lapan', usage: 'Tangkap maklumat penting.' },
  { title: 'Permintaan', desc: 'Meminta sesuatu atau bantuan dengan sopan — ingat apa yang diminta.',
    example: '"Minta tolong ambil beg biru di atas meja." → apa? beg biru', usage: 'Dengar butiran permintaan.' },
];
```

**Bank — paste into `BM_QUESTIONS`:**
```js
  // ── T2 M1 T1.1c: Pesanan & Permintaan (dengar mesej/permintaan berbilang maklumat) ──
  '2-1-1c-pesanan-permintaan': [
    { audioText: 'Sampaikan kepada emak: kelas tambahan pada hari Sabtu pukul lapan pagi.', question: 'Bila kelas tambahan diadakan?', answer: 'Sabtu pukul lapan pagi', options: ['Sabtu pukul lapan pagi', 'Ahad pukul lapan pagi', 'Sabtu pukul dua petang', 'Isnin pagi'] },
    { audioText: 'Beritahu abang: jemput adik di tadika pada pukul satu petang.', question: 'Pukul berapa adik dijemput?', answer: 'Satu petang', options: ['Satu petang', 'Dua petang', 'Satu pagi', 'Tiga petang'] },
    { audioText: 'Minta tolong kawan ambil beg biru di atas meja.', question: 'Apakah warna beg yang diminta?', answer: 'Biru', options: ['Biru', 'Merah', 'Hijau', 'Kuning'] },
    { audioText: 'Beritahu cikgu: Ali sakit dan tidak dapat hadir hari ini.', question: 'Mengapa Ali tidak hadir?', answer: 'Ali sakit', options: ['Ali sakit', 'Ali malas', 'Ali bercuti', 'Ali lewat'] },
    { audioText: 'Sampaikan kepada ayah: mesyuarat diadakan di sekolah pukul lima petang.', question: 'Di mana mesyuarat diadakan?', answer: 'Di sekolah', options: ['Di sekolah', 'Di rumah', 'Di pejabat', 'Di kedai'] },
    { audioText: 'Minta kebenaran cikgu untuk ke tandas dan ambil air.', question: 'Apa diminta selepas ke tandas?', answer: 'Ambil air', options: ['Ambil air', 'Makan', 'Balik rumah', 'Tidur'] },
    { audioText: 'Beritahu nenek: kami akan datang melawat pada hari Ahad.', question: 'Bila kami akan melawat?', answer: 'Hari Ahad', options: ['Hari Ahad', 'Hari Sabtu', 'Hari Isnin', 'Hari Jumaat'] },
    { audioText: 'Sampaikan kepada kakak: tolong beli roti dan susu di kedai.', question: 'Apa yang perlu dibeli?', answer: 'Roti dan susu', options: ['Roti dan susu', 'Nasi dan ayam', 'Buah dan air', 'Gula dan garam'] },
    { audioText: 'Minta tolong abang baiki basikal merah di garaj.', question: 'Di mana basikal itu?', answer: 'Di garaj', options: ['Di garaj', 'Di bilik', 'Di dapur', 'Di taman'] },
    { audioText: 'Beritahu kawan: perjumpaan kelab pada hari Khamis di dewan.', question: 'Di mana perjumpaan kelab?', answer: 'Di dewan', options: ['Di dewan', 'Di padang', 'Di kelas', 'Di kantin'] },
    { audioText: 'Sampaikan kepada emak: cikgu minta bayaran buku esok.', question: 'Bila bayaran buku diperlukan?', answer: 'Esok', options: ['Esok', 'Hari ini', 'Minggu depan', 'Lusa'] },
    { audioText: 'Minta tolong kawan pinjamkan pemadam dan pembaris.', question: 'Apa yang diminta untuk dipinjam?', answer: 'Pemadam dan pembaris', options: ['Pemadam dan pembaris', 'Pensel dan buku', 'Gunting dan gam', 'Warna dan kertas'] },
  ],
```

---

## 5. Wiring

### ModuleData.js — M1 T2 node list (~lines 126-128)
Replace the single `2-1-1-mendengar-merespons` node with three (keep the 1.2a/1.2b nodes after them):
```js
      { id: '2-1-1a-merespons-soalan',     num: '1.1a', label: 'Merespons Soalan',      icon: M2_M1T1, disabled: false },
      { id: '2-1-1b-arahan',               num: '1.1b', label: 'Melaksanakan Arahan',    icon: M2_M1T1, disabled: false },
      { id: '2-1-1c-pesanan-permintaan',   num: '1.1c', label: 'Pesanan & Permintaan',   icon: M2_M1T1, disabled: false },
```

### App.jsx
- Lazy imports:
```js
const MeresponsSoalan = React.lazy(() => import('./components/BahasaMelayuPage/Tahun2/Module1_Mendengar/MeresponsSoalan'));
const MelaksanakanArahan = React.lazy(() => import('./components/BahasaMelayuPage/Tahun2/Module1_Mendengar/MelaksanakanArahan'));
const PesananPermintaan = React.lazy(() => import('./components/BahasaMelayuPage/Tahun2/Module1_Mendengar/PesananPermintaan'));
```
- Replace the old `2-1-1-mendengar-merespons` route block with three Pattern-1 routes (no `ProgressWrapper`, each passes `topicComplete`/`onNextTopic`):
```jsx
          if (bmTopic === '2-1-1a-merespons-soalan')
            return <Suspense fallback={<LoadingSpinner />}>
              <MeresponsSoalan onBack={topicOnBack} language={language}
                topicComplete={(id) => markTopicCompleted(id)} onNextTopic={bmNextTopic} key={bmTopic} />
            </Suspense>;
          if (bmTopic === '2-1-1b-arahan')
            return <Suspense fallback={<LoadingSpinner />}>
              <MelaksanakanArahan onBack={topicOnBack} language={language}
                topicComplete={(id) => markTopicCompleted(id)} onNextTopic={bmNextTopic} key={bmTopic} />
            </Suspense>;
          if (bmTopic === '2-1-1c-pesanan-permintaan')
            return <Suspense fallback={<LoadingSpinner />}>
              <PesananPermintaan onBack={topicOnBack} language={language}
                topicComplete={(id) => markTopicCompleted(id)} onNextTopic={bmNextTopic} key={bmTopic} />
            </Suspense>;
```
- **Leave** the `JawabSoalan` import + AG7 `jawab-soalan` standalone route untouched. Remove only the old `2-1-1-mendengar-merespons` route.

---

## 6. Definition of Done

- [ ] 3 new components exist; `MendengarMerespons.jsx` + AG7 standalone untouched; old `2-1-1-mendengar-merespons` node + route removed; 3 new nodes added.
- [ ] **1.1a:** custom STT; question auto-spoken; ~13 items (9 bertumpu graded + 4 bercapah ≥2-words); self-report fallback; `completedRef`-guarded `completeTopic(score, 13, 70)` (NOT in render); ❤️/💎/⭐ HUD.
- [ ] **1.1b & 1.1c:** Pattern-1 `BMLessonQuizLayout`; each bank **12 items**, options duplicate-free, `answer` ∈ options; `audioText` set so the instruction auto-plays + replay works; learn page (2 cards); 70% gate.
- [ ] `npm run build` green; no console errors (no "Cannot update a component while rendering").

### Verify (manual)
`run-math-adventure` / `npm run dev` → BM → Tahun 2 → Modul 1. **1.1a**: answer bertumpu (try a wrong one), say any opinion for bercapah, test mic-denied self-report. **1.1b/1.1c**: listen to the audio instruction, answer the MCQ, confirm replay + 70% gate. Confirm AG7 "Jawab Soalan" standalone still works. **No Python tests.**

---

## 7. Out of scope
- The AG7 standalones + `MendengarMerespons.jsx` / `BerceritaBerbincang.jsx` files.
- `reviewQuestions` / spaced repetition (R22).

## 8. After you finish — STOP at "pending verification"
1. In [`T2_COVERAGE_REPORT.md`](./T2_COVERAGE_REPORT.md), set the **1.1a, 1.1b, 1.1c** rows to **🔍 Pending verification** (NOT ✅), and update the "M1 split" counter.
2. Add a slice-log handoff note: files changed/created, summary, how tested (incl. 1.1a mic-denied path + a failed bertumpu answer).
3. Commit on `main`.
4. **Do not self-mark ✅** — owner verifies first. If gaps found, fix and return to 🔍.
