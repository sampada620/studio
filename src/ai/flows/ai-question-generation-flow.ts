'use server';
/**
 * @fileOverview A Genkit flow for generating personalized interview questions.
 *
 * - generateInterviewQuestions - A function that handles the generation of HR, technical, and scenario-based interview questions.
 * - AIQuestionGenerationInput - The input type for the generateInterviewQuestions function.
 * - AIQuestionGenerationOutput - The return type for the generateInterviewQuestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AIQuestionGenerationInputSchema = z.object({
  jobRole: z.string().describe('The target job role for which to generate interview questions.'),
  resumeDetails: z
    .object({
      skills: z.array(z.string()).describe('A list of skills extracted from the user\'s resume.'),
      experience: z
        .array(z.string())
        .describe('A list of work experiences extracted from the user\'s resume.'),
      projects: z
        .array(z.string())
        .describe('A list of projects extracted from the user\'s resume.'),
    })
    .describe('Structured details extracted from the user\'s resume.'),
});
export type AIQuestionGenerationInput = z.infer<typeof AIQuestionGenerationInputSchema>;

const AIQuestionGenerationOutputSchema = z.object({
  hrQuestions: z.array(z.string()).describe('A list of generated HR-related interview questions.'),
  technicalQuestions: z
    .array(z.string())
    .describe('A list of generated technical interview questions.'),
  scenarioQuestions: z
    .array(z.string())
    .describe('A list of generated scenario-based interview questions.'),
});
export type AIQuestionGenerationOutput = z.infer<typeof AIQuestionGenerationOutputSchema>;

export async function generateInterviewQuestions(
  input: AIQuestionGenerationInput
): Promise<AIQuestionGenerationOutput> {
  return aiQuestionGenerationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiQuestionGenerationPrompt',
  input: {schema: AIQuestionGenerationInputSchema},
  output: {schema: AIQuestionGenerationOutputSchema},
  prompt: `You are an AI Interview Coach tasked with generating personalized interview questions for a candidate.

Generate HR, technical, and scenario-based interview questions tailored to the candidate's target job role and resume details.

Target Job Role: {{{jobRole}}}

Candidate's Resume Details:
Skills: {{#each resumeDetails.skills}}- {{{this}}}{{/each}}
Experience: {{#each resumeDetails.experience}}- {{{this}}}{{/each}}
Projects: {{#each resumeDetails.projects}}- {{{this}}}{{/each}}

Generate 3-5 HR questions, 3-5 technical questions, and 2-3 scenario-based questions that are highly relevant to the provided information.
Ensure the questions encourage detailed and thoughtful responses, and cover various aspects of the job role and the candidate's background.
`,
});

const aiQuestionGenerationFlow = ai.defineFlow(
  {
    name: 'aiQuestionGenerationFlow',
    inputSchema: AIQuestionGenerationInputSchema,
    outputSchema: AIQuestionGenerationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
