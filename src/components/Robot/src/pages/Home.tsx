import { useEffect, useRef, useState } from "react";
import RobotTeacher from "../components/icons/RobotTeacher";
import RobotDoctor from "../components/icons/RobotDoctor";
import RobotEngineer from "../components/icons/RobotEngineer";
import RobotScientist from "../components/icons/RobotScientist";
import RobotAstronaut from "../components/icons/RobotAstronaut";
import RobotArtist from "../components/icons/RobotArtist";
import RobotChef from "../components/icons/RobotChef";
import RobotMusician from "../components/icons/RobotMusician";
import RobotPolice from "../components/icons/RobotPolice";
import RobotFirefighter from "../components/icons/RobotFirefighter";

interface CareerRobot {
  id: string;
  name: string;
  title: string;
  description: string;
  color: string;
  Icon: React.FC<{ className?: string; size?: number }>;
}

const careerRobots: CareerRobot[] = [
  {
    id: "teacher",
    name: "TeachBot",
    title: "Teacher",
    description: "Shares knowledge across the galaxy",
    color: "#FFD700",
    Icon: RobotTeacher,
  },
  {
    id: "doctor",
    name: "DocBot",
    title: "Doctor",
    description: "Heals with cosmic medical tech",
    color: "#FF1A3C",
    Icon: RobotDoctor,
  },
  {
    id: "engineer",
    name: "BuildBot",
    title: "Engineer",
    description: "Builds the future of space travel",
    color: "#FF8C00",
    Icon: RobotEngineer,
  },
  {
    id: "scientist",
    name: "ScienceBot",
    title: "Scientist",
    description: "Discovers the universe's secrets",
    color: "#00FF88",
    Icon: RobotScientist,
  },
  {
    id: "astronaut",
    name: "AstroBot",
    title: "Astronaut",
    description: "Explores the infinite cosmos",
    color: "#00D2FF",
    Icon: RobotAstronaut,
  },
  {
    id: "artist",
    name: "ArtBot",
    title: "Artist",
    description: "Creates beauty among the stars",
    color: "#FF007F",
    Icon: RobotArtist,
  },
  {
    id: "chef",
    name: "CookBot",
    title: "Chef",
    description: "Cooks stellar cosmic cuisine",
    color: "#FF5E00",
    Icon: RobotChef,
  },
  {
    id: "musician",
    name: "MusicBot",
    title: "Musician",
    description: "Plays melodies of the universe",
    color: "#9B59B6",
    Icon: RobotMusician,
  },
  {
    id: "police",
    name: "GuardBot",
    title: "Police Officer",
    description: "Protects the galactic community",
    color: "#0066CC",
    Icon: RobotPolice,
  },
  {
    id: "firefighter",
    name: "FlameBot",
    title: "Firefighter",
    description: "Braves cosmic fires with courage",
    color: "#FF3300",
    Icon: RobotFirefighter,
  },
];

// Star field component
const StarField = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number>(0);
  const starsRef = useRef<Array<{ x: number; y: number; z: number; size: number; opacity: number; speed: number }>>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Initialize stars
    const starCount = 300;
    starsRef.current = Array.from({ length: starCount }, () => ({
      x: Math.random() * canvas.width - canvas.width / 2,
      y: Math.random() * canvas.height - canvas.height / 2,
      z: Math.random() * 2000,
      size: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.8 + 0.2,
      speed: Math.random() * 0.5 + 0.1,
    }));

    let time = 0;
    const animate = () => {
      time += 0.005;
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw nebula clouds
      const nebulaGrad = ctx.createRadialGradient(
        canvas.width * 0.3,
        canvas.height * 0.4,
        0,
        canvas.width * 0.3,
        canvas.height * 0.4,
        canvas.width * 0.5
      );
      nebulaGrad.addColorStop(0, "rgba(75, 0, 130, 0.08)");
      nebulaGrad.addColorStop(0.5, "rgba(138, 43, 226, 0.04)");
      nebulaGrad.addColorStop(1, "transparent");
      ctx.fillStyle = nebulaGrad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const nebulaGrad2 = ctx.createRadialGradient(
        canvas.width * 0.7,
        canvas.height * 0.6,
        0,
        canvas.width * 0.7,
        canvas.height * 0.6,
        canvas.width * 0.4
      );
      nebulaGrad2.addColorStop(0, "rgba(0, 100, 200, 0.06)");
      nebulaGrad2.addColorStop(0.5, "rgba(0, 150, 255, 0.03)");
      nebulaGrad2.addColorStop(1, "transparent");
      ctx.fillStyle = nebulaGrad2;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      starsRef.current.forEach((star) => {
        star.z -= star.speed;
        if (star.z <= 0) {
          star.z = 2000;
          star.x = Math.random() * canvas.width - centerX;
          star.y = Math.random() * canvas.height - centerY;
        }

        const scale = 1000 / (1000 + star.z);
        const sx = centerX + star.x * scale;
        const sy = centerY + star.y * scale;
        const size = star.size * scale * 1.5;

        // Twinkle effect
        const twinkle = Math.sin(time * star.speed * 10 + star.x) * 0.3 + 0.7;
        const alpha = star.opacity * scale * twinkle;

        ctx.beginPath();
        ctx.arc(sx, sy, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.min(alpha, 1)})`;
        ctx.fill();

        // Glow for larger stars
        if (size > 1.5) {
          ctx.beginPath();
          ctx.arc(sx, sy, size * 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(200, 220, 255, ${alpha * 0.15})`;
          ctx.fill();
        }
      });

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full"
      style={{ zIndex: 0 }}
    />
  );
};

// Shooting star component
const ShootingStar = () => {
  const [stars, setStars] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([]);

  useEffect(() => {
    const generateStar = () => {
      const id = Date.now() + Math.random();
      const x = Math.random() * 100;
      const y = Math.random() * 50;
      setStars((prev) => [...prev.slice(-2), { id, x, y, delay: 0 }]);
      setTimeout(generateStar, Math.random() * 5000 + 3000);
    };
    const timeout = setTimeout(generateStar, 2000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      {stars.map((star) => (
        <div
          key={star.id}
          className="shooting-star"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
          }}
        />
      ))}
    </>
  );
};

// SVG Code Modal
const CodeModal = ({
  isOpen,
  onClose,
  robot,
}: {
  isOpen: boolean;
  onClose: () => void;
  robot: CareerRobot | null;
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !robot) return null;

  // Get the SVG source by rendering the icon and extracting
  const getSVGCode = () => {
    // Find the component name
    return `import React from "react";

const Robot${robot.title.replace(/\s/g, "")} = ({ size = 200 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* ${robot.name} - Space Galaxy Themed */}
    {/* Career: ${robot.title} */}
    {/* Color theme: ${robot.color} */}
    
    {/* View full source in the components/icons folder */}
    
  </svg>
);

export default Robot${robot.title.replace(/\s/g, "")};`;
  };

  const handleCopy = () => {
    const code = `<!-- ${robot.name} - ${robot.title} Robot Icon -->
<!-- Space Galaxy Theme - Color: ${robot.color} -->
<svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="100" cy="100" r="80" fill="${robot.color}" opacity="0.15"/>
  <!-- Stars with animated opacity -->
  <circle cx="35" cy="50" r="2" fill="${robot.color}" opacity="0.8"/>
  <!-- Robot body, career accessories, and animated elements -->
  <!-- See full source code for complete SVG -->
</svg>`;
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div
        className="relative bg-gray-900/95 border border-gray-700 rounded-2xl p-6 max-w-lg w-full shadow-2xl transform transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        <div className="flex items-center gap-4 mb-4">
          <div
            className="w-16 h-16 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: `${robot.color}15`, border: `2px solid ${robot.color}40` }}
          >
            <robot.Icon size={48} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">{robot.name}</h3>
            <p className="text-sm" style={{ color: robot.color }}>
              {robot.title}
            </p>
          </div>
        </div>

        <p className="text-gray-400 mb-4">{robot.description}</p>

        <div className="bg-gray-950 rounded-lg p-4 border border-gray-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-gray-500 uppercase tracking-wider">SVG Embed Code</span>
            <button
              onClick={handleCopy}
              className="text-xs px-3 py-1 rounded-full transition-all"
              style={{
                backgroundColor: copied ? "#00FF8820" : `${robot.color}20`,
                color: copied ? "#00FF88" : robot.color,
              }}
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
          <pre className="text-xs text-gray-500 overflow-x-auto whitespace-pre-wrap font-mono leading-relaxed">
            {getSVGCode()}
          </pre>
        </div>

        <div className="mt-4 flex items-center gap-3">
          <span className="text-xs text-gray-500">Color:</span>
          <div
            className="w-6 h-6 rounded-full border-2 border-white/20"
            style={{ backgroundColor: robot.color }}
          />
          <span className="text-xs text-gray-400 font-mono">{robot.color}</span>
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  const [selectedRobot, setSelectedRobot] = useState<CareerRobot | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const handleRobotClick = (robot: CareerRobot) => {
    setSelectedRobot(robot);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <StarField />
      <ShootingStar />

      {/* Hero Section */}
      <header className="relative z-10 pt-16 pb-8 px-4 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/30 bg-purple-500/10 mb-6">
          <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
          <span className="text-sm text-purple-300 font-mono tracking-wider">SPACE GALAXY THEME</span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 leading-tight">
          <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
            Career Cosmos
          </span>
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-2">
          Meet our space-themed robot friends, each exploring a different career path across the galaxy!
        </p>
        <p className="text-gray-500 text-sm">Click any robot to get the SVG embed code</p>
      </header>

      {/* Robot Grid */}
      <main className="relative z-10 px-4 pb-20">
        <div
          ref={gridRef}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 max-w-7xl mx-auto"
        >
          {careerRobots.map((robot, index) => (
            <div
              key={robot.id}
              className="group relative cursor-pointer"
              onClick={() => handleRobotClick(robot)}
              onMouseEnter={() => setHoveredId(robot.id)}
              onMouseLeave={() => setHoveredId(null)}
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              {/* Card */}
              <div
                className="relative rounded-2xl p-4 sm:p-6 transition-all duration-500 border border-white/5 backdrop-blur-sm"
                style={{
                  background: `linear-gradient(135deg, ${robot.color}08 0%, rgba(0,0,0,0.6) 100%)`,
                  borderColor:
                    hoveredId === robot.id ? `${robot.color}50` : "rgba(255,255,255,0.05)",
                  boxShadow:
                    hoveredId === robot.id
                      ? `0 0 40px ${robot.color}20, 0 0 80px ${robot.color}10`
                      : "0 0 0 transparent",
                  transform: hoveredId === robot.id ? "translateY(-8px) scale(1.03)" : "translateY(0) scale(1)",
                }}
              >
                {/* Glow orb behind icon */}
                <div
                  className="absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-500"
                  style={{
                    opacity: hoveredId === robot.id ? 1 : 0,
                  }}
                >
                  <div
                    className="w-32 h-32 rounded-full blur-3xl"
                    style={{ backgroundColor: `${robot.color}30` }}
                  />
                </div>

                {/* Icon */}
                <div className="relative flex justify-center mb-3 sm:mb-4">
                  <div className="transition-transform duration-500 group-hover:scale-110">
                    <robot.Icon
                      size={160}
                      className="w-full h-auto max-w-[120px] sm:max-w-[160px]"
                    />
                  </div>
                </div>

                {/* Info */}
                <div className="relative text-center">
                  <h3
                    className="text-sm sm:text-base font-bold mb-1 transition-colors duration-300"
                    style={{ color: hoveredId === robot.id ? robot.color : "#fff" }}
                  >
                    {robot.name}
                  </h3>
                  <p className="text-xs text-gray-500">{robot.title}</p>

                  {/* Hover description */}
                  <div
                    className="absolute -bottom-8 left-0 right-0 text-center transition-all duration-300"
                    style={{
                      opacity: hoveredId === robot.id ? 1 : 0,
                      transform: hoveredId === robot.id ? "translateY(0)" : "translateY(4px)",
                    }}
                  >
                    <p className="text-[10px] text-gray-400 leading-tight">{robot.description}</p>
                  </div>
                </div>

                {/* Corner accent */}
                <div
                  className="absolute top-3 right-3 w-2 h-2 rounded-full transition-all duration-300"
                  style={{
                    backgroundColor: robot.color,
                    opacity: hoveredId === robot.id ? 1 : 0.3,
                    boxShadow: hoveredId === robot.id ? `0 0 10px ${robot.color}` : "none",
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 text-center py-8 border-t border-white/5">
        <p className="text-gray-600 text-sm">
          Cosmic Career Robots - SVG Icon Collection for Kids Learning Platform
        </p>
        <div className="flex justify-center gap-2 mt-3">
          {careerRobots.map((robot) => (
            <div
              key={robot.id}
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: robot.color, opacity: 0.5 }}
            />
          ))}
        </div>
      </footer>

      {/* Code Modal */}
      <CodeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        robot={selectedRobot}
      />

      {/* CSS for shooting star animation */}
      <style>{`
        @keyframes shoot {
          0% {
            transform: translateX(0) translateY(0) rotate(-45deg);
            opacity: 1;
          }
          100% {
            transform: translateX(300px) translateY(300px) rotate(-45deg);
            opacity: 0;
          }
        }

        .shooting-star {
          position: fixed;
          width: 100px;
          height: 2px;
          background: linear-gradient(90deg, rgba(255, 255, 255, 0.8), transparent);
          border-radius: 50%;
          animation: shoot 1s ease-out forwards;
          z-index: 5;
          pointer-events: none;
        }

        .shooting-star::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          width: 4px;
          height: 4px;
          background: white;
          border-radius: 50%;
          box-shadow: 0 0 10px 2px rgba(255, 255, 255, 0.5);
          transform: translateY(-1px);
        }
      `}</style>
    </div>
  );
}
