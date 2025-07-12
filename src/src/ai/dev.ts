import { config } from 'dotenv';
config({ path: '.env' });

import '@/ai/flows/summarize-islamic-lesson.ts';
import '@/ai/flows/translate-lesson-summary.ts';
