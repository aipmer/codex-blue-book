#!/usr/bin/env node
/**
 * Gemini 4 Token Cost & Budget Guardrail (Verified 2026-11-26)
 * Zero external dependencies. Exits with code 2 when estimated USD exceeds --budget.
 */

const PRICING_PER_1M = {
  'gemini-4-hydrogen': { input: 1.50, cached: 0.075, output: 7.50 },
  'gemini-4-neon':     { input: 3.00, cached: 0.15,  output: 15.00 },
  'gemini-4-carbon':   { input: 2.00, cached: 0.10,  output: 10.00 },
  'gemini-4-argon':    { input: 2.00, cached: 0.10,  output: 10.00, postDec1: { input: 4.00, cached: 0.20, output: 20.00 } }
};

function parseArgs(argv) {
  const args = {
    model: 'gemini-4-hydrogen',
    inputTokens: 0,
    cachedTokens: 0,
    outputTokens: 0,
    videoSeconds: 0,
    date: new Date().toISOString().slice(0, 10),
    budget: Infinity
  };
  for (let i = 0; i < argv.length; i++) {
    const k = argv[i];
    const v = argv[i + 1];
    if (k === '--model') { args.model = v; i++; }
    else if (k === '--input-tokens') { args.inputTokens = Number(v); i++; }
    else if (k === '--cached-tokens') { args.cachedTokens = Number(v); i++; }
    else if (k === '--output-tokens') { args.outputTokens = Number(v); i++; }
    else if (k === '--video-seconds') { args.videoSeconds = Number(v); i++; }
    else if (k === '--date') { args.date = v; i++; }
    else if (k === '--budget') { args.budget = Number(v); i++; }
  }
  return args;
}

const opts = parseArgs(process.argv.slice(2));
const spec = PRICING_PER_1M[opts.model];
if (!spec) {
  console.error(`Unknown model: ${opts.model}. Supported: ${Object.keys(PRICING_PER_1M).join(', ')}`);
  process.exit(1);
}

const isPostDec1 = opts.date >= '2026-12-01';
const rates = opts.model === 'gemini-4-argon' && isPostDec1 ? spec.postDec1 : spec;

// Standard 1 FPS video estimate (~258 tokens/frame + ~32 audio tokens/sec = ~290 tokens/sec)
const videoTokens = Math.round(opts.videoSeconds * 290);
const billableFreshInput = Math.max(0, opts.inputTokens + videoTokens - opts.cachedTokens);

const inputCost = (billableFreshInput / 1_000_000) * rates.input;
const cachedCost = (opts.cachedTokens / 1_000_000) * rates.cached;
const outputCost = (opts.outputTokens / 1_000_000) * rates.output;
const totalCost = inputCost + cachedCost + outputCost;

const report = {
  model: opts.model,
  pricingDate: opts.date,
  rateTier: opts.model === 'gemini-4-argon' ? (isPostDec1 ? 'standard-post-2026-12-01' : 'introductory-through-2026-11-30') : 'standard',
  tokens: {
    freshInput: billableFreshInput,
    cachedInput: opts.cachedTokens,
    videoEstimated: videoTokens,
    output: opts.outputTokens
  },
  estimatedUsd: Number(totalCost.toFixed(4)),
  budgetUsd: Number.isFinite(opts.budget) ? opts.budget : null,
  status: totalCost <= opts.budget ? 'PASS' : 'BLOCKED_OVER_BUDGET'
};

console.log(JSON.stringify(report, null, 2));
if (totalCost > opts.budget) {
  process.exit(2);
}
