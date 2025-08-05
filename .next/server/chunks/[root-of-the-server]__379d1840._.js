module.exports = {

"[project]/.next-internal/server/app/api/trading-analysis/route/actions.js [app-rsc] (server actions loader, ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
}}),
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}}),
"[project]/src/lib/tradingAI.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "analyzeChartData": (()=>analyzeChartData)
});
function analyzeChartData(data) {
    try {
        const { prices } = data;
        if (!prices || prices.length < 14) {
            throw new Error('Insufficient data. Need at least 14 data points for analysis.');
        }
        // Calculate RSI (Relative Strength Index)
        const rsi = calculateRSI(prices);
        // Calculate Moving Average
        const movingAverage = calculateSMA(prices, 14);
        // Calculate Support and Resistance levels
        const { support, resistance } = calculateSupportResistance(prices);
        // Determine trend based on RSI and price action
        const trend = determineTrend(prices, rsi, movingAverage);
        // Calculate confidence based on multiple factors
        const confidence = calculateConfidence(prices, rsi, trend);
        // Generate recommendation
        const recommendation = generateRecommendation(trend, rsi, confidence);
        return {
            trend,
            confidence: Math.min(confidence, 90),
            rsi,
            recommendation,
            supportLevel: support,
            resistanceLevel: resistance,
            movingAverage
        };
    } catch (error) {
        console.error('Error analyzing chart data:', error);
        throw error;
    }
}
function calculateRSI(prices, period = 14) {
    if (prices.length < period + 1) return 50;
    const gains = [];
    const losses = [];
    for(let i = 1; i < prices.length; i++){
        const change = prices[i] - prices[i - 1];
        gains.push(change > 0 ? change : 0);
        losses.push(change < 0 ? Math.abs(change) : 0);
    }
    const avgGain = gains.slice(-period).reduce((a, b)=>a + b, 0) / period;
    const avgLoss = losses.slice(-period).reduce((a, b)=>a + b, 0) / period;
    if (avgLoss === 0) return 100;
    const rs = avgGain / avgLoss;
    return Math.round(100 - 100 / (1 + rs));
}
function calculateSMA(prices, period) {
    if (prices.length < period) return prices[prices.length - 1];
    const sum = prices.slice(-period).reduce((a, b)=>a + b, 0);
    return sum / period;
}
function calculateSupportResistance(prices) {
    const sortedPrices = [
        ...prices
    ].sort((a, b)=>a - b);
    const support = sortedPrices[Math.floor(sortedPrices.length * 0.1)];
    const resistance = sortedPrices[Math.floor(sortedPrices.length * 0.9)];
    return {
        support,
        resistance
    };
}
function determineTrend(prices, rsi, ma) {
    const currentPrice = prices[prices.length - 1];
    const previousPrice = prices[prices.length - 2] || prices[prices.length - 1];
    // Price momentum
    const priceChange = (currentPrice - previousPrice) / previousPrice * 100;
    // RSI-based trend
    if (rsi > 70 && priceChange < 0) return 'down';
    if (rsi < 30 && priceChange > 0) return 'up';
    // Moving average crossover
    if (currentPrice > ma && priceChange > 0) return 'up';
    if (currentPrice < ma && priceChange < 0) return 'down';
    // Default based on recent price action
    const recentPrices = prices.slice(-5);
    const avgRecent = recentPrices.reduce((a, b)=>a + b, 0) / recentPrices.length;
    return avgRecent > ma ? 'up' : 'down';
}
function calculateConfidence(prices, rsi, trend) {
    let confidence = 50; // Base confidence
    // RSI extremes increase confidence
    if (rsi > 70 || rsi < 30) confidence += 20;
    // Strong price momentum increases confidence
    const priceChanges = [];
    for(let i = 1; i < prices.length; i++){
        priceChanges.push((prices[i] - prices[i - 1]) / prices[i - 1] * 100);
    }
    const avgChange = Math.abs(priceChanges.reduce((a, b)=>a + b, 0) / priceChanges.length);
    if (avgChange > 2) confidence += 15;
    // Consistent trend increases confidence
    const recentChanges = priceChanges.slice(-5);
    const consistentTrend = recentChanges.every((change)=>trend === 'up' && change > 0 || trend === 'down' && change < 0);
    if (consistentTrend) confidence += 15;
    return Math.min(confidence, 90);
}
function generateRecommendation(trend, rsi, confidence) {
    if (confidence < 60) {
        return "Market conditions unclear. Consider waiting for stronger signals.";
    }
    if (trend === 'up') {
        if (rsi < 30) return "Strong buy signal detected. Oversold conditions with upward momentum.";
        if (rsi < 50) return "Buy signal. Price showing upward momentum with room to grow.";
        return "Hold or take partial profits. Uptrend may be getting extended.";
    }
    if (trend === 'down') {
        if (rsi > 70) return "Strong sell signal detected. Overbought conditions with downward pressure.";
        if (rsi > 50) return "Sell signal. Price showing downward momentum.";
        return "Consider short positions or exit long positions. Downtrend confirmed.";
    }
    return "Market in consolidation. Wait for clear directional movement.";
}
}}),
"[project]/src/app/api/trading-analysis/route.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "GET": (()=>GET),
    "POST": (()=>POST)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tradingAI$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/tradingAI.ts [app-route] (ecmascript)");
;
;
async function POST(request) {
    try {
        const body = await request.json();
        if (!body.data || !Array.isArray(body.data)) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Invalid input. Expected { data: number[] }'
            }, {
                status: 400
            });
        }
        const chartData = {
            prices: body.data,
            timestamps: body.timestamps || []
        };
        const analysis = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tradingAI$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["analyzeChartData"])(chartData);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            analysis,
            dataPoints: body.data.length,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error('Trading analysis error:', error);
        if (error instanceof Error) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: error.message
            }, {
                status: 400
            });
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Internal server error'
        }, {
            status: 500
        });
    }
}
async function GET() {
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        message: 'Trading AI Analysis API',
        endpoints: {
            POST: '/api/trading-analysis',
            description: 'Analyze chart data and return trading insights',
            required: {
                data: 'Array of price data (numbers)'
            },
            optional: {
                timestamps: 'Array of timestamps'
            }
        }
    });
}
}}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__379d1840._.js.map