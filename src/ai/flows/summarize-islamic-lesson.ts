'use server';
/**
 * @fileOverview Summarizes Islamic lessons for children based on topic and age.
 *
 * - summarizeIslamicLesson - A function that generates a simplified explanation of an Islamic topic for a given age.
 * - SummarizeIslamicLessonInput - The input type for the summarizeIslamicLesson function.
 * - SummarizeIslamicLessonOutput - The return type for the summarizeIslamicLesson function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeIslamicLessonInputSchema = z.object({
  topic: z
    .string()
    .describe('The Islamic topic to summarize (e.g., Pillars of Islam, Pillars of Iman, Names of Allah, Stories of Prophets).'),
  age: z.number().int().min(3).max(12).describe('The age of the child.'),
});
export type SummarizeIslamicLessonInput = z.infer<typeof SummarizeIslamicLessonInputSchema>;

const SummarizeIslamicLessonOutputSchema = z.object({
  summary: z.string().describe('A simplified, age-appropriate explanation of the Islamic topic.'),
});
export type SummarizeIslamicLessonOutput = z.infer<typeof SummarizeIslamicLessonOutputSchema>;

export async function summarizeIslamicLesson(input: SummarizeIslamicLessonInput): Promise<SummarizeIslamicLessonOutput> {
  return summarizeIslamicLessonFlow(input);
}

const summarizeIslamicLessonPrompt = ai.definePrompt({
  name: 'summarizeIslamicLessonPrompt',
  input: {schema: SummarizeIslamicLessonInputSchema},
  output: {schema: SummarizeIslamicLessonOutputSchema},
  prompt: `You are an AI assistant specializing in explaining Islamic concepts to children.

  Please provide a simplified explanation of the following topic for a child of the specified age.

  Topic: {{{topic}}}
  Age: {{{age}}}

  The explanation should be easy to understand and age-appropriate.
  Focus on the main ideas and use simple language.
`,
});

const summarizeIslamicLessonFlow = ai.defineFlow(
  {
    name: 'summarizeIslamicLessonFlow',
    inputSchema: SummarizeIslamicLessonInputSchema,
    outputSchema: SummarizeIslamicLessonOutputSchema,
  },
  async input => {
    const {output} = await summarizeIslamicLessonPrompt(input);
    return output!;
  }
);
