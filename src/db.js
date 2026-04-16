const fs   = require('fs')
const path = require('path')
const { app } = require('electron')

const DB_PATH = path.join(app.getPath('userData'), 'flow.json')

// ── Load / save ─────────────────────────────────────────────
function load() {
  if (!fs.existsSync(DB_PATH)) return {
    boards: [], tasks: [], habits: [], habit_logs: [],
    transactions: [], fixed_items: [], notes: [],
    meta: { nextBoardId: 1, nextTaskId: 1, nextHabitId: 1, nextTxId: 1, nextFixedId: 1, nextNoteId: 1 }
  }
  try {
    const data = JSON.parse(fs.readFileSync(DB_PATH, 'utf8'))
    if (!data.habits)       data.habits       = []
    if (!data.habit_logs)   data.habit_logs   = []
    if (!data.transactions) data.transactions = []
    if (!data.fixed_items)  data.fixed_items  = []
    if (!data.notes)        data.notes        = []
    if (!data.pomo_sessions) data.pomo_sessions = []
    if (!data.journal)      data.journal      = []
    if (!data.goals)        data.goals        = []
    if (!data.meta.nextHabitId)   data.meta.nextHabitId   = 1
    if (!data.meta.nextTxId)      data.meta.nextTxId      = 1
    if (!data.meta.nextFixedId)   data.meta.nextFixedId   = 1
    if (!data.meta.nextNoteId)    data.meta.nextNoteId    = 1
    if (!data.meta.nextPomoId)    data.meta.nextPomoId    = 1
    if (!data.meta.nextJournalId) data.meta.nextJournalId = 1
    if (!data.meta.nextGoalId)    data.meta.nextGoalId    = 1
    if (!data.meta.nextKrId)      data.meta.nextKrId      = 1
    return data
  }
  catch { return {
    boards: [], tasks: [], habits: [], habit_logs: [],
    transactions: [], fixed_items: [], notes: [],
    pomo_sessions: [], journal: [], goals: [],
    meta: { nextBoardId: 1, nextTaskId: 1, nextHabitId: 1, nextTxId: 1, nextFixedId: 1,
            nextNoteId: 1, nextPomoId: 1, nextJournalId: 1, nextGoalId: 1, nextKrId: 1 }
  }}
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
        ...(task.note      !== undefined ? { note:     task.note     } : {}),
        ...(task.priority  !== undefined ? { priority: task.priority } : {})
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
    priority: task.priority ?? null,
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
    if (fields.priority !== undefined) task.priority = fields.priority
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
// ── Habit Streak ──────────────────────────────────────────────
function getHabitStreak(habitId) {
  const data = load()
  const completedDates = data.habit_logs
    .filter(l => l.habit_id === habitId && l.completed)
    .map(l => l.date)
    .sort((a, b) => b.localeCompare(a))

  let best = 0, temp = 0, prev = null
  for (const date of completedDates) {
    if (!prev)                              { temp = 1 }
    else if (daysBetween(date, prev) === 1) { temp++ }
    else                                    { if (temp > best) best = temp; temp = 1 }
    prev = date
  }
  if (temp > best) best = temp

  const today     = todayStr()
  const yesterday = offsetDate(today, -1)
  let current = 0
  if (completedDates.length > 0 && (completedDates[0] === today || completedDates[0] === yesterday)) {
    let expect = completedDates[0]
    for (const date of completedDates) {
      if (date !== expect) break
      current++
      expect = offsetDate(date, -1)
    }
  }
  return { current, best }
}

// ── Habit Monthly Data ──────────────────────────────────────
function getHabitMonthlyData(habitId, year, month) {
  const data   = load()
  const prefix = `${year}-${String(month).padStart(2, '0')}`
  const logs   = data.habit_logs.filter(l => l.habit_id === habitId && l.date.startsWith(prefix))
  const dailyMap = {}
  logs.forEach(l => { dailyMap[l.date] = l.completed })
  const completedCount = Object.values(dailyMap).filter(Boolean).length
  const daysInMonth    = new Date(year, month, 0).getDate()
  return { dailyMap, completedCount, daysInMonth }
}

// ── Week Data ───────────────────────────────────────────────────
function getWeekData(weekStartDate) {
  const data = load()
  const days = []
  for (let i = 0; i < 7; i++) {
    const date  = offsetDate(weekStartDate, i)
    const board = data.boards.find(b => b.date === date)
    const day   = { date, total: 0, done: 0, doing: 0, todo: 0, score: null }
    if (board) {
      const tasks = data.tasks.filter(t => t.board_id === board.id)
      day.total   = tasks.length
      day.done    = tasks.filter(t => t.status === 'done').length
      day.doing   = tasks.filter(t => t.status === 'doing').length
      day.todo    = tasks.filter(t => t.status === 'todo').length
      day.score   = tasks.length ? Math.round((day.done / tasks.length) * 100) : null
    }
    days.push(day)
  }
  return days
}

// ── Export / Import ──────────────────────────────────────────────
function exportData() {
  return load()
}

function importData(newData) {
  if (!newData || !Array.isArray(newData.boards) || !Array.isArray(newData.tasks) || !Array.isArray(newData.habits)) {
    return { success: false, error: 'Invalid data structure' }
  }
  if (!newData.habit_logs) newData.habit_logs = []
  if (!newData.meta)       newData.meta = { nextBoardId: 1, nextTaskId: 1, nextHabitId: 1 }
  save(newData)
  return { success: true }
}
// ── Cashflow — Transactions ───────────────────────────────────
function getTransactions(year, month) {
  const data = load()
  return data.transactions
    .filter(tx => {
      const d = new Date(tx.date)
      return d.getFullYear() === year && (d.getMonth() + 1) === month
    })
    .sort((a, b) => b.date.localeCompare(a.date) || b.id - a.id)
}

function addTransaction(tx) {
  const data = load()
  const newTx = {
    id:          data.meta.nextTxId++,
    type:        tx.type,        // 'income' | 'expense'
    amount:      Number(tx.amount),
    category:    tx.category || 'Diğer',
    description: tx.description || '',
    date:        tx.date,
    isFixed:     tx.isFixed || false
  }
  data.transactions.push(newTx)
  save(data)
  return newTx
}

function updateTransaction(id, fields) {
  const data = load()
  const tx = data.transactions.find(t => t.id === id)
  if (!tx) return null
  if (fields.amount      !== undefined) tx.amount      = Number(fields.amount)
  if (fields.category    !== undefined) tx.category    = fields.category
  if (fields.description !== undefined) tx.description = fields.description
  if (fields.date        !== undefined) tx.date        = fields.date
  if (fields.type        !== undefined) tx.type        = fields.type
  save(data)
  return tx
}

function deleteTransaction(id) {
  const data = load()
  data.transactions = data.transactions.filter(t => t.id !== id)
  save(data)
  return { success: true }
}

function getMonthlySummary(year, month) {
  const txs = getTransactions(year, month)
  const income  = txs.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0)
  const expense = txs.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0)

  // By category breakdown
  const byCat = {}
  txs.forEach(t => {
    if (!byCat[t.category]) byCat[t.category] = { income: 0, expense: 0 }
    byCat[t.category][t.type] += t.amount
  })

  // Daily trend (for chart) — last day of month
  const daysInMonth = new Date(year, month, 0).getDate()
  const daily = Array.from({ length: daysInMonth }, (_, i) => {
    const d   = `${year}-${String(month).padStart(2,'0')}-${String(i+1).padStart(2,'0')}`
    const inc = txs.filter(t => t.date === d && t.type === 'income').reduce((s,t) => s+t.amount, 0)
    const exp = txs.filter(t => t.date === d && t.type === 'expense').reduce((s,t) => s+t.amount, 0)
    return { day: i + 1, income: inc, expense: exp }
  })

  return { income, expense, balance: income - expense, byCat, daily, txs }
}

function getAllTimeSummary() {
  const data = load()
  const txs  = data.transactions
  const income  = txs.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0)
  const expense = txs.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0)

  // Last 6 months
  const now   = new Date()
  const months = []
  for (let i = 5; i >= 0; i--) {
    const d   = new Date(now.getFullYear(), now.getMonth() - i, 1)
    const y   = d.getFullYear()
    const m   = d.getMonth() + 1
    const inc = txs.filter(t => { const td = new Date(t.date); return td.getFullYear()===y && td.getMonth()+1===m && t.type==='income'  }).reduce((s,t)=>s+t.amount,0)
    const exp = txs.filter(t => { const td = new Date(t.date); return td.getFullYear()===y && td.getMonth()+1===m && t.type==='expense' }).reduce((s,t)=>s+t.amount,0)
    months.push({ year: y, month: m, income: inc, expense: exp, balance: inc - exp })
  }
  return { income, expense, balance: income - expense, months }
}

// ── Cashflow — Fixed Items (recurring) ───────────────────────
function getFixedItems() {
  const data = load()
  return data.fixed_items || []
}

function saveFixedItem(item) {
  const data = load()
  if (item.id) {
    const idx = data.fixed_items.findIndex(f => f.id === item.id)
    if (idx !== -1) {
      data.fixed_items[idx] = { ...data.fixed_items[idx], ...item }
      save(data)
      return data.fixed_items[idx]
    }
  }
  const newItem = {
    id:          data.meta.nextFixedId++,
    type:        item.type,        // 'income' | 'expense'
    amount:      Number(item.amount),
    category:    item.category || 'Diğer',
    description: item.description || '',
    dayOfMonth:  item.dayOfMonth || 1,
  }
  data.fixed_items.push(newItem)
  save(data)
  return newItem
}

function deleteFixedItem(id) {
  const data = load()
  data.fixed_items = data.fixed_items.filter(f => f.id !== id)
  save(data)
  return { success: true }
}

// ── Notes ─────────────────────────────────────────────────────
function getNotes() {
  const data = load()
  return (data.notes || []).sort((a, b) => b.updated_at.localeCompare(a.updated_at))
}

function saveNote(note) {
  const data = load()
  const now  = new Date().toISOString()
  if (note.id) {
    const idx = data.notes.findIndex(n => n.id === note.id)
    if (idx !== -1) {
      data.notes[idx].title      = note.title !== undefined ? note.title : data.notes[idx].title
      data.notes[idx].body       = note.body  !== undefined ? note.body  : data.notes[idx].body
      data.notes[idx].updated_at = now
      data.notes[idx].pinned     = note.pinned !== undefined ? note.pinned : data.notes[idx].pinned
      save(data)
      return data.notes[idx]
    }
  }
  const newNote = {
    id:         data.meta.nextNoteId++,
    title:      note.title || '',
    body:       note.body  || '',
    pinned:     false,
    color:      note.color || null,
    created_at: now,
    updated_at: now,
  }
  data.notes.push(newNote)
  save(data)
  return newNote
}

function deleteNote(id) {
  const data = load()
  data.notes = data.notes.filter(n => n.id !== id)
  save(data)
  return { success: true }
}

// ── Pomodoro Sessions ─────────────────────────────────────────
function addPomodoroSession(session) {
  const data = load()
  if (!data.pomo_sessions) data.pomo_sessions = []
  if (!data.meta.nextPomoId) data.meta.nextPomoId = 1
  const now = new Date().toISOString()
  const entry = {
    id:           data.meta.nextPomoId++,
    date:         session.date || now.slice(0, 10),
    type:         session.type || 'work',     // 'work' | 'short_break' | 'long_break'
    duration_min: session.duration_min || 25,
    completed:    session.completed !== false,
    created_at:   now,
  }
  data.pomo_sessions.push(entry)
  save(data)
  return entry
}

function getPomodoroDayStats(date) {
  const data = load()
  const sessions = (data.pomo_sessions || []).filter(s => s.date === date && s.completed)
  const work  = sessions.filter(s => s.type === 'work')
  const total_min = work.reduce((s, p) => s + p.duration_min, 0)
  return {
    sessions: work.length,
    total_min,
    total_hr: +(total_min / 60).toFixed(1),
    sessions_list: sessions,
  }
}

function getPomodoroWeekStats() {
  const data = load()
  const today = new Date()
  const days  = []
  for (let i = 6; i >= 0; i--) {
    const d = new Date(today)
    d.setDate(today.getDate() - i)
    const date = d.toISOString().slice(0, 10)
    const sessions = (data.pomo_sessions || []).filter(s => s.date === date && s.type === 'work' && s.completed)
    days.push({ date, sessions: sessions.length, total_min: sessions.reduce((a, s) => a + s.duration_min, 0) })
  }
  return days
}

// ── Journal ────────────────────────────────────────────────────
function getJournalEntry(date) {
  const data = load()
  return (data.journal || []).find(j => j.date === date) || null
}

function getJournalMonth(year, month) {
  const data = load()
  const prefix = `${year}-${String(month).padStart(2, '0')}`
  return (data.journal || []).filter(j => j.date.startsWith(prefix))
}

function saveJournalEntry(entry) {
  const data = load()
  if (!data.journal) data.journal = []
  if (!data.meta.nextJournalId) data.meta.nextJournalId = 1
  const now = new Date().toISOString()
  const existing = data.journal.findIndex(j => j.date === entry.date)
  if (existing !== -1) {
    data.journal[existing] = {
      ...data.journal[existing],
      mood:        entry.mood        !== undefined ? entry.mood        : data.journal[existing].mood,
      body:        entry.body        !== undefined ? entry.body        : data.journal[existing].body,
      highlights:  entry.highlights  !== undefined ? entry.highlights  : data.journal[existing].highlights,
      challenges:  entry.challenges  !== undefined ? entry.challenges  : data.journal[existing].challenges,
      updated_at:  now,
    }
    save(data)
    return data.journal[existing]
  }
  const newEntry = {
    id:          data.meta.nextJournalId++,
    date:        entry.date,
    mood:        entry.mood || 3,
    body:        entry.body || '',
    highlights:  entry.highlights || '',
    challenges:  entry.challenges || '',
    created_at:  now,
    updated_at:  now,
  }
  data.journal.push(newEntry)
  save(data)
  return newEntry
}

function deleteJournalEntry(date) {
  const data = load()
  data.journal = (data.journal || []).filter(j => j.date !== date)
  save(data)
  return { success: true }
}

// ── Goals / OKR ────────────────────────────────────────────────
function getGoals() {
  const data = load()
  return (data.goals || []).sort((a, b) => b.created_at.localeCompare(a.created_at))
}

function saveGoal(goal) {
  const data = load()
  if (!data.goals) data.goals = []
  if (!data.meta.nextGoalId) data.meta.nextGoalId = 1
  if (!data.meta.nextKrId)   data.meta.nextKrId   = 1
  const now = new Date().toISOString()
  if (goal.id) {
    const idx = data.goals.findIndex(g => g.id === goal.id)
    if (idx !== -1) {
      data.goals[idx] = { ...data.goals[idx], ...goal, updated_at: now }
      save(data)
      return data.goals[idx]
    }
  }
  const newGoal = {
    id:          data.meta.nextGoalId++,
    title:       goal.title || '',
    description: goal.description || '',
    timeframe:   goal.timeframe || '',
    color:       goal.color || '#2a2a5a',
    status:      goal.status || 'active',   // 'active' | 'completed' | 'paused'
    key_results: [],
    created_at:  now,
    updated_at:  now,
  }
  data.goals.push(newGoal)
  save(data)
  return newGoal
}

function deleteGoal(id) {
  const data = load()
  data.goals = (data.goals || []).filter(g => g.id !== id)
  save(data)
  return { success: true }
}

function saveKeyResult(goalId, kr) {
  const data = load()
  if (!data.meta.nextKrId) data.meta.nextKrId = 1
  const goal = data.goals.find(g => g.id === goalId)
  if (!goal) return null
  if (!goal.key_results) goal.key_results = []
  const now = new Date().toISOString()
  if (kr.id) {
    const idx = goal.key_results.findIndex(k => k.id === kr.id)
    if (idx !== -1) {
      goal.key_results[idx] = { ...goal.key_results[idx], ...kr, updated_at: now }
      save(data)
      return goal.key_results[idx]
    }
  }
  const newKr = {
    id:         data.meta.nextKrId++,
    title:      kr.title || '',
    target:     kr.target || 100,
    current:    kr.current || 0,
    unit:       kr.unit || '%',
    created_at: now,
    updated_at: now,
  }
  goal.key_results.push(newKr)
  save(data)
  return newKr
}

function deleteKeyResult(goalId, krId) {
  const data = load()
  const goal = (data.goals || []).find(g => g.id === goalId)
  if (!goal) return { success: false }
  goal.key_results = (goal.key_results || []).filter(k => k.id !== krId)
  save(data)
  return { success: true }
}

// ── Date helpers ─────────────────────────────────────────────
function todayStr() {
  return new Date().toISOString().slice(0, 10)
}

function offsetDate(dateStr, days) {
  const d = new Date(dateStr + 'T12:00:00')
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
  getHabits, saveHabit, deleteHabit, getHabitLogs, toggleHabitLog,
  getHabitStreak, getHabitMonthlyData, getWeekData, exportData, importData,
  // Cashflow
  getTransactions, addTransaction, updateTransaction, deleteTransaction,
  getMonthlySummary, getAllTimeSummary,
  getFixedItems, saveFixedItem, deleteFixedItem,
  // Notes
  getNotes, saveNote, deleteNote,
  // Pomodoro
  addPomodoroSession, getPomodoroDayStats, getPomodoroWeekStats,
  // Journal
  getJournalEntry, getJournalMonth, saveJournalEntry, deleteJournalEntry,
  // Goals
  getGoals, saveGoal, deleteGoal, saveKeyResult, deleteKeyResult,
}
