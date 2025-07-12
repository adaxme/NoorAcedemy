'use server';

import { summarizeIslamicLesson, SummarizeIslamicLessonInput } from '@/ai/flows/summarize-islamic-lesson';
import { translateLessonSummary, TranslateLessonSummaryInput } from '@/ai/flows/translate-lesson-summary';

export async function getLessonSummary(input: SummarizeIslamicLessonInput) {
  try {
    const result = await summarizeIslamicLesson(input);
    return { success: true, data: result };
  } catch (error) {
    console.error('Error in getLessonSummary:', error);
    return { success: false, error: 'Failed to generate lesson summary.' };
  }
}

export async function getTranslatedSummary(input: TranslateLessonSummaryInput) {
  try {
    const result = await translateLessonSummary(input);
    return { success: true, data: result };
  } catch (error) {
    console.error('Error in getTranslatedSummary:', error);
    return { success: false, error: 'Failed to translate summary.' };
  }
}
