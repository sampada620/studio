'use server';
/**
 * @fileOverview A Genkit flow for providing AI-powered feedback on interview answers.
 *
 * - aiTextFeedback - A function that handles the AI text feedback process.
 * - AITextFeedbackInput - The input type for the aiTextFeedback function.
 * - AITextFeedbackOutput - The return type for the aiTextFeedback function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const AITextFeedbackInputSchema = z.object({
  question: z.string().describe('The interview question asked to the user.'),
  userAnswer: z.string().describe('The user\'s answer to the interview question.'),
  jobRole: z.string().describe('The job role for which the user is preparing, to contextualize technical feedback.'),
});
export type AITextFeedbackInput = z.infer<typeof AITextFeedbackInputSchema>;

const AITextFeedbackOutputSchema = z.object({
  answerQualityFeedback: z.string().describe('Feedback on the overall quality of the answer, including relevance, completeness, and structure.'),
  communicationFeedback: z.string().describe('Feedback on the clarity, conciseness, and communication style of the answer.'),
  technicalAccuracyFeedback: z.string().describe('Feedback on the technical correctness, depth, and relevance of the answer, specific to the job role.'),
});
export type AITextFeedbackOutput = z.infer<typeof AITextFeedbackOutputSchema>;

export async function aiTextFeedback(input: AITextFeedbackInput): Promise<AITextFeedbackOutput> {
  return aiTextFeedbackFlow(input);
}

const aiTextFeedbackPrompt = ai.definePrompt({
  name: 'aiTextFeedbackPrompt',
  input: { schema: AITextFeedbackInputSchema },
  output: { schema: AITextFeedbackOutputSchema },
  prompt: `You are an AI interview coach. Your task is to provide constructive feedback on a user's interview answer.

Evaluate the user's answer based on the given question and the target job role.
Provide feedback in three distinct categories:
1.  **Answer Quality**: Assess the relevance, completeness, and structure of the answer. Does it directly address the question? Is it well-organized?
2.  **Communication**: Evaluate the clarity, conciseness, and overall communication style. Is the language clear and easy to understand? Is it verbose or to the point?
3.  **Technical Accuracy**: For technical questions, assess the correctness, depth, and relevance of the technical details provided. This should be specific to the specified job role.

Use the following information:
Job Role: {{{jobRole}}}
Question: {{{question}}}
User's Answer: {{{userAnswer}}}

Provide your feedback concisely and professionally.`,
});

const aiTextFeedbackFlow = ai.defineFlow(
  {
    name: 'aiTextFeedbackFlow',
    inputSchema: AITextFeedbackInputSchema,
    outputSchema: AITextFeedbackOutputSchema,
  },
  async (input) => {
    const { output } = await aiTextFeedbackPrompt(input);
    return output!;
  }
);
