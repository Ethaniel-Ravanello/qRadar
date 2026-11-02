import type { Squad } from '../types';

export const INITIAL_SQUADS: Squad[] = [
  {
    "id": "squad-hermes",
    "name": "Row 1: Squad Hermes (Fast Payment & API)",
    "alias": "Hermes",
    "leadPN": "PN 90185980 (Reza Pratama)",
    "sprint": "Sprint 28 (Day 7/10)",
    "sprintGoal": "Fast Checkout QRIS Cross-Border & Latency Callback Settlement <80ms",
    "zoneCenter": [
      1,
      0,
      18.9
    ],
    "zoneColor": "#0284c7",
    "metrics": {
      "totalStoryPoints": 72,
      "completedStoryPoints": 56,
      "defects": {
        "p1": 1,
        "p2": 2,
        "p3": 3
      },
      "approvals": {
        "brd": true,
        "sitSignOff": true,
        "uatSignOff": true,
        "secmanSignOff": false,
        "rfcDeployment": false
      },
      "pipeline": {
        "stage": "SECMAN",
        "health": "yellow",
        "sonarCoverage": 92.4
      }
    },
    "members": [
      {
        "id": "hermes-sl",
        "pn": "90185980",
        "name": "Reza Pratama",
        "role": "SL",
        "avatarColor": "#f59e0b",
        "deskPosition": [
          -6,
          0,
          18
        ],
        "rotationY": 3.141592653589793,
        "status": "active",
        "speechBubble": "Sprint 28 on-track! Target RFC deployment weekend ini siap.",
        "isBlocker": false,
        "jiraTickets": [
          {
            "key": "HRM-1100",
            "title": "Sprint Retrospective & RFC Deployment Review",
            "status": "In Progress",
            "storyPoints": 3,
            "priority": "High"
          },
          {
            "key": "HRM-1092",
            "title": "Secman Vulnerability Assessment Tracking",
            "status": "In Progress",
            "storyPoints": 5,
            "priority": "Highest"
          }
        ],
        "bitbucket": {
          "repo": "hermes-orchestrator",
          "branch": "release/v2.8.0",
          "activePR": "PR #142: Release candidate v2.8.0",
          "prStatus": "OPEN",
          "lastCommit": "30 mins ago by rpratama",
          "sonarScore": 94
        }
      },
      {
        "id": "hermes-sm",
        "pn": "90131102",
        "name": "Andi Wijaya",
        "role": "SM",
        "avatarColor": "#8b5cf6",
        "deskPosition": [
          -3.8,
          0,
          18
        ],
        "rotationY": 3.141592653589793,
        "status": "active",
        "speechBubble": "User story sprint 29 backlog grooming sudah siap di Jira.",
        "isBlocker": false,
        "jiraTickets": [
          {
            "key": "HRM-1110",
            "title": "BRD Cross-border QRIS Thailand Settlement",
            "status": "Done",
            "storyPoints": 5,
            "priority": "High"
          }
        ],
        "bitbucket": {
          "repo": "hermes-product-docs",
          "branch": "main",
          "activePR": null,
          "prStatus": null,
          "lastCommit": "Yesterday by awijaya",
          "sonarScore": 98
        }
      },
      {
        "id": "hermes-fe1",
        "pn": "90192831",
        "name": "Nadia Salsabila",
        "role": "FE",
        "avatarColor": "#ec4899",
        "deskPosition": [
          -6,
          0,
          19.8
        ],
        "rotationY": 0,
        "status": "active",
        "speechBubble": "🎨 Merchant Soundbox Audio Notification integration ready.",
        "isBlocker": false,
        "jiraTickets": [
          {
            "key": "HRM-1095",
            "title": "Merchant QRIS Dynamic Amount Keypad UI",
            "status": "In Review",
            "storyPoints": 5,
            "priority": "High"
          }
        ],
        "bitbucket": {
          "repo": "hermes-merchant-web",
          "branch": "feat/soundbox-audio-sync",
          "activePR": "PR #88: Add audio playback feedback",
          "prStatus": "OPEN",
          "lastCommit": "2 hours ago by nsalsa",
          "sonarScore": 95
        }
      },
      {
        "id": "hermes-fe2",
        "pn": "90188201",
        "name": "Kevin Sanjaya",
        "role": "FE",
        "avatarColor": "#db2777",
        "deskPosition": [
          -3.8,
          0,
          19.8
        ],
        "rotationY": 0,
        "status": "active",
        "speechBubble": "✨ QRIS Scanner Camera auto-focus & dark mode UI tested.",
        "isBlocker": false,
        "jiraTickets": [
          {
            "key": "HRM-1098",
            "title": "Dynamic QR Code Generator SVG & Canvas Render",
            "status": "Done",
            "storyPoints": 5,
            "priority": "High"
          }
        ],
        "bitbucket": {
          "repo": "hermes-customer-app",
          "branch": "fix/camera-permission-modal",
          "activePR": "PR #131: Android 14 camera check",
          "prStatus": "OPEN",
          "lastCommit": "3 hours ago by ksanjaya",
          "sonarScore": 91
        }
      },
      {
        "id": "hermes-be1",
        "pn": "90144120",
        "name": "Dimas Ardiansyah",
        "role": "BE",
        "avatarColor": "#3b82f6",
        "deskPosition": [
          3,
          0,
          18
        ],
        "rotationY": 3.141592653589793,
        "status": "blocked",
        "speechBubble": "⚠️ Blocker: Menunggu response API Switcher Mock Sandbox dari Partner.",
        "isBlocker": true,
        "jiraTickets": [
          {
            "key": "HRM-1088",
            "title": "Adapter Sandbox Switcher Settlement",
            "status": "In Progress",
            "storyPoints": 8,
            "priority": "Highest"
          }
        ],
        "bitbucket": {
          "repo": "hermes-payment-gateway",
          "branch": "feat/switcher-sandbox",
          "activePR": "PR #209: Support dynamic settlement response",
          "prStatus": "OPEN",
          "lastCommit": "1 hour ago by dimas_a",
          "sonarScore": 88
        }
      },
      {
        "id": "hermes-be2",
        "pn": "90152331",
        "name": "Rian Hidayat",
        "role": "BE",
        "avatarColor": "#2563eb",
        "deskPosition": [
          5.1,
          0,
          18
        ],
        "rotationY": 3.141592653589793,
        "status": "active",
        "speechBubble": "🚀 Webhook callback retry latency tembus 45ms (target <80ms).",
        "isBlocker": false,
        "jiraTickets": [
          {
            "key": "HRM-1090",
            "title": "Kafka Consumer Tuning for High-Volume Peak",
            "status": "In Review",
            "storyPoints": 5,
            "priority": "High"
          }
        ],
        "bitbucket": {
          "repo": "hermes-webhook-worker",
          "branch": "perf/kafka-consumer-tuning",
          "activePR": "PR #97: Batch commit partition Kafka",
          "prStatus": "OPEN",
          "lastCommit": "45 mins ago by rhidayat",
          "sonarScore": 92
        }
      },
      {
        "id": "hermes-qa1",
        "pn": "90177219",
        "name": "Budi Santoso",
        "role": "QA",
        "avatarColor": "#10b981",
        "deskPosition": [
          3,
          0,
          19.8
        ],
        "rotationY": 0,
        "status": "testing",
        "speechBubble": "🧪 Running automated regression 120 test cases on Payment API.",
        "isBlocker": false,
        "jiraTickets": [
          {
            "key": "HRM-1102",
            "title": "Automation Test Suite: Regression Payment API",
            "status": "In Progress",
            "storyPoints": 5,
            "priority": "High"
          }
        ],
        "bitbucket": {
          "repo": "hermes-automation-tests",
          "branch": "test/sprint-28-suite",
          "activePR": null,
          "prStatus": null,
          "lastCommit": "4 hours ago by budi_s",
          "sonarScore": 92
        }
      },
      {
        "id": "hermes-qa2",
        "pn": "90165412",
        "name": "Siti Rahma",
        "role": "QA",
        "avatarColor": "#059669",
        "deskPosition": [
          5.1,
          0,
          19.8
        ],
        "rotationY": 0,
        "status": "blocked",
        "speechBubble": "⚠️ Defect P1: Callback timeout saat transaksi di atas Rp 5.000.000.",
        "isBlocker": true,
        "jiraTickets": [
          {
            "key": "HRM-1108",
            "title": "BUG P1: High-value transaction timeout > 5000ms",
            "status": "In Progress",
            "storyPoints": 8,
            "priority": "Highest"
          }
        ],
        "bitbucket": {
          "repo": "hermes-perf-k6",
          "branch": "fix/high-value-timeout-test",
          "activePR": null,
          "prStatus": null,
          "lastCommit": "1 hour ago by srahma",
          "sonarScore": 89
        }
      }
    ]
  },
  {
    "id": "squad-red",
    "name": "Row 2: Squad Red (Risk, Fraud & Security)",
    "alias": "Red",
    "leadPN": "PN 90172031 (Bambang Soediro)",
    "sprint": "Sprint 34 (Day 6/10)",
    "sprintGoal": "Real-time AI Fraud Scoring Engine & Biometric Anti-Spoofing Detection",
    "zoneCenter": [
      1,
      0,
      14.7
    ],
    "zoneColor": "#ef4444",
    "metrics": {
      "totalStoryPoints": 85,
      "completedStoryPoints": 68,
      "defects": {
        "p1": 1,
        "p2": 1,
        "p3": 2
      },
      "approvals": {
        "brd": true,
        "sitSignOff": true,
        "uatSignOff": true,
        "secmanSignOff": true,
        "rfcDeployment": false
      },
      "pipeline": {
        "stage": "SECMAN",
        "health": "green",
        "sonarCoverage": 96.2
      }
    },
    "members": [
      {
        "id": "red-sl",
        "pn": "90172031",
        "name": "Bambang Soediro",
        "role": "SL",
        "avatarColor": "#f59e0b",
        "deskPosition": [
          -6,
          0,
          13.8
        ],
        "rotationY": 3.141592653589793,
        "status": "active",
        "speechBubble": "Fraud model XGBoost v4.1 berhasil lolos pengujian offline.",
        "isBlocker": false,
        "jiraTickets": [
          {
            "key": "RED-801",
            "title": "Model Risk Management (MRM) Sign-Off Presentation",
            "status": "Done",
            "storyPoints": 5,
            "priority": "High"
          }
        ],
        "bitbucket": {
          "repo": "red-fraud-engine",
          "branch": "release/v4.1.0",
          "activePR": "PR #310: XGBoost v4.1 inference pipeline",
          "prStatus": "OPEN",
          "lastCommit": "1 hour ago by bsoediro",
          "sonarScore": 96
        }
      },
      {
        "id": "red-sm",
        "pn": "90143890",
        "name": "Indah Kusuma",
        "role": "SM",
        "avatarColor": "#8b5cf6",
        "deskPosition": [
          -3.8,
          0,
          13.8
        ],
        "rotationY": 3.141592653589793,
        "status": "active",
        "speechBubble": "Review kepatuhan regulasi OJK POJK 24/2023 selesai.",
        "isBlocker": false,
        "jiraTickets": [
          {
            "key": "RED-815",
            "title": "OJK Compliance Matrix Gap Analysis",
            "status": "Done",
            "storyPoints": 3,
            "priority": "Medium"
          }
        ],
        "bitbucket": {
          "repo": "red-compliance-docs",
          "branch": "main",
          "activePR": null,
          "prStatus": null,
          "lastCommit": "3 hours ago by ikusuma",
          "sonarScore": 99
        }
      },
      {
        "id": "red-fe1",
        "pn": "90199120",
        "name": "Dewi Lestari",
        "role": "FE",
        "avatarColor": "#ec4899",
        "deskPosition": [
          -6,
          0,
          15.6
        ],
        "rotationY": 0,
        "status": "active",
        "speechBubble": "Dashboard Fraud Analyst alert feed dengan WebSocket sudah live.",
        "isBlocker": false,
        "jiraTickets": [
          {
            "key": "RED-820",
            "title": "Real-time WebSocket Live Alert Feed UI",
            "status": "In Review",
            "storyPoints": 5,
            "priority": "High"
          }
        ],
        "bitbucket": {
          "repo": "red-analyst-portal",
          "branch": "feat/live-alert-websocket",
          "activePR": "PR #74: WebSocket alert bell",
          "prStatus": "OPEN",
          "lastCommit": "2 hours ago by dlestari",
          "sonarScore": 94
        }
      },
      {
        "id": "red-fe2",
        "pn": "90184431",
        "name": "Fandi Ahmad",
        "role": "FE",
        "avatarColor": "#db2777",
        "deskPosition": [
          -3.8,
          0,
          15.6
        ],
        "rotationY": 0,
        "status": "active",
        "speechBubble": "Visualisasi Geo-Mapping IP Suspicious Transactions selesai.",
        "isBlocker": false,
        "jiraTickets": [
          {
            "key": "RED-825",
            "title": "Interactive Mapbox IP Geolocation Cluster",
            "status": "Done",
            "storyPoints": 5,
            "priority": "Medium"
          }
        ],
        "bitbucket": {
          "repo": "red-analyst-portal",
          "branch": "feat/mapbox-cluster",
          "activePR": null,
          "prStatus": null,
          "lastCommit": "Yesterday by fahmad",
          "sonarScore": 93
        }
      },
      {
        "id": "red-be1",
        "pn": "90151120",
        "name": "Agus Prasetyo",
        "role": "BE",
        "avatarColor": "#3b82f6",
        "deskPosition": [
          3,
          0,
          13.8
        ],
        "rotationY": 3.141592653589793,
        "status": "active",
        "speechBubble": "Flink real-time rule engine throughput tembus 12.000 TPS.",
        "isBlocker": false,
        "jiraTickets": [
          {
            "key": "RED-830",
            "title": "Apache Flink Stateful Stream Optimization",
            "status": "In Progress",
            "storyPoints": 8,
            "priority": "Highest"
          }
        ],
        "bitbucket": {
          "repo": "red-stream-processor",
          "branch": "perf/flink-tuning",
          "activePR": "PR #108: RocksDB state backend tune",
          "prStatus": "OPEN",
          "lastCommit": "40 mins ago by aprasetyo",
          "sonarScore": 95
        }
      },
      {
        "id": "red-be2",
        "pn": "90163301",
        "name": "Gilang Ramadhan",
        "role": "BE",
        "avatarColor": "#2563eb",
        "deskPosition": [
          5.1,
          0,
          13.8
        ],
        "rotationY": 3.141592653589793,
        "status": "blocked",
        "speechBubble": "⚠️ Blocker: Redis cluster cache memory spike >95% di staging SIT.",
        "isBlocker": true,
        "jiraTickets": [
          {
            "key": "RED-834",
            "title": "BUG: Redis OOM eviction loop during heavy stress",
            "status": "In Progress",
            "storyPoints": 8,
            "priority": "Highest"
          }
        ],
        "bitbucket": {
          "repo": "red-cache-layer",
          "branch": "fix/redis-memory-leak",
          "activePR": "PR #52: Add key TTL on device fingerprints",
          "prStatus": "OPEN",
          "lastCommit": "20 mins ago by gramadhan",
          "sonarScore": 87
        }
      },
      {
        "id": "red-qa1",
        "pn": "90175542",
        "name": "Lestari Handayani",
        "role": "QA",
        "avatarColor": "#10b981",
        "deskPosition": [
          3,
          0,
          15.6
        ],
        "rotationY": 0,
        "status": "testing",
        "speechBubble": "Penetration testing payload SQL injection & XSS bypass safe.",
        "isBlocker": false,
        "jiraTickets": [
          {
            "key": "RED-840",
            "title": "Dynamic Application Security Testing (DAST)",
            "status": "In Progress",
            "storyPoints": 5,
            "priority": "High"
          }
        ],
        "bitbucket": {
          "repo": "red-security-tests",
          "branch": "sec/owasp-top-10",
          "activePR": null,
          "prStatus": null,
          "lastCommit": "3 hours ago by lhandayani",
          "sonarScore": 98
        }
      },
      {
        "id": "red-qa2",
        "pn": "90146670",
        "name": "Rudi Hermawan",
        "role": "QA",
        "avatarColor": "#059669",
        "deskPosition": [
          5.1,
          0,
          15.6
        ],
        "rotationY": 0,
        "status": "active",
        "speechBubble": "Scenario testing synthetic device spoofing 100% terdeteksi AI.",
        "isBlocker": false,
        "jiraTickets": [
          {
            "key": "RED-845",
            "title": "Biometric Anti-Spoofing Scenario Benchmark",
            "status": "Done",
            "storyPoints": 5,
            "priority": "High"
          }
        ],
        "bitbucket": {
          "repo": "red-security-tests",
          "branch": "test/biometric-suite",
          "activePR": null,
          "prStatus": null,
          "lastCommit": "Yesterday by rhermawan",
          "sonarScore": 94
        }
      }
    ]
  },
  {
    "id": "squad-slytherin",
    "name": "Row 3: Squad Slytherin (Core Ledger & Wealth)",
    "alias": "Slytherin",
    "leadPN": "PN 90164890 (Citra Dewi)",
    "sprint": "Sprint 19 (Day 5/10)",
    "sprintGoal": "Multi-Currency High-Yield Ledger & Vault HSM Key Rotation Compliance",
    "zoneCenter": [
      1,
      0,
      10.5
    ],
    "zoneColor": "#10b981",
    "metrics": {
      "totalStoryPoints": 80,
      "completedStoryPoints": 62,
      "defects": {
        "p1": 0,
        "p2": 2,
        "p3": 1
      },
      "approvals": {
        "brd": true,
        "sitSignOff": true,
        "uatSignOff": false,
        "secmanSignOff": false,
        "rfcDeployment": false
      },
      "pipeline": {
        "stage": "SIT",
        "health": "green",
        "sonarCoverage": 94.1
      }
    },
    "members": [
      {
        "id": "slytherin-sl",
        "pn": "90164890",
        "name": "Citra Dewi",
        "role": "SL",
        "avatarColor": "#f59e0b",
        "deskPosition": [
          -6,
          0,
          9.6
        ],
        "rotationY": 3.141592653589793,
        "status": "active",
        "speechBubble": "Audit arsitektur Multi-Currency Ledger bersama BI berjalan lancar.",
        "isBlocker": false,
        "jiraTickets": [
          {
            "key": "SLY-1090",
            "title": "Multi-Currency Vault Architecture Compliance",
            "status": "In Progress",
            "storyPoints": 8,
            "priority": "Highest"
          }
        ],
        "bitbucket": {
          "repo": "slytherin-ledger-core",
          "branch": "release/v1.9.0",
          "activePR": "PR #112: Core ledger release candidate",
          "prStatus": "OPEN",
          "lastCommit": "1 hour ago by cdewi",
          "sonarScore": 97
        }
      },
      {
        "id": "slytherin-sm",
        "pn": "90138902",
        "name": "Bagus Setiawan",
        "role": "SM",
        "avatarColor": "#8b5cf6",
        "deskPosition": [
          -3.8,
          0,
          9.6
        ],
        "rotationY": 3.141592653589793,
        "status": "active",
        "speechBubble": "Daily standup done! Target SIT sign-off lusa tercapai.",
        "isBlocker": false,
        "jiraTickets": [
          {
            "key": "SLY-1102",
            "title": "Sprint 19 Retrospective Action Items Tracking",
            "status": "In Progress",
            "storyPoints": 3,
            "priority": "Medium"
          }
        ],
        "bitbucket": {
          "repo": "slytherin-docs",
          "branch": "main",
          "activePR": null,
          "prStatus": null,
          "lastCommit": "4 hours ago by bsetiawan",
          "sonarScore": 96
        }
      },
      {
        "id": "slytherin-fe1",
        "pn": "90197721",
        "name": "Maya Anggraini",
        "role": "FE",
        "avatarColor": "#ec4899",
        "deskPosition": [
          -6,
          0,
          11.4
        ],
        "rotationY": 0,
        "status": "active",
        "speechBubble": "Chart portofolio saldo mutasi multi-currency di BRImo selesai.",
        "isBlocker": false,
        "jiraTickets": [
          {
            "key": "SLY-1108",
            "title": "Multi-currency Balance Card & Chart Component",
            "status": "Done",
            "storyPoints": 5,
            "priority": "High"
          }
        ],
        "bitbucket": {
          "repo": "slytherin-wealth-ui",
          "branch": "feat/balance-card",
          "activePR": null,
          "prStatus": null,
          "lastCommit": "Yesterday by manggraini",
          "sonarScore": 95
        }
      },
      {
        "id": "slytherin-fe2",
        "pn": "90186640",
        "name": "Alif Pratama",
        "role": "FE",
        "avatarColor": "#db2777",
        "deskPosition": [
          -3.8,
          0,
          11.4
        ],
        "rotationY": 0,
        "status": "active",
        "speechBubble": "Modal konfirmasi konversi valas & real-time rate ticker ready.",
        "isBlocker": false,
        "jiraTickets": [
          {
            "key": "SLY-1115",
            "title": "Real-time FX Rate Live Ticker Feed",
            "status": "In Review",
            "storyPoints": 5,
            "priority": "High"
          }
        ],
        "bitbucket": {
          "repo": "slytherin-wealth-ui",
          "branch": "feat/fx-live-ticker",
          "activePR": "PR #45: FX ticker polling integration",
          "prStatus": "OPEN",
          "lastCommit": "2 hours ago by apratama",
          "sonarScore": 92
        }
      },
      {
        "id": "slytherin-be1",
        "pn": "90159930",
        "name": "Satria Wicaksono",
        "role": "BE",
        "avatarColor": "#3b82f6",
        "deskPosition": [
          3,
          0,
          9.6
        ],
        "rotationY": 3.141592653589793,
        "status": "active",
        "speechBubble": "Double-entry bookkeeping engine ACID guarantee 100% verified.",
        "isBlocker": false,
        "jiraTickets": [
          {
            "key": "SLY-1120",
            "title": "ACID Double-Entry Posting Isolation Level Fix",
            "status": "Done",
            "storyPoints": 8,
            "priority": "Highest"
          }
        ],
        "bitbucket": {
          "repo": "slytherin-ledger-core",
          "branch": "perf/acid-isolation",
          "activePR": null,
          "prStatus": null,
          "lastCommit": "3 hours ago by swicaksono",
          "sonarScore": 98
        }
      },
      {
        "id": "slytherin-be2",
        "pn": "90148812",
        "name": "Arif Budiman",
        "role": "BE",
        "avatarColor": "#2563eb",
        "deskPosition": [
          5.1,
          0,
          9.6
        ],
        "rotationY": 3.141592653589793,
        "status": "active",
        "speechBubble": "Thales Luna HSM key rotation batch worker running lancar.",
        "isBlocker": false,
        "jiraTickets": [
          {
            "key": "SLY-1125",
            "title": "HSM Vault Automated Key Rotation Worker",
            "status": "In Progress",
            "storyPoints": 5,
            "priority": "High"
          }
        ],
        "bitbucket": {
          "repo": "slytherin-hsm-vault",
          "branch": "feat/auto-rotation",
          "activePR": "PR #38: HSM PKCS#11 driver update",
          "prStatus": "OPEN",
          "lastCommit": "1 hour ago by abudiman",
          "sonarScore": 93
        }
      },
      {
        "id": "slytherin-qa1",
        "pn": "90173321",
        "name": "Putri Amelia",
        "role": "QA",
        "avatarColor": "#10b981",
        "deskPosition": [
          3,
          0,
          11.4
        ],
        "rotationY": 0,
        "status": "testing",
        "speechBubble": "Testing negative balance injection scenario dicegah ledger.",
        "isBlocker": false,
        "jiraTickets": [
          {
            "key": "SLY-1130",
            "title": "Negative Balance Edge Cases Test Suite",
            "status": "In Progress",
            "storyPoints": 5,
            "priority": "High"
          }
        ],
        "bitbucket": {
          "repo": "slytherin-test-automation",
          "branch": "test/negative-balance",
          "activePR": null,
          "prStatus": null,
          "lastCommit": "5 hours ago by pamelia",
          "sonarScore": 94
        }
      },
      {
        "id": "slytherin-qa2",
        "pn": "90132210",
        "name": "Danang Saputra",
        "role": "QA",
        "avatarColor": "#059669",
        "deskPosition": [
          5.1,
          0,
          11.4
        ],
        "rotationY": 0,
        "status": "idle",
        "speechBubble": "☕ Regression batch settlement selesai, standby review tiket Jira.",
        "isBlocker": false,
        "jiraTickets": [
          {
            "key": "SLY-1135",
            "title": "EOD Settlement Automation Checklist",
            "status": "Done",
            "storyPoints": 3,
            "priority": "Medium"
          }
        ],
        "bitbucket": {
          "repo": "slytherin-test-automation",
          "branch": "main",
          "activePR": null,
          "prStatus": null,
          "lastCommit": "Yesterday by dsaputra",
          "sonarScore": 95
        }
      }
    ]
  },
  {
    "id": "squad-pegasus",
    "name": "Row 4: Squad Pegasus (QRIS Soundbox & IoT)",
    "alias": "Pegasus",
    "leadPN": "PN 90145220 (Hendro Nugroho)",
    "sprint": "Sprint 22 (Day 4/10)",
    "sprintGoal": "MQTT Voice Playback Optimization & Soundbox Dynamic Firmware v3.2",
    "zoneCenter": [
      1,
      0,
      6.3
    ],
    "zoneColor": "#8b5cf6",
    "metrics": {
      "totalStoryPoints": 68,
      "completedStoryPoints": 44,
      "defects": {
        "p1": 1,
        "p2": 2,
        "p3": 0
      },
      "approvals": {
        "brd": true,
        "sitSignOff": true,
        "uatSignOff": false,
        "secmanSignOff": false,
        "rfcDeployment": false
      },
      "pipeline": {
        "stage": "SIT",
        "health": "yellow",
        "sonarCoverage": 91.8
      }
    },
    "members": [
      {
        "id": "pegasus-sl",
        "pn": "90145220",
        "name": "Hendro Nugroho",
        "role": "SL",
        "avatarColor": "#f59e0b",
        "deskPosition": [
          -6,
          0,
          5.4
        ],
        "rotationY": 3.141592653589793,
        "status": "active",
        "speechBubble": "Rollout 50.000 Soundbox ke merchant Pasar Senen siap dieksekusi.",
        "isBlocker": false,
        "jiraTickets": [
          {
            "key": "PEG-401",
            "title": "Soundbox Firmware v3.2 OTA Deployment Plan",
            "status": "In Progress",
            "storyPoints": 5,
            "priority": "High"
          }
        ],
        "bitbucket": {
          "repo": "pegasus-iot-gateway",
          "branch": "release/v3.2.0",
          "activePR": "PR #89: MQTT broker clustering",
          "prStatus": "OPEN",
          "lastCommit": "1 hour ago by hnugroho",
          "sonarScore": 92
        }
      },
      {
        "id": "pegasus-sm",
        "pn": "90155112",
        "name": "Ratna Juwita",
        "role": "SM",
        "avatarColor": "#8b5cf6",
        "deskPosition": [
          -3.8,
          0,
          5.4
        ],
        "rotationY": 3.141592653589793,
        "status": "active",
        "speechBubble": "Sertifikasi Postel & SDPPI Kominfo untuk modul 4G LTE rampung.",
        "isBlocker": false,
        "jiraTickets": [
          {
            "key": "PEG-405",
            "title": "Kominfo SDPPI Certification Clearance",
            "status": "Done",
            "storyPoints": 3,
            "priority": "Medium"
          }
        ],
        "bitbucket": {
          "repo": "pegasus-compliance",
          "branch": "main",
          "activePR": null,
          "prStatus": null,
          "lastCommit": "Yesterday by rjuwita",
          "sonarScore": 99
        }
      },
      {
        "id": "pegasus-fe1",
        "pn": "90188443",
        "name": "Bayu Wibowo",
        "role": "FE",
        "avatarColor": "#ec4899",
        "deskPosition": [
          -6,
          0,
          7.2
        ],
        "rotationY": 0,
        "status": "active",
        "speechBubble": "Web portal monitoring status baterai & sinyal Soundbox merchant live.",
        "isBlocker": false,
        "jiraTickets": [
          {
            "key": "PEG-410",
            "title": "Merchant Device Telemetry Dashboard",
            "status": "In Review",
            "storyPoints": 5,
            "priority": "High"
          }
        ],
        "bitbucket": {
          "repo": "pegasus-device-manager",
          "branch": "feat/battery-health-widget",
          "activePR": "PR #42: Real-time RSSI signal",
          "prStatus": "OPEN",
          "lastCommit": "2 hours ago by bwibowo",
          "sonarScore": 94
        }
      },
      {
        "id": "pegasus-fe2",
        "pn": "90199211",
        "name": "Tari Permata",
        "role": "FE",
        "avatarColor": "#db2777",
        "deskPosition": [
          -3.8,
          0,
          7.2
        ],
        "rotationY": 0,
        "status": "active",
        "speechBubble": "Audio sound wave generator & volume setting remote UI tested.",
        "isBlocker": false,
        "jiraTickets": [
          {
            "key": "PEG-415",
            "title": "Remote Volume Adjustment Slider Component",
            "status": "Done",
            "storyPoints": 3,
            "priority": "Medium"
          }
        ],
        "bitbucket": {
          "repo": "pegasus-device-manager",
          "branch": "feat/volume-slider",
          "activePR": null,
          "prStatus": null,
          "lastCommit": "Yesterday by tpermata",
          "sonarScore": 90
        }
      },
      {
        "id": "pegasus-be1",
        "pn": "90166220",
        "name": "Iqbal Maulana",
        "role": "BE",
        "avatarColor": "#3b82f6",
        "deskPosition": [
          3,
          0,
          5.4
        ],
        "rotationY": 3.141592653589793,
        "status": "active",
        "speechBubble": "EMQX broker cluster throughput 40.000 concurrent MQTT connections.",
        "isBlocker": false,
        "jiraTickets": [
          {
            "key": "PEG-420",
            "title": "EMQX Enterprise MQTT Cluster Tuning",
            "status": "In Progress",
            "storyPoints": 8,
            "priority": "Highest"
          }
        ],
        "bitbucket": {
          "repo": "pegasus-mqtt-broker",
          "branch": "perf/emqx-cluster",
          "activePR": "PR #122: Optimize keepalive timeout",
          "prStatus": "OPEN",
          "lastCommit": "30 mins ago by imaulana",
          "sonarScore": 95
        }
      },
      {
        "id": "pegasus-be2",
        "pn": "90177332",
        "name": "Gita Savitri",
        "role": "BE",
        "avatarColor": "#2563eb",
        "deskPosition": [
          5.1,
          0,
          5.4
        ],
        "rotationY": 3.141592653589793,
        "status": "active",
        "speechBubble": "Dynamic text-to-speech bahasa daerah (Jawa, Sunda, Minang) selesai.",
        "isBlocker": false,
        "jiraTickets": [
          {
            "key": "PEG-425",
            "title": "Regional Language TTS Audio Synthesizer",
            "status": "In Review",
            "storyPoints": 5,
            "priority": "High"
          }
        ],
        "bitbucket": {
          "repo": "pegasus-audio-engine",
          "branch": "feat/regional-tts",
          "activePR": "PR #67: Add Javanese voice model",
          "prStatus": "OPEN",
          "lastCommit": "3 hours ago by gsavitri",
          "sonarScore": 93
        }
      },
      {
        "id": "pegasus-qa1",
        "pn": "90144331",
        "name": "Wahyu Hidayat",
        "role": "QA",
        "avatarColor": "#10b981",
        "deskPosition": [
          3,
          0,
          7.2
        ],
        "rotationY": 0,
        "status": "testing",
        "speechBubble": "Testing soundbox audio latency di jaringan 2G/EDGE marginal.",
        "isBlocker": false,
        "jiraTickets": [
          {
            "key": "PEG-430",
            "title": "Network Bandwidth Throttling 2G/EDGE Stress Test",
            "status": "In Progress",
            "storyPoints": 5,
            "priority": "High"
          }
        ],
        "bitbucket": {
          "repo": "pegasus-iot-tests",
          "branch": "test/edge-network",
          "activePR": null,
          "prStatus": null,
          "lastCommit": "4 hours ago by whidayat",
          "sonarScore": 91
        }
      },
      {
        "id": "pegasus-qa2",
        "pn": "90133221",
        "name": "Dian Pratiwi",
        "role": "QA",
        "avatarColor": "#059669",
        "deskPosition": [
          5.1,
          0,
          7.2
        ],
        "rotationY": 0,
        "status": "blocked",
        "speechBubble": "⚠️ Defect P1: Audio notifikasi double play saat sinyal merchant flapping.",
        "isBlocker": true,
        "jiraTickets": [
          {
            "key": "PEG-435",
            "title": "BUG P1: MQTT QoS 1 Duplicate Message Audio Replay",
            "status": "In Progress",
            "storyPoints": 8,
            "priority": "Highest"
          }
        ],
        "bitbucket": {
          "repo": "pegasus-iot-tests",
          "branch": "fix/deduplication-test",
          "activePR": null,
          "prStatus": null,
          "lastCommit": "1 hour ago by dpratiwi",
          "sonarScore": 88
        }
      }
    ]
  },
  {
    "id": "squad-athena",
    "name": "Row 5: Squad Athena (Merchant Portal & Onboarding)",
    "alias": "Athena",
    "leadPN": "PN 90188912 (Vina Panduwinata)",
    "sprint": "Sprint 15 (Day 8/10)",
    "sprintGoal": "Instant Merchant KYC Verification & QRIS Multi-Outlet Hierarchy Portal",
    "zoneCenter": [
      1,
      0,
      2.1
    ],
    "zoneColor": "#f59e0b",
    "metrics": {
      "totalStoryPoints": 75,
      "completedStoryPoints": 65,
      "defects": {
        "p1": 0,
        "p2": 1,
        "p3": 2
      },
      "approvals": {
        "brd": true,
        "sitSignOff": true,
        "uatSignOff": true,
        "secmanSignOff": true,
        "rfcDeployment": false
      },
      "pipeline": {
        "stage": "PROD_READY",
        "health": "green",
        "sonarCoverage": 95.3
      }
    },
    "members": [
      {
        "id": "athena-sl",
        "pn": "90188912",
        "name": "Vina Panduwinata",
        "role": "SL",
        "avatarColor": "#f59e0b",
        "deskPosition": [
          -6,
          0,
          1.2
        ],
        "rotationY": 3.141592653589793,
        "status": "active",
        "speechBubble": "Merchant onboarding SLA turun dari 3 hari menjadi 15 menit instan!",
        "isBlocker": false,
        "jiraTickets": [
          {
            "key": "ATH-301",
            "title": "Instant KYC Merchant SLA Target Optimization",
            "status": "Done",
            "storyPoints": 5,
            "priority": "Highest"
          }
        ],
        "bitbucket": {
          "repo": "athena-merchant-core",
          "branch": "release/v1.5.0",
          "activePR": "PR #150: Instant merchant approval pipeline",
          "prStatus": "OPEN",
          "lastCommit": "2 hours ago by vpandu",
          "sonarScore": 96
        }
      },
      {
        "id": "athena-sm",
        "pn": "90166440",
        "name": "Yoga Pratama",
        "role": "SM",
        "avatarColor": "#8b5cf6",
        "deskPosition": [
          -3.8,
          0,
          1.2
        ],
        "rotationY": 3.141592653589793,
        "status": "active",
        "speechBubble": "User acceptance test bersama tim Divisi Bisnis Mikro BRI selesai.",
        "isBlocker": false,
        "jiraTickets": [
          {
            "key": "ATH-305",
            "title": "UAT Sign-off Signatures Micro Business Dept",
            "status": "Done",
            "storyPoints": 3,
            "priority": "High"
          }
        ],
        "bitbucket": {
          "repo": "athena-product",
          "branch": "main",
          "activePR": null,
          "prStatus": null,
          "lastCommit": "Yesterday by ypratama",
          "sonarScore": 98
        }
      },
      {
        "id": "athena-fe1",
        "pn": "90199332",
        "name": "Siska Wahyuni",
        "role": "FE",
        "avatarColor": "#ec4899",
        "deskPosition": [
          -6,
          0,
          3
        ],
        "rotationY": 0,
        "status": "active",
        "speechBubble": "Form registrasi QRIS Merchant dengan auto-fill Dukcapil & NPWP lancar.",
        "isBlocker": false,
        "jiraTickets": [
          {
            "key": "ATH-310",
            "title": "Auto-fill KTP OCR & Dukcapil Form Validation",
            "status": "Done",
            "storyPoints": 5,
            "priority": "High"
          }
        ],
        "bitbucket": {
          "repo": "athena-portal-web",
          "branch": "feat/ocr-autofill",
          "activePR": null,
          "prStatus": null,
          "lastCommit": "3 hours ago by swahyuni",
          "sonarScore": 94
        }
      },
      {
        "id": "athena-fe2",
        "pn": "90177443",
        "name": "Aditya Nugraha",
        "role": "FE",
        "avatarColor": "#db2777",
        "deskPosition": [
          -3.8,
          0,
          3
        ],
        "rotationY": 0,
        "status": "active",
        "speechBubble": "Hierarki multi-outlet cabang & kasir permissions role matrix siap.",
        "isBlocker": false,
        "jiraTickets": [
          {
            "key": "ATH-315",
            "title": "Multi-outlet Branch & Cashier RBAC Grid",
            "status": "In Review",
            "storyPoints": 5,
            "priority": "High"
          }
        ],
        "bitbucket": {
          "repo": "athena-portal-web",
          "branch": "feat/rbac-outlets",
          "activePR": "PR #92: Treeview multi-outlet structure",
          "prStatus": "OPEN",
          "lastCommit": "1 hour ago by anugraha",
          "sonarScore": 93
        }
      },
      {
        "id": "athena-be1",
        "pn": "90155221",
        "name": "Farhan Maulana",
        "role": "BE",
        "avatarColor": "#3b82f6",
        "deskPosition": [
          3,
          0,
          1.2
        ],
        "rotationY": 3.141592653589793,
        "status": "active",
        "speechBubble": "Integrasi API Dukcapil & Ditjen Pajak NPWP latency <200ms.",
        "isBlocker": false,
        "jiraTickets": [
          {
            "key": "ATH-320",
            "title": "Government API Gateway Connector (Dukcapil)",
            "status": "Done",
            "storyPoints": 8,
            "priority": "Highest"
          }
        ],
        "bitbucket": {
          "repo": "athena-kyc-service",
          "branch": "feat/dukcapil-connector",
          "activePR": null,
          "prStatus": null,
          "lastCommit": "Yesterday by fmaulana",
          "sonarScore": 95
        }
      },
      {
        "id": "athena-be2",
        "pn": "90144119",
        "name": "Taufik Hidayat",
        "role": "BE",
        "avatarColor": "#2563eb",
        "deskPosition": [
          5.1,
          0,
          1.2
        ],
        "rotationY": 3.141592653589793,
        "status": "active",
        "speechBubble": "Dynamic PDF Generator sertifikat QRIS Merchant siap dicetak otomatis.",
        "isBlocker": false,
        "jiraTickets": [
          {
            "key": "ATH-325",
            "title": "Instant QRIS Certificate PDF Generation Service",
            "status": "In Progress",
            "storyPoints": 5,
            "priority": "Medium"
          }
        ],
        "bitbucket": {
          "repo": "athena-pdf-worker",
          "branch": "feat/pdf-template-v2",
          "activePR": "PR #34: Vector QR watermark",
          "prStatus": "OPEN",
          "lastCommit": "2 hours ago by thidayat",
          "sonarScore": 91
        }
      },
      {
        "id": "athena-qa1",
        "pn": "90166334",
        "name": "Anisa Rahmawati",
        "role": "QA",
        "avatarColor": "#10b981",
        "deskPosition": [
          3,
          0,
          3
        ],
        "rotationY": 0,
        "status": "testing",
        "speechBubble": "E2E Cypress test 80 user flows registrasi merchant passed 100%.",
        "isBlocker": false,
        "jiraTickets": [
          {
            "key": "ATH-330",
            "title": "E2E Cypress Regression Suite Merchant Onboarding",
            "status": "In Progress",
            "storyPoints": 5,
            "priority": "High"
          }
        ],
        "bitbucket": {
          "repo": "athena-e2e-tests",
          "branch": "cypress/sprint-15",
          "activePR": null,
          "prStatus": null,
          "lastCommit": "4 hours ago by arahma",
          "sonarScore": 96
        }
      },
      {
        "id": "athena-qa2",
        "pn": "90188220",
        "name": "Rizky Fadilah",
        "role": "QA",
        "avatarColor": "#059669",
        "deskPosition": [
          5.1,
          0,
          3
        ],
        "rotationY": 0,
        "status": "idle",
        "speechBubble": "☕ Verifikasi dokumen UAT selesai, siap untuk RFC deployment.",
        "isBlocker": false,
        "jiraTickets": [
          {
            "key": "ATH-335",
            "title": "RFC CAB Deployment Checklist Verification",
            "status": "Done",
            "storyPoints": 3,
            "priority": "High"
          }
        ],
        "bitbucket": {
          "repo": "athena-e2e-tests",
          "branch": "main",
          "activePR": null,
          "prStatus": null,
          "lastCommit": "Yesterday by rfadilah",
          "sonarScore": 97
        }
      }
    ]
  },
  {
    "id": "squad-titan",
    "name": "Row 6: Squad Titan (Batch Settlement & EOD Reconcile)",
    "alias": "Titan",
    "leadPN": "PN 90155778 (Gunawan Wibisono)",
    "sprint": "Sprint 31 (Day 6/10)",
    "sprintGoal": "End-of-Day Clearing Acceleration & BigQuery Partition Reconciliation",
    "zoneCenter": [
      1,
      0,
      -2.1
    ],
    "zoneColor": "#6366f1",
    "metrics": {
      "totalStoryPoints": 88,
      "completedStoryPoints": 52,
      "defects": {
        "p1": 1,
        "p2": 3,
        "p3": 1
      },
      "approvals": {
        "brd": true,
        "sitSignOff": false,
        "uatSignOff": false,
        "secmanSignOff": false,
        "rfcDeployment": false
      },
      "pipeline": {
        "stage": "SIT",
        "health": "red",
        "sonarCoverage": 89.5
      }
    },
    "members": [
      {
        "id": "titan-sl",
        "pn": "90155778",
        "name": "Gunawan Wibisono",
        "role": "SL",
        "avatarColor": "#f59e0b",
        "deskPosition": [
          -6,
          0,
          -3
        ],
        "rotationY": 3.141592653589793,
        "status": "active",
        "speechBubble": "Target waktu proses cut-off settlement EOD dipangkas dari 3 jam jadi 45 menit.",
        "isBlocker": false,
        "jiraTickets": [
          {
            "key": "TTN-601",
            "title": "Batch Settlement Window Optimization Architecture",
            "status": "In Progress",
            "storyPoints": 8,
            "priority": "Highest"
          }
        ],
        "bitbucket": {
          "repo": "titan-settlement-core",
          "branch": "release/v3.1.0",
          "activePR": "PR #190: Spark cluster partition tune",
          "prStatus": "OPEN",
          "lastCommit": "1 hour ago by gwibisono",
          "sonarScore": 91
        }
      },
      {
        "id": "titan-sm",
        "pn": "90177665",
        "name": "Mira Santika",
        "role": "SM",
        "avatarColor": "#8b5cf6",
        "deskPosition": [
          -3.8,
          0,
          -3
        ],
        "rotationY": 3.141592653589793,
        "status": "active",
        "speechBubble": "Koordinasi file kliring bersama Bank Indonesia & Artajasa terjadwal.",
        "isBlocker": false,
        "jiraTickets": [
          {
            "key": "TTN-605",
            "title": "Clearing File Interchange Protocol Protocol",
            "status": "Done",
            "storyPoints": 3,
            "priority": "Medium"
          }
        ],
        "bitbucket": {
          "repo": "titan-docs",
          "branch": "main",
          "activePR": null,
          "prStatus": null,
          "lastCommit": "Yesterday by msantika",
          "sonarScore": 98
        }
      },
      {
        "id": "titan-fe1",
        "pn": "90188554",
        "name": "Joko Susilo",
        "role": "FE",
        "avatarColor": "#ec4899",
        "deskPosition": [
          -6,
          0,
          -1.2
        ],
        "rotationY": 0,
        "status": "active",
        "speechBubble": "Visualisasi progress bar batch settlement & delta dispute real-time.",
        "isBlocker": false,
        "jiraTickets": [
          {
            "key": "TTN-610",
            "title": "EOD Batch Progress Bar & Live Status Cards",
            "status": "Done",
            "storyPoints": 5,
            "priority": "High"
          }
        ],
        "bitbucket": {
          "repo": "titan-reconcile-web",
          "branch": "feat/progress-monitor",
          "activePR": null,
          "prStatus": null,
          "lastCommit": "3 hours ago by jsusilo",
          "sonarScore": 94
        }
      },
      {
        "id": "titan-fe2",
        "pn": "90199443",
        "name": "Mega Utami",
        "role": "FE",
        "avatarColor": "#db2777",
        "deskPosition": [
          -3.8,
          0,
          -1.2
        ],
        "rotationY": 0,
        "status": "active",
        "speechBubble": "Data grid audit selisih transaksi dengan filter multi-merchant.",
        "isBlocker": false,
        "jiraTickets": [
          {
            "key": "TTN-615",
            "title": "Discrepancy Audit Data Table with Export Excel",
            "status": "In Review",
            "storyPoints": 5,
            "priority": "High"
          }
        ],
        "bitbucket": {
          "repo": "titan-reconcile-web",
          "branch": "feat/audit-grid",
          "activePR": "PR #56: Virtualized grid rows",
          "prStatus": "OPEN",
          "lastCommit": "1 hour ago by mutami",
          "sonarScore": 92
        }
      },
      {
        "id": "titan-be1",
        "pn": "90166112",
        "name": "Prasetyo Utomo",
        "role": "BE",
        "avatarColor": "#3b82f6",
        "deskPosition": [
          3,
          0,
          -3
        ],
        "rotationY": 3.141592653589793,
        "status": "blocked",
        "speechBubble": "⚠️ Blocker: Deadlock pada table partition ledger saat 50 juta baris di-reconcile.",
        "isBlocker": true,
        "jiraTickets": [
          {
            "key": "TTN-620",
            "title": "BUG P1: PostgreSQL Table Partition Lock Contention",
            "status": "In Progress",
            "storyPoints": 8,
            "priority": "Highest"
          }
        ],
        "bitbucket": {
          "repo": "titan-settlement-core",
          "branch": "fix/partition-lock-deadlock",
          "activePR": "PR #78: Batch chunk advisory lock",
          "prStatus": "OPEN",
          "lastCommit": "15 mins ago by putomo",
          "sonarScore": 84
        }
      },
      {
        "id": "titan-be2",
        "pn": "90144998",
        "name": "Eko Prasetyo",
        "role": "BE",
        "avatarColor": "#2563eb",
        "deskPosition": [
          5.1,
          0,
          -3
        ],
        "rotationY": 3.141592653589793,
        "status": "active",
        "speechBubble": "BigQuery pipeline streaming insert 20.000 rows/detik stabil.",
        "isBlocker": false,
        "jiraTickets": [
          {
            "key": "TTN-625",
            "title": "Google Cloud BigQuery Streaming Buffer Tuning",
            "status": "In Progress",
            "storyPoints": 5,
            "priority": "High"
          }
        ],
        "bitbucket": {
          "repo": "titan-bigquery-sink",
          "branch": "feat/streaming-buffer",
          "activePR": "PR #41: Add exponential backoff retry",
          "prStatus": "OPEN",
          "lastCommit": "2 hours ago by eprasetyo",
          "sonarScore": 93
        }
      },
      {
        "id": "titan-qa1",
        "pn": "90133887",
        "name": "Sri Wahyuni",
        "role": "QA",
        "avatarColor": "#10b981",
        "deskPosition": [
          3,
          0,
          -1.2
        ],
        "rotationY": 0,
        "status": "testing",
        "speechBubble": "Testing synthetic settlement file generator 100 juta record.",
        "isBlocker": false,
        "jiraTickets": [
          {
            "key": "TTN-630",
            "title": "High-Volume Synthetic File Generation Benchmark",
            "status": "In Progress",
            "storyPoints": 5,
            "priority": "High"
          }
        ],
        "bitbucket": {
          "repo": "titan-qa-automation",
          "branch": "test/100m-records",
          "activePR": null,
          "prStatus": null,
          "lastCommit": "4 hours ago by swahyuni_t",
          "sonarScore": 90
        }
      },
      {
        "id": "titan-qa2",
        "pn": "90122776",
        "name": "Bambang Kusuma",
        "role": "QA",
        "avatarColor": "#059669",
        "deskPosition": [
          5.1,
          0,
          -1.2
        ],
        "rotationY": 0,
        "status": "active",
        "speechBubble": "Verifikasi hash checksum SHA-256 file kliring Bank Indonesia matched.",
        "isBlocker": false,
        "jiraTickets": [
          {
            "key": "TTN-635",
            "title": "SHA-256 Checksum Automated Validation Suite",
            "status": "Done",
            "storyPoints": 3,
            "priority": "Medium"
          }
        ],
        "bitbucket": {
          "repo": "titan-qa-automation",
          "branch": "main",
          "activePR": null,
          "prStatus": null,
          "lastCommit": "Yesterday by bkusuma",
          "sonarScore": 96
        }
      }
    ]
  },
  {
    "id": "squad-apollo",
    "name": "Row 7: Squad Apollo (BI-FAST & National Switching)",
    "alias": "Apollo",
    "leadPN": "PN 90199001 (Dedi Mulyadi)",
    "sprint": "Sprint 26 (Day 5/10)",
    "sprintGoal": "BI-FAST Direct ISO 20022 High Concurrency Connector Latency <50ms",
    "zoneCenter": [
      1,
      0,
      -6.3
    ],
    "zoneColor": "#f43f5e",
    "metrics": {
      "totalStoryPoints": 78,
      "completedStoryPoints": 58,
      "defects": {
        "p1": 0,
        "p2": 2,
        "p3": 2
      },
      "approvals": {
        "brd": true,
        "sitSignOff": true,
        "uatSignOff": true,
        "secmanSignOff": false,
        "rfcDeployment": false
      },
      "pipeline": {
        "stage": "SECMAN",
        "health": "yellow",
        "sonarCoverage": 93.6
      }
    },
    "members": [
      {
        "id": "apollo-sl",
        "pn": "90199001",
        "name": "Dedi Mulyadi",
        "role": "SL",
        "avatarColor": "#f59e0b",
        "deskPosition": [
          -6,
          0,
          -7.2
        ],
        "rotationY": 3.141592653589793,
        "status": "active",
        "speechBubble": "Sertifikasi compliance ISO 20022 versi 2024 bersama BI compliant.",
        "isBlocker": false,
        "jiraTickets": [
          {
            "key": "APO-701",
            "title": "BI-FAST ISO 20022 Standard Migration Compliance",
            "status": "In Progress",
            "storyPoints": 8,
            "priority": "Highest"
          }
        ],
        "bitbucket": {
          "repo": "apollo-bifast-core",
          "branch": "release/v2.6.0",
          "activePR": "PR #165: ISO 20022 parser engine",
          "prStatus": "OPEN",
          "lastCommit": "2 hours ago by dmulyadi",
          "sonarScore": 94
        }
      },
      {
        "id": "apollo-sm",
        "pn": "90188112",
        "name": "Fitri Handayani",
        "role": "SM",
        "avatarColor": "#8b5cf6",
        "deskPosition": [
          -3.8,
          0,
          -7.2
        ],
        "rotationY": 3.141592653589793,
        "status": "active",
        "speechBubble": "Target cut-over weekend switching BI-FAST disetujui Komite RFC.",
        "isBlocker": false,
        "jiraTickets": [
          {
            "key": "APO-705",
            "title": "RFC CAB Maintenance Window Approval Plan",
            "status": "Done",
            "storyPoints": 3,
            "priority": "High"
          }
        ],
        "bitbucket": {
          "repo": "apollo-docs",
          "branch": "main",
          "activePR": null,
          "prStatus": null,
          "lastCommit": "Yesterday by fhandayani",
          "sonarScore": 99
        }
      },
      {
        "id": "apollo-fe1",
        "pn": "90177223",
        "name": "Hana Safitri",
        "role": "FE",
        "avatarColor": "#ec4899",
        "deskPosition": [
          -6,
          0,
          -5.4
        ],
        "rotationY": 0,
        "status": "active",
        "speechBubble": "Pilihan transfer BI-FAST di layar transfer BRImo dioptimasi UX-nya.",
        "isBlocker": false,
        "jiraTickets": [
          {
            "key": "APO-710",
            "title": "BRImo Fast Transfer Fee & Badge Animation",
            "status": "Done",
            "storyPoints": 5,
            "priority": "High"
          }
        ],
        "bitbucket": {
          "repo": "apollo-transfer-ui",
          "branch": "feat/bifast-badge",
          "activePR": null,
          "prStatus": null,
          "lastCommit": "4 hours ago by hsafitri",
          "sonarScore": 95
        }
      },
      {
        "id": "apollo-fe2",
        "pn": "90166334",
        "name": "Surya Kencana",
        "role": "FE",
        "avatarColor": "#db2777",
        "deskPosition": [
          -3.8,
          0,
          -5.4
        ],
        "rotationY": 0,
        "status": "active",
        "speechBubble": "Proxy Address resolution UI (nomor HP & email ID) tested.",
        "isBlocker": false,
        "jiraTickets": [
          {
            "key": "APO-715",
            "title": "BI-FAST Proxy ID Lookup Auto-complete Component",
            "status": "In Review",
            "storyPoints": 5,
            "priority": "High"
          }
        ],
        "bitbucket": {
          "repo": "apollo-transfer-ui",
          "branch": "feat/proxy-lookup",
          "activePR": "PR #48: Debounce proxy search API",
          "prStatus": "OPEN",
          "lastCommit": "1 hour ago by skencana",
          "sonarScore": 92
        }
      },
      {
        "id": "apollo-be1",
        "pn": "90155445",
        "name": "Yusuf Habibi",
        "role": "BE",
        "avatarColor": "#3b82f6",
        "deskPosition": [
          3,
          0,
          -7.2
        ],
        "rotationY": 3.141592653589793,
        "status": "active",
        "speechBubble": "Netty NIO TCP socket connection pool ke BI Switcher tembus <35ms.",
        "isBlocker": false,
        "jiraTickets": [
          {
            "key": "APO-720",
            "title": "Netty Epoll TCP Socket Tuning for Low-Latency",
            "status": "In Progress",
            "storyPoints": 8,
            "priority": "Highest"
          }
        ],
        "bitbucket": {
          "repo": "apollo-bifast-connector",
          "branch": "perf/netty-epoll",
          "activePR": "PR #104: Zero-copy buffer allocation",
          "prStatus": "OPEN",
          "lastCommit": "45 mins ago by yhabibi",
          "sonarScore": 96
        }
      },
      {
        "id": "apollo-be2",
        "pn": "90144556",
        "name": "Doni Firmansyah",
        "role": "BE",
        "avatarColor": "#2563eb",
        "deskPosition": [
          5.1,
          0,
          -7.2
        ],
        "rotationY": 3.141592653589793,
        "status": "active",
        "speechBubble": "Circuit breaker Resilience4j failover ke switching cadangan ready.",
        "isBlocker": false,
        "jiraTickets": [
          {
            "key": "APO-725",
            "title": "Resilience4j Automated Failover Secondary Gateway",
            "status": "Done",
            "storyPoints": 5,
            "priority": "High"
          }
        ],
        "bitbucket": {
          "repo": "apollo-bifast-connector",
          "branch": "feat/resilience-failover",
          "activePR": null,
          "prStatus": null,
          "lastCommit": "Yesterday by dfirmansyah",
          "sonarScore": 93
        }
      },
      {
        "id": "apollo-qa1",
        "pn": "90133667",
        "name": "Lia Kartika",
        "role": "QA",
        "avatarColor": "#10b981",
        "deskPosition": [
          3,
          0,
          -5.4
        ],
        "rotationY": 0,
        "status": "testing",
        "speechBubble": "Simulation test 5.000 TPS BI-FAST peak transfer load berjalan aman.",
        "isBlocker": false,
        "jiraTickets": [
          {
            "key": "APO-730",
            "title": "k6 Concurrency Stress Test BI-FAST Connector",
            "status": "In Progress",
            "storyPoints": 5,
            "priority": "High"
          }
        ],
        "bitbucket": {
          "repo": "apollo-qa-suite",
          "branch": "test/5k-tps-load",
          "activePR": null,
          "prStatus": null,
          "lastCommit": "3 hours ago by lkartika",
          "sonarScore": 91
        }
      },
      {
        "id": "apollo-qa2",
        "pn": "90122778",
        "name": "Fajar Ramadhan",
        "role": "QA",
        "avatarColor": "#059669",
        "deskPosition": [
          5.1,
          0,
          -5.4
        ],
        "rotationY": 0,
        "status": "idle",
        "speechBubble": "☕ Stress test pass! Tinggal menunggu Secman security sign-off.",
        "isBlocker": false,
        "jiraTickets": [
          {
            "key": "APO-735",
            "title": "Security Vulnerability Remediation Sign-Off",
            "status": "In Progress",
            "storyPoints": 3,
            "priority": "High"
          }
        ],
        "bitbucket": {
          "repo": "apollo-qa-suite",
          "branch": "main",
          "activePR": null,
          "prStatus": null,
          "lastCommit": "Yesterday by framadhan",
          "sonarScore": 95
        }
      }
    ]
  },
  {
    "id": "squad-vulcan",
    "name": "Row 8: Squad Vulcan (Cloud Infra & DevSecOps)",
    "alias": "Vulcan",
    "leadPN": "PN 90199887 (Aris Munandar)",
    "sprint": "Sprint 30 (Day 7/10)",
    "sprintGoal": "OpenShift Multi-Cluster Auto-Scaling & Zero-Downtime Blue-Green Pipeline",
    "zoneCenter": [
      1,
      0,
      -10.5
    ],
    "zoneColor": "#06b6d4",
    "metrics": {
      "totalStoryPoints": 70,
      "completedStoryPoints": 55,
      "defects": {
        "p1": 0,
        "p2": 1,
        "p3": 1
      },
      "approvals": {
        "brd": true,
        "sitSignOff": true,
        "uatSignOff": true,
        "secmanSignOff": true,
        "rfcDeployment": true
      },
      "pipeline": {
        "stage": "PROD_READY",
        "health": "green",
        "sonarCoverage": 97.5
      }
    },
    "members": [
      {
        "id": "vulcan-sl",
        "pn": "90199887",
        "name": "Aris Munandar",
        "role": "SL",
        "avatarColor": "#f59e0b",
        "deskPosition": [
          -6,
          0,
          -11.4
        ],
        "rotationY": 3.141592653589793,
        "status": "active",
        "speechBubble": "Cluster Kubernetes OpenShift siap untuk lonjakan transaksi gajian akhir bulan!",
        "isBlocker": false,
        "jiraTickets": [
          {
            "key": "VLC-801",
            "title": "Cluster Resource Quota Multi-region DR Plan",
            "status": "Done",
            "storyPoints": 5,
            "priority": "Highest"
          }
        ],
        "bitbucket": {
          "repo": "vulcan-k8s-manifests",
          "branch": "release/v3.0.0",
          "activePR": "PR #210: Blue-Green rollout canary config",
          "prStatus": "OPEN",
          "lastCommit": "1 hour ago by amunandar",
          "sonarScore": 98
        }
      },
      {
        "id": "vulcan-sm",
        "pn": "90188776",
        "name": "Wulan Guritno",
        "role": "SM",
        "avatarColor": "#8b5cf6",
        "deskPosition": [
          -3.8,
          0,
          -11.4
        ],
        "rotationY": 3.141592653589793,
        "status": "active",
        "speechBubble": "Semua tiket RFC Deployment CAB minggu ini sudah 100% approved.",
        "isBlocker": false,
        "jiraTickets": [
          {
            "key": "VLC-805",
            "title": "CAB Committee Formal Approval Signatures",
            "status": "Done",
            "storyPoints": 3,
            "priority": "High"
          }
        ],
        "bitbucket": {
          "repo": "vulcan-governance",
          "branch": "main",
          "activePR": null,
          "prStatus": null,
          "lastCommit": "Yesterday by wguritno",
          "sonarScore": 99
        }
      },
      {
        "id": "vulcan-fe1",
        "pn": "90177665",
        "name": "Kiki Amalia",
        "role": "FE",
        "avatarColor": "#ec4899",
        "deskPosition": [
          -6,
          0,
          -9.6
        ],
        "rotationY": 0,
        "status": "active",
        "speechBubble": "Internal Developer Platform (IDP) Backstage dashboard selesai di-deploy.",
        "isBlocker": false,
        "jiraTickets": [
          {
            "key": "VLC-810",
            "title": "Spotify Backstage IDP Service Catalog UI",
            "status": "Done",
            "storyPoints": 5,
            "priority": "High"
          }
        ],
        "bitbucket": {
          "repo": "vulcan-idp-backstage",
          "branch": "feat/service-catalog",
          "activePR": null,
          "prStatus": null,
          "lastCommit": "3 hours ago by kamalia",
          "sonarScore": 95
        }
      },
      {
        "id": "vulcan-fe2",
        "pn": "90166554",
        "name": "Tono Sudirgo",
        "role": "FE",
        "avatarColor": "#db2777",
        "deskPosition": [
          -3.8,
          0,
          -9.6
        ],
        "rotationY": 0,
        "status": "active",
        "speechBubble": "Grafana dashboards 3D visual cluster node topology live.",
        "isBlocker": false,
        "jiraTickets": [
          {
            "key": "VLC-815",
            "title": "Grafana Custom Plugin: 3D Node Heatmap",
            "status": "In Review",
            "storyPoints": 5,
            "priority": "High"
          }
        ],
        "bitbucket": {
          "repo": "vulcan-grafana-plugins",
          "branch": "feat/3d-heatmap",
          "activePR": "PR #32: WebGL memory leak fix",
          "prStatus": "OPEN",
          "lastCommit": "2 hours ago by tsudirgo",
          "sonarScore": 93
        }
      },
      {
        "id": "vulcan-be1",
        "pn": "90155443",
        "name": "Ilham Kusumo",
        "role": "BE",
        "avatarColor": "#3b82f6",
        "deskPosition": [
          3,
          0,
          -11.4
        ],
        "rotationY": 3.141592653589793,
        "status": "active",
        "speechBubble": "ArgoCD GitOps automated sync pipeline jalan di 18 squads mikroservis.",
        "isBlocker": false,
        "jiraTickets": [
          {
            "key": "VLC-820",
            "title": "ArgoCD Automated Sync Hook & Slack Webhook Alert",
            "status": "Done",
            "storyPoints": 5,
            "priority": "High"
          }
        ],
        "bitbucket": {
          "repo": "vulcan-gitops-helm",
          "branch": "master",
          "activePR": null,
          "prStatus": null,
          "lastCommit": "50 mins ago by ikusumo",
          "sonarScore": 97
        }
      },
      {
        "id": "vulcan-be2",
        "pn": "90144332",
        "name": "Rangga Danu",
        "role": "BE",
        "avatarColor": "#2563eb",
        "deskPosition": [
          5.1,
          0,
          -11.4
        ],
        "rotationY": 3.141592653589793,
        "status": "active",
        "speechBubble": "HashiCorp Vault auto-injection token TTL rotation policy verified.",
        "isBlocker": false,
        "jiraTickets": [
          {
            "key": "VLC-825",
            "title": "HashiCorp Vault Kubernetes Sidecar Injector Tune",
            "status": "In Progress",
            "storyPoints": 5,
            "priority": "Medium"
          }
        ],
        "bitbucket": {
          "repo": "vulcan-vault-config",
          "branch": "feat/sidecar-ttl",
          "activePR": "PR #19: Token lease renewal fix",
          "prStatus": "OPEN",
          "lastCommit": "1 hour ago by rdanu",
          "sonarScore": 96
        }
      },
      {
        "id": "vulcan-qa1",
        "pn": "90133221",
        "name": "Bella Saphira",
        "role": "QA",
        "avatarColor": "#10b981",
        "deskPosition": [
          3,
          0,
          -9.6
        ],
        "rotationY": 0,
        "status": "testing",
        "speechBubble": "Chaos Engineering test Kube-monkey kill pod acak, failover <2 detik.",
        "isBlocker": false,
        "jiraTickets": [
          {
            "key": "VLC-830",
            "title": "Chaos Mesh Pod Kill & Network Partition Scenario",
            "status": "In Progress",
            "storyPoints": 5,
            "priority": "High"
          }
        ],
        "bitbucket": {
          "repo": "vulcan-chaos-tests",
          "branch": "chaos/node-drain",
          "activePR": null,
          "prStatus": null,
          "lastCommit": "2 hours ago by bsaphira",
          "sonarScore": 94
        }
      },
      {
        "id": "vulcan-qa2",
        "pn": "90122110",
        "name": "Sandy Pratama",
        "role": "QA",
        "avatarColor": "#059669",
        "deskPosition": [
          5.1,
          0,
          -9.6
        ],
        "rotationY": 0,
        "status": "deploying",
        "speechBubble": "🚀 Verifikasi pre-flight deployment checklist ke OpenShift Production.",
        "isBlocker": false,
        "jiraTickets": [
          {
            "key": "VLC-835",
            "title": "Production Pre-flight Deployment Automation Check",
            "status": "In Progress",
            "storyPoints": 5,
            "priority": "Highest"
          }
        ],
        "bitbucket": {
          "repo": "vulcan-chaos-tests",
          "branch": "main",
          "activePR": null,
          "prStatus": null,
          "lastCommit": "Yesterday by spratama",
          "sonarScore": 98
        }
      }
    ]
  },
  {
    "id": "squad-sentinel",
    "name": "Row 9: Squad Sentinel (SRE, APM & 24/7 War Room)",
    "alias": "Sentinel",
    "leadPN": "PN 90199776 (Firman Utina)",
    "sprint": "Sprint 27 (Day 9/10)",
    "sprintGoal": "Distributed Tracing OpenTelemetry & 99.999% High Availability SLA Uptime",
    "zoneCenter": [
      1,
      0,
      -14.7
    ],
    "zoneColor": "#ea580c",
    "metrics": {
      "totalStoryPoints": 65,
      "completedStoryPoints": 58,
      "defects": {
        "p1": 0,
        "p2": 1,
        "p3": 0
      },
      "approvals": {
        "brd": true,
        "sitSignOff": true,
        "uatSignOff": true,
        "secmanSignOff": true,
        "rfcDeployment": false
      },
      "pipeline": {
        "stage": "PROD_READY",
        "health": "green",
        "sonarCoverage": 98.2
      }
    },
    "members": [
      {
        "id": "sentinel-sl",
        "pn": "90199776",
        "name": "Firman Utina",
        "role": "SL",
        "avatarColor": "#f59e0b",
        "deskPosition": [
          -6,
          0,
          -15.6
        ],
        "rotationY": 3.141592653589793,
        "status": "active",
        "speechBubble": "SLA uptime QCash bulan ini 99.998%! War room dashboard aman.",
        "isBlocker": false,
        "jiraTickets": [
          {
            "key": "SNT-901",
            "title": "Monthly SLA Uptime & MTTR Compliance Report",
            "status": "Done",
            "storyPoints": 5,
            "priority": "Highest"
          }
        ],
        "bitbucket": {
          "repo": "sentinel-war-room",
          "branch": "release/v2.7.0",
          "activePR": "PR #134: SLA automated calculator",
          "prStatus": "OPEN",
          "lastCommit": "1 hour ago by futina",
          "sonarScore": 99
        }
      },
      {
        "id": "sentinel-sm",
        "pn": "90188665",
        "name": "Ayu Tingting",
        "role": "SM",
        "avatarColor": "#8b5cf6",
        "deskPosition": [
          -3.8,
          0,
          -15.6
        ],
        "rotationY": 3.141592653589793,
        "status": "active",
        "speechBubble": "Jadwal on-call rota SRE & war room escalation matrix diperbarui.",
        "isBlocker": false,
        "jiraTickets": [
          {
            "key": "SNT-905",
            "title": "PagerDuty On-call Rotation Q4 Matrix Schedule",
            "status": "Done",
            "storyPoints": 3,
            "priority": "High"
          }
        ],
        "bitbucket": {
          "repo": "sentinel-runbooks",
          "branch": "main",
          "activePR": null,
          "prStatus": null,
          "lastCommit": "Yesterday by atingting",
          "sonarScore": 98
        }
      },
      {
        "id": "sentinel-fe1",
        "pn": "90177554",
        "name": "Lukman Sardi",
        "role": "FE",
        "avatarColor": "#ec4899",
        "deskPosition": [
          -6,
          0,
          -13.8
        ],
        "rotationY": 0,
        "status": "active",
        "speechBubble": "War Room Big Screen Command Dashboard dengan sound alert selesai.",
        "isBlocker": false,
        "jiraTickets": [
          {
            "key": "SNT-910",
            "title": "War Room Big Screen TV Wall Display Component",
            "status": "Done",
            "storyPoints": 5,
            "priority": "High"
          }
        ],
        "bitbucket": {
          "repo": "sentinel-war-room",
          "branch": "feat/tv-wall-mode",
          "activePR": null,
          "prStatus": null,
          "lastCommit": "3 hours ago by lsardi",
          "sonarScore": 96
        }
      },
      {
        "id": "sentinel-fe2",
        "pn": "90166443",
        "name": "Nadira Adnan",
        "role": "FE",
        "avatarColor": "#db2777",
        "deskPosition": [
          -3.8,
          0,
          -13.8
        ],
        "rotationY": 0,
        "status": "active",
        "speechBubble": "Jaeger Distributed Tracing Gantt chart waterfall UI terintegrasi.",
        "isBlocker": false,
        "jiraTickets": [
          {
            "key": "SNT-915",
            "title": "OpenTelemetry Waterfall Trace Visualization",
            "status": "In Review",
            "storyPoints": 5,
            "priority": "High"
          }
        ],
        "bitbucket": {
          "repo": "sentinel-war-room",
          "branch": "feat/opentelemetry-waterfall",
          "activePR": "PR #81: Canvas render span bars",
          "prStatus": "OPEN",
          "lastCommit": "2 hours ago by nadnan",
          "sonarScore": 94
        }
      },
      {
        "id": "sentinel-be1",
        "pn": "90155332",
        "name": "Dharma Kusuma",
        "role": "BE",
        "avatarColor": "#3b82f6",
        "deskPosition": [
          3,
          0,
          -15.6
        ],
        "rotationY": 3.141592653589793,
        "status": "active",
        "speechBubble": "OpenTelemetry Collector daemonset throughput 150.000 spans/detik.",
        "isBlocker": false,
        "jiraTickets": [
          {
            "key": "SNT-920",
            "title": "OTel Collector DaemonSet High-Volume Ingest",
            "status": "In Progress",
            "storyPoints": 8,
            "priority": "Highest"
          }
        ],
        "bitbucket": {
          "repo": "sentinel-otel-collector",
          "branch": "perf/batch-send",
          "activePR": "PR #55: Gzip compression on span export",
          "prStatus": "OPEN",
          "lastCommit": "40 mins ago by dkusuma",
          "sonarScore": 97
        }
      },
      {
        "id": "sentinel-be2",
        "pn": "90144221",
        "name": "Zulkifli Lubis",
        "role": "BE",
        "avatarColor": "#2563eb",
        "deskPosition": [
          5.1,
          0,
          -15.6
        ],
        "rotationY": 3.141592653589793,
        "status": "active",
        "speechBubble": "Slack & Microsoft Teams bot auto-trigger War Room incident room ready.",
        "isBlocker": false,
        "jiraTickets": [
          {
            "key": "SNT-925",
            "title": "Bot Incident Management: Teams Channel Auto-Create",
            "status": "Done",
            "storyPoints": 5,
            "priority": "High"
          }
        ],
        "bitbucket": {
          "repo": "sentinel-incident-bot",
          "branch": "feat/teams-integration",
          "activePR": null,
          "prStatus": null,
          "lastCommit": "Yesterday by zlubis",
          "sonarScore": 95
        }
      },
      {
        "id": "sentinel-qa1",
        "pn": "90133110",
        "name": "Chandra Wijaya",
        "role": "QA",
        "avatarColor": "#10b981",
        "deskPosition": [
          3,
          0,
          -13.8
        ],
        "rotationY": 0,
        "status": "testing",
        "speechBubble": "Drill simulasi outage data center: failover ke DR berhasil 38 detik.",
        "isBlocker": false,
        "jiraTickets": [
          {
            "key": "SNT-930",
            "title": "Bi-Monthly Disaster Recovery (DR) Drill Benchmark",
            "status": "In Progress",
            "storyPoints": 5,
            "priority": "High"
          }
        ],
        "bitbucket": {
          "repo": "sentinel-dr-drills",
          "branch": "drill/dc-failover",
          "activePR": null,
          "prStatus": null,
          "lastCommit": "4 hours ago by cwijaya",
          "sonarScore": 96
        }
      },
      {
        "id": "sentinel-qa2",
        "pn": "90122009",
        "name": "Tiara Andini",
        "role": "QA",
        "avatarColor": "#059669",
        "deskPosition": [
          5.1,
          0,
          -13.8
        ],
        "rotationY": 0,
        "status": "idle",
        "speechBubble": "☕ Semua server health check hijau, standby monitoring transaksi malam.",
        "isBlocker": false,
        "jiraTickets": [
          {
            "key": "SNT-935",
            "title": "Synthetics Health Ping 24/7 Monitoring Pass",
            "status": "Done",
            "storyPoints": 3,
            "priority": "Medium"
          }
        ],
        "bitbucket": {
          "repo": "sentinel-dr-drills",
          "branch": "main",
          "activePR": null,
          "prStatus": null,
          "lastCommit": "Yesterday by tandini",
          "sonarScore": 98
        }
      }
    ]
  },
  {
    "id": "squad-nexus",
    "name": "Row 10: Squad Nexus (QA Automation & Performance)",
    "alias": "Nexus",
    "leadPN": "PN 90199665 (Tri Handoko)",
    "sprint": "Sprint 24 (Day 6/10)",
    "sprintGoal": "10,000 TPS Load Testing with k6 & Automated Regression Suite",
    "zoneCenter": [
      1,
      0,
      -18.9
    ],
    "zoneColor": "#14b8a6",
    "metrics": {
      "totalStoryPoints": 72,
      "completedStoryPoints": 60,
      "defects": {
        "p1": 0,
        "p2": 1,
        "p3": 1
      },
      "approvals": {
        "brd": true,
        "sitSignOff": true,
        "uatSignOff": false,
        "secmanSignOff": false,
        "rfcDeployment": false
      },
      "pipeline": {
        "stage": "SIT",
        "health": "green",
        "sonarCoverage": 95.8
      }
    },
    "members": [
      {
        "id": "nexus-sl",
        "pn": "90199665",
        "name": "Tri Handoko",
        "role": "SL",
        "avatarColor": "#f59e0b",
        "deskPosition": [
          -6,
          0,
          -19.8
        ],
        "rotationY": 3.141592653589793,
        "status": "active",
        "speechBubble": "Testing QCash 10.000 TPS tembus dengan p99 latency di bawah 95ms!",
        "isBlocker": false,
        "jiraTickets": [
          {
            "key": "NEX-101",
            "title": "10,000 TPS Performance Sign-Off Clearance",
            "status": "In Progress",
            "storyPoints": 5,
            "priority": "Highest"
          }
        ],
        "bitbucket": {
          "repo": "nexus-perf-framework",
          "branch": "release/v2.4.0",
          "activePR": "PR #90: k6 distributed runners config",
          "prStatus": "OPEN",
          "lastCommit": "2 hours ago by thandoko",
          "sonarScore": 97
        }
      },
      {
        "id": "nexus-sm",
        "pn": "90188554",
        "name": "Rini Yulianti",
        "role": "SM",
        "avatarColor": "#8b5cf6",
        "deskPosition": [
          -3.8,
          0,
          -19.8
        ],
        "rotationY": 3.141592653589793,
        "status": "active",
        "speechBubble": "Sprint backlog burndown chart sesuai target, tidak ada defect blocker.",
        "isBlocker": false,
        "jiraTickets": [
          {
            "key": "NEX-105",
            "title": "Burndown Velocity & Test Debt Tracking",
            "status": "Done",
            "storyPoints": 3,
            "priority": "Medium"
          }
        ],
        "bitbucket": {
          "repo": "nexus-qa-docs",
          "branch": "main",
          "activePR": null,
          "prStatus": null,
          "lastCommit": "Yesterday by ryulianti",
          "sonarScore": 99
        }
      },
      {
        "id": "nexus-fe1",
        "pn": "90177443",
        "name": "Bagus Ramadhan",
        "role": "FE",
        "avatarColor": "#ec4899",
        "deskPosition": [
          -6,
          0,
          -18
        ],
        "rotationY": 0,
        "status": "active",
        "speechBubble": "Dashboard visualizer k6 latency percentile & throughput graphs live.",
        "isBlocker": false,
        "jiraTickets": [
          {
            "key": "NEX-110",
            "title": "k6 Real-time Metrics Dashboard React Components",
            "status": "Done",
            "storyPoints": 5,
            "priority": "High"
          }
        ],
        "bitbucket": {
          "repo": "nexus-portal-ui",
          "branch": "feat/k6-graphs",
          "activePR": null,
          "prStatus": null,
          "lastCommit": "4 hours ago by bramadhan",
          "sonarScore": 95
        }
      },
      {
        "id": "nexus-fe2",
        "pn": "90166332",
        "name": "Vivi Novita",
        "role": "FE",
        "avatarColor": "#db2777",
        "deskPosition": [
          -3.8,
          0,
          -18
        ],
        "rotationY": 0,
        "status": "active",
        "speechBubble": "Allure Report test execution viewer dengan video playback defect ready.",
        "isBlocker": false,
        "jiraTickets": [
          {
            "key": "NEX-115",
            "title": "Allure Report Embedded Test Run Viewer",
            "status": "In Review",
            "storyPoints": 5,
            "priority": "High"
          }
        ],
        "bitbucket": {
          "repo": "nexus-portal-ui",
          "branch": "feat/allure-viewer",
          "activePR": "PR #47: Video thumbnail playback",
          "prStatus": "OPEN",
          "lastCommit": "1 hour ago by vnovita",
          "sonarScore": 93
        }
      },
      {
        "id": "nexus-be1",
        "pn": "90155221",
        "name": "Heru Prasetya",
        "role": "BE",
        "avatarColor": "#3b82f6",
        "deskPosition": [
          3,
          0,
          -19.8
        ],
        "rotationY": 3.141592653589793,
        "status": "active",
        "speechBubble": "K6 distributed load generator di OpenShift cluster berhasil di-orchestrate.",
        "isBlocker": false,
        "jiraTickets": [
          {
            "key": "NEX-120",
            "title": "Kubernetes k6 Operator Distributed Test Runner",
            "status": "Done",
            "storyPoints": 8,
            "priority": "Highest"
          }
        ],
        "bitbucket": {
          "repo": "nexus-perf-framework",
          "branch": "feat/k6-operator",
          "activePR": null,
          "prStatus": null,
          "lastCommit": "3 hours ago by hprasetya",
          "sonarScore": 96
        }
      },
      {
        "id": "nexus-be2",
        "pn": "90144110",
        "name": "Sony Hartono",
        "role": "BE",
        "avatarColor": "#2563eb",
        "deskPosition": [
          5.1,
          0,
          -19.8
        ],
        "rotationY": 3.141592653589793,
        "status": "active",
        "speechBubble": "Mock server switcher & payment gateway emulator throughput 25.000 TPS.",
        "isBlocker": false,
        "jiraTickets": [
          {
            "key": "NEX-125",
            "title": "High-Speed Switcher Mock Server Emulator in Go",
            "status": "In Progress",
            "storyPoints": 5,
            "priority": "High"
          }
        ],
        "bitbucket": {
          "repo": "nexus-mock-engine",
          "branch": "feat/go-fast-mock",
          "activePR": "PR #28: Zero allocation JSON parser",
          "prStatus": "OPEN",
          "lastCommit": "45 mins ago by shartono",
          "sonarScore": 98
        }
      },
      {
        "id": "nexus-qa1",
        "pn": "90133009",
        "name": "Nita Anggraini",
        "role": "QA",
        "avatarColor": "#10b981",
        "deskPosition": [
          3,
          0,
          -18
        ],
        "rotationY": 0,
        "status": "testing",
        "speechBubble": "Running 450 automated regression tests via Playwright parallel.",
        "isBlocker": false,
        "jiraTickets": [
          {
            "key": "NEX-130",
            "title": "Playwright Parallel Worker Execution Suite",
            "status": "In Progress",
            "storyPoints": 5,
            "priority": "High"
          }
        ],
        "bitbucket": {
          "repo": "nexus-playwright-suite",
          "branch": "test/parallel-workers",
          "activePR": null,
          "prStatus": null,
          "lastCommit": "2 hours ago by nanggraini",
          "sonarScore": 94
        }
      },
      {
        "id": "nexus-qa2",
        "pn": "90122998",
        "name": "Aldi Taher",
        "role": "QA",
        "avatarColor": "#059669",
        "deskPosition": [
          5.1,
          0,
          -18
        ],
        "rotationY": 0,
        "status": "idle",
        "speechBubble": "☕ 450 test case hijau semua! Kualitas sprint 24 aman terkendali.",
        "isBlocker": false,
        "jiraTickets": [
          {
            "key": "NEX-135",
            "title": "QA Quality Gate Dashboard Sign-off Checklist",
            "status": "Done",
            "storyPoints": 3,
            "priority": "Medium"
          }
        ],
        "bitbucket": {
          "repo": "nexus-playwright-suite",
          "branch": "main",
          "activePR": null,
          "prStatus": null,
          "lastCommit": "Yesterday by ataher",
          "sonarScore": 97
        }
      }
    ]
  }
];
