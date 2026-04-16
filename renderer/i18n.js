// Flow — i18n (TR / EN)  rev 2026-04
'use strict'

const TRANSLATIONS = {
  tr: {
    // Nav
    nav_board: 'Board', nav_dashboard: 'Dashboard', nav_monthly: 'Aylık',
    win_minimize: 'Küçült', win_maximize: 'Büyüt', win_close: 'Kapat',
    lang_switch: 'EN',

    // Board
    board_title: 'BOARD',
    plan_badge: 'PLAN',
    new_task_btn: '+ Yeni Görev',
    col_todo: 'Yapılacaklar', col_doing: 'Devam Eden', col_done: 'Tamamlanan',
    completed_of: 'tamamlandı',
    prev_day: 'Önceki gün', next_day: 'Sonraki gün',

    // Task card
    btn_delete: 'Sil', btn_edit: 'Düzenle',
    overdue_label: 'GECİKTİ',
    note_toggle_show: '▸ Not', note_toggle_hide: '▾ Not',

    // Modal
    modal_title_add: 'Yeni Görev Ekle', modal_title_edit: 'Görevi Düzenle',
    modal_task_ph: 'Ne yapacaksın?',
    modal_deadline_label: 'Son Tarih (opsiyonel)',
    modal_note_ph: 'Not ekle (opsiyonel)...',
    btn_add: 'Ekle', btn_save: 'Kaydet', btn_cancel: 'İptal',

    // Habits
    habits_title: 'Günlük Alışkanlıklar',
    habits_edit: 'Düzenle', habits_edit_done: 'Bitti', habits_add: '+ Ekle',
    habit_ph: 'Alışkanlık adı...',
    habit_add_btn: 'Ekle', habit_del_title: 'Sil',
    no_habits: 'Henüz alışkanlık yok. + Ekle butonuna bas.',
    habit_del_confirm: 'Bu alışkanlığı sil?',

    // Search
    search_ph: 'Görev ara… (tüm günler)',
    search_no_results: 'Sonuç bulunamadı.',
    search_hint: 'Esc ile kapat  ·  Ctrl+K',
    search_btn: 'Ara',

    // Streak
    streak_suffix: 'gün',
    streak_great: 'günlük muhteşem seri! 🔥 En iyi:',
    streak_normal: 'günlük seri! En iyi:',
    streak_none: 'En iyi serin:',
    streak_best_unit: 'gün',

    // Dashboard
    stat_streak_current: 'Mevcut Streak', stat_streak_best: 'En İyi Streak',
    stat_best_day: 'En İyi Gün', stat_total_days: 'Toplam Aktif Gün',
    stat_sub_streak: 'gün üst üste', stat_sub_record: 'gün rekor',
    stat_sub_days: 'kayıt var',
    trend_section_title: 'Son 30 Gün — Tamamlama Oranı',
    calendar_section_title: 'Son 365 Gün',
    chart_label_completion_line: 'Tamamlama %',

    // Monthly
    month_summary: 'Ay Özeti',
    stat_total_tasks: 'Toplam Görev', stat_avg_score: 'Ortalama Skor',
    stat_avg_sub: 'aylık ortalama',
    stat_best_day_m: 'En İyi Gün', stat_worst_day: 'En Zor Gün',
    stat_no_data: 'veri yok',
    weekly_breakdown: 'Haftalık Dağılım', day_by_day: 'Gün Gün',
    completed_sub_monthly: 'tamamlandı',
    no_month_data: 'Bu ay için veri yok.',
    week_label: 'Hafta',
    chart_label_completion: 'Ort. Tamamlama %',

    // Date/time
    days_short: ['Pzt','Sal','Çar','Per','Cum','Cmt','Paz'],
    months: ['Ocak','Şubat','Mart','Nisan','Mayıs','Haziran',
             'Temmuz','Ağustos','Eylül','Ekim','Kasım','Aralık'],
    months_short: ['Oca','Şub','Mar','Nis','May','Haz',
                   'Tem','Ağu','Eyl','Eki','Kas','Ara'],
    date_locale: 'tr-TR',

    // Notifications
    notif_overdue_title: 'Geciken Görevler',
    notif_overdue_body: (n) => `${n} görevin son tarihi geçti.`,
    notif_reminder_title: 'Flow Hatırlatıcı',
    notif_reminder_body: 'Bugünkü görevlerini tamamlamayı unutma!',
  },

  en: {
    // Nav
    nav_board: 'Board', nav_dashboard: 'Dashboard', nav_monthly: 'Monthly',
    win_minimize: 'Minimize', win_maximize: 'Maximize', win_close: 'Close',
    lang_switch: 'TR',

    // Board
    board_title: 'BOARD',
    plan_badge: 'PLAN',
    new_task_btn: '+ New Task',
    col_todo: 'To Do', col_doing: 'In Progress', col_done: 'Done',
    completed_of: 'completed',
    prev_day: 'Previous day', next_day: 'Next day',

    // Task card
    btn_delete: 'Del', btn_edit: 'Edit',
    overdue_label: 'OVERDUE',
    note_toggle_show: '▸ Note', note_toggle_hide: '▾ Note',

    // Modal
    modal_title_add: 'Add New Task', modal_title_edit: 'Edit Task',
    modal_task_ph: 'What will you do?',
    modal_deadline_label: 'Deadline (optional)',
    modal_note_ph: 'Add a note (optional)...',
    btn_add: 'Add', btn_save: 'Save', btn_cancel: 'Cancel',

    // Habits
    habits_title: 'Daily Habits',
    habits_edit: 'Edit', habits_edit_done: 'Done', habits_add: '+ Add',
    habit_ph: 'Habit name...',
    habit_add_btn: 'Add', habit_del_title: 'Delete',
    no_habits: 'No habits yet. Press + Add.',
    habit_del_confirm: 'Delete this habit?',

    // Search
    search_ph: 'Search tasks… (all days)',
    search_no_results: 'No results found.',
    search_hint: 'Close: Esc  ·  Ctrl+K',
    search_btn: 'Search',

    // Streak
    streak_suffix: 'days',
    streak_great: 'day amazing streak! 🔥 Best:',
    streak_normal: 'day streak! Best:',
    streak_none: 'Your best streak:',
    streak_best_unit: 'days',

    // Dashboard
    stat_streak_current: 'Current Streak', stat_streak_best: 'Best Streak',
    stat_best_day: 'Best Day', stat_total_days: 'Total Active Days',
    stat_sub_streak: 'day streak', stat_sub_record: 'day record',
    stat_sub_days: 'records',
    trend_section_title: 'Last 30 Days — Completion Rate',
    calendar_section_title: 'Last 365 Days',
    chart_label_completion_line: 'Completion %',

    // Monthly
    month_summary: 'Month Summary',
    stat_total_tasks: 'Total Tasks', stat_avg_score: 'Average Score',
    stat_avg_sub: 'monthly avg',
    stat_best_day_m: 'Best Day', stat_worst_day: 'Worst Day',
    stat_no_data: 'no data',
    weekly_breakdown: 'Weekly Breakdown', day_by_day: 'Day by Day',
    completed_sub_monthly: 'completed',
    no_month_data: 'No data for this month.',
    week_label: 'Week',
    chart_label_completion: 'Avg. Completion %',

    // Date/time
    days_short: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],
    months: ['January','February','March','April','May','June',
             'July','August','September','October','November','December'],
    months_short: ['Jan','Feb','Mar','Apr','May','Jun',
                   'Jul','Aug','Sep','Oct','Nov','Dec'],
    date_locale: 'en-US',

    // Notifications
    notif_overdue_title: 'Overdue Tasks',
    notif_overdue_body: (n) => `${n} task${n > 1 ? 's have' : ' has'} passed their deadline.`,
    notif_reminder_title: 'Flow Reminder',
    notif_reminder_body: "Don't forget to complete today's tasks!",
  }
}

function getLang() {
  try { return localStorage.getItem('flow-lang') || 'tr' } catch { return 'tr' }
}

function t(key) {
  const lang = getLang()
  const val = TRANSLATIONS[lang]?.[key]
  if (val !== undefined) return val
  return TRANSLATIONS['tr'][key] ?? key
}

function setLang(l) {
  try { localStorage.setItem('flow-lang', l) } catch {}
  location.reload()
}

function toggleLang() {
  setLang(getLang() === 'tr' ? 'en' : 'tr')
}
