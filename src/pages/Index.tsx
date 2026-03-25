import { useState } from "react";
import Icon from "@/components/ui/icon";

const CANDLE_IMG = "https://cdn.poehali.dev/projects/1cda9010-eaba-44d0-8a98-bf8f1bf549bd/files/179139aa-79a7-4827-8e25-b1f4f68fb03e.jpg";
const DIFFUSER_IMG = "https://cdn.poehali.dev/projects/1cda9010-eaba-44d0-8a98-bf8f1bf549bd/files/0a8a42ef-1cdc-4987-b148-1b4b152ade48.jpg";
const COLLECTION_IMG = "https://cdn.poehali.dev/projects/1cda9010-eaba-44d0-8a98-bf8f1bf549bd/files/2c8f0d30-2522-4467-ac1a-8d4908cb3fa5.jpg";

const NAV_ITEMS = ["Главная", "Каталог", "Свечи", "Аромадиффузоры", "О компании", "Контакты"];

const PRODUCTS = [
  { id: 1, name: "Ночная Роза", type: "candle", scent: "цветочный", season: "осень", price: 2490, composition: "соевый воск", img: CANDLE_IMG, tag: "Хит" },
  { id: 2, name: "Янтарный лес", type: "candle", scent: "древесный", season: "зима", price: 2890, composition: "пчелиный воск", img: CANDLE_IMG, tag: "Новинка" },
  { id: 3, name: "Blanc Absolu", type: "diffuser", scent: "мускусный", season: "весна", price: 3490, composition: "спирт+эфир", img: DIFFUSER_IMG, tag: "" },
  { id: 4, name: "Дым и Кожа", type: "diffuser", scent: "восточный", season: "осень", price: 3990, composition: "спирт+эфир", img: DIFFUSER_IMG, tag: "Лимитед" },
  { id: 5, name: "Ветер Лета", type: "candle", scent: "цитрусовый", season: "лето", price: 1990, composition: "соевый воск", img: CANDLE_IMG, tag: "" },
  { id: 6, name: "Шафран Востока", type: "diffuser", scent: "восточный", season: "зима", price: 4290, composition: "спирт+эфир", img: DIFFUSER_IMG, tag: "Хит" },
];

const SCENTS = ["Все", "цветочный", "древесный", "мускусный", "восточный", "цитрусовый"];
const SEASONS = ["Все", "весна", "лето", "осень", "зима"];
const COMPOSITIONS = ["Все", "соевый воск", "пчелиный воск", "спирт+эфир"];

const COMPARISON = [
  { feature: "Время аромата", candle: "30–50 часов", diffuser: "60–90 дней" },
  { feature: "Интенсивность", candle: "Умеренная", diffuser: "Постоянная" },
  { feature: "Безопасность", candle: "Открытый огонь", diffuser: "Без огня" },
  { feature: "Площадь", candle: "до 20 м²", diffuser: "до 40 м²" },
  { feature: "Ценовой сегмент", candle: "1 990–2 890 ₽", diffuser: "3 490–4 290 ₽" },
  { feature: "Покупатель", candle: "Подарок / уют", diffuser: "Постоянный клиент" },
];

const TREND_DATA = [
  { month: "Янв", candles: 65, diffusers: 42 },
  { month: "Фев", candles: 72, diffusers: 48 },
  { month: "Мар", candles: 58, diffusers: 55 },
  { month: "Апр", candles: 50, diffusers: 60 },
  { month: "Май", candles: 55, diffusers: 65 },
  { month: "Июн", candles: 48, diffusers: 70 },
  { month: "Июл", candles: 45, diffusers: 72 },
  { month: "Авг", candles: 52, diffusers: 68 },
  { month: "Сен", candles: 70, diffusers: 62 },
  { month: "Окт", candles: 85, diffusers: 58 },
  { month: "Ноя", candles: 92, diffusers: 55 },
  { month: "Дек", candles: 100, diffusers: 60 },
];

const Index = () => {
  const [activePage, setActivePage] = useState("Главная");
  const [filterScent, setFilterScent] = useState("Все");
  const [filterSeason, setFilterSeason] = useState("Все");
  const [filterComposition, setFilterComposition] = useState("Все");
  const [filterType, setFilterType] = useState("all");
  const [maxPrice, setMaxPrice] = useState(5000);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const filteredProducts = PRODUCTS.filter((p) => {
    if (filterScent !== "Все" && p.scent !== filterScent) return false;
    if (filterSeason !== "Все" && p.season !== filterSeason) return false;
    if (filterComposition !== "Все" && p.composition !== filterComposition) return false;
    if (filterType !== "all" && p.type !== filterType) return false;
    if (p.price > maxPrice) return false;
    return true;
  });

  const catalogProducts = filteredProducts.filter((p) =>
    activePage === "Свечи" ? p.type === "candle" :
    activePage === "Аромадиффузоры" ? p.type === "diffuser" : true
  );

  const maxBar = Math.max(...TREND_DATA.map((d) => Math.max(d.candles, d.diffusers)));

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--dark-bg)", color: "var(--text-primary)" }}>
      {/* NAV */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-5"
        style={{ background: "rgba(13,13,13,0.92)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(200,168,75,0.08)" }}
      >
        <div
          className="font-display text-2xl font-light tracking-[0.35em] cursor-pointer"
          style={{ color: "var(--gold)" }}
          onClick={() => setActivePage("Главная")}
        >
          LUMIÈRE
        </div>

        <div className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <button
              key={item}
              onClick={() => setActivePage(item)}
              className={`nav-link font-body text-xs tracking-widest uppercase transition-colors ${
                activePage === item ? "text-gold active" : "hover:text-gold"
              }`}
              style={{ color: activePage === item ? "var(--gold)" : "var(--text-muted)" }}
            >
              {item}
            </button>
          ))}
        </div>

        <button
          className="md:hidden"
          style={{ color: "var(--gold)" }}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <Icon name={mobileMenuOpen ? "X" : "Menu"} size={22} />
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8"
          style={{ background: "rgba(13,13,13,0.98)" }}
        >
          {NAV_ITEMS.map((item) => (
            <button
              key={item}
              onClick={() => { setActivePage(item); setMobileMenuOpen(false); }}
              className="font-display text-3xl font-light tracking-widest"
              style={{ color: "var(--gold)" }}
            >
              {item}
            </button>
          ))}
        </div>
      )}

      {/* ===== ГЛАВНАЯ ===== */}
      {activePage === "Главная" && (
        <div>
          {/* Hero */}
          <section className="relative min-h-screen flex items-center overflow-hidden">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${COLLECTION_IMG})`, filter: "brightness(0.2) saturate(0.7)" }}
            />
            <div className="absolute inset-0" style={{ background: "linear-gradient(120deg, rgba(13,13,13,0.97) 40%, rgba(13,13,13,0.4) 100%)" }} />
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-px h-64 opacity-40" style={{ background: "linear-gradient(to bottom, transparent, var(--gold), transparent)" }} />

            <div className="relative z-10 px-6 md:px-16 max-w-5xl pt-24">
              <div className="animate-fade-in-up stagger-1 flex items-center gap-3 mb-8">
                <div className="w-10 h-px" style={{ background: "var(--gold)" }} />
                <span className="font-body text-xs tracking-[0.5em] uppercase" style={{ color: "var(--gold)" }}>
                  Эксклюзивно для Золотого Яблока
                </span>
              </div>

              <h1
                className="animate-fade-in-up stagger-2 font-display font-light leading-none mb-8"
                style={{ fontSize: "clamp(3.5rem, 9vw, 8rem)", letterSpacing: "-0.02em", lineHeight: 0.95 }}
              >
                Аромат
                <br />
                как{" "}
                <em className="italic" style={{ color: "var(--gold)" }}>
                  искусство
                </em>
              </h1>

              <p
                className="animate-fade-in-up stagger-3 font-body font-light text-base md:text-lg mb-12 max-w-lg"
                style={{ color: "var(--text-muted)", lineHeight: "1.9" }}
              >
                Премиальные свечи и аромадиффузоры. Натуральный состав, уникальные ароматы, безупречная эстетика — для самых взыскательных покупателей.
              </p>

              <div className="animate-fade-in-up stagger-4 flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => setActivePage("Каталог")}
                  className="px-10 py-4 font-body text-xs tracking-widest uppercase font-bold transition-all hover:opacity-90"
                  style={{ background: "var(--gold)", color: "var(--dark-bg)" }}
                >
                  Открыть каталог
                </button>
                <button
                  onClick={() => setActivePage("О компании")}
                  className="px-10 py-4 font-body text-xs tracking-widest uppercase font-light transition-all"
                  style={{ border: "1px solid rgba(200,168,75,0.35)", color: "var(--text-primary)" }}
                >
                  О бренде
                </button>
              </div>
            </div>

            <div className="absolute bottom-10 left-6 md:left-16 flex gap-12 animate-fade-in-up stagger-5">
              {[
                { val: "24+", label: "Аромата" },
                { val: "8 лет", label: "На рынке" },
                { val: "100%", label: "Натурально" },
              ].map((s) => (
                <div key={s.label}>
                  <div className="font-display text-3xl font-light" style={{ color: "var(--gold)" }}>{s.val}</div>
                  <div className="font-body text-xs tracking-widest uppercase" style={{ color: "var(--text-muted)" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Рынок */}
          <section className="py-24 px-6 md:px-16" style={{ background: "var(--card-bg)" }}>
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-8 h-px" style={{ background: "var(--gold)" }} />
                <span className="font-body text-xs tracking-[0.4em] uppercase" style={{ color: "var(--gold)" }}>Контекст рынка</span>
              </div>
              <h2 className="font-display text-5xl md:text-6xl font-light mb-14" style={{ lineHeight: 1.1 }}>
                Рынок ароматизации<br />
                <em className="italic" style={{ color: "var(--gold)" }}>растёт</em>
              </h2>

              <div className="grid md:grid-cols-3 gap-5">
                {[
                  { icon: "TrendingUp", val: "+34%", label: "Рост рынка ароматов в России за 2 года", color: "var(--gold)" },
                  { icon: "Users", val: "18–45", label: "Основная аудитория — активные покупатели Золотого Яблока", color: "var(--crimson)" },
                  { icon: "Award", val: "Топ-5", label: "Категория товаров для дома растёт быстрее косметики", color: "var(--gold)" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="p-8 card-hover cursor-default"
                    style={{ border: "1px solid rgba(200,168,75,0.15)", background: "var(--dark-bg)" }}
                  >
                    <Icon name={item.icon} fallback="Star" size={26} className="mb-4" style={{ color: item.color }} />
                    <div className="font-display text-5xl font-light mb-3" style={{ color: item.color }}>{item.val}</div>
                    <div className="font-body text-sm font-light leading-relaxed" style={{ color: "var(--text-muted)" }}>{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Хиты */}
          <section className="py-24 px-6 md:px-16">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center justify-between mb-12">
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-8 h-px" style={{ background: "var(--gold)" }} />
                    <span className="font-body text-xs tracking-[0.4em] uppercase" style={{ color: "var(--gold)" }}>Коллекция</span>
                  </div>
                  <h2 className="font-display text-5xl font-light">Хиты сезона</h2>
                </div>
                <button
                  onClick={() => setActivePage("Каталог")}
                  className="hidden md:flex items-center gap-2 font-body text-xs tracking-widest uppercase"
                  style={{ color: "var(--gold)" }}
                >
                  Весь каталог <Icon name="ArrowRight" size={14} />
                </button>
              </div>

              <div className="grid md:grid-cols-3 gap-5">
                {PRODUCTS.slice(0, 3).map((p) => (
                  <div
                    key={p.id}
                    className="card-hover cursor-pointer group"
                    style={{ background: "var(--card-bg)", border: "1px solid rgba(200,168,75,0.1)" }}
                  >
                    <div className="relative overflow-hidden" style={{ height: 300 }}>
                      <img src={p.img} alt={p.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                      {p.tag && (
                        <div className="absolute top-4 left-4 px-3 py-1 font-body text-xs tracking-widest uppercase" style={{ background: "var(--crimson)", color: "#fff" }}>
                          {p.tag}
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <div className="font-body text-xs tracking-widest uppercase mb-2" style={{ color: "var(--text-muted)" }}>
                        {p.type === "candle" ? "Свеча" : "Диффузор"} · {p.scent}
                      </div>
                      <div className="font-display text-2xl font-light mb-4">{p.name}</div>
                      <div className="flex items-center justify-between">
                        <div className="font-body font-bold text-lg" style={{ color: "var(--gold)" }}>{p.price.toLocaleString()} ₽</div>
                        <button
                          className="w-9 h-9 flex items-center justify-center rounded-full transition-all"
                          style={{ border: "1px solid var(--gold)", color: "var(--gold)" }}
                        >
                          <Icon name="Plus" size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Галерея */}
          <section className="py-24 px-6 md:px-16" style={{ background: "var(--card-bg)" }}>
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-8 h-px" style={{ background: "var(--gold)" }} />
                <span className="font-body text-xs tracking-[0.4em] uppercase" style={{ color: "var(--gold)" }}>Атмосфера</span>
              </div>
              <h2 className="font-display text-5xl font-light mb-12">Продукция в интерьере</h2>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {[CANDLE_IMG, DIFFUSER_IMG, COLLECTION_IMG, DIFFUSER_IMG, CANDLE_IMG, COLLECTION_IMG].map((img, i) => (
                  <div key={i} className="relative overflow-hidden group" style={{ height: i === 0 || i === 5 ? 320 : 220 }}>
                    <img src={img} alt="" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108" />
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: "rgba(200,168,75,0.12)" }} />
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA */}
          <section
            className="py-32 px-6 md:px-16 text-center relative overflow-hidden"
            style={{ background: "linear-gradient(135deg, #14100A 0%, #0D0D0D 50%, #0A0D0A 100%)" }}
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-20" style={{ background: "linear-gradient(to bottom, var(--gold), transparent)" }} />
            <div className="max-w-2xl mx-auto">
              <h2 className="font-display text-5xl md:text-6xl font-light mb-6">
                Готовы к<br />
                <em className="italic" style={{ color: "var(--gold)" }}>сотрудничеству?</em>
              </h2>
              <p className="font-body font-light mb-10 max-w-md mx-auto" style={{ color: "var(--text-muted)", lineHeight: 1.8 }}>
                Узнайте об условиях поставки, маркетинговой поддержке и эксклюзивных условиях для Золотого Яблока.
              </p>
              <button
                onClick={() => setActivePage("Контакты")}
                className="px-12 py-5 font-body text-xs tracking-widest uppercase font-bold transition-all hover:opacity-90"
                style={{ background: "var(--gold)", color: "var(--dark-bg)" }}
              >
                Связаться с нами
              </button>
            </div>
          </section>
        </div>
      )}

      {/* ===== КАТАЛОГ / СВЕЧИ / АРОМАДИФФУЗОРЫ ===== */}
      {(activePage === "Каталог" || activePage === "Свечи" || activePage === "Аромадиффузоры") && (
        <div className="pt-28 pb-20 px-6 md:px-16">
          <div className="max-w-7xl mx-auto">
            <div className="mb-12">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-8 h-px" style={{ background: "var(--gold)" }} />
                <span className="font-body text-xs tracking-[0.4em] uppercase" style={{ color: "var(--gold)" }}>
                  {activePage === "Свечи" ? "Коллекция" : activePage === "Аромадиффузоры" ? "Коллекция" : "Полный каталог"}
                </span>
              </div>
              <h2 className="font-display text-5xl md:text-6xl font-light">{activePage}</h2>
            </div>

            <div className="flex flex-col lg:flex-row gap-10">
              {/* Sidebar */}
              <div className="lg:w-60 flex-shrink-0">
                <div className="sticky top-24 space-y-8">
                  {activePage === "Каталог" && (
                    <div>
                      <div className="font-body text-xs tracking-widest uppercase mb-3" style={{ color: "var(--text-muted)" }}>Тип</div>
                      <div className="flex flex-col gap-1.5">
                        {[{ val: "all", label: "Все" }, { val: "candle", label: "Свечи" }, { val: "diffuser", label: "Диффузоры" }].map((t) => (
                          <button
                            key={t.val}
                            onClick={() => setFilterType(t.val)}
                            className={`px-4 py-2.5 text-left font-body text-sm rounded-sm transition-all ${filterType === t.val ? "filter-btn-active" : "filter-btn"}`}
                          >
                            {t.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div>
                    <div className="font-body text-xs tracking-widest uppercase mb-3" style={{ color: "var(--text-muted)" }}>Тип запаха</div>
                    <div className="flex flex-col gap-1.5">
                      {SCENTS.map((s) => (
                        <button
                          key={s}
                          onClick={() => setFilterScent(s)}
                          className={`px-4 py-2.5 text-left font-body text-sm rounded-sm transition-all capitalize ${filterScent === s ? "filter-btn-active" : "filter-btn"}`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="font-body text-xs tracking-widest uppercase mb-3" style={{ color: "var(--text-muted)" }}>Сезон</div>
                    <div className="flex flex-col gap-1.5">
                      {SEASONS.map((s) => (
                        <button
                          key={s}
                          onClick={() => setFilterSeason(s)}
                          className={`px-4 py-2.5 text-left font-body text-sm rounded-sm transition-all capitalize ${filterSeason === s ? "filter-btn-active" : "filter-btn"}`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <div className="font-body text-xs tracking-widest uppercase" style={{ color: "var(--text-muted)" }}>Цена</div>
                      <div className="font-body text-xs font-bold" style={{ color: "var(--gold)" }}>до {maxPrice.toLocaleString()} ₽</div>
                    </div>
                    <input
                      type="range" min={1000} max={5000} step={100}
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(Number(e.target.value))}
                      className="w-full cursor-pointer"
                    />
                    <div className="flex justify-between mt-1.5">
                      <span className="font-body text-xs" style={{ color: "var(--text-muted)" }}>1 000 ₽</span>
                      <span className="font-body text-xs" style={{ color: "var(--text-muted)" }}>5 000 ₽</span>
                    </div>
                  </div>

                  <div>
                    <div className="font-body text-xs tracking-widest uppercase mb-3" style={{ color: "var(--text-muted)" }}>Состав</div>
                    <div className="flex flex-col gap-1.5">
                      {COMPOSITIONS.map((s) => (
                        <button
                          key={s}
                          onClick={() => setFilterComposition(s)}
                          className={`px-4 py-2.5 text-left font-body text-sm rounded-sm transition-all ${filterComposition === s ? "filter-btn-active" : "filter-btn"}`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => { setFilterScent("Все"); setFilterSeason("Все"); setFilterComposition("Все"); setFilterType("all"); setMaxPrice(5000); }}
                    className="w-full px-4 py-2.5 font-body text-xs tracking-widest uppercase transition-all hover:border-gold"
                    style={{ border: "1px solid rgba(200,168,75,0.2)", color: "var(--text-muted)" }}
                  >
                    Сбросить
                  </button>
                </div>
              </div>

              {/* Grid */}
              <div className="flex-1">
                <div className="flex items-center justify-between mb-6">
                  <div className="font-body text-sm" style={{ color: "var(--text-muted)" }}>
                    Найдено: <span className="font-bold" style={{ color: "var(--gold)" }}>{catalogProducts.length}</span> товаров
                  </div>
                </div>

                {catalogProducts.length === 0 ? (
                  <div className="text-center py-20">
                    <Icon name="Search" size={40} className="mx-auto mb-4" style={{ color: "var(--text-muted)" }} />
                    <div className="font-display text-2xl font-light mb-2" style={{ color: "var(--text-muted)" }}>Ничего не найдено</div>
                    <div className="font-body text-sm" style={{ color: "var(--text-muted)" }}>Попробуйте изменить фильтры</div>
                  </div>
                ) : (
                  <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
                    {catalogProducts.map((p) => (
                      <div
                        key={p.id}
                        className="card-hover cursor-pointer group"
                        style={{ background: "var(--card-bg)", border: "1px solid rgba(200,168,75,0.1)" }}
                      >
                        <div className="relative overflow-hidden" style={{ height: 240 }}>
                          <img src={p.img} alt={p.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                          {p.tag && (
                            <div className="absolute top-3 left-3 px-2 py-1 font-body text-xs tracking-widest uppercase" style={{ background: "var(--crimson)", color: "#fff" }}>
                              {p.tag}
                            </div>
                          )}
                          <div
                            className="absolute bottom-3 right-3 px-2 py-1 font-body text-xs tracking-widest uppercase"
                            style={{ background: "rgba(13,13,13,0.85)", color: "var(--text-muted)", backdropFilter: "blur(4px)" }}
                          >
                            {p.type === "candle" ? "Свеча" : "Диффузор"}
                          </div>
                        </div>
                        <div className="p-5">
                          <div className="flex flex-wrap gap-1 mb-2">
                            <span className="font-body text-xs px-2 py-0.5 capitalize" style={{ background: "rgba(200,168,75,0.1)", color: "var(--gold)", border: "1px solid rgba(200,168,75,0.2)" }}>{p.scent}</span>
                            <span className="font-body text-xs px-2 py-0.5 capitalize" style={{ background: "rgba(255,255,255,0.04)", color: "var(--text-muted)", border: "1px solid rgba(255,255,255,0.06)" }}>{p.season}</span>
                          </div>
                          <div className="font-display text-2xl font-light mb-1">{p.name}</div>
                          <div className="font-body text-xs mb-4" style={{ color: "var(--text-muted)" }}>{p.composition}</div>
                          <div className="flex items-center justify-between">
                            <div className="font-body font-bold text-lg" style={{ color: "var(--gold)" }}>{p.price.toLocaleString()} ₽</div>
                            <button
                              className="flex items-center gap-1.5 px-3 py-2 font-body text-xs tracking-widest uppercase transition-all hover:opacity-90"
                              style={{ background: "var(--gold)", color: "var(--dark-bg)" }}
                            >
                              <Icon name="ShoppingBag" size={11} />
                              В корзину
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===== О КОМПАНИИ ===== */}
      {activePage === "О компании" && (
        <div className="pt-28 pb-20">
          {/* Hero */}
          <div className="py-24 px-6 md:px-16 mb-16" style={{ background: "var(--card-bg)" }}>
            <div className="max-w-5xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-8 h-px" style={{ background: "var(--gold)" }} />
                <span className="font-body text-xs tracking-[0.4em] uppercase" style={{ color: "var(--gold)" }}>О бренде</span>
              </div>
              <h2 className="font-display font-light mb-8" style={{ fontSize: "clamp(3rem, 7vw, 6rem)", lineHeight: 1.05 }}>
                Мы создаём<br />
                <em className="italic" style={{ color: "var(--gold)" }}>атмосферу</em>
              </h2>
              <p className="font-body font-light text-lg max-w-2xl leading-relaxed" style={{ color: "var(--text-muted)" }}>
                LUMIÈRE — российский бренд премиальных ароматов для дома. Мы сочетаем природные ингредиенты высшего качества с современным дизайном, создавая продукты, которые превращают пространство в искусство.
              </p>
            </div>
          </div>

          {/* Split images */}
          <div className="px-6 md:px-16 mb-20">
            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-4">
              <div className="relative overflow-hidden group" style={{ height: 480 }}>
                <img src={CANDLE_IMG} alt="Свечи" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(13,13,13,0.85) 0%, transparent 55%)" }} />
                <div className="absolute bottom-8 left-8 right-8">
                  <h3 className="font-display text-4xl font-light mb-2">Свечи</h3>
                  <p className="font-body text-sm font-light" style={{ color: "var(--text-muted)" }}>Соевый и пчелиный воск · Хлопковый фитиль · 30–50 часов горения</p>
                </div>
              </div>
              <div className="relative overflow-hidden group" style={{ height: 480 }}>
                <img src={DIFFUSER_IMG} alt="Диффузоры" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(13,13,13,0.85) 0%, transparent 55%)" }} />
                <div className="absolute bottom-8 left-8 right-8">
                  <h3 className="font-display text-4xl font-light mb-2">Аромадиффузоры</h3>
                  <p className="font-body text-sm font-light" style={{ color: "var(--text-muted)" }}>Спиртовая основа · Ротанговые палочки · До 90 дней аромата</p>
                </div>
              </div>
            </div>
          </div>

          {/* Выводы и стратегия */}
          <div className="px-6 md:px-16 mb-20">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-8 h-px" style={{ background: "var(--gold)" }} />
                <span className="font-body text-xs tracking-[0.4em] uppercase" style={{ color: "var(--gold)" }}>Стратегия</span>
              </div>
              <h3 className="font-display text-4xl md:text-5xl font-light mb-12">
                Выводы и перспективы
              </h3>
              <div className="grid md:grid-cols-2 gap-8">
                {[
                  { title: "Растущий рынок", text: "Сегмент ароматов для дома показывает устойчивый рост 25–34% ежегодно, опережая смежные категории." },
                  { title: "Лояльная аудитория", text: "Покупатели ароматов — наиболее лояльный сегмент, с повторными покупками каждые 60–90 дней." },
                  { title: "Синергия с Золотым Яблоком", text: "Целевая аудитория бренда совпадает с покупателями Золотого Яблока более чем на 70%." },
                  { title: "Потенциал ROI", text: "Маржинальность выше среднего по категории на 35–40%. Быстрая окупаемость полочного пространства." },
                ].map((item) => (
                  <div key={item.title} className="p-8 card-hover" style={{ border: "1px solid rgba(200,168,75,0.15)", background: "var(--card-bg)" }}>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-2 h-2 rounded-full" style={{ background: "var(--gold)" }} />
                      <div className="font-display text-xl font-light">{item.title}</div>
                    </div>
                    <p className="font-body text-sm font-light leading-relaxed" style={{ color: "var(--text-muted)" }}>{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Преимущества ROI */}
          <div className="px-6 md:px-16">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-8 h-px" style={{ background: "var(--gold)" }} />
                <span className="font-body text-xs tracking-[0.4em] uppercase" style={{ color: "var(--gold)" }}>Позиционирование & ROI</span>
              </div>
              <h3 className="font-display text-4xl md:text-5xl font-light mb-12">
                Преимущества для<br />
                <em className="italic" style={{ color: "var(--gold)" }}>Золотого Яблока</em>
              </h3>

              <div className="grid md:grid-cols-3 gap-5">
                {[
                  { icon: "Sparkles", title: "Премиум-сегмент", desc: "Маржинальность выше средней по категории на 40%. Отличная витринная привлекательность." },
                  { icon: "RefreshCw", title: "Высокий LTV", desc: "Клиенты возвращаются за повторной покупкой. Средний цикл — 60–90 дней." },
                  { icon: "Package", title: "Готовая упаковка", desc: "Фирменная коробка с отделкой под золото. Идеальный подарочный продукт." },
                  { icon: "Leaf", title: "Эко-состав", desc: "100% натуральные компоненты. Без парабенов, фталатов, синтетических красителей." },
                  { icon: "Truck", title: "Логистика", desc: "Собственный склад в Москве. Поставка от 3 дней по всей России." },
                  { icon: "BarChart2", title: "Маркетинг", desc: "Контент, POS-материалы, обучение продавцов — всё включено в партнёрство." },
                ].map((item) => (
                  <div key={item.title} className="p-7 card-hover" style={{ border: "1px solid rgba(200,168,75,0.15)", background: "var(--card-bg)" }}>
                    <Icon name={item.icon} fallback="Star" size={22} className="mb-4" style={{ color: "var(--gold)" }} />
                    <div className="font-display text-xl font-light mb-2">{item.title}</div>
                    <div className="font-body text-sm font-light leading-relaxed" style={{ color: "var(--text-muted)" }}>{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===== КОНТАКТЫ ===== */}
      {activePage === "Контакты" && (
        <div className="pt-28 pb-20 px-6 md:px-16">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-8 h-px" style={{ background: "var(--gold)" }} />
              <span className="font-body text-xs tracking-[0.4em] uppercase" style={{ color: "var(--gold)" }}>Контакты</span>
            </div>
            <h2 className="font-display text-5xl md:text-6xl font-light mb-16">
              Свяжитесь<br />
              <em className="italic" style={{ color: "var(--gold)" }}>с нами</em>
            </h2>

            <div className="grid md:grid-cols-2 gap-16 mb-24">
              <div className="space-y-8">
                {[
                  { icon: "MapPin", label: "Адрес", val: "Москва, ул. Садовническая, 14" },
                  { icon: "Phone", label: "Телефон", val: "+7 (495) 123-45-67" },
                  { icon: "Mail", label: "Email", val: "b2b@lumiere-aroma.ru" },
                  { icon: "Clock", label: "Режим работы", val: "Пн–Пт: 9:00 — 18:00" },
                ].map((c) => (
                  <div key={c.label} className="flex items-start gap-4">
                    <div className="w-10 h-10 flex items-center justify-center flex-shrink-0" style={{ border: "1px solid rgba(200,168,75,0.3)" }}>
                      <Icon name={c.icon} fallback="Info" size={16} style={{ color: "var(--gold)" }} />
                    </div>
                    <div>
                      <div className="font-body text-xs tracking-widest uppercase mb-1" style={{ color: "var(--text-muted)" }}>{c.label}</div>
                      <div className="font-body text-base">{c.val}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                {[
                  { label: "Имя", type: "text", placeholder: "Ваше имя" },
                  { label: "Компания", type: "text", placeholder: "Название компании" },
                  { label: "Email", type: "email", placeholder: "your@email.com" },
                ].map((f) => (
                  <div key={f.label}>
                    <label className="block font-body text-xs tracking-widest uppercase mb-2" style={{ color: "var(--text-muted)" }}>{f.label}</label>
                    <input
                      type={f.type}
                      placeholder={f.placeholder}
                      className="w-full px-4 py-3 font-body text-sm outline-none transition-all focus:border-gold"
                      style={{ background: "var(--card-bg)", border: "1px solid rgba(200,168,75,0.2)", color: "var(--text-primary)" }}
                    />
                  </div>
                ))}
                <div>
                  <label className="block font-body text-xs tracking-widest uppercase mb-2" style={{ color: "var(--text-muted)" }}>Сообщение</label>
                  <textarea
                    rows={4}
                    placeholder="Расскажите о вашем запросе..."
                    className="w-full px-4 py-3 font-body text-sm outline-none resize-none transition-all"
                    style={{ background: "var(--card-bg)", border: "1px solid rgba(200,168,75,0.2)", color: "var(--text-primary)" }}
                  />
                </div>
                <button
                  className="w-full py-4 font-body text-xs tracking-widest uppercase font-bold transition-all hover:opacity-90"
                  style={{ background: "var(--gold)", color: "var(--dark-bg)" }}
                >
                  Отправить заявку
                </button>
              </div>
            </div>

            {/* Comparison Table */}
            <div className="mb-20">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-8 h-px" style={{ background: "var(--gold)" }} />
                <span className="font-body text-xs tracking-[0.4em] uppercase" style={{ color: "var(--gold)" }}>Сравнение</span>
              </div>
              <h3 className="font-display text-4xl font-light mb-10">Свечи vs Диффузоры</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr style={{ borderBottom: "1px solid rgba(200,168,75,0.3)" }}>
                      <th className="text-left py-4 pr-8 font-body text-xs tracking-widest uppercase" style={{ color: "var(--text-muted)" }}>Характеристика</th>
                      <th className="text-center py-4 px-6 font-body text-xs tracking-widest uppercase" style={{ color: "var(--gold)" }}>🕯 Свечи</th>
                      <th className="text-center py-4 px-6 font-body text-xs tracking-widest uppercase" style={{ color: "var(--crimson)" }}>🌿 Диффузоры</th>
                    </tr>
                  </thead>
                  <tbody>
                    {COMPARISON.map((row, i) => (
                      <tr key={row.feature} style={{ borderBottom: "1px solid rgba(255,255,255,0.05)", background: i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.015)" }}>
                        <td className="py-4 pr-8 font-body text-sm" style={{ color: "var(--text-muted)" }}>{row.feature}</td>
                        <td className="py-4 px-6 text-center font-body text-sm font-medium">{row.candle}</td>
                        <td className="py-4 px-6 text-center font-body text-sm font-medium">{row.diffuser}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Chart */}
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-8 h-px" style={{ background: "var(--gold)" }} />
                <span className="font-body text-xs tracking-[0.4em] uppercase" style={{ color: "var(--gold)" }}>Тренды</span>
              </div>
              <h3 className="font-display text-4xl font-light mb-2">Динамика спроса</h3>
              <p className="font-body text-sm mb-10" style={{ color: "var(--text-muted)" }}>Индекс продаж по месяцам (база 100 = Декабрь)</p>

              <div className="p-8 rounded-sm" style={{ background: "var(--card-bg)", border: "1px solid rgba(200,168,75,0.1)" }}>
                <div className="flex items-end gap-2" style={{ height: 200 }}>
                  {TREND_DATA.map((d) => (
                    <div key={d.month} className="flex-1 flex flex-col items-center gap-1">
                      <div className="w-full flex gap-0.5 items-end">
                        <div
                          className="flex-1 rounded-t-sm"
                          style={{ height: `${(d.candles / maxBar) * 160}px`, background: "var(--gold)", opacity: 0.8 }}
                          title={`Свечи: ${d.candles}`}
                        />
                        <div
                          className="flex-1 rounded-t-sm"
                          style={{ height: `${(d.diffusers / maxBar) * 160}px`, background: "var(--crimson)", opacity: 0.8 }}
                          title={`Диффузоры: ${d.diffusers}`}
                        />
                      </div>
                      <div className="font-body" style={{ color: "var(--text-muted)", fontSize: "9px" }}>{d.month}</div>
                    </div>
                  ))}
                </div>
                <div className="flex gap-6 mt-4 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-sm" style={{ background: "var(--gold)" }} />
                    <span className="font-body text-xs" style={{ color: "var(--text-muted)" }}>Свечи</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-sm" style={{ background: "var(--crimson)" }} />
                    <span className="font-body text-xs" style={{ color: "var(--text-muted)" }}>Диффузоры</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="py-12 px-6 md:px-16" style={{ borderTop: "1px solid rgba(200,168,75,0.12)" }}>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="font-display text-xl tracking-[0.35em]" style={{ color: "var(--gold)" }}>LUMIÈRE</div>
          <div className="font-body text-xs tracking-widest" style={{ color: "var(--text-muted)" }}>© 2024 · Эксклюзивно для Золотого Яблока</div>
          <div className="flex gap-6">
            {["Каталог", "О компании", "Контакты"].map((item) => (
              <button
                key={item}
                onClick={() => setActivePage(item)}
                className="font-body text-xs tracking-widest uppercase transition-colors hover:text-gold"
                style={{ color: "var(--text-muted)" }}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;