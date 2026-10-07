/* ==========================================================================
   Hesham Ahmed — Portfolio · main.js
   Vanilla JS, no dependencies:
   1. Language toggle (EN ⇄ AR, RTL)   2. Theme toggle (light/dark)
   3. Mobile menu                      4. Copy e-mail
   5. Header state + active nav link
   ========================================================================== */
(function () {
  'use strict';

  var root = document.documentElement;
  var store = {
    get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) { /* storage blocked */ } }
  };

  /* ------------------------------------------------------------------
     1. Translations
     English lives in the HTML (best for SEO); Arabic lives here.
     Elements opt in with data-i18n="key" and data-i18n-attr="attr:key".
     ------------------------------------------------------------------ */
  var AR = {
    'meta.title': 'هشام أحمد — مهندس برمجيات Full-Stack ‎.NET | أنظمة المؤسسات والمالية وسير الموافقات',
    'meta.desc': 'هشام أحمد محمد — مهندس Full-Stack ‎.NET يبني منصات مؤسسية آمنة ووحدات مالية وERP وسير موافقات متعددة المراحل لجهات حكومية وشركات في الإمارات والسعودية ومصر.',

    'skip': 'تخطَّ إلى المحتوى',
    'brand': 'هشام أحمد',
    'brandHome': 'هشام أحمد — الصفحة الرئيسية',
    'nav.services': 'الخدمات',
    'nav.work': 'الأعمال',
    'nav.experience': 'الخبرة',
    'nav.skills': 'المهارات',
    'nav.contact': 'تواصل',
    'cv': 'تحميل السيرة الذاتية',
    'themeToDark': 'التبديل إلى الوضع الداكن',
    'themeToLight': 'التبديل إلى الوضع الفاتح',
    'menuOpen': 'فتح القائمة',
    'menuClose': 'إغلاق القائمة',

    'hero.status': 'متاح لوظائف عن بُعد ومشاريع مستقلة',
    'hero.name': 'هشام أحمد محمد',
    'hero.role': 'مهندس برمجيات Full-Stack ‎.NET',
    'hero.statement': 'أبني منصات مؤسسية يكون فيها كل طلب وكل موافقة وكل معاملة <em>قابلة للتتبّع</em>.',
    'hero.lede': 'من الإجراءات الورقية وجداول Excel إلى أنظمة ويب آمنة ثنائية اللغة — وحدات مالية، سير موافقات، أنظمة ERP وواجهات API، أصمّمها وأسلّمها من البداية إلى النهاية باستخدام ASP.NET وSQL Server وAngular.',
    'hero.ctaEmail': 'ابدأ المحادثة',
    'hero.metaLabel': 'الموقع واللغات',
    'hero.meta1': 'القاهرة، مصر · عن بُعد',
    'hero.meta2': 'ساعات عمل تناسب الخليج',
    'hero.meta3': 'العربية · الإنجليزية',

    'pipe.kind': 'مناقلة ميزانية',
    'pipe.s1': 'تم التقديم',
    'pipe.s1who': 'مقدّم الطلب',
    'pipe.s2': 'مراجعة الإدارة',
    'pipe.s2who': 'مدير الإدارة · بالتفويض',
    'pipe.s3': 'المالية — اعتماد مزدوج',
    'pipe.s3who': 'مسؤول الميزانية + المراقب المالي',
    'pipe.s4': 'معتمد',
    'pipe.s4who': 'المدير العام',
    'pipe.stamp': 'معتمد',
    'pipe.caption': 'رسم توضيحي: طلب مناقلة ميزانية يمرّ بأربع مراحل اعتماد — التقديم ومراجعة الإدارة والاعتماد المالي المزدوج والاعتماد النهائي — مع سجل تدقيق للإشعارات والتحقق.',

    'proof.1k': 'منصات حكومية',
    'proof.1v': 'الشارقة، الإمارات · المدينة المنورة، السعودية',
    'proof.2k': 'وحدات مالية',
    'proof.2v': 'لكلٍّ منها سير موافقات متعدد المراحل',
    'proof.3k': 'خبرة ‎.NET مؤسسية',
    'proof.3v': 'سنوات، عن بُعد لعملاء خليجيين',
    'proof.4k': 'الواجهات',
    'proof.4v': 'دعم كامل للعربية RTL وثنائية اللغة',

    'services.eyebrow': 'ماذا يمكنني أن أبني لك',
    'services.title': 'إذا كان عملك يقوم على طلبات وموافقات وأرقام، فأنا أحوّله إلى نظام.',
    'services.lede': 'كل خدمة هنا سبق أن سلّمتها فعليًا في بيئة إنتاج — وليست قائمة أمنيات.',
    'sv.1t': 'منصات ويب مؤسسية',
    'sv.1d': 'تطبيقات ASP.NET بصلاحيات حسب الأدوار تستبدل النماذج الورقية وجداول Excel بنظام واحد آمن وقابل للبحث.',
    'sv.1p': 'مُطبّق في · منصة SPEA، الشارقة',
    'sv.2t': 'وحدات مالية وERP',
    'sv.2d': 'الميزانيات وطلبات الشراء والمناقلات والفواتير والقيود والضرائب والمخزون — بنمذجة صحيحة وأرقام متطابقة.',
    'sv.2p': 'مُطبّق في · SPEA · نظام ERP أمانة المدينة',
    'sv.3t': 'محركات سير الموافقات',
    'sv.3d': 'موافقات متعددة المراحل قابلة للتهيئة مع التفويض والاعتماد المزدوج وتتبّع مستوى الخدمة SLA وتنبيهات بالبريد والرسائل وداخل النظام.',
    'sv.3p': 'مُطبّق في · 5 وحدات مالية',
    'sv.4t': 'واجهات API وتكاملات',
    'sv.4d': 'واجهات RESTful نظيفة بـ ASP.NET Core مع JWT وEF Core وSignalR للتحديث اللحظي، جاهزة للويب والموبايل.',
    'sv.4p': 'مُطبّق في · API منصة دروب شيبنج',
    'sv.5t': 'لوحات مؤشرات وتقارير',
    'sv.5d': 'لوحات KPI للإنفاق والطلبات المعلّقة والالتزام بمستوى الخدمة، وتقارير Excel وPDF تقرؤها الإدارة فعلًا.',
    'sv.5p': 'مُطبّق في · مؤشرات SPEA · تقارير المختبر',
    'sv.6t': 'الأمان والامتثال',
    'sv.6d': 'مصادقة ثنائية/متعددة، تشفير AES-256، سجل تدقيق، تحديد معدل الطلبات وممارسات OWASP — بما يتوافق مع قانون حماية البيانات الإماراتي رقم 45 لسنة 2021.',
    'sv.6p': 'مُطبّق في · مشاريع بمعايير حكومية',

    'work.eyebrow': 'أعمال مختارة',
    'work.title': 'منصتان حكوميتان مبنيتان لإجراءات حقيقية في القطاع العام.',
    'work.lede': 'كلاهما نظام سرّي خاص بالعميل، لذلك تعرض كل حالة شكل سير العمل الذي بنيته بدلًا من لقطات الشاشة.',
    'label.problem': 'المشكلة',
    'label.built': 'ما الذي بنيته',
    'label.stack': 'التقنيات',
    'label.outcome': 'النتيجة',

    'case1.where': 'حكومة الشارقة · الإمارات',
    'case1.when': '2024 — حتى الآن',
    'case1.title': 'منصة SPEA لإدارة خدمات الدعم',
    'case1.summary': 'منصة مؤسسية تحوّل خدمات الدعم المالي لجهة حكومية إلى خدمات رقمية.',
    'case1.problem': 'كانت خدمات الدعم المالي ورقية: طلبات الميزانية والمناقلات والفواتير تنتقل يدويًا، والموافقات يصعب تتبّعها، ولا توجد رؤية موحّدة للإنفاق أو الالتزامات.',
    'case1.b1': 'خمس وحدات مالية — إعداد الميزانية السنوية، طلبات الشراء، مناقلات الميزانية، تعزيز الميزانية، وإدارة الفواتير.',
    'case1.b2': 'محرك سير عمل قابل للتهيئة: صلاحيات حسب الأدوار، تفويض، اعتماد مزدوج، وإشعارات آلية بالبريد والرسائل النصية وداخل النظام.',
    'case1.b3': 'لوحة مؤشرات أداء لإنفاق الإدارات والطلبات المعلّقة والالتزام بمستوى الخدمة والالتزامات المالية.',
    'case1.b4': 'أمان من التصميم: AES-256 وTLS 1.3 ومصادقة ثنائية وسجل تدقيق كامل وتحديد معدل الطلبات، متوافق مع قانون حماية البيانات الإماراتي رقم 45/2021.',
    'case1.outcome': 'استُبدلت الطلبات المالية الورقية بسير عمل رقمي واحد قابل للتدقيق، مع رؤية لحظية للإدارة.',
    'flow1.1': 'تقديم الطلب',
    'flow1.2': 'مدير الإدارة',
    'flow1.2s': '↲ تفويض',
    'flow1.3': 'اعتماد مزدوج',
    'flow1.3a': 'الميزانية',
    'flow1.3b': 'المالية',
    'flow1.4': 'اعتماد المدير العام',
    'flow1.5': 'الالتزام والتقرير',
    'flow1.cap': 'سير موافقات مُجرّد — كل خطوة مُسجّلة ومُبلّغ عنها ومحسوبة زمنيًا.',
    'flow.rail1': 'سجل التدقيق',
    'flow.rail2': 'الإشعارات',
    'flow.rail3': 'مؤقّت SLA',
    'flow.rail4': 'ترحيل ERP',

    'case2.where': 'أمانة المدينة المنورة · السعودية',
    'case2.when': '2024 — حتى الآن',
    'case2.title': 'نظام إدارة المختبرات — أمانة المدينة المنورة',
    'case2.summary': 'نظام مختبرات وERP لاختبارات مواد البناء والعمليات المالية المرتبطة بها.',
    'case2.problem': 'احتاجت نتائج اختبارات الأسفلت والركام والتربة إلى إدخال منظّم، ومسار اعتماد مضبوط قبل الإصدار، وتقارير موثوقة — إلى جانب العمليات المحاسبية الأساسية.',
    'case2.b1': 'وحدات اختبار للأسفلت والركام والتربة بإدخال بيانات منظّم وتتبّع للنتائج.',
    'case2.b2': 'مسارات اعتماد نتائج المختبر مع تقارير Excel وPDF.',
    'case2.b3': 'مساهمة في المصادقة متعددة العوامل والتحليل بمساعدة الذكاء الاصطناعي وتحديد معدل الطلبات.',
    'case2.b4': 'وحدات ERP أساسية: القيود اليومية، الفواتير، الضرائب، وإدارة المخزون.',
    'case2.outcome': 'نتائج الاختبارات تُسجَّل مرة واحدة، وتُعتمد عبر مسار محدد، وتصدر بتقارير موحّدة — مع المالية في النظام نفسه.',
    'flow2.1': 'تسجيل العيّنة',
    'flow2.2': 'إدخال الاختبار',
    'flow2.2a': 'أسفلت',
    'flow2.2b': 'ركام',
    'flow2.2c': 'تربة',
    'flow2.3': 'المراجعة الفنية',
    'flow2.4': 'اعتماد النتيجة',
    'flow2.5': 'تقرير · Excel / PDF',
    'flow2.cap': 'مسار مختبر مُجرّد — من العيّنة إلى نتيجة معتمدة قابلة للتقرير.',

    'process.eyebrow': 'طريقة عملي',
    'process.title': 'مسار واضح من إجراءاتك إلى نظام يعمل.',
    'st.1t': 'فهم الإجراء الحقيقي',
    'st.1d': 'من يطلب، ومن يعتمد، وما الذي يُوقَّع، وما الذي يجب أن يظهر في التقارير — قبل كتابة أي كود.',
    'st.2t': 'نمذجة البيانات والقواعد',
    'st.2d': 'قاعدة بيانات SQL Server نظيفة وقواعد عمل موثّقة، لتتطابق الأرقام دائمًا.',
    'st.3t': 'بناء على مراحل قصيرة',
    'st.3d': 'ميزات تعمل وتجرّبها مبكرًا، بكود منظّم وفق SOLID وN-Tier ومُختبَر.',
    'st.4t': 'تأمين وتسليم ودعم',
    'st.4d': 'صلاحيات ومصادقة ثنائية وسجل تدقيق ونشر على IIS أو السحابة — مع توثيق يبقى لديك.',

    'exp.eyebrow': 'الخبرة',
    'exp.title': 'سجل التدقيق.',
    'exp.present': 'حتى الآن',
    'exp.1r': 'مطوّر Full-Stack ‎.NET',
    'exp.1m': 'عن بُعد · القاهرة، مصر',
    'exp.1a': 'منصة SPEA لإدارة خدمات الدعم لحكومة الشارقة (الإمارات): خمس وحدات مالية، ومحرك موافقات قابل للتهيئة، ولوحة مؤشرات، وأمان بمعايير حكومية.',
    'exp.1b': 'نظام إدارة المختبرات لأمانة المدينة المنورة (السعودية): وحدات اختبارات المختبر، ومسارات اعتماد النتائج، ووحدات ERP الأساسية.',
    'exp.2r': 'مدرّس برمجة',
    'exp.2m': 'القاهرة، مصر',
    'exp.2a': 'تدريس تطوير الواجهات الأمامية وبايثون، وتصميم مناهج قائمة على المشاريع تشمل HTML وCSS وJavaScript وPython.',
    'exp.3r': 'مطوّر Backend مستقل',
    'exp.3c': '· منصة دروب شيبنج',
    'exp.3m': 'عن بُعد',
    'exp.3a': 'بناء RESTful API باستخدام ASP.NET Core 8 وJWT وEF Core وبنية N-Tier تغطي إدارة الشحن والمدفوعات وعمليات الطلبات.',

    'skills.eyebrow': 'المهارات',
    'skills.title': 'الأدوات، مُصنّفة حسب المهمة.',
    'sk.back': 'الخلفية (Back-end)',
    'sk.db': 'قواعد البيانات',
    'sk.qo': 'تحسين الاستعلامات',
    'sk.front': 'الواجهة (Front-end)',
    'sk.arch': 'المعمارية',
    'sk.sec': 'الأمان',
    'sk.tools': 'الأدوات',

    'edu.eyebrow': 'التعليم واللغات',
    'edu.title': 'أساس هندسي وتدريب مؤسسي.',
    'edu.1t': 'دبلوم تطوير الويب Full-Stack ‏(.NET / Angular)',
    'edu.1o': 'معهد تكنولوجيا المعلومات (ITI)',
    'edu.2t': 'بكالوريوس الهندسة',
    'edu.2o': 'معهد الجيزة العالي للهندسة',
    'lang.ar': 'العربية',
    'lang.arL': 'اللغة الأم',
    'lang.en': 'الإنجليزية',
    'lang.enL': 'جيد جدًا — مستوى مهني',

    'contact.eyebrow': 'افتح طلبًا',
    'contact.title': 'لديك إجراء يستحق نظامًا حقيقيًا؟',
    'contact.lede': 'أخبرني بما تحتاجه — منصة كاملة، أو وحدة، أو API، أو مساعدة في مشروع ‎.NET قائم. بالعربية أو الإنجليزية، كما تفضّل.',
    'contact.copy': 'نسخ',
    'contact.copied': 'تم النسخ',
    'contact.email': 'راسلني',

    'footer.name': 'هشام أحمد محمد',
    'footer.note': 'مبني يدويًا بـ HTML وCSS وJavaScript · بدون أدوات تتبّع',
    'footer.top': 'العودة للأعلى ↑'
  };

  var EN_EXTRA = {
    'themeToDark': 'Switch to dark theme',
    'themeToLight': 'Switch to light theme',
    'menuOpen': 'Open menu',
    'menuClose': 'Close menu',
    'contact.copied': 'Copied',
    'hero.metaLabel': 'Location and languages',
    'brandHome': 'Hesham Ahmed — home'
  };

  // Snapshot the English copy from the DOM once, so switching back is lossless.
  var EN = {};
  document.querySelectorAll('[data-i18n]').forEach(function (el) {
    var k = el.getAttribute('data-i18n');
    if (!(k in EN)) EN[k] = el.innerHTML;
  });
  EN['meta.title'] = document.title;
  var metaDesc = document.querySelector('meta[name="description"]');
  EN['meta.desc'] = metaDesc ? metaDesc.content : '';
  Object.keys(EN_EXTRA).forEach(function (k) { EN[k] = EN_EXTRA[k]; });

  var lang = root.lang === 'ar' ? 'ar' : 'en';
  function t(key) { return (lang === 'ar' ? AR[key] : EN[key]) || EN[key] || key; }

  function applyLanguage(next, persist) {
    lang = next;
    root.lang = next;
    root.dir = next === 'ar' ? 'rtl' : 'ltr';

    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var k = el.getAttribute('data-i18n');
      var v = next === 'ar' ? AR[k] : EN[k];
      if (v != null) el.innerHTML = v;
    });
    document.querySelectorAll('[data-i18n-attr]').forEach(function (el) {
      el.getAttribute('data-i18n-attr').split(';').forEach(function (pair) {
        var p = pair.split(':');
        if (p.length === 2) el.setAttribute(p[0].trim(), t(p[1].trim()));
      });
    });
    document.title = t('meta.title');
    if (metaDesc) metaDesc.content = t('meta.desc');

    // The toggle always offers the *other* language
    var btn = document.getElementById('lang-toggle');
    if (btn) {
      btn.textContent = next === 'ar' ? 'EN' : 'ع';
      btn.lang = next === 'ar' ? 'en' : 'ar';
      btn.setAttribute('aria-label', next === 'ar' ? 'View the site in English' : 'عرض الموقع بالعربية');
    }
    updateThemeLabel();
    updateMenuLabel();

    if (persist) {
      store.set('lang', next);
      // Keep a shareable URL (?lang=ar) without reloading
      try {
        var url = new URL(location.href);
        if (next === 'ar') url.searchParams.set('lang', 'ar'); else url.searchParams.delete('lang');
        history.replaceState(null, '', url);
      } catch (e) { /* old browser */ }
    }
  }

  /* ------------------------------------------------------------------
     2. Theme
     ------------------------------------------------------------------ */
  var mql = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;
  function currentTheme() {
    var set = root.getAttribute('data-theme');
    if (set) return set;
    return mql && mql.matches ? 'dark' : 'light';
  }
  function updateThemeLabel() {
    var btn = document.getElementById('theme-toggle');
    if (!btn) return;
    var key = currentTheme() === 'dark' ? 'themeToLight' : 'themeToDark';
    btn.setAttribute('data-i18n-attr', 'aria-label:' + key);
    btn.setAttribute('aria-label', t(key));
    var meta = document.querySelectorAll('meta[name="theme-color"]');
    meta.forEach(function (m) { m.removeAttribute('media'); m.content = currentTheme() === 'dark' ? '#0F1114' : '#F5F3EE'; });
  }
  document.getElementById('theme-toggle').addEventListener('click', function () {
    var next = currentTheme() === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    store.set('theme', next);
    updateThemeLabel();
  });
  if (mql && mql.addEventListener) mql.addEventListener('change', updateThemeLabel);

  /* ------------------------------------------------------------------
     3. Mobile menu
     ------------------------------------------------------------------ */
  var menuBtn = document.getElementById('menu-toggle');
  var nav = document.getElementById('site-nav');
  function updateMenuLabel() {
    if (!menuBtn) return;
    var open = menuBtn.getAttribute('aria-expanded') === 'true';
    var key = open ? 'menuClose' : 'menuOpen';
    menuBtn.setAttribute('data-i18n-attr', 'aria-label:' + key);
    menuBtn.setAttribute('aria-label', t(key));
  }
  function setMenu(open) {
    menuBtn.setAttribute('aria-expanded', String(open));
    nav.classList.toggle('is-open', open);
    updateMenuLabel();
  }
  menuBtn.addEventListener('click', function () {
    setMenu(menuBtn.getAttribute('aria-expanded') !== 'true');
  });
  nav.addEventListener('click', function (e) { if (e.target.closest('a')) setMenu(false); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && nav.classList.contains('is-open')) { setMenu(false); menuBtn.focus(); }
  });
  window.addEventListener('resize', function () { if (window.innerWidth >= 960) setMenu(false); });

  /* ------------------------------------------------------------------
     4. Copy e-mail
     ------------------------------------------------------------------ */
  var copyBtn = document.getElementById('copy-email');
  var copyStatus = document.getElementById('copy-status');
  copyBtn.addEventListener('click', function () {
    var email = copyBtn.getAttribute('data-email');
    var done = function () {
      var label = copyBtn.querySelector('[data-i18n]');
      label.textContent = t('contact.copied');
      copyBtn.classList.add('is-copied');
      copyStatus.textContent = t('contact.copied') + ': ' + email;
      setTimeout(function () {
        label.textContent = t('contact.copy');
        copyBtn.classList.remove('is-copied');
        copyStatus.textContent = '';
      }, 2000);
    };
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(email).then(done, fallback);
    } else { fallback(); }
    function fallback() {
      var ta = document.createElement('textarea');
      ta.value = email; ta.setAttribute('readonly', ''); ta.style.position = 'absolute'; ta.style.opacity = '0';
      document.body.appendChild(ta); ta.select();
      try { document.execCommand('copy'); done(); } catch (e) { /* ignore */ }
      document.body.removeChild(ta);
    }
  });

  /* ------------------------------------------------------------------
     5. Header border on scroll + current section in nav
     ------------------------------------------------------------------ */
  var header = document.querySelector('.site-header');
  var onScroll = function () { header.classList.toggle('is-scrolled', window.scrollY > 8); };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if ('IntersectionObserver' in window) {
    var links = {};
    nav.querySelectorAll('a[href^="#"]').forEach(function (a) { links[a.getAttribute('href').slice(1)] = a; });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        Object.keys(links).forEach(function (id) { links[id].removeAttribute('aria-current'); });
        var a = links[en.target.id === 'process' ? 'services' : en.target.id === 'education' ? 'skills' : en.target.id];
        if (a) a.setAttribute('aria-current', 'true');
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    document.querySelectorAll('main section[id]').forEach(function (s) { io.observe(s); });
  }

  /* ------------------------------------------------------------------
     Init
     ------------------------------------------------------------------ */
  document.getElementById('lang-toggle').addEventListener('click', function () {
    applyLanguage(lang === 'ar' ? 'en' : 'ar', true);
  });
  var y = document.getElementById('year');
  if (y) y.textContent = String(new Date().getFullYear());

  if (lang === 'ar') applyLanguage('ar', false);
  else { updateThemeLabel(); updateMenuLabel(); }
})();
