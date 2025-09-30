import { type MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { useState, useEffect } from "react";
import { DEFAULT_SYMBOL } from "@/utils/storage";
import { getPageMeta } from "@/utils/seo";
import { getRuntimeConfig } from "@/utils/runtime-config";
import { withBasePath } from "@/utils/base-path";

export const meta: MetaFunction = () => {
  const rootSeoTags = getPageMeta();
  const pageSpecificTags = [];

  const appName = getRuntimeConfig("VITE_APP_NAME");
  if (appName) {
    pageSpecificTags.push({ title: appName });
  }

  const appDescription = getRuntimeConfig("VITE_APP_DESCRIPTION");
  if (appDescription) {
    pageSpecificTags.push({ name: "description", content: appDescription });
  }

  return [...rootSeoTags, ...pageSpecificTags];
};

export default function Index() {
  const brokerName = getRuntimeConfig("VITE_ORDERLY_BROKER_NAME") || "BrownLiquid";

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [currentTicker, setCurrentTicker] = useState(0);

  const tickerTexts = [
    "Where every trade smells like victory",
    "Institutional-grade shit processing",
    "Faster than explosive diarrhea",
    "Watch jeets dump their bags like laxatives",
    "Deep liquid shit pools for maximum slippage",
    "Hot steaming piles of profit"
  ];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };

    const tickerInterval = setInterval(() => {
      setCurrentTicker(prev => (prev + 1) % tickerTexts.length);
    }, 2500);

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(tickerInterval);
    };
  }, [tickerTexts.length]);

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');

          .modern-page {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            background: #2D1B0C;
            color: #ffffff;
            min-height: 100vh;
            overflow-x: hidden;
          }

          .gradient-bg {
            background: radial-gradient(circle at 50% 0%, rgba(139, 69, 19, 0.3) 0%, transparent 50%),
                        radial-gradient(circle at 80% 20%, rgba(210, 105, 30, 0.2) 0%, transparent 50%),
                        radial-gradient(circle at 40% 40%, rgba(160, 82, 45, 0.25) 0%, transparent 50%),
                        #2D1B0C;
          }

          .hero-grid {
            position: absolute;
            inset: 0;
            background-image:
              linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
            background-size: 50px 50px;
            mask: radial-gradient(circle at center, black 20%, transparent 70%);
          }

          .text-gradient {
            background: linear-gradient(135deg, #ffffff 0%, #a1a1aa 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }

          .text-gradient-accent {
            background: linear-gradient(135deg, #D2691E 0%, #A0522D 50%, #8B4513 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }

          .btn-primary {
            background: linear-gradient(135deg, #FFD700 0%, #D2691E 50%, #8B4513 100%);
            border: 3px solid #FFD700;
            color: #000;
            font-weight: 800;
            font-size: 18px;
            text-transform: uppercase;
            letter-spacing: 1px;
            border-radius: 20px;
            padding: 20px 40px;
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            box-shadow:
              0 8px 30px rgba(255, 215, 0, 0.4),
              inset 0 1px 0 rgba(255, 255, 255, 0.3);
            text-decoration: none;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 12px;
            position: relative;
            overflow: hidden;
            min-width: 280px;
            text-align: center;
            white-space: nowrap;
          }

          .btn-primary::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
            transition: left 0.6s;
          }

          .btn-primary:hover::before {
            left: 100%;
          }

          .btn-primary:hover {
            transform: translateY(-4px) scale(1.05);
            box-shadow:
              0 15px 45px rgba(255, 215, 0, 0.6),
              0 0 20px rgba(255, 215, 0, 0.4),
              inset 0 1px 0 rgba(255, 255, 255, 0.5);
            color: #000;
            text-decoration: none;
            border-color: #FFED4E;
          }

          .btn-secondary {
            background: linear-gradient(135deg, rgba(139, 69, 19, 0.3) 0%, rgba(101, 67, 33, 0.3) 100%);
            border: 2px solid #D2691E;
            color: #FFD700;
            font-weight: 700;
            font-size: 18px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            border-radius: 20px;
            padding: 20px 40px;
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            text-decoration: none;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 12px;
            backdrop-filter: blur(15px);
            position: relative;
            overflow: hidden;
            min-width: 280px;
            text-align: center;
            box-shadow: 0 4px 15px rgba(210, 105, 30, 0.2);
          }

          .btn-secondary::after {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 0;
            height: 0;
            background: radial-gradient(circle, rgba(255, 215, 0, 0.1) 0%, transparent 70%);
            transition: all 0.4s ease;
            transform: translate(-50%, -50%);
          }

          .btn-secondary:hover::after {
            width: 300px;
            height: 300px;
          }

          .btn-secondary:hover {
            background: linear-gradient(135deg, rgba(139, 69, 19, 0.5) 0%, rgba(101, 67, 33, 0.5) 100%);
            border-color: #FFD700;
            transform: translateY(-3px) scale(1.02);
            color: #FFD700;
            text-decoration: none;
            box-shadow:
              0 8px 25px rgba(210, 105, 30, 0.4),
              0 0 15px rgba(255, 215, 0, 0.2);
          }

          .feature-card {
            background: rgba(255, 255, 255, 0.02);
            border: 1px solid rgba(255, 255, 255, 0.05);
            border-radius: 20px;
            padding: 32px;
            backdrop-filter: blur(10px);
            transition: all 0.4s ease;
            position: relative;
            overflow: hidden;
          }

          .feature-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 1px;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
            opacity: 0;
            transition: opacity 0.3s ease;
          }

          .feature-card:hover::before {
            opacity: 1;
          }

          .feature-card:hover {
            background: rgba(255, 255, 255, 0.05);
            border-color: rgba(255, 255, 255, 0.1);
            transform: translateY(-4px);
          }

          .stat-card {
            background: linear-gradient(135deg, rgba(255, 215, 0, 0.1) 0%, rgba(210, 105, 30, 0.1) 100%);
            border: 2px solid rgba(255, 215, 0, 0.3);
            border-radius: 24px;
            padding: 32px 24px;
            text-align: center;
            backdrop-filter: blur(20px);
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            position: relative;
            overflow: hidden;
          }

          .stat-card::before {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: conic-gradient(from 0deg, transparent, rgba(255, 215, 0, 0.1), transparent);
            animation: rotate 4s linear infinite;
            opacity: 0;
            transition: opacity 0.3s ease;
          }

          .stat-card:hover::before {
            opacity: 1;
          }

          .stat-card:hover {
            background: linear-gradient(135deg, rgba(255, 215, 0, 0.2) 0%, rgba(210, 105, 30, 0.2) 100%);
            border-color: rgba(255, 215, 0, 0.6);
            transform: translateY(-8px) scale(1.02);
            box-shadow: 0 15px 35px rgba(255, 215, 0, 0.2);
          }

          @keyframes rotate {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }

          /* Smooth animations for React components */
          @keyframes gentleFloat {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-10px) rotate(5deg); }
          }

          .floating-orb {
            position: absolute;
            width: 200px;
            height: 200px;
            border-radius: 50%;
            filter: blur(60px);
            opacity: 0.4;
            animation: float 6s ease-in-out infinite;
          }

          .floating-orb-1 {
            background: linear-gradient(135deg, #D2691E, #8B4513);
            top: 20%;
            left: 10%;
            animation-delay: 0s;
          }

          .floating-orb-2 {
            background: linear-gradient(135deg, #A0522D, #D2691E);
            top: 60%;
            right: 10%;
            animation-delay: 2s;
          }

          .floating-orb-3 {
            background: linear-gradient(135deg, #8B4513, #A0522D);
            bottom: 20%;
            left: 20%;
            animation-delay: 4s;
          }

          .ticker-text {
            font-size: 1.5rem;
            font-weight: 600;
            background: linear-gradient(135deg, #D2691E 0%, #A0522D 50%, #8B4513 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            animation: pulse 2s ease-in-out infinite;
          }

          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
          }

          .fade-in {
            opacity: 0;
            transform: translateY(30px);
            animation: fadeIn 0.8s ease forwards;
          }

          .fade-in-1 { animation-delay: 0.1s; }
          .fade-in-2 { animation-delay: 0.3s; }
          .fade-in-3 { animation-delay: 0.5s; }
          .fade-in-4 { animation-delay: 0.7s; }

          @keyframes fadeIn {
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 24px;
          }

          @media (max-width: 768px) {
            .container {
              padding: 0 16px;
            }
          }
        `
      }} />

      <div className="modern-page">
        {/* Hero Section */}
        <section className="gradient-bg relative min-h-screen flex items-center">
          <div className="hero-grid"></div>
          <div className="floating-orb floating-orb-1"></div>
          <div className="floating-orb floating-orb-2"></div>
          <div className="floating-orb floating-orb-3"></div>

          {/* Floating shit icons */}
          <div className="fixed pointer-events-none z-10 animate-bounce opacity-30" style={{left: '5%', top: '20%', animationDelay: '0s', animationDuration: '8s'}}>
            <span className="text-2xl">💩</span>
          </div>
          <div className="fixed pointer-events-none z-10 animate-bounce opacity-40" style={{right: '5%', top: '15%', animationDelay: '2s', animationDuration: '12s'}}>
            <span className="text-xl">🧻</span>
          </div>
          <div className="fixed pointer-events-none z-10 animate-bounce opacity-35" style={{right: '10%', bottom: '20%', animationDelay: '4s', animationDuration: '10s'}}>
            <span className="text-2xl">🚽</span>
          </div>

          <div className="container relative z-10">
            <div className="text-center">
              <div
                className="fade-in fade-in-1"
                style={{
                  transform: `translate(${mousePos.x * 0.5}px, ${mousePos.y * 0.5}px)`,
                  transition: 'transform 0.1s ease-out'
                }}
              >
                <img
                  src={withBasePath("/logo.webp")}
                  alt={brokerName}
                  className="h-32 md:h-40 mx-auto mb-8 opacity-90"
                />
              </div>

              <h1 className="fade-in fade-in-2 text-6xl md:text-8xl font-black mb-6 leading-relaxed" style={{lineHeight: '1.3', paddingBottom: '0.25rem'}}>
                <span className="text-gradient">The future of</span><br />
                <span className="text-gradient-accent flex items-center justify-center gap-3">
                  <span className="text-6xl">💩</span>
                  shit coining
                </span>
              </h1>

              <div className="fade-in fade-in-3 ticker-text mb-6">
                {tickerTexts[currentTicker]}
              </div>

              <div className="fade-in fade-in-3 flex justify-center mb-8">
                <a
                  href="https://x.com/BrownLiquidDex"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-400 hover:text-[#FFD700] transition-colors duration-300"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/>
                  </svg>
                  Follow @BrownLiquidDex
                </a>
              </div>

              <p className="fade-in fade-in-3 text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
                When jeets dump their bags, we process that liquid shit.<br /><br />
                Join other degens and flush your portfolio away with up to 100x leverage.
              </p>

              <div className="fade-in fade-in-4 flex flex-col lg:flex-row gap-8 justify-center items-center mb-20">
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-600 rounded-3xl blur opacity-30 group-hover:opacity-60 transition duration-1000 group-hover:duration-200"></div>
                  <Link to={`/perp/${DEFAULT_SYMBOL}`} className="btn-primary relative">
                    <span className="flex flex-col items-center">
                      <span>Launch Trading</span>
                      <span className="text-sm opacity-80 font-normal">Start Processing Shit</span>
                    </span>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 12h14m-7-7l7 7-7 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </Link>
                </div>

                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-amber-600 via-orange-600 to-yellow-600 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
                  <Link to="/markets" className="btn-secondary relative">
                    <span className="flex flex-col items-center">
                      <span>Explore Markets</span>
                      <span className="text-xs opacity-70 font-normal">Browse All Coins</span>
                    </span>
                  </Link>
                </div>
              </div>

              {/* Unique floating elements with interactive effects */}
              <div className="absolute top-1/4 left-10 w-4 h-4 bg-yellow-400 rounded-full opacity-60 animate-pulse hover:scale-150 transition-transform cursor-pointer"></div>
              <div className="absolute top-1/3 right-16 w-6 h-6 bg-orange-500 rounded-full opacity-40 animate-bounce hover:bg-yellow-300 transition-colors cursor-pointer" style={{animationDelay: '1s'}}></div>
              <div className="absolute bottom-1/4 left-1/4 w-3 h-3 bg-amber-600 rounded-full opacity-50 animate-ping hover:animate-spin transition-all cursor-pointer" style={{animationDelay: '2s'}}></div>

              {/* Unique animated background pattern */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-16 left-1/3 w-32 h-32 border border-yellow-400 rounded-full opacity-20 animate-spin" style={{animationDuration: '20s'}}></div>
                <div className="absolute bottom-32 right-1/4 w-24 h-24 border-2 border-orange-500 rounded-full opacity-30 animate-pulse"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-amber-600 rounded-full opacity-10 animate-spin" style={{animationDuration: '30s', animationDirection: 'reverse'}}></div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
                <div className="stat-card fade-in fade-in-3">
                  <div className="text-4xl font-black text-gradient-accent mb-2 flex items-center justify-center gap-3">
                    <span className="text-5xl">🧻</span>
                    420+
                  </div>
                  <div className="text-gray-400 font-medium">Brown trading pairs</div>
                </div>
                <div className="stat-card fade-in fade-in-4">
                  <div className="text-4xl font-black text-gradient-accent mb-2 flex items-center justify-center gap-3">
                    <span className="text-5xl">🚽</span>
                    99.9%
                  </div>
                  <div className="text-gray-400 font-medium">Successful shit processing</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-32 relative">
          <div className="container">
            <div className="text-center mb-20">
              <h2 className="text-5xl md:text-6xl font-black mb-6 text-gradient" style={{lineHeight: '1.3', paddingBottom: '0.25rem'}}>
                Why trade shit on {brokerName}?
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                The only exchange designed specifically for processing the brownest, most liquid shit in crypto.
                Advanced fiber optic shit processing technology.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="feature-card">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-600 to-amber-700 flex items-center justify-center mb-6">
                  <span className="text-3xl">⚡</span>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">Lightning-fast shit processing</h3>
                <p className="text-gray-400 leading-relaxed">
                  Sub-millisecond shit execution when jeets dump their bags.
                  Our advanced bowel matching engine processes liquid shit faster than your toilet.
                </p>
              </div>

              <div className="feature-card">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-600 to-orange-700 flex items-center justify-center mb-6">
                  <span className="text-3xl">🧻</span>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">Industrial-grade wiping</h3>
                <p className="text-gray-400 leading-relaxed">
                  100x leverage on the brownest coins. Non-custodial shit storage so you control your own crap.
                  No KYC because we already know you&apos;re full of shit.
                </p>
              </div>

              <div className="feature-card">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-700 to-amber-600 flex items-center justify-center mb-6">
                  <span className="text-3xl">🚽</span>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">Deepest shit pools</h3>
                <p className="text-gray-400 leading-relaxed">
                  Access the entire sewage network for maximum liquid shit capacity.
                  Deep brown liquidity pools with minimal slippage on all major shit pairs.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-32">
          <div className="container">
            <div className="text-center">
              <h2 className="text-5xl md:text-6xl font-black mb-6 text-gradient flex items-center justify-center gap-4" style={{lineHeight: '1.3', paddingBottom: '0.25rem'}}>
                Ready to start shitting?
                <span className="text-6xl">💩</span>
              </h2>
              <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
                Join degens flushing their life savings down {brokerName}.
              </p>

              <Link to={`/perp/${DEFAULT_SYMBOL}`} className="btn-primary text-lg px-12 py-5 flex items-center gap-3">
                <span className="text-2xl">🚽</span>
                Flush my portfolio
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12h14m-7-7l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>

              <div className="mt-8 flex justify-center space-x-8 text-sm text-gray-500">
                <span className="flex items-center">
                  <span className="mr-2">💩</span>
                  No TP required
                </span>
                <span className="flex items-center">
                  <span className="mr-2">🧻</span>
                  Connect any toilet
                </span>
                <span className="flex items-center">
                  <span className="mr-2">⏱️</span>
                  Shit in 30 seconds
                </span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
