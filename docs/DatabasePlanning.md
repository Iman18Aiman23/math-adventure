# Database Planning — Math Adventure

> **Purpose:** A database implementation plan grounded in the current React pages and their existing local-storage data.
> **Recommended platform:** Supabase Auth + PostgreSQL + Supabase Storage.
> **Status:** Planning only. The current app still uses local storage and sample leaderboard data; this document does not imply that remote persistence is already implemented.

## 1. Goals and scope

The database must give each signed-in learner one consistent source of truth for identity, profile, learning progress, rewards, achievements, assessment attempts, and leaderboard data. A learner's progress must be available to Home, Reading, Speaking, Mathematics, Profile, Achievement, and Leaderboard without maintaining separate copies for each screen.

### In scope for the first database release

- Email/password registration and login, Google login, Facebook login, sign-out, and account recovery through Supabase Auth.
- A learner profile and private profile preferences.
- Per-topic progress and per-attempt learning history across all subjects.
- XP, level, daily streak, hearts, gems, and stars.
- Profile activity charts, subject progress, recent sessions, and achievement summaries.
- Achievement definitions and per-user unlocks.
- Assessment catalog and individual learner attempts.
- Opt-in, privacy-preserving subject leaderboards.
- One-time migration of a guest's local progress after the guest explicitly registers or logs in.

### Not in the first release

Subscriptions, payments, invoices, in-app notifications, daily reward calendars, and administrative login-audit screens are not used by the pages reviewed. Do not create or expose these tables until the corresponding product feature and authorization rules are designed. A parent/child relationship is optional future work; the current Profile dashboard reads the active learner's own data and does not establish a parent account or consent relationship.

## 2. What the current pages actually do

| Page / component | Current behavior | Database requirement |
|---|---|---|
| `WelcomeModal` | Email/password, Google, and Facebook controls are present but disabled. The working flow is a local guest name. Guest progress is described as device-only. | Use Supabase Auth for email/password and Google/Facebook. Keep guest mode local until account conversion; then import the guest's data once, after explicit user action. Never use the local generated ID as an authenticated database identity. |
| `HomePage` | Shows subject and age-group cards. It has no subject progress bars or per-subject learning status yet. | Use shared topic-progress data to power future subject summaries. Do not create a second homepage-specific progress store. Subject access/locked state is currently controlled by frontend access helpers and should not be treated as database authorization. |
| `ReadingPage` | Has six menu choices (KV, KVK, words, sentences, reading challenge, short story). The challenge has 15 levels. The challenge completion state currently comes from `useGameState('reading-challenge')`; the page also reads gamification progress for its continue-course CTA. | Save each completed lesson/level under a stable `reading` topic key; record attempts, best score where available, completion time, and XP in shared learning tables. |
| `BMPage` / `BMSpeakGame` | Has five speaking categories: `bm_kv`, `bm_kvk`, `en_long_vowels`, `numbers`, `common_objects`. A correct speech item updates in-memory round streak and calls `gameState.addWin(10)`; the viewed flow does not persist per-category completion or attempt history. | Record a speaking session by category and its outcome. Store no raw microphone audio or transcript by default. |
| `MathHome` | Has four sub-games: `operations`, `faq`, `datetime`, `journey`. The Math Journey stores completed level/unit state in `mathJourneyProgress`; stars/gems are also updated through legacy `gameData`. | Store topic attempts in the shared tables and Math Journey's level/unit completion in a small dedicated progress table. Merge its rewards into the same canonical wallet. |
| `LeaderboardHome` | The subject selector offers Reading, Mathematics, and Jawi, but rows are hard-coded demo players. The signed-in/local player's overall star total comes from `gameData`; displayed sample rank is not a real rank. | Replace demo rows with a privacy-filtered server query/RPC. Rank per selected subject using database-backed results only. Clearly separate or remove sample data in production. |
| `AchievementHome` | Badge definitions are hard-coded in `BADGE_CONFIG`; badge progress is read from local game data / `useGamification`. Assessments are from static `baseAssessments`; `status` there is catalog/demo data, not a learner's attempt. Certificate PNG/PDF files are generated in the browser. | Seed stable achievement and assessment definitions. Store learner achievement unlocks and assessment attempts separately. Calculate progress from trusted learner records; generate certificate files from a recorded award/attempt, without requiring a certificate file table initially. |
| `ProfileHome` | Reads `exportAll(getUserId())`, which currently returns local gamification data. Profile name/email/avatar are separately stored under `iman-profile:<playerName>`; the avatar is a base64 data URL. Activity and subject percentages are derived from topic progress and daily logs. Study time currently displays “not recorded.” | Use shared progress, daily activity, sessions, and achievement data. Store profile fields in a user profile row, upload avatar files to Storage, and record session duration so study time can be calculated. |

### Current local data that the migration must account for

| Existing source | Current data | Planned destination |
|---|---|---|
| `math-adventure-v2` (`LocalGamificationRepo`) | XP, coins (used as gems), level, hearts, streak, subject/topic progress, daily XP logs | `learner_stats`, `learner_wallets`, `learner_streaks`, `topic_progress`, `daily_activity`, and imported `learning_sessions` where session detail exists |
| `gameData` (`gameStatsManager`) | Hearts, gems, stars, streak | `learner_wallets` and `learner_streaks`; reconcile with the newer gamification values rather than adding duplicate balances |
| `mathAdventureData` (`storageService`) | Player name and legacy per-game XP/coins/unlocks | `profiles`, subject/topic progress, and a one-time migration record |
| `mathJourneyProgress` | Completed levels/units, best scores, stars, diamonds | `math_journey_progress`, `learning_sessions`, and wallet ledger entries only when the source record can be safely reconciled |
| `iman-profile:<playerName>` | Display-name override, optional email, base64 avatar | `profiles`; upload avatar bytes to a private/user-scoped Storage path and save the resulting path, not the data URL |
| `useGameState('reading-challenge')` | Unlock identifiers such as `reading-complete-<level>` | `topic_progress` for stable reading level topic IDs |

`getUserId()` currently creates a local UUID and the local gamification repository does not isolate its single local-storage document by `userId`. These IDs are useful for local guest storage only. Once Auth is enabled, every database `user_id` must be the Supabase Auth UUID from the verified session (`auth.uid()`); never accept a client-supplied ID as proof of identity.

## 3. Data model

### Relationship overview

```text
auth.users
  ├── profiles (one-to-one)
  ├── legacy_imports (one row per source/version)
  ├── learner_stats (one-to-one)
  ├── learner_wallets (one-to-one)
  ├── learner_streaks (one-to-one)
  ├── topic_progress (one per learner + subject + topic)
  ├── learning_sessions (many)
  │     └── optional session details (not raw answers by default)
  ├── daily_activity (one per learner + local activity date)
  ├── math_journey_progress (one per learner + journey level)
  ├── user_achievements (many)
  └── assessment_attempts (many)

learning_topics ── topic_progress
achievement_definitions ── user_achievements
assessment_definitions ── assessment_attempts
profiles (optional guardian) ── guardian_learner_links ── profiles (learner)
```

### Identity and login

Supabase Auth is the identity store. Do not duplicate its password hashes, OAuth provider IDs, refresh/access tokens, or auth sessions in application tables.

- Email registration creates a Supabase Auth user and requires email verification according to the Auth configuration.
- Email login, password reset, and account recovery use Supabase Auth APIs.
- Google and Facebook use Supabase's OAuth provider configuration and redirect/callback flow.
- After successful authentication, create the `profiles`, `learner_stats`, `learner_wallets`, and `learner_streaks` rows in a trusted database trigger or idempotent server-side function.
- Keep provider credentials and service-role keys out of browser code. Do not store provider tokens in `profiles`.
- Guest mode remains local-only in the initial release. Convert guest data only after the learner intentionally links it to an authenticated account. If online anonymous accounts are later needed, use Supabase anonymous Auth rather than the app-generated local UUID.

### Application tables

#### `profiles`

One row per authenticated account. `id` is the same UUID as `auth.users.id`.

Fields:

- `id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE`
- `display_name TEXT NOT NULL` — learner-selected name; bounded length.
- `avatar_path TEXT NULL` — Supabase Storage object path, never a base64 image.
- `language TEXT NOT NULL DEFAULT 'bm' CHECK (language IN ('bm','en'))`
- `leaderboard_opt_in BOOLEAN NOT NULL DEFAULT FALSE`
- `leaderboard_name TEXT NULL` — optional public alias; do not expose email.
- `created_at`, `updated_at TIMESTAMPTZ NOT NULL`

The UI currently edits a display name and optional email. Email identity belongs to `auth.users`; do not treat a free-form profile email as verified or allow changing the Auth email by updating this row. Use Supabase's verified email-change flow.

#### `legacy_imports`

One record per user/source/version makes guest migration retry-safe and auditable without importing or rewarding the same local data repeatedly.

- `user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE`
- `source_key TEXT NOT NULL` — e.g. `math-adventure-v2`, `gameData`, `mathAdventureData`, `mathJourneyProgress`
- `source_version TEXT NOT NULL`
- `status TEXT NOT NULL CHECK (status IN ('in_progress','completed','partial','failed'))`
- `started_at TIMESTAMPTZ NOT NULL DEFAULT now()`, `completed_at TIMESTAMPTZ NULL`
- `result_summary JSONB NULL` — counts/warnings only; never credentials or tokens
- Primary key: `(user_id, source_key, source_version)`

Retry failed/partial imports using the same key and an idempotent merge. Keep import reconciliation separate from new reward events.

#### `learning_topics`

Content manifest used for stable topic identity, display order, and progress denominators. Seed from the current subject menus/curriculum; do not store question answers here.

- `subject_code TEXT NOT NULL`
- `topic_id TEXT NOT NULL`
- `title_bm TEXT NOT NULL`, `title_en TEXT NOT NULL`
- `sort_order INT NOT NULL DEFAULT 0`
- `is_active BOOLEAN NOT NULL DEFAULT TRUE`
- `created_at`, `updated_at TIMESTAMPTZ NOT NULL`
- Primary key: `(subject_code, topic_id)`

Use stable codes. Examples: `reading` with topics for `kv`, `kvk`, `words`, `sentences`, `reading-challenge`, `short-story`, and `reading-level-01` through `reading-level-15`; `speaking` with the five category IDs listed above; `math` with `operations`, `faq`, `datetime`, and `journey`. Add current KSSR/Islamic/Jawi curriculum IDs from their content manifests as those pages are connected. Do not use translated titles as keys.

#### `topic_progress`

Current best-known state for a learner/topic. This is the canonical source for Home subject progress, reading continue-course state, and Profile subject percentages.

- `user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE`
- `subject_code TEXT NOT NULL`, `topic_id TEXT NOT NULL`
- `crown_level SMALLINT NOT NULL DEFAULT 0 CHECK (crown_level BETWEEN 0 AND 5)`
- `attempts INT NOT NULL DEFAULT 0 CHECK (attempts >= 0)`
- `best_score INT NOT NULL DEFAULT 0 CHECK (best_score >= 0)`
- `best_total INT NOT NULL DEFAULT 0 CHECK (best_total >= 0)`
- `xp_earned INT NOT NULL DEFAULT 0 CHECK (xp_earned >= 0)`
- `last_practiced_at TIMESTAMPTZ NULL`
- `first_completed_at TIMESTAMPTZ NULL`
- `updated_at TIMESTAMPTZ NOT NULL DEFAULT now()`
- Primary key: `(user_id, subject_code, topic_id)`
- Foreign key: `(subject_code, topic_id) REFERENCES learning_topics(subject_code, topic_id)`
- Constraint: `best_score <= best_total` when `best_total > 0`

Only set `first_completed_at` when the completion condition is met. For non-scored speaking activities, completion is represented by a completed session and progress state; do not fabricate a score.

#### `learning_sessions`

Append-only record of an attempt/run. Supports Profile's recent sessions and daily activity and Leaderboard's completion/time metrics.

- `id UUID PRIMARY KEY DEFAULT gen_random_uuid()`
- `user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE`
- `subject_code TEXT NOT NULL`, `topic_id TEXT NOT NULL`
- `source TEXT NOT NULL CHECK (source IN ('quiz','game','reading','speaking','journey','practice'))`
- `status TEXT NOT NULL CHECK (status IN ('in_progress','completed','abandoned'))`
- `started_at TIMESTAMPTZ NOT NULL DEFAULT now()`, `completed_at TIMESTAMPTZ NULL`
- `duration_seconds INT NULL CHECK (duration_seconds >= 0)`
- `score INT NULL CHECK (score >= 0)`, `total_questions INT NULL CHECK (total_questions >= 0)`
- `xp_earned INT NOT NULL DEFAULT 0 CHECK (xp_earned >= 0)`
- `gems_earned INT NOT NULL DEFAULT 0 CHECK (gems_earned >= 0)`
- `stars_earned INT NOT NULL DEFAULT 0 CHECK (stars_earned >= 0)`
- `idempotency_key UUID NOT NULL` — generated once per attempt to prevent duplicate completion/rewards on retry
- `created_at TIMESTAMPTZ NOT NULL DEFAULT now()`
- Unique: `(user_id, idempotency_key)`

Do not persist question text, expected answers, voice recordings, or raw speech transcripts for the Profile/Leaderboard use cases. If item-level learning analytics are later required, define a separate access-restricted table with a retention policy and collect only the minimum fields needed.

#### `learner_stats`

One row per learner for values needed frequently by the UI.

- `user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE`
- `total_xp BIGINT NOT NULL DEFAULT 0 CHECK (total_xp >= 0)`
- `level SMALLINT NOT NULL DEFAULT 1 CHECK (level BETWEEN 1 AND 10)`
- `total_correct BIGINT NOT NULL DEFAULT 0 CHECK (total_correct >= 0)`
- `total_attempted BIGINT NOT NULL DEFAULT 0 CHECK (total_attempted >= total_correct)`
- `updated_at TIMESTAMPTZ NOT NULL DEFAULT now()`

The current XP thresholds are defined in `gamificationConstants.js` (levels 1–10). Keep the threshold table/rule in one trusted server-side implementation, not separate UI formulas. If total XP can be rebuilt from immutable session events, treat this row as a transactional aggregate/cache and reconcile it from those events.

#### `learner_streaks`

One row per learner. The current gamification hook implements a **daily learning streak**, not a wrong-answer streak.

- `user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE`
- `current_days INT NOT NULL DEFAULT 0 CHECK (current_days >= 0)`
- `highest_days INT NOT NULL DEFAULT 0 CHECK (highest_days >= current_days)`
- `last_active_date DATE NULL`
- `freezes_available INT NOT NULL DEFAULT 0 CHECK (freezes_available >= 0)`
- `daily_goal_xp INT NOT NULL DEFAULT 50 CHECK (daily_goal_xp >= 0)`
- `updated_at TIMESTAMPTZ NOT NULL DEFAULT now()`

Advance the streak at most once per learner-local calendar day on qualifying learning activity. Wrong answers reset the current in-game answer streak/heart state only; they must not reset the daily learning streak.

#### `learner_wallets` and `wallet_transactions`

One canonical balance row. The UI currently has overlapping legacy balances (`coins`/gems, `gameData` stars/hearts, and gamification hearts); normalize these rather than keeping independent balances.

`learner_wallets`:

- `user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE`
- `gems INT NOT NULL DEFAULT 0 CHECK (gems >= 0)`
- `stars INT NOT NULL DEFAULT 0 CHECK (stars >= 0)`
- `hearts SMALLINT NOT NULL DEFAULT 5 CHECK (hearts >= 0)`
- `max_hearts SMALLINT NOT NULL DEFAULT 5 CHECK (max_hearts >= hearts)`
- `hearts_updated_at TIMESTAMPTZ NOT NULL DEFAULT now()`
- `updated_at TIMESTAMPTZ NOT NULL DEFAULT now()`

`wallet_transactions`:

- `id UUID PRIMARY KEY DEFAULT gen_random_uuid()`
- `user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE`
- `currency TEXT NOT NULL CHECK (currency IN ('gems','stars','hearts'))`
- `amount INT NOT NULL CHECK (amount <> 0)` — signed delta
- `balance_after INT NOT NULL CHECK (balance_after >= 0)`
- `source TEXT NOT NULL` — e.g. `correct_answer`, `math_journey`, `heart_refill`, `purchase`
- `learning_session_id UUID NULL REFERENCES learning_sessions(id) ON DELETE SET NULL`
- `idempotency_key UUID NOT NULL`
- `created_at TIMESTAMPTZ NOT NULL DEFAULT now()`
- Unique: `(user_id, idempotency_key)`

Only trusted database functions/server code may award or spend currency. Browser-side writes to balances are not authoritative. Current heart regeneration is 1 heart per 5 minutes, capped at `max_hearts`; calculate elapsed regeneration from `hearts_updated_at` in one trusted function and avoid a periodic job unless product requirements change.

#### `daily_activity`

One row per learner-local date for the Profile 7/30-day XP chart and activity summaries.

- `user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE`
- `activity_date DATE NOT NULL`
- `xp_earned INT NOT NULL DEFAULT 0 CHECK (xp_earned >= 0)`
- `study_seconds INT NOT NULL DEFAULT 0 CHECK (study_seconds >= 0)`
- `sessions_completed INT NOT NULL DEFAULT 0 CHECK (sessions_completed >= 0)`
- `questions_attempted INT NOT NULL DEFAULT 0 CHECK (questions_attempted >= 0)`
- `questions_correct INT NOT NULL DEFAULT 0 CHECK (questions_correct BETWEEN 0 AND questions_attempted)`
- `updated_at TIMESTAMPTZ NOT NULL DEFAULT now()`
- Primary key: `(user_id, activity_date)`

Update this aggregate in the same transaction that completes a learning session. Use the learner's configured timezone (default `Asia/Kuala_Lumpur`) to select `activity_date`. The detailed timeline comes from `learning_sessions`; do not store a second JSON copy of session lists in this table.

#### `math_journey_progress`

The Mathematics Journey has distinct unit/level completion, unlocks, best scores, stars, and diamonds in `mathJourneyProgress`. Preserve those IDs (`u1-l1`, `u1-c`, etc.) rather than flattening all Journey state into one boolean.

- `user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE`
- `unit_id TEXT NOT NULL`, `level_id TEXT NOT NULL`
- `completed BOOLEAN NOT NULL DEFAULT FALSE`
- `best_score INT NOT NULL DEFAULT 0 CHECK (best_score >= 0)`
- `stars_earned INT NOT NULL DEFAULT 0 CHECK (stars_earned >= 0)`
- `diamonds_earned INT NOT NULL DEFAULT 0 CHECK (diamonds_earned >= 0)`
- `attempts INT NOT NULL DEFAULT 0 CHECK (attempts >= 0)`
- `completed_at TIMESTAMPTZ NULL`, `updated_at TIMESTAMPTZ NOT NULL DEFAULT now()`
- Primary key: `(user_id, level_id)`

Store unlock rules/catalog in app curriculum or a separately seeded content manifest. Grant only the difference between a new reward and the previous best reward; retries must not duplicate stars/gems.

#### `achievement_definitions` and `user_achievements`

Seed definitions from `BADGE_CONFIG` and future stable achievement IDs. Definition fields:

- `id TEXT PRIMARY KEY` — examples: `streak-30`, `acc-100`, `gems-100`
- `name_bm TEXT NOT NULL`, `name_en TEXT NOT NULL`
- `description_bm TEXT`, `description_en TEXT`
- `tier TEXT NOT NULL CHECK (tier IN ('Bronze','Silver','Gold','Diamond'))`
- `metric_key TEXT NOT NULL` — e.g. `highest_daily_streak`, `total_correct`, `gems_earned`, `completed_topics`
- `target_value BIGINT NOT NULL CHECK (target_value >= 0)`
- `sort_order INT NOT NULL DEFAULT 0`, `is_active BOOLEAN NOT NULL DEFAULT TRUE`

`user_achievements`:

- `user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE`
- `achievement_id TEXT NOT NULL REFERENCES achievement_definitions(id) ON DELETE RESTRICT`
- `unlocked_at TIMESTAMPTZ NOT NULL DEFAULT now()`
- `certificate_metadata JSONB NULL` — optional immutable award/score/name snapshot for reproducible browser-generated certificates
- Primary key: `(user_id, achievement_id)`

The UI's progress value must come from the achievement's `metric_key`, not one shared counter. In the current `AchievementHome`, the card progress is supplied from streak or gems even for accuracy badges; use the correct metric when wiring the database. Award/unlock rows in a trusted transaction with `ON CONFLICT DO NOTHING`.

#### `assessment_definitions` and `assessment_attempts`

Seed `assessment_definitions` from `baseAssessments`; the catalog is not learner state. Keep stable `slug`, name/description in BM and English, topic, level, question type, question count, duration, score target, and `is_active`.

`assessment_attempts`:

- `id UUID PRIMARY KEY DEFAULT gen_random_uuid()`
- `user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE`
- `assessment_id TEXT NOT NULL REFERENCES assessment_definitions(slug) ON DELETE RESTRICT`
- `attempt_number INT NOT NULL CHECK (attempt_number > 0)`
- `status TEXT NOT NULL CHECK (status IN ('in_progress','passed','failed','timed_out','abandoned'))`
- `score INT NOT NULL DEFAULT 0 CHECK (score >= 0)`
- `correct_count INT NOT NULL DEFAULT 0 CHECK (correct_count >= 0)`
- `total_count INT NOT NULL DEFAULT 0 CHECK (total_count >= 0)`
- `duration_seconds INT NULL CHECK (duration_seconds >= 0)`
- `started_at TIMESTAMPTZ NOT NULL DEFAULT now()`, `completed_at TIMESTAMPTZ NULL`
- `idempotency_key UUID NOT NULL`
- Unique: `(user_id, idempotency_key)` and `(user_id, assessment_id, attempt_number)`

Compute an assessment's current card status from its latest attempt. Do not trust the static `status` value in `baseAssessments` as proof that a particular learner completed it. Store answer snapshots only if required for a real review feature; restrict access and do not return correct answers to the client before completion.

#### Optional future `guardian_learner_links`

Only add when a real guardian account and consent flow exists. Store `guardian_user_id`, `learner_user_id`, `status` (`pending`, `approved`, `revoked`), consent timestamps, and a unique pair constraint. A guardian must only see a learner after an approved link; a “Parent Dashboard” label by itself does not grant cross-account access.

## 4. Page-to-database query contract

### Home progress

Home currently has no progress display. When adding it, query `learning_topics` left-joined to the current learner's `topic_progress`, grouped by `subject_code`, and return:

- `completed_topics`: count where `first_completed_at IS NOT NULL`
- `available_topics`: count of active seeded topics
- `progress_percent`: completed / available, with zero-safe division
- `latest_activity_at`: most recent `last_practiced_at`
- Shared learner level, XP, and daily streak from `learner_stats` and `learner_streaks`

This makes progress change when Reading, Speaking, Math, or another subject saves a topic. It avoids per-page counters and gives newly completed progress to Home on refresh/realtime sync. Do not show a progress percentage until the topic catalog denominator is complete for that subject.

### Reading and Speaking

- Reading's top-level six options and 15 challenge levels use stable topic IDs; one level completion updates both `topic_progress` and one `learning_sessions` row.
- `ReadingJourney` currently marks completion through `unlockItem('reading-complete-<level>')`; migrate those IDs once, then make the database progress record the canonical signed-in state.
- Speaking creates one session per category practice round. Record duration and completion only; do not store audio by default.
- Aggregate `best_score`/`best_total` only for activities that actually have numeric question scores. Keep completion-only speaking results separate from scored percentages.

### Mathematics

- Map `MathHome` IDs to the topic manifest: `operations`, `faq`, `datetime`, `journey`.
- Math Journey level attempts update `math_journey_progress`, `learning_sessions`, `daily_activity`, and reward ledger atomically.
- The general math games and Journey must share one learner wallet and one XP/streak system; don't add both their legacy values on every sign-in.

### Profile

- 7-day/30-day charts read `daily_activity`.
- Subject percentage uses the sum of each attempted topic's best score and best total, matching current `ProfileHome` logic; exclude completion-only topics from the denominator.
- Recent sessions use completed `learning_sessions`, sorted by `completed_at DESC`.
- “Study Time” can be computed from `daily_activity.study_seconds` once sessions record duration. Until then, keep it explicitly unavailable rather than displaying a fabricated total.
- Recent achievements come from `user_achievements` joined with definitions.
- Profile name/avatar come from `profiles`; Auth email comes from the authenticated user session.

### Achievement and assessment

- Render badge progress from `achievement_definitions.metric_key` joined to trusted learner aggregates.
- The earned state is `user_achievements`, not merely a local threshold comparison.
- Assessments list definitions and derive each user's state from `assessment_attempts`.
- Certificate preview/download remains browser-generated. Its name, score, award ID, and issue date should use the immutable achievement/assessment record so changing a profile name later does not rewrite an old award.

### Leaderboard

The current leaderboard's subject selector is `reading`, `math`, or `jawi`; its columns are rank, public name, stars, best time, and completed exercises. Implement it as a database view or narrowly scoped RPC returning only those fields. For each subject:

- `stars`: verified subject-specific stars from completed session/reward records (define one consistent source before launch).
- `best_time`: shortest valid completed session duration for the relevant subject.
- `completed_exercises`: count of completed topic/assessment activities in that subject.
- Rank: stars descending, then completed exercises descending, then best time ascending, then a stable opaque ID as a deterministic tie-breaker.
- Include only users with `profiles.leaderboard_opt_in = TRUE`; use `leaderboard_name` or a safe display-name fallback. Never return email, auth IDs, or private profile fields.
- Apply pagination and a bounded result size. Do not expose a general `profiles` read policy to achieve this.

Do not count unvalidated local imports as competitive scores. For development, demo rows must be clearly fixture-only and must never be mixed with production ranks.

## 5. Supabase PostgreSQL starter schema

The following is the initial relational shape, not a full migration file. Add indexes, timestamp triggers, and RLS policies in versioned migrations. `pgcrypto` is commonly enabled in Supabase for UUID generation.

```sql
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null check (char_length(display_name) between 1 and 50),
  avatar_path text,
  language text not null default 'bm' check (language in ('bm', 'en')),
  leaderboard_opt_in boolean not null default false,
  leaderboard_name text check (
    leaderboard_name is null or char_length(leaderboard_name) between 1 and 24
  ),
  timezone text not null default 'Asia/Kuala_Lumpur',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.legacy_imports (
  user_id uuid not null references auth.users(id) on delete cascade,
  source_key text not null,
  source_version text not null,
  status text not null check (status in ('in_progress', 'completed', 'partial', 'failed')),
  started_at timestamptz not null default now(),
  completed_at timestamptz,
  result_summary jsonb,
  primary key (user_id, source_key, source_version)
);

create table public.learning_topics (
  subject_code text not null,
  topic_id text not null,
  title_bm text not null,
  title_en text not null,
  sort_order int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (subject_code, topic_id)
);

create table public.topic_progress (
  user_id uuid not null references auth.users(id) on delete cascade,
  subject_code text not null,
  topic_id text not null,
  crown_level smallint not null default 0 check (crown_level between 0 and 5),
  attempts int not null default 0 check (attempts >= 0),
  best_score int not null default 0 check (best_score >= 0),
  best_total int not null default 0 check (best_total >= 0),
  xp_earned int not null default 0 check (xp_earned >= 0),
  last_practiced_at timestamptz,
  first_completed_at timestamptz,
  updated_at timestamptz not null default now(),
  primary key (user_id, subject_code, topic_id),
  foreign key (subject_code, topic_id)
    references public.learning_topics(subject_code, topic_id) on delete restrict,
  check (best_total = 0 or best_score <= best_total)
);

create table public.learner_stats (
  user_id uuid primary key references auth.users(id) on delete cascade,
  total_xp bigint not null default 0 check (total_xp >= 0),
  level smallint not null default 1 check (level between 1 and 10),
  total_correct bigint not null default 0 check (total_correct >= 0),
  total_attempted bigint not null default 0 check (total_attempted >= total_correct),
  updated_at timestamptz not null default now()
);

create table public.learner_streaks (
  user_id uuid primary key references auth.users(id) on delete cascade,
  current_days int not null default 0 check (current_days >= 0),
  highest_days int not null default 0 check (highest_days >= current_days),
  last_active_date date,
  freezes_available int not null default 0 check (freezes_available >= 0),
  daily_goal_xp int not null default 50 check (daily_goal_xp >= 0),
  updated_at timestamptz not null default now()
);

create table public.learner_wallets (
  user_id uuid primary key references auth.users(id) on delete cascade,
  gems int not null default 0 check (gems >= 0),
  stars int not null default 0 check (stars >= 0),
  hearts smallint not null default 5 check (hearts >= 0),
  max_hearts smallint not null default 5 check (max_hearts >= hearts),
  hearts_updated_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.learning_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  subject_code text not null,
  topic_id text not null,
  source text not null check (
    source in ('quiz', 'game', 'reading', 'speaking', 'journey', 'practice')
  ),
  status text not null check (status in ('in_progress', 'completed', 'abandoned')),
  started_at timestamptz not null default now(),
  completed_at timestamptz,
  duration_seconds int check (duration_seconds >= 0),
  score int check (score >= 0),
  total_questions int check (total_questions >= 0),
  xp_earned int not null default 0 check (xp_earned >= 0),
  gems_earned int not null default 0 check (gems_earned >= 0),
  stars_earned int not null default 0 check (stars_earned >= 0),
  idempotency_key uuid not null,
  created_at timestamptz not null default now(),
  unique (user_id, idempotency_key),
  foreign key (subject_code, topic_id)
    references public.learning_topics(subject_code, topic_id) on delete restrict
);

create table public.daily_activity (
  user_id uuid not null references auth.users(id) on delete cascade,
  activity_date date not null,
  xp_earned int not null default 0 check (xp_earned >= 0),
  study_seconds int not null default 0 check (study_seconds >= 0),
  sessions_completed int not null default 0 check (sessions_completed >= 0),
  questions_attempted int not null default 0 check (questions_attempted >= 0),
  questions_correct int not null default 0 check (
    questions_correct between 0 and questions_attempted
  ),
  updated_at timestamptz not null default now(),
  primary key (user_id, activity_date)
);

create table public.math_journey_progress (
  user_id uuid not null references auth.users(id) on delete cascade,
  unit_id text not null,
  level_id text not null,
  completed boolean not null default false,
  best_score int not null default 0 check (best_score >= 0),
  stars_earned int not null default 0 check (stars_earned >= 0),
  diamonds_earned int not null default 0 check (diamonds_earned >= 0),
  attempts int not null default 0 check (attempts >= 0),
  completed_at timestamptz,
  updated_at timestamptz not null default now(),
  primary key (user_id, level_id)
);

create table public.wallet_transactions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  currency text not null check (currency in ('gems', 'stars', 'hearts')),
  amount int not null check (amount <> 0),
  balance_after int not null check (balance_after >= 0),
  source text not null,
  learning_session_id uuid references public.learning_sessions(id) on delete set null,
  idempotency_key uuid not null,
  created_at timestamptz not null default now(),
  unique (user_id, idempotency_key)
);

create table public.achievement_definitions (
  id text primary key,
  name_bm text not null,
  name_en text not null,
  description_bm text,
  description_en text,
  tier text not null check (tier in ('Bronze', 'Silver', 'Gold', 'Diamond')),
  metric_key text not null,
  target_value bigint not null check (target_value >= 0),
  sort_order int not null default 0,
  is_active boolean not null default true
);

create table public.user_achievements (
  user_id uuid not null references auth.users(id) on delete cascade,
  achievement_id text not null references public.achievement_definitions(id) on delete restrict,
  unlocked_at timestamptz not null default now(),
  certificate_metadata jsonb,
  primary key (user_id, achievement_id)
);

create table public.assessment_definitions (
  slug text primary key,
  name_bm text not null,
  name_en text not null,
  description_bm text,
  description_en text,
  topic text not null,
  level text not null,
  question_type text not null,
  total_questions int not null check (total_questions > 0),
  duration_minutes int not null check (duration_minutes > 0),
  score_target int not null check (score_target >= 0),
  is_active boolean not null default true,
  sort_order int not null default 0
);

create table public.assessment_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  assessment_id text not null references public.assessment_definitions(slug) on delete restrict,
  attempt_number int not null check (attempt_number > 0),
  status text not null check (
    status in ('in_progress', 'passed', 'failed', 'timed_out', 'abandoned')
  ),
  score int not null default 0 check (score >= 0),
  correct_count int not null default 0 check (correct_count >= 0),
  total_count int not null default 0 check (total_count >= 0),
  duration_seconds int check (duration_seconds >= 0),
  started_at timestamptz not null default now(),
  completed_at timestamptz,
  idempotency_key uuid not null,
  unique (user_id, idempotency_key),
  unique (user_id, assessment_id, attempt_number)
);

create index topic_progress_subject_idx
  on public.topic_progress (user_id, subject_code);
create index learning_sessions_recent_idx
  on public.learning_sessions (user_id, completed_at desc)
  where status = 'completed';
create index learning_sessions_subject_idx
  on public.learning_sessions (subject_code, completed_at desc)
  where status = 'completed';
create index daily_activity_range_idx
  on public.daily_activity (user_id, activity_date desc);
create index assessment_attempts_recent_idx
  on public.assessment_attempts (user_id, assessment_id, completed_at desc);
```

## 6. Access control and trusted writes

Enable Row-Level Security (RLS) on every table in `public`. Public catalog tables (`learning_topics`, `achievement_definitions`, `assessment_definitions`) may be readable by the app; only trusted migrations/admin roles may modify them.

For learner-owned rows, the baseline policy is:

```sql
alter table public.profiles enable row level security;
alter table public.legacy_imports enable row level security;
alter table public.topic_progress enable row level security;
alter table public.learning_sessions enable row level security;
alter table public.learner_stats enable row level security;
alter table public.learner_streaks enable row level security;
alter table public.learner_wallets enable row level security;
alter table public.daily_activity enable row level security;
alter table public.math_journey_progress enable row level security;
alter table public.wallet_transactions enable row level security;
alter table public.user_achievements enable row level security;
alter table public.assessment_attempts enable row level security;
alter table public.learning_topics enable row level security;
alter table public.achievement_definitions enable row level security;
alter table public.assessment_definitions enable row level security;

create policy "read active learning topics" on public.learning_topics
  for select to anon, authenticated using (is_active);
create policy "read active achievement definitions" on public.achievement_definitions
  for select to anon, authenticated using (is_active);
create policy "read active assessment definitions" on public.assessment_definitions
  for select to anon, authenticated using (is_active);

create policy "read own profile" on public.profiles
  for select to authenticated using (id = (select auth.uid()));
create policy "update own profile" on public.profiles
  for update to authenticated using (id = (select auth.uid()))
  with check (id = (select auth.uid()));

create policy "read own topic progress" on public.topic_progress
  for select to authenticated using (user_id = (select auth.uid()));
create policy "read own sessions" on public.learning_sessions
  for select to authenticated using (user_id = (select auth.uid()));
create policy "read own daily activity" on public.daily_activity
  for select to authenticated using (user_id = (select auth.uid()));
```

Apply equivalent self-only read policies to the other learner-owned tables. Do **not** give a browser client unrestricted `INSERT`/`UPDATE` access to stats, streaks, wallets, reward ledgers, achievements, leaderboard rows, or assessment results. Use narrow RPCs/Edge Functions that derive the learner from `auth.uid()`, validate the session/topic/assessment and reward, and update all affected tables transactionally. Make completion and reward calls idempotent. Never use the Supabase service-role key in the frontend.

Leaderboard results require a separate safe RPC or view that returns only opted-in public fields and aggregate metrics. Do not solve leaderboard reads by making private learner tables or all profiles publicly readable.

For avatars, use a Storage bucket with per-user object paths and policies that restrict writes to the authenticated user's own path. Store only `avatar_path` in `profiles`. Apply file type and size limits on upload.

## 7. Transaction and consistency rules

1. A completed attempt updates `learning_sessions`, `topic_progress`, `daily_activity`, `learner_stats`, `learner_streaks`, rewards, and achievement unlocks in one trusted transaction where applicable.
2. Score, XP, and reward values are validated and calculated server-side. The client sends an attempt result/event, not an authoritative wallet balance.
3. Use `idempotency_key` on completion/reward writes so retries, reconnects, and double-clicks do not duplicate XP, stars, gems, or completion counts.
4. Topic `best_score` and `best_total` update atomically; attempts increment once per unique session.
5. The current `useGamification` behavior limits first-completion XP and reduces practice XP for repeated topics. Preserve those rules in a single backend implementation if they remain the product rules.
6. Daily streaks advance once on the first qualifying activity per local calendar day. They do not reset because of one wrong answer. Game-answer streaks may remain ephemeral session state unless a UI requires historical storage.
7. Hearts regenerate at the current five-minute interval, capped at `max_hearts`; calculate from `hearts_updated_at` to avoid a cron race.
8. A profile summary is derived from or transactionally maintained with topic/session data. Never make each page the owner of its own copy of total progress.
9. Keep date/time event timestamps in UTC (`TIMESTAMPTZ`); derive daily grouping with the profile timezone.
10. Use `ON DELETE CASCADE` for a learner's private data, `RESTRICT` for seeded catalog references, and a documented account deletion/export process.

## 8. Suggested database views/RPCs

Implement only when the relevant UI is wired:

- `get_home_progress()` — current learner's subject counts, completed topics, percent, XP, level, and daily streak. Subject denominator comes from active `learning_topics`.
- `get_profile_summary(start_date, end_date)` — daily XP/study totals, subject score percentages, recent completed sessions, wallet, and achievements.
- `get_achievement_progress()` — each active definition with the current learner's metric value and unlocked timestamp.
- `get_assessment_overview()` — active definitions plus the learner's latest attempt/status.
- `get_leaderboard(subject_code, limit, cursor)` — opted-in public aliases and subject metrics only.
- `complete_learning_session(...)` — validated, idempotent transactional session completion and reward calculation.
- `complete_assessment_attempt(...)` — validates assessment bounds and records a final attempt without exposing answer keys.

These are contracts, not functions already present in the repository. Avoid putting user-provided SQL filters or arbitrary table names into RPCs.

## 9. Implementation and migration phases

### Phase 1 — Foundation

1. Add Supabase project configuration without committing credentials; add only the public URL and anon key to client configuration.
2. Create versioned SQL migrations for Auth-linked profile creation, core tables, indexes, RLS, and catalog read policies.
3. Seed stable subject/topic manifest entries, the 11 current `BADGE_CONFIG` badges, and assessment definitions from `baseAssessments`.
4. Add and test Auth flows for email/password, Google, Facebook, recovery, sign-out, and callback handling. Keep guest mode working.

### Phase 2 — Signed-in learning persistence

1. Add a database-backed implementation of the existing `GamificationRepository` contract; preserve the local repository for guests/offline behavior.
2. Scope every repository call to the authenticated Supabase user. Re-fetch or clear local component state on account change/sign-out.
3. Persist topic progress and learning sessions from Reading, Speaking, Math games, and Math Journey.
4. Add trusted idempotent RPCs for XP, wallet changes, hearts, daily streak, and completion awards.
5. Add an explicit “save guest progress to account” flow. Upload profile images to Storage and update the database profile.

### Phase 3 — Page integration

1. Read Home subject summaries from the shared topic progress query; don't add page-local counters.
2. Replace Profile's `iman-profile:*` local storage with `profiles`, `daily_activity`, `learning_sessions`, and achievement queries.
3. Replace static assessment completion state with `assessment_attempts`.
4. Replace Achievement's local threshold-only status with definition metrics plus `user_achievements`.
5. Replace Leaderboard demo rows with the safe opt-in leaderboard RPC; test subject filters, pagination, and tie-breaking.

### Phase 4 — Cutover and operational readiness

1. Import guest/local data once per authenticated account and source version; record migration completion and report partial failures.
2. Reconcile duplicate legacy balances without adding overlapping `gameData` and gamification balances. Never silently reward the same legacy event twice.
3. Label imported scores as unverified/non-competitive unless validated; only server-verified activity should affect public ranks.
4. Test RLS with two separate accounts, anonymous/guest state, and logged-out access. Verify one learner cannot read or modify another learner's rows.
5. Add account export/deletion, backup/restore, error reporting, and a documented retention policy before production launch.
6. Remove demo leaderboard fixtures from production and verify all key pages still work when offline or before authentication.

## 10. Completion checklist

- [ ] Supabase Auth is the only source of signed-in identity; Google, Facebook, and email/password flows are covered.
- [ ] Guest mode remains device-local until the user explicitly links/migrates it.
- [ ] Each active subject/topic has a stable catalog ID and is represented in shared progress.
- [ ] Home progress is computed from all subject activity and has a complete catalog denominator.
- [ ] Reading's six choices and 15 challenge levels persist completion and attempts.
- [ ] Speaking persists category sessions without collecting audio by default.
- [ ] Mathematics Journey persists level/unit state and cannot award repeated rewards on retries.
- [ ] XP, gems, stars, hearts, and daily streak have one canonical source and server-trusted update path.
- [ ] Profile can read daily XP, study duration, recent sessions, subject best-score percentages, and earned achievements.
- [ ] Achievement progress uses the correct metric for each badge; unlocks are unique and server-validated.
- [ ] Assessment catalog data is separate from individual attempt status/results.
- [ ] Leaderboards use real, opt-in, subject-specific data and reveal no private account fields.
- [ ] Every private table has RLS enabled and cross-account access tests pass.
- [ ] Avatar bytes are stored in Storage, not as base64 in a database row.
- [ ] Local data import is one-time, idempotent, reconcilable, and does not fabricate competitive scores.

## 11. Key source files reviewed

- `src/components/WelcomeModal.jsx`
- `src/components/HomePage.jsx`
- `src/components/ReadingPage/ReadingPage.jsx`
- `src/components/ReadingPage/games/ReadingJourney.jsx`
- `src/components/SpeakingPage/BMPage.jsx`
- `src/components/SpeakingPage/BMSpeakGame.jsx`
- `src/components/MathematicsPage/MathHome.jsx`
- `src/components/MathematicsPage/MathJourney.jsx`
- `src/components/Leaderboard/LeaderboardHome.jsx`
- `src/components/Achievement/AchievementHome.jsx`
- `src/components/Achievement/AchievementCards.jsx`
- `src/components/Profile/ProfileHome.jsx`
- `src/services/LocalGamificationRepo.js`
- `src/services/gamificationConstants.js`
- `src/services/gameStatsManager.js`
- `src/services/storageService.js`
- `src/data/curriculum/assessment.js`
