// Flow — i18n (TR / EN)  rev 2026-04
'use strict'

const TRANSLATIONS = {
  tr: {
    // Nav
    nav_board: 'Board', nav_dashboard: 'Dashboard', nav_monthly: 'Aylık',
    nav_weekly: 'Haftalık', nav_habits: 'Alışkanlıklar',
    nav_cashflow: 'Cashflow', nav_notes: 'Notlar',
    nav_timer: 'Timer', nav_journal: 'Günlük', nav_goals: 'Hedefler',
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

    // Priority
    modal_priority_label: 'Öncelik',
    priority_none: '— Yok', priority_low: 'Düşük',
    priority_medium: 'Orta', priority_high: 'Yüksek',

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

    // Focus mode
    btn_focus: '⋅ Odak',
    focus_exit_hint: 'ESC — Çıkış',
    focus_no_tasks: 'Harika! Tüm görevler tamamlandı.',
    focus_title: 'ODAK',

    // Weekly view
    nav_weekly_title: 'HAFTALIK',
    weekly_title: 'HAFTALIK',
    week_nav_prev: 'Önceki hafta', week_nav_next: 'Sonraki hafta',
    week_summary_title: 'Hafta Özeti',
    wstat_total: 'Toplam Görev', wstat_done: 'Tamamlanan',
    wstat_avg: 'Ort. Oran', wstat_best_day: 'En İyi Gün',
    week_today_label: 'Bugün', week_future_label: 'Plan',
    week_no_tasks: 'Görev yok',
    week_score_none: '—',

    // Habits page
    habits_page_title: 'ALIŞKANLIKLAR',
    habit_streak_lbl: 'Seri', habit_best_lbl: 'En İyi',
    habit_month_done: 'gün tamamlandı',
    habits_page_add: '+ Yeni Alışkanlık',
    habits_page_empty: 'Henüz alışkanlık eklenmedi.',
    habit_today_label: 'Bugün',
    habit_today_done: 'Bugün yapıldı',
    habit_today_pending: 'Henüz yapılmadı',
    habit_del_page_confirm: 'Bu alışkanlığı ve tüm loglarını sil?',
    habit_add_ph: 'Alışkanlık adı...',
    habit_save_btn: 'Kaydet',

    // Export / Import
    btn_export: '↓ Yedek', btn_import: '↑ Yükle',
    import_confirm: 'Tüm veriler silinip yedek yüklenecek. Devam et?',
    export_ok: 'Yedek başarıyla kaydedildi.',
    import_ok: 'Veriler yüklendi, yenileniyor…',
    import_fail: 'Yükleme başarısız.',

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

    // Cashflow
    cashflow_title: 'CASHFLOW',
    cashflow_income: 'Gelir', cashflow_expense: 'Gider', cashflow_balance: 'Net Bakiye',
    cashflow_add_income: '+ Gelir Ekle', cashflow_add_expense: '+ Gider Ekle',
    cashflow_fixed_title: 'Sabit Kalemler',
    cashflow_fixed_add: '+ Sabit Ekle',
    cashflow_fixed_income: 'sabit gelir', cashflow_fixed_expense: 'sabit gider',
    cashflow_no_tx: 'Bu ay henüz işlem yok.',
    cashflow_no_fixed: 'Henüz sabit kalem yok.',
    cashflow_del_tx: 'Bu işlemi sil?',
    cashflow_del_fixed: 'Bu sabit kalemi sil?',
    cashflow_modal_type: 'Tür', cashflow_modal_amount: 'Miktar (TL)',
    cashflow_modal_category: 'Kategori', cashflow_modal_desc: 'Açıklama (opsiyonel)',
    cashflow_modal_date: 'Tarih', cashflow_modal_title_add: 'Yeni İşlem',
    cashflow_modal_title_fixed: 'Sabit Kalem Ekle',
    cashflow_modal_day: 'Her ayın kaçında?',
    cashflow_type_income: 'Gelir', cashflow_type_expense: 'Gider',
    cashflow_optimizer_title: 'Cashflow Öneri',
    cashflow_alltime: 'Tüm Zaman',
    cashflow_6months: 'Son 6 Ay',
    cashflow_rate_title: 'Tasarruf Oranı',
    cashflow_categories: ['Maış', 'Freelance', 'Kira Geliri', 'Diğer Gelir',
                          'Kira', 'Market', 'Fatura', 'Abonelik',
                          'Sağlık', 'Eğlence', 'Ulaşım', 'Yatırım', 'Eğitim', 'Diğer'],

    // Notes
    notes_title: 'NOTLAR',
    notes_new: '+ Yeni Not',
    notes_empty: 'Henüz not yok. Yeni bir not ekle.',
    notes_placeholder: 'Notını buraya yaz...',
    notes_title_ph: 'Başlık (opsiyonel)',
    notes_del: 'Bu notu sil?',
    notes_pin: 'Sabitle', notes_unpin: 'Çöz',
    notes_saved: 'Kaydedildi',
    notes_search_ph: 'Notlarda ara...',

    // Pomodoro Timer
    timer_title: 'POMODORO',
    timer_work: 'Çalışma', timer_short_break: 'Kısa Mola', timer_long_break: 'Uzun Mola',
    timer_start: 'Başla', timer_pause: 'Duraklat', timer_reset: 'Sıfırla', timer_skip: 'Atla',
    timer_session: 'Seans', timer_of: '/', timer_until_long: 'uzun molaya kadar',
    timer_today_sessions: 'Bugün', timer_today_minutes: 'dk odak',
    timer_week_chart: 'Bu Haftaki Seanslar',
    timer_settings: 'Ayarlar',
    timer_work_min: 'Çalışma (dk)', timer_short_min: 'Kısa Mola (dk)', timer_long_min: 'Uzun Mola (dk)',
    timer_auto_break: 'Molaya otomatik geç', timer_sound: 'Ses uyarısı',
    timer_sessions_before_long: 'Uzun mola aralığı',
    timer_done_work: 'Seans tamamlandı!', timer_done_break: 'Mola bitti. Çalışmaya dönelim!',
    timer_total_hr: 'Toplam Odak',
    timer_long_break_soon: 'Uzun mola yakın!',

    // Journal
    journal_title: 'GÜNLÜK',
    journal_new: '+ Bugün Yaz',
    journal_mood_label: 'Bugün nasılsın?',
    journal_mood_1: 'Berbat', journal_mood_2: 'Kötü', journal_mood_3: 'Normal',
    journal_mood_4: 'İyi', journal_mood_5: 'Harika',
    journal_body_ph: 'Bugün neler düşündün? Neler hissettin?',
    journal_highlights_ph: 'Öne çıkan anlar...',
    journal_challenges_ph: 'Zorluklar / Dikkat edilecekler...',
    journal_highlights_label: 'Öne Çıkanlar',
    journal_challenges_label: 'Zorluklar',
    journal_save: 'Kaydet', journal_saved: 'Kaydedildi',
    journal_del: 'Bu günlük yazısını sil?',
    journal_empty_day: 'Bu gün için henüz kayıt yok.',
    journal_select_day: 'Bir gün seçin.',
    journal_entry_count: 'kayıt',
    journal_streak: 'Günlük Serisi',

    // Goals
    goals_title: 'HEDEFLER',
    goals_new: '+ Yeni Hedef',
    goals_empty: 'Henüz hedef yok. İlk hedefini belirle.',
    goals_del: 'Bu hedefi ve tüm anahtar sonuçlarını sil?',
    goals_kr_del: 'Bu anahtar sonucu sil?',
    goals_modal_title: 'Hedef Başlığı', goals_modal_desc: 'Açıklama (opsiyonel)',
    goals_modal_timeframe: 'Dönem (ör: Q2 2026)', goals_modal_color: 'Renk',
    goals_modal_status: 'Durum',
    goals_status_active: 'Aktif', goals_status_completed: 'Tamamlandı', goals_status_paused: 'Durduruldu',
    goals_add_kr: '+ Anahtar Sonuç',
    goals_kr_title: 'Anahtar Sonuç', goals_kr_target: 'Hedef', goals_kr_current: 'Mevcut', goals_kr_unit: 'Birim',
    goals_progress: 'İlerleme', goals_no_kr: 'Henüz anahtar sonuç yok.',
    goals_kr_update: 'Güncelle', goals_save_goal: 'Kaydet',
    goals_timeframe_all: 'Tümü',
  },

  en: {
    // Nav
    nav_board: 'Board', nav_dashboard: 'Dashboard', nav_monthly: 'Monthly',
    nav_weekly: 'Weekly', nav_habits: 'Habits',
    nav_cashflow: 'Cashflow', nav_notes: 'Notes',
    nav_timer: 'Timer', nav_journal: 'Journal', nav_goals: 'Goals',
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

    // Priority
    modal_priority_label: 'Priority',
    priority_none: '— None', priority_low: 'Low',
    priority_medium: 'Medium', priority_high: 'High',

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

    // Focus mode
    btn_focus: '⋅ Focus',
    focus_exit_hint: 'ESC — Exit',
    focus_no_tasks: 'All done! Nothing pending.',
    focus_title: 'FOCUS',

    // Weekly view
    nav_weekly_title: 'WEEKLY',
    weekly_title: 'WEEKLY',
    week_nav_prev: 'Previous week', week_nav_next: 'Next week',
    week_summary_title: 'Week Summary',
    wstat_total: 'Total Tasks', wstat_done: 'Completed',
    wstat_avg: 'Avg. Rate', wstat_best_day: 'Best Day',
    week_today_label: 'Today', week_future_label: 'Plan',
    week_no_tasks: 'No tasks',
    week_score_none: '—',

    // Habits page
    habits_page_title: 'HABITS',
    habit_streak_lbl: 'Streak', habit_best_lbl: 'Best',
    habit_month_done: 'days completed',
    habits_page_add: '+ New Habit',
    habits_page_empty: 'No habits yet.',
    habit_today_label: 'Today',
    habit_today_done: 'Done today',
    habit_today_pending: 'Not done yet',
    habit_del_page_confirm: 'Delete this habit and all its logs?',
    habit_add_ph: 'Habit name...',
    habit_save_btn: 'Save',

    // Export / Import
    btn_export: '↓ Export', btn_import: '↑ Import',
    import_confirm: 'All data will be replaced with the backup. Continue?',
    export_ok: 'Backup saved successfully.',
    import_ok: 'Data loaded, refreshing…',
    import_fail: 'Import failed.',

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

    // Cashflow
    cashflow_title: 'CASHFLOW',
    cashflow_income: 'Income', cashflow_expense: 'Expense', cashflow_balance: 'Net Balance',
    cashflow_add_income: '+ Add Income', cashflow_add_expense: '+ Add Expense',
    cashflow_fixed_title: 'Fixed Items',
    cashflow_fixed_add: '+ Add Fixed',
    cashflow_fixed_income: 'fixed income', cashflow_fixed_expense: 'fixed expense',
    cashflow_no_tx: 'No transactions this month.',
    cashflow_no_fixed: 'No fixed items yet.',
    cashflow_del_tx: 'Delete this transaction?',
    cashflow_del_fixed: 'Delete this fixed item?',
    cashflow_modal_type: 'Type', cashflow_modal_amount: 'Amount',
    cashflow_modal_category: 'Category', cashflow_modal_desc: 'Description (optional)',
    cashflow_modal_date: 'Date', cashflow_modal_title_add: 'New Transaction',
    cashflow_modal_title_fixed: 'Add Fixed Item',
    cashflow_modal_day: 'Day of month',
    cashflow_type_income: 'Income', cashflow_type_expense: 'Expense',
    cashflow_optimizer_title: 'Cashflow Insight',
    cashflow_alltime: 'All Time',
    cashflow_6months: 'Last 6 Months',
    cashflow_rate_title: 'Savings Rate',
    cashflow_categories: ['Salary', 'Freelance', 'Rental Income', 'Other Income',
                          'Rent', 'Groceries', 'Bills', 'Subscriptions',
                          'Health', 'Entertainment', 'Transport', 'Investment', 'Education', 'Other'],

    // Notes
    notes_title: 'NOTES',
    notes_new: '+ New Note',
    notes_empty: 'No notes yet. Add a new one.',
    notes_placeholder: 'Write your note here...',
    notes_title_ph: 'Title (optional)',
    notes_del: 'Delete this note?',
    notes_pin: 'Pin', notes_unpin: 'Unpin',
    notes_saved: 'Saved',
    notes_search_ph: 'Search notes...',

    // Pomodoro Timer
    timer_title: 'POMODORO',
    timer_work: 'Work', timer_short_break: 'Short Break', timer_long_break: 'Long Break',
    timer_start: 'Start', timer_pause: 'Pause', timer_reset: 'Reset', timer_skip: 'Skip',
    timer_session: 'Session', timer_of: '/', timer_until_long: 'until long break',
    timer_today_sessions: 'Today', timer_today_minutes: 'min focus',
    timer_week_chart: 'This Week\'s Sessions',
    timer_settings: 'Settings',
    timer_work_min: 'Work (min)', timer_short_min: 'Short Break (min)', timer_long_min: 'Long Break (min)',
    timer_auto_break: 'Auto-start breaks', timer_sound: 'Sound alerts',
    timer_sessions_before_long: 'Sessions before long break',
    timer_done_work: 'Session complete!', timer_done_break: 'Break over. Let\'s work!',
    timer_total_hr: 'Total Focus',
    timer_long_break_soon: 'Long break coming up!',

    // Journal
    journal_title: 'JOURNAL',
    journal_new: '+ Write Today',
    journal_mood_label: 'How are you feeling?',
    journal_mood_1: 'Awful', journal_mood_2: 'Bad', journal_mood_3: 'Okay',
    journal_mood_4: 'Good', journal_mood_5: 'Great',
    journal_body_ph: 'What did you think about today? How did you feel?',
    journal_highlights_ph: 'Highlights of the day...',
    journal_challenges_ph: 'Challenges / things to watch...',
    journal_highlights_label: 'Highlights',
    journal_challenges_label: 'Challenges',
    journal_save: 'Save', journal_saved: 'Saved',
    journal_del: 'Delete this journal entry?',
    journal_empty_day: 'No entry for this day yet.',
    journal_select_day: 'Select a day.',
    journal_entry_count: 'entries',
    journal_streak: 'Journal Streak',

    // Goals
    goals_title: 'GOALS',
    goals_new: '+ New Goal',
    goals_empty: 'No goals yet. Set your first goal.',
    goals_del: 'Delete this goal and all its key results?',
    goals_kr_del: 'Delete this key result?',
    goals_modal_title: 'Goal Title', goals_modal_desc: 'Description (optional)',
    goals_modal_timeframe: 'Timeframe (e.g. Q2 2026)', goals_modal_color: 'Color',
    goals_modal_status: 'Status',
    goals_status_active: 'Active', goals_status_completed: 'Completed', goals_status_paused: 'Paused',
    goals_add_kr: '+ Key Result',
    goals_kr_title: 'Key Result', goals_kr_target: 'Target', goals_kr_current: 'Current', goals_kr_unit: 'Unit',
    goals_progress: 'Progress', goals_no_kr: 'No key results yet.',
    goals_kr_update: 'Update', goals_save_goal: 'Save',
    goals_timeframe_all: 'All',
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
