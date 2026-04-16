const fs   = require('fs')
const path = require('path')
const { app } = require('electron')

const DB_PATH = path.join(app.getPath('userData'), 'flow.json')

// ── Load / save ─────────────────────────────────────────────
function load() {
  if (!fs.existsSync(DB_PATH)) return { boards: [], tasks: [], habits: [], habit_logs: [], meta: { nextBoardId: 1, nextTaskId: 1, nextHabitId: 1 } }
  try {
    const data = JSON.parse(fs.readFileSync(DB_PATH, 'utf8'))
    // migrate older files that lack habits
    if (!data.habits)     data.habits     = []
    if (!data.habit_logs) data.habit_logs = []
    if (!data.meta.nextHabitId) data.meta.nextHabitId = 1
    return data
  }
  catch { return { boards: [], tasks: [], habits: [], habit_logs: [], meta: { nextBoardId: 1, nextTaskId: 1, nextHabitId: 1 } } }
}

function save(data) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data), 'utf8')
}

// ── Board ────────────────────────────────────────────────────
function getOrCreateBoard(date) {
  const data = load()
  let board = data.boards.find(b => b.date === date)
  if (board) return board

  board = { id: data.meta.nextBoardId++, date, created_at: new Date().toISOString() }
  data.boards.push(board)
  save(data)
  return board
}

// ── Tasks ────────────────────────────────────────────────────
function getTasks(boardId) {
  const data = load()
  return data.tasks
    .filter(t => t.board_id === boardId)
    .sort((a, b) => a.order_index - b.order_index || a.id - b.id)
}

function saveTask(task) {
  const data = load()
  if (task.id) {
    const idx = data.tasks.findIndex(t => t.id === task.id)
    if (idx !== -1) {
      data.tasks[idx] = {
        ...data.tasks[idx],
        content: task.content,
        status: task.status,
        order_index: task.order_index ?? 0,
        ...(task.deadline !== undefined ? { deadline: task.deadline } : {}),
        ...(task.note      !== undefined ? { note:     task.note     } : {})
      }
      save(data)
      return data.tasks[idx]
    }
  }
  const boardTasks = data.tasks.filter(t => t.board_id === task.board_id)
  const maxOrder = boardTasks.length ? Math.max(...boardTasks.map(t => t.order_index)) : -1
  const newTask = {
    id: data.meta.nextTaskId++,
    board_id: task.board_id,
    content: task.content,
    status: task.status ?? 'todo',
    order_index: maxOrder + 1,
    deadline: task.deadline ?? null,
    note: task.note ?? null,
    created_at: new Date().toISOString(),
    completed_at: null
  }
  data.tasks.push(newTask)
  save(data)
  return newTask
}

function deleteTask(taskId) {
  const data = load()
  data.tasks = data.tasks.filter(t => t.id !== taskId)
  save(data)
  return { success: true }
}

function updateTaskStatus(taskId, status) {
  const data = load()
  const task = data.tasks.find(t => t.id === taskId)
  if (task) {
    task.status = status
    task.completed_at = status === 'done' ? new Date().toISOString() : null
    save(data)
  }
  return task
}

// ── Score helper ─────────────────────────────────────────────
function scoreForBoard(boardId, data) {
  const tasks = data.tasks.filter(t => t.board_id === boardId)
  if (tasks.length === 0) return null
  const done = tasks.filter(t => t.status === 'done').length
  return (done / tasks.length) * 100
}

// ── Streak ───────────────────────────────────────────────────
const STREAK_THRESHOLD = 90

function getStreak() {
  const data = load()
  const boards = [...data.boards].sort((a, b) => b.date.localeCompare(a.date))

  let current = 0
  let best = 0
  let temp = 0
  let prevDate = null

  for (const board of boards) {
    const score = scoreForBoard(board.id, data)
    const qualified = score !== null && score >= STREAK_THRESHOLD

    if (qualified) {
      if (prevDate === null) {
        temp = 1
      } else {
        temp = daysBetween(board.date, prevDate) === 1 ? temp + 1 : 1
      }
      prevDate = board.date
    } else {
      if (temp > best) best = temp
      temp = 0
      prevDate = board.date
    }
  }
  if (temp > best) best = temp

  const today = todayStr()
  if (boards.length > 0) {
    const latestDate = boards[0].date
    if (latestDate === today || latestDate === offsetDate(today, -1)) {
      let streak = 0
      let expect = latestDate
      for (const board of boards) {
        if (board.date !== expect) break
        const score = scoreForBoard(board.id, data)
        if (score === null || score < STREAK_THRESHOLD) break
        streak++
        expect = offsetDate(board.date, -1)
      }
      current = streak
    }
  }

  return { current, best }
}

// ── Best Day ─────────────────────────────────────────────────
function getBestDay() {
  const data = load()
  let best = null

  for (const board of data.boards) {
    const score = scoreForBoard(board.id, data)
    if (score === null) continue
    const taskCount = data.tasks.filter(t => t.board_id === board.id).length
    if (!best || score > best.score) {
      best = { date: board.date, score: Math.round(score), taskCount }
    }
  }

  return best
}

// ── Calendar Data ────────────────────────────────────────────
function getCalendarData() {
  const data = load()
  return data.boards.map(board => ({
    date: board.date,
    score: Math.round(scoreForBoard(board.id, data) ?? 0)
  }))
}

// ── Trend ────────────────────────────────────────────────────
function getTrend(days = 30) {
  const data = load()
  const cutoff = offsetDate(todayStr(), -days)
  return data.boards
    .filter(b => b.date >= cutoff)
    .sort((a, b) => a.date.localeCompare(b.date))
    .map(board => ({
      date: board.date,
      completionRate: Math.round(scoreForBoard(board.id, data) ?? 0)
    }))
}

// ── Monthly Stats ────────────────────────────────────────────
function getMonthlyStats(year, month) {
  const data = load()
  const prefix = `${year}-${String(month).padStart(2, '0')}`
  const boards = data.boards
    .filter(b => b.date.startsWith(prefix))
    .sort((a, b) => a.date.localeCompare(b.date))

  let totalTasks = 0
  let completedTasks = 0
  let bestDay = null
  let worstDay = null
  const dailyScores = []

  for (const board of boards) {
    const tasks = data.tasks.filter(t => t.board_id === board.id)
    if (tasks.length === 0) continue
    const done = tasks.filter(t => t.status === 'done').length
    totalTasks += tasks.length
    completedTasks += done
    const score = Math.round((done / tasks.length) * 100)
    dailyScores.push({ date: board.date, score })
    if (!bestDay || score > bestDay.score)  bestDay  = { date: board.date, score }
    if (!worstDay || score < worstDay.score) worstDay = { date: board.date, score }
  }

  const avgScore = dailyScores.length
    ? Math.round(dailyScores.reduce((s, d) => s + d.score, 0) / dailyScores.length)
    : 0

  const weeklyBreakdown = []
  for (let w = 0; w < 6; w++) {
    const weekDays = dailyScores.filter(d => {
      const day = parseInt(d.date.split('-')[2])
      return day >= w * 7 + 1 && day <= (w + 1) * 7
    })
    if (weekDays.length === 0) continue
    const avg = Math.round(weekDays.reduce((s, d) => s + d.score, 0) / weekDays.length)
    weeklyBreakdown.push({ week: w + 1, avgScore: avg, days: weekDays.length })
  }

  return {
    year, month, totalTasks, completedTasks, avgScore,
    bestDay, worstDay, weeklyBreakdown, dailyScores
  }
}

// ── Habits ──────────────────────────────────────────────────
function getHabits() {
  return load().habits
}

function saveHabit(habit) {
  const data = load()
  if (habit.id) {
    const h = data.habits.find(h => h.id === habit.id)
    if (h) { h.name = habit.name; save(data); return h }
  }
  const newHabit = { id: data.meta.nextHabitId++, name: habit.name, created_at: new Date().toISOString() }
  data.habits.push(newHabit)
  save(data)
  return newHabit
}

function deleteHabit(habitId) {
  const data = load()
  data.habits     = data.habits.filter(h => h.id !== habitId)
  data.habit_logs = data.habit_logs.filter(l => l.habit_id !== habitId)
  save(data)
  return { success: true }
}

function getHabitLogs(date) {
  return load().habit_logs.filter(l => l.date === date)
}

function toggleHabitLog(habitId, date, completed) {
  const data = load()
  const existing = data.habit_logs.find(l => l.habit_id === habitId && l.date === date)
  if (existing) {
    existing.completed = completed
  } else {
    data.habit_logs.push({ habit_id: habitId, date, completed })
  }
  save(data)
  return { success: true }
}

// ── Reorder Task ────────────────────────────────────────────
function reorderTask(taskId, direction) {
  const data = load()
  const task = data.tasks.find(t => t.id === taskId)
  if (!task) return { success: false }

  const columnTasks = data.tasks
    .filter(t => t.board_id === task.board_id && t.status === task.status)
    .sort((a, b) => a.order_index - b.order_index || a.id - b.id)

  const idx = columnTasks.findIndex(t => t.id === taskId)
  const swapIdx = direction === 'up' ? idx - 1 : idx + 1
  if (swapIdx < 0 || swapIdx >= columnTasks.length) return { success: false }

  ;[columnTasks[idx], columnTasks[swapIdx]] = [columnTasks[swapIdx], columnTasks[idx]]
  columnTasks.forEach((ct, i) => {
    const ref = data.tasks.find(t => t.id === ct.id)
    if (ref) ref.order_index = i
  })

  save(data)
  return { success: true }
}

// ── Update Task Content ───────────────────────────────────────
function updateTaskContent(taskId, content) {
  const data = load()
  const task = data.tasks.find(t => t.id === taskId)
  if (task) {
    task.content = content
    save(data)
  }
  return task
}

// ── Update Task Full (content + deadline + note) ──────────────
function updateTaskFull(taskId, fields) {
  const data = load()
  const task = data.tasks.find(t => t.id === taskId)
  if (task) {
    if (fields.content  !== undefined) task.content  = fields.content
    if (fields.deadline !== undefined) task.deadline = fields.deadline
    if (fields.note     !== undefined) task.note     = fields.note
    save(data)
  }
  return task
}

// ── Overdue Tasks ─────────────────────────────────────────────
function getOverdueTasks() {
  const data = load()
  const today = todayStr()
  return data.tasks
    .filter(t => t.deadline && t.deadline < today && t.status !== 'done')
    .map(t => {
      const board = data.boards.find(b => b.id === t.board_id)
      return { ...t, boardDate: board?.date }
    })
}

// ── Search Tasks ──────────────────────────────────────────────
function searchTasks(query) {
  const data = load()
  const q = query.toLowerCase()
  return data.tasks
    .filter(t =>
      t.content.toLowerCase().includes(q) ||
      (t.note || '').toLowerCase().includes(q)
    )
    .map(t => {
      const board = data.boards.find(b => b.id === t.board_id)
      return { ...t, boardDate: board?.date }
    })
    .sort((a, b) => (b.boardDate || '').localeCompare(a.boardDate || ''))
    .slice(0, 60)
}

// ── Date helpers ─────────────────────────────────────────────
function todayStr() {
  return new Date().toISOString().slice(0, 10)
}

function offsetDate(dateStr, days) {
  const d = new Date(dateStr)
  d.setDate(d.getDate() + days)
  return d.toISOString().slice(0, 10)
}

function daysBetween(a, b) {
  const da = new Date(a)
  const db2 = new Date(b)
  return Math.round(Math.abs((db2 - da) / 86400000))
}

module.exports = {
  getOrCreateBoard, getTasks, saveTask, deleteTask, updateTaskStatus,
  getStreak, getBestDay, getCalendarData, getTrend, getMonthlyStats,
  reorderTask, updateTaskContent, updateTaskFull, getOverdueTasks, searchTasks,
  getHabits, saveHabit, deleteHabit, getHabitLogs, toggleHabitLog
}
