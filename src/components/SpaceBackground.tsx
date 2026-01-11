'use client';

import { useEffect, useState } from 'react';

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  twinkleSpeed: number;
}

interface Planet {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  orbitRadius: number;
  orbitSpeed: number;
  angle: number;
}

interface SpaceVehicle {
  id: number;
  type: 'shuttle' | 'rocket';
  x: number;
  y: number;
  size: number;
  speed: number;
  direction: number;
}

export const SpaceBackground = () => {
  const [stars, setStars] = useState<Star[]>([]);
  const [planets, setPlanets] = useState<Planet[]>([]);
  const [vehicles, setVehicles] = useState<SpaceVehicle[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Generate stars
    const generateStars = () => {
      const newStars: Star[] = [];
      for (let i = 0; i < 150; i++) {
        newStars.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 3 + 1,
          opacity: Math.random() * 0.8 + 0.2,
          twinkleSpeed: Math.random() * 3 + 1,
        });
      }
      setStars(newStars);
    };

    // Generate planets
    const generatePlanets = () => {
      const planetColors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3', '#54a0ff'];
      const newPlanets: Planet[] = [];
      
      for (let i = 0; i < 5; i++) {
        newPlanets.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 60 + 20,
          color: planetColors[Math.floor(Math.random() * planetColors.length)],
          orbitRadius: Math.random() * 200 + 100,
          orbitSpeed: Math.random() * 0.02 + 0.005,
          angle: Math.random() * Math.PI * 2,
        });
      }
      setPlanets(newPlanets);
    };

    // Generate space vehicles
    const generateVehicles = () => {
      const newVehicles: SpaceVehicle[] = [];
      
      for (let i = 0; i < 4; i++) {
        newVehicles.push({
          id: i,
          type: i % 2 === 0 ? 'shuttle' : 'rocket',
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 20 + 15,
          speed: Math.random() * 0.5 + 0.2,
          direction: Math.random() * 360,
        });
      }
      setVehicles(newVehicles);
    };

    generateStars();
    generatePlanets();
    generateVehicles();

    // Mouse tracking for parallax effect
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-black animate-pulse"></div>
      
      {/* Stars */}
      <div 
        className="absolute inset-0 transition-transform duration-1000 ease-out"
        style={{ 
          transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)` 
        }}
      >
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute rounded-full bg-white animate-pulse"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity,
              animationDuration: `${star.twinkleSpeed}s`,
              boxShadow: `0 0 ${star.size * 2}px rgba(255, 255, 255, 0.8)`,
            }}
          />
        ))}
      </div>

      {/* Planets */}
      <div 
        className="absolute inset-0 transition-transform duration-1000 ease-out"
        style={{ 
          transform: `translate(${mousePosition.x * 0.3}px, ${mousePosition.y * 0.3}px)` 
        }}
      >
        {planets.map((planet) => (
          <div
            key={planet.id}
            className="absolute rounded-full opacity-60 animate-spin"
            style={{
              left: `${planet.x}%`,
              top: `${planet.y}%`,
              width: `${planet.size}px`,
              height: `${planet.size}px`,
              background: `radial-gradient(circle at 30% 30%, ${planet.color}, ${planet.color}88)`,
              animationDuration: `${20 + planet.id * 10}s`,
              boxShadow: `0 0 ${planet.size}px ${planet.color}44`,
            }}
          />
        ))}
      </div>

      {/* Space Vehicles */}
      <div 
        className="absolute inset-0 transition-transform duration-1000 ease-out"
        style={{ 
          transform: `translate(${mousePosition.x * 0.1}px, ${mousePosition.y * 0.1}px)` 
        }}
      >
        {vehicles.map((vehicle) => (
          <div
            key={vehicle.id}
            className={`absolute ${vehicle.type === 'shuttle' ? 'space-shuttle' : 'space-rocket'}`}
            style={{
              left: `${vehicle.x}%`,
              top: `${vehicle.y}%`,
              width: `${vehicle.size}px`,
              height: `${vehicle.size * 0.6}px`,
              transform: `rotate(${vehicle.direction}deg)`,
              animationDuration: `${15 + vehicle.id * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Floating moons */}
      <div 
        className="absolute inset-0 transition-transform duration-1000 ease-out"
        style={{ 
          transform: `translate(${mousePosition.x * 0.2}px, ${mousePosition.y * 0.2}px)` 
        }}
      >
        <div className="moon moon-1"></div>
        <div className="moon moon-2"></div>
        <div className="moon moon-3"></div>
      </div>

      {/* Shooting stars */}
      <div className="shooting-star shooting-star-1"></div>
      <div className="shooting-star shooting-star-2"></div>
      <div className="shooting-star shooting-star-3"></div>

      {/* Nebula clouds */}
      <div className="absolute inset-0 opacity-30">
        <div className="nebula nebula-1"></div>
        <div className="nebula nebula-2"></div>
      </div>

      {/* Additional flying vehicles */}
      <div className="space-shuttle-flying shuttle-fly-1"></div>
      <div className="space-rocket-flying rocket-fly-1"></div>
      <div className="space-shuttle-flying shuttle-fly-2"></div>
      <div className="space-rocket-flying rocket-fly-2"></div>
    </div>
  );
};