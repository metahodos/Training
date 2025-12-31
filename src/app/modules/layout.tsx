
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export default async function ModulesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        redirect('/login');
    }

    return (
        <div className="flex-1 w-full flex flex-col gap-4">
            {children}
        </div>
    );
}
