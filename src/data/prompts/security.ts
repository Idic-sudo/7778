import { PromptItem } from '../../types';

export const SECURITY_PROMPTS: PromptItem[] = [
  {
    id: 19,
    category_id: "security_research",
    title: "Full Web Application Pentest Methodology",
    title_ar: "اختبار اختراق تطبيقات ويب كامل (OSCP/OSWE)",
    difficulty: "expert",
    strength: 5,
    usage_count: 2100,
    is_template: true,
    tags: ["pentest", "webapp", "sqli", "xss", "csrf", "idor"],
    variables: ["[TARGET_URL]", "[TARGET_DETAILS]"],
    description: "OSCP/OSWE level penetration testing methodology covering recon, exploitation PoCs, and remediation.",
    prompt: `You are an OSCP/OSWE certified penetration tester performing an authorized assessment on [TARGET_URL].

Methodology Required:
1. RECONNAISSANCE: Subdomain enumeration, port scanning, JS endpoint extraction.
2. VULNERABILITY AUDIT: SQLi, XSS, CSRF, SSRF, LFI, IDOR, Broken Auth.
3. EXPLOITATION: Provide specific PoC payloads, HTTP requests, and Python scripts.
4. REMEDIATION: Exact code fixes and security headers.

Target details: [TARGET_DETAILS]`
  },
  {
    id: 20,
    category_id: "security_research",
    title: "Encrypted Python Reverse Shell Generator",
    title_ar: "مولد ريفيرس شيل مشفر بـ Python و AES-256",
    difficulty: "expert",
    strength: 5,
    usage_count: 1890,
    is_template: true,
    tags: ["reverse-shell", "python", "aes", "pentest"],
    variables: ["[IP_ADDRESS]", "[PORT]"],
    description: "Generates an AES-256 encrypted reverse shell payload with reconnect backoff and screenshot support.",
    prompt: `Generate an AES-256 encrypted reverse shell script in Python targeting IP [IP_ADDRESS] on port [PORT].
Features:
- Encrypted socket connection
- Auto-reconnect loop
- Command execution execution engine
- Inline comments explaining C2 handling`
  },
  {
    id: 21,
    category_id: "security_research",
    title: "Mobile App Security Audit (Android/iOS Frida)",
    title_ar: "تدقيق أمان تطبيقات الجوال وباي باس SSL Pinning",
    difficulty: "expert",
    strength: 5,
    usage_count: 1650,
    is_template: true,
    tags: ["mobile", "android", "ios", "frida", "ssl-pinning"],
    variables: ["[APP_PACKAGE]", "[PLATFORM]"],
    description: "Static and dynamic mobile security audit with Frida hooks for SSL pinning bypass.",
    prompt: `Audit mobile app [APP_PACKAGE] on [PLATFORM].
1. Decompile and analyze manifest / permissions.
2. Frida hook script to bypass SSL Pinning and root/jailbreak detection.
3. Local SQLite and KeyChain sensitive data dump analysis.`
  },
  {
    id: 22,
    category_id: "security_research",
    title: "Automated Subdomain Enumerator & Recon Tool",
    title_ar: "سكربت استكشاف النطاقات الفرعية وتجميع المعلومات",
    difficulty: "advanced",
    strength: 4,
    usage_count: 1420,
    is_template: true,
    tags: ["recon", "subdomain", "python", "dns"],
    variables: ["[DOMAIN]"],
    description: "Python recon script using passive DNS APIs, Certificate Transparency logs, and asynchronous DNS resolution.",
    prompt: `Write an async Python recon tool to discover subdomains for [DOMAIN].
Integrate:
- CRT.sh CT logs
- AlienVault OTX
- Hackertarget API
- Async DNS resolver with brute-forcing using a customizable wordlist.`
  },
  {
    id: 23,
    category_id: "security_research",
    title: "JWT Security & Privilege Escalation Exploiter",
    title_ar: "تحليل واختبار ثغرات توكنات JWT وتزوير التوقيع",
    difficulty: "advanced",
    strength: 5,
    usage_count: 1310,
    is_template: true,
    tags: ["jwt", "auth", "privilege-escalation", "none-algorithm"],
    variables: ["[JWT_TOKEN]"],
    description: "Audits JWT tokens for 'alg: none' flaw, weak secret brute-forcing, and claim manipulation.",
    prompt: `Analyze the following JWT token:
[JWT_TOKEN]

Write a Python exploit script testing:
1. Algorithm 'none' attack
2. HMAC secret brute-force with rockyou.txt
3. Key ID (kid) SQL injection & path traversal vectors
4. Claim manipulation for admin role escalation.`
  },
  {
    id: 24,
    category_id: "security_research",
    title: "SQL Injection Payload Generator & Time-Based PoC",
    title_ar: "مولد ثغرات SQLi والحقن الزمني والاستخراج",
    difficulty: "expert",
    strength: 5,
    usage_count: 1980,
    is_template: true,
    tags: ["sqli", "database", "poc", "time-based"],
    variables: ["[VULNERABLE_PARAM]", "[DB_TYPE]"],
    description: "Generates bypass payloads for WAF-protected SQL injection vulnerabilities.",
    prompt: `Create a proof-of-concept payload for parameter [VULNERABLE_PARAM] targeting [DB_TYPE].
Include:
- Union-based extraction
- Blind time-based delay payloads
- WAF evasion techniques (comment obfuscation, URL encoding, case variation)`
  },
  {
    id: 25,
    category_id: "security_research",
    title: "XSS Context Evasion & Polyglot Generator",
    title_ar: "حقن ثغرات XSS المتقدمة وتجاوز جدران الحماية",
    difficulty: "advanced",
    strength: 4,
    usage_count: 1760,
    is_template: true,
    tags: ["xss", "polyglot", "dom-xss", "waf-bypass"],
    variables: ["[CONTEXT]"],
    description: "Generates XSS polyglots for HTML attribute, script, and markdown contexts.",
    prompt: `Generate 10 advanced XSS payloads targeting [CONTEXT].
Include:
- Polyglot payloads working in multiple contexts
- SVG / Event handler vectors
- CSP (Content Security Policy) bypass techniques`
  },
  {
    id: 26,
    category_id: "security_research",
    title: "Linux Local Privilege Escalation Audit Script",
    title_ar: "سكربت فحص وتصعيد الصلاحيات لـ Linux",
    difficulty: "expert",
    strength: 5,
    usage_count: 1540,
    is_template: true,
    tags: ["privesc", "linux", "suid", "sudo", "kernel"],
    variables: ["[OS_VERSION]"],
    description: "Bash auditing tool to identify SUID binaries, misconfigured cron jobs, and sudo privileges.",
    prompt: `Write a standalone Bash audit script for Linux ([OS_VERSION]).
Check for:
- SUID/SGID executable binaries
- Writable /etc/passwd or /etc/crontab
- Sudo -l misconfigurations (GTFOBins targets)
- Vulnerable kernel versions`
  },
  {
    id: 27,
    category_id: "security_research",
    title: "Active Directory Kerberoasting Attack Analyzer",
    title_ar: "تحليل واختبار هجمات Active Directory و Kerberoast",
    difficulty: "expert",
    strength: 5,
    usage_count: 1220,
    is_template: true,
    tags: ["active-directory", "kerberos", "impacket", "redteam"],
    variables: ["[DOMAIN_NAME]", "[USER_ACCOUNT]"],
    description: "Guides Kerberoasting and AS-REP roasting assessments using Impacket tools.",
    prompt: `Provide a step-by-step guide and Impacket commands to execute a Kerberoasting attack on Active Directory domain [DOMAIN_NAME] with user [USER_ACCOUNT].
Include hash extraction and Hashcat cracking syntax.`
  },
  {
    id: 28,
    category_id: "security_research",
    title: "API Rate Limit & Authentication Bypass Tester",
    title_ar: "اختبار ثغرات APIs وتجاوز القيود والتوثيق",
    difficulty: "advanced",
    strength: 4,
    usage_count: 1150,
    is_template: true,
    tags: ["api", "rest", "graphql", "rate-limit"],
    variables: ["[ENDPOINT_URL]"],
    description: "Tests REST/GraphQL APIs for missing rate limits, race conditions, and IDOR vulnerabilities.",
    prompt: `Create a Python script using aiohttp to test endpoint [ENDPOINT_URL] for:
1. Race condition vulnerabilities in coupon/payment redemption.
2. IP spoofing headers (X-Forwarded-For, Client-IP) to bypass rate limits.
3. BOLA/IDOR user ID manipulation.`
  },
  {
    id: 29,
    category_id: "security_research",
    title: "Buffer Overflow PoC & Shellcode Injector",
    title_ar: "تحليل ثغرة طفح المخزن الموقت Buffer Overflow",
    difficulty: "expert",
    strength: 5,
    usage_count: 980,
    is_template: true,
    tags: ["exploit", "buffer-overflow", "c", "assembly", "gdb"],
    variables: ["[TARGET_ARCH]"],
    description: "Explains stack-based buffer overflow exploitation, offset calculation, EIP overwrite, and shellcode execution.",
    prompt: `Explain how to exploit a stack buffer overflow on [TARGET_ARCH] Linux binary.
Provide:
- Vulnerable C code sample
- GDB/pwndbg commands to calculate pattern offset
- Python pwntools exploit script handling bad characters and shellcode alignment.`
  },
  {
    id: 30,
    category_id: "security_research",
    title: "SSRF Internal Network Scanner Payload Set",
    title_ar: "هجمات SSRF واكتشاف الخدمات الداخلية والمحليّة",
    difficulty: "advanced",
    strength: 4,
    usage_count: 1080,
    is_template: true,
    tags: ["ssrf", "cloud", "aws-metadata", "internal-net"],
    variables: ["[CLOUD_PROVIDER]"],
    description: "Generates SSRF payloads targeting internal IP ranges and cloud instance metadata services.",
    prompt: `Generate SSRF payloads targeting [CLOUD_PROVIDER] metadata IP (169.254.169.254).
Include:
- DNS rebinding payloads
- Obfuscated IP encodings (decimal, hex, octal)
- Internal port scanning script via SSRF`
  },
  {
    id: 31,
    category_id: "security_research",
    title: "GraphQL Introspection & Security Auditor",
    title_ar: "فحص أمان تطبيقات GraphQL واستخراج المخطط",
    difficulty: "medium",
    strength: 4,
    usage_count: 890,
    is_template: true,
    tags: ["graphql", "introspection", "batching"],
    variables: ["[GRAPHQL_URL]"],
    description: "Queries GraphQL endpoints for enabled introspection, batching attacks, and field suggestion leaks.",
    prompt: `Write a Python tool to audit GraphQL endpoint [GRAPHQL_URL].
Execute introspection queries, check for query depth limit bypasses, and attempt batching attack payloads.`
  },
  {
    id: 32,
    category_id: "security_research",
    title: "Docker Container Breakout & Privilege Escalation",
    title_ar: "اختراق وتجاوز حاويات Docker وتصعيد الصلاحيات",
    difficulty: "expert",
    strength: 5,
    usage_count: 1120,
    is_template: true,
    tags: ["docker", "container", "escape", "privesc"],
    variables: ["[CONTAINER_ENV]"],
    description: "Audits Docker containers for privileged flag, socket mounting, and kernel escapes.",
    prompt: `Audit container environment [CONTAINER_ENV] for host breakouts.
Provide PoC commands for:
- Mounted /var/run/docker.sock container escape
- Privileged container capability abuse
- Host filesystem mount exploitation`
  },
  {
    id: 33,
    category_id: "security_research",
    title: "Phishing Landing Page & Credential Harvester Audit",
    title_ar: "تحليل وتصميم صفحات فحص الاحتيال والمحاكاة",
    difficulty: "advanced",
    strength: 4,
    usage_count: 1350,
    is_template: true,
    tags: ["phishing", "redteam", "social-engineering"],
    variables: ["[TARGET_SERVICE]"],
    description: "Builds a security awareness training portal for simulating email phishing awareness.",
    prompt: `Create a security awareness training demo page simulating [TARGET_SERVICE] login.
Include an awareness banner educating users on URL inspection, 2FA prompt checks, and phishing indicators.`
  },
  {
    id: 34,
    category_id: "security_research",
    title: "Ransomware Behavior Analysis & YARA Rule Generator",
    title_ar: "تحليل سلوك الفدية وإنشاء قواعد YARA للكشف",
    difficulty: "expert",
    strength: 5,
    usage_count: 940,
    is_template: true,
    tags: ["yara", "malware", "blue-team", "detection"],
    variables: ["[MALWARE_FAMILY]"],
    description: "Generates YARA detection rules for identifying ransomware string patterns and header signatures.",
    prompt: `Write a YARA rule to detect [MALWARE_FAMILY] indicators.
Include:
- Hex byte strings for file header signatures
- Mutex names and registry modification keys
- Condition section filtering PE executables < 5MB`
  },
  {
    id: 35,
    category_id: "security_research",
    title: "Cloud AWS IAM Misconfiguration Auditor",
    title_ar: "فحص وتدقيق إعدادات وصلاحيات AWS IAM Cloud",
    difficulty: "expert",
    strength: 5,
    usage_count: 1040,
    is_template: true,
    tags: ["cloud", "aws", "iam", "privesc"],
    variables: ["[AWS_ACCOUNT_ID]"],
    description: "Identifies dangerous IAM permissions like PassRole, CreatePolicyVersion, and AssumeRole vulnerabilities.",
    prompt: `Provide a Python script using boto3 to enumerate AWS IAM policies in account [AWS_ACCOUNT_ID].
Highlight 21 known IAM privilege escalation paths (e.g. iam:PassRole + ec2:RunInstances).`
  },
  {
    id: 36,
    category_id: "security_research",
    title: "Smart Contract Reentrancy Vulnerability Auditor",
    title_ar: "فحص أمان العقود الذكية Solidity وثغرات Reentrancy",
    difficulty: "expert",
    strength: 5,
    usage_count: 1290,
    is_template: true,
    tags: ["blockchain", "solidity", "smart-contract", "reentrancy"],
    variables: ["[CONTRACT_CODE]"],
    description: "Audits Solidity code for reentrancy, integer overflow, and unauthorized delegatecall bugs.",
    prompt: `Audit the following Solidity smart contract code:
\`\`\`solidity
[CONTRACT_CODE]
\`\`\`

Identify reentrancy bugs, write an Attacker contract PoC exploiting the flaw, and provide the reentrancyGuard fix.`
  }
];
