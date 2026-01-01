'use client';

import { useParams } from 'next/navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { SyncTimer } from '@/components/SyncTimer';
import { Leaderboard } from '@/components/Leaderboard';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Camera, Trophy, Upload, CheckCircle2, Lock, BookOpen } from 'lucide-react';
import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { useToast } from "@/components/ui/use-toast"

const GAMES = {
    'marshmallow': {
        title: 'Marshmallow Challenge',
        pillar: 'Prototipazione Rapida',
        theory: (
            <div className="space-y-6">
                {/* Hero Box */}
                <div className="bg-blue-950/30 p-6 rounded-lg border border-blue-900/50 relative overflow-hidden">
                    <div className="relative z-10">
                        <h4 className="flex items-center gap-3 text-blue-100 font-bold text-lg mb-2">
                            <span className="p-1.5 bg-blue-500/20 rounded text-blue-400">💡</span>
                            Obiettivo
                        </h4>
                        <p className="text-blue-200/80 leading-relaxed">Costruire la struttura autoportante più alta possibile usando spaghetti, nastro adesivo e spago, con un marshmallow in cima.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Agile Concept */}
                    <div className="group bg-green-950/10 p-5 rounded-lg border border-green-900/30 hover:border-green-500/30 transition-all duration-300">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center text-green-500">
                                <CheckCircle2 className="w-4 h-4" />
                            </div>
                            <h4 className="text-green-400 font-bold">Prototipazione (Agile)</h4>
                        </div>
                        <p className="text-sm text-neutral-400 leading-relaxed">
                            I bambini dell'asilo vincono perché <strong>prototipano</strong> subito. Falliscono velocemente e imparano, costruendo una struttura stabile passo dopo passo.
                        </p>
                    </div>

                    {/* Waterfall Trap */}
                    <div className="group bg-red-950/10 p-5 rounded-lg border border-red-900/30 hover:border-red-500/30 transition-all duration-300">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-8 h-8 rounded-full bg-red-500/10 flex items-center justify-center text-red-500">
                                <Lock className="w-4 h-4" />
                            </div>
                            <h4 className="text-red-400 font-bold">Pianificazione (Waterfall)</h4>
                        </div>
                        <p className="text-sm text-neutral-400 leading-relaxed">
                            Gli studenti MBA passano il tempo a pianificare la "struttura perfetta" e mettono il marshmallow solo alla fine. Spesso <strong>crolla tutto</strong>.
                        </p>
                    </div>
                </div>
            </div>
        ),
        debrief: 'Chi ha avuto il coraggio di mettere il marshmallow prima della fine? Chi ha lottato per il potere ("CEO della torre")?'
    },
    'puzzle': {
        title: 'Puzzle Game',
        pillar: 'Auto-organizzazione',
        theory: (
            <div className="space-y-6">
                <div className="bg-blue-950/30 p-6 rounded-lg border border-blue-900/50">
                    <h4 className="text-blue-100 font-bold mb-2">Obiettivo</h4>
                    <p className="text-blue-200/80">Completare un puzzle complesso in silenzio o con restrizioni.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-neutral-900 p-4 rounded border border-neutral-800">
                        <h5 className="text-purple-400 font-bold mb-1">Swarming</h5>
                        <p className="text-xs text-neutral-500">Tutti convergono sul problema, lavorando insieme invece che in silos isolati.</p>
                    </div>
                    <div className="bg-neutral-900 p-4 rounded border border-neutral-800">
                        <h5 className="text-yellow-400 font-bold mb-1">Servant Leadership</h5>
                        <p className="text-xs text-neutral-500">Il facilitatore rimuove ostacoli e tiene la visione, non comanda.</p>
                    </div>
                    <div className="bg-neutral-900 p-4 rounded border border-neutral-800">
                        <h5 className="text-cyan-400 font-bold mb-1">Small Batches</h5>
                        <p className="text-xs text-neutral-500">Costruire a piccoli pezzi (colori, bordi) e unire, invece di cercare di fare tutto insieme.</p>
                    </div>
                </div>
            </div>
        ),
        debrief: 'Come vi siete sentiti quando non potevate parlare? Chi ha preso l\'iniziativa senza autorità formale?'
    },
    'lego': {
        title: 'Lego Flow',
        pillar: 'Flusso & Colli di Bottiglia',
        theory: (
            <div className="space-y-6">
                <div className="bg-blue-950/30 p-6 rounded-lg border border-blue-900/50">
                    <h4 className="text-blue-100 font-bold mb-2">Obiettivo</h4>
                    <p className="text-blue-200/80">Costruire una città Lego simulando diversi processi produttivi.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-red-950/10 p-5 rounded-lg border border-red-900/30">
                        <h4 className="text-red-400 font-bold mb-2">Batch Processing</h4>
                        <p className="text-sm text-neutral-400">Passare grandi lotti crea <strong>colli di bottiglia</strong> e sprechi di attesa.</p>
                    </div>
                    <div className="bg-green-950/10 p-5 rounded-lg border border-green-900/30">
                        <h4 className="text-green-400 font-bold mb-2">Single Piece Flow</h4>
                        <p className="text-sm text-neutral-400">Un pezzo alla volta = <strong>Flusso continuo</strong> e feedback immediato.</p>
                    </div>
                </div>
            </div>
        ),
        debrief: 'Dove si accumulavano i pezzi? Quale metodo ha prodotto più case finite in meno tempo?'
    },
    'kanban': {
        title: 'Kanban Game',
        pillar: 'Flusso & Pull System',
        theory: (
            <div className="space-y-6">
                <div className="bg-blue-950/30 p-6 rounded-lg border border-blue-900/50">
                    <h4 className="text-blue-100 font-bold mb-2">Obiettivo</h4>
                    <p className="text-blue-200/80">Gestire il flusso di lavoro con WIP Limits.</p>
                </div>
                <div className="space-y-4">
                    <div className="p-4 rounded border border-purple-500/30 bg-purple-950/10">
                        <h5 className="text-purple-400 font-bold">Little's Law</h5>
                        <code className="text-xs bg-black/30 p-1 rounded my-1 block w-fit">Cycle Time = WIP / Throughput</code>
                        <p className="text-sm text-neutral-400">Per andare veloci, bisogna <strong>ridurre il WIP</strong>. "Smetti di iniziare, inizia a finire".</p>
                    </div>
                    <div className="p-4 rounded border border-blue-500/30 bg-blue-950/10">
                        <h5 className="text-blue-400 font-bold">Pull System</h5>
                        <p className="text-sm text-neutral-400">Non spingere lavoro (Push). È chi è a valle che <strong>tira</strong> (Pull) quando è pronto.</p>
                    </div>
                </div>
            </div>
        ),
        debrief: 'Cosa è successo alla "Quality" quando abbiamo abbassato il WIP? Avete sentito meno stress?'
    },
    'airplanes': {
        title: 'Paper Airplanes',
        pillar: 'MVP & Feedback',
        theory: (
            <div className="space-y-6">
                <div className="bg-blue-950/30 p-6 rounded-lg border border-blue-900/50">
                    <h4 className="text-blue-100 font-bold mb-2">Obiettivo</h4>
                    <p className="text-blue-200/80">Produzione Agile vs Massa. Focus sull'Outcome.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-orange-950/10 p-5 rounded-lg border border-orange-900/30">
                        <h4 className="text-orange-400 font-bold mb-2">Volume Trap</h4>
                        <p className="text-sm text-neutral-400">Piegare 1000 aerei che non volano è <strong>Waste</strong>. Misura i voli, non i piegamenti.</p>
                    </div>
                    <div className="bg-cyan-950/10 p-5 rounded-lg border border-cyan-900/30">
                        <h4 className="text-cyan-400 font-bold mb-2">Quality at Source</h4>
                        <p className="text-sm text-neutral-400">Chi fa, testa. Feedback immediato = Qualità integrata.</p>
                    </div>
                </div>
            </div>
        ),
        debrief: 'Quanti aerei sono finiti nel cestino? Come è cambiato il design dopo il primo test di volo?'
    }
};

export default function GamePage() {
    const params = useParams();
    const gameId = params.gameId as string;
    const game = GAMES[gameId as keyof typeof GAMES];

    const [isFacilitator, setIsFacilitator] = useState(false);
    const [numTeams, setNumTeams] = useState(3);
    const [numIterations, setNumIterations] = useState(3);
    const [teamName, setTeamName] = useState('Team 1');
    const [metricValue, setMetricValue] = useState('');
    const [photo, setPhoto] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const [teams, setTeams] = useState<string[]>(['Team 1', 'Team 2', 'Team 3']);
    const [currentIteration, setCurrentIteration] = useState(1); // Potentially synced via global_config later

    // Fetch Role
    useEffect(() => {
        const checkRole = async () => {
            const supabase = createClient();
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single();
                if (profile?.role === 'facilitator') setIsFacilitator(true);
            }
        };
        checkRole();
    }, []);

    // Helper to generate team list
    useEffect(() => {
        if (isFacilitator) {
            const t = Array.from({ length: numTeams }, (_, i) => `Team ${i + 1}`);
            setTeams(t);
        }
    }, [numTeams, isFacilitator]);


    const handleSubmitResult = async () => {
        if (!metricValue) {
            alert("Inserisci almeno un valore metrico (altezza/punteggio).");
            return;
        }

        setUploading(true);
        const supabase = createClient();

        let photoUrl = null;
        if (photo) {
            const fileName = `${gameId}/${Date.now()}-${photo.name}`;
            const { data, error } = await supabase.storage.from('game_uploads').upload(fileName, photo, { upsert: true });
            if (data) {
                const { data: { publicUrl } } = supabase.storage.from('game_uploads').getPublicUrl(fileName);
                photoUrl = publicUrl;
            } else {
                console.error('Upload failed:', error);
                alert('Errore caricamento foto: ' + (error?.message || 'sconosciuto'));
            }
        }

        // Insert Result
        const { error: insertError } = await supabase.from('game_results').insert({
            game_id: gameId,
            team_name: teamName,
            iteration: currentIteration,
            metric_value: parseInt(metricValue) || 0,
            photo_url: photoUrl,
        });

        if (insertError) {
            console.error('Insert Error:', insertError);
            alert('Errore salvataggio dati.');
        } else {
            alert('Risultato inviato con successo!');
            setMetricValue('');
            setPhoto(null);
        }

        // Update Score (Simplified: Score = Max Metric Value or Sum? Using Max for Marshmallow usually)
        // Actually, Marshmallow takes the best height.
        // We will just update `team_scores` with the NEW metric if it's higher, or just sum?
        // Let's assume for Marshmallow it's "Highest Tower Wins".
        // But for Kanban game it might be "Cumulative Profit".
        // For now, let's just UPSERT the score as the provided value (Current Round Score).
        // Leaderboard needs to be flexible.
        // I will trigger a refresh of Leaderboard effectively by writing to `team_scores`.

        await supabase.from('team_scores').upsert({
            team_name: teamName,
            pillar_id: gameId,
            score: parseInt(metricValue) || 0 // NOTE: This overwrites. Fine for "Highest Record" games.
        }, { onConflict: 'team_name, pillar_id' });

        setUploading(false);
    };

    if (!game) {
        return <div className="p-8 text-white">Gioco non trovato. <Link href="/experiential" className="text-blue-500 underline">Torna indietro</Link></div>;
    }

    return (
        <div className="min-h-screen bg-[#020817] text-white p-4 md:p-8 bg-grid-white/[0.02] relative">
            {/* Background Gradients */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-900/10 via-transparent to-purple-900/10 pointer-events-none" />

            <div className="relative z-10">
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <Link href="/experiential">
                            <Button variant="ghost" className="text-neutral-400 hover:text-white pl-0 gap-2 mb-2">
                                <ArrowLeft className="w-4 h-4" /> Torna alla Dashboard
                            </Button>
                        </Link>
                        <h1 className="text-4xl font-extrabold tracking-tight text-white mb-2">
                            {game.title}
                        </h1>
                        <span className="text-xs font-semibold tracking-wider bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full border border-blue-500/20 uppercase">
                            {game.pillar}
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left: Content Tabs */}
                    <div className="lg:col-span-2">
                        <Tabs defaultValue="activity" className="w-full">
                            <TabsList className="bg-neutral-900/50 border border-neutral-800 p-1 w-full justify-start overflow-x-auto rounded-lg backdrop-blur-md">
                                <TabsTrigger value="theory" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-neutral-400 rounded-md px-4 py-2 transition-all">Teoria QuickWorks</TabsTrigger>
                                <TabsTrigger value="activity" className="data-[state=active]:bg-green-600 data-[state=active]:text-white text-neutral-400 rounded-md px-4 py-2 transition-all">Attività & Timer</TabsTrigger>
                                <TabsTrigger value="results" className="data-[state=active]:bg-orange-600 data-[state=active]:text-white text-neutral-400 rounded-md px-4 py-2 transition-all">Inserimento Dati</TabsTrigger>
                                <TabsTrigger value="debrief" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white text-neutral-400 rounded-md px-4 py-2 transition-all">Debriefing</TabsTrigger>
                            </TabsList>

                            <div className="mt-6">
                                <TabsContent value="theory">
                                    <Card className="bg-neutral-900/50 border-neutral-800 backdrop-blur-sm">
                                        <CardHeader>
                                            <CardTitle className="flex items-center gap-2">
                                                <BookOpen className="w-5 h-5 text-blue-400" />
                                                Intro Teorica
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className="text-white leading-relaxed">
                                            {game.theory}
                                        </CardContent>
                                    </Card>
                                </TabsContent>

                                <TabsContent value="activity">
                                    <Card className="bg-neutral-900/50 border-neutral-800 backdrop-blur-sm">
                                        <CardHeader>
                                            <CardTitle>Sessione Attiva: Iterazione {currentIteration}</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="flex flex-col items-center justify-center py-12 bg-black/20 rounded-xl border border-white/5">
                                                <SyncTimer isFacilitator={isFacilitator} />
                                            </div>
                                            <div className="text-center text-neutral-500 text-sm mt-4 flex items-center justify-center gap-2">
                                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                                                Il Timer è sincronizzato per tutti i partecipanti.
                                            </div>
                                        </CardContent>
                                    </Card>
                                </TabsContent>

                                <TabsContent value="results">
                                    <Card className="bg-neutral-900/50 border-neutral-800 backdrop-blur-sm">
                                        <CardHeader>
                                            <CardTitle>Inserimento Dati</CardTitle>
                                        </CardHeader>
                                        <CardContent className="space-y-6">
                                            {isFacilitator && (
                                                <div className="p-6 bg-blue-950/20 rounded-xl border border-blue-900/40 mb-8">
                                                    <h4 className="text-blue-400 font-bold mb-6 flex items-center gap-2 uppercase tracking-wide text-sm">
                                                        <span className="text-xl">🦸‍♂️</span> Gestione Sessione (Facilitatore)
                                                    </h4>

                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                        <div className="space-y-6">
                                                            <div className="grid grid-cols-2 gap-4">
                                                                <div className="space-y-2">
                                                                    <Label className="text-xs text-blue-300/70 uppercase font-semibold">Num. Team</Label>
                                                                    <Input
                                                                        type="number"
                                                                        value={numTeams}
                                                                        onChange={e => setNumTeams(parseInt(e.target.value) || 1)}
                                                                        className="bg-neutral-950/50 border-blue-900/30 text-white focus:border-blue-500 transition-colors"
                                                                        min={1}
                                                                    />
                                                                </div>
                                                                <div className="space-y-2">
                                                                    <Label className="text-xs text-blue-300/70 uppercase font-semibold">Iterazioni</Label>
                                                                    <Input
                                                                        type="number"
                                                                        value={numIterations}
                                                                        onChange={e => setNumIterations(parseInt(e.target.value) || 1)}
                                                                        className="bg-neutral-950/50 border-blue-900/30 text-white focus:border-blue-500 transition-colors"
                                                                        min={1}
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="flex gap-2">
                                                                <Button size="sm" variant="outline" onClick={() => setCurrentIteration(c => Math.max(1, c - 1))} disabled={currentIteration <= 1} className="flex-1 border-blue-900/30 hover:bg-blue-900/20 hover:text-blue-300 text-neutral-400">Previous</Button>
                                                                <Button size="sm" variant="outline" onClick={() => setCurrentIteration(c => c + 1)} className="flex-1 border-blue-900/30 hover:bg-blue-900/20 hover:text-blue-300 text-neutral-400">Next Iteration</Button>
                                                            </div>
                                                        </div>

                                                        <div className="space-y-2">
                                                            <Label className="text-xs text-blue-300/70 uppercase font-semibold">Configurazione Team</Label>
                                                            <div className="space-y-2 max-h-[160px] overflow-y-auto pr-2 custom-scrollbar">
                                                                {teams.map((t, i) => (
                                                                    <div key={i} className="relative group">
                                                                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-600 text-xs font-mono">{i + 1}</div>
                                                                        <Input
                                                                            value={t}
                                                                            onChange={(e) => {
                                                                                const newTeams = [...teams];
                                                                                newTeams[i] = e.target.value;
                                                                                setTeams(newTeams);
                                                                            }}
                                                                            className="bg-neutral-950/50 border-blue-900/30 text-white h-9 text-sm pl-8 focus:border-blue-500 transition-colors"
                                                                            placeholder={`Nome Team ${i + 1}`}
                                                                        />
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                            <div className="p-1">
                                                <div className="space-y-2 mb-6">
                                                    <Label className="text-neutral-300">Seleziona il tuo Team</Label>
                                                    <Select value={teamName} onValueChange={setTeamName}>
                                                        <SelectTrigger className="w-full bg-neutral-950 border-neutral-700 text-white h-12">
                                                            <SelectValue placeholder="Chi sta inviando questi dati?" />
                                                        </SelectTrigger>
                                                        <SelectContent className="bg-neutral-900 border-neutral-800 text-white">
                                                            {teams.map((t, i) => (
                                                                <SelectItem key={`${t}-${i}`} value={t}>{t}</SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                </div>

                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                    <div className="space-y-2">
                                                        <Label className="text-neutral-300">Valore (es. Altezza cm)</Label>
                                                        <Input
                                                            type="number"
                                                            value={metricValue}
                                                            onChange={e => setMetricValue(e.target.value)}
                                                            className="bg-neutral-950 border-neutral-700 text-white text-lg h-12"
                                                            placeholder="0"
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label className="text-neutral-300">Foto (Opzionale)</Label>
                                                        <div className="flex items-center gap-2">
                                                            <Input
                                                                id="photo-upload"
                                                                type="file"
                                                                accept="image/*"
                                                                capture="environment"
                                                                onChange={e => setPhoto(e.target.files?.[0] || null)}
                                                                className="hidden"
                                                            />
                                                            <Button
                                                                variant="outline"
                                                                onClick={() => document.getElementById('photo-upload')?.click()}
                                                                className={`w-full h-12 border-dashed border-neutral-600 ${photo ? 'bg-green-900/20 text-green-400 border-green-800' : 'hover:bg-neutral-900'}`}
                                                            >
                                                                <Camera className="w-4 h-4 mr-2" />
                                                                {photo ? 'Foto Pronta!' : 'Scatta Foto'}
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </div>

                                                <Button onClick={handleSubmitResult} disabled={uploading || !teamName} className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-6 text-lg font-bold shadow-lg shadow-blue-900/20 mt-8 h-auto transform transition-all active:scale-[0.98]">
                                                    {uploading ? 'Caricamento in corso...' : 'Invia Risultato 🚀'}
                                                </Button>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </TabsContent>

                                <TabsContent value="debrief">
                                    <Card className="bg-neutral-900/50 border-neutral-800 backdrop-blur-sm">
                                        <CardHeader>
                                            <CardTitle>Debriefing</CardTitle>
                                        </CardHeader>
                                        <CardContent className="text-neutral-300 italic text-lg leading-loose p-8 text-center">
                                            "{game.debrief}"
                                        </CardContent>
                                    </Card>
                                </TabsContent>
                            </div>
                        </Tabs>
                    </div>

                    {/* Right: Leaderboard */}
                    <div>
                        <Card className="bg-neutral-900/80 border-neutral-800 sticky top-4 backdrop-blur-md shadow-xl">
                            <CardHeader className="flex flex-row items-center justify-between pb-2 border-b border-neutral-800/50">
                                <CardTitle className="text-xs uppercase tracking-widest text-neutral-400 font-bold">Classifica Live</CardTitle>
                                <Trophy className="w-5 h-5 text-yellow-500 drop-shadow-[0_0_8px_rgba(234,179,8,0.5)]" />
                            </CardHeader>
                            <CardContent className="pt-6">
                                <Leaderboard pillarId={gameId} />

                                <div className="mt-8 pt-6 border-t border-neutral-800">
                                    <div className="flex items-center justify-center gap-2 text-xs text-neutral-500">
                                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                                        Aggiornamento in tempo reale
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
