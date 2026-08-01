import { PromptItem } from '../../types';

export const CODING_PROMPTS: PromptItem[] = [
  {
    id: 37,
    category_id: "coding",
    title: "Production Full-Stack Application Blueprint",
    title_ar: "تطبيق متكامل Full-Stack جاهز للإنتاج",
    difficulty: "expert",
    strength: 5,
    usage_count: 3200,
    is_template: true,
    tags: ["fullstack", "react", "node", "express", "docker"],
    variables: ["[APP_TYPE]", "[DATABASE]"],
    description: "Complete architectural roadmap and production codebase for modern web applications.",
    prompt: `Act as a Principal Full-Stack Software Engineer. Build a complete [APP_TYPE] application using React, Express, and [DATABASE].
Requirements:
1. Clean directory structure
2. REST API endpoints with validation
3. JWT Authentication & Refresh Tokens
4. Docker Compose orchestration`
  },
  {
    id: 38,
    category_id: "coding",
    title: "Clean Code & SOLID Refactoring Architect",
    title_ar: "إعادة هيكلة وتحسين كفاءة الكود SOLID",
    difficulty: "advanced",
    strength: 4,
    usage_count: 2450,
    is_template: true,
    tags: ["refactoring", "clean-code", "typescript", "solid"],
    variables: ["[CODE_SNIPPET]"],
    description: "Refactors legacy code to adhere strictly to SOLID design principles and clean code standards.",
    prompt: `Refactor the following code snippet according to SOLID design principles:
\`\`\`typescript
[CODE_SNIPPET]
\`\`\`
Provide clean TypeScript code, O(N) complexity analysis, and unit test cases.`
  },
  {
    id: 39,
    category_id: "coding",
    title: "High-Performance GraphQL API Server",
    title_ar: "خادم GraphQL API متقدم وسريع للأداء العالي",
    difficulty: "expert",
    strength: 5,
    usage_count: 1890,
    is_template: true,
    tags: ["graphql", "apollo", "node", "dataloader"],
    variables: ["[ENTITIES_LIST]"],
    description: "Builds Apollo GraphQL server with DataLoader for N+1 query prevention.",
    prompt: `Build a production Apollo GraphQL server in TypeScript for entities: [ENTITIES_LIST].
Include DataLoader batching to prevent N+1 queries, schema directives for auth, and pagination.`
  },
  {
    id: 40,
    category_id: "coding",
    title: "Microservices Architecture & Event-Driven Message Bus",
    title_ar: "معمارية الخدمات المصغرة Microservices والـ Kafka/RabbitMQ",
    difficulty: "expert",
    strength: 5,
    usage_count: 1720,
    is_template: true,
    tags: ["microservices", "kafka", "rabbitmq", "event-driven"],
    variables: ["[SYSTEM_NAME]"],
    description: "Architects event-driven microservices using Node.js/Go and RabbitMQ or Kafka.",
    prompt: `Design the microservices architecture for [SYSTEM_NAME].
Include:
- Service boundary diagram
- Event schemas for message queue (RabbitMQ/Kafka)
- API Gateway setup with rate limiting`
  },
  {
    id: 41,
    category_id: "coding",
    title: "React Modern Custom Hooks Library",
    title_ar: "مكتبة هوكس React Custom Hooks احترافية",
    difficulty: "advanced",
    strength: 4,
    usage_count: 2150,
    is_template: true,
    tags: ["react", "hooks", "typescript", "frontend"],
    variables: ["[HOOK_FEATURE]"],
    description: "Builds typed reusable React custom hooks for async operations, debounce, localstorage, and WebSocket.",
    prompt: `Create a fully typed TypeScript React hook for [HOOK_FEATURE].
Include clean cleanup logic, error states, loading states, and example component usage.`
  },
  {
    id: 42,
    category_id: "coding",
    title: "Rust High-Performance CLI Utility Generator",
    title_ar: "تطوير أدوات أسطر الأوامر السريعة بلغة Rust",
    difficulty: "expert",
    strength: 5,
    usage_count: 1450,
    is_template: true,
    tags: ["rust", "cli", "clap", "performance"],
    variables: ["[TOOL_PURPOSE]"],
    description: "Builds a fast, multithreaded CLI tool in Rust using Clap, Rayon, and Tokio.",
    prompt: `Write a high-performance CLI tool in Rust for [TOOL_PURPOSE].
Utilize \`clap\` for argument parsing, \`tokio\` for async I/O, and zero-cost abstraction patterns.`
  },
  {
    id: 43,
    category_id: "coding",
    title: "Next.js App Router & Server Actions Master Architecture",
    title_ar: "معمارية Next.js App Router و Server Actions الحديثة",
    difficulty: "expert",
    strength: 5,
    usage_count: 2890,
    is_template: true,
    tags: ["nextjs", "react", "server-actions", "tailwind"],
    variables: ["[PROJECT_SCOPE]"],
    description: "Full-stack Next.js project with App Router, Server Actions, Zod validation, and Prisma ORM.",
    prompt: `Architect a Next.js application for [PROJECT_SCOPE].
Implement:
- Server Components vs Client Components split
- Server Actions with Zod validation
- Prisma ORM database models`
  },
  {
    id: 44,
    category_id: "coding",
    title: "Golang High-Concurrency REST Microservice",
    title_ar: "مايكروسيرفس سريع ومعالج للتزامن بلغة Go",
    difficulty: "expert",
    strength: 5,
    usage_count: 1980,
    is_template: true,
    tags: ["golang", "gin", "goroutines", "backend"],
    variables: ["[SERVICE_NAME]"],
    description: "Golang service utilizing Gin framework, Goroutines, and Redis caching.",
    prompt: `Write a REST service in Go for [SERVICE_NAME].
Use Gin web framework, GORM database layer, Goroutines for background worker pool, and Redis caching.`
  },
  {
    id: 45,
    category_id: "coding",
    title: "Docker Multi-Stage Build & Kubernetes Manifest Generator",
    title_ar: "مولد ملفات Docker Multi-Stage و ملفات Kubernetes K8s",
    difficulty: "advanced",
    strength: 4,
    usage_count: 1820,
    is_template: true,
    tags: ["docker", "k8s", "devops", "deployment"],
    variables: ["[STACK_NAME]"],
    description: "Generates production Dockerfile with multi-stage builds and K8s Deployment/Service/Ingress YAML.",
    prompt: `Create Dockerfile and Kubernetes manifests for [STACK_NAME].
Features:
- Multi-stage Dockerfile minimizing image size (<100MB)
- K8s Deployment with HPA (Horizontal Pod Autoscaler)
- Ingress with TLS Cert-Manager config`
  },
  {
    id: 46,
    category_id: "coding",
    title: "SQL Query Optimizer & Index Tuning Architect",
    title_ar: "تحسين استعلامات SQL وتسريع قواعد البيانات",
    difficulty: "advanced",
    strength: 4,
    usage_count: 1650,
    is_template: true,
    tags: ["sql", "postgresql", "performance", "indexing"],
    variables: ["[SLOW_QUERY]"],
    description: "Analyzes EXPLAIN ANALYZE execution plans and suggests composite indexes and query rewriting.",
    prompt: `Analyze and optimize the following slow SQL query:
\`\`\`sql
[SLOW_QUERY]
\`\`\`
Provide execution plan analysis, index creation commands, and rewritten SQL.`
  },
  {
    id: 47,
    category_id: "coding",
    title: "Python FastAPI Async Microservice with Celery Tasks",
    title_ar: "مايكروسيرفس Python FastAPI ومعالجات المهام Celery",
    difficulty: "expert",
    strength: 5,
    usage_count: 2210,
    is_template: true,
    tags: ["python", "fastapi", "celery", "async"],
    variables: ["[TASK_TYPE]"],
    description: "Async FastAPI service with Pydantic validation and Celery background task workers.",
    prompt: `Create a FastAPI application with Celery background task processing for [TASK_TYPE].
Include OpenAPI docs configuration, async database session with SQLModel, and Redis broker.`
  },
  {
    id: 48,
    category_id: "coding",
    title: "State Management Engine (Zustand / Redux Toolkit)",
    title_ar: "إدارة الحالة المعقدة التطبيقات بحجم ضخم",
    difficulty: "medium",
    strength: 4,
    usage_count: 1740,
    is_template: true,
    tags: ["zustand", "redux", "state-management", "react"],
    variables: ["[STATE_DOMAIN]"],
    description: "Implements clean Zustand or RTK store with persistence middleware and selector optimization.",
    prompt: `Design a TypeScript Zustand store for [STATE_DOMAIN].
Include slice pattern, persist middleware, async actions, and memoized selectors.`
  },
  {
    id: 49,
    category_id: "coding",
    title: "Real-time WebSockets Server & Client Engine",
    title_ar: "تطبيق الاتصالات المباشرة WebSockets و Socket.io",
    difficulty: "expert",
    strength: 5,
    usage_count: 2100,
    is_template: true,
    tags: ["websockets", "socketio", "realtime", "node"],
    variables: ["[REALTIME_USECASE]"],
    description: "Real-time communication architecture using Node.js, Socket.io, and Redis pub/sub adapter.",
    prompt: `Build a real-time WebSocket backend and React client for [REALTIME_USECASE].
Features:
- Room join/leave handling
- Reconnection & message queuing
- Redis Adapter for multi-server scaling`
  },
  {
    id: 50,
    category_id: "coding",
    title: "Comprehensive Unit & E2E Testing Suite (Jest / Playwright)",
    title_ar: "مجموعة اختبارات الوحدة والاختبار الشامل Playwright",
    difficulty: "advanced",
    strength: 4,
    usage_count: 1390,
    is_template: true,
    tags: ["testing", "jest", "playwright", "cypress"],
    variables: ["[FEATURE_TO_TEST]"],
    description: "Generates Jest unit tests and Playwright end-to-end user flow test scripts.",
    prompt: `Write a testing suite for [FEATURE_TO_TEST].
Include:
1. Unit tests with Vitest/Jest covering edge cases and mocks
2. E2E test script with Playwright validating user interactions.`
  },
  {
    id: 51,
    category_id: "coding",
    title: "Tailwind CSS Responsive UI Component Library",
    title_ar: "مكتبة مكونات متجاوبة وعصرية بـ Tailwind CSS",
    difficulty: "medium",
    strength: 4,
    usage_count: 2600,
    is_template: true,
    tags: ["tailwind", "css", "ui", "responsive"],
    variables: ["[COMPONENT_NAME]"],
    description: "Creates accessible, responsive React components styled with Tailwind CSS utility classes.",
    prompt: `Build a fully accessible, dark-mode ready [COMPONENT_NAME] component in React with Tailwind CSS.
Include hover animations, keyboard navigation (a11y), and storybook variant controls.`
  },
  {
    id: 52,
    category_id: "coding",
    title: "Electron Cross-Platform Desktop Application Architecture",
    title_ar: "تطوير تطبيقات سطح المكتب الهجينة بـ Electron",
    difficulty: "advanced",
    strength: 4,
    usage_count: 1120,
    is_template: true,
    tags: ["electron", "desktop", "typescript", "react"],
    variables: ["[DESKTOP_APP_PURPOSE]"],
    description: "Structures Electron + React + TypeScript app with IPC main/renderer communication.",
    prompt: `Architect an Electron desktop app for [DESKTOP_APP_PURPOSE].
Setup secure IPC bridge (\`contextBridge\`), system tray integration, and auto-updater workflow.`
  },
  {
    id: 53,
    category_id: "coding",
    title: "Flutter & Dart Cross-Platform Mobile Blueprint",
    title_ar: "تطبيق جوال متكامل بـ Flutter و Bloc Pattern",
    difficulty: "expert",
    strength: 5,
    usage_count: 1840,
    is_template: true,
    tags: ["flutter", "dart", "mobile", "bloc"],
    variables: ["[MOBILE_APP_SCOPE]"],
    description: "Flutter application following Clean Architecture with BLoC state management.",
    prompt: `Build a Flutter app architecture for [MOBILE_APP_SCOPE].
Implement:
- BLoC pattern state management
- Repository pattern with Dio HTTP client
- GoRouter navigation setup`
  },
  {
    id: 54,
    category_id: "coding",
    title: "Stripe Payment Gateway Integration & Webhooks",
    title_ar: "ربط بوابة الدفع Stripe ومعالجة الـ Webhooks",
    difficulty: "expert",
    strength: 5,
    usage_count: 2310,
    is_template: true,
    tags: ["stripe", "payment", "webhooks", "billing"],
    variables: ["[SUBSCRIPTION_TYPE]"],
    description: "Complete Stripe Checkout and subscription billing backend with webhook signature verification.",
    prompt: `Build a Node.js + Stripe backend for handling [SUBSCRIPTION_TYPE].
Include:
- Creating checkout session
- Webhook handler verifying signatures
- Database customer subscription status sync`
  },
  {
    id: 55,
    category_id: "coding",
    title: "CI/CD Pipeline Matrix (GitHub Actions)",
    title_ar: "خط إنتاج وتطوير تلقائي CI/CD عبر GitHub Actions",
    difficulty: "advanced",
    strength: 4,
    usage_count: 1560,
    is_template: true,
    tags: ["github-actions", "cicd", "devops", "automation"],
    variables: ["[PROJECT_TYPE]"],
    description: "Generates workflow YAML for linting, testing, building, and deploying to AWS/GCP/Vercel.",
    prompt: `Create a comprehensive GitHub Actions YAML workflow for [PROJECT_TYPE].
Include lint, test, security vulnerability scan, build artifact, and deployment steps with caching.`
  },
  {
    id: 56,
    category_id: "coding",
    title: "C++ High-Performance Embedded / Game Logic Module",
    title_ar: "تطوير وحدات C++ لبرمجة الألعاب والأنظمة المدمجة",
    difficulty: "expert",
    strength: 5,
    usage_count: 980,
    is_template: true,
    tags: ["cpp", "performance", "memory-management", "game-dev"],
    variables: ["[LOGIC_REQUIREMENT]"],
    description: "Modern C++20 code utilizing RAII, smart pointers, and cache-friendly memory layouts.",
    prompt: `Write C++20 code for [LOGIC_REQUIREMENT].
Focus on zero-overhead abstractions, cache locality, std::unique_ptr memory safety, and SIMD optimization hints.`
  },
  {
    id: 57,
    category_id: "coding",
    title: "Elasticsearch Full-Text Search Engine & Indexing",
    title_ar: "محرك بحث وإندكسة متقدمة بـ Elasticsearch",
    difficulty: "expert",
    strength: 5,
    usage_count: 1250,
    is_template: true,
    tags: ["elasticsearch", "search", "indexing", "big-data"],
    variables: ["[SEARCH_DOMAIN]"],
    description: "Sets up Elasticsearch mapping, autocomplete suggestors, and multi-field fuzzy search queries.",
    prompt: `Design Elasticsearch index mappings and search queries for [SEARCH_DOMAIN].
Include fuzzy matching, multi-match boosting, and edge-ngram autocomplete setup.`
  },
  {
    id: 58,
    category_id: "coding",
    title: "Monorepo Setup (Turborepo / pnpm Workspaces)",
    title_ar: "إعداد مستودع موحد Monorepo بـ Turborepo",
    difficulty: "advanced",
    strength: 4,
    usage_count: 1410,
    is_template: true,
    tags: ["monorepo", "turborepo", "pnpm", "architecture"],
    variables: ["[PACKAGES_LIST]"],
    description: "Configures pnpm workspace monorepo with shared UI, shared config, and multiple apps.",
    prompt: `Configure a Turborepo + pnpm workspace for: [PACKAGES_LIST].
Include shared tsconfig, shared Tailwind UI package, and app build caching settings.`
  },
  {
    id: 59,
    category_id: "coding",
    title: "Redis Caching Strategy & Rate Limiter Middleware",
    title_ar: "إستراتيجية التخزين المؤقت وتحديد المعدل بـ Redis",
    difficulty: "advanced",
    strength: 4,
    usage_count: 1890,
    is_template: true,
    tags: ["redis", "caching", "rate-limiting", "middleware"],
    variables: ["[API_NAME]"],
    description: "Implements Redis sliding-window rate limiter and cache-aside query strategy.",
    prompt: `Implement Redis caching and sliding-window rate limiting middleware for [API_NAME] in Node.js.
Handle cache invalidation hooks and Redis connection reconnect handling.`
  },
  {
    id: 60,
    category_id: "coding",
    title: "WebAssembly (Wasm) Rust / C Module Integration",
    title_ar: "تطوير وحدات الويب السريعة WebAssembly Wasm",
    difficulty: "expert",
    strength: 5,
    usage_count: 1050,
    is_template: true,
    tags: ["wasm", "rust", "webassembly", "performance"],
    variables: ["[HEAVY_COMPUTATION]"],
    description: "Compiles Rust code to WebAssembly for browser execution of heavy math or image processing.",
    prompt: `Write a Rust Wasm module using \`wasm-bindgen\` to perform [HEAVY_COMPUTATION] in the browser.
Provide the Rust code and JS wrapper invocation snippet.`
  }
];
