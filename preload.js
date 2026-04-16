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

  windowMinimize: () => ipcRenderer.send('window:minimize'),
  windowMaximize: () => ipcRenderer.send('window:maximize'),
  windowClose:    () => ipcRenderer.send('window:close'),

  // Habits
  getHabits:     ()                      => ipcRenderer.invoke('habit:getAll'),
  saveHabit:     (habit)                 => ipcRenderer.invoke('habit:save', habit),
  deleteHabit:   (id)                    => ipcRenderer.invoke('habit:delete', id),
  getHabitLogs:  (date)                  => ipcRenderer.invoke('habit:getLogs', date),
  toggleHabitLog:(habitId, date, val)    => ipcRenderer.invoke('habit:toggle', habitId, date, val)
})
