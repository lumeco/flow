const { app, BrowserWindow, ipcMain, Notification, dialog } = require('electron')
const path = require('path')
const fs   = require('fs')
const db   = require('./src/db')

function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 820,
    minWidth: 800,
    minHeight: 600,
    backgroundColor: '#000000',
    titleBarStyle: 'hiddenInset',
    frame: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false
    }
  })

  win.loadFile(path.join(__dirname, 'renderer', 'index.html'))
}

app.whenReady().then(() => {
  createWindow()
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

// ── Board ──────────────────────────────────────────────────
ipcMain.handle('board:getOrCreate', (_, date) => {
  return db.getOrCreateBoard(date)
})

// ── Tasks ──────────────────────────────────────────────────
ipcMain.handle('task:getAll', (_, boardId) => {
  return db.getTasks(boardId)
})

ipcMain.handle('task:save', (_, task) => {
  return db.saveTask(task)
})

ipcMain.handle('task:delete', (_, taskId) => {
  return db.deleteTask(taskId)
})

ipcMain.handle('task:updateStatus', (_, taskId, status) => {
  return db.updateTaskStatus(taskId, status)
})

// ── Stats ──────────────────────────────────────────────────
ipcMain.handle('stats:getStreak', () => {
  return db.getStreak()
})

ipcMain.handle('stats:getBestDay', () => {
  return db.getBestDay()
})

ipcMain.handle('stats:getCalendarData', () => {
  return db.getCalendarData()
})

ipcMain.handle('stats:getTrend', (_, days) => {
  return db.getTrend(days)
})

ipcMain.handle('stats:getMonthly', (_, year, month) => {
  return db.getMonthlyStats(year, month)
})

// ── Task extended ──────────────────────────────────────────
ipcMain.handle('task:reorder', (_, taskId, direction) => {
  return db.reorderTask(taskId, direction)
})

ipcMain.handle('task:updateContent', (_, taskId, content) => {
  return db.updateTaskContent(taskId, content)
})

ipcMain.handle('task:updateFull', (_, taskId, fields) => {
  return db.updateTaskFull(taskId, fields)
})

ipcMain.handle('task:getOverdue', () => {
  return db.getOverdueTasks()
})

ipcMain.handle('task:search', (_, query) => {
  return db.searchTasks(query)
})

// ── Notifications ────────────────────────────────────────────
ipcMain.handle('notification:send', (_, title, body) => {
  if (Notification.isSupported()) {
    new Notification({ title, body }).show()
  }
  return { ok: true }
})

// ── Window controls ────────────────────────────────────────
ipcMain.on('window:minimize', () => BrowserWindow.getFocusedWindow()?.minimize())
ipcMain.on('window:maximize', () => {
  const win = BrowserWindow.getFocusedWindow()
  if (win) win.isMaximized() ? win.unmaximize() : win.maximize()
})
ipcMain.on('window:close', () => BrowserWindow.getFocusedWindow()?.close())

// ── Habits ──────────────────────────────────────────────
ipcMain.handle('habit:getAll', () => db.getHabits())
ipcMain.handle('habit:save',   (_, habit) => db.saveHabit(habit))
ipcMain.handle('habit:delete', (_, id)    => db.deleteHabit(id))
ipcMain.handle('habit:getLogs',   (_, date)              => db.getHabitLogs(date))
ipcMain.handle('habit:toggle',    (_, habitId, date, v)  => db.toggleHabitLog(habitId, date, v))
ipcMain.handle('habit:getStreak', (_, id)                => db.getHabitStreak(id))
ipcMain.handle('habit:getMonthly',(_, id, year, month)   => db.getHabitMonthlyData(id, year, month))

// ── Week stats ──────────────────────────────────────────
ipcMain.handle('stats:getWeek', (_, weekStart) => db.getWeekData(weekStart))

// ── Data export / import ─────────────────────────────────
ipcMain.handle('data:export', async () => {
  const data = db.exportData()
  const { filePath, canceled } = await dialog.showSaveDialog({
    defaultPath: `flow-backup-${new Date().toISOString().slice(0, 10)}.json`,
    filters: [{ name: 'JSON', extensions: ['json'] }]
  })
  if (canceled || !filePath) return { success: false }
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8')
    return { success: true }
  } catch (e) {
    return { success: false, error: e.message }
  }
})

ipcMain.handle('data:import', async () => {
  const { filePaths, canceled } = await dialog.showOpenDialog({
    filters: [{ name: 'JSON', extensions: ['json'] }],
    properties: ['openFile']
  })
  if (canceled || !filePaths[0]) return { success: false }
  try {
    const raw    = fs.readFileSync(filePaths[0], 'utf8')
    const parsed = JSON.parse(raw)
    return db.importData(parsed)
  } catch (e) {
    return { success: false, error: e.message }
  }
})

// ── Cashflow ───────────────────────────────────────────────
ipcMain.handle('cashflow:getTransactions',  (_, year, month) => db.getTransactions(year, month))
ipcMain.handle('cashflow:addTransaction',   (_, tx)          => db.addTransaction(tx))
ipcMain.handle('cashflow:updateTransaction',(_, id, fields)  => db.updateTransaction(id, fields))
ipcMain.handle('cashflow:deleteTransaction',(_, id)          => db.deleteTransaction(id))
ipcMain.handle('cashflow:getMonthlySummary',(_, year, month) => db.getMonthlySummary(year, month))
ipcMain.handle('cashflow:getAllTime',       ()               => db.getAllTimeSummary())
ipcMain.handle('cashflow:getFixed',         ()               => db.getFixedItems())
ipcMain.handle('cashflow:saveFixed',        (_, item)        => db.saveFixedItem(item))
ipcMain.handle('cashflow:deleteFixed',      (_, id)          => db.deleteFixedItem(id))

// ── Notes ──────────────────────────────────────────────────
ipcMain.handle('notes:getAll',    ()           => db.getNotes())
ipcMain.handle('notes:save',      (_, note)    => db.saveNote(note))
ipcMain.handle('notes:delete',    (_, id)      => db.deleteNote(id))

// ── Pomodoro ────────────────────────────────────────────────
ipcMain.handle('pomo:addSession',  (_, session) => db.addPomodoroSession(session))
ipcMain.handle('pomo:dayStats',    (_, date)    => db.getPomodoroDayStats(date))
ipcMain.handle('pomo:weekStats',   ()           => db.getPomodoroWeekStats())

// ── Journal ─────────────────────────────────────────────────
ipcMain.handle('journal:getEntry', (_, date)        => db.getJournalEntry(date))
ipcMain.handle('journal:getMonth', (_, year, month) => db.getJournalMonth(year, month))
ipcMain.handle('journal:save',     (_, entry)       => db.saveJournalEntry(entry))
ipcMain.handle('journal:delete',   (_, date)        => db.deleteJournalEntry(date))

// ── Goals ────────────────────────────────────────────────────
ipcMain.handle('goals:getAll',     ()              => db.getGoals())
ipcMain.handle('goals:save',       (_, goal)       => db.saveGoal(goal))
ipcMain.handle('goals:delete',     (_, id)         => db.deleteGoal(id))
ipcMain.handle('goals:saveKr',     (_, goalId, kr) => db.saveKeyResult(goalId, kr))
ipcMain.handle('goals:deleteKr',   (_, goalId, krId) => db.deleteKeyResult(goalId, krId))