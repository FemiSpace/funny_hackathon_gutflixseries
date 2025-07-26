# Gutflix Original: 4-Hour Hackathon Parallel Development Plan

This document outlines the development plan to build the "Gutflix Original" satirical health simulator within a 4-hour timeframe by splitting tasks between Cascade (AI assistant) and the user (with assistance from ChatGPT/Claude).

**Project Directory:** `C:\Users\tonte\Cascade_funny hackathon_july26th`

---

## Tech Stack & Architecture

*   **Frontend:** Next.js, React, TypeScript, Tailwind CSS
*   **Backend/LLM:** Next.js API routes will handle requests to Azure OpenAI and our database.
*   **Database:** **Supabase.** We will use it to power the "Gut Damage Leaderboard."
*   **LLM Integration:**
    *   **Model:** `gpt-3.5-turbo` or `gpt-4` via Azure OpenAI.
    *   **Implementation:** An API route (`app/api/generate-dialogue/route.ts`) will use a client (`lib/llmClient.ts`) to call the Azure API.

---

## Credentials & Setup Notes

*   **Supabase Project URL:** `https://ijzarhlozavzipyyehav.supabase.co`
*   **Supabase Anon Key:** `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` (truncated for safety)

*These keys are stored in the `.env.local` file, which is not committed to version control.*

---

## Parallel Development Streams

### Task Stream 1: Core App & Backend Development (Assigned to: Cascade)

*   **Objective:** Build the full-stack application, including the database integration.
*   **Steps:**
    1.  **Setup (Crucial First Step):** Initialize Next.js + Tailwind project.
    2.  **Supabase Integration:** Add the Supabase client to the project and create API routes (`/api/log-meal` and `/api/leaderboard`).
    3.  **Component Scaffolding:** Build `FoodSelector.tsx`, `ReactionScene.tsx`, `LLMResponseBox.tsx`, and the new `Leaderboard.tsx` component.
    4.  **Full Integration:** Wire everything together so that selecting a food logs the score via the API and updates the leaderboard.

### Task Stream 2 & 3: Parallel Setup & Content (Assigned to: User + ChatGPT/GIPHY)

*   **Objective:** Set up external services and generate all content and assets. **This can be done in parallel to Stream 1.**
*   **Actions:**
    1.  **Set Up Supabase (URGENT - 10 mins):**
        *   Go to [Supabase.com](https://supabase.com), create a new project.
        *   In your project's settings, go to the **API** section.
        *   **I will need two things from you soon:**
            1.  The **Project URL**.
            2.  The `anon` **public API Key**.
        *   I will ask for these when I'm ready to write the client code.

    2.  **Generate Updated Food Data (with ChatGPT):**
        *   **Goal:** Create the `foodData.ts` file with the new `damageScore` field.
        *   **Prompt for ChatGPT (Copy-Paste This):**
            ```prompt
            You are a programmer creating data for a satirical health app. Generate a TypeScript code block that exports a constant array named `foodData`. Each object must conform to the `FoodItem` interface.

            The interface is:
            `interface FoodItem {
              id: number;
              name: string;
              damageScore: number; // A negative number for bad food, positive for good
              outsidePerception: string;
              insideReactionGif: string; // filename for the GIF
              llmPrompt: string; // A prompt for an LLM
            }`

            Generate a complete TypeScript file content, including the interface definition and the exported array, for these 6 foods:
            1. Energy Drink (damage: -8)
            2. McNuggets (damage: -12)
            3. Gas Station Burrito (damage: -15)
            4. Kombucha (damage: +5)
            5. Protein Bar (damage: -4, it's sneaky)
            6. Kale + Salmon Bowl (damage: +10)

            Make the `llmPrompt` for each food a sarcastic, funny, first-person monologue from the perspective of the body's organs.
            ```
        *   **Outcome:** A `lib/foodData.ts` file.

### Task Stream 3: Visual Assets (Assigned to: User + GIPHY/Google)

*   **Objective:** Gather all visual assets. **This can also be done in parallel.**
*   **Actions:**
    1.  **Find Reaction GIFs:**
        *   **Tool:** [GIPHY](https://giphy.com), Google Images
        *   **Goal:** Find and download GIFs for each "inside reaction." Save them with filenames that exactly match the `insideReactionGif` values generated in the step above.
        *   **Suggested Search Terms:**
            *   **For Energy Drink:** `brain overload gif`, `heartbeat fast gif`, `chaos factory cartoon`
            *   **For McNuggets:** `swimming in oil gif`, `conveyor belt junk`, `sad gut bacteria cartoon`
            *   **For Gas Station Burrito:** `dumpster fire gif`, `emergency alarm flashing`, `colon explosion cartoon`
            *   **For Kombucha:** `happy dance cartoon gif`, `zen garden gif`, `bubbles party`
            *   **For Protein Bar:** `sugar rush gif`, `trojan horse gif`, `wolf in sheep's clothing cartoon`
            *   **For Kale Bowl:** `glowing healthy cartoon`, `angel choir gif`, `nature peace gif`
        *   **Outcome:** A folder of GIFs ready to be placed in `public/gifs/`.
