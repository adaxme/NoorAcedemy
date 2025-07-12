'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { getLessonSummary, getTranslatedSummary } from '@/app/actions';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { LANGUAGES, LESSON_TOPICS, LanguageCode } from '@/lib/constants';
import { Lightbulb } from 'lucide-react';

const formSchema = z.object({
  topic: z.string().min(1, 'Please select a topic.'),
  age: z.array(z.number()).min(1),
});

type FormValues = z.infer<typeof formSchema>;

export default function LessonsPage() {
  const [summary, setSummary] = useState<string>('');
  const [translatedSummary, setTranslatedSummary] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isTranslating, setIsTranslating] = useState<boolean>(false);
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageCode>('en');
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      topic: '',
      age: [6],
    },
  });

  const onSubmit = async (values: FormValues) => {
    setIsLoading(true);
    setSummary('');
    setTranslatedSummary('');
    const result = await getLessonSummary({ topic: values.topic, age: values.age[0] });
    setIsLoading(false);

    if (result.success && result.data) {
      setSummary(result.data.summary);
    } else {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: result.error,
      });
    }
  };

  const handleTranslate = async (languageCode: LanguageCode) => {
    if (!summary || languageCode === 'en') {
      setTranslatedSummary('');
      setSelectedLanguage(languageCode);
      return;
    }

    setIsTranslating(true);
    setTranslatedSummary('');
    setSelectedLanguage(languageCode);

    const result = await getTranslatedSummary({
      text: summary,
      targetLanguage: languageCode,
    });
    setIsTranslating(false);

    if (result.success && result.data) {
      setTranslatedSummary(result.data.translatedText);
    } else {
      toast({
        variant: 'destructive',
        title: 'Translation Error',
        description: result.error,
      });
    }
  };


  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
      <div className="lg:col-span-1">
        <h1 className="text-3xl font-bold">AI-Powered Lessons</h1>
        <p className="text-muted-foreground mb-6">
          Generate simple Islamic lessons for children.
        </p>
        <Card>
          <CardHeader>
            <CardTitle>Lesson Generator</CardTitle>
            <CardDescription>Select a topic and age to start.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="topic"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Topic</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a topic" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {LESSON_TOPICS.map((topic) => (
                            <SelectItem key={topic.value} value={topic.value}>
                              {topic.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="age"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Child's Age: {field.value}</FormLabel>
                      <FormControl>
                        <Slider
                          min={3}
                          max={12}
                          step={1}
                          defaultValue={field.value}
                          onValueChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? 'Generating...' : 'Generate Lesson'}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
      <div className="lg:col-span-2">
        <Card className="min-h-[30rem]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
                <Lightbulb className="text-accent" />
                Your Lesson
            </CardTitle>
            <CardDescription>
              Here is the simplified lesson for your child.
            </CardDescription>
          </CardHeader>
          <CardContent className="prose max-w-none whitespace-pre-wrap text-lg">
            {isLoading ? (
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            ) : summary ? (
              <p>{translatedSummary || summary}</p>
            ) : (
              <p className="text-muted-foreground">Generate a lesson to see it here.</p>
            )}

            {isTranslating && (
                 <div className="space-y-2 mt-4">
                 <Skeleton className="h-4 w-full" />
                 <Skeleton className="h-4 w-3/4" />
               </div>
            )}
          </CardContent>
          {summary && !isLoading && (
            <CardFooter className="flex-col items-start gap-4">
                <Separator className="my-2" />
                <h3 className="font-semibold">Translate Lesson</h3>
                <div className="flex flex-wrap gap-2">
                     <Select onValueChange={(value) => handleTranslate(value as LanguageCode)} value={selectedLanguage}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent>
                            {LANGUAGES.map((lang) => (
                                <SelectItem key={lang.code} value={lang.code}>
                                    {lang.flag} {lang.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                     </Select>
                </div>
            </CardFooter>
          )}
        </Card>
      </div>
    </div>
  );
}

// Dummy separator to avoid import errors if shadcn separator is not present.
const Separator = ({ className }: { className?: string }) => <hr className={className} />;
