import React, { useState } from 'react';
import { X } from 'lucide-react';
import { LearnIcon, LeaderboardIcon, ProfileIcon, AchievementIcon, LanguageIcon } from './icons/SidebarIcons';
import { BmSukuKataKvIcon, BmSukuKataKvkIcon, BmPhonicsIcon, BmNombor1100Icon, BmObjekBiasaIcon } from './icons/BmPageIcons';
import { ReadingIcon, SpeakingIcon, JawiIcon, MathIcon } from './icons/CourseIcons';
import { JawiAlphabetIcon, JawiReadingIcon, Jawi100WordsIcon, JawiSpellingGameIcon, JawiStoriesIcon } from './icons/JawiPageIcons';
import {
  LockIcon, PlayIcon, GearIcon, TrophyRoundIcon, MusicRoundIcon,
  TreasureChestIcon, GearsIcon, RocketIcon, StarIcon, HeartIcon,
  HealthPotionIcon, GemIcon, CoinIcon, TrophyIcon, MedalIcon, CrownIcon,
  FlameIcon, LightningIcon, ShieldIcon, KeyIcon
} from './icons/GameIcons';
import {
  RobotReadingIcon, RobotSpeakingIcon, RobotABCIcon, RobotMathIcon, RobotArabicIcon, RobotSuperIcon
} from './icons/RobotAI/RobotAIIcons';

const ICON_CATEGORIES = [
  {
    name: 'AI Learning Robots',
    color: 'from-violet-400 to-violet-600',
    bgColor: '#F5F3FF',
    icons: [
      { name: 'Reading Bot', Component: RobotReadingIcon, description: 'Books • Stories • Phonics' },
      { name: 'Speaking Bot', Component: RobotSpeakingIcon, description: 'Pronunciation • Talking' },
      { name: 'ABC Bot', Component: RobotABCIcon, description: 'Alphabet • KV • KVK • Reading' },
      { name: 'Math Bot', Component: RobotMathIcon, description: 'Counting • Add • Subtract • Multiply' },
      { name: 'Arabic Bot', Component: RobotArabicIcon, description: 'Alif • Ba • Ta • Tha • Jeem • Haa' },
      { name: 'Super Bot', Component: RobotSuperIcon, description: 'Read • Speak • Math • Arabic' },
    ]
  },
  {
    name: 'Sidebar Icons',
    color: 'from-blue-400 to-blue-600',
    bgColor: '#EFF6FF',
    icons: [
      { name: 'Learn', Component: LearnIcon, description: 'Learning mode' },
      { name: 'Leaderboard', Component: LeaderboardIcon, description: 'Rankings' },
      { name: 'Profile', Component: ProfileIcon, description: 'User profile' },
      { name: 'Achievement', Component: AchievementIcon, description: 'Badges' },
      { name: 'Language', Component: LanguageIcon, description: 'Language switcher' },
    ]
  },
  {
    name: 'BM Page Icons',
    color: 'from-purple-400 to-purple-600',
    bgColor: '#FAF5FF',
    icons: [
      { name: 'Suku Kata KV', Component: BmSukuKataKvIcon, description: 'Consonant-Vowel' },
      { name: 'Suku Kata KVK', Component: BmSukuKataKvkIcon, description: 'Consonant-Vowel-Consonant' },
      { name: 'Phonics', Component: BmPhonicsIcon, description: 'Sound learning' },
      { name: 'Nombor 1-100', Component: BmNombor1100Icon, description: 'Numbers' },
      { name: 'Objek Biasa', Component: BmObjekBiasaIcon, description: 'Common objects' },
    ]
  },
  {
    name: 'Course Icons',
    color: 'from-pink-400 to-pink-600',
    bgColor: '#FDF2F8',
    icons: [
      { name: 'Reading', Component: ReadingIcon, description: 'Reading lessons' },
      { name: 'Speaking', Component: SpeakingIcon, description: 'Pronunciation' },
      { name: 'Jawi', Component: JawiIcon, description: 'Jawi script' },
      { name: 'Math', Component: MathIcon, description: 'Mathematics' },
    ]
  },
  {
    name: 'Jawi Page Icons',
    color: 'from-amber-400 to-amber-600',
    bgColor: '#FFFBF0',
    icons: [
      { name: 'Jawi Alphabet', Component: JawiAlphabetIcon, description: 'Letter learning' },
      { name: 'Jawi Reading', Component: JawiReadingIcon, description: 'Reading practice' },
      { name: 'Jawi 100 Words', Component: Jawi100WordsIcon, description: 'Vocabulary' },
      { name: 'Jawi Spelling', Component: JawiSpellingGameIcon, description: 'Spelling game' },
      { name: 'Jawi Stories', Component: JawiStoriesIcon, description: 'Story collection' },
    ]
  },
  {
    name: 'Game Icons',
    color: 'from-green-400 to-green-600',
    bgColor: '#F0FDF4',
    icons: [
      { name: 'Lock', Component: LockIcon, description: 'Locked content' },
      { name: 'Play', Component: PlayIcon, description: 'Start game' },
      { name: 'Gear', Component: GearIcon, description: 'Settings' },
      { name: 'Trophy Round', Component: TrophyRoundIcon, description: 'Achievement' },
      { name: 'Music Round', Component: MusicRoundIcon, description: 'Audio' },
      { name: 'Treasure Chest', Component: TreasureChestIcon, description: 'Rewards' },
      { name: 'Gears', Component: GearsIcon, description: 'Mechanics' },
      { name: 'Rocket', Component: RocketIcon, description: 'Launch' },
      { name: 'Star', Component: StarIcon, description: 'Rating' },
      { name: 'Heart', Component: HeartIcon, description: 'Health/Life' },
      { name: 'Health Potion', Component: HealthPotionIcon, description: 'Recovery' },
      { name: 'Gem', Component: GemIcon, description: 'Premium currency' },
      { name: 'Coin', Component: CoinIcon, description: 'Regular currency' },
      { name: 'Trophy', Component: TrophyIcon, description: 'Victory' },
      { name: 'Medal', Component: MedalIcon, description: 'Award' },
      { name: 'Crown', Component: CrownIcon, description: 'Champion' },
      { name: 'Flame', Component: FlameIcon, description: 'Hot/Trending' },
      { name: 'Lightning', Component: LightningIcon, description: 'Power' },
      { name: 'Shield', Component: ShieldIcon, description: 'Protection' },
      { name: 'Key', Component: KeyIcon, description: 'Unlock' },
    ]
  }
];

function IconModal({ icon, onClose }) {
  if (!icon) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl shadow-2xl p-8 max-w-lg w-full animate-in scale-95 zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-gray-800">{icon.name}</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={24} className="text-gray-600" />
          </button>
        </div>

        <div className="flex justify-center mb-8">
          <div className="p-12 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl">
            <icon.Component size={120} />
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-600 font-medium mb-1">Description</p>
            <p className="text-gray-800 font-semibold">{icon.description}</p>
          </div>
          <div className="bg-blue-50 rounded-lg p-4">
            <p className="text-sm text-gray-600 font-medium mb-1">Category</p>
            <p className="text-gray-800 font-semibold">{icon.category}</p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full mt-6 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-200 active:scale-95"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default function RobotComponentPage() {
  const [selectedIcon, setSelectedIcon] = useState(null);

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-8 py-12">
        <h1 className="text-5xl font-bold mb-3">Icon Gallery</h1>
        <p className="text-blue-100 text-lg">Click on any icon to view details</p>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {ICON_CATEGORIES.map((category) => (
          <section key={category.name} className="mb-16">
            {/* Category Header */}
            <div className="mb-8">
              <div className={`inline-block bg-gradient-to-r ${category.color} text-white px-6 py-3 rounded-full font-bold text-lg shadow-lg`}>
                {category.name}
              </div>
              <div className={`h-1 w-24 bg-gradient-to-r ${category.color} rounded-full mt-3`}></div>
            </div>

            {/* Icons Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
              {category.icons.map((icon) => (
                <button
                  key={icon.name}
                  onClick={() => setSelectedIcon({ ...icon, category: category.name })}
                  className="group cursor-pointer"
                >
                  <div className="relative bg-white rounded-2xl p-6 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 hover:border-blue-300 h-full flex flex-col items-center justify-center"
                    style={{ backgroundColor: category.bgColor }}
                  >
                    {/* Icon Container */}
                    <div className={`bg-gradient-to-br ${category.color} p-6 rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <icon.Component size={48} />
                    </div>

                    {/* Name */}
                    <h3 className="font-semibold text-gray-800 text-center text-sm mb-2 line-clamp-2">
                      {icon.name}
                    </h3>

                    {/* Description */}
                    <p className="text-xs text-gray-500 text-center line-clamp-1">
                      {icon.description}
                    </p>

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/0 to-indigo-600/0 group-hover:from-blue-500/10 group-hover:to-indigo-600/10 transition-all duration-300 flex items-center justify-center">
                      <span className="text-blue-600 font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        Click
                      </span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Jawi Robots Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <section>
          <div className="mb-8">
            <div className="inline-block bg-gradient-to-r from-cyan-400 to-cyan-600 text-white px-6 py-3 rounded-full font-bold text-lg shadow-lg">
              Jawi Robots Combined
            </div>
            <div className="h-1 w-24 bg-gradient-to-r from-cyan-400 to-cyan-600 rounded-full mt-3"></div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 cursor-pointer hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
            <img
              src="src/components/icons/jawi-robots-combined.svg"
              alt="Jawi Robots Combined"
              className="w-full h-auto rounded-xl shadow-md"
            />
            <p className="text-center text-gray-600 mt-6 font-medium text-lg">
              6 Interactive Jawi Learning Robots
            </p>
          </div>
        </section>
      </div>

      {/* Stats Footer */}
      <div className="bg-white border-t border-gray-200 px-8 py-8 mt-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-6">
          {ICON_CATEGORIES.map((category) => (
            <div key={category.name} className="text-center">
              <p className="text-3xl font-bold text-blue-600">{category.icons.length}</p>
              <p className="text-sm text-gray-600 mt-1">{category.name}</p>
            </div>
          ))}
          <div className="text-center md:col-span-5 sm:col-span-2 border-t border-gray-200 pt-6 mt-6">
            <p className="text-3xl font-bold text-indigo-600">{ICON_CATEGORIES.reduce((sum, cat) => sum + cat.icons.length, 0)}</p>
            <p className="text-sm text-gray-600 mt-1">Total Icons</p>
          </div>
        </div>
      </div>

      {/* Modal */}
      <IconModal icon={selectedIcon} onClose={() => setSelectedIcon(null)} />
    </div>
  );
};
