import { useState, useEffect, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { 
  Leaf, Recycle, Lightbulb, TrendingUp, Users, 
  Award, ChevronDown, ChevronRight, Package,
  Trash2, ArrowRight, CheckCircle, Star, Target,
  BarChart3, Globe, Zap, Shield, Heart
} from 'lucide-react';

// Navigation dots
const sections = [
  'hero', 'problem', 'solution', 'how-it-works', 
  'materials', 'tech', 'impact', 'economics', 'future'
];

function App() {
  const [activeSection, setActiveSection] = useState(0);
  const [showNav, setShowNav] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setShowNav(window.scrollY > 300);
      const scrollPos = window.scrollY + window.innerHeight / 2;
      sections.forEach((id, index) => {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const bottom = top + el.offsetHeight;
          if (scrollPos >= top && scrollPos < bottom) {
            setActiveSection(index);
          }
        }
      });
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div ref={containerRef} className="relative">
      {/* Side Navigation */}
      <AnimatePresence>
        {showNav && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-3"
          >
            {sections.map((id, i) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className={`nav-dot w-3 h-3 rounded-full border-2 border-green-400 transition-all ${
                  activeSection === i ? 'active bg-green-400' : 'bg-transparent'
                }`}
                title={id}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <HeroSection />
      
      {/* Problem Section */}
      <ProblemSection />
      
      {/* Solution Section */}
      <SolutionSection />
      
      {/* How It Works */}
      <HowItWorksSection />
      
      {/* Materials Section */}
      <MaterialsSection />
      
      {/* Technical Section */}
      <TechSection />
      
      {/* Impact Section */}
      <ImpactSection />
      
      {/* Economics Section */}
      <EconomicsSection />
      
      {/* Future Section */}
      <FutureSection />
    </div>
  );
}

// ============ HERO SECTION ============
function HeroSection() {
  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a1628] via-[#0f2318] to-[#0a1628]" />
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-72 h-72 bg-green-500 rounded-full blur-[100px]" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-emerald-600 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-yellow-500 rounded-full blur-[80px] opacity-30" />
      </div>

      {/* Floating particles */}
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="particle"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 4}s`,
            animationDuration: `${3 + Math.random() * 3}s`,
          }}
        />
      ))}

      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Contest badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8">
            <Award className="w-4 h-4 text-yellow-400" />
            <span className="text-sm text-gray-300">Конкурс «100 идей для Беларуси»</span>
          </div>

          {/* Main title */}
          <h1 className="font-montserrat text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight">
            <span className="gradient-text">ЭКО-ФАНДОМАТ</span>
            <br />
            <span className="text-white/90 text-3xl md:text-5xl lg:text-6xl">для упаковки яиц</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mb-10 leading-relaxed">
            Инновационное устройство для автоматизированного приёма и сортировки 
            использованной яичной упаковки из картона, пластика и пенопласта
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => document.getElementById('solution')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full font-semibold text-lg hover:shadow-lg hover:shadow-green-500/30 transition-all hover:scale-105"
            >
              Узнать о проекте
            </button>
            <button
              onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 border border-white/20 rounded-full font-semibold text-lg hover:bg-white/5 transition-all"
            >
              Как это работает →
            </button>
          </div>
        </motion.div>

        {/* Fundomat illustration */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-16 fundomat-3d"
        >
          <div className="relative max-w-2xl mx-auto">
            <img 
              src="https://image.qwenlm.ai/generated-images/e4122740-1935-4953-bb7c-ad952f3f2654/_result.png" 
              alt="ЭКО-Фандомат для упаковки яиц" 
              className="w-full rounded-2xl shadow-2xl shadow-green-500/20 border border-green-500/20"
            />
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-[#0a1628] via-transparent to-transparent" />
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <ChevronDown className="w-6 h-6 text-green-400 animate-bounce" />
        </motion.div>
      </div>
    </section>
  );
}

// ============ FUNDOMAT ILLUSTRATION ============
function FundomatIllustration() {
  return (
    <div className="relative w-full max-w-lg mx-auto">
      <div className="fundomat-body relative">
        {/* Main body */}
        <div className="relative mx-auto w-64 h-96 rounded-3xl bg-gradient-to-b from-gray-700 to-gray-800 border border-gray-600 shadow-2xl overflow-hidden">
          {/* Screen */}
          <div className="absolute top-6 left-1/2 -translate-x-1/2 w-48 h-32 rounded-xl bg-gradient-to-br from-green-900 to-green-950 border border-green-700 flex items-center justify-center overflow-hidden">
            <div className="text-center">
              <Recycle className="w-8 h-8 text-green-400 mx-auto mb-1 animate-spin" style={{ animationDuration: '3s' }} />
              <p className="text-green-400 text-xs font-medium">ПРИЁМ УПАКОВКИ</p>
              <p className="text-green-300 text-[10px] mt-1">Вставьте упаковку</p>
            </div>
            {/* Scan line */}
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-400 opacity-60 animate-pulse" />
          </div>

          {/* Slot */}
          <div className="absolute top-44 left-1/2 -translate-x-1/2 w-40 h-8 rounded-lg bg-gray-900 border-2 border-gray-600 flex items-center justify-center">
            <div className="w-32 h-3 rounded bg-gray-950 border border-gray-700" />
          </div>

          {/* Material indicators */}
          <div className="absolute top-56 left-1/2 -translate-x-1/2 flex gap-3">
            <div className="w-8 h-8 rounded-full bg-[#c4956a] border-2 border-[#a07850] flex items-center justify-center">
              <span className="text-[8px] font-bold text-white">К</span>
            </div>
            <div className="w-8 h-8 rounded-full bg-[#5dade2] border-2 border-[#3498db] flex items-center justify-center">
              <span className="text-[8px] font-bold text-white">П</span>
            </div>
            <div className="w-8 h-8 rounded-full bg-[#ecf0f1] border-2 border-[#bdc3c7] flex items-center justify-center">
              <span className="text-[8px] font-bold text-gray-700">Ф</span>
            </div>
          </div>

          {/* Collection bin */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-48 h-24 rounded-xl bg-gray-900/80 border border-gray-600 p-2">
            <div className="grid grid-cols-3 gap-1 h-full">
              <div className="rounded bg-[#c4956a]/20 border border-[#c4956a]/40 flex items-end justify-center pb-1">
                <div className="w-full h-1/3 bg-[#c4956a]/40 rounded-t" />
              </div>
              <div className="rounded bg-[#5dade2]/20 border border-[#5dade2]/40 flex items-end justify-center pb-1">
                <div className="w-full h-1/4 bg-[#5dade2]/40 rounded-t" />
              </div>
              <div className="rounded bg-gray-400/20 border border-gray-400/40 flex items-end justify-center pb-1">
                <div className="w-full h-1/5 bg-gray-400/40 rounded-t" />
              </div>
            </div>
          </div>

          {/* LED strip */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 via-emerald-400 to-green-500 animate-pulse" />
        </div>

        {/* Side decorations */}
        <div className="absolute -left-4 top-1/3 w-4 h-16 bg-gray-600 rounded-l-lg" />
        <div className="absolute -right-4 top-1/3 w-4 h-16 bg-gray-600 rounded-r-lg" />
      </div>

      {/* Floating eggs animation */}
      <div className="absolute -top-4 left-1/2 -translate-x-1/2 animate-float">
        <EggIcon type="cardboard" className="w-10 h-10" />
      </div>
    </div>
  );
}

// ============ PROBLEM SECTION ============
function ProblemSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="problem" className="py-24 px-4 relative" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a1628] to-[#1a0a0a]" />
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 mb-6">
            <Trash2 className="w-4 h-4 text-red-400" />
            <span className="text-sm text-red-300">Проблема</span>
          </div>
          <h2 className="font-montserrat text-4xl md:text-5xl font-bold mb-4">
            Миллиарды упаковок <span className="text-red-400">в мусоре</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Ежегодно в Беларуси продаётся более 2 миллиардов яиц. После потребления 
            упаковка отправляется на свалку, нанося вред окружающей среде.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          <StatCard
            icon={<Package className="w-8 h-8" />}
            number="2 млрд"
            label="яиц продаётся в год"
            color="red"
            delay={0.2}
            isInView={isInView}
          />
          <StatCard
            icon={<Trash2 className="w-8 h-8" />}
            number="85%"
            label="упаковок не перерабатывается"
            color="orange"
            delay={0.4}
            isInView={isInView}
          />
          <StatCard
            icon={<Globe className="w-8 h-8" />}
            number="5000 т"
            label="мусора ежегодно"
            color="yellow"
            delay={0.6}
            isInView={isInView}
          />
        </div>

        {/* Problem illustration */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 glass-card p-8"
        >
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-4 text-red-300">Почему это важно?</h3>
              <ul className="space-y-3">
                {[
                  'Картонная упаковка разлагается 2-5 лет, выделяя метан',
                  'Пластиковая упаковка — до 450 лет, распадаясь на микропластик',
                  'Пенопластовая упаковка практически не разлагается',
                  'Смешанные отходы сложно и дорого сортировать',
                  'Отсутствие инфраструктуры для сбора упаковки яиц'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-red-400 mt-2 flex-shrink-0" />
                    <span className="text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex-1 flex justify-center">
              <div className="relative w-48 h-48">
                {/* Trash pile illustration */}
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-red-900/30 to-transparent rounded-full" />
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute animate-float"
                    style={{
                      left: `${20 + Math.random() * 60}%`,
                      bottom: `${Math.random() * 40}%`,
                      animationDelay: `${i * 0.3}s`,
                    }}
                  >
                    <EggIcon 
                      type={['cardboard', 'plastic', 'foam'][i % 3] as any} 
                      className="w-8 h-8 opacity-60" 
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ============ SOLUTION SECTION ============
function SolutionSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="solution" className="py-24 px-4 relative" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a0a0a] via-[#0a1a12] to-[#0a1628]" />
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 mb-6">
            <Lightbulb className="w-4 h-4 text-green-400" />
            <span className="text-sm text-green-300">Решение</span>
          </div>
          <h2 className="font-montserrat text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">ЭКО-Фандомат</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            Автоматизированное устройство для приёма, идентификации и сортировки 
            использованной упаковки яиц по типу материала с мотивацией пользователей 
            через систему бонусов
          </p>
        </motion.div>

        {/* Key features */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: <Recycle className="w-6 h-6" />, title: '3 материала', desc: 'Картон, пластик, пенопласт' },
            { icon: <Zap className="w-6 h-6" />, title: 'Автоматика', desc: 'AI-распознавание типа' },
            { icon: <Heart className="w-6 h-6" />, title: 'Бонусы', desc: 'Скидки и баллы за сдачу' },
            { icon: <Shield className="w-6 h-6" />, title: 'На 10 яиц', desc: 'Стандартный формат' },
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
              className="glass-card-green p-6 text-center hover:scale-105 transition-transform"
            >
              <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4 text-green-400">
                {feature.icon}
              </div>
              <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
              <p className="text-gray-400 text-sm">{feature.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Value proposition */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 glass-card p-8 glow-green"
        >
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-6">Ключевая ценность проекта</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <div className="text-3xl mb-2">🌱</div>
                <h4 className="font-semibold text-green-400 mb-2">Экология</h4>
                <p className="text-gray-400 text-sm">Снижение объёма отходов и стимулирование раздельного сбора</p>
              </div>
              <div>
                <div className="text-3xl mb-2">💰</div>
                <h4 className="font-semibold text-yellow-400 mb-2">Экономика</h4>
                <p className="text-gray-400 text-sm">Вторичное сырьё для производителей упаковки</p>
              </div>
              <div>
                <div className="text-3xl mb-2">👥</div>
                <h4 className="font-semibold text-blue-400 mb-2">Общество</h4>
                <p className="text-gray-400 text-sm">Формирование экологической культуры населения</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ============ HOW IT WORKS SECTION ============
function HowItWorksSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const interval = setInterval(() => {
      setActiveStep(prev => (prev + 1) % 5);
    }, 3000);
    return () => clearInterval(interval);
  }, [isInView]);

  const steps = [
    {
      title: 'Поднесите упаковку',
      desc: 'Пользователь подносит использованную упаковку на 10 яиц к приёмному отверстию',
      icon: '📦',
    },
    {
      title: 'Сканирование',
      desc: 'Датчики определяют тип материала: картон, пластик или пенопласт',
      icon: '🔍',
    },
    {
      title: 'Приём',
      desc: 'Упаковка принимается и направляется в соответствующий контейнер',
      icon: '⬇️',
    },
    {
      title: 'Начисление бонусов',
      desc: 'На экран выводится информация о начисленных баллах/бонусах',
      icon: '⭐',
    },
    {
      title: 'Сортировка',
      desc: 'Упаковка хранится раздельно до вывоза переработчиком',
      icon: '♻️',
    },
  ];

  return (
    <section id="how-it-works" className="py-24 px-4 relative" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a1628] to-[#0a1a12]" />
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
            <Target className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-blue-300">Как это работает</span>
          </div>
          <h2 className="font-montserrat text-4xl md:text-5xl font-bold mb-4">
            Процесс работы <span className="gradient-text">фандомата</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Простой и интуитивный процесс для пользователя
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Steps list */}
          <div className="space-y-4">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                onClick={() => setActiveStep(i)}
                className={`p-4 rounded-xl cursor-pointer transition-all ${
                  activeStep === i 
                    ? 'glass-card-green glow-green scale-[1.02]' 
                    : 'hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${
                    activeStep === i ? 'bg-green-500/20' : 'bg-white/5'
                  }`}>
                    {step.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className={`font-semibold ${activeStep === i ? 'text-green-400' : 'text-gray-300'}`}>
                      {step.title}
                    </h4>
                    <AnimatePresence>
                      {activeStep === i && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="text-gray-400 text-sm mt-1"
                        >
                          {step.desc}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
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
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative"
          >
            <div className="glass-card p-8 relative overflow-hidden">
              {/* Animated fundomat diagram */}
              <div className="relative h-80 flex items-center justify-center">
                {/* Fundomat body */}
                <div className="relative w-48 h-72 rounded-2xl bg-gradient-to-b from-gray-700 to-gray-800 border border-gray-600 shadow-xl">
                  {/* Screen with changing content */}
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 w-36 h-24 rounded-lg bg-green-950 border border-green-700 flex items-center justify-center overflow-hidden">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeStep}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-center p-2"
                      >
                        <div className="text-2xl mb-1">{steps[activeStep].icon}</div>
                        <p className="text-green-400 text-[10px] font-medium">{steps[activeStep].title}</p>
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* Slot */}
                  <div className="absolute top-32 left-1/2 -translate-x-1/2 w-32 h-6 rounded bg-gray-900 border border-gray-600">
                    <AnimatePresence>
                      {activeStep === 0 && (
                        <motion.div
                          initial={{ x: -40, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          exit={{ x: 40, opacity: 0 }}
                          className="absolute inset-0 flex items-center justify-center"
                        >
                          <EggIcon type="cardboard" className="w-5 h-5" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Internal bins */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-36 h-28 rounded-lg bg-gray-900/80 border border-gray-600 p-2">
                    <div className="grid grid-cols-3 gap-1 h-full">
                      <div className={`rounded border transition-all ${
                        activeStep >= 2 ? 'border-[#c4956a] bg-[#c4956a]/20' : 'border-gray-700 bg-gray-800'
                      }`}>
                        <p className="text-[7px] text-center mt-1 text-[#c4956a]">Картон</p>
                      </div>
                      <div className={`rounded border transition-all ${
                        activeStep >= 2 ? 'border-[#5dade2] bg-[#5dade2]/20' : 'border-gray-700 bg-gray-800'
                      }`}>
                        <p className="text-[7px] text-center mt-1 text-[#5dade2]">Пластик</p>
                      </div>
                      <div className={`rounded border transition-all ${
                        activeStep >= 2 ? 'border-gray-400 bg-gray-400/20' : 'border-gray-700 bg-gray-800'
                      }`}>
                        <p className="text-[7px] text-center mt-1 text-gray-400">Пена</p>
                      </div>
                    </div>
                  </div>

                  {/* LED */}
                  <div className={`absolute top-0 left-0 right-0 h-1 rounded-t-2xl transition-all ${
                    activeStep === 1 ? 'bg-yellow-400 animate-pulse' : 
                    activeStep >= 2 ? 'bg-green-400' : 'bg-blue-400 animate-pulse'
                  }`} />
                </div>

                {/* Bonus display */}
                <AnimatePresence>
                  {activeStep === 3 && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      className="absolute top-4 right-4 px-3 py-2 rounded-lg bg-yellow-500/20 border border-yellow-500/40"
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
    </section>
  );
}

// ============ MATERIALS SECTION ============
function MaterialsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const materials = [
    {
      type: 'Картонная',
      color: '#c4956a',
      bgColor: 'bg-[#c4956a]/10',
      borderColor: 'border-[#c4956a]/30',
      textColor: 'text-[#c4956a]',
      icon: '📦',
      desc: 'Прессованный картон / целлюлоза',
      properties: ['Биоразлагаемая', 'Легко перерабатывается', 'Разлагается за 2-5 лет'],
      recycling: 'Переработка в картонную тару, компостирование',
      share: '60%',
    },
    {
      type: 'Пластиковая',
      color: '#5dade2',
      bgColor: 'bg-[#5dade2]/10',
      borderColor: 'border-[#5dade2]/30',
      textColor: 'text-[#5dade2]',
      icon: '🧊',
      desc: 'ПЭТ / полистирол прозрачный',
      properties: ['Прочная', 'Прозрачная', 'Разлагается 450+ лет'],
      recycling: 'Гранулирование, производство новых изделий',
      share: '30%',
    },
    {
      type: 'Пенопластовая',
      color: '#bdc3c7',
      bgColor: 'bg-gray-400/10',
      borderColor: 'border-gray-400/30',
      textColor: 'text-gray-300',
      icon: '🫧',
      desc: 'Вспененный полистирол (EPS)',
      properties: ['Лёгкая', 'Хрупкая', 'Не разлагается'],
      recycling: 'Плотное прессование, теплоизоляция',
      share: '10%',
    },
  ];

  return (
    <section id="materials" className="py-24 px-4 relative" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a1a12] to-[#0a1628]" />
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-6">
            <Package className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-purple-300">Типы упаковки</span>
          </div>
          <h2 className="font-montserrat text-4xl md:text-5xl font-bold mb-4">
            3 вида <span className="gradient-text">материалов</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Фандомат принимает все три типа упаковки яиц на 10 штук
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {materials.map((mat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className={`material-card glass-card p-6 ${mat.bgColor} ${mat.borderColor} border`}
            >
              <div className="text-center mb-4">
                <div className="text-4xl mb-3">{mat.icon}</div>
                <h3 className={`text-xl font-bold ${mat.textColor}`}>{mat.type}</h3>
                <p className="text-gray-400 text-sm">{mat.desc}</p>
              </div>

              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-400">Доля на рынке</span>
                  <span className={mat.textColor}>{mat.share}</span>
                </div>
                <div className="w-full h-2 rounded-full bg-gray-800">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={isInView ? { width: mat.share } : { width: 0 }}
                    transition={{ duration: 1, delay: 0.5 + i * 0.2 }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: mat.color }}
                  />
                </div>
              </div>

              <div className="space-y-2 mb-4">
                {mat.properties.map((prop, j) => (
                  <div key={j} className="flex items-center gap-2">
                    <CheckCircle className={`w-4 h-4 ${mat.textColor}`} />
                    <span className="text-gray-300 text-sm">{prop}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-white/10">
                <p className="text-xs text-gray-500 mb-1">Переработка:</p>
                <p className="text-gray-400 text-sm">{mat.recycling}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============ TECH SECTION ============
function TechSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="tech" className="py-24 px-4 relative" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a1628] to-[#1a1a2e]" />
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-6">
            <Zap className="w-4 h-4 text-cyan-400" />
            <span className="text-sm text-cyan-300">Технологии</span>
          </div>
          <h2 className="font-montserrat text-4xl md:text-5xl font-bold mb-4">
            Техническая <span className="gradient-text">начинка</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Hardware */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="glass-card p-8"
          >
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <span className="text-cyan-400">⚙️</span> Аппаратная часть
            </h3>
            <div className="space-y-4">
              {[
                { label: 'Корпус', value: 'Нержавеющая сталь, 120×60×180 см' },
                { label: 'Приёмное окно', value: '40×15 см (формат на 10 яиц)' },
                { label: 'Датчики', value: 'Оптические + весовые + ёмкостные' },
                { label: 'Процессор', value: 'Raspberry Pi 4 / Arduino Mega' },
                { label: 'Дисплей', value: '7" сенсорный IPS экран' },
                { label: 'Контейнеры', value: '3 отсека × 200 упаковок' },
                { label: 'Питание', value: '220В / солнечная панель (опция)' },
                { label: 'Пресс', value: 'Механический уплотнитель' },
              ].map((item, i) => (
                <div key={i} className="flex justify-between items-center py-2 border-b border-white/5">
                  <span className="text-gray-400 text-sm">{item.label}</span>
                  <span className="text-gray-200 text-sm font-medium text-right">{item.value}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Software */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="glass-card p-8"
          >
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <span className="text-purple-400">💻</span> Программная часть
            </h3>
            <div className="space-y-4">
              {[
                { label: 'Идентификация', value: 'ML-модель (TensorFlow Lite)' },
                { label: 'Точность', value: '> 98% распознавания' },
                { label: 'Время цикла', value: '< 5 секунд на упаковку' },
                { label: 'Бонусная система', value: 'QR-код / NFC / приложение' },
                { label: 'Мониторинг', value: 'Облачная панель (IoT)' },
                { label: 'Оповещения', value: 'SMS при заполнении контейнера' },
                { label: 'Аналитика', value: 'Статистика приёма в реальном времени' },
                { label: 'API', value: 'Интеграция с магазинами / городами' },
              ].map((item, i) => (
                <div key={i} className="flex justify-between items-center py-2 border-b border-white/5">
                  <span className="text-gray-400 text-sm">{item.label}</span>
                  <span className="text-gray-200 text-sm font-medium text-right">{item.value}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Identification diagram */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 glass-card p-8"
        >
          <h3 className="text-xl font-bold mb-6 text-center">Принцип идентификации материала</h3>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            {[
              { icon: '📸', label: 'Камера', desc: 'Визуальный анализ текстуры' },
              { icon: '⚖️', label: 'Весы', desc: 'Определение по массе' },
              { icon: '🔊', label: 'Датчик звука', desc: 'Анализ при сжатии' },
              { icon: '🧠', label: 'AI-модель', desc: 'Классификация материала' },
              { icon: '✅', label: 'Результат', desc: 'Тип + направление в контейнер' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="text-center">
                  <div className="text-3xl mb-2">{item.icon}</div>
                  <p className="text-sm font-medium text-gray-200">{item.label}</p>
                  <p className="text-xs text-gray-500">{item.desc}</p>
                </div>
                {i < 4 && <ChevronRight className="w-5 h-5 text-green-400 hidden md:block" />}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ============ IMPACT SECTION ============
function ImpactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="impact" className="py-24 px-4 relative" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a2e] to-[#0a1628]" />
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 mb-6">
            <Leaf className="w-4 h-4 text-green-400" />
            <span className="text-sm text-green-300">Влияние</span>
          </div>
          <h2 className="font-montserrat text-4xl md:text-5xl font-bold mb-4">
            Экологический <span className="gradient-text">эффект</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { number: '5000+', label: 'тонн отходов предотвращено ежегодно', icon: '🌍' },
            { number: '85%', label: 'упаковок направлено на переработку', icon: '♻️' },
            { number: '10 000+', label: 'пользователей в первый год', icon: '👥' },
            { number: '50+', label: 'точек установки по Беларуси', icon: '📍' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card-green p-6 text-center"
            >
              <div className="text-3xl mb-3">{stat.icon}</div>
              <div className="stat-number gradient-text mb-2">{stat.number}</div>
              <p className="text-gray-400 text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* SDG Goals */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 glass-card p-8"
        >
          <h3 className="text-xl font-bold mb-6 text-center">Вклад в Цели устойчивого развития ООН</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { goal: 'ЦУР 11', title: 'Устойчивые города', color: 'bg-orange-600' },
              { goal: 'ЦУР 12', title: 'Ответственное потребление', color: 'bg-yellow-600' },
              { goal: 'ЦУР 13', title: 'Борьба с изменением климата', color: 'bg-green-700' },
              { goal: 'ЦУР 14', title: 'Сохранение экосистем', color: 'bg-blue-600' },
            ].map((sdg, i) => (
              <div key={i} className={`${sdg.color} rounded-xl p-4 text-center`}>
                <p className="font-bold text-sm">{sdg.goal}</p>
                <p className="text-xs opacity-80 mt-1">{sdg.title}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ============ ECONOMICS SECTION ============
function EconomicsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="economics" className="py-24 px-4 relative" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a1628] to-[#1a1a0a]" />
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 mb-6">
            <BarChart3 className="w-4 h-4 text-yellow-400" />
            <span className="text-sm text-yellow-300">Экономика</span>
          </div>
          <h2 className="font-montserrat text-4xl md:text-5xl font-bold mb-4">
            Бизнес-<span className="gradient-gold">модель</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Costs */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="glass-card p-8"
          >
            <h3 className="text-xl font-bold mb-6 text-red-300">💸 Инвестиции (1 единица)</h3>
            <div className="space-y-3">
              {[
                { item: 'Корпус и механика', cost: '3 500 BYN' },
                { item: 'Электроника и датчики', cost: '1 200 BYN' },
                { item: 'Дисплей и интерфейс', cost: '400 BYN' },
                { item: 'Программное обеспечение', cost: '800 BYN' },
                { item: 'Монтаж и установка', cost: '600 BYN' },
              ].map((item, i) => (
                <div key={i} className="flex justify-between items-center py-2 border-b border-white/5">
                  <span className="text-gray-300">{item.item}</span>
                  <span className="text-gray-200 font-medium">{item.cost}</span>
                </div>
              ))}
              <div className="flex justify-between items-center py-3 border-t-2 border-yellow-500/30">
                <span className="text-yellow-400 font-bold">ИТОГО</span>
                <span className="text-yellow-400 font-bold text-xl">6 500 BYN</span>
              </div>
            </div>
          </motion.div>

          {/* Revenue */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="glass-card p-8"
          >
            <h3 className="text-xl font-bold mb-6 text-green-300">💰 Источники дохода</h3>
            <div className="space-y-3">
              {[
                { item: 'Продажа вторсырья переработчикам', revenue: '800 BYN/мес' },
                { item: 'Реклама на экране', revenue: '300 BYN/мес' },
                { item: 'Партнёрство с магазинами', revenue: '500 BYN/мес' },
                { item: 'Государственные субсидии', revenue: '200 BYN/мес' },
                { item: 'Эко-сертификация', revenue: '150 BYN/мес' },
              ].map((item, i) => (
                <div key={i} className="flex justify-between items-center py-2 border-b border-white/5">
                  <span className="text-gray-300">{item.item}</span>
                  <span className="text-green-400 font-medium">{item.revenue}</span>
                </div>
              ))}
              <div className="flex justify-between items-center py-3 border-t-2 border-green-500/30">
                <span className="text-green-400 font-bold">ИТОГО / мес</span>
                <span className="text-green-400 font-bold text-xl">1 950 BYN</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ROI */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 glass-card p-8 glow-gold"
        >
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="stat-number gradient-gold">4 мес</div>
              <p className="text-gray-400 mt-2">Срок окупаемости</p>
            </div>
            <div>
              <div className="stat-number gradient-gold">300%</div>
              <p className="text-gray-400 mt-2">ROI за 3 года</p>
            </div>
            <div>
              <div className="stat-number gradient-gold">15 лет</div>
              <p className="text-gray-400 mt-2">Срок службы устройства</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ============ FUTURE SECTION ============
function FutureSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="future" className="py-24 px-4 relative" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a0a] to-[#0a1628]" />
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-6">
            <TrendingUp className="w-4 h-4 text-indigo-400" />
            <span className="text-sm text-indigo-300">Перспективы</span>
          </div>
          <h2 className="font-montserrat text-4xl md:text-5xl font-bold mb-4">
            План <span className="gradient-text">развития</span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-green-500 via-blue-500 to-purple-500 hidden md:block" />
          
          {[
            {
              phase: 'Фаза 1',
              period: '2025 Q1-Q2',
              title: 'Прототип и тестирование',
              items: ['Создание прототипа', 'Тестирование в 3 магазинах Минска', 'Доработка ML-модели'],
              color: 'green',
            },
            {
              phase: 'Фаза 2',
              period: '2025 Q3-Q4',
              title: 'Пилотный запуск',
              items: ['Установка 10 устройств в Минске', 'Запуск мобильного приложения', 'Партнёрство с сетями магазинов'],
              color: 'blue',
            },
            {
              phase: 'Фаза 3',
              period: '2026',
              title: 'Масштабирование',
              items: ['Выход в областные центры', '50+ устройств по стране', 'Интеграция с городскими системами'],
              color: 'purple',
            },
            {
              phase: 'Фаза 4',
              period: '2027+',
              title: 'Экосистема',
              items: ['Расширение на другие типы упаковки', 'Франшизная модель', 'Выход на рынки СНГ'],
              color: 'pink',
            },
          ].map((phase, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className={`relative flex flex-col md:flex-row items-center mb-12 ${
                i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              <div className={`md:w-1/2 ${i % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                <div className="glass-card p-6">
                  <div className={`text-sm font-bold text-${phase.color}-400 mb-1`}>{phase.phase} • {phase.period}</div>
                  <h4 className="text-lg font-bold mb-3">{phase.title}</h4>
                  <ul className={`space-y-2 ${i % 2 === 0 ? 'md:text-right' : ''}`}>
                    {phase.items.map((item, j) => (
                      <li key={j} className="flex items-center gap-2 text-gray-300 text-sm">
                        {i % 2 === 0 && <span className="md:ml-auto" />}
                        <CheckCircle className={`w-4 h-4 text-${phase.color}-400 flex-shrink-0`} />
                        {item}
                        {i % 2 !== 0 && <span />}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-white border-4 border-gray-900 z-10" />
              <div className="md:w-1/2" />
            </motion.div>
          ))}
        </div>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-20 text-center"
        >
          <div className="glass-card-green p-12 glow-green">
            <div className="text-5xl mb-6">🥚♻️🌱</div>
            <h3 className="font-montserrat text-3xl md:text-4xl font-bold mb-4">
              Вместе к <span className="gradient-text">чистой Беларуси</span>
            </h3>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-8">
              Каждая сданная упаковка — это шаг к устойчивому будущему. 
              ЭКО-Фандомат делает переработку простой, удобной и выгодной для каждого.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm">
                <Star className="w-4 h-4 inline mr-1 text-yellow-400" />
                100 идей для Беларуси
              </div>
              <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm">
                <Users className="w-4 h-4 inline mr-1 text-blue-400" />
                Открыты к партнёрству
              </div>
              <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm">
                <Leaf className="w-4 h-4 inline mr-1 text-green-400" />
                Экологичное будущее
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ============ SHARED COMPONENTS ============
function StatCard({ icon, number, label, color, delay, isInView }: {
  icon: React.ReactNode;
  number: string;
  label: string;
  color: string;
  delay: number;
  isInView: boolean;
}) {
  const colorMap: Record<string, string> = {
    red: 'border-red-500/30 bg-red-500/5',
    orange: 'border-orange-500/30 bg-orange-500/5',
    yellow: 'border-yellow-500/30 bg-yellow-500/5',
  };
  const textColorMap: Record<string, string> = {
    red: 'text-red-400',
    orange: 'text-orange-400',
    yellow: 'text-yellow-400',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      className={`glass-card p-6 text-center border ${colorMap[color]}`}
    >
      <div className={`${textColorMap[color]} mb-3 flex justify-center`}>{icon}</div>
      <div className={`stat-number ${textColorMap[color]} mb-2`}>{number}</div>
      <p className="text-gray-400 text-sm">{label}</p>
    </motion.div>
  );
}

function EggIcon({ type, className }: { type: 'cardboard' | 'plastic' | 'foam'; className?: string }) {
  const colors = {
    cardboard: { fill: '#c4956a', stroke: '#a07850' },
    plastic: { fill: '#5dade2', stroke: '#3498db' },
    foam: { fill: '#ecf0f1', stroke: '#bdc3c7' },
  };
  const c = colors[type];

  return (
    <svg className={className} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="12" width="32" height="20" rx="3" fill={c.fill} stroke={c.stroke} strokeWidth="1.5" />
      <circle cx="12" cy="22" r="4" fill={c.stroke} opacity="0.5" />
      <circle cx="20" cy="22" r="4" fill={c.stroke} opacity="0.5" />
      <circle cx="28" cy="22" r="4" fill={c.stroke} opacity="0.5" />
      <rect x="8" y="8" width="24" height="6" rx="2" fill={c.fill} stroke={c.stroke} strokeWidth="1" />
    </svg>
  );
}

export default App;
