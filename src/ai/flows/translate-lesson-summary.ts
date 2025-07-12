'use server';

/**
 * @fileOverview This file defines a Genkit flow for translating AI-generated lesson summaries into different languages.
 *
 * - translateLessonSummary - A function that translates lesson summaries using the Google Translate API.
 * - TranslateLessonSummaryInput - The input type for the translateLessonSummary function.
 * - TranslateLessonSummaryOutput - The return type for the translateLessonSummary function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { translate } from '@vitalets/google-translate-api';

const TranslateLessonSummaryInputSchema = z.object({
  text: z.string().describe('The lesson summary text to translate.'),
  targetLanguage: z
    .enum(['en', 'ar', 'fr', 'ur', 'id', 'ha'])
    .describe('The target language code (en, ar, fr, ur, id, or ha).'),
});
export type TranslateLessonSummaryInput = z.infer<
  typeof TranslateLessonSummaryInputSchema
>;

const TranslateLessonSummaryOutputSchema = z.object({
  translatedText: z.string().describe('The translated lesson summary text.'),
});
export type TranslateLessonSummaryOutput = z.infer<
  typeof TranslateLessonSummaryOutputSchema
>;

export async function translateLessonSummary(
  input: TranslateLessonSummaryInput
): Promise<TranslateLessonSummaryOutput> {
  return translateLessonSummaryFlow(input);
}

const translateLessonSummaryFlow = ai.defineFlow(
  {
    name: 'translateLessonSummaryFlow',
    inputSchema: TranslateLessonSummaryInputSchema,
    outputSchema: TranslateLessonSummaryOutputSchema,
  },
  async input => {
    const {text, targetLanguage} = input;

    try {
      const { text: translatedText } = await translate(text, { to: targetLanguage });
      return {
        translatedText,
      };
    } catch (error) {
      console.error('Translation error:', error);
      throw new Error('Failed to translate lesson summary.');
    }
  }
);
