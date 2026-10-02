import React, { useState, useEffect } from "react";
import { Plus, Trash2, Check, ArrowRight, Play, RotateCcw, ExternalLink, Sparkles, DollarSign, Briefcase, Split, Kanban, ShoppingBag, Flame, Code, Terminal, Clock, TrendingUp, Utensils, Database } from "lucide-react";
import { getCookie, setCookie } from "../../lib/cookies";
import { playClickSound, playSuccessSound, playBeepSound } from "../../lib/sound";

/* 1. Live Personal Finance Dashboard Sandbox */
export function FinanceSandbox() {
  const [transactions, setTransactions] = useState(() =>
    getCookie("demo_finance_txs", [
      { id: 1, text: "SDC ERP Salary", amount: 2800, type: "income", cat: "Salary" },
      { id: 2, text: "Cloud Hosting & Domain", amount: -45, type: "expense", cat: "Tech" },
      { id: 3, text: "High-Speed Fiber Net", amount: -30, type: "expense", cat: "Utilities" },
      { id: 4, text: "Engineering Books & Courses", amount: -60, type: "expense", cat: "Learning" },
    ])
  );
  const [text, setText] = useState("");
  const [amount, setAmount] = useState("");
  const [cat, setCat] = useState("Tech");
  const [filter, setFilter] = useState("all");

  const saveTxs = (newTxs) => {
    setTransactions(newTxs);
    setCookie("demo_finance_txs", newTxs, 30);
  };

  const handleAdd = (e) => {
    e.preventDefault();
    const val = parseFloat(amount);
    if (!text || isNaN(val)) return;
    playClickSound();

    const newTx = {
      id: Date.now(),
      text,
      amount: val,
      type: val >= 0 ? "income" : "expense",
      cat,
    };
    saveTxs([newTx, ...transactions]);
    setText("");
    setAmount("");
    playSuccessSound();
  };

  const handleDelete = (id) => {
    playClickSound();
    saveTxs(transactions.filter((t) => t.id !== id));
  };

  const income = transactions
    .filter((t) => t.amount > 0)
    .reduce((acc, t) => acc + t.amount, 0);
  const expenses = transactions
    .filter((t) => t.amount < 0)
    .reduce((acc, t) => acc + Math.abs(t.amount), 0);
  const balance = income - expenses;

  const filteredTxs = transactions.filter((t) => {
    if (filter === "income") return t.amount > 0;
    if (filter === "expense") return t.amount < 0;
    return true;
  });

  return (
    <div className="space-y-4">
      {/* Metric Cards */}
      <div className="grid grid-cols-3 gap-2.5 text-center">
        <div className="rounded-xl bg-white/[0.04] p-3 border border-white/10">
          <div className="text-[11px] text-muted font-mono">Net Balance</div>
          <div className={`font-mono text-base sm:text-lg font-bold ${balance >= 0 ? "text-cyan-300" : "text-rose-400"}`}>
            ${balance.toLocaleString()}
          </div>
        </div>
        <div className="rounded-xl bg-emerald-500/10 p-3 border border-emerald-500/20">
          <div className="text-[11px] text-emerald-300 font-mono">Total Inflow</div>
          <div className="font-mono text-base sm:text-lg font-bold text-emerald-400">
            +${income.toLocaleString()}
          </div>
        </div>
        <div className="rounded-xl bg-rose-500/10 p-3 border border-rose-500/20">
          <div className="text-[11px] text-rose-300 font-mono">Total Outflow</div>
          <div className="font-mono text-base sm:text-lg font-bold text-rose-400">
            -${expenses.toLocaleString()}
          </div>
        </div>
      </div>

      {/* Visual Inflow/Outflow Bar */}
      <div className="rounded-xl bg-[#060814] p-3 border border-white/10">
        <div className="flex justify-between text-xs text-muted mb-1 font-mono">
          <span>Cashflow Ratio</span>
          <span>
            {income + expenses > 0
              ? `${Math.round((income / (income + expenses)) * 100)}% Saved`
              : "0%"}
          </span>
        </div>
        <div className="h-2.5 w-full rounded-full bg-white/10 overflow-hidden flex">
          <div
            style={{ width: `${income + expenses > 0 ? (income / (income + expenses)) * 100 : 50}%` }}
            className="bg-emerald-400 transition-all duration-500"
          />
          <div
            style={{ width: `${income + expenses > 0 ? (expenses / (income + expenses)) * 100 : 50}%` }}
            className="bg-rose-400 transition-all duration-500"
          />
        </div>
      </div>

      {/* Add Transaction Form */}
      <form onSubmit={handleAdd} className="flex flex-wrap gap-2">
        <input
          type="text"
          placeholder="Title (e.g. Server bill)"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="flex-1 min-w-[120px] rounded-lg bg-white/[0.05] border border-white/10 px-3 py-1.5 text-xs text-white focus:outline-none"
        />
        <input
          type="number"
          placeholder="+Income / -Expense"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-28 rounded-lg bg-white/[0.05] border border-white/10 px-3 py-1.5 text-xs font-mono text-white focus:outline-none"
        />
        <select
          value={cat}
          onChange={(e) => setCat(e.target.value)}
          className="rounded-lg bg-[#0F142A] border border-white/10 px-2 py-1.5 text-xs text-cyan-300 focus:outline-none"
        >
          <option value="Tech">Tech</option>
          <option value="Salary">Salary</option>
          <option value="Learning">Learning</option>
          <option value="Utilities">Utilities</option>
        </select>
        <button
          type="submit"
          className="rounded-lg bg-cyan-glow px-3 py-1.5 text-xs font-semibold text-slate-950 hover:bg-cyan-300 flex items-center gap-1"
        >
          <Plus className="h-3.5 w-3.5" /> Add
        </button>
      </form>

      {/* Filters and List */}
      <div className="flex gap-1.5 text-[11px]">
        {["all", "income", "expense"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded px-2.5 py-0.5 capitalize transition-colors ${
              filter === f ? "bg-white/20 text-white font-medium" : "text-muted hover:text-white"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="max-h-48 overflow-y-auto space-y-1.5 pr-1">
        {filteredTxs.map((t) => (
          <div
            key={t.id}
            className="flex items-center justify-between rounded-lg bg-white/[0.03] px-3 py-2 text-xs border border-white/[0.05]"
          >
            <div>
              <span className="font-medium text-slate-200">{t.text}</span>
              <span className="ml-2 rounded bg-white/5 px-1.5 py-0.5 text-[10px] text-muted">
                {t.cat}
              </span>
            </div>
            <div className="flex items-center gap-2 font-mono font-bold">
              <span className={t.amount >= 0 ? "text-emerald-400" : "text-rose-400"}>
                {t.amount >= 0 ? `+$${t.amount}` : `-$${Math.abs(t.amount)}`}
              </span>
              <button
                onClick={() => handleDelete(t.id)}
                className="text-muted hover:text-rose-400 p-0.5"
              >
                <Trash2 className="h-3 w-3" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* 2. Live Job Application Tracker Sandbox */
export function JobTrackerSandbox() {
  const [jobs, setJobs] = useState(() =>
    getCookie("demo_jobs", [
      { id: 1, company: "TechCorp Labs", role: "Senior Full-Stack Engineer", status: "Interviewing", date: "Tomorrow, 2:00 PM" },
      { id: 2, company: "CloudScale Inc", role: "React & Spring Boot Lead", status: "Offer", date: "Offer Received: $110k" },
      { id: 3, company: "Nexus FinTech", role: "Java Backend Architect", status: "Applied", date: "Submitted via Referral" },
    ])
  );
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("Applied");

  const saveJobs = (newJobs) => {
    setJobs(newJobs);
    setCookie("demo_jobs", newJobs, 30);
  };

  const handleAddJob = (e) => {
    e.preventDefault();
    if (!company || !role) return;
    playClickSound();
    saveJobs([
      { id: Date.now(), company, role, status, date: "Just added" },
      ...jobs,
    ]);
    setCompany("");
    setRole("");
    playSuccessSound();
  };

  const cycleStatus = (id) => {
    playClickSound();
    const cycle = ["Applied", "Interviewing", "Offer", "Archived"];
    saveJobs(
      jobs.map((j) => {
        if (j.id === id) {
          const nextIdx = (cycle.indexOf(j.status) + 1) % cycle.length;
          return { ...j, status: cycle[nextIdx] };
        }
        return j;
      })
    );
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleAddJob} className="flex flex-wrap gap-2">
        <input
          type="text"
          placeholder="Company Name"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          className="flex-1 min-w-[120px] rounded-lg bg-white/[0.05] border border-white/10 px-3 py-1.5 text-xs text-white focus:outline-none"
        />
        <input
          type="text"
          placeholder="Role (e.g. Full-Stack Dev)"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="flex-1 min-w-[140px] rounded-lg bg-white/[0.05] border border-white/10 px-3 py-1.5 text-xs text-white focus:outline-none"
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="rounded-lg bg-[#0F142A] border border-white/10 px-2 py-1.5 text-xs text-cyan-300 focus:outline-none"
        >
          <option value="Applied">Applied</option>
          <option value="Interviewing">Interviewing</option>
          <option value="Offer">Offer</option>
        </select>
        <button
          type="submit"
          className="rounded-lg bg-gradient-to-r from-violet-glow to-cyan-glow px-3 py-1.5 text-xs font-semibold text-slate-950 hover:opacity-90 flex items-center gap-1"
        >
          <Plus className="h-3.5 w-3.5" /> Track
        </button>
      </form>

      <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
        {jobs.map((job) => {
          let badge = "bg-blue-500/20 text-blue-300 border-blue-500/30";
          if (job.status === "Interviewing") badge = "bg-amber-500/20 text-amber-300 border-amber-500/30";
          if (job.status === "Offer") badge = "bg-emerald-500/20 text-emerald-300 border-emerald-500/30";

          return (
            <div
              key={job.id}
              className="flex items-center justify-between rounded-xl bg-white/[0.03] p-3 text-xs border border-white/[0.06] hover:border-white/15"
            >
              <div>
                <div className="font-semibold text-white">{job.company}</div>
                <div className="text-muted text-[11px]">{job.role} • {job.date}</div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => cycleStatus(job.id)}
                  title="Click to advance stage"
                  className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold border transition-all hover:scale-105 active:scale-95 ${badge}`}
                >
                  {job.status} ↻
                </button>
                <button
                  onClick={() => saveJobs(jobs.filter((j) => j.id !== job.id))}
                  className="text-muted hover:text-rose-400 p-1"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* 3. Live Expense Splitter Sandbox */
export function SplitterSandbox() {
  const [total, setTotal] = useState("120");
  const [tipPercent, setTipPercent] = useState(15);
  const [people, setPeople] = useState(["Tejas", "Alex", "Jordan"]);
  const [newPerson, setNewPerson] = useState("");

  const bill = parseFloat(total) || 0;
  const tipAmount = (bill * tipPercent) / 100;
  const grandTotal = bill + tipAmount;
  const perPerson = people.length > 0 ? grandTotal / people.length : 0;

  const addPerson = () => {
    if (!newPerson.trim()) return;
    playClickSound();
    setPeople([...people, newPerson.trim()]);
    setNewPerson("");
  };

  const removePerson = (name) => {
    playClickSound();
    if (people.length > 1) {
      setPeople(people.filter((p) => p !== name));
    }
  };

  return (
    <div className="space-y-4 text-xs">
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-xl bg-white/[0.04] p-3 border border-white/10">
          <label className="text-[11px] text-muted block mb-1">Total Bill Amount ($)</label>
          <input
            type="number"
            value={total}
            onChange={(e) => setTotal(e.target.value)}
            className="w-full rounded bg-white/5 border border-white/10 px-2 py-1 text-sm font-mono text-white focus:outline-none"
          />
        </div>
        <div className="rounded-xl bg-white/[0.04] p-3 border border-white/10">
          <div className="flex justify-between text-[11px] text-muted mb-1">
            <span>Tip: {tipPercent}%</span>
            <span>+${tipAmount.toFixed(2)}</span>
          </div>
          <input
            type="range"
            min="0"
            max="30"
            value={tipPercent}
            onChange={(e) => setTipPercent(parseInt(e.target.value))}
            className="w-full accent-cyan-glow cursor-pointer mt-1"
          />
        </div>
      </div>

      {/* Result Hero */}
      <div className="rounded-xl bg-gradient-to-r from-violet-900/30 to-cyan-900/30 border border-cyan-glow/30 p-4 text-center">
        <div className="text-muted text-[11px] font-mono">EACH PERSON OWES</div>
        <div className="text-3xl font-bold font-mono text-cyan-300 my-1">
          ${perPerson.toFixed(2)}
        </div>
        <div className="text-muted text-[10px]">
          Grand Total: ${grandTotal.toFixed(2)} across {people.length} friends
        </div>
      </div>

      {/* Participants */}
      <div>
        <div className="text-[11px] text-muted mb-1.5 flex justify-between">
          <span>Split Among:</span>
          <span>{people.length} People</span>
        </div>
        <div className="flex flex-wrap gap-1.5 mb-2">
          {people.map((p) => (
            <span
              key={p}
              className="flex items-center gap-1 rounded-full bg-white/10 px-2.5 py-1 text-[11px] text-white"
            >
              {p}
              {people.length > 1 && (
                <button
                  onClick={() => removePerson(p)}
                  className="hover:text-rose-400 ml-1 text-muted"
                >
                  ×
                </button>
              )}
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Add friend's name..."
            value={newPerson}
            onChange={(e) => setNewPerson(e.target.value)}
            className="flex-1 rounded-lg bg-white/5 border border-white/10 px-3 py-1 text-xs text-white focus:outline-none"
          />
          <button
            onClick={addPerson}
            className="rounded-lg bg-cyan-glow px-3 py-1 text-xs font-semibold text-slate-950 hover:bg-cyan-300"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

/* 4. Live Kanban Project Manager Sandbox */
export function KanbanSandbox() {
  const [tasks, setTasks] = useState(() =>
    getCookie("demo_kanban", [
      { id: 1, title: "Design Spring Boot JPA Schema", col: "done", tag: "Backend" },
      { id: 2, title: "Build React Virtual DOM DataGrid", col: "review", tag: "Frontend" },
      { id: 3, title: "Implement Cookie High Score Vault", col: "progress", tag: "Full-Stack" },
      { id: 4, title: "Benchmark MySQL Index Execution", col: "backlog", tag: "Database" },
    ])
  );
  const [newTitle, setNewTitle] = useState("");

  const moveTask = (id, direction) => {
    playClickSound();
    const cols = ["backlog", "progress", "review", "done"];
    setTasks(
      tasks.map((t) => {
        if (t.id === id) {
          const idx = cols.indexOf(t.col);
          const nextIdx = Math.max(0, Math.min(cols.length - 1, idx + direction));
          return { ...t, col: cols[nextIdx] };
        }
        return t;
      })
    );
  };

  const addTask = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    playClickSound();
    setTasks([
      ...tasks,
      { id: Date.now(), title: newTitle.trim(), col: "backlog", tag: "Task" },
    ]);
    setNewTitle("");
  };

  const columns = [
    { key: "backlog", label: "Backlog" },
    { key: "progress", label: "In Progress" },
    { key: "review", label: "Review" },
    { key: "done", label: "Completed" },
  ];

  return (
    <div className="space-y-3 text-xs">
      <form onSubmit={addTask} className="flex gap-2">
        <input
          type="text"
          placeholder="New sprint task..."
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          className="flex-1 rounded-lg bg-white/5 border border-white/10 px-3 py-1 text-xs text-white focus:outline-none"
        />
        <button
          type="submit"
          className="rounded-lg bg-cyan-glow px-3 py-1 font-semibold text-slate-950 hover:bg-cyan-300"
        >
          Add Task
        </button>
      </form>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {columns.map((col) => {
          const colTasks = tasks.filter((t) => t.col === col.key);
          return (
            <div key={col.key} className="rounded-xl bg-[#060814] p-2.5 border border-white/10">
              <div className="flex items-center justify-between font-mono text-[10px] text-muted mb-2 uppercase">
                <span>{col.label}</span>
                <span className="rounded-full bg-white/10 px-1.5">{colTasks.length}</span>
              </div>
              <div className="space-y-1.5 min-h-[120px]">
                {colTasks.map((t) => (
                  <div
                    key={t.id}
                    className="rounded-lg bg-white/[0.05] p-2 border border-white/5 hover:border-cyan-glow/40 transition-colors"
                  >
                    <div className="font-medium text-slate-200 text-[11px] mb-1">{t.title}</div>
                    <div className="flex items-center justify-between">
                      <span className="rounded bg-violet-500/20 text-violet-300 px-1 text-[9px]">
                        {t.tag}
                      </span>
                      <div className="flex gap-1 text-[10px]">
                        <button
                          onClick={() => moveTask(t.id, -1)}
                          className="hover:text-cyan-300 p-0.5 text-muted"
                          title="Move left"
                        >
                          ◀
                        </button>
                        <button
                          onClick={() => moveTask(t.id, 1)}
                          className="hover:text-cyan-300 p-0.5 text-muted"
                          title="Move right"
                        >
                          ▶
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* 5. Live SQL Practice Platform Sandbox */
export function SqlSandbox() {
  const [query, setQuery] = useState("SELECT name, department, gpa FROM students WHERE gpa >= 8.5;");
  const [results, setResults] = useState([
    { name: "Tejas Karambe", department: "Computer Applications", gpa: 9.14 },
    { name: "Rohan Patil", department: "Computer Science", gpa: 8.8 },
  ]);
  const [activeTable, setActiveTable] = useState("students");

  const runQuery = () => {
    playClickSound();
    if (query.toLowerCase().includes("students")) {
      playSuccessSound();
      setResults([
        { name: "Tejas Karambe", department: "Computer Applications", gpa: 9.14 },
        { name: "Aarav Sharma", department: "Information Tech", gpa: 8.9 },
        { name: "Sneha Deshmukh", department: "Data Science", gpa: 9.05 },
      ]);
    } else {
      setResults([
        { dept_id: "D1", name: "Engineering & IT", head: "Dr. Patil", budget: "$150,000" },
        { dept_id: "D2", name: "Computer Applications", head: "Prof. Kulkarni", budget: "$120,000" },
      ]);
    }
  };

  return (
    <div className="space-y-3 text-xs font-mono">
      <div className="flex gap-2">
        {["SELECT * FROM students;", "SELECT * FROM departments;", "SELECT name, gpa FROM students WHERE gpa > 8.5;"].map((q) => (
          <button
            key={q}
            onClick={() => setQuery(q)}
            className="rounded bg-white/5 border border-white/10 px-2 py-0.5 text-[10px] text-muted hover:text-cyan-300 transition-colors"
          >
            {q.slice(0, 24)}...
          </button>
        ))}
      </div>

      <div className="rounded-xl bg-[#060814] p-3 border border-white/10">
        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          rows={3}
          className="w-full bg-transparent text-cyan-300 focus:outline-none resize-none font-mono"
        />
        <div className="flex justify-between items-center pt-2 border-t border-white/10">
          <span className="text-[10px] text-muted">Database: sdc_erp_production (MySQL)</span>
          <button
            onClick={runQuery}
            className="rounded-lg bg-emerald-400 px-3 py-1 font-bold text-slate-950 hover:bg-emerald-300 flex items-center gap-1"
          >
            <Play className="h-3 w-3 fill-slate-950" /> Execute SQL
          </button>
        </div>
      </div>

      {/* Query Results Table */}
      <div className="rounded-xl border border-white/10 overflow-hidden">
        <div className="bg-[#0B0F22] px-3 py-1.5 text-[10px] text-muted flex justify-between">
          <span>QUERY RESULT ({results.length} rows)</span>
          <span>Latency: 4ms</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-white/5 text-[10px] text-slate-300">
              <tr>
                {Object.keys(results[0] || {}).map((col) => (
                  <th key={col} className="p-2 uppercase font-mono">{col}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-[11px] text-slate-200">
              {results.map((row, i) => (
                <tr key={i} className="hover:bg-white/[0.02]">
                  {Object.values(row).map((val, j) => (
                    <td key={j} className="p-2 font-mono">{String(val)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* 6. Live Technical Interview Quiz Sandbox */
export function InterviewSandbox() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const questions = [
    {
      q: "In Java Spring Boot, what is the default bean scope in the ApplicationContext?",
      options: ["Prototype", "Singleton", "Request", "Session"],
      correct: 1,
      expl: "Singleton is the default scope. A single shared instance is managed per Spring IoC container.",
    },
    {
      q: "Which React hook should be used to avoid unnecessary recalculations of expensive operations?",
      options: ["useCallback", "useMemo", "useRef", "useEffect"],
      correct: 1,
      expl: "useMemo caches the calculated value between re-renders until specified dependencies change.",
    },
    {
      q: "What index type does MySQL InnoDB use by default for Primary Key columns?",
      options: ["Hash Index", "B+ Tree Clustered Index", "Full-Text Index", "Bitmap Index"],
      correct: 1,
      expl: "InnoDB stores tables in a clustered index organized as a B+ Tree based on the primary key.",
    },
  ];

  const q = questions[currentIdx];

  const handleSelect = (idx) => {
    if (showAnswer) return;
    playClickSound();
    setSelected(idx);
    setShowAnswer(true);
    if (idx === q.correct) {
      setScore((s) => s + 1);
      playSuccessSound();
    } else {
      playBeepSound(260, 0.05);
    }
  };

  const nextQ = () => {
    setSelected(null);
    setShowAnswer(false);
    setCurrentIdx((prev) => (prev + 1) % questions.length);
  };

  return (
    <div className="space-y-4 text-xs">
      <div className="flex justify-between items-center text-muted font-mono text-[11px]">
        <span>Question {currentIdx + 1} of {questions.length}</span>
        <span className="rounded bg-violet-500/20 text-violet-300 px-2 py-0.5">
          Score: {score}
        </span>
      </div>

      <div className="rounded-xl bg-white/[0.04] p-3.5 border border-white/10">
        <h4 className="font-semibold text-white text-sm leading-relaxed mb-3">
          {q.q}
        </h4>
        <div className="space-y-2">
          {q.options.map((opt, i) => {
            let style = "bg-white/[0.04] border-white/10 hover:border-white/20 text-slate-200";
            if (showAnswer) {
              if (i === q.correct) style = "bg-emerald-500/20 border-emerald-500/50 text-emerald-300 font-bold";
              else if (selected === i) style = "bg-rose-500/20 border-rose-500/50 text-rose-300";
            }
            return (
              <button
                key={opt}
                onClick={() => handleSelect(i)}
                className={`w-full rounded-lg border p-2.5 text-left text-xs transition-all ${style}`}
              >
                <span className="font-mono text-muted mr-2">{String.fromCharCode(65 + i)}.</span>
                {opt}
              </button>
            );
          })}
        </div>
      </div>

      {showAnswer && (
        <div className="rounded-xl bg-cyan-950/40 border border-cyan-glow/30 p-3 text-cyan-200 text-xs flex justify-between items-center">
          <div>
            <span className="font-bold text-white">Explanation: </span>
            {q.expl}
          </div>
          <button
            onClick={nextQ}
            className="shrink-0 ml-3 rounded-lg bg-cyan-glow px-3 py-1 font-semibold text-slate-950 hover:bg-cyan-300"
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
}

/* 7. Live Productivity / Pomodoro Sandbox */
export function ProductivitySandbox() {
  const [secondsLeft, setSecondsLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [focusTasks, setFocusTasks] = useState([
    { id: 1, text: "Review ERP Database Migrations", done: true },
    { id: 2, text: "Optimize React Table Render Loop", done: false },
    { id: 3, text: "Write Unit Test for Student Service", done: false },
  ]);

  useEffect(() => {
    let interval = null;
    if (isActive && secondsLeft > 0) {
      interval = setInterval(() => setSecondsLeft((s) => s - 1), 1000);
    } else if (secondsLeft === 0) {
      playSuccessSound();
      setIsActive(false);
    }
    return () => clearInterval(interval);
  }, [isActive, secondsLeft]);

  const toggleTimer = () => {
    playClickSound();
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    playClickSound();
    setIsActive(false);
    setSecondsLeft(25 * 60);
  };

  const toggleTask = (id) => {
    playClickSound();
    setFocusTasks(focusTasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  };

  const mins = Math.floor(secondsLeft / 60);
  const secs = secondsLeft % 60;

  return (
    <div className="space-y-4 text-xs">
      <div className="rounded-xl bg-gradient-to-br from-violet-950/40 to-slate-900 border border-white/10 p-4 text-center">
        <div className="text-muted text-[11px] font-mono mb-1">POMODORO DEEP FOCUS</div>
        <div className="text-4xl font-mono font-bold text-white tracking-widest my-2">
          {String(mins).padStart(2, "0")}:{String(secs).padStart(2, "0")}
        </div>
        <div className="flex justify-center gap-2 mt-3">
          <button
            onClick={toggleTimer}
            className="rounded-full bg-cyan-glow px-4 py-1.5 text-xs font-semibold text-slate-950 hover:bg-cyan-300"
          >
            {isActive ? "Pause" : "Start Focus"}
          </button>
          <button
            onClick={resetTimer}
            className="rounded-full border border-white/20 bg-white/5 px-3 py-1.5 text-xs text-white hover:bg-white/10"
          >
            <RotateCcw className="h-3 w-3" />
          </button>
        </div>
      </div>

      <div className="space-y-1.5">
        <div className="text-[11px] text-muted font-mono">SPRINT FOCUS TASKS</div>
        {focusTasks.map((task) => (
          <div
            key={task.id}
            onClick={() => toggleTask(task.id)}
            className="flex items-center gap-2.5 rounded-lg bg-white/[0.04] p-2 cursor-pointer border border-white/5 hover:border-white/15"
          >
            <div className={`h-4 w-4 rounded flex items-center justify-center border ${task.done ? "bg-cyan-500 border-cyan-400 text-slate-950" : "border-white/20"}`}>
              {task.done && <Check className="h-3 w-3 stroke-[3]" />}
            </div>
            <span className={`text-xs ${task.done ? "line-through text-muted" : "text-slate-200"}`}>
              {task.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
