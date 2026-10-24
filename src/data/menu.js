// آیتم‌های ویترین کافه — قیمت‌ها به تومان.
// برای افزودن/ویرایش آیتم، همین فایل را تغییر دهید؛ کارت‌ها خودکار به‌روز می‌شوند.

const img = (id) => `https://images.unsplash.com/photo-${id}?q=80&w=800&auto=format&fit=crop`

export const categories = [
  { id: 'all', label: 'همه' },
  { id: 'coffee', label: 'قهوه' },
  { id: 'cake', label: 'کیک و دسر' },
  { id: 'pastry', label: 'شیرینی' },
  { id: 'cold', label: 'نوشیدنی سرد' },
]

export const menu = [
  { id: 'espresso', cat: 'coffee', name: 'اسپرسو دبل', desc: 'رست متوسط، کرمای غنی و تلخی متعادل', price: 98000, img: img('1509042239860-f550ce710b93') },
  { id: 'americano', cat: 'coffee', name: 'آمریکانو', desc: 'اسپرسو با آب داغ؛ سبک و معطر', price: 110000, img: img('1447933601403-0c6688de566e') },
  { id: 'latte', cat: 'coffee', name: 'لاته', desc: 'شیر مخملی با اسپرسوی نرم', price: 145000, img: img('1517701550927-30cf4ba1dba5'), tag: 'محبوب' },
  { id: 'cappuccino', cat: 'coffee', name: 'کاپوچینو', desc: 'فوم لطیف و پودر کاکائو', price: 135000, img: img('1571877227200-a0d98ea607e9') },
  { id: 'cheesecake', cat: 'cake', name: 'چیزکیک توت‌فرنگی', desc: 'بیس بیسکویتی و سس توت‌فرنگی تازه', price: 195000, img: img('1565958011703-44f9829ba187'), tag: 'ویترین' },
  { id: 'choco-cake', cat: 'cake', name: 'کیک شکلاتی بلژیکی', desc: 'سه لایه شکلات تیره و گاناش', price: 185000, img: img('1578985545062-69928b1d9587') },
  { id: 'tiramisu', cat: 'cake', name: 'تیرامیسو', desc: 'ماسکارپونه، لیدی‌فینگر و کاکائو', price: 210000, img: img('1551024506-0bccd828d307') },
  { id: 'panna-cotta', cat: 'cake', name: 'پاناکوتا وانیلی', desc: 'با سس کارامل نمکی', price: 175000, img: img('1488477181946-6428a0291777') },
  { id: 'croissant', cat: 'pastry', name: 'کروسان کره‌ای', desc: 'ترد و لایه‌لایه، پخت روزانه', price: 98000, img: img('1555507036-ab1f4038808a') },
  { id: 'donut', cat: 'pastry', name: 'دونات', desc: 'گلازیر موزی و ترفل شکلاتی', price: 95000, img: img('1558961363-fa8fdf82db35') },
  { id: 'ice-latte', cat: 'cold', name: 'آیس لاته', desc: 'اسپرسو دوبل با شیر سرد', price: 160000, img: img('1572442388796-11668a67e53d') },
  { id: 'frappe', cat: 'cold', name: 'فراپه کارامل', desc: 'قهوه سرد، یخ و سس کارامل', price: 185000, img: img('1563805042-7684c019e1cb'), tag: 'جدید' },
]

export const menuById = Object.fromEntries(menu.map((m) => [m.id, m]))
