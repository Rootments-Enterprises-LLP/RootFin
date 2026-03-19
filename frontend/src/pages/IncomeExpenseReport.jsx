import { useState, useCallback } from "react";
import { ChevronDown, ChevronUp, RefreshCw } from "lucide-react";
import baseUrl from "../api/api";

const fmt = (n) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", minimumFractionDigits: 2 }).format(n || 0);

const today = () => new Date().toISOString().slice(0, 10);
const firstOfMonth = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-01`;
};

const TYPE_ALL = "All Type";
const TYPE_INCOME = "Income";
const TYPE_EXPENSE = "Expense";

export default function IncomeExpenseReport() {
  const user = JSON.parse(localStorage.getItem("rootfinuser")) || {};
  const isAdmin = (user.power || "").toLowerCase() === "admin";

  const [fromDate, setFromDate] = useState(firstOfMonth());
  const [toDate, setToDate] = useState(today());
  const [filterCategory, setFilterCategory] = useState("All Categories");
  const [filterType, setFilterType] = useState(TYPE_ALL);
  const [selectedStore, setSelectedStore] = useState("all");

  const [rows, setRows] = useState([]);
  const [openingBalance, setOpeningBalance] = useState(0);
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState({});

  const STORE_LIST = [
    { locName: "G-Edappal",        locCode: "707" },
    { locName: "G-Edappally",      locCode: "702" },
    { locName: "G-Kalpetta",       locCode: "717" },
    { locName: "G-Kannur",         locCode: "716" },
    { locName: "G-Kottakkal",      locCode: "711" },
    { locName: "G-Kottayam",       locCode: "701" },
    { locName: "G-Manjeri",        locCode: "710" },
    { locName: "G-Mg Road",        locCode: "718" },
    { locName: "G-Palakkad",       locCode: "705" },
    { locName: "G-Perinthalmanna", locCode: "709" },
    { locName: "G-Perumbavoor",    locCode: "703" },
    { locName: "G-Thrissur",       locCode: "704" },
    { locName: "G-Vadakara",       locCode: "708" },
    { locName: "G-Chavakkad",      locCode: "706" },
    { locName: "G-Calicut",        locCode: "712" },
    { locName: "HEAD OFFICE01",    locCode: "759" },
    { locName: "Office",           locCode: "102" },
    { locName: "Production",       locCode: "101" },
    { locName: "SG-Trivandrum",    locCode: "700" },
    { locName: "Warehouse",        locCode: "858" },
    { locName: "WAREHOUSE",        locCode: "103" },
    { locName: "Z-Edappal",        locCode: "100" },
    { locName: "Z-Edapally",       locCode: "144" },
    { locName: "Z-Kottakkal",      locCode: "122" },
    { locName: "Z-Perinthalmanna", locCode: "133" },
  ];

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const API = baseUrl?.baseUrl?.replace(/\/$/, "") || "http://localhost:7000";
      // Admin can select a specific store or "all"; non-admin always uses their locCode
      const locCode = isAdmin ? selectedStore : (user.locCode || "");
      const res = await fetch(
        `${API}/user/Getpayment?LocCode=${locCode}&DateFrom=${fromDate}&DateTo=${toDate}`
      );
      const json = await res.json();
      const txns = Array.isArray(json) ? json : json.data || [];

      // Only income / expense transactions, exclude invoice-created ones (INV-, RTN-, RET-)
      const filtered = txns.filter((t) => {
        const tp = (t.type || "").toLowerCase();
        if (tp !== "income" && tp !== "expense") return false;
        const inv = (t.invoiceNo || "").toUpperCase();
        if (inv.startsWith("INV-") || inv.startsWith("RTN-") || inv.startsWith("RET-")) return false;
        return true;
      });

      setRows(filtered);
      setExpanded({});

      // Opening balance: sum of all income/expense up to the day BEFORE fromDate
      // const dayBefore = new Date(fromDate);
      // dayBefore.setDate(dayBefore.getDate() - 1);
      // const dayBeforeStr = dayBefore.toISOString().slice(0, 10);
      // const obRes = await fetch(
      //   `${API}/user/Getpayment?LocCode=${locCode}&DateFrom=2000-01-01&DateTo=${dayBeforeStr}`
      // ).catch(() => null);
      // if (obRes && obRes.ok) {
      //   const obJson = await obRes.json();
      //   const obTxns = Array.isArray(obJson) ? obJson : obJson.data || [];
      //   const ob = obTxns.reduce((s, t) => {
      //     const tp = (t.type || "").toLowerCase();
      //     if (tp !== "income" && tp !== "expense") return s;
      //     return s + (parseFloat(t.cash) || 0) + (parseFloat(t.bank) || 0) + (parseFloat(t.upi) || 0);
      //   }, 0);
      //   setOpeningBalance(ob);
      // }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [fromDate, toDate, selectedStore, isAdmin, user.locCode]);

  // Group rows by category
  const grouped = (() => {
    const map = {};
    rows.forEach((t) => {
      const tp = (t.type || "").toLowerCase();
      const isIncome = tp === "income";
      const typeLabel = isIncome ? TYPE_INCOME : TYPE_EXPENSE;

      if (filterType !== TYPE_ALL && filterType !== typeLabel) return;

      const cat = t.category || "Uncategorized";
      if (filterCategory !== "All Categories" && filterCategory !== cat) return;

      if (!map[cat]) map[cat] = { type: typeLabel, transactions: [], cash: 0, bank: 0, upi: 0 };
      map[cat].transactions.push(t);
      map[cat].cash += parseFloat(t.cash) || 0;
      map[cat].bank += parseFloat(t.bank) || 0;
      map[cat].upi += parseFloat(t.upi) || 0;
    });
    return map;
  })();

  const categories = Object.keys(grouped);

  // Net totals
  const netCash = categories.reduce((s, c) => s + grouped[c].cash, 0);
  const netBank = categories.reduce((s, c) => s + grouped[c].bank, 0);
  const netUpi = categories.reduce((s, c) => s + grouped[c].upi, 0);
  const netTotal = netCash + netBank + netUpi;

  const allCategories = [...new Set(rows.map((t) => t.category || "Uncategorized"))];

  const toggleExpand = (cat) => setExpanded((p) => ({ ...p, [cat]: !p[cat] }));

  return (
    <div className="ml-64 min-h-screen bg-[#f5f7fb] p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl font-bold text-[#101828] uppercase tracking-wide">Income &amp; Expenses Report</h1>
        <p className="text-sm text-[#6c728a]">Detailed overview of Income &amp; Expense Report</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-[#e6eafb] shadow-sm p-4 mb-5 flex flex-wrap items-end gap-4">
        <div>
          <label className="block text-xs font-semibold text-[#6b7280] uppercase tracking-wider mb-1">From Date</label>
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="rounded-lg border border-[#d9def1] px-3 py-2 text-sm focus:outline-none focus:border-[#2563eb]"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-[#6b7280] uppercase tracking-wider mb-1">To Date</label>
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="rounded-lg border border-[#d9def1] px-3 py-2 text-sm focus:outline-none focus:border-[#2563eb]"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-[#6b7280] uppercase tracking-wider mb-1">Category</label>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="rounded-lg border border-[#d9def1] px-3 py-2 text-sm focus:outline-none focus:border-[#2563eb] min-w-[160px]"
          >
            <option>All Categories</option>
            {allCategories.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-[#6b7280] uppercase tracking-wider mb-1">Income / Expense</label>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="rounded-lg border border-[#d9def1] px-3 py-2 text-sm focus:outline-none focus:border-[#2563eb] min-w-[130px]"
          >
            <option>{TYPE_ALL}</option>
            <option>{TYPE_INCOME}</option>
            <option>{TYPE_EXPENSE}</option>
          </select>
        </div>
        {isAdmin && (
          <div>
            <label className="block text-xs font-semibold text-[#6b7280] uppercase tracking-wider mb-1">Store</label>
            <select
              value={selectedStore}
              onChange={(e) => setSelectedStore(e.target.value)}
              className="rounded-lg border border-[#d9def1] px-3 py-2 text-sm focus:outline-none focus:border-[#2563eb] min-w-[180px]"
            >
              <option value="all">All Stores</option>
              {STORE_LIST.map((s) => (
                <option key={s.locCode} value={s.locCode}>
                  {s.locName}
                </option>
              ))}
            </select>
          </div>
        )}
        <button
          onClick={fetchData}
          disabled={loading}
          className="flex items-center gap-2 rounded-lg bg-[#2563eb] px-5 py-2 text-sm font-semibold text-white hover:bg-[#1d4ed8] disabled:opacity-60"
        >
          {loading ? <RefreshCw size={15} className="animate-spin" /> : null}
          Apply Filter
        </button>
        <button
          onClick={() => { setFromDate(firstOfMonth()); setToDate(today()); setFilterCategory("All Categories"); setFilterType(TYPE_ALL); setSelectedStore("all"); setRows([]); setExpanded({}); }}
          className="rounded-lg border border-[#d9def1] p-2 text-[#6b7280] hover:bg-[#f3f4f6]"
          title="Reset"
        >
          <RefreshCw size={15} />
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-[#e6eafb] shadow-sm overflow-hidden">
        {/* Table header */}
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#e6eafb] bg-[#f8fafc]">
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[#6b7280] w-10"></th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[#6b7280]">Date</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[#6b7280]">Category</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[#6b7280]">Type</th>
              <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-[#6b7280]">Cash</th>
              <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-[#6b7280]">Bank</th>
              <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-[#6b7280]">UPI</th>
              <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-[#6b7280]">Total</th>
            </tr>
          </thead>
          <tbody>
            {/* Opening Balance - hidden */}
            {/* <tr className="bg-[#f1f5f9] border-b border-[#e6eafb]">
              <td colSpan={4} className="px-4 py-3 font-semibold text-[#374151]">OPENING BALANCE</td>
              <td colSpan={4} className="px-4 py-3 text-right font-bold text-[#101828]">{fmt(openingBalance)}</td>
            </tr> */}

            {loading && (
              <tr>
                <td colSpan={8} className="px-4 py-10 text-center text-[#6b7280]">Loading...</td>
              </tr>
            )}

            {!loading && categories.length === 0 && rows.length === 0 && (
              <tr>
                <td colSpan={8} className="px-4 py-10 text-center text-[#6b7280]">
                  Apply a filter to load data.
                </td>
              </tr>
            )}

            {!loading && categories.length === 0 && rows.length > 0 && (
              <tr>
                <td colSpan={8} className="px-4 py-10 text-center text-[#6b7280]">No results match the selected filters.</td>
              </tr>
            )}

            {!loading && categories.map((cat) => {
              const g = grouped[cat];
              const isIncome = g.type === TYPE_INCOME;
              const rowTotal = g.cash + g.bank + g.upi;
              const isExpanded = !!expanded[cat];

              return [
                /* Category summary row */
                <tr
                  key={cat}
                  className="border-b border-[#f0f3ff] hover:bg-[#fafbff] cursor-pointer"
                  onClick={() => toggleExpand(cat)}
                >
                  <td className="px-4 py-3 text-[#6b7280]">
                    {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </td>
                  <td className="px-4 py-3 text-[#6b7280]"></td>
                  <td className="px-4 py-3 font-medium text-[#1f2937]">{cat}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                      isIncome ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"
                    }`}>
                      {g.type.toUpperCase()}
                    </span>
                  </td>
                  <td className={`px-4 py-3 text-right font-medium ${isIncome ? "text-green-600" : "text-red-500"}`}>
                    {g.cash !== 0 ? fmt(g.cash) : "-"}
                  </td>
                  <td className={`px-4 py-3 text-right font-medium ${isIncome ? "text-green-600" : "text-red-500"}`}>
                    {g.bank !== 0 ? fmt(g.bank) : "-"}
                  </td>
                  <td className={`px-4 py-3 text-right font-medium ${isIncome ? "text-green-600" : "text-red-500"}`}>
                    {g.upi !== 0 ? fmt(g.upi) : "-"}
                  </td>
                  <td className={`px-4 py-3 text-right font-semibold ${isIncome ? "text-green-600" : "text-red-500"}`}>
                    {fmt(rowTotal)}
                  </td>
                </tr>,

                /* Sub-rows (individual transactions) */
                ...(isExpanded ? g.transactions.map((t, i) => {
                  const tCash = parseFloat(t.cash) || 0;
                  const tBank = parseFloat(t.bank) || 0;
                  const tUpi = parseFloat(t.upi) || 0;
                  const dateStr = t.date ? new Date(t.date).toLocaleDateString("en-IN", { day: "2-digit", month: "2-digit", year: "numeric" }) : "-";
                  return (
                    <tr key={`${cat}-${i}`} className="bg-[#f8fafc] border-b border-[#f0f3ff]">
                      <td className="px-4 py-2.5"></td>
                      <td className="px-4 py-2.5 text-xs text-[#6b7280]">{dateStr}</td>
                      <td className="px-4 py-2.5 text-sm text-[#374151]">
                        {t.remark || "-"}
                      </td>
                      <td className="px-4 py-2.5"></td>
                      <td className="px-4 py-2.5 text-right text-sm text-[#374151]">{tCash !== 0 ? fmt(tCash) : "-"}</td>
                      <td className="px-4 py-2.5 text-right text-sm text-[#374151]">{tBank !== 0 ? fmt(tBank) : "-"}</td>
                      <td className="px-4 py-2.5 text-right text-sm text-[#374151]">{tUpi !== 0 ? fmt(tUpi) : "-"}</td>
                      <td className="px-4 py-2.5 text-right text-sm text-[#374151]"></td>
                    </tr>
                  );
                }) : [])
              ];
            })}

            {/* Net Total */}
            {!loading && categories.length > 0 && (
              <tr className="border-t-2 border-[#e6eafb] bg-[#f8fafc]">
                <td colSpan={4} className="px-4 py-3 font-bold text-[#101828]">NET TOTAL</td>
                <td className="px-4 py-3 text-right font-semibold text-[#101828]">{fmt(netCash)}</td>
                <td className="px-4 py-3 text-right font-semibold text-[#101828]">{fmt(netBank)}</td>
                <td className="px-4 py-3 text-right font-semibold text-[#101828]">{fmt(netUpi)}</td>
                <td className="px-4 py-3 text-right font-bold text-green-700">{fmt(netTotal)}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
