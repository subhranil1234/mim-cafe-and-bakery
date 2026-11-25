import React, { useCallback, useEffect, useState } from 'react';
import { AmbienceProvider } from './context/AmbienceContext';
import { OrderProvider } from './context/OrderContext';
import { useRevealObserver } from './hooks/useRevealObserver';
import { CreativeExperience } from './data/experiences';
import { ParallaxBackdrop } from './components/motion/ParallaxBackdrop';
import { Navbar } from './components/layout/Navbar';
import { Preloader } from './sections/Preloader';
import { Hero } from './sections/Hero';
import { CafeStory } from './sections/CafeStory';
import { FoodDiscovery } from './sections/FoodDiscovery';
import { MenuPortal } from './sections/MenuPortal';
import { Bakery } from './sections/Bakery';
import { CreativeStudio } from './sections/CreativeStudio';
import { ExperienceEnquiry } from './sections/ExperienceEnquiry';
import { Gallery } from './sections/Gallery';
import { Visit } from './sections/Visit';
import { Footer } from './sections/Footer';
import { MenuPage } from './pages/MenuPage';
import { BakeryPage } from './pages/BakeryPage';

type RouteView = 'home' | 'menu' | 'bakery';

function getRouteFromLocation(): RouteView {
  if (typeof window === 'undefined') return 'home';
  const clean = window.location.pathname.replace(/\/+$/, '');
  if (clean === '/menu') return 'menu';
  if (clean === '/bakery') return 'bakery';
  return 'home';
}

const StoryExperience: React.FC<{
  onOpenMenu: () => void;
  onOpenBakery: () => void;
  skipPreloader: boolean;
}> = ({ onOpenMenu, onOpenBakery, skipPreloader }) => {
  const [preloaderDone, setPreloaderDone] = useState(skipPreloader);
  const [selectedExperienceId, setSelectedExperienceId] =
    useState<CreativeExperience['id']>('cake-decorating');

  useRevealObserver();

  const handlePreloaderComplete = useCallback(() => {
    setPreloaderDone(true);
  }, []);

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>

      {!skipPreloader && <Preloader onComplete={handlePreloaderComplete} />}
      <ParallaxBackdrop />
      <Navbar onOpenMenu={onOpenMenu} onOpenBakery={onOpenBakery} />

      <main id="main-content" className="story-main">
        <Hero ready={preloaderDone} />
        <CafeStory />
        <FoodDiscovery onOpenMenu={onOpenMenu} />
        <MenuPortal onOpenMenu={onOpenMenu} />
        <Bakery onOpenBakery={onOpenBakery} />
        <CreativeStudio onSelectExperience={setSelectedExperienceId} />
        <ExperienceEnquiry
          selectedExperienceId={selectedExperienceId}
          onChangeExperience={setSelectedExperienceId}
        />
        <Gallery />
        <Visit />
      </main>

      <Footer onOpenMenu={onOpenMenu} onOpenBakery={onOpenBakery} />
    </>
  );
};

const RouterShell: React.FC = () => {
  const [route, setRoute] = useState<RouteView>(getRouteFromLocation);
  const [hasVisitedHome, setHasVisitedHome] = useState(
    () => getRouteFromLocation() !== 'home',
  );

  useEffect(() => {
    const onPopState = () => {
      setRoute(getRouteFromLocation());
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const openMenu = useCallback(() => {
    setHasVisitedHome(true);
    if (window.location.pathname !== '/menu') {
      window.history.pushState({}, '', '/menu');
    }
    setRoute('menu');
  }, []);

  const openBakery = useCallback(() => {
    setHasVisitedHome(true);
    if (window.location.pathname !== '/bakery') {
      window.history.pushState({}, '', '/bakery');
    }
    setRoute('bakery');
  }, []);

  const backHome = useCallback(() => {
    setHasVisitedHome(true);
    if (window.location.pathname !== '/') {
      window.history.pushState({}, '', '/');
    }
    setRoute('home');
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  if (route === 'menu') {
    return (
      <>
        <ParallaxBackdrop />
        <MenuPage onBackHome={backHome} />
      </>
    );
  }

  if (route === 'bakery') {
    return (
      <>
        <ParallaxBackdrop />
        <BakeryPage onBackHome={backHome} />
      </>
    );
  }

  return (
    <StoryExperience
      onOpenMenu={openMenu}
      onOpenBakery={openBakery}
      skipPreloader={hasVisitedHome}
    />
  );
};

export const App: React.FC = () => {
  return (
    <AmbienceProvider>
      <OrderProvider>
        <RouterShell />
      </OrderProvider>
    </AmbienceProvider>
  );
};

export default App;
