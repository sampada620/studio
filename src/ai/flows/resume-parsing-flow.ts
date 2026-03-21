'use server';
/**
 * @fileOverview A Genkit flow for parsing resumes from a data URI.
 *
 * - parseResume - A function that handles the resume parsing process.
 * - ResumeParsingInput - The input type for the parseResume function.
 * - ResumeParsingOutput - The return type for the parseResume function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ResumeParsingInputSchema = z.object({
  resumeDataUri: z
    .string()
    .describe(
      "The resume file, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'. Supported types include PDF and common document formats."
    ),
});
export type ResumeParsingInput = z.infer<typeof ResumeParsingInputSchema>;

const ResumeParsingOutputSchema = z.object({
  skills: z
    .array(z.string())
    .describe('A list of key skills extracted from the resume.'),
  experience: z
    .array(
      z.object({
        title: z.string().describe('The job title.'),
        company: z.string().describe('The company name.'),
        duration: z.string().describe('The employment duration (e.g., "Jan 2020 - Dec 2022").'),
        description: z
          .string()
          .describe('A concise description of responsibilities and achievements.'),
      })
    )
    .describe('A list of work experiences extracted from the resume.'),
  projects: z
    .array(
      z.object({
        name: z.string().describe('The name of the project.'),
        description: z
          .string()
          .describe('A brief description of the project and your role.'),
        technologies: z
          .array(z.string())
          .describe('A list of technologies used in the project.'),
      })
    )
    .describe('A list of personal or professional projects extracted from the resume.'),
});
export type ResumeParsingOutput = z.infer<typeof ResumeParsingOutputSchema>;

export async function parseResume(input: ResumeParsingInput): Promise<ResumeParsingOutput> {
  return resumeParsingFlow(input);
}

const prompt = ai.definePrompt({
  name: 'resumeParsingPrompt',
  model: 'googleai/gemini-1.5-flash',
  input: {schema: ResumeParsingInputSchema},
  output: {schema: ResumeParsingOutputSchema},
  prompt: `You are an expert resume parser. Your task is to accurately extract key information from the provided resume.

Carefully read the resume and identify the following details:
- Key skills
- Detailed work experience (job title, company, duration, and a description of responsibilities/achievements)
- Significant projects (project name, description, and technologies used)

Present the extracted information in a structured JSON format according to the output schema provided.

Resume: {{media url=resumeDataUri}}`,
});

const resumeParsingFlow = ai.defineFlow(
  {
    name: 'resumeParsingFlow',
    inputSchema: ResumeParsingInputSchema,
    outputSchema: ResumeParsingOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    if (!output) {
      throw new Error('Failed to parse resume: No output received from AI model.');
    }
    return output;
  }
);
