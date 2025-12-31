import { createClient } from '@/utils/supabase/server';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { BookOpen } from 'lucide-react';
import Link from 'next/link';

export default async function PillsPage() {
    const supabase = await createClient();
    const { data: modules } = await supabase
        .from('modules')
        .select(`
            id, 
            title, 
            category, 
            lessons (content, order_index)
        `)
        .order('id');

    return (
        <div className="container mx-auto p-8 max-w-6xl">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-2">
                    <BookOpen className="text-blue-500" />
                    Pillole di Teoria Agile
                </h1>
                <p className="text-gray-400">
                    Concetti fondamentali per padroneggiare Scrum e Agile.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {(modules || []).map((module) => {
                    // Find first lesson for preview
                    const firstLesson = Array.isArray(module.lessons) && module.lessons.length > 0
                        ? module.lessons.sort((a, b) => a.order_index - b.order_index)[0]
                        : null;

                    return (
                        <Link href={`/modules/${module.id}`} key={module.id} className="block group">
                            <Card className="bg-neutral-900 border-neutral-800 text-white hover:border-blue-500/50 transition-colors cursor-pointer h-full">
                                <CardHeader>
                                    <div className="flex justify-between items-start mb-2">
                                        <Badge variant="outline" className="text-blue-400 border-blue-500/30">
                                            {module.category || 'Generale'}
                                        </Badge>
                                    </div>
                                    <CardTitle className="group-hover:text-blue-400 transition-colors">
                                        {module.title}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ScrollArea className="h-40 rounded-md border border-neutral-800 p-4 bg-neutral-950/50">
                                        <div className="text-sm text-gray-400 whitespace-pre-line">
                                            {firstLesson ? firstLesson.content.substring(0, 150) + "..." : "Nessun contenuto disponibile..."}
                                        </div>
                                    </ScrollArea>
                                    <div className="mt-4 text-right">
                                        <span className="text-sm text-blue-500 font-medium group-hover:underline">LEGGI TUTTO &rarr;</span>
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    )
                })}
            </div>
        </div>
    );
}
