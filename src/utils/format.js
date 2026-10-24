// اعداد فارسی و قالب‌بندی قیمت
export const fa = (n) => new Intl.NumberFormat('fa-IR').format(n)
export const toman = (n) => `${fa(n)} تومان`

// تبدیل ارقام فارسی/عربی به لاتین (برای اعتبارسنجی شماره موبایل)
export const normalizeDigits = (s) =>
  String(s ?? '')
    .replace(/[۰-۹]/g, (d) => String('۰۱۲۳۴۵۶۷۸۹'.indexOf(d)))
    .replace(/[٠-٩]/g, (d) => String('٠١٢٣٤٥٦٧٨٩'.indexOf(d)))
