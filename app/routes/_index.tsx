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
    "💩 Where every trade smells like victory",
    "🚽 Institutional-grade shit processing",
    "⚡ Faster than explosive diarrhea",
    "💸 Watch jeets dump their bags like laxatives",
    "🎯 Deep liquid shit pools for maximum slippage",
    "🔥 Hot steaming piles of profit"
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
            background: linear-gradient(135deg, #D2691E 0%, #8B4513 100%);
            border: none;
            color: white;
            font-weight: 600;
            border-radius: 12px;
            padding: 16px 32px;
            font-size: 16px;
            transition: all 0.3s ease;
            box-shadow: 0 4px 20px rgba(210, 105, 30, 0.4);
            text-decoration: none;
            display: inline-flex;
            align-items: center;
            gap: 8px;
          }

          .btn-primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 30px rgba(210, 105, 30, 0.6);
            color: white;
            text-decoration: none;
          }

          .btn-secondary {
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.1);
            color: white;
            font-weight: 600;
            border-radius: 12px;
            padding: 16px 32px;
            font-size: 16px;
            transition: all 0.3s ease;
            text-decoration: none;
            display: inline-flex;
            align-items: center;
            backdrop-filter: blur(10px);
          }

          .btn-secondary:hover {
            background: rgba(255, 255, 255, 0.1);
            border-color: rgba(255, 255, 255, 0.2);
            transform: translateY(-1px);
            color: white;
            text-decoration: none;
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
            background: rgba(255, 255, 255, 0.03);
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 16px;
            padding: 24px;
            text-align: center;
            backdrop-filter: blur(20px);
            transition: all 0.3s ease;
          }

          .stat-card:hover {
            background: rgba(255, 255, 255, 0.06);
            border-color: rgba(210, 105, 30, 0.3);
            transform: translateY(-2px);
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
                  className="h-16 mx-auto mb-8 opacity-90"
                />
              </div>

              <h1 className="fade-in fade-in-2 text-6xl md:text-8xl font-black mb-6 leading-tight">
                <span className="text-gradient">The future of</span><br />
                <span className="text-gradient-accent">💩 shit coining</span>
              </h1>

              <div className="fade-in fade-in-3 ticker-text mb-8">
                {tickerTexts[currentTicker]}
              </div>

              <p className="fade-in fade-in-3 text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
                Trade the brownest coins with the deepest shit liquidity pools in DeFi.
                When jeets dump their bags, we process that liquid shit faster than your digestive system.
              </p>

              <div className="fade-in fade-in-4 flex flex-col sm:flex-row gap-6 justify-center mb-20">
                <Link to={`/perp/${DEFAULT_SYMBOL}`} className="btn-primary">
                  💩 Start shit trading
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12h14m-7-7l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
                <Link to="/markets" className="btn-secondary">
                  🧻 Browse shit coins
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                <div className="stat-card fade-in fade-in-2">
                  <div className="text-4xl font-black text-gradient-accent mb-2">💩 $2.5B+</div>
                  <div className="text-gray-400 font-medium">Shit coins processed daily</div>
                </div>
                <div className="stat-card fade-in fade-in-3">
                  <div className="text-4xl font-black text-gradient-accent mb-2">🧻 420+</div>
                  <div className="text-gray-400 font-medium">Brown trading pairs</div>
                </div>
                <div className="stat-card fade-in fade-in-4">
                  <div className="text-4xl font-black text-gradient-accent mb-2">🚽 99.9%</div>
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
              <h2 className="text-5xl md:text-6xl font-black mb-6 text-gradient">
                Why shit trade on {brokerName}?
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                The only exchange designed specifically for processing the brownest, most liquid shit in crypto.
                Advanced fiber optic shit processing technology.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="feature-card">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-600 to-amber-700 flex items-center justify-center mb-6 text-2xl">
                  💩
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">Lightning-fast shit processing</h3>
                <p className="text-gray-400 leading-relaxed">
                  Sub-millisecond shit execution when jeets dump their bags.
                  Our advanced bowel matching engine processes liquid shit faster than your toilet.
                </p>
              </div>

              <div className="feature-card">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-600 to-orange-700 flex items-center justify-center mb-6 text-2xl">
                  🧻
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">Industrial-grade wiping</h3>
                <p className="text-gray-400 leading-relaxed">
                  100x leverage on the brownest coins. Non-custodial shit storage so you control your own crap.
                  No KYC because we already know you&apos;re full of shit.
                </p>
              </div>

              <div className="feature-card">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-700 to-amber-600 flex items-center justify-center mb-6 text-2xl">
                  🚽
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">Deepest shit pools</h3>
                <p className="text-gray-400 leading-relaxed">
                  Access the entire Orderly sewage network for maximum liquid shit capacity.
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
              <h2 className="text-5xl md:text-6xl font-black mb-6 text-gradient">
                Ready to start shitting? 💩
              </h2>
              <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
                Join thousands of degens already flushing their life savings down {brokerName}.
              </p>

              <Link to={`/perp/${DEFAULT_SYMBOL}`} className="btn-primary text-lg px-12 py-5">
                🚽 Flush my portfolio
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12h14m-7-7l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>

              <div className="mt-8 flex justify-center space-x-8 text-sm text-gray-500">
                <span className="flex items-center">
                  <span className="text-yellow-400 mr-2">💩</span>
                  No TP required
                </span>
                <span className="flex items-center">
                  <span className="text-yellow-400 mr-2">🧻</span>
                  Connect any toilet
                </span>
                <span className="flex items-center">
                  <span className="text-yellow-400 mr-2">⏱️</span>
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
