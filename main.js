const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const db = require('./src/db')

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
