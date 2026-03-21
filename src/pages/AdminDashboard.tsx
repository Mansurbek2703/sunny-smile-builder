import { useState, useEffect, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, CartesianGrid, Legend } from "recharts";
import { Users, FileText, Activity, TrendingUp, Download, LogOut, Search, ChevronLeft, ChevronRight, Eye } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import * as XLSX from "xlsx";

interface Respondent {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  father_name: string | null;
  course_direction: string;
  university: string;
  registered_at: string;
}

interface Response {
  id: string;
  respondent_id: string;
  quest_number: number;
  step_id: string;
  task_id: string;
  task_type: string;
  answer_data: any;
  is_correct: boolean | null;
  created_at: string;
}

interface ActivityEntry {
  id: string;
  respondent_id: string;
  quest_number: number;
  step_id: string | null;
  action: string;
  duration_seconds: number | null;
  created_at: string;
}

const COLORS = ["#6366f1", "#22c55e", "#f59e0b", "#ef4444", "#8b5cf6", "#06b6d4", "#ec4899"];

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [respondents, setRespondents] = useState<Respondent[]>([]);
  const [responses, setResponses] = useState<Response[]>([]);
  const [activity, setActivity] = useState<ActivityEntry[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [searchText, setSearchText] = useState("");
  const [filterUniversity, setFilterUniversity] = useState("all");
  const [filterCourse, setFilterCourse] = useState("all");
  const [filterQuest, setFilterQuest] = useState("all");

  // Pagination
  const [page, setPage] = useState(0);
  const PAGE_SIZE = 15;

  // Detail modal
  const [selectedRespondent, setSelectedRespondent] = useState<Respondent | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (!token) { navigate("/admin"); return; }
    try {
      const payload = JSON.parse(atob(token.split(".")[0]));
      if (payload.exp < Date.now()) { localStorage.removeItem("admin_token"); navigate("/admin"); return; }
    } catch { navigate("/admin"); return; }
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    const [r1, r2, r3] = await Promise.all([
      supabase.from("respondents").select("*").order("registered_at", { ascending: false }),
      supabase.from("responses").select("*"),
      supabase.from("activity_log").select("*"),
    ]);
    setRespondents((r1.data as Respondent[]) || []);
    setResponses((r2.data as Response[]) || []);
    setActivity((r3.data as ActivityEntry[]) || []);
    setLoading(false);
  };

  const logout = () => { localStorage.removeItem("admin_token"); navigate("/admin"); };

  const universities = useMemo(() => [...new Set(respondents.map(r => r.university))].sort(), [respondents]);
  const courses = useMemo(() => [...new Set(respondents.map(r => r.course_direction))].sort(), [respondents]);

  const filtered = useMemo(() => {
    return respondents.filter(r => {
      if (searchText && !`${r.first_name} ${r.last_name} ${r.email}`.toLowerCase().includes(searchText.toLowerCase())) return false;
      if (filterUniversity !== "all" && r.university !== filterUniversity) return false;
      if (filterCourse !== "all" && r.course_direction !== filterCourse) return false;
      if (filterQuest !== "all") {
        const qn = parseInt(filterQuest);
        const hasQuest = responses.some(resp => resp.respondent_id === r.id && resp.quest_number === qn) ||
                         activity.some(a => a.respondent_id === r.id && a.quest_number === qn);
        if (!hasQuest) return false;
      }
      return true;
    });
  }, [respondents, searchText, filterUniversity, filterCourse, filterQuest, responses, activity]);

  const paged = filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);

  const questParticipation = useMemo(() => {
    const map: Record<number, Set<string>> = {};
    for (let i = 1; i <= 7; i++) map[i] = new Set();
    activity.filter(a => a.action === "quest_started").forEach(a => map[a.quest_number]?.add(a.respondent_id));
    return Object.entries(map).map(([k, v]) => ({ quest: `Quest ${k}`, count: v.size }));
  }, [activity]);

  const universityDistribution = useMemo(() => {
    const map: Record<string, number> = {};
    respondents.forEach(r => { map[r.university] = (map[r.university] || 0) + 1; });
    return Object.entries(map).map(([name, value]) => ({ name: name.length > 20 ? name.slice(0, 20) + "…" : name, value, fullName: name }));
  }, [respondents]);

  const dailyRegistrations = useMemo(() => {
    const map: Record<string, number> = {};
    respondents.forEach(r => {
      const day = r.registered_at.slice(0, 10);
      map[day] = (map[day] || 0) + 1;
    });
    return Object.entries(map).sort().map(([date, count]) => ({ date, count }));
  }, [respondents]);

  const correctnessData = useMemo(() => {
    const map: Record<number, { correct: number; incorrect: number }> = {};
    for (let i = 1; i <= 7; i++) map[i] = { correct: 0, incorrect: 0 };
    responses.forEach(r => {
      if (r.is_correct === true) map[r.quest_number] = { ...map[r.quest_number], correct: (map[r.quest_number]?.correct || 0) + 1 };
      else if (r.is_correct === false) map[r.quest_number] = { ...map[r.quest_number], incorrect: (map[r.quest_number]?.incorrect || 0) + 1 };
    });
    return Object.entries(map).map(([k, v]) => ({ quest: `Quest ${k}`, ...v }));
  }, [responses]);

  const getRespondentQuestCount = useCallback((id: string) => {
    const quests = new Set<number>();
    activity.filter(a => a.respondent_id === id && a.action === "quest_started").forEach(a => quests.add(a.quest_number));
    return quests.size;
  }, [activity]);

  const exportExcel = useCallback((data: Respondent[], filename: string) => {
    const rows = data.flatMap(r => {
      const rResponses = responses.filter(resp => resp.respondent_id === r.id);
      if (rResponses.length === 0) {
        return [{
          Familiya: r.last_name, Ism: r.first_name, "Otasining ismi": r.father_name || "",
          Email: r.email, Universitet: r.university, "Kurs/Yo'nalish": r.course_direction,
          "Ro'yxatdan o'tgan": r.registered_at.slice(0, 16).replace("T", " "),
          "Quest №": "", Qadam: "", Topshiriq: "", "Topshiriq turi": "",
          "Javob": "", "To'g'ri/Noto'g'ri": "", "Vaqt": ""
        }];
      }
      return rResponses.map(resp => ({
        Familiya: r.last_name, Ism: r.first_name, "Otasining ismi": r.father_name || "",
        Email: r.email, Universitet: r.university, "Kurs/Yo'nalish": r.course_direction,
        "Ro'yxatdan o'tgan": r.registered_at.slice(0, 16).replace("T", " "),
        "Quest №": String(resp.quest_number), Qadam: resp.step_id, Topshiriq: resp.task_id,
        "Topshiriq turi": resp.task_type,
        "Javob": typeof resp.answer_data === "object" ? JSON.stringify(resp.answer_data) : String(resp.answer_data),
        "To'g'ri/Noto'g'ri": resp.is_correct === null ? "" : resp.is_correct ? "To'g'ri" : "Noto'g'ri",
        "Vaqt": resp.created_at.slice(0, 16).replace("T", " ")
      }));
    });
    const ws = XLSX.utils.json_to_sheet(rows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Respondentlar");
    XLSX.writeFile(wb, filename);
  }, [responses]);

  const respondentResponses = useMemo(() => {
    if (!selectedRespondent) return [];
    return responses.filter(r => r.respondent_id === selectedRespondent.id).sort((a, b) => a.created_at.localeCompare(b.created_at));
  }, [selectedRespondent, responses]);

  const respondentActivity = useMemo(() => {
    if (!selectedRespondent) return [];
    return activity.filter(a => a.respondent_id === selectedRespondent.id).sort((a, b) => a.created_at.localeCompare(b.created_at));
  }, [selectedRespondent, activity]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-blue-950">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-400" />
    </div>
  );

  return (
    <div className="min-h-screen bg-blue-950 text-white">
      {/* Header */}
      <header className="bg-blue-900/90 border-b border-blue-800 px-4 py-3 flex items-center justify-between sticky top-0 z-50 backdrop-blur">
        <div className="flex items-center gap-3">
          <img src="/images/webquest6/aysek_logo.webp" alt="AYSEK Logo" className="h-9 w-auto" />
          <h1 className="text-lg font-bold text-white">📊 Admin Dashboard</h1>
        </div>
        <div className="flex gap-2 items-center">
          <Button size="sm" onClick={() => exportExcel(filtered, "respondentlar_filtered.xlsx")} className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm px-3">
            <Download className="w-4 h-4 mr-1.5" /> Filtrlangan ({filtered.length})
          </Button>
          <Button size="sm" onClick={() => exportExcel(respondents, "respondentlar_all.xlsx")} className="bg-cyan-600 hover:bg-cyan-700 text-white font-medium text-sm px-3">
            <Download className="w-4 h-4 mr-1.5" /> Barchasi ({respondents.length})
          </Button>
          <Button size="sm" variant="ghost" onClick={logout} className="text-gray-300 hover:text-white">
            <LogOut className="w-4 h-4" />
          </Button>
        </div>
      </header>

      <div className="p-4 space-y-6 max-w-7xl mx-auto">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { icon: Users, label: "Respondentlar", value: respondents.length, color: "text-indigo-400" },
            { icon: FileText, label: "Javoblar", value: responses.length, color: "text-green-400" },
            { icon: Activity, label: "Faollik yozuvlari", value: activity.length, color: "text-amber-400" },
            { icon: TrendingUp, label: "Eng faol Quest", value: questParticipation.reduce((a, b) => b.count > a.count ? b : a, { quest: "-", count: 0 }).quest, color: "text-cyan-400" },
          ].map((s, i) => (
            <Card key={i} className="bg-blue-900/60 border-blue-800">
              <CardContent className="p-4 flex items-center gap-3">
                <s.icon className={`w-8 h-8 ${s.color}`} />
                <div>
                  <p className="text-2xl font-bold text-white">{s.value}</p>
                  <p className="text-xs text-gray-300">{s.label}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts */}
        <div className="grid md:grid-cols-2 gap-4">
          <Card className="bg-blue-900/60 border-blue-800">
            <CardHeader className="pb-2"><CardTitle className="text-sm text-cyan-300">Quest bo'yicha ishtirok</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={questParticipation}>
                  <XAxis dataKey="quest" tick={{ fill: "#cbd5e1", fontSize: 12 }} />
                  <YAxis tick={{ fill: "#cbd5e1", fontSize: 12 }} />
                  <Tooltip contentStyle={{ background: "#1e3a5f", border: "1px solid #2563eb", color: "#fff" }} />
                  <Bar dataKey="count" fill="#6366f1" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="bg-blue-900/60 border-blue-800">
            <CardHeader className="pb-2"><CardTitle className="text-sm text-cyan-300">Universitetlar taqsimoti</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie data={universityDistribution} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                    {universityDistribution.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                  </Pie>
                  <Tooltip contentStyle={{ background: "#1e3a5f", border: "1px solid #2563eb", color: "#fff" }} />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="bg-blue-900/60 border-blue-800">
            <CardHeader className="pb-2"><CardTitle className="text-sm text-cyan-300">Kunlik ro'yxatga olish</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={dailyRegistrations}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e40af" />
                  <XAxis dataKey="date" tick={{ fill: "#cbd5e1", fontSize: 10 }} />
                  <YAxis tick={{ fill: "#cbd5e1", fontSize: 12 }} />
                  <Tooltip contentStyle={{ background: "#1e3a5f", border: "1px solid #2563eb", color: "#fff" }} />
                  <Line type="monotone" dataKey="count" stroke="#22c55e" strokeWidth={2} dot={{ r: 3, fill: "#22c55e" }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="bg-blue-900/60 border-blue-800">
            <CardHeader className="pb-2"><CardTitle className="text-sm text-cyan-300">To'g'ri / Noto'g'ri javoblar</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={correctnessData}>
                  <XAxis dataKey="quest" tick={{ fill: "#cbd5e1", fontSize: 12 }} />
                  <YAxis tick={{ fill: "#cbd5e1", fontSize: 12 }} />
                  <Tooltip contentStyle={{ background: "#1e3a5f", border: "1px solid #2563eb", color: "#fff" }} />
                  <Legend wrapperStyle={{ color: "#cbd5e1" }} />
                  <Bar dataKey="correct" fill="#22c55e" name="To'g'ri" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="incorrect" fill="#ef4444" name="Noto'g'ri" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="bg-blue-900/60 border-blue-800">
          <CardContent className="p-4">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              <div className="col-span-2 md:col-span-1 relative">
                <Search className="absolute left-2 top-2.5 w-4 h-4 text-gray-400" />
                <Input value={searchText} onChange={(e) => { setSearchText(e.target.value); setPage(0); }} placeholder="Ism, email..." className="pl-8 bg-blue-900 border-blue-700 text-white text-sm placeholder:text-gray-400" />
              </div>
              <Select value={filterUniversity} onValueChange={(v) => { setFilterUniversity(v); setPage(0); }}>
                <SelectTrigger className="bg-blue-900 border-blue-700 text-white text-sm"><SelectValue placeholder="Universitet" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Barcha universitetlar</SelectItem>
                  {universities.map(u => <SelectItem key={u} value={u}>{u}</SelectItem>)}
                </SelectContent>
              </Select>
              <Select value={filterCourse} onValueChange={(v) => { setFilterCourse(v); setPage(0); }}>
                <SelectTrigger className="bg-blue-900 border-blue-700 text-white text-sm"><SelectValue placeholder="Kurs" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Barcha kurslar</SelectItem>
                  {courses.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                </SelectContent>
              </Select>
              <Select value={filterQuest} onValueChange={(v) => { setFilterQuest(v); setPage(0); }}>
                <SelectTrigger className="bg-blue-900 border-blue-700 text-white text-sm"><SelectValue placeholder="Quest" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Barcha questlar</SelectItem>
                  {[1, 2, 3, 4, 5, 6, 7].map(n => <SelectItem key={n} value={String(n)}>Quest {n}</SelectItem>)}
                </SelectContent>
              </Select>
              <Button size="sm" variant="outline" onClick={() => { setSearchText(""); setFilterUniversity("all"); setFilterCourse("all"); setFilterQuest("all"); setPage(0); }} className="text-white border-blue-700 hover:bg-blue-800 text-sm">
                Tozalash
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Respondents Table */}
        <Card className="bg-blue-900/60 border-blue-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-cyan-300">Respondentlar ({filtered.length})</CardTitle>
          </CardHeader>
          <CardContent className="overflow-x-auto p-0">
            <Table>
              <TableHeader>
                <TableRow className="border-blue-800 hover:bg-transparent">
                  <TableHead className="text-cyan-300 text-xs">#</TableHead>
                  <TableHead className="text-cyan-300 text-xs">Ism Familiya</TableHead>
                  <TableHead className="text-cyan-300 text-xs">Email</TableHead>
                  <TableHead className="text-cyan-300 text-xs">Universitet</TableHead>
                  <TableHead className="text-cyan-300 text-xs">Kurs</TableHead>
                  <TableHead className="text-cyan-300 text-xs">Sana</TableHead>
                  <TableHead className="text-cyan-300 text-xs">Questlar</TableHead>
                  <TableHead className="text-cyan-300 text-xs"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paged.map((r, i) => (
                  <TableRow key={r.id} className="border-blue-800 hover:bg-blue-800/50 cursor-pointer" onClick={() => setSelectedRespondent(r)}>
                    <TableCell className="text-gray-300 text-sm">{page * PAGE_SIZE + i + 1}</TableCell>
                    <TableCell className="text-white text-sm font-medium">{r.last_name} {r.first_name}</TableCell>
                    <TableCell className="text-gray-200 text-sm">{r.email}</TableCell>
                    <TableCell className="text-gray-200 text-sm max-w-[150px] truncate">{r.university}</TableCell>
                    <TableCell className="text-gray-200 text-sm">{r.course_direction}</TableCell>
                    <TableCell className="text-gray-300 text-sm">{r.registered_at.slice(0, 10)}</TableCell>
                    <TableCell className="text-gray-200 text-sm text-center">{getRespondentQuestCount(r.id)}</TableCell>
                    <TableCell><Eye className="w-4 h-4 text-cyan-400" /></TableCell>
                  </TableRow>
                ))}
                {paged.length === 0 && (
                  <TableRow><TableCell colSpan={8} className="text-center text-gray-400 py-8">Ma'lumot topilmadi</TableCell></TableRow>
                )}
              </TableBody>
            </Table>
            {totalPages > 1 && (
              <div className="flex items-center justify-between px-4 py-3 border-t border-blue-800">
                <span className="text-xs text-gray-400">{page * PAGE_SIZE + 1}–{Math.min((page + 1) * PAGE_SIZE, filtered.length)} / {filtered.length}</span>
                <div className="flex gap-1">
                  <Button size="sm" variant="ghost" disabled={page === 0} onClick={() => setPage(p => p - 1)} className="text-gray-300"><ChevronLeft className="w-4 h-4" /></Button>
                  <Button size="sm" variant="ghost" disabled={page >= totalPages - 1} onClick={() => setPage(p => p + 1)} className="text-gray-300"><ChevronRight className="w-4 h-4" /></Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Detail Modal */}
      <Dialog open={!!selectedRespondent} onOpenChange={() => setSelectedRespondent(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto bg-blue-900 border-blue-800 text-white">
          {selectedRespondent && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedRespondent.last_name} {selectedRespondent.first_name} {selectedRespondent.father_name || ""}</DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <p className="text-gray-300">Email: <span className="text-white">{selectedRespondent.email}</span></p>
                <p className="text-gray-300">Universitet: <span className="text-white">{selectedRespondent.university}</span></p>
                <p className="text-gray-300">Kurs: <span className="text-white">{selectedRespondent.course_direction}</span></p>
                <p className="text-gray-300">Sana: <span className="text-white">{selectedRespondent.registered_at.slice(0, 16).replace("T", " ")}</span></p>
              </div>

              <h4 className="font-semibold mt-4 mb-2 text-sm text-cyan-300">Javoblar ({respondentResponses.length})</h4>
              {respondentResponses.length > 0 ? (
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {respondentResponses.map(r => (
                    <div key={r.id} className="p-2 rounded bg-blue-800/50 text-xs">
                      <div className="flex justify-between mb-1">
                        <span className="font-medium text-indigo-300">Quest {r.quest_number} / {r.step_id}</span>
                        <span className={r.is_correct === true ? "text-green-400" : r.is_correct === false ? "text-red-400" : "text-gray-400"}>
                          {r.is_correct === true ? "✓ To'g'ri" : r.is_correct === false ? "✗ Noto'g'ri" : "—"}
                        </span>
                      </div>
                      <p className="text-gray-300">Turi: {r.task_type} | ID: {r.task_id}</p>
                      <p className="text-gray-200 break-all">{typeof r.answer_data === "object" ? JSON.stringify(r.answer_data) : String(r.answer_data)}</p>
                    </div>
                  ))}
                </div>
              ) : <p className="text-gray-400 text-sm">Javoblar topilmadi</p>}

              <h4 className="font-semibold mt-4 mb-2 text-sm text-cyan-300">Faollik logi ({respondentActivity.length})</h4>
              {respondentActivity.length > 0 ? (
                <div className="space-y-1 max-h-40 overflow-y-auto">
                  {respondentActivity.map(a => (
                    <div key={a.id} className="flex justify-between text-xs p-1.5 rounded bg-blue-800/30">
                      <span className="text-gray-200">Quest {a.quest_number} / {a.step_id} — <span className="text-amber-400">{a.action}</span></span>
                      <span className="text-gray-400">{a.duration_seconds ? `${a.duration_seconds}s` : ""} {a.created_at.slice(11, 16)}</span>
                    </div>
                  ))}
                </div>
              ) : <p className="text-gray-400 text-sm">Faollik topilmadi</p>}
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminDashboard;
