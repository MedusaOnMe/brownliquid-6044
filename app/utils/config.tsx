import { useMemo } from "react";
import { useTranslation } from "@orderly.network/i18n";
import { TradingPageProps } from "@orderly.network/trading";
import { BottomNavProps, FooterProps, MainNavWidgetProps } from "@orderly.network/ui-scaffold";
import { AppLogos } from "@orderly.network/react-app";
import { OrderlyActiveIcon, OrderlyIcon } from "../components/icons/orderly";
import { withBasePath } from "./base-path";
import { PortfolioActiveIcon, PortfolioInactiveIcon, TradingActiveIcon, TradingInactiveIcon, LeaderboardActiveIcon, LeaderboardInactiveIcon, MarketsActiveIcon, MarketsInactiveIcon, useScreen, Flex, cn } from "@orderly.network/ui";
import { getRuntimeConfig, getRuntimeConfigBoolean, getRuntimeConfigNumber } from "./runtime-config";
import { Link } from "@remix-run/react";
import CustomLeftNav from "@/components/CustomLeftNav";
import { DEFAULT_SYMBOL } from "./storage";

interface MainNavItem {
  name: string;
  href: string;
  target?: string;
}

interface ColorConfigInterface {
  upColor?: string;
  downColor?: string;
  pnlUpColor?: string;
  pnlDownColor?: string;
  chartBG?: string;
  borderUpColor?: string;
  borderDownColor?: string;
  wickUpColor?: string;
  wickDownColor?: string;
}

export type OrderlyConfig = {
  orderlyAppProvider: {
    appIcons: AppLogos;
  };
  scaffold: {
    mainNavProps: MainNavWidgetProps;
    footerProps: FooterProps;
    bottomNavProps: BottomNavProps;
  };
  tradingPage: {
    tradingViewConfig: TradingPageProps["tradingViewConfig"];
    sharePnLConfig: TradingPageProps["sharePnLConfig"];
  };
};

const ALL_MENU_ITEMS = [
  { name: "Home", href: "/", translationKey: "common.home" },
  { name: "Trading", href: `/perp/${DEFAULT_SYMBOL}`, translationKey: "common.trading" },
  { name: "Portfolio", href: "/portfolio", translationKey: "common.portfolio" },
  { name: "Markets", href: "/markets", translationKey: "common.markets" },
  { name: "Rewards", href: "/rewards", translationKey: "tradingRewards.rewards" },
  { name: "Leaderboard", href: "/leaderboard", translationKey: "tradingLeaderboard.leaderboard" },
  { name: "Vaults", href: "/vaults", translationKey: "common.vaults" },
];

const DEFAULT_ENABLED_MENUS = [
  { name: "Home", href: "/", translationKey: "common.home" },
  { name: "Trading", href: `/perp/${DEFAULT_SYMBOL}`, translationKey: "common.trading" },
  { name: "Portfolio", href: "/portfolio", translationKey: "common.portfolio" },
  { name: "Markets", href: "/markets", translationKey: "common.markets" },
  { name: "Leaderboard", href: "/leaderboard", translationKey: "tradingLeaderboard.leaderboard" },
];

const getCustomMenuItems = (): MainNavItem[] => {
  const customMenusEnv = getRuntimeConfig('VITE_CUSTOM_MENUS');
  
  if (!customMenusEnv || typeof customMenusEnv !== 'string' || customMenusEnv.trim() === '') {
    return [];
  }
  
  try {
    // Parse delimiter-separated menu items
    // Expected format: "Documentation,https://docs.example.com;Blog,https://blog.example.com;Support,https://support.example.com"
    const menuPairs = customMenusEnv.split(';').map(pair => pair.trim()).filter(pair => pair.length > 0);
    
    const validCustomMenus: MainNavItem[] = [];
    
    for (const pair of menuPairs) {
      const [name, href] = pair.split(',').map(item => item.trim());
      
      if (!name || !href) {
        console.warn("Invalid custom menu item format. Expected 'name,url':", pair);
        continue;
      }
      
      validCustomMenus.push({
        name,
        href,
        target: "_blank",
      });
    }
    
    return validCustomMenus;
  } catch (e) {
    console.warn("Error parsing VITE_CUSTOM_MENUS:", e);
    return [];
  }
};

const getEnabledMenus = () => {
  const enabledMenusEnv = getRuntimeConfig('VITE_ENABLED_MENUS');
  
  if (!enabledMenusEnv || typeof enabledMenusEnv !== 'string' || enabledMenusEnv.trim() === '') {
    return DEFAULT_ENABLED_MENUS;
  }
  
  try {
    const enabledMenuNames = enabledMenusEnv.split(',').map(name => name.trim());
    
    const enabledMenus = [];
    for (const menuName of enabledMenuNames) {
      const menuItem = ALL_MENU_ITEMS.find(item => item.name === menuName);
      if (menuItem) {
        enabledMenus.push(menuItem);
      }
    }
    
    return enabledMenus.length > 0 ? enabledMenus : DEFAULT_ENABLED_MENUS;
  } catch (e) {
    console.warn("Error parsing VITE_ENABLED_MENUS:", e);
    return DEFAULT_ENABLED_MENUS;
  }
};

const getPnLBackgroundImages = (): string[] => {
  const useCustomPnL = getRuntimeConfigBoolean('VITE_USE_CUSTOM_PNL_POSTERS');
  
  if (useCustomPnL) {
    const customPnLCount = getRuntimeConfigNumber('VITE_CUSTOM_PNL_POSTER_COUNT');
    
    if (isNaN(customPnLCount) || customPnLCount < 1) {
      return [
        withBasePath("/pnl/poster_bg_1.png"),
        withBasePath("/pnl/poster_bg_2.png"),
        withBasePath("/pnl/poster_bg_3.png"),
        withBasePath("/pnl/poster_bg_4.png"),
      ];
    }
    
    const customPosters: string[] = [];
    for (let i = 1; i <= customPnLCount; i++) {
      customPosters.push(withBasePath(`/pnl/poster_bg_${i}.webp`));
    }
    
    return customPosters;
  }
  
  return [
    withBasePath("/pnl/poster_bg_1.png"),
    withBasePath("/pnl/poster_bg_2.png"),
    withBasePath("/pnl/poster_bg_3.png"),
    withBasePath("/pnl/poster_bg_4.png"),
  ];
};

const getBottomNavIcon = (menuName: string) => {
  switch (menuName) {
    case "Trading":
      return { activeIcon: <TradingActiveIcon />, inactiveIcon: <TradingInactiveIcon /> };
    case "Portfolio":
      return { activeIcon: <PortfolioActiveIcon />, inactiveIcon: <PortfolioInactiveIcon /> };
    case "Leaderboard":
      return { activeIcon: <LeaderboardActiveIcon />, inactiveIcon: <LeaderboardInactiveIcon /> };
    case "Markets":
      return { activeIcon: <MarketsActiveIcon />, inactiveIcon: <MarketsInactiveIcon /> };
    default:
      throw new Error(`Unsupported menu name: ${menuName}`);
  }
};

const getColorConfig = (): ColorConfigInterface | undefined => {
  const customColorConfigEnv = getRuntimeConfig('VITE_TRADING_VIEW_COLOR_CONFIG');

  // Return BrownLiquid themed colors with complete candle configuration
  const defaultConfig = {
    upColor: '#FFD700',        // Gold candle body for up
    downColor: '#FF6B35',      // Orange-red candle body for down
    borderUpColor: '#FFD700',  // Gold candle border for up
    borderDownColor: '#FF6B35', // Orange-red candle border for down
    wickUpColor: '#FFD700',    // Gold wick for up
    wickDownColor: '#FF6B35',  // Orange-red wick for down
    pnlUpColor: '#FFD700',     // Gold profit
    pnlDownColor: '#FF6B35',   // Orange-red loss
    chartBG: 'rgb(101, 67, 33)' // Brown chart background
  };

  if (!customColorConfigEnv || typeof customColorConfigEnv !== 'string' || customColorConfigEnv.trim() === '') {
    return defaultConfig;
  }

  try {
    const customColorConfig = JSON.parse(customColorConfigEnv);
    return { ...defaultConfig, ...customColorConfig };
  } catch (e) {
    console.warn("Error parsing VITE_TRADING_VIEW_COLOR_CONFIG:", e);
    return defaultConfig;
  }
};

export const useOrderlyConfig = () => {
  const { t } = useTranslation();
  const { isMobile } = useScreen();

  return useMemo<OrderlyConfig>(() => {
    const enabledMenus = getEnabledMenus();
    const customMenus = getCustomMenuItems();
    
    const translatedEnabledMenus = enabledMenus.map(menu => ({
      name: t(menu.translationKey),
      href: menu.href,
    }));
    
    const allMenuItems = [...translatedEnabledMenus, ...customMenus];
    
    const supportedBottomNavMenus = ["Trading", "Portfolio", "Markets", "Leaderboard"];
    const bottomNavMenus = enabledMenus
      .filter(menu => supportedBottomNavMenus.includes(menu.name))
      .map(menu => {
        const icons = getBottomNavIcon(menu.name);
        return {
          name: t(menu.translationKey),
          href: menu.href,
          ...icons
        };
      })
      .filter(menu => menu.activeIcon && menu.inactiveIcon);

    const mainNavProps: MainNavWidgetProps = {
      initialMenu: "/",
      mainMenus: allMenuItems,
    };

    if (getRuntimeConfigBoolean('VITE_ENABLE_CAMPAIGNS')) {
      mainNavProps.campaigns = {
        name: "$ORDER",
        href: "/rewards",
        children: [
          {
            name: t("extend.staking"),
            href: "https://app.orderly.network/staking",
            description: t("extend.staking.description"),
            icon: <OrderlyIcon size={14} />,
            activeIcon: <OrderlyActiveIcon size={14} />,
            target: "_blank",
          },
        ],
      };
    }

    mainNavProps.customRender = (components) => {
      return (
        <Flex justify="between" className="oui-w-full">
          <Flex
            itemAlign={"center"}
            className={cn(
              "oui-gap-3",
              "oui-overflow-hidden",
            )}
          >
            { isMobile && 
              <CustomLeftNav
                menus={translatedEnabledMenus}
                externalLinks={customMenus}
              />
            }
            <Link to="/" className="oui-flex oui-items-center">
              {getRuntimeConfigBoolean('VITE_HAS_PRIMARY_LOGO') || getRuntimeConfigBoolean('VITE_HAS_SECONDARY_LOGO')
                ? <img
                    src={withBasePath(isMobile ? "/logo-secondary.webp" : "/logo.webp")}
                    alt="BrownLiquid"
                    style={{
                      height: isMobile ? "40px" : "48px",
                      filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))"
                    }}
                  />
                : components.title}
              <span className={`oui-font-black ${isMobile ? 'oui-text-xl oui-ml-2' : 'oui-text-4xl oui-ml-4'}`} style={{
                background: "linear-gradient(135deg, #D2691E 0%, #CD853F 50%, #DEB887 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
                letterSpacing: "0.02em"
              }}>
                {getRuntimeConfig("VITE_ORDERLY_BROKER_NAME") || "BrownLiquid"}
              </span>
            </Link>
            {components.mainNav}
          </Flex>

          <Flex itemAlign={"center"} className="oui-gap-2">
            {components.accountSummary}
            {components.linkDevice}
            {components.scanQRCode}
            {components.languageSwitcher}
            {components.subAccount}
            {components.chainMenu}
            {components.walletConnect}
          </Flex>
        </Flex>
      )
    };

    return {
      scaffold: {
        mainNavProps,
        bottomNavProps: {
          mainMenus: bottomNavMenus,
        },
        footerProps: {
          telegramUrl: getRuntimeConfig('VITE_TELEGRAM_URL') || undefined,
          discordUrl: getRuntimeConfig('VITE_DISCORD_URL') || undefined,
          twitterUrl: getRuntimeConfig('VITE_TWITTER_URL') || undefined,
          trailing: null,
          poweredBy: false
        },
      },
      orderlyAppProvider: {
        appIcons: {
          main:
            getRuntimeConfigBoolean('VITE_HAS_PRIMARY_LOGO')
              ? { component: <img src={withBasePath("/logo.webp")} alt="logo" style={{ height: "42px" }} /> }
              : { img: withBasePath("/orderly-logo.svg") },
          secondary: {
            img: getRuntimeConfigBoolean('VITE_HAS_SECONDARY_LOGO')
              ? withBasePath("/logo-secondary.webp")
              : withBasePath("/orderly-logo-secondary.svg"),
          },
        },
      },
      tradingPage: {
        tradingViewConfig: {
          scriptSRC: withBasePath("/tradingview/charting_library/charting_library.js"),
          library_path: withBasePath("/tradingview/charting_library/"),
          customCssUrl: withBasePath("/tradingview/chart.css"),
          colorConfig: getColorConfig(),
          theme: "dark",
          loading_screen: {
            backgroundColor: "#654321",
            foregroundColor: "#FFD700"
          },
          overrides: {
            // Main chart background
            "paneProperties.background": "#654321",
            "paneProperties.backgroundType": "solid",

            // Chart area backgrounds
            "chartProperties.background": "#654321",
            "chartProperties.backgroundType": "solid",

            // Scale backgrounds
            "scalesProperties.backgroundColor": "#8B4513",
            "scalesProperties.textColor": "#FFFFFF",
            "scalesProperties.fontSize": 12,

            // Time scale
            "timeScale.backgroundColor": "#8B4513",
            "timeScale.textColor": "#FFFFFF",

            // Price scale
            "priceScale.backgroundColor": "#8B4513",
            "priceScale.textColor": "#FFFFFF",

            // Legend
            "legendProperties.showStudyArguments": false,
            "legendProperties.showStudyTitles": false,
            "legendProperties.showStudyValues": false,
            "legendProperties.showSeriesTitle": false,

            // Grid lines
            "paneProperties.vertGridProperties.color": "#8B4513",
            "paneProperties.horzGridProperties.color": "#8B4513",
            "paneProperties.vertGridProperties.style": 0,
            "paneProperties.horzGridProperties.style": 0,

            // Candle colors
            "mainSeriesProperties.candleStyle.upColor": "#FFD700",
            "mainSeriesProperties.candleStyle.downColor": "#FF6B35",
            "mainSeriesProperties.candleStyle.borderUpColor": "#FFD700",
            "mainSeriesProperties.candleStyle.borderDownColor": "#FF6B35",
            "mainSeriesProperties.candleStyle.wickUpColor": "#FFD700",
            "mainSeriesProperties.candleStyle.wickDownColor": "#FF6B35",

            // Toolbar
            "toolbar_bg": "#654321",
            "volumePaneSize": "medium"
          },
          disabled_features: [
            "use_localstorage_for_settings",
            "right_toolbar"
          ],
          enabled_features: [
            "study_templates"
          ]
        },
        sharePnLConfig: {
          backgroundImages: getPnLBackgroundImages(),
          color: "rgba(255, 255, 255, 0.98)",
          profitColor: "#FFD700",
          lossColor: "#FF6B35",
          brandColor: "rgb(222, 184, 135)",
          // ref
          refLink: typeof window !== 'undefined' ? window.location.origin : undefined,
          refSlogan: getRuntimeConfig('VITE_ORDERLY_BROKER_NAME') || "BrownLiquid",
        },
      },
    };
  }, [t, isMobile]);
};
