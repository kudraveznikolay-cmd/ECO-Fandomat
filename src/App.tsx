import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, ChevronRight, Leaf, Recycle, Lightbulb, 
  TrendingUp, Award, Package, Trash2, CheckCircle, 
  Zap, Shield, Heart, Target, BarChart3, Globe, Star, Users
} from 'lucide-react';

// ============ SLIDES DATA ============
const slides = [
  { id: 'hero', title: 'Главная' },
  { id: 'problem', title: 'Проблема' },
  { id: 'solution', title: 'Решение' },
  { id: 'how-it-works', title: 'Как работает' },
  { id: 'materials', title: 'Материалы' },
  { id: 'tech', title: 'Технологии' },
  { id: 'impact', title: 'Влияние' },
  { id: 'economics', title: 'Экономика' },
  { id: 'future', title: 'Перспективы' },
];

function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);

  const goToSlide = useCallback((index: number) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
  }, [currentSlide]);

  const nextSlide = useCallback(() => {
    if (currentSlide < slides.length - 1) {
      setDirection(1);
      setCurrentSlide(prev => prev + 1);
    }
  }, [currentSlide]);

  const prevSlide = useCallback(() => {
    if (currentSlide > 0) {
      setDirection(-1);
      setCurrentSlide(prev => prev - 1);
    }
  }, [currentSlide]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') {
        e.preventDefault();
        nextSlide();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        prevSlide();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  // Touch/swipe support
  useEffect(() => {
    let touchStartX = 0;
    let touchEndX = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.changedTouches[0].screenX;
    };
    const handleTouchEnd = (e: TouchEvent) => {
      touchEndX = e.changedTouches[0].screenX;
      const diff = touchStartX - touchEndX;
      if (Math.abs(diff) > 50) {
        if (diff > 0) nextSlide();
        else prevSlide();
      }
    };

    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchend', handleTouchEnd);
    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [nextSlide, prevSlide]);

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? '-100%' : '100%',
      opacity: 0,
      scale: 0.95,
    }),
  };

  return (
    <div className="h-screen w-screen overflow-hidden relative bg-[#0a1628]">
      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-white/5 z-50">
        <motion.div
          className="h-full bg-gradient-to-r from-green-500 to-emerald-400"
          animate={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Top navigation bar */}
      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-4 py-2 rounded-full bg-black/40 backdrop-blur-md border border-white/10">
        <Award className="w-4 h-4 text-yellow-400" />
        <span className="text-xs text-gray-300 hidden sm:inline">100 идей для Беларуси</span>
        <span className="text-xs text-gray-500 mx-2">|</span>
        <span className="text-xs text-green-400 font-medium">
          {currentSlide + 1} / {slides.length}
        </span>
      </div>

      {/* Slide content */}
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={currentSlide}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="h-full w-full"
        >
          {currentSlide === 0 && <HeroSlide />}
          {currentSlide === 1 && <ProblemSlide />}
          {currentSlide === 2 && <SolutionSlide />}
          {currentSlide === 3 && <HowItWorksSlide />}
          {currentSlide === 4 && <MaterialsSlide />}
          {currentSlide === 5 && <TechSlide />}
          {currentSlide === 6 && <ImpactSlide />}
          {currentSlide === 7 && <EconomicsSlide />}
          {currentSlide === 8 && <FutureSlide />}
        </motion.div>
      </AnimatePresence>

      {/* Navigation arrows */}
      <button
        onClick={prevSlide}
        disabled={currentSlide === 0}
        className="fixed left-4 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all disabled:opacity-20 disabled:cursor-not-allowed backdrop-blur-sm"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>
      <button
        onClick={nextSlide}
        disabled={currentSlide === slides.length - 1}
        className="fixed right-4 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all disabled:opacity-20 disabled:cursor-not-allowed backdrop-blur-sm"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>

      {/* Bottom dots navigation */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-4 py-2 rounded-full bg-black/40 backdrop-blur-md border border-white/10">
        {slides.map((slide, i) => (
          <button
            key={slide.id}
            onClick={() => goToSlide(i)}
            className={`transition-all duration-300 rounded-full ${
              i === currentSlide
                ? 'w-8 h-3 bg-green-400'
                : 'w-3 h-3 bg-white/20 hover:bg-white/40'
            }`}
            title={slide.title}
          />
        ))}
      </div>

      {/* Keyboard hint */}
      <div className="fixed bottom-6 right-6 z-50 hidden md:flex items-center gap-1 text-xs text-gray-500">
        <kbd className="px-2 py-1 rounded bg-white/5 border border-white/10">←</kbd>
        <kbd className="px-2 py-1 rounded bg-white/5 border border-white/10">→</kbd>
        <span className="ml-1">навигация</span>
      </div>
    </div>
  );
}

// ============ SLIDE 1: HERO ============
function HeroSlide() {
  return (
    <div className="h-full w-full flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a1628] via-[#0f2318] to-[#0a1628]" />
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-72 h-72 bg-green-500 rounded-full blur-[100px]" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-emerald-600 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-yellow-500 rounded-full blur-[80px] opacity-30" />
      </div>

      {/* Particles */}
      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          className="particle"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 4}s`,
          }}
        />
      ))}

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8">
            <Award className="w-4 h-4 text-yellow-400" />
            <span className="text-sm text-gray-300">Конкурс «100 идей для Беларуси»</span>
          </div>

          <h1 className="font-montserrat text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight">
            <span className="gradient-text">ЭКО-ФАНДОМАТ</span>
          </h1>
          <h2 className="text-2xl md:text-4xl text-white/90 mb-6 font-light">
            для упаковки яиц
          </h2>
          <p className="text-base md:text-lg text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Инновационное устройство для автоматизированного приёма и сортировки 
            использованной яичной упаковки из картона, пластика и пенопласта
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <div className="px-5 py-3 rounded-xl bg-green-500/10 border border-green-500/30 flex items-center gap-2">
              <Package className="w-5 h-5 text-green-400" />
              <span className="text-green-300 text-sm font-medium">3 материала</span>
            </div>
            <div className="px-5 py-3 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center gap-2">
              <Zap className="w-5 h-5 text-blue-400" />
              <span className="text-blue-300 text-sm font-medium">AI-сортировка</span>
            </div>
            <div className="px-5 py-3 rounded-xl bg-yellow-500/10 border border-yellow-500/30 flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-400" />
              <span className="text-yellow-300 text-sm font-medium">Бонусы</span>
            </div>
          </div>
        </motion.div>

        {/* Fundomat image */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-10"
        >
          <img 
            src="https://image.qwenlm.ai/generated-images/e4122740-1935-4953-bb7c-ad952f3f2654/_result.png" 
            alt="ЭКО-Фандомат" 
            className="w-full max-w-xl mx-auto rounded-2xl shadow-2xl shadow-green-500/20 border border-green-500/20"
          />
        </motion.div>
      </div>
    </div>
  );
}

// ============ SLIDE 2: PROBLEM ============
function ProblemSlide() {
  return (
    <div className="h-full w-full flex items-center justify-center relative overflow-hidden px-4">
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a0a0a] via-[#0a1628] to-[#0a1628]" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-red-500/10 rounded-full blur-[120px]" />
      
      <div className="relative z-10 max-w-5xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 mb-4">
            <Trash2 className="w-4 h-4 text-red-400" />
            <span className="text-sm text-red-300">Проблема</span>
          </div>
          <h2 className="font-montserrat text-3xl md:text-5xl font-bold">
            Миллиарды упаковок <span className="text-red-400">в мусоре</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {[
            { number: '2 млрд', label: 'яиц продаётся в Беларуси ежегодно', icon: '🥚' },
            { number: '85%', label: 'упаковок не перерабатывается', icon: '🗑️' },
            { number: '5000 т', label: 'отходов ежегодно', icon: '🌍' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
              className="glass-card p-6 text-center border border-red-500/20 bg-red-500/5"
            >
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-3xl md:text-4xl font-black text-red-400 mb-2">{stat.number}</div>
              <p className="text-gray-400 text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="glass-card p-6"
        >
          <h3 className="text-lg font-bold mb-4 text-red-300">Почему это важно?</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              'Картонная упаковка разлагается 2-5 лет, выделяя метан',
              'Пластиковая — до 450 лет, распадаясь на микропластик',
              'Пенопластовая практически не разлагается',
              'Смешанные отходы сложно и дорого сортировать',
              'Отсутствие инфраструктуры для сбора яичной упаковки',
              'Упущенная экономическая ценность вторсырья',
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + i * 0.05 }}
                className="flex items-start gap-3"
              >
                <div className="w-2 h-2 rounded-full bg-red-400 mt-2 flex-shrink-0" />
                <span className="text-gray-300 text-sm">{item}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// ============ SLIDE 3: SOLUTION ============
function SolutionSlide() {
  return (
    <div className="h-full w-full flex items-center justify-center relative overflow-hidden px-4">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a1628] via-[#0a1a12] to-[#0a1628]" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-green-500/10 rounded-full blur-[120px]" />
      
      <div className="relative z-10 max-w-5xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 mb-4">
            <Lightbulb className="w-4 h-4 text-green-400" />
            <span className="text-sm text-green-300">Решение</span>
          </div>
          <h2 className="font-montserrat text-3xl md:text-5xl font-bold mb-3">
            <span className="gradient-text">ЭКО-Фандомат</span>
          </h2>
          <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto">
            Автоматизированное устройство для приёма, идентификации и сортировки 
            использованной упаковки яиц с мотивацией через систему бонусов
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { icon: <Recycle className="w-6 h-6" />, title: '3 материала', desc: 'Картон, пластик, пена' },
            { icon: <Zap className="w-6 h-6" />, title: 'Автоматика', desc: 'AI-распознавание' },
            { icon: <Heart className="w-6 h-6" />, title: 'Бонусы', desc: 'Баллы за сдачу' },
            { icon: <Shield className="w-6 h-6" />, title: 'На 10 яиц', desc: 'Стандартный формат' },
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
              className="glass-card-green p-5 text-center hover:scale-105 transition-transform"
            >
              <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-3 text-green-400">
                {feature.icon}
              </div>
              <h3 className="font-bold text-sm mb-1">{feature.title}</h3>
              <p className="text-gray-400 text-xs">{feature.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="glass-card p-6 glow-green"
        >
          <h3 className="text-lg font-bold mb-4 text-center">Ключевая ценность</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl mb-2">🌱</div>
              <h4 className="font-semibold text-green-400 text-sm mb-1">Экология</h4>
              <p className="text-gray-400 text-xs">Снижение отходов и раздельный сбор</p>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-2">💰</div>
              <h4 className="font-semibold text-yellow-400 text-sm mb-1">Экономика</h4>
              <p className="text-gray-400 text-xs">Вторсырьё для производителей</p>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-2">👥</div>
              <h4 className="font-semibold text-blue-400 text-sm mb-1">Общество</h4>
              <p className="text-gray-400 text-xs">Экологическая культура</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// ============ SLIDE 4: HOW IT WORKS ============
function HowItWorksSlide() {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep(prev => (prev + 1) % 5);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const steps = [
    { title: 'Поднесите упаковку', desc: 'Пользователь подносит упаковку на 10 яиц к приёмному отверстию', icon: '📦' },
    { title: 'Сканирование', desc: 'Датчики определяют тип: картон, пластик или пенопласт', icon: '🔍' },
    { title: 'Приём', desc: 'Упаковка принимается и направляется в соответствующий контейнер', icon: '⬇️' },
    { title: 'Начисление бонусов', desc: 'На экране отображаются начисленные баллы', icon: '⭐' },
    { title: 'Сортировка', desc: 'Упаковка хранится раздельно до вывоза переработчиком', icon: '♻️' },
  ];

  return (
    <div className="h-full w-full flex items-center justify-center relative overflow-hidden px-4">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a1628] via-[#0a1a12] to-[#0a1628]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[100px]" />
      
      <div className="relative z-10 max-w-5xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-4">
            <Target className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-blue-300">Как это работает</span>
          </div>
          <h2 className="font-montserrat text-3xl md:text-5xl font-bold">
            Процесс работы <span className="gradient-text">фандомата</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Steps */}
          <div className="space-y-3">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                onClick={() => setActiveStep(i)}
                className={`p-3 rounded-xl cursor-pointer transition-all ${
                  activeStep === i 
                    ? 'glass-card-green glow-green' 
                    : 'hover:bg-white/5 bg-white/[0.02]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center text-base ${
                    activeStep === i ? 'bg-green-500/20' : 'bg-white/5'
                  }`}>
                    {step.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className={`font-semibold text-sm ${activeStep === i ? 'text-green-400' : 'text-gray-300'}`}>
                      {step.title}
                    </h4>
                    {activeStep === i && (
                      <p className="text-gray-400 text-xs mt-0.5">{step.desc}</p>
                    )}
                  </div>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs ${
                    activeStep === i ? 'bg-green-500 text-white' : 'bg-white/10 text-gray-500'
                  }`}>
                    {i + 1}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Visualization */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="glass-card p-6 relative">
              <div className="relative h-64 flex items-center justify-center">
                {/* Fundomat */}
                <div className="relative w-40 h-56 rounded-2xl bg-gradient-to-b from-gray-700 to-gray-800 border border-gray-600 shadow-xl">
                  <div className="absolute top-3 left-1/2 -translate-x-1/2 w-28 h-20 rounded-lg bg-green-950 border border-green-700 flex items-center justify-center">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeStep}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="text-center"
                      >
                        <div className="text-xl">{steps[activeStep].icon}</div>
                        <p className="text-green-400 text-[9px] font-medium mt-1">{steps[activeStep].title}</p>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                  <div className="absolute top-[52%] left-1/2 -translate-x-1/2 w-24 h-5 rounded bg-gray-900 border border-gray-600" />
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-28 h-20 rounded-lg bg-gray-900/80 border border-gray-600 p-1.5">
                    <div className="grid grid-cols-3 gap-1 h-full">
                      <div className={`rounded border transition-all ${activeStep >= 2 ? 'border-[#c4956a] bg-[#c4956a]/20' : 'border-gray-700 bg-gray-800'}`}>
                        <p className="text-[6px] text-center mt-0.5 text-[#c4956a]">Картон</p>
                      </div>
                      <div className={`rounded border transition-all ${activeStep >= 2 ? 'border-[#5dade2] bg-[#5dade2]/20' : 'border-gray-700 bg-gray-800'}`}>
                        <p className="text-[6px] text-center mt-0.5 text-[#5dade2]">Пластик</p>
                      </div>
                      <div className={`rounded border transition-all ${activeStep >= 2 ? 'border-gray-400 bg-gray-400/20' : 'border-gray-700 bg-gray-800'}`}>
                        <p className="text-[6px] text-center mt-0.5 text-gray-400">Пена</p>
                      </div>
                    </div>
                  </div>
                  <div className={`absolute top-0 left-0 right-0 h-1 rounded-t-2xl transition-all ${
                    activeStep === 1 ? 'bg-yellow-400 animate-pulse' : 
                    activeStep >= 2 ? 'bg-green-400' : 'bg-blue-400 animate-pulse'
                  }`} />
                </div>

                <AnimatePresence>
                  {activeStep === 3 && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute top-2 right-2 px-3 py-1.5 rounded-lg bg-yellow-500/20 border border-yellow-500/40"
                    >
                      <p className="text-yellow-400 text-xs font-bold">+5 баллов!</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

// ============ SLIDE 5: MATERIALS ============
function MaterialsSlide() {
  const materials = [
    {
      type: 'Картонная',
      color: '#c4956a',
      bgColor: 'bg-[#c4956a]/10',
      borderColor: 'border-[#c4956a]/30',
      textColor: 'text-[#c4956a]',
      icon: '📦',
      desc: 'Прессованный картон',
      properties: ['Биоразлагаемая', 'Легко перерабатывается', '2-5 лет разложения'],
      share: '60%',
    },
    {
      type: 'Пластиковая',
      color: '#5dade2',
      bgColor: 'bg-[#5dade2]/10',
      borderColor: 'border-[#5dade2]/30',
      textColor: 'text-[#5dade2]',
      icon: '🧊',
      desc: 'ПЭТ / полистирол',
      properties: ['Прочная', 'Прозрачная', '450+ лет разложения'],
      share: '30%',
    },
    {
      type: 'Пенопластовая',
      color: '#bdc3c7',
      bgColor: 'bg-gray-400/10',
      borderColor: 'border-gray-400/30',
      textColor: 'text-gray-300',
      icon: '🫧',
      desc: 'Вспененный полистирол',
      properties: ['Лёгкая', 'Хрупкая', 'Не разлагается'],
      share: '10%',
    },
  ];

  return (
    <div className="h-full w-full flex items-center justify-center relative overflow-hidden px-4">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a1628] via-[#1a1a2e] to-[#0a1628]" />
      
      <div className="relative z-10 max-w-5xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-4">
            <Package className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-purple-300">Типы упаковки</span>
          </div>
          <h2 className="font-montserrat text-3xl md:text-5xl font-bold">
            3 вида <span className="gradient-text">материалов</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5">
          {materials.map((mat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.15 }}
              className={`glass-card p-5 ${mat.bgColor} ${mat.borderColor} border material-card`}
            >
              <div className="text-center mb-3">
                <div className="text-3xl mb-2">{mat.icon}</div>
                <h3 className={`text-lg font-bold ${mat.textColor}`}>{mat.type}</h3>
                <p className="text-gray-400 text-xs">{mat.desc}</p>
              </div>

              <div className="mb-3">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-400">Доля рынка</span>
                  <span className={mat.textColor}>{mat.share}</span>
                </div>
                <div className="w-full h-2 rounded-full bg-gray-800">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: mat.share }}
                    transition={{ duration: 1, delay: 0.5 + i * 0.2 }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: mat.color }}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                {mat.properties.map((prop, j) => (
                  <div key={j} className="flex items-center gap-2">
                    <CheckCircle className={`w-3.5 h-3.5 ${mat.textColor} flex-shrink-0`} />
                    <span className="text-gray-300 text-xs">{prop}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-6 text-center"
        >
          <p className="text-gray-400 text-sm">
            Фандомат принимает все три типа упаковки <span className="text-green-400 font-medium">на 10 яиц</span> — стандартный формат
          </p>
        </motion.div>
      </div>
    </div>
  );
}

// ============ SLIDE 6: TECH ============
function TechSlide() {
  return (
    <div className="h-full w-full flex items-center justify-center relative overflow-hidden px-4">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a1628] via-[#1a1a2e] to-[#0a1628]" />
      <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-[100px]" />
      
      <div className="relative z-10 max-w-5xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-4">
            <Zap className="w-4 h-4 text-cyan-400" />
            <span className="text-sm text-cyan-300">Технологии</span>
          </div>
          <h2 className="font-montserrat text-3xl md:text-5xl font-bold">
            Техническая <span className="gradient-text">начинка</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-5">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="glass-card p-5"
          >
            <h3 className="text-base font-bold mb-4 flex items-center gap-2">
              <span className="text-cyan-400">⚙️</span> Аппаратная часть
            </h3>
            <div className="space-y-2">
              {[
                { label: 'Корпус', value: 'Нерж. сталь, 120×60×180 см' },
                { label: 'Приёмное окно', value: '40×15 см' },
                { label: 'Датчики', value: 'Оптические + весовые' },
                { label: 'Процессор', value: 'Raspberry Pi 4' },
                { label: 'Дисплей', value: '7" сенсорный IPS' },
                { label: 'Контейнеры', value: '3 × 200 упаковок' },
              ].map((item, i) => (
                <div key={i} className="flex justify-between items-center py-1.5 border-b border-white/5">
                  <span className="text-gray-400 text-xs">{item.label}</span>
                  <span className="text-gray-200 text-xs font-medium">{item.value}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="glass-card p-5"
          >
            <h3 className="text-base font-bold mb-4 flex items-center gap-2">
              <span className="text-purple-400">💻</span> Программная часть
            </h3>
            <div className="space-y-2">
              {[
                { label: 'Идентификация', value: 'TensorFlow Lite' },
                { label: 'Точность', value: '> 98%' },
                { label: 'Время цикла', value: '< 5 сек' },
                { label: 'Бонусы', value: 'QR / NFC / приложение' },
                { label: 'Мониторинг', value: 'Облачная IoT панель' },
                { label: 'Аналитика', value: 'Реальное время' },
              ].map((item, i) => (
                <div key={i} className="flex justify-between items-center py-1.5 border-b border-white/5">
                  <span className="text-gray-400 text-xs">{item.label}</span>
                  <span className="text-gray-200 text-xs font-medium">{item.value}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Identification flow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-5 glass-card p-5"
        >
          <h3 className="text-sm font-bold mb-3 text-center">Принцип идентификации</h3>
          <div className="flex items-center justify-center gap-2 md:gap-4 flex-wrap">
            {[
              { icon: '📸', label: 'Камера' },
              { icon: '⚖️', label: 'Весы' },
              { icon: '🔊', label: 'Звук' },
              { icon: '🧠', label: 'AI' },
              { icon: '✅', label: 'Результат' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="text-center">
                  <div className="text-xl">{item.icon}</div>
                  <p className="text-[10px] text-gray-400">{item.label}</p>
                </div>
                {i < 4 && <ChevronRight className="w-4 h-4 text-green-400" />}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// ============ SLIDE 7: IMPACT ============
function ImpactSlide() {
  return (
    <div className="h-full w-full flex items-center justify-center relative overflow-hidden px-4">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a1628] via-[#0a1a12] to-[#0a1628]" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-green-500/10 rounded-full blur-[100px]" />
      
      <div className="relative z-10 max-w-5xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 mb-4">
            <Leaf className="w-4 h-4 text-green-400" />
            <span className="text-sm text-green-300">Влияние</span>
          </div>
          <h2 className="font-montserrat text-3xl md:text-5xl font-bold">
            Экологический <span className="gradient-text">эффект</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { number: '5000+', label: 'тонн отходов предотвращено', icon: '🌍' },
            { number: '85%', label: 'на переработку', icon: '♻️' },
            { number: '10 000+', label: 'пользователей в год', icon: '👥' },
            { number: '50+', label: 'точек по Беларуси', icon: '📍' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
              className="glass-card-green p-5 text-center"
            >
              <div className="text-2xl mb-2">{stat.icon}</div>
              <div className="text-2xl md:text-3xl font-black gradient-text mb-1">{stat.number}</div>
              <p className="text-gray-400 text-xs">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* SDG Goals */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="glass-card p-5"
        >
          <h3 className="text-base font-bold mb-4 text-center">Цели устойчивого развития ООН</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { goal: 'ЦУР 11', title: 'Устойчивые города', color: 'bg-orange-600' },
              { goal: 'ЦУР 12', title: 'Ответственное потребление', color: 'bg-yellow-600' },
              { goal: 'ЦУР 13', title: 'Климат', color: 'bg-green-700' },
              { goal: 'ЦУР 14', title: 'Экосистемы', color: 'bg-blue-600' },
            ].map((sdg, i) => (
              <div key={i} className={`${sdg.color} rounded-lg p-3 text-center`}>
                <p className="font-bold text-xs">{sdg.goal}</p>
                <p className="text-[10px] opacity-80 mt-0.5">{sdg.title}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// ============ SLIDE 8: ECONOMICS ============
function EconomicsSlide() {
  return (
    <div className="h-full w-full flex items-center justify-center relative overflow-hidden px-4">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a1628] via-[#1a1a0a] to-[#0a1628]" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-500/5 rounded-full blur-[100px]" />
      
      <div className="relative z-10 max-w-5xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 mb-4">
            <BarChart3 className="w-4 h-4 text-yellow-400" />
            <span className="text-sm text-yellow-300">Экономика</span>
          </div>
          <h2 className="font-montserrat text-3xl md:text-5xl font-bold">
            Бизнес-<span className="gradient-gold">модель</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-5 mb-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="glass-card p-5"
          >
            <h3 className="text-base font-bold mb-3 text-red-300">💸 Инвестиции (1 шт.)</h3>
            <div className="space-y-2">
              {[
                { item: 'Корпус и механика', cost: '3 500 BYN' },
                { item: 'Электроника', cost: '1 200 BYN' },
                { item: 'Дисплей', cost: '400 BYN' },
                { item: 'ПО', cost: '800 BYN' },
                { item: 'Монтаж', cost: '600 BYN' },
              ].map((item, i) => (
                <div key={i} className="flex justify-between items-center py-1.5 border-b border-white/5">
                  <span className="text-gray-300 text-xs">{item.item}</span>
                  <span className="text-gray-200 text-xs font-medium">{item.cost}</span>
                </div>
              ))}
              <div className="flex justify-between items-center pt-2 border-t-2 border-yellow-500/30">
                <span className="text-yellow-400 font-bold text-sm">ИТОГО</span>
                <span className="text-yellow-400 font-bold">6 500 BYN</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="glass-card p-5"
          >
            <h3 className="text-base font-bold mb-3 text-green-300">💰 Доход / месяц</h3>
            <div className="space-y-2">
              {[
                { item: 'Вторсырьё', revenue: '800 BYN' },
                { item: 'Реклама', revenue: '300 BYN' },
                { item: 'Партнёрства', revenue: '500 BYN' },
                { item: 'Субсидии', revenue: '200 BYN' },
                { item: 'Сертификация', revenue: '150 BYN' },
              ].map((item, i) => (
                <div key={i} className="flex justify-between items-center py-1.5 border-b border-white/5">
                  <span className="text-gray-300 text-xs">{item.item}</span>
                  <span className="text-green-400 text-xs font-medium">{item.revenue}</span>
                </div>
              ))}
              <div className="flex justify-between items-center pt-2 border-t-2 border-green-500/30">
                <span className="text-green-400 font-bold text-sm">ИТОГО / мес</span>
                <span className="text-green-400 font-bold">1 950 BYN</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ROI */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="glass-card p-6 glow-gold"
        >
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl md:text-3xl font-black gradient-gold">4 мес</div>
              <p className="text-gray-400 text-xs mt-1">Окупаемость</p>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-black gradient-gold">300%</div>
              <p className="text-gray-400 text-xs mt-1">ROI за 3 года</p>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-black gradient-gold">15 лет</div>
              <p className="text-gray-400 text-xs mt-1">Срок службы</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// ============ SLIDE 9: FUTURE ============
function FutureSlide() {
  return (
    <div className="h-full w-full flex items-center justify-center relative overflow-hidden px-4">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a1628] via-[#1a0a28] to-[#0a1628]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[100px]" />
      
      <div className="relative z-10 max-w-5xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-4">
            <TrendingUp className="w-4 h-4 text-indigo-400" />
            <span className="text-sm text-indigo-300">Перспективы</span>
          </div>
          <h2 className="font-montserrat text-3xl md:text-5xl font-bold">
            План <span className="gradient-text">развития</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-4 gap-4 mb-8">
          {[
            { phase: 'Фаза 1', period: '2025 Q1-Q2', title: 'Прототип', items: ['Создание прототипа', 'Тест в 3 магазинах', 'ML-модель'], textColor: 'text-green-400', iconColor: 'text-green-400' },
            { phase: 'Фаза 2', period: '2025 Q3-Q4', title: 'Пилот', items: ['10 устройств', 'Мобильное приложение', 'Сети магазинов'], textColor: 'text-blue-400', iconColor: 'text-blue-400' },
            { phase: 'Фаза 3', period: '2026', title: 'Масштаб', items: ['Областные центры', '50+ устройств', 'Городские системы'], textColor: 'text-purple-400', iconColor: 'text-purple-400' },
            { phase: 'Фаза 4', period: '2027+', title: 'Экосистема', items: ['Другая упаковка', 'Франшиза', 'Рынки СНГ'], textColor: 'text-pink-400', iconColor: 'text-pink-400' },
          ].map((phase, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
              className="glass-card p-4"
            >
              <div className={`text-xs font-bold ${phase.textColor} mb-1`}>{phase.phase}</div>
              <div className="text-[10px] text-gray-500 mb-2">{phase.period}</div>
              <h4 className="text-sm font-bold mb-2">{phase.title}</h4>
              <ul className="space-y-1">
                {phase.items.map((item, j) => (
                  <li key={j} className="flex items-center gap-1.5 text-gray-400 text-[11px]">
                    <CheckCircle className={`w-3 h-3 ${phase.iconColor} flex-shrink-0`} />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Final message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="glass-card-green p-8 glow-green text-center"
        >
          <div className="text-4xl mb-4">🥚♻️🌱</div>
          <h3 className="font-montserrat text-2xl md:text-3xl font-bold mb-3">
            Вместе к <span className="gradient-text">чистой Беларуси</span>
          </h3>
          <p className="text-gray-400 text-sm max-w-xl mx-auto mb-6">
            Каждая сданная упаковка — шаг к устойчивому будущому. 
            ЭКО-Фандомат делает переработку простой и выгодной.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <div className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs flex items-center gap-1.5">
              <Star className="w-3.5 h-3.5 text-yellow-400" />
              100 идей для Беларуси
            </div>
            <div className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-blue-400" />
              Открыты к партнёрству
            </div>
            <div className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-green-400" />
              Экобудущее
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default App;
