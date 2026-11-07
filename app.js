/* الظِّل — تطبيق تعليمي تفاعلي لفهم السلوك والحماية النفسية */
(function () {
  'use strict';

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));
  const pageContent = $('#pageContent');
  const pageLabel = $('#pageLabel');
  const sidebar = $('#sidebar');
  const modalBackdrop = $('#modalBackdrop');
  const modalContent = $('#modalContent');
  const toastEl = $('#toast');

  const pageNames = {
    home: 'الرئيسية',
    learn: 'أساسيات النفس',
    spot: 'اكشف التلاعب',
    cases: 'القضايا التفاعلية',
    lab: 'مختبر العقل',
    quiz: 'اختبر ملاحظتك',
    library: 'مكتبة الكتب',
    notes: 'دفتر التأمل',
    about: 'عن الموسوعة'
  };

  const lessons = [
    {
      id: 'influence',
      category: 'التأثير الاجتماعي',
      title: 'كيف يؤثر الآخرون في قراراتنا؟',
      summary: 'نفهم لماذا نميل أحياناً إلى موافقة الجماعة أو رد الجميل أو اتباع صاحب السلطة.',
      time: '6 دقائق',
      body: 'التأثير الاجتماعي جزء طبيعي من الحياة. نتعلم من الآخرين ونستفيد من خبراتهم، لكن التأثير قد يصبح ضغطاً عندما تُخفى المعلومات أو يُمنع الرفض أو يُستغل الخوف والذنب.',
      points: [
        'المعاملة بالمثل: قد نشعر برغبة في رد معروف، حتى عندما لم نطلبه.',
        'الدليل الاجتماعي: نميل إلى اعتبار سلوك المجموعة مؤشراً على الصواب، خصوصاً في المواقف الغامضة.',
        'السلطة: قد نعطي رأي صاحب المنصب وزناً أكبر من قوة الدليل نفسه.',
        'الندرة: قد يبدو الشيء أكثر قيمة لمجرد إخبارنا أن الوقت أو الكمية محدودان.'
      ],
      practice: 'قبل اتخاذ قرار تحت ضغط، اسأل: هل سأختار الشيء نفسه لو لم يكن هناك استعجال أو جمهور أو شعور بالذنب؟'
    },
    {
      id: 'gaslighting',
      category: 'العلاقات والحدود',
      title: 'ما هو التشكيك في الإدراك؟',
      summary: 'تمييز النمط المتكرر الذي يجعل الشخص يشك في ذاكرته أو فهمه للواقع.',
      time: '7 دقائق',
      body: 'التشكيك في الإدراك (Gaslighting) نمط من الإنكار والتحريف المتكرر قد يجعل الطرف الآخر يرتبك ويشك في ذاكرته أو حكمه. لا تكفي مشادة واحدة أو اختلاف في التذكر للحكم بوجود هذا النمط؛ الأهم هو التكرار والسياق والأثر.',
      points: [
        'إنكار أحداث واضحة بصورة متكررة رغم وجود قرائن.',
        'تحويل النقاش من الفعل المؤذي إلى اتهامك بالمبالغة أو عدم الاتزان.',
        'إعادة كتابة ما حدث بحيث تصبح مسؤولاً دائماً عن المشكلة.',
        'عزل الشخص عن مصادر التحقق أو عن أشخاص يثق بهم.'
      ],
      practice: 'دوّن الوقائع المهمة بهدوء، واطلب توضيحاً محدداً، واستعن بشخص موثوق. عند وجود تهديد أو خوف على السلامة، أعطِ الأولوية لطلب المساعدة.'
    },
    {
      id: 'boundaries',
      category: 'الحماية النفسية',
      title: 'الحدود الصحية ليست قسوة',
      summary: 'كيف تقول لا وتحمي وقتك وخصوصيتك دون الحاجة إلى شرح لا ينتهي.',
      time: '5 دقائق',
      body: 'الحدود توضح ما تقبله وما لا تقبله، وما ستفعله لحماية نفسك. هي ليست وسيلة لمعاقبة الآخرين، بل طريقة لتنظيم التعامل باحترام ووضوح.',
      points: [
        'استخدم جملة مباشرة وقصيرة: لا أشارك كلمة المرور.',
        'صف السلوك وأثره بدلاً من إطلاق حكم على شخصية الآخر.',
        'لا تفاوض على حقك في الخصوصية أو السلامة.',
        'راقب رد الفعل على الحدود؛ احترامها علامة صحية، ومعاقبتك بسببها إشارة تستحق الانتباه.'
      ],
      practice: 'اكتب حداً واحداً تحتاج إلى توضيحه، ثم صغه بجملة هادئة تبدأ بـ «أنا لا أقبل…».'
    },
    {
      id: 'bias',
      category: 'العقل واتخاذ القرار',
      title: 'الانحياز التأكيدي',
      summary: 'لماذا نبحث عن الأدلة التي توافق رأينا ونتجاهل ما يخالفه؟',
      time: '6 دقائق',
      body: 'الانحياز التأكيدي هو ميل إلى ملاحظة المعلومات التي تؤيد اعتقاداً سابقاً أو تفسيرها بطريقة تخدمه. قد يقع فيه الجميع، ولا يعني أن الشخص غير ذكي.',
      points: [
        'نضغط على أنفسنا للبحث عن دليل يؤيد رأينا فقط.',
        'نتذكر الحالات الموافقة وننسى الحالات المخالفة.',
        'نفسر المعلومة الغامضة بما يتفق مع توقعاتنا.',
        'نقلل أثر المصدر المخالف بدلاً من تقييم حجته.'
      ],
      practice: 'قبل أن تثبت رأيك، ابحث عمداً عن أقوى دليل يمكن أن يغيّره، واسأل ما المعلومة التي ستجعلك تعيد التفكير.'
    },
    {
      id: 'empathy',
      category: 'التواصل',
      title: 'الاستماع دون افتراض النوايا',
      summary: 'الفصل بين ما رأيته فعلاً وما تخمّن أنه يدور في ذهن الطرف الآخر.',
      time: '4 دقائق',
      body: 'لا نستطيع قراءة الأفكار من نظرة أو حركة واحدة. السلوك الواحد قد تكون له تفسيرات متعددة بحسب السياق والثقافة والحالة الجسدية والشخصية.',
      points: [
        'افصل بين الملاحظة والتفسير: «تأخر في الرد» ملاحظة؛ «لا يهتم بي» تفسير.',
        'ابحث عن أكثر من تفسير محتمل قبل الاستنتاج.',
        'اسأل سؤالاً مفتوحاً بدلاً من اتهام الطرف الآخر.',
        'راقب النمط عبر الزمن، لا لقطة منفردة.'
      ],
      practice: 'عندما تحتار في تصرف، اكتب ثلاث تفسيرات محتملة، ثم تحقق بسؤال واضح ومحترم.'
    },
    {
      id: 'negotiation',
      category: 'التفاوض الأخلاقي',
      title: 'التفاوض دون ضغط أو خداع',
      summary: 'تحقيق تفاهم أفضل بالأسئلة الواضحة والإنصات وتحديد المصالح.',
      time: '6 دقائق',
      body: 'التفاوض الصحي لا يقوم على كسر الطرف الآخر. يبدأ بفهم ما يحتاج إليه كل طرف، ويفصل بين المواقف المعلنة والمصالح الحقيقية، ويترك مساحة لرفض العرض.',
      points: [
        'اسأل أسئلة توضيحية قبل تقديم الحلول.',
        'لخّص ما فهمته للتأكد من أنك لم تسيء الفهم.',
        'اعرض الخيارات بصدق واذكر حدودها.',
        'اتفق على معيار واضح وعادل لتقييم النتيجة.'
      ],
      practice: 'جرّب سؤالاً مثل: «ما أهم شيء تريد أن نضمنه في هذا الاتفاق؟»'
    }
  ];

  const patterns = [
    {
      title: 'الابتزاز العاطفي',
      tag: 'ضغط عبر الذنب أو الخوف',
      desc: 'يُربط قبول طلب ما بإثبات المحبة أو الولاء، أو يُلوّح بعقوبة عاطفية عند الرفض.',
      signs: ['«لو كنت تهتم بي لفعلت ذلك»', 'تهديد متكرر بالهجر أو العقاب الصامت', 'تجاهل حقك في الاختيار'],
      response: 'اعترف بالمشاعر دون التنازل عن حقك: «أهتم بك، لكن لا أوافق على هذا الطلب».'
    },
    {
      title: 'قلب اللوم',
      tag: 'تحويل المسؤولية',
      desc: 'بدلاً من مناقشة الفعل، يتحول الحوار كله إلى لوم الشخص الذي أشار إلى المشكلة.',
      signs: ['تغيير الموضوع عند طلب تفسير', 'استدعاء أخطاء قديمة لإلغاء النقاش الحالي', 'تصوير طلب المساءلة كأنه هجوم'],
      response: 'أعد الحديث إلى واقعة محددة: «يمكننا مناقشة الأمرين، لكن دعنا ننهي هذه النقطة أولاً».'
    },
    {
      title: 'الاستعجال المصطنع',
      tag: 'تقليل وقت التفكير',
      desc: 'يُطلب منك قرار فوري في أمر مهم، مع منعك من المقارنة أو الاستشارة أو قراءة التفاصيل.',
      signs: ['«الفرصة تنتهي الآن» دون سبب قابل للتحقق', 'رفض إعطائك الشروط مكتوبة', 'إشعارك بأن السؤال دليل على عدم الثقة'],
      response: 'اطلب وقتاً ومعلومات مكتوبة. القرار الجيد يتحمل الفحص، ولا يلزمك ضغط اللحظة.'
    },
    {
      title: 'العزل التدريجي',
      tag: 'إضعاف شبكة الدعم',
      desc: 'محاولات متكررة لإبعادك عن أصدقاء أو عائلة أو مصادر مستقلة للمشورة.',
      signs: ['السخرية من كل شخص تثق به', 'خلق خلافات كلما قابلت داعميك', 'طلب إبقاء العلاقة أو المشكلة سراً دائماً'],
      response: 'حافظ على تواصل آمن مع أشخاص تثق بهم، واطلب دعماً خارج العلاقة عند الحاجة.'
    }
  ];

  const books = [
    { title: 'Influence: The Psychology of Persuasion', author: 'Robert B. Cialdini', category: 'التأثير الاجتماعي', note: 'يعرض مبادئ التأثير والإقناع، مع أهمية فهمها نقدياً وعدم استخدامها لانتزاع موافقة الآخرين.' },
    { title: 'Thinking, Fast and Slow', author: 'Daniel Kahneman', category: 'اتخاذ القرار', note: 'مدخل واسع إلى التفكير السريع والبطيء والانحيازات التي تؤثر في أحكامنا.' },
    { title: 'The Gaslight Effect', author: 'Dr. Robin Stern', category: 'العلاقات', note: 'كتاب توعوي عن ديناميات التشكيك في الإدراك داخل العلاقات.' },
    { title: 'What Every BODY Is Saying', author: 'Joe Navarro with Marvin Karlins', category: 'التواصل غير اللفظي', note: 'يتناول ملاحظة الإشارات غير اللفظية؛ لا ينبغي تفسير حركة منفردة كدليل قاطع على الكذب أو النية.' },
    { title: 'Never Split the Difference', author: 'Chris Voss with Tahl Raz', category: 'التفاوض', note: 'أفكار عملية عن الاستماع والأسئلة والتفاوض، ويمكن تكييفها لتواصل عادل وواضح.' },
    { title: 'Why Does He Do That?', author: 'Lundy Bancroft', category: 'العلاقات والسلامة', note: 'يناقش أنماط السيطرة والإساءة في العلاقات ومؤشرات تستحق الانتباه.' },
    { title: 'The Dance of Anger', author: 'Harriet Lerner', category: 'الحدود والتواصل', note: 'يركز على الغضب والعلاقات وتغيير أنماط التفاعل.' },
    { title: 'In Sheep’s Clothing', author: 'George K. Simon', category: 'السلوك المؤذي', note: 'طرح شعبي عن السلوكيات المتلاعبة؛ اقرأه بوعي نقدي ولا تتعامل معه كأداة تشخيص.' }
  ];

  const cases = [
    {
      title: 'كلمة المرور دليل الثقة؟',
      intro: 'شخص قريب يقول لك: «إذا كنت تثق بي حقاً، أعطني كلمة مرور حسابك. لماذا تخفي عني شيئاً؟»',
      question: 'ما الرد الأكثر صحة وأماناً؟',
      options: [
        'أعطيه كلمة المرور حتى لا يغضب.',
        'أوضح أن الثقة لا تعني مشاركة كلمات المرور، وأحافظ على خصوصيتي.',
        'أهدده بأنني سأدخل إلى حسابه أيضاً.'
      ],
      correct: 1,
      result: 'الخصوصية حق مستقل عن المحبة والثقة. لا تشارك كلمات المرور أو رموز التحقق، حتى مع شخص قريب. يمكن مناقشة سبب القلق دون تسليم الحساب.'
    },
    {
      title: 'عرض لا يحتمل التفكير؟',
      intro: 'يعرض عليك شخص اتفاقاً مالياً ويقول إن عليك الموافقة خلال خمس دقائق، ويرفض إرسال التفاصيل مكتوبة.',
      question: 'ما الخطوة الأذكى؟',
      options: [
        'أوافق فوراً حتى لا تضيع الفرصة.',
        'أطلب الشروط مكتوبة وأمنح نفسي وقتاً للتحقق.',
        'أقرر بناء على ثقته في نفسه.'
      ],
      correct: 1,
      result: 'الاستعجال ورفض التوثيق علامتان تستدعيان التوقف لا القفز إلى استنتاج عن النية. اطلب تفاصيل مكتوبة، تحقق من المعلومات، واستشر شخصاً مستقلاً.'
    },
    {
      title: 'اختلاف في الذاكرة',
      intro: 'أنت وصديقك تتذكران تفاصيل نقاش سابق بطريقة مختلفة. هل هذا وحده يثبت وجود تلاعب نفسي؟',
      question: 'أي استنتاج أدق؟',
      options: [
        'نعم، أي اختلاف في الذاكرة دليل تلاعب.',
        'لا يمكن الحكم من واقعة واحدة؛ أنظر إلى النمط والسياق والأدلة.',
        'الشخص الذي يتكلم بثقة هو صاحب الذاكرة الصحيحة.'
      ],
      correct: 1,
      result: 'الذاكرة ليست تسجيلاً كاملاً، والاختلاف طبيعي أحياناً. يصبح الأمر مقلقاً عندما يتكرر الإنكار والتحريف بهدف إرباكك أو إسكاتك، مع النظر إلى السياق والأثر.'
    }
  ];

  const quiz = [
    {
      q: 'شخص لم يرد على رسالتك منذ ساعتين. ما الذي تعرفه يقيناً؟',
      options: ['أنه يتجاهلك عمداً', 'أنه لم يرد حتى الآن فقط', 'أنه غاضب منك'],
      correct: 1,
      explain: 'المعلومة المؤكدة هي عدم وصول رد حتى الآن. تفسير السبب يحتاج إلى سياق أو سؤال.'
    },
    {
      q: 'سمعت أن الجميع اشتروا منتجاً. ما السؤال الأفضل قبل شرائه؟',
      options: ['هل هو مشهور فقط؟', 'هل يناسب احتياجي وهل توجد أدلة مستقلة على جودته؟', 'هل سأبدو مختلفاً إن لم أشتره؟'],
      correct: 1,
      explain: 'الانتشار لا يضمن الملاءمة أو الجودة. قارن الخصائص والمراجعات الموثوقة واحتياجك.'
    },
    {
      q: 'ما العلامة الأقوى على وجود نمط تلاعب؟',
      options: ['اختلاف واحد في الرأي', 'نظرة عين قصيرة', 'تكرار الضغط والتحريف مع تجاهل الحدود'],
      correct: 2,
      explain: 'لا توجد إشارة منفردة تكشف النوايا. النمط المتكرر والسياق والأثر أهم من حركة أو عبارة واحدة.'
    }
  ];

  const dailyMessages = [
    'لا تخلط بين ما حدث فعلاً وبين القصة التي كوّنها ذهنك حول ما حدث.',
    'التوقف قبل الرد ليس ضعفاً؛ أحياناً هو المساحة التي تستعيد فيها حرية الاختيار.',
    'الحدود الواضحة لا تحتاج إلى اعتذار طويل.',
    'الثقة لا تعني التخلي عن الخصوصية أو إيقاف التفكير النقدي.',
    'اسأل عن الدليل، وابحث عن تفسير آخر، ثم قرر بهدوء.'
  ];

  let currentPage = 'home';
  let quizIndex = 0;
  let quizScore = 0;
  let selectedQuiz = null;
  let activeCase = 0;

  function showToast(message) {
    toastEl.textContent = message;
    toastEl.classList.add('show');
    clearTimeout(showToast.timer);
    showToast.timer = setTimeout(() => toastEl.classList.remove('show'), 2600);
  }

  function eyeArt() {
    return '<img class="eye-art" src="./assets/hidden-eye.svg" alt="">';
  }

  function heroArt() {
    return '<div class="hero-art" aria-hidden="true">' + eyeArt() +
      '<img class="fire-art" src="./assets/black-flame.svg" alt="">' +
      '<span class="floating-symbol symbol-a">✧</span><span class="floating-symbol symbol-b">◈</span><span class="floating-symbol symbol-c">⌁</span></div>';
  }

  function sectionHeading(kicker, title, lead) {
    return '<div class="eyebrow">' + kicker + '</div><h1 class="page-heading">' + title + '</h1><p class="page-lead">' + lead + '</p>';
  }

  function homePage() {
    return '<div class="hero">' + heroArt() +
      '<div class="hero-copy"><div class="eyebrow">موسوعة الوعي والسلوك البشري</div>' +
      '<h1>افهم <em>الظلال</em>،<br>واحمِ مساحة عقلك.</h1>' +
      '<p>رحلة تفاعلية لفهم التأثير النفسي، ملاحظة أنماط التلاعب، قراءة المواقف بعقل نقدي، وبناء حدود تحميك دون أن تفترض أنك تقرأ أفكار الآخرين.</p>' +
      '<div class="hero-actions"><button class="primary-btn" data-go="learn">ابدأ رحلة المعرفة <span>←</span></button><button class="secondary-btn" data-go="cases">ادخل قضية تفاعلية</button></div></div></div>' +
      '<div class="stats-grid">' +
      '<div class="stat-card"><div class="stat-label">دروس تأسيسية</div><div class="stat-value">' + lessons.length + '</div><div class="stat-note">فهم السلوك والتأثير</div></div>' +
      '<div class="stat-card"><div class="stat-label">أنماط للتعرّف عليها</div><div class="stat-value">' + patterns.length + '</div><div class="stat-note">مع ردود تحمي حدودك</div></div>' +
      '<div class="stat-card"><div class="stat-label">قضايا تدريبية</div><div class="stat-value">' + cases.length + '</div><div class="stat-note">قرارات من الحياة اليومية</div></div>' +
      '<div class="stat-card"><div class="stat-label">مراجع للقراءة</div><div class="stat-value">' + books.length + '</div><div class="stat-note">كتب مع ملاحظات نقدية</div></div></div>' +
      '<div class="section-row"><div><h2 class="section-title">بوابات الاستكشاف</h2><div class="section-sub">اختر المسار الذي تريد فهمه اليوم</div></div><button class="text-link" data-go="learn">عرض الدروس ←</button></div>' +
      '<div class="path-grid">' +
      pathCard('◈', 'افهم أساسيات النفس', 'تأثير اجتماعي، انحيازات، تواصل وحدود.', 'learn') +
      pathCard('◉', 'اكشف أساليب الضغط', 'تعرف على الأنماط المقلقة وكيفية التعامل معها.', 'spot') +
      pathCard('⌕', 'حلّل موقفاً تفاعلياً', 'اختر قرارك، ثم اقرأ التفسير والأسباب.', 'cases') +
      pathCard('✧', 'مختبر العقل', 'جرّب كيف يغيّر السياق طريقة فهمنا للمعلومات.', 'lab') +
      pathCard('◎', 'اختبر ملاحظتك', 'تحديات قصيرة في التفكير النقدي.', 'quiz') +
      pathCard('▤', 'افتح مكتبة الكتب', 'مراجع في التأثير والعلاقات والتفاوض.', 'library') + '</div>' +
      '<div class="section-row"><div><h2 class="section-title">من دفتر الظلال</h2><div class="section-sub">فكرة قصيرة تستحق التأمل</div></div></div>' +
      '<div class="panel mini-case"><div><div class="panel-kicker">قاعدة اليوم</div><h3>لا تحكم على النية من إشارة واحدة</h3><p>السلوك الواحد قد يحمل أكثر من تفسير. اجمع السياق، لاحظ التكرار، واسأل قبل أن تستنتج.</p></div><div class="case-emblem">◉</div></div>';
  }

  function pathCard(symbol, title, desc, page) {
    return '<button class="path-card" data-go="' + page + '"><div class="path-symbol">' + symbol + '</div><strong>' + title + '</strong><span>' + desc + '</span></button>';
  }

  function learnPage() {
    return sectionHeading('المرحلة الأولى • الفهم', 'أساسيات النفس البشرية', 'ابدأ من المبادئ التي تساعدك على تفسير السلوك دون مبالغة أو أحكام متسرعة.') +
      '<div class="card-grid">' + lessons.map((lesson, index) =>
        '<article class="content-card lesson-card" data-lesson-card="' + lesson.id + '">' +
        '<div class="card-topline"><span class="tag">' + lesson.category + '</span><span class="card-number">0' + (index + 1) + '</span></div>' +
        '<h3>' + lesson.title + '</h3><p>' + lesson.summary + '</p><div class="book-meta">مدة القراءة: ' + lesson.time + '</div>' +
        '<button class="card-action" data-lesson="' + lesson.id + '">افتح الدرس ←</button>' +
        '<div class="lesson-detail" id="detail-' + lesson.id + '"><p>' + lesson.body + '</p>' +
        '<div class="detail-label">ما الذي ينبغي ملاحظته؟</div><ul>' + lesson.points.map(point => '<li>' + point + '</li>').join('') + '</ul>' +
        '<div class="detail-label">تطبيق عملي</div><p>' + lesson.practice + '</p></div></article>'
      ).join('') + '</div>';
  }

  function spotPage() {
    return sectionHeading('المرحلة الثانية • الحماية', 'تعرّف على أنماط التلاعب', 'هذه البطاقات للتوعية وكشف السلوك المؤذي، لا لتشخيص الأشخاص أو اتهامهم من موقف منفرد.') +
      '<div class="card-grid">' + patterns.map((item, i) =>
        '<article class="content-card pattern-card"><div class="card-topline"><span class="tag">' + item.tag + '</span><span class="card-number">0' + (i + 1) + '</span></div>' +
        '<h3>' + item.title + '</h3><p>' + item.desc + '</p><button class="card-action" data-pattern="' + i + '">شاهد المؤشرات والردود ←</button>' +
        '<div class="pattern-warning">التكرار والسياق أهم من عبارة واحدة.</div></article>'
      ).join('') + '</div>';
  }

  function casesPage() {
    const item = cases[activeCase % cases.length];
    return sectionHeading('المرحلة الثالثة • التطبيق', 'القضايا التفاعلية', 'اختر كيف تتصرف في مواقف يومية، ثم اقرأ التفسير. الهدف تدريب التفكير وليس إصدار أحكام على الأشخاص.') +
      '<div class="panel quiz-box"><div class="card-topline"><span class="tag">قضية ' + (activeCase + 1) + ' من ' + cases.length + '</span><span class="card-number">تدريب عملي</span></div>' +
      '<div class="case-emblem" style="margin-bottom:16px">⌕</div><h2 style="font-size:19px;margin:0 0 10px">' + item.title + '</h2>' +
      '<p style="font-size:11px;line-height:2;color:#aaa6b4">' + item.intro + '</p><h3 style="font-size:12px;margin:22px 0 10px">' + item.question + '</h3>' +
      item.options.map((option, i) => '<button class="case-choice" data-case-choice="' + i + '">' + String.fromCharCode(1571 + i) + '. ' + option + '</button>').join('') +
      '<div id="caseResult" aria-live="polite"></div><div style="display:flex;justify-content:flex-end;margin-top:17px"><button class="secondary-btn" data-next-case>القضية التالية ←</button></div></div>';
  }

  function labPage() {
    return sectionHeading('المرحلة الرابعة • التجربة', 'مختبر العقل', 'اختبر كيف يمكن لصياغة المعلومة أو توقعاتنا أن تغيّر الانطباع. التجارب تعليمية وليست اختبارات شخصية.') +
      '<div class="panel"><div class="panel-kicker">تجربة 01 • تأثير التأطير</div><h3>هل تغيّر الصياغة حكمك؟</h3><p>تخيّل علاجاً تنجح معه 90 من كل 100 حالة. هل يبدو مختلفاً عندما يقال إن 10 من كل 100 حالة لا تستفيد منه؟ الأرقام نفسها، لكن الانطباع قد يتغير.</p>' +
      '<div class="bias-demo" style="margin-top:17px"><button class="bias-choice" data-frame="positive"><strong>صياغة إيجابية</strong><span>معدل النجاح: 90% من الحالات.</span></button><button class="bias-choice" data-frame="negative"><strong>صياغة سلبية</strong><span>معدل عدم الاستفادة: 10% من الحالات.</span></button></div>' +
      '<div id="frameResult" class="case-result" style="display:none"></div></div>' +
      '<div class="panel" style="margin-top:14px"><div class="panel-kicker">تجربة 02 • الانحياز التأكيدي</div><h3>فتّش عن الدليل المخالف</h3><p>لديك اعتقاد أن زميلاً لا يحب العمل الجماعي. لاحظت مرة أنه لم يشارك في نقاش. ما الخطوة الأفضل؟</p>' +
      '<div class="bias-demo" style="margin-top:16px"><button class="bias-choice" data-bias="confirm"><strong>أبحث عما يؤكد اعتقادي</strong><span>أجمع المواقف التي لم يشارك فيها فقط.</span></button><button class="bias-choice" data-bias="challenge"><strong>أبحث عن صورة كاملة</strong><span>أراجع أمثلة أخرى وأسأله عن رأيه وظروفه.</span></button></div><div id="biasResult" class="case-result" style="display:none"></div></div>';
  }

  function quizPage() {
    if (quizIndex >= quiz.length) {
      return sectionHeading('النتيجة • تدريبك اليوم', 'أكملت اختبار الملاحظة', 'هذه النتيجة تخص إجابات هذا التمرين فقط، ولا تقيس شخصيتك أو ذكاءك.') +
        '<div class="panel quiz-box" style="text-align:center"><div class="case-emblem" style="margin:0 auto 15px">◎</div><div style="font-size:34px;color:var(--purple);font-weight:700">' + quizScore + ' / ' + quiz.length + '</div><h3>إجابات دقيقة: ' + quizScore + '</h3><p>الأهم هو مراجعة تفسير كل سؤال وتطبيقه في الحياة اليومية.</p><button class="primary-btn" data-restart-quiz style="margin-top:16px">أعد الاختبار</button></div>';
    }
    const q = quiz[quizIndex];
    return sectionHeading('المرحلة الخامسة • الملاحظة', 'اختبر ملاحظتك', 'ثلاثة أسئلة قصيرة لتدريب الفصل بين الحقائق والتفسيرات. لا يوجد تحليل لشخصيتك هنا.') +
      '<div class="panel quiz-box"><div class="card-topline"><span class="tag">السؤال ' + (quizIndex + 1) + ' من ' + quiz.length + '</span><span class="card-number">تفكير نقدي</span></div>' +
      '<div class="quiz-progress"><span style="width:' + ((quizIndex / quiz.length) * 100) + '%"></span></div>' +
      '<h2 style="font-size:16px;line-height:1.9;margin:0 0 17px">' + q.q + '</h2>' +
      q.options.map((option, i) => '<button class="quiz-option' + (selectedQuiz === i ? ' selected' : '') + '" data-quiz-option="' + i + '">' + option + '</button>').join('') +
      '<div id="quizExplain" class="case-result" style="display:none"></div><div style="display:flex;justify-content:flex-end;margin-top:18px"><button class="primary-btn" id="quizNext" ' + (selectedQuiz === null ? 'disabled style="opacity:.4;cursor:not-allowed"' : '') + '>' + (quizIndex === quiz.length - 1 ? 'عرض النتيجة' : 'السؤال التالي') + ' ←</button></div></div>';
  }

  function libraryPage() {
    return sectionHeading('القراءة • مراجع مختارة', 'مكتبة الظلال', 'كتب في التأثير واتخاذ القرار والعلاقات والتفاوض. نميّز بين البحث العلمي والكتب التوعوية أو العملية، ولا نعامل أي كتاب كمرجع تشخيصي.') +
      '<div class="card-grid">' + books.map((book, i) =>
        '<article class="content-card book-card"><div class="book-spine"><span>' + book.title + '</span></div><div class="book-meta">' + book.category + ' • ' + book.author + '</div><h3>' + book.title + '</h3><p>' + book.note + '</p><span class="tag">ملاحظة قراءة نقدية</span></article>'
      ).join('') + '</div><p class="note-hint">ملاحظة: هذه قائمة بداية منتقاة، وسنضيف المراجع الأخرى بعد تدقيق العناوين وبيانات المؤلفين حتى لا ننسب كتاباً إلى مؤلف خطأ.</p>';
  }

  function notesPage() {
    const saved = localStorage.getItem('darkBookNotes') || '';
    return sectionHeading('مساحتك الخاصة • محلياً على جهازك', 'دفتر التأمل', 'اكتب ملاحظاتك وأسئلتك بعد القراءة. تُحفظ هذه المساحة في متصفح هذا الجهاز فقط، ولا تُرسل إلى خادم.') +
      '<div class="panel"><div class="panel-kicker">ملاحظات شخصية</div><textarea id="userNotes" class="note-area" placeholder="ما الفكرة التي لفتت انتباهك؟ ما الدليل الذي تريد التحقق منه؟ ما الحد الصحي الذي تريد تذكّرَه؟"></textarea>' +
      '<div style="display:flex;justify-content:space-between;align-items:center;gap:12px;margin-top:13px"><span class="note-hint">الحفظ محلي في هذا المتصفح.</span><button class="primary-btn" id="saveNotes">احفظ ملاحظاتي</button></div></div>';
  }

  function aboutPage() {
    return sectionHeading('عن المشروع', 'موسوعة الظِّل', 'مساحة تعليمية لفهم السلوك البشري بوضوح، لا لتحويل العلاقات إلى لعبة سيطرة.') +
      '<div class="feature-grid"><div class="panel"><div class="panel-kicker">هدف الموسوعة</div><h3>الفهم يمنحك مساحة للاختيار</h3><p>نشرح مفاهيم التأثير والانحيازات والتواصل والضغط النفسي، ونستخدم القصص والاختبارات لتدريب الملاحظة والتفكير النقدي. نشرح أساليب التلاعب بهدف التعرف عليها والحد من أضرارها، وليس لتعليم استغلال الآخرين.</p></div>' +
      '<div class="panel"><div class="panel-kicker">منهج المحتوى</div><h3>لا قراءة للأفكار ولا تشخيص عن بُعد</h3><p>لا يمكن الجزم بنوايا شخص من حركة عين أو عبارة واحدة. نعرض احتمالات متعددة، ونميّز بين الأدلة العلمية والكتب الشعبية والرأي، ونشجع الحدود الصحية وطلب المساعدة عند وجود خطر.</p></div></div>' +
      '<div class="panel" style="margin-top:14px"><div class="panel-kicker">الخصوصية</div><h3>ملاحظاتك تبقى في متصفحك</h3><p>دفتر التأمل يحفظ ما تكتبه محلياً على جهازك. لا تدخل كلمات مرور أو بيانات حساسة في هذا التطبيق.</p></div>' +
      '<div style="margin-top:17px;color:#777482;font-size:9px">تصميم وتطوير: سيف • إصدار أولي تجريبي</div>';
  }

  const renderers = {
    home: homePage,
    learn: learnPage,
    spot: spotPage,
    cases: casesPage,
    lab: labPage,
    quiz: quizPage,
    library: libraryPage,
    notes: notesPage,
    about: aboutPage
  };

  function navigate(page) {
    if (!renderers[page]) page = 'home';
    currentPage = page;
    pageContent.innerHTML = renderers[page]();
    pageLabel.textContent = pageNames[page];
    $$('.nav-item[data-page]').forEach(button => button.classList.toggle('active', button.dataset.page === page));
    sidebar.classList.remove('open');
    $('#mobileOverlay').classList.remove('show');
    if (page === 'notes') $('#userNotes').value = localStorage.getItem('darkBookNotes') || '';
    pageContent.focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function openModal(html) {
    modalContent.innerHTML = html;
    modalBackdrop.classList.add('show');
    modalBackdrop.setAttribute('aria-hidden', 'false');
    const closeButton = $('#modalClose');
    if (closeButton) closeButton.focus();
  }

  function closeModal() {
    modalBackdrop.classList.remove('show');
    modalBackdrop.setAttribute('aria-hidden', 'true');
  }

  function openSearch() {
    openModal('<div class="modal-subtitle">البحث في الموسوعة</div><h2 id="modalTitle">عن ماذا تبحث؟</h2><input id="searchInput" class="search-input" type="search" placeholder="اكتب كلمة أو مصطلحاً..." autocomplete="off"><div class="search-results" id="searchResults"><p>ابدأ بكتابة كلمة مثل: التأثير، الحدود، الانحياز، التلاعب.</p></div>');
    $('#searchInput').addEventListener('input', runSearch);
    $('#searchInput').focus();
  }

  function runSearch() {
    const term = $('#searchInput').value.trim().toLowerCase();
    const result = $('#searchResults');
    if (!term) {
      result.innerHTML = '<p>اكتب كلمة أو مصطلحاً للبحث في الدروس والأنماط والكتب.</p>';
      return;
    }
    const items = [];
    lessons.forEach(item => {
      if ((item.title + item.summary + item.category + item.body).toLowerCase().includes(term)) {
        items.push({ title: item.title, desc: item.category + ' • درس تعليمي', page: 'learn', key: item.id });
      }
    });
    patterns.forEach((item, i) => {
      if ((item.title + item.tag + item.desc).toLowerCase().includes(term)) items.push({ title: item.title, desc: 'نمط سلوكي • توعية وحماية', page: 'spot', key: i });
    });
    books.forEach(item => {
      if ((item.title + item.author + item.category).toLowerCase().includes(term)) items.push({ title: item.title, desc: item.author + ' • كتاب', page: 'library' });
    });
    if (!items.length) {
      result.innerHTML = '<div class="empty-state">لا توجد نتائج مطابقة. جرّب كلمة أخرى أو مرادفاً أبسط.</div>';
      return;
    }
    result.innerHTML = items.map((item, i) =>
      '<button class="search-result" data-search-index="' + i + '"><strong>' + item.title + '</strong><small>' + item.desc + '</small></button>'
    ).join('');
    result._items = items;
  }

  function openPattern(index) {
    const item = patterns[index];
    if (!item) return;
    openModal('<div class="modal-subtitle">' + item.tag + '</div><h2 id="modalTitle">' + item.title + '</h2><p>' + item.desc + '</p><h3 style="font-size:12px;color:#d8b4f5">مؤشرات قد تستحق الانتباه</h3><ul>' + item.signs.map(sign => '<li>' + sign + '</li>').join('') + '</ul><h3 style="font-size:12px;color:#d8b4f5">رد يحمي حدودك</h3><p>' + item.response + '</p><p class="note-hint">وجود مؤشر واحد لا يثبت نية التلاعب. انتبه للتكرار والسياق، واطلب الدعم إذا شعرت بالخطر.</p>');
  }

  function handleClick(event) {
    const go = event.target.closest('[data-go]');
    if (go) return navigate(go.dataset.go);
    const nav = event.target.closest('[data-page]');
    if (nav) return navigate(nav.dataset.page);

    const lessonButton = event.target.closest('[data-lesson]');
    if (lessonButton) {
      const card = $('[data-lesson-card="' + lessonButton.dataset.lesson + '"]');
      card.classList.toggle('open');
      lessonButton.textContent = card.classList.contains('open') ? 'إغلاق الدرس ↑' : 'افتح الدرس ←';
      return;
    }

    const patternButton = event.target.closest('[data-pattern]');
    if (patternButton) return openPattern(Number(patternButton.dataset.pattern));

    const caseChoice = event.target.closest('[data-case-choice]');
    if (caseChoice) {
      const item = cases[activeCase % cases.length];
      const choice = Number(caseChoice.dataset.caseChoice);
      const result = $('#caseResult');
      $$('.case-choice').forEach((button, index) => button.style.borderColor = index === item.correct ? 'rgba(99,190,137,.65)' : (index === choice ? 'rgba(228,91,112,.65)' : ''));
      result.className = 'case-result';
      result.innerHTML = '<strong style="color:' + (choice === item.correct ? '#8ed9af' : '#f0a1ad') + '">' + (choice === item.correct ? 'اختيار مناسب' : 'لنراجع الموقف') + '</strong><br>' + item.result;
      return;
    }

    if (event.target.closest('[data-next-case]')) {
      activeCase = (activeCase + 1) % cases.length;
      return navigate('cases');
    }

    const frame = event.target.closest('[data-frame]');
    if (frame) {
      const result = $('#frameResult');
      result.style.display = 'block';
      result.textContent = 'لاحظ أن 90% نجاح و10% عدم استفادة وصفان للنتيجة العددية نفسها. قد تغيّر الكلمات الشعور، لذلك قارن الأرقام والمعنى قبل اتخاذ القرار.';
      return;
    }

    const bias = event.target.closest('[data-bias]');
    if (bias) {
      const result = $('#biasResult');
      result.style.display = 'block';
      result.textContent = bias.dataset.bias === 'challenge'
        ? 'أحسنت. البحث عن المعلومات المخالفة وفهم السياق يساعدان على تقليل الانحياز التأكيدي.'
        : 'هذا مثال على الانحياز التأكيدي: جمع ما يدعم الفكرة فقط. حاول البحث عن أمثلة مضادة أيضاً.';
      return;
    }

    const quizOption = event.target.closest('[data-quiz-option]');
    if (quizOption) {
      selectedQuiz = Number(quizOption.dataset.quizOption);
      $$('.quiz-option').forEach((button, i) => button.classList.toggle('selected', i === selectedQuiz));
      const q = quiz[quizIndex];
      const explain = $('#quizExplain');
      explain.style.display = 'block';
      explain.textContent = (selectedQuiz === q.correct ? 'إجابة صحيحة. ' : 'ليست الإجابة الأدق. ') + q.explain;
      const next = $('#quizNext');
      next.disabled = false;
      next.style.opacity = '1';
      next.style.cursor = 'pointer';
      return;
    }

    if (event.target.closest('#quizNext')) {
      if (selectedQuiz === null) return;
      const q = quiz[quizIndex];
      if (selectedQuiz === q.correct) quizScore++;
      quizIndex++;
      selectedQuiz = null;
      return navigate('quiz');
    }

    if (event.target.closest('[data-restart-quiz]')) {
      quizIndex = 0; quizScore = 0; selectedQuiz = null;
      return navigate('quiz');
    }

    if (event.target.closest('#saveNotes')) {
      localStorage.setItem('darkBookNotes', $('#userNotes').value);
      return showToast('تم حفظ ملاحظاتك على هذا الجهاز.');
    }

    const searchResult = event.target.closest('[data-search-index]');
    if (searchResult) {
      const item = $('#searchResults')._items[Number(searchResult.dataset.searchIndex)];
      closeModal();
      navigate(item.page);
      if (item.page === 'learn' && item.key) {
        const card = $('[data-lesson-card="' + item.key + '"]');
        if (card) { card.classList.add('open'); $('[data-lesson="' + item.key + '"]').textContent = 'إغلاق الدرس ↑'; }
      }
      if (item.page === 'spot' && item.key !== undefined) openPattern(Number(item.key));
      return;
    }
  }

  document.addEventListener('click', handleClick);
  $('#searchOpen').addEventListener('click', openSearch);
  $('#modalClose').addEventListener('click', closeModal);
  modalBackdrop.addEventListener('click', event => { if (event.target === modalBackdrop) closeModal(); });
  $('#dailyButton').addEventListener('click', () => {
    const message = dailyMessages[new Date().getDate() % dailyMessages.length];
    openModal('<div class="modal-subtitle">رسالة اليوم</div><h2 id="modalTitle">تأمل صغير</h2><p style="font-size:14px;color:#e3d9ed">' + message + '</p><p class="note-hint">خذ لحظة للتفكير في كيفية تطبيق هذه الفكرة اليوم.</p>');
  });
  $('#menuToggle').addEventListener('click', () => {
    sidebar.classList.toggle('open');
    $('#mobileOverlay').classList.toggle('show');
  });
  $('#mobileOverlay').addEventListener('click', () => {
    sidebar.classList.remove('open');
    $('#mobileOverlay').classList.remove('show');
  });
  document.addEventListener('keydown', event => {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault(); openSearch();
    }
    if (event.key === 'Escape') closeModal();
  });

  navigate('home');

  if ('serviceWorker' in navigator && (location.protocol === 'https:' || location.hostname === 'localhost')) {
    window.addEventListener('load', () => navigator.serviceWorker.register('./sw.js').catch(() => {}));
  }
})();