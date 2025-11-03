---
title: "Building VibeCheck: How We Reimagined Technical Interviews at Cal Hacks"
date: Oct 2025
excerpt: Building a coding interview platform in 36 hours that evaluates developers the way they actually work—with AI as their assistant.
tags: [Hackathon, AI, Product]
readTime: 8 min read
---

![VibeCheck Landing Page](https://ethans.site/writing/vibecheck/landing.png "VibeCheck Landing Page")

## The Problem

I've been asked to reverse linked lists, balance BSTs, and optimize dynamic programming solutions in interviews. You know how many times I've done any of that in production? Zero.

Meanwhile, every day I'm building features, debugging APIs, refactoring components, and yes—prompting Claude to help me ship faster. The disconnect between how we interview engineers and how engineers actually work has never been wider.

Last weekend, I traveled to San Francisco with Evan Yu, Luke Griggs, and Aaronkhan Hubhachen for Cal Hacks 12.0. We built VibeCheck: a coding interview platform that evaluates developers the way they actually code—with AI as their assistant.

**Our thesis:** Interviews should test what engineers actually do. Let candidates build real features with the tools they'd use on the job, including AI.

---

## Building It

### Day 0: No Plan, No Problem

We landed in SF on Friday with zero preparation. The official venue had no WiFi and terrible air quality, so we set up shop in Luke's brother's apartment, then later moved to a warehouse my friend Jared was renting out.

We had 3 hours to land on an idea. After rejecting dozens of ideas, I realized we needed to shift our product mindset—instead of thinking about what would be cool to build, what problems were we actually facing?

Interviews immediately came to mind. We had all been grinding LeetCode and preparing for technical interviews for the internship search. It's particularly frustrating to study problems we'd never touch on the job, then get rejected despite being strong builders.

Aaron had literally just finished a work trial in SF and I thought, "Why can't this process be automated?"

### Founder-Market Fit

Once the idea clicked, we knew we could execute:

- **I'd been deep in AI tooling**, previously building with MCP, tool calling, etc.
- **Evan** had already built a browser-based IDE that cloned VSCode. He knew WebContainers, Monaco integration, and filesystem simulation.
- **Luke and Aaron** are incredibly adaptable engineers that could jump onto any project and hit the ground running.

This was solving an issue deeply personal to all of us, and we'd built adjacent tools in the past. That gave us conviction to go all in.

### Defining Scope

Shortly after getting started, we arrived at the realization that we can't build everything in 36 hours.

We listed every feature we wanted, then circled two in red:

1. **The IDE must be excellent.** Janky coding experience kills everything.
2. **The grading must be defensible.** We needed a rubric that measured real skills.

Everything else became secondary. We scrapped history, export to GitHub, the recruiter dashboard, and many more features. If we didn't have an incredible core experience, the rest wouldn't matter. In the end, this discipline saved us.

### The Chaos

On Sunday morning, we ubered to the venue to see what was going on and figure out how we were going to record the demo. We were all too sleep deprived to realize that it would've been much better to record the demo at the warehouse. This became immediately apparent when we arrived at the venue and there was still no WiFi.

We rushed outside, scrambling to find a good place to record our demo. We were surrounded by hundreds of hackers doing the same. We polished dozens of bugs and dealt with technical difficulties—low battery, audio cuts, WiFi issues. After an entire hour, we finally got the demo done and uploaded it to YouTube. We submitted with minutes to spare.

---

## What We Built

Instead of "reverse this linked list," candidates get challenges like:

> **Build a live markdown preview feature**
>
> Create a React component that shows live preview as the user types. Support basic markdown syntax (headers, bold, italic, links, code blocks). Make it look good—this is user-facing.
>
> Time: 60 minutes

This tests what actually matters:

- Do you understand building systems with real-world requirements in mind?
- Does your UI feel good?
- How do you handle edge cases?
- Can you leverage AI to move faster?

### The IDE

We built a fully-functional browser-based IDE with syntax highlighting, file management, a unix terminal, and live preview—everything a developer needs to build real features.

![VibeCheck IDE Interface](https://ethans.site/writing/vibecheck/ide.png "The VibeCheck IDE in action")

### AI-Powered Code Suggestions

The killer feature: candidates can chat with Claude directly in the IDE, and Claude doesn't just offer advice—it can suggest concrete code changes via tool calling.

We implemented this using the AI SDK's tool calling API. When Claude wants to edit a file, it calls our `editFileWithPatch` tool with a unified diff:

```typescript
// AI can suggest code changes via tool calling
const tools = {
  editFileWithPatch: tool({
    description: `Edit a file by applying a unified diff patch`,
    inputSchema: z.object({
      path: z.string(),
      diff: z.string().describe(`Unified diff format with context`),
      explanation: z.string().describe("What changes and why"),
    }),
    execute: async ({ path, diff, explanation }) => {
      return {
        path, diff, explanation,
        status: "pending_approval", // KEY: User must approve
        message: `Suggested edit to ${path}: ${explanation}`,
      };
    },
  }),
};

// In the UI, candidates see a diff viewer with Accept/Reject buttons
<DiffViewer
  edit={edit}
  onAccept={() => {
    const patched = applyDiff(originalContent, edit.diff);
    fileSystem.writeFileAsync(edit.path, patched);
  }}
  onReject={() => {
    console.log("User rejected AI suggestion");
  }}
/>
```

<div class="max-w-2xl mx-auto">
  <img src="https://ethans.site/writing/vibecheck/ai-inline-editor.png" alt="AI suggesting file changes via diff viewer" class="rounded-lg" />
</div>

### Evaluation System

Once candidates submit, they get graded across five dimensions:

1. **Code Quality**: Clean, maintainable, follows conventions
2. **Prompt Adherence**: Did they build what was asked?
3. **UX Decisions**: Is it usable? Does it handle edge cases?
4. **Architecture**: Sensible structure, proper separation of concerns
5. **AI Usage Effectiveness**: How well did they leverage AI?

We feed the candidate's code, the original prompt, and evaluation criteria to Claude. By 2 AM Saturday, candidates were getting nuanced, multi-dimensional feedback that actually helped them improve.

![Results Page](https://ethans.site/writing/vibecheck/results-page.png "Detailed evaluation results")

---

## What We Learned

### Technical Insights

**Claude Actually Evaluates Well??** With a well-designed rubric, Claude provided consistently insightful feedback across multiple dimensions.

**Browser-based development is hard.** Simulating real dev environments meant solving filesystem persistence, terminal emulation without real shells, package installation, and hot module reloading.

**Syncing file changes across three systems without infinite loops.** When you type in Monaco (the editor), it writes to ZenFS (persistent storage), which syncs to WebContainer (runtime), which broadcasts the change back... creating a loop. Our solution was just a 1-second grace period. This simple solution saved us from building complex event deduplication.

```typescript
// The challenge: syncing files across 3 systems without infinite loops
// ZenFS (persistent storage) ↔ WebContainer (runtime) ↔ Monaco (editor)

private EDITOR_WRITE_GRACE_PERIOD = 1000; // 1 second grace period

async writeFileAsync(path: string, content: string, context?: { source?: "editor" }) {
  // Record timestamp when editor writes
  if (context?.source === "editor") {
    this.editorWriteTimestamps.set(path, Date.now());
  }

  // Sync to both systems
  await Promise.all([
    zenFs.writeFile(path, content),
    webContainer.fs.writeFile(path, content),
  ]);
}

// When WebContainer broadcasts a change, check if it's from a recent editor write
private isRecentEditorWrite(path: string): boolean {
  const timestamp = this.editorWriteTimestamps.get(path);
  if (!timestamp) return false;

  const isRecent = Date.now() - timestamp < this.EDITOR_WRITE_GRACE_PERIOD;

  if (!isRecent) {
    this.editorWriteTimestamps.delete(path); // Cleanup
  }

  return isRecent;
}

// Only notify subscribers if change came from external source (not editor)
if (!isRecentEditorWrite(path)) {
  this.notifyFileChange(path);
}
```

**Event buffering saved our performance.** When you run `npm install`, the filesystem watcher fires hundreds of events per second. Processing each one individually would thrash the UI. This ~20-line utility batches events into 100ms windows while guaranteeing in-order processing:

```typescript
// Problem: File watchers fire hundreds of events during npm install
// Solution: Buffer events into 100ms batches

export function bufferWatchEvents<T>(
  timeInMs: number,
  cb: (events: T[]) => unknown
) {
  let events: T[] = [];
  let processing: Promise<unknown> = Promise.resolve();

  const scheduleBufferTick = () => {
    setTimeout(async () => {
      await processing; // Wait for previous batch (ordered processing)
      if (events.length > 0) {
        processing = Promise.resolve(cb(events));
      }
      events = [];
    }, timeInMs);
  };

  return (...args: T) => {
    events.push(args);
    if (!timeoutId) scheduleBufferTick();
  };
}

// Usage:
webContainer.watchPaths(
  { include: ["/workspace/**"] },
  bufferWatchEvents(100, (events) => {
    // Process batched events every 100ms
    for (const event of events.flat()) {
      handleFileChange(event);
    }
  })
);
```

### Execution Insights

**Solving your own problem makes all the difference.** We weren't building for some hypothetical user—we were building the platform we wished existed for our own interviews. This meant that we all implicitly knew what needed to be built and could be maximally efficient.

### Validation

The best validation came from conversations with other hackers.

One engineer told us he'd failed an interview for a fullstack engineer position. The interview? Three LeetCode hards. He blanked on one problem. Rejected.

"If they'd just given me a feature to build, I would've crushed it."

Every engineer we talked to had a version of this story. They didn't need us to explain the problem—they'd all lived it.

Founders running early-stage companies were even more interested. One told us: "I know LeetCode doesn't predict job performance, that's why I exclusively do work-trials." VibeCheck is here to automate that.

---

## What's Next

Software engineering is fundamentally changing. Great engineers today know how to:

- Prompt LLMs effectively
- Know what's slop and how to refine it
- Use AI for rapid prototyping
- Debug when AI leads them astray
- Architect systems at a high level and orchestrate AI where it makes sense

Traditional interviews test the old skills. VibeCheck tests the new ones.

We're figuring out what comes next—whether that's a platform for companies, a practice tool for engineers, an open-source framework, or just a proof of concept that interviews can be better.

---

## Acknowledgments

Thanks to my teammates—Evan Yu, Luke Griggs, and Aaronkhan Hubhachen—for shipping the impossible in 36 hours.

Thanks to Luke's brother for letting us crash at his apartment, [Incepto](https://incepto.house) for hosting me, Jared for opening up the warehouse when we needed space, and all the judges and organizers of Cal Hacks for creating an amazing event.

<div class="grid grid-cols-2 gap-4 my-6">
  <img src="https://ethans.site/writing/vibecheck/the-jarehouse.jpeg" alt="The Warehouse" style="width: 100%; max-height: 470px; object-fit: cover;" class="rounded-lg" />
  <img src="https://ethans.site/writing/vibecheck/rats.png" alt="Rats" style="width: 100%; max-height: 470px; object-fit: cover;" class="rounded-lg" />
</div>

---

## Links

Want to see VibeCheck? Check out our [Devpost](https://devpost.com/software/igotrejectedfrominternshipsbcicantleetcodesoimadethisplatfor), [GitHub](https://github.com/ngethan/vibecheck), and [demo](https://www.youtube.com/watch?v=KRYA-kEiXrc).

If you're a recruiter frustrated with your interview process, an engineer tired of LeetCode grinding, or a builder who thinks interviews should test real skills—let's talk.

---

_Built with Next.js, WebContainers, Monaco, zen-fs, Tailwind, shadcn, Drizzle, Postgres, and Claude via OpenRouter._

_Want to chat about the future of technical interviews? Find me on [LinkedIn](https://linkedin.com/in/ethanng) or reach out at hey [at] ethans [dot] site._
