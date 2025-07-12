import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { BookOpen, BrainCircuit, SpellCheck } from 'lucide-react';
import Link from 'next/link';

const modules = [
  {
    href: '/alphabet',
    title: 'Arabic Alphabet',
    description: 'Learn letters with sounds and animations.',
    icon: SpellCheck,
    color: 'text-rose-500',
  },
  {
    href: '/quran',
    title: 'Qur’an Memorization',
    description: 'Practice short Surahs from Juz Amma.',
    icon: BookOpen,
    color: 'text-indigo-500',
  },
  {
    href: '/lessons',
    title: 'Islamic Lessons',
    description: 'Understand Islamic concepts with AI help.',
    icon: BrainCircuit,
    color: 'text-amber-500',
  },
];

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold">Welcome, Little Learner!</h1>
        <p className="text-muted-foreground">What would you like to explore today?</p>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {modules.map((mod) => (
          <Link href={mod.href} key={mod.href}>
            <Card className="flex h-full flex-col justify-between transition-all hover:scale-[1.02] hover:shadow-lg">
              <CardHeader>
                <div className="mb-4 flex justify-center">
                    <div className="rounded-full bg-primary/20 p-4">
                        <mod.icon className={`size-12 ${mod.color}`} />
                    </div>
                </div>
                <CardTitle className="text-center">{mod.title}</CardTitle>
                <CardDescription className="text-center">{mod.description}</CardDescription>
              </CardHeader>
              <CardContent></CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
