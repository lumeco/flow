const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('flowAPI', {
  // Board
  getOrCreateBoard: (date) =>
    ipcRenderer.invoke('board:getOrCreate', date),

  // Tasks
  getTasks: (boardId) =>
    ipcRenderer.invoke('task:getAll', boardId),

  saveTask: (task) =>
    ipcRenderer.invoke('task:save', task),

  deleteTask: (taskId) =>
    ipcRenderer.invoke('task:delete', taskId),

  updateTaskStatus: (taskId, status) =>
    ipcRenderer.invoke('task:updateStatus', taskId, status),

  // Stats
  getStreak: () =>
    ipcRenderer.invoke('stats:getStreak'),

  getBestDay: () =>
    ipcRenderer.invoke('stats:getBestDay'),

  getCalendarData: () =>
    ipcRenderer.invoke('stats:getCalendarData'),

  getTrend: (days) =>
    ipcRenderer.invoke('stats:getTrend', days),

  getMonthlyStats: (year, month) =>
    ipcRenderer.invoke('stats:getMonthly', year, month),

  reorderTask: (taskId, direction) =>
    ipcRenderer.invoke('task:reorder', taskId, direction),

  updateTaskContent: (taskId, content) =>
    ipcRenderer.invoke('task:updateContent', taskId, content),

  updateTaskFull: (taskId, fields) =>
    ipcRenderer.invoke('task:updateFull', taskId, fields),

  getOverdueTasks: () =>
    ipcRenderer.invoke('task:getOverdue'),

  searchTasks: (query) =>
    ipcRenderer.invoke('task:search', query),

  sendNotification: (title, body) =>
    ipcRenderer.invoke('notification:send', title, body),

  windowMinimize: () => ipcRenderer.send('window:minimize'),
  windowMaximize: () => ipcRenderer.send('window:maximize'),
  windowClose:    () => ipcRenderer.send('window:close'),

  // Habits
  getHabits:      ()                      => ipcRenderer.invoke('habit:getAll'),
  saveHabit:      (habit)                 => ipcRenderer.invoke('habit:save', habit),
  deleteHabit:    (id)                    => ipcRenderer.invoke('habit:delete', id),
  getHabitLogs:   (date)                  => ipcRenderer.invoke('habit:getLogs', date),
  toggleHabitLog: (habitId, date, val)    => ipcRenderer.invoke('habit:toggle', habitId, date, val),
  getHabitStreak: (id)                    => ipcRenderer.invoke('habit:getStreak', id),
  getHabitMonthly:(id, year, month)       => ipcRenderer.invoke('habit:getMonthly', id, year, month),

  // Week & data
  getWeekData:    (weekStart)             => ipcRenderer.invoke('stats:getWeek', weekStart),
  exportData:     ()                      => ipcRenderer.invoke('data:export'),
  importData:     ()                      => ipcRenderer.invoke('data:import'),

  // Cashflow
  getTransactions:   (year, month)        => ipcRenderer.invoke('cashflow:getTransactions',   year, month),
  addTransaction:    (tx)                 => ipcRenderer.invoke('cashflow:addTransaction',    tx),
  updateTransaction: (id, fields)         => ipcRenderer.invoke('cashflow:updateTransaction', id, fields),
  deleteTransaction: (id)                 => ipcRenderer.invoke('cashflow:deleteTransaction', id),
  getMonthlySummary: (year, month)        => ipcRenderer.invoke('cashflow:getMonthlySummary', year, month),
  getAllTimeSummary:  ()                   => ipcRenderer.invoke('cashflow:getAllTime'),
  getFixedItems:     ()                   => ipcRenderer.invoke('cashflow:getFixed'),
  saveFixedItem:     (item)               => ipcRenderer.invoke('cashflow:saveFixed',   item),
  deleteFixedItem:   (id)                 => ipcRenderer.invoke('cashflow:deleteFixed', id),

  // Notes
  getNotes:     ()        => ipcRenderer.invoke('notes:getAll'),
  saveNote:     (note)    => ipcRenderer.invoke('notes:save',   note),
  deleteNote:   (id)      => ipcRenderer.invoke('notes:delete', id),

  // Pomodoro
  addPomodoroSession: (session) => ipcRenderer.invoke('pomo:addSession',  session),
  getPomodoroDayStats:(date)    => ipcRenderer.invoke('pomo:dayStats',    date),
  getPomodoroWeekStats:()       => ipcRenderer.invoke('pomo:weekStats'),

  // Journal
  getJournalEntry:  (date)         => ipcRenderer.invoke('journal:getEntry', date),
  getJournalMonth:  (year, month)  => ipcRenderer.invoke('journal:getMonth', year, month),
  saveJournalEntry: (entry)        => ipcRenderer.invoke('journal:save',     entry),
  deleteJournalEntry:(date)        => ipcRenderer.invoke('journal:delete',   date),

  // Goals
  getGoals:      ()             => ipcRenderer.invoke('goals:getAll'),
  saveGoal:      (goal)         => ipcRenderer.invoke('goals:save',     goal),
  deleteGoal:    (id)           => ipcRenderer.invoke('goals:delete',   id),
  saveKeyResult: (goalId, kr)   => ipcRenderer.invoke('goals:saveKr',   goalId, kr),
  deleteKeyResult:(goalId, krId)=> ipcRenderer.invoke('goals:deleteKr', goalId, krId),
})
