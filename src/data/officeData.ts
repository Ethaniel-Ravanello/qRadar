import type { Squad, Playbook } from '../types';

export const INITIAL_SQUADS: Squad[] = [
  {
    "id": "squad-hermes",
    "name": "Row 1: Squad Hermes (Fast Payment & API)",
    "alias": "Hermes",
    "leadPN": "PN 90185980 (Reza Pratama)",
    "sprint": "Sprint 28 (Day 7/10)",
    "sprintGoal": "Fast Checkout QRIS Cross-Border & Settlement Latency <80ms",
    "zoneCenter": [
      10,
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
        "id": "squad-hermes-in-1",
        "pn": "901010",
        "name": "Reza Pratama",
        "shortName": "Reza",
        "isStanding": false,
        "role": "SL",
        "avatarColor": "#f59e0b",
        "deskPosition": [
          4.8,
          0,
          18.49
        ],
        "rotationY": 3.141592653589793,
        "status": "active",
        "speechBubble": "Sprint 28 on-track! Target RFC deployment weekend ini siap.",
        "isBlocker": false,
        "jiraTickets": [
          {
            "key": "HER-101",
            "title": "Task: Sprint 28 on-track! Target RFC deployment wee",
            "status": "In Progress",
            "storyPoints": 5,
            "priority": "High"
          }
        ],
        "bitbucket": {
          "repo": "squad-hermes-service",
          "branch": "main",
          "activePR": null,
          "prStatus": null,
          "lastCommit": "1 hour ago",
          "sonarScore": 94
        }
      },
      {
        "id": "squad-hermes-in-2",
        "pn": "901011",
        "name": "Andi Wijaya",
        "shortName": "Andi",
        "isStanding": false,
        "role": "SM",
        "avatarColor": "#8b5cf6",
        "deskPosition": [
          6.4,
          0,
          18.49
        ],
        "rotationY": 3.141592653589793,
        "status": "active",
        "speechBubble": "User story sprint 29 backlog grooming sudah siap di Jira.",
        "isBlocker": false,
        "jiraTickets": [
          {
            "key": "HER-102",
            "title": "Task: User story sprint 29 backlog grooming sudah s",
            "status": "In Progress",
            "storyPoints": 5,
            "priority": "High"
          }
        ],
        "bitbucket": {
          "repo": "squad-hermes-service",
          "branch": "main",
          "activePR": null,
          "prStatus": null,
          "lastCommit": "1 hour ago",
          "sonarScore": 94
        }
      },
      {
        "id": "squad-hermes-in-3",
        "pn": "901012",
        "name": "Dewi Anggraini",
        "shortName": "Dewi",
        "isStanding": false,
        "role": "SM",
        "avatarColor": "#10b981",
        "deskPosition": [
          4.8,
          0,
          19.31
        ],
        "rotationY": 0,
        "status": "active",
        "speechBubble": "📋 RFC CAB release governance checklist & deployment plan ready.",
        "isBlocker": false,
        "jiraTickets": [
          {
            "key": "HER-103",
            "title": "Task: 📋 RFC CAB release governance checklist & dep",
            "status": "In Progress",
            "storyPoints": 5,
            "priority": "High"
          }
        ],
        "bitbucket": {
          "repo": "squad-hermes-service",
          "branch": "main",
          "activePR": null,
          "prStatus": null,
          "lastCommit": "1 hour ago",
          "sonarScore": 94
        }
      },
      {
        "id": "squad-hermes-in-4",
        "pn": "901013",
        "name": "Alisha Zahra",
        "shortName": "Alisha",
        "isStanding": false,
        "role": "FE",
        "avatarColor": "#a855f7",
        "deskPosition": [
          6.4,
          0,
          19.31
        ],
        "rotationY": 0,
        "status": "active",
        "speechBubble": "🎨 Design token system & merchant dynamic keypad UI v2.8 ready.",
        "isBlocker": false,
        "jiraTickets": [
          {
            "key": "HER-104",
            "title": "Task: 🎨 Design token system & merchant dynamic key",
            "status": "In Progress",
            "storyPoints": 5,
            "priority": "High"
          }
        ],
        "bitbucket": {
          "repo": "squad-hermes-service",
          "branch": "main",
          "activePR": null,
          "prStatus": null,
          "lastCommit": "1 hour ago",
          "sonarScore": 94
        }
      },
      {
        "id": "squad-hermes-out-1",
        "pn": "901020",
        "name": "Dimas Ardiansyah",
        "shortName": "Dimas",
        "isStanding": false,
        "role": "BE",
        "avatarColor": "#3b82f6",
        "deskPosition": [
          8.8,
          0,
          18.49
        ],
        "rotationY": 3.141592653589793,
        "status": "blocked",
        "speechBubble": "⚠️ Blocker: Menunggu response API Switcher Mock Sandbox dari Partner.",
        "isBlocker": true,
        "jiraTickets": [
          {
            "key": "HER-201",
            "title": "Task: ⚠️ Blocker: Menunggu response API Switcher Mo",
            "status": "In Progress",
            "storyPoints": 5,
            "priority": "Highest"
          }
        ],
        "bitbucket": {
          "repo": "squad-hermes-core",
          "branch": "main",
          "activePR": null,
          "prStatus": null,
          "lastCommit": "30 mins ago",
          "sonarScore": 92
        }
      },
      {
        "id": "squad-hermes-out-2",
        "pn": "901021",
        "name": "Rian Hidayat",
        "shortName": "Rian",
        "isStanding": false,
        "role": "BE",
        "avatarColor": "#2563eb",
        "deskPosition": [
          10.4,
          0,
          18.49
        ],
        "rotationY": 3.141592653589793,
        "status": "active",
        "speechBubble": "🚀 Webhook callback retry latency tembus 45ms (target <80ms).",
        "isBlocker": false,
        "jiraTickets": [
          {
            "key": "HER-202",
            "title": "Task: 🚀 Webhook callback retry latency tembus 45ms",
            "status": "In Progress",
            "storyPoints": 5,
            "priority": "High"
          }
        ],
        "bitbucket": {
          "repo": "squad-hermes-core",
          "branch": "main",
          "activePR": null,
          "prStatus": null,
          "lastCommit": "30 mins ago",
          "sonarScore": 92
        }
      },
      {
        "id": "squad-hermes-out-3",
        "pn": "901022",
        "name": "Bayu Samudra",
        "shortName": "Bayu",
        "isStanding": false,
        "role": "BE",
        "avatarColor": "#0284c7",
        "deskPosition": [
          12,
          0,
          18.49
        ],
        "rotationY": 3.141592653589793,
        "status": "active",
        "speechBubble": "⚡ Redis cluster replica sync latency normal <15ms.",
        "isBlocker": false,
        "jiraTickets": [
          {
            "key": "HER-203",
            "title": "Task: ⚡ Redis cluster replica sync latency normal <",
            "status": "In Progress",
            "storyPoints": 5,
            "priority": "High"
          }
        ],
        "bitbucket": {
          "repo": "squad-hermes-core",
          "branch": "main",
          "activePR": null,
          "prStatus": null,
          "lastCommit": "30 mins ago",
          "sonarScore": 92
        }
      },
      {
        "id": "squad-hermes-out-4",
        "pn": "901023",
        "name": "Fahmi Nugraha",
        "shortName": "Fahmi",
        "isStanding": false,
        "role": "BE",
        "avatarColor": "#0369a1",
        "deskPosition": [
          13.6,
          0,
          18.49
        ],
        "rotationY": 3.141592653589793,
        "status": "active",
        "speechBubble": "☸️ K8s pod autoscaler qcash-api scaled to 12 replicas ready for peak.",
        "isBlocker": false,
        "jiraTickets": [
          {
            "key": "HER-204",
            "title": "Task: ☸️ K8s pod autoscaler qcash-api scaled to 12 ",
            "status": "In Progress",
            "storyPoints": 5,
            "priority": "High"
          }
        ],
        "bitbucket": {
          "repo": "squad-hermes-core",
          "branch": "main",
          "activePR": null,
          "prStatus": null,
          "lastCommit": "30 mins ago",
          "sonarScore": 92
        }
      },
      {
        "id": "squad-hermes-out-5",
        "pn": "901024",
        "name": "Nadia Salsabila",
        "shortName": "Nadia",
        "isStanding": false,
        "role": "FE",
        "avatarColor": "#ec4899",
        "deskPosition": [
          8.8,
          0,
          19.31
        ],
        "rotationY": 0,
        "status": "active",
        "speechBubble": "🎨 Merchant Soundbox Audio Notification integration ready.",
        "isBlocker": false,
        "jiraTickets": [
          {
            "key": "HER-205",
            "title": "Task: 🎨 Merchant Soundbox Audio Notification integ",
            "status": "In Progress",
            "storyPoints": 5,
            "priority": "High"
          }
        ],
        "bitbucket": {
          "repo": "squad-hermes-core",
          "branch": "main",
          "activePR": null,
          "prStatus": null,
          "lastCommit": "30 mins ago",
          "sonarScore": 92
        }
      },
      {
        "id": "squad-hermes-out-6",
        "pn": "901025",
        "name": "Kevin Sanjaya",
        "shortName": "Kevin",
        "isStanding": false,
        "role": "FE",
        "avatarColor": "#06b6d4",
        "deskPosition": [
          10.4,
          0,
          19.31
        ],
        "rotationY": 0,
        "status": "active",
        "speechBubble": "✨ QRIS Scanner Camera auto-focus & dark mode UI tested.",
        "isBlocker": false,
        "jiraTickets": [
          {
            "key": "HER-206",
            "title": "Task: ✨ QRIS Scanner Camera auto-focus & dark mode ",
            "status": "In Progress",
            "storyPoints": 5,
            "priority": "High"
          }
        ],
        "bitbucket": {
          "repo": "squad-hermes-core",
          "branch": "main",
          "activePR": null,
          "prStatus": null,
          "lastCommit": "30 mins ago",
          "sonarScore": 92
        }
      },
      {
        "id": "squad-hermes-out-7",
        "pn": "901026",
        "name": "Budi Santoso",
        "shortName": "Budi",
        "isStanding": false,
        "role": "QA",
        "avatarColor": "#10b981",
        "deskPosition": [
          12,
          0,
          19.31
        ],
        "rotationY": 0,
        "status": "active",
        "speechBubble": "🧪 Running automated regression 120 test cases on Payment API.",
        "isBlocker": false,
        "jiraTickets": [
          {
            "key": "HER-207",
            "title": "Task: 🧪 Running automated regression 120 test case",
            "status": "In Progress",
            "storyPoints": 5,
            "priority": "High"
          }
        ],
        "bitbucket": {
          "repo": "squad-hermes-core",
          "branch": "main",
          "activePR": null,
          "prStatus": null,
          "lastCommit": "30 mins ago",
          "sonarScore": 92
        }
      },
      {
        "id": "squad-hermes-out-8",
        "pn": "901027",
        "name": "Siti Rahma",
        "shortName": "Siti",
        "isStanding": false,
        "role": "QA",
        "avatarColor": "#059669",
        "deskPosition": [
          13.6,
          0,
          19.31
        ],
        "rotationY": 0,
        "status": "blocked",
        "speechBubble": "⚠️ Defect P1: Callback timeout saat transaksi di atas Rp 5.000.000.",
        "isBlocker": true,
        "jiraTickets": [
          {
            "key": "HER-208",
            "title": "Task: ⚠️ Defect P1: Callback timeout saat transaksi",
            "status": "In Progress",
            "storyPoints": 5,
            "priority": "Highest"
          }
        ],
        "bitbucket": {
          "repo": "squad-hermes-core",
          "branch": "main",
          "activePR": null,
          "prStatus": null,
          "lastCommit": "30 mins ago",
          "sonarScore": 92
        }
      }
    ]
  },
  {
    "id": "squad-slytherin",
    "name": "Row 2: Squad Slytherin (Multi-Currency & Vault)",
    "alias": "Slytherin",
    "leadPN": "PN 90164890 (Citra Dewi)",
    "sprint": "Sprint 19 (Day 5/10)",
    "sprintGoal": "Multi-Currency High-Yield Ledger & Vault HSM Key Rotation Compliance",
    "zoneCenter": [
      10,
      0,
      14.7
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
        "id": "squad-slytherin-in-1",
        "pn": "901110",
        "name": "Citra Dewi",
        "shortName": "Citra",
        "isStanding": false,
        "role": "SL",
        "avatarColor": "#f59e0b",
        "deskPosition": [
          4.8,
          0,
          14.29
        ],
        "rotationY": 3.141592653589793,
        "status": "active",
        "speechBubble": "Audit arsitektur Multi-Currency Ledger bersama BI berjalan lancar.",
        "isBlocker": false,
        "jiraTickets": [
          {
            "key": "SLY-101",
            "title": "Task: Audit arsitektur Multi-Currency Ledger bersam",
            "status": "In Progress",
            "storyPoints": 5,
            "priority": "High"
          }
        ],
        "bitbucket": {
          "repo": "squad-slytherin-service",
          "branch": "main",
          "activePR": null,
          "prStatus": null,
          "lastCommit": "1 hour ago",
          "sonarScore": 94
        }
      },
      {
        "id": "squad-slytherin-in-2",
        "pn": "901111",
        "name": "Bagus Setiawan",
        "shortName": "Bagus",
        "isStanding": false,
        "role": "SM",
        "avatarColor": "#8b5cf6",
        "deskPosition": [
          6.4,
          0,
          14.29
        ],
        "rotationY": 3.141592653589793,
        "status": "active",
        "speechBubble": "Backlog grooming compliance HSM rotation sprint 20 selesai.",
        "isBlocker": false,
        "jiraTickets": [
          {
            "key": "SLY-102",
            "title": "Task: Backlog grooming compliance HSM rotation spri",
            "status": "In Progress",
            "storyPoints": 5,
            "priority": "High"
          }
        ],
        "bitbucket": {
          "repo": "squad-slytherin-service",
          "branch": "main",
          "activePR": null,
          "prStatus": null,
          "lastCommit": "1 hour ago",
          "sonarScore": 94
        }
      },
      {
        "id": "squad-slytherin-in-3",
        "pn": "901112",
        "name": "Taufik Hidayat",
        "shortName": "Taufik",
        "isStanding": false,
        "role": "BE",
        "avatarColor": "#0284c7",
        "deskPosition": [
          4.8,
          0,
          15.11
        ],
        "rotationY": 0,
        "status": "active",
        "speechBubble": "PCI-DSS Level 1 compliance audit trail logging configured.",
        "isBlocker": false,
        "jiraTickets": [
          {
            "key": "SLY-103",
            "title": "Task: PCI-DSS Level 1 compliance audit trail loggin",
            "status": "In Progress",
            "storyPoints": 5,
            "priority": "High"
          }
        ],
        "bitbucket": {
          "repo": "squad-slytherin-service",
          "branch": "main",
          "activePR": null,
          "prStatus": null,
          "lastCommit": "1 hour ago",
          "sonarScore": 94
        }
      },
      {
        "id": "squad-slytherin-in-4",
        "pn": "901113",
        "name": "Dedy Mizwar",
        "shortName": "Dedy",
        "isStanding": false,
        "role": "BE",
        "avatarColor": "#1d4ed8",
        "deskPosition": [
          6.4,
          0,
          15.11
        ],
        "rotationY": 0,
        "status": "active",
        "speechBubble": "Standby sync ledger batch end-of-day.",
        "isBlocker": false,
        "jiraTickets": [
          {
            "key": "SLY-104",
            "title": "Task: Standby sync ledger batch end-of-day.",
            "status": "In Progress",
            "storyPoints": 5,
            "priority": "High"
          }
        ],
        "bitbucket": {
          "repo": "squad-slytherin-service",
          "branch": "main",
          "activePR": null,
          "prStatus": null,
          "lastCommit": "1 hour ago",
          "sonarScore": 94
        }
      },
      {
        "id": "squad-slytherin-out-1",
        "pn": "901120",
        "name": "Satria Wicaksono",
        "shortName": "Satria",
        "isStanding": false,
        "role": "BE",
        "avatarColor": "#3b82f6",
        "deskPosition": [
          8.8,
          0,
          14.29
        ],
        "rotationY": 3.141592653589793,
        "status": "active",
        "speechBubble": "Vault transit key encryption decryption latency <20ms.",
        "isBlocker": false,
        "jiraTickets": [
          {
            "key": "SLY-201",
            "title": "Task: Vault transit key encryption decryption laten",
            "status": "In Progress",
            "storyPoints": 5,
            "priority": "High"
          }
        ],
        "bitbucket": {
          "repo": "squad-slytherin-core",
          "branch": "main",
          "activePR": null,
          "prStatus": null,
          "lastCommit": "30 mins ago",
          "sonarScore": 92
        }
      },
      {
        "id": "squad-slytherin-out-2",
        "pn": "901121",
        "name": "Arif Budiman",
        "shortName": "Arif",
        "isStanding": false,
        "role": "BE",
        "avatarColor": "#2563eb",
        "deskPosition": [
          10.4,
          0,
          14.29
        ],
        "rotationY": 3.141592653589793,
        "status": "active",
        "speechBubble": "Database sharding ledger partition table siap.",
        "isBlocker": false,
        "jiraTickets": [
          {
            "key": "SLY-202",
            "title": "Task: Database sharding ledger partition table siap",
            "status": "In Progress",
            "storyPoints": 5,
            "priority": "High"
          }
        ],
        "bitbucket": {
          "repo": "squad-slytherin-core",
          "branch": "main",
          "activePR": null,
          "prStatus": null,
          "lastCommit": "30 mins ago",
          "sonarScore": 92
        }
      },
      {
        "id": "squad-slytherin-out-3",
        "pn": "901122",
        "name": "Ilham Saputra",
        "shortName": "Ilham",
        "isStanding": false,
        "role": "BE",
        "avatarColor": "#0369a1",
        "deskPosition": [
          12,
          0,
          14.29
        ],
        "rotationY": 3.141592653589793,
        "status": "active",
        "speechBubble": "HSM Thales PayShield key rotation automated cron script running.",
        "isBlocker": false,
        "jiraTickets": [
          {
            "key": "SLY-203",
            "title": "Task: HSM Thales PayShield key rotation automated c",
            "status": "In Progress",
            "storyPoints": 5,
            "priority": "High"
          }
        ],
        "bitbucket": {
          "repo": "squad-slytherin-core",
          "branch": "main",
          "activePR": null,
          "prStatus": null,
          "lastCommit": "30 mins ago",
          "sonarScore": 92
        }
      },
      {
        "id": "squad-slytherin-out-4",
        "pn": "901123",
        "name": "Hendra Gunawan",
        "shortName": "Hendra",
        "isStanding": false,
        "role": "BE",
        "avatarColor": "#1e40af",
        "deskPosition": [
          13.6,
          0,
          14.29
        ],
        "rotationY": 3.141592653589793,
        "status": "active",
        "speechBubble": "Multi-region replica failover test passed.",
        "isBlocker": false,
        "jiraTickets": [
          {
            "key": "SLY-204",
            "title": "Task: Multi-region replica failover test passed.",
            "status": "In Progress",
            "storyPoints": 5,
            "priority": "High"
          }
        ],
        "bitbucket": {
          "repo": "squad-slytherin-core",
          "branch": "main",
          "activePR": null,
          "prStatus": null,
          "lastCommit": "30 mins ago",
          "sonarScore": 92
        }
      },
      {
        "id": "squad-slytherin-out-5",
        "pn": "901124",
        "name": "Maya Anggraini",
        "shortName": "Maya",
        "isStanding": false,
        "role": "FE",
        "avatarColor": "#ec4899",
        "deskPosition": [
          8.8,
          0,
          15.11
        ],
        "rotationY": 0,
        "status": "active",
        "speechBubble": "Multi-currency balance card UI render normal.",
        "isBlocker": false,
        "jiraTickets": [
          {
            "key": "SLY-205",
            "title": "Task: Multi-currency balance card UI render normal.",
            "status": "In Progress",
            "storyPoints": 5,
            "priority": "High"
          }
        ],
        "bitbucket": {
          "repo": "squad-slytherin-core",
          "branch": "main",
          "activePR": null,
          "prStatus": null,
          "lastCommit": "30 mins ago",
          "sonarScore": 92
        }
      },
      {
        "id": "squad-slytherin-out-6",
        "pn": "901125",
        "name": "Alif Pratama",
        "shortName": "Alif",
        "isStanding": false,
        "role": "FE",
        "avatarColor": "#06b6d4",
        "deskPosition": [
          10.4,
          0,
          15.11
        ],
        "rotationY": 0,
        "status": "active",
        "speechBubble": "Currency exchange calculator keypad fix.",
        "isBlocker": false,
        "jiraTickets": [
          {
            "key": "SLY-206",
            "title": "Task: Currency exchange calculator keypad fix.",
            "status": "In Progress",
            "storyPoints": 5,
            "priority": "High"
          }
        ],
        "bitbucket": {
          "repo": "squad-slytherin-core",
          "branch": "main",
          "activePR": null,
          "prStatus": null,
          "lastCommit": "30 mins ago",
          "sonarScore": 92
        }
      },
      {
        "id": "squad-slytherin-out-7",
        "pn": "901126",
        "name": "Putri Amelia",
        "shortName": "Putri",
        "isStanding": false,
        "role": "QA",
        "avatarColor": "#10b981",
        "deskPosition": [
          12,
          0,
          15.11
        ],
        "rotationY": 0,
        "status": "active",
        "speechBubble": "Test suite 100,000 cases currency conversion passed.",
        "isBlocker": false,
        "jiraTickets": [
          {
            "key": "SLY-207",
            "title": "Task: Test suite 100,000 cases currency conversion ",
            "status": "In Progress",
            "storyPoints": 5,
            "priority": "High"
          }
        ],
        "bitbucket": {
          "repo": "squad-slytherin-core",
          "branch": "main",
          "activePR": null,
          "prStatus": null,
          "lastCommit": "30 mins ago",
          "sonarScore": 92
        }
      },
      {
        "id": "squad-slytherin-out-8",
        "pn": "901127",
        "name": "Danang Saputra",
        "shortName": "Danang",
        "isStanding": false,
        "role": "QA",
        "avatarColor": "#059669",
        "deskPosition": [
          13.6,
          0,
          15.11
        ],
        "rotationY": 0,
        "status": "blocked",
        "speechBubble": "⚠️ Defect P2: Multi-currency rounding precision mismatch on EUR/IDR.",
        "isBlocker": true,
        "jiraTickets": [
          {
            "key": "SLY-208",
            "title": "Task: ⚠️ Defect P2: Multi-currency rounding precisi",
            "status": "In Progress",
            "storyPoints": 5,
            "priority": "Highest"
          }
        ],
        "bitbucket": {
          "repo": "squad-slytherin-core",
          "branch": "main",
          "activePR": null,
          "prStatus": null,
          "lastCommit": "30 mins ago",
          "sonarScore": 92
        }
      }
    ]
  },
  {
    "id": "squad-red",
    "name": "Row 3: Squad Red (Risk, Fraud & Security)",
    "alias": "Red",
    "leadPN": "PN 90112344 (Bambang Soediro)",
    "sprint": "Sprint 14 (Day 3/10)",
    "sprintGoal": "Real-Time Fraud Detection Engine & Suspicious Pattern Blocking",
    "zoneCenter": [
      10,
      0,
      10.5
    ],
    "zoneColor": "#ef4444",
    "metrics": {
      "totalStoryPoints": 65,
      "completedStoryPoints": 30,
      "defects": {
        "p1": 1,
        "p2": 1,
        "p3": 2
      },
      "approvals": {
        "brd": true,
        "sitSignOff": true,
        "uatSignOff": false,
        "secmanSignOff": false,
        "rfcDeployment": false
      },
      "pipeline": {
        "stage": "DEV",
        "health": "yellow",
        "sonarCoverage": 91.2
      }
    },
    "members": [
      {
        "id": "squad-red-in-1",
        "pn": "901210",
        "name": "Bambang Soediro",
        "shortName": "Bambang",
        "isStanding": false,
        "role": "SL",
        "avatarColor": "#f59e0b",
        "deskPosition": [
          4.8,
          0,
          10.09
        ],
        "rotationY": 3.141592653589793,
        "status": "active",
        "speechBubble": "Risk model scoring tuning for QRIS suspicious velocity.",
        "isBlocker": false,
        "jiraTickets": [
          {
            "key": "RED-101",
            "title": "Task: Risk model scoring tuning for QRIS suspicious",
            "status": "In Progress",
            "storyPoints": 5,
            "priority": "High"
          }
        ],
        "bitbucket": {
          "repo": "squad-red-service",
          "branch": "main",
          "activePR": null,
          "prStatus": null,
          "lastCommit": "1 hour ago",
          "sonarScore": 94
        }
      },
      {
        "id": "squad-red-in-2",
        "pn": "901211",
        "name": "Indah Kusuma",
        "shortName": "Indah",
        "isStanding": false,
        "role": "SM",
        "avatarColor": "#8b5cf6",
        "deskPosition": [
          6.4,
          0,
          10.09
        ],
        "rotationY": 3.141592653589793,
        "status": "active",
        "speechBubble": "Sprint review with Risk Governance team scheduled.",
        "isBlocker": false,
        "jiraTickets": [
          {
            "key": "RED-102",
            "title": "Task: Sprint review with Risk Governance team sched",
            "status": "In Progress",
            "storyPoints": 5,
            "priority": "High"
          }
        ],
        "bitbucket": {
          "repo": "squad-red-service",
          "branch": "main",
          "activePR": null,
          "prStatus": null,
          "lastCommit": "1 hour ago",
          "sonarScore": 94
        }
      },
      {
        "id": "squad-red-in-3",
        "pn": "901212",
        "name": "Riko Pratama",
        "shortName": "Riko",
        "isStanding": false,
        "role": "BE",
        "avatarColor": "#b91c1c",
        "deskPosition": [
          4.8,
          0,
          10.91
        ],
        "rotationY": 0,
        "status": "active",
        "speechBubble": "ML feature store integration for fraud classification.",
        "isBlocker": false,
        "jiraTickets": [
          {
            "key": "RED-103",
            "title": "Task: ML feature store integration for fraud classi",
            "status": "In Progress",
            "storyPoints": 5,
            "priority": "High"
          }
        ],
        "bitbucket": {
          "repo": "squad-red-service",
          "branch": "main",
          "activePR": null,
          "prStatus": null,
          "lastCommit": "1 hour ago",
          "sonarScore": 94
        }
      },
      {
        "id": "squad-red-in-4",
        "pn": "901213",
        "name": "Sari Melati",
        "shortName": "Sari",
        "isStanding": false,
        "role": "FE",
        "avatarColor": "#f43f5e",
        "deskPosition": [
          6.4,
          0,
          10.91
        ],
        "rotationY": 0,
        "status": "active",
        "speechBubble": "Real-time blacklist management UI component.",
        "isBlocker": false,
        "jiraTickets": [
          {
            "key": "RED-104",
            "title": "Task: Real-time blacklist management UI component.",
            "status": "In Progress",
            "storyPoints": 5,
            "priority": "High"
          }
        ],
        "bitbucket": {
          "repo": "squad-red-service",
          "branch": "main",
          "activePR": null,
          "prStatus": null,
          "lastCommit": "1 hour ago",
          "sonarScore": 94
        }
      },
      {
        "id": "squad-red-out-1",
        "pn": "901220",
        "name": "Agus Prasetyo",
        "shortName": "Agus",
        "isStanding": false,
        "role": "BE",
        "avatarColor": "#3b82f6",
        "deskPosition": [
          8.8,
          0,
          10.09
        ],
        "rotationY": 3.141592653589793,
        "status": "active",
        "speechBubble": "Rule engine Drools migration to Go microservice.",
        "isBlocker": false,
        "jiraTickets": [
          {
            "key": "RED-201",
            "title": "Task: Rule engine Drools migration to Go microservi",
            "status": "In Progress",
            "storyPoints": 5,
            "priority": "High"
          }
        ],
        "bitbucket": {
          "repo": "squad-red-core",
          "branch": "main",
          "activePR": null,
          "prStatus": null,
          "lastCommit": "30 mins ago",
          "sonarScore": 92
        }
      },
      {
        "id": "squad-red-out-2",
        "pn": "901221",
        "name": "Gilang Ramadhan",
        "shortName": "Gilang",
        "isStanding": false,
        "role": "BE",
        "avatarColor": "#2563eb",
        "deskPosition": [
          10.4,
          0,
          10.09
        ],
        "rotationY": 3.141592653589793,
        "status": "blocked",
        "speechBubble": "⚠️ Blocker: Connection pool timeout to Fraud DB.",
        "isBlocker": true,
        "jiraTickets": [
          {
            "key": "RED-202",
            "title": "Task: ⚠️ Blocker: Connection pool timeout to Fraud ",
            "status": "In Progress",
            "storyPoints": 5,
            "priority": "Highest"
          }
        ],
        "bitbucket": {
          "repo": "squad-red-core",
          "branch": "main",
          "activePR": null,
          "prStatus": null,
          "lastCommit": "30 mins ago",
          "sonarScore": 92
        }
      },
      {
        "id": "squad-red-out-3",
        "pn": "901222",
        "name": "Erik Sandi",
        "shortName": "Erik",
        "isStanding": false,
        "role": "BE",
        "avatarColor": "#0284c7",
        "deskPosition": [
          12,
          0,
          10.09
        ],
        "rotationY": 3.141592653589793,
        "status": "active",
        "speechBubble": "Kafka partition consumer for high-velocity payment.",
        "isBlocker": false,
        "jiraTickets": [
          {
            "key": "RED-203",
            "title": "Task: Kafka partition consumer for high-velocity pa",
            "status": "In Progress",
            "storyPoints": 5,
            "priority": "High"
          }
        ],
        "bitbucket": {
          "repo": "squad-red-core",
          "branch": "main",
          "activePR": null,
          "prStatus": null,
          "lastCommit": "30 mins ago",
          "sonarScore": 92
        }
      },
      {
        "id": "squad-red-out-4",
        "pn": "901223",
        "name": "Wawan Setiawan",
        "shortName": "Wawan",
        "isStanding": false,
        "role": "BE",
        "avatarColor": "#0369a1",
        "deskPosition": [
          13.6,
          0,
          10.09
        ],
        "rotationY": 3.141592653589793,
        "status": "active",
        "speechBubble": "Zero-trust IAM token verification middleware.",
        "isBlocker": false,
        "jiraTickets": [
          {
            "key": "RED-204",
            "title": "Task: Zero-trust IAM token verification middleware.",
            "status": "In Progress",
            "storyPoints": 5,
            "priority": "High"
          }
        ],
        "bitbucket": {
          "repo": "squad-red-core",
          "branch": "main",
          "activePR": null,
          "prStatus": null,
          "lastCommit": "30 mins ago",
          "sonarScore": 92
        }
      },
      {
        "id": "squad-red-out-5",
        "pn": "901224",
        "name": "Dewi Lestari",
        "shortName": "Dewi",
        "isStanding": false,
        "role": "FE",
        "avatarColor": "#ec4899",
        "deskPosition": [
          8.8,
          0,
          10.91
        ],
        "rotationY": 0,
        "status": "active",
        "speechBubble": "Fraud alerts dashboard realtime WebSocket integration.",
        "isBlocker": false,
        "jiraTickets": [
          {
            "key": "RED-205",
            "title": "Task: Fraud alerts dashboard realtime WebSocket int",
            "status": "In Progress",
            "storyPoints": 5,
            "priority": "High"
          }
        ],
        "bitbucket": {
          "repo": "squad-red-core",
          "branch": "main",
          "activePR": null,
          "prStatus": null,
          "lastCommit": "30 mins ago",
          "sonarScore": 92
        }
      },
      {
        "id": "squad-red-out-6",
        "pn": "901225",
        "name": "Fandi Ahmad",
        "shortName": "Fandi",
        "isStanding": false,
        "role": "FE",
        "avatarColor": "#06b6d4",
        "deskPosition": [
          10.4,
          0,
          10.91
        ],
        "rotationY": 0,
        "status": "active",
        "speechBubble": "Transaction replay timeline UI component ready.",
        "isBlocker": false,
        "jiraTickets": [
          {
            "key": "RED-206",
            "title": "Task: Transaction replay timeline UI component read",
            "status": "In Progress",
            "storyPoints": 5,
            "priority": "High"
          }
        ],
        "bitbucket": {
          "repo": "squad-red-core",
          "branch": "main",
          "activePR": null,
          "prStatus": null,
          "lastCommit": "30 mins ago",
          "sonarScore": 92
        }
      },
      {
        "id": "squad-red-out-7",
        "pn": "901226",
        "name": "Lestari Handayani",
        "shortName": "Lestari",
        "isStanding": false,
        "role": "QA",
        "avatarColor": "#10b981",
        "deskPosition": [
          12,
          0,
          10.91
        ],
        "rotationY": 0,
        "status": "active",
        "speechBubble": "Load testing fraud rule engine with 15k TPS.",
        "isBlocker": false,
        "jiraTickets": [
          {
            "key": "RED-207",
            "title": "Task: Load testing fraud rule engine with 15k TPS.",
            "status": "In Progress",
            "storyPoints": 5,
            "priority": "High"
          }
        ],
        "bitbucket": {
          "repo": "squad-red-core",
          "branch": "main",
          "activePR": null,
          "prStatus": null,
          "lastCommit": "30 mins ago",
          "sonarScore": 92
        }
      },
      {
        "id": "squad-red-out-8",
        "pn": "901227",
        "name": "Rudi Hermawan",
        "shortName": "Rudi",
        "isStanding": false,
        "role": "QA",
        "avatarColor": "#059669",
        "deskPosition": [
          13.6,
          0,
          10.91
        ],
        "rotationY": 0,
        "status": "active",
        "speechBubble": "Defect verification on duplicate card check.",
        "isBlocker": false,
        "jiraTickets": [
          {
            "key": "RED-208",
            "title": "Task: Defect verification on duplicate card check.",
            "status": "In Progress",
            "storyPoints": 5,
            "priority": "High"
          }
        ],
        "bitbucket": {
          "repo": "squad-red-core",
          "branch": "main",
          "activePR": null,
          "prStatus": null,
          "lastCommit": "30 mins ago",
          "sonarScore": 92
        }
      }
    ]
  },
  {
    "id": "squad-pegasus",
    "name": "Row 4: Squad Pegasus (Merchant Soundbox & IoT)",
    "alias": "Pegasus",
    "leadPN": "PN 90145678 (Hendro Nugroho)",
    "sprint": "Sprint 22 (Day 8/10)",
    "sprintGoal": "Merchant QRIS Soundbox & POS Terminal IoT Bluetooth Sync",
    "zoneCenter": [
      10,
      0,
      6.3
    ],
    "zoneColor": "#8b5cf6",
    "metrics": {
      "totalStoryPoints": 70,
      "completedStoryPoints": 58,
      "defects": {
        "p1": 0,
        "p2": 1,
        "p3": 1
      },
      "approvals": {
        "brd": true,
        "sitSignOff": true,
        "uatSignOff": true,
        "secmanSignOff": false,
        "rfcDeployment": false
      },
      "pipeline": {
        "stage": "UAT",
        "health": "green",
        "sonarCoverage": 93.8
      }
    },
    "members": [
      {
        "id": "squad-pegasus-in-1",
        "pn": "901310",
        "name": "Hendro Nugroho",
        "shortName": "Hendro",
        "isStanding": false,
        "role": "SL",
        "avatarColor": "#f59e0b",
        "deskPosition": [
          4.8,
          0,
          5.89
        ],
        "rotationY": 3.141592653589793,
        "status": "active",
        "speechBubble": "Pilot rollout 500 soundbox unit di merchant DKI.",
        "isBlocker": false,
        "jiraTickets": [
          {
            "key": "PEG-101",
            "title": "Task: Pilot rollout 500 soundbox unit di merchant D",
            "status": "In Progress",
            "storyPoints": 5,
            "priority": "High"
          }
        ],
        "bitbucket": {
          "repo": "squad-pegasus-service",
          "branch": "main",
          "activePR": null,
          "prStatus": null,
          "lastCommit": "1 hour ago",
          "sonarScore": 94
        }
      },
      {
        "id": "squad-pegasus-in-2",
        "pn": "901311",
        "name": "Ratna Juwita",
        "shortName": "Ratna",
        "isStanding": false,
        "role": "SM",
        "avatarColor": "#8b5cf6",
        "deskPosition": [
          6.4,
          0,
          5.89
        ],
        "rotationY": 3.141592653589793,
        "status": "active",
        "speechBubble": "UAT sign-off document from Retail Banking received.",
        "isBlocker": false,
        "jiraTickets": [
          {
            "key": "PEG-102",
            "title": "Task: UAT sign-off document from Retail Banking rec",
            "status": "In Progress",
            "storyPoints": 5,
            "priority": "High"
          }
        ],
        "bitbucket": {
          "repo": "squad-pegasus-service",
          "branch": "main",
          "activePR": null,
          "prStatus": null,
          "lastCommit": "1 hour ago",
          "sonarScore": 94
        }
      },
      {
        "id": "squad-pegasus-in-3",
        "pn": "901312",
        "name": "Adit Nugroho",
        "shortName": "Adit",
        "isStanding": false,
        "role": "BE",
        "avatarColor": "#7c3aed",
        "deskPosition": [
          4.8,
          0,
          6.71
        ],
        "rotationY": 0,
        "status": "active",
        "speechBubble": "Soundbox audio synthesis cache layer ready.",
        "isBlocker": false,
        "jiraTickets": [
          {
            "key": "PEG-103",
            "title": "Task: Soundbox audio synthesis cache layer ready.",
            "status": "In Progress",
            "storyPoints": 5,
            "priority": "High"
          }
        ],
        "bitbucket": {
          "repo": "squad-pegasus-service",
          "branch": "main",
          "activePR": null,
          "prStatus": null,
          "lastCommit": "1 hour ago",
          "sonarScore": 94
        }
      },
      {
        "id": "squad-pegasus-in-4",
        "pn": "901313",
        "name": "Mega Bintang",
        "shortName": "Mega",
        "isStanding": false,
        "role": "FE",
        "avatarColor": "#c084fc",
        "deskPosition": [
          6.4,
          0,
          6.71
        ],
        "rotationY": 0,
        "status": "active",
        "speechBubble": "Device firmware management dashboard.",
        "isBlocker": false,
        "jiraTickets": [
          {
            "key": "PEG-104",
            "title": "Task: Device firmware management dashboard.",
            "status": "In Progress",
            "storyPoints": 5,
            "priority": "High"
          }
        ],
        "bitbucket": {
          "repo": "squad-pegasus-service",
          "branch": "main",
          "activePR": null,
          "prStatus": null,
          "lastCommit": "1 hour ago",
          "sonarScore": 94
        }
      },
      {
        "id": "squad-pegasus-out-1",
        "pn": "901320",
        "name": "Iqbal Maulana",
        "shortName": "Iqbal",
        "isStanding": false,
        "role": "BE",
        "avatarColor": "#3b82f6",
        "deskPosition": [
          8.8,
          0,
          5.89
        ],
        "rotationY": 3.141592653589793,
        "status": "active",
        "speechBubble": "MQTT broker clustering for 1M IoT devices ready.",
        "isBlocker": false,
        "jiraTickets": [
          {
            "key": "PEG-201",
            "title": "Task: MQTT broker clustering for 1M IoT devices rea",
            "status": "In Progress",
            "storyPoints": 5,
            "priority": "High"
          }
        ],
        "bitbucket": {
          "repo": "squad-pegasus-core",
          "branch": "main",
          "activePR": null,
          "prStatus": null,
          "lastCommit": "30 mins ago",
          "sonarScore": 92
        }
      },
      {
        "id": "squad-pegasus-out-2",
        "pn": "901321",
        "name": "Gita Savitri",
        "shortName": "Gita",
        "isStanding": false,
        "role": "BE",
        "avatarColor": "#2563eb",
        "deskPosition": [
          10.4,
          0,
          5.89
        ],
        "rotationY": 3.141592653589793,
        "status": "active",
        "speechBubble": "Firmware OTA update encryption verification.",
        "isBlocker": false,
        "jiraTickets": [
          {
            "key": "PEG-202",
            "title": "Task: Firmware OTA update encryption verification.",
            "status": "In Progress",
            "storyPoints": 5,
            "priority": "High"
          }
        ],
        "bitbucket": {
          "repo": "squad-pegasus-core",
          "branch": "main",
          "activePR": null,
          "prStatus": null,
          "lastCommit": "30 mins ago",
          "sonarScore": 92
        }
      },
      {
        "id": "squad-pegasus-out-3",
        "pn": "901322",
        "name": "Arya Putra",
        "shortName": "Arya",
        "isStanding": false,
        "role": "BE",
        "avatarColor": "#0284c7",
        "deskPosition": [
          12,
          0,
          5.89
        ],
        "rotationY": 3.141592653589793,
        "status": "active",
        "speechBubble": "POS hardware serial driver integration.",
        "isBlocker": false,
        "jiraTickets": [
          {
            "key": "PEG-203",
            "title": "Task: POS hardware serial driver integration.",
            "status": "In Progress",
            "storyPoints": 5,
            "priority": "High"
          }
        ],
        "bitbucket": {
          "repo": "squad-pegasus-core",
          "branch": "main",
          "activePR": null,
          "prStatus": null,
          "lastCommit": "30 mins ago",
          "sonarScore": 92
        }
      },
      {
        "id": "squad-pegasus-out-4",
        "pn": "901323",
        "name": "Dodi Hidayat",
        "shortName": "Dodi",
        "isStanding": false,
        "role": "BE",
        "avatarColor": "#0369a1",
        "deskPosition": [
          13.6,
          0,
          5.89
        ],
        "rotationY": 3.141592653589793,
        "status": "active",
        "speechBubble": "Telemetry streaming buffer tuning.",
        "isBlocker": false,
        "jiraTickets": [
          {
            "key": "PEG-204",
            "title": "Task: Telemetry streaming buffer tuning.",
            "status": "In Progress",
            "storyPoints": 5,
            "priority": "High"
          }
        ],
        "bitbucket": {
          "repo": "squad-pegasus-core",
          "branch": "main",
          "activePR": null,
          "prStatus": null,
          "lastCommit": "30 mins ago",
          "sonarScore": 92
        }
      },
      {
        "id": "squad-pegasus-out-5",
        "pn": "901324",
        "name": "Bayu Wibowo",
        "shortName": "Bayu",
        "isStanding": false,
        "role": "FE",
        "avatarColor": "#ec4899",
        "deskPosition": [
          8.8,
          0,
          6.71
        ],
        "rotationY": 0,
        "status": "active",
        "speechBubble": "Merchant terminal status live telemetry widget.",
        "isBlocker": false,
        "jiraTickets": [
          {
            "key": "PEG-205",
            "title": "Task: Merchant terminal status live telemetry widge",
            "status": "In Progress",
            "storyPoints": 5,
            "priority": "High"
          }
        ],
        "bitbucket": {
          "repo": "squad-pegasus-core",
          "branch": "main",
          "activePR": null,
          "prStatus": null,
          "lastCommit": "30 mins ago",
          "sonarScore": 92
        }
      },
      {
        "id": "squad-pegasus-out-6",
        "pn": "901325",
        "name": "Tari Permata",
        "shortName": "Tari",
        "isStanding": false,
        "role": "FE",
        "avatarColor": "#06b6d4",
        "deskPosition": [
          10.4,
          0,
          6.71
        ],
        "rotationY": 0,
        "status": "active",
        "speechBubble": "Soundbox voice prompt audio selector UI.",
        "isBlocker": false,
        "jiraTickets": [
          {
            "key": "PEG-206",
            "title": "Task: Soundbox voice prompt audio selector UI.",
            "status": "In Progress",
            "storyPoints": 5,
            "priority": "High"
          }
        ],
        "bitbucket": {
          "repo": "squad-pegasus-core",
          "branch": "main",
          "activePR": null,
          "prStatus": null,
          "lastCommit": "30 mins ago",
          "sonarScore": 92
        }
      },
      {
        "id": "squad-pegasus-out-7",
        "pn": "901326",
        "name": "Wahyu Hidayat",
        "shortName": "Wahyu",
        "isStanding": false,
        "role": "QA",
        "avatarColor": "#10b981",
        "deskPosition": [
          12,
          0,
          6.71
        ],
        "rotationY": 0,
        "status": "active",
        "speechBubble": "Automated battery consumption stress test running.",
        "isBlocker": false,
        "jiraTickets": [
          {
            "key": "PEG-207",
            "title": "Task: Automated battery consumption stress test run",
            "status": "In Progress",
            "storyPoints": 5,
            "priority": "High"
          }
        ],
        "bitbucket": {
          "repo": "squad-pegasus-core",
          "branch": "main",
          "activePR": null,
          "prStatus": null,
          "lastCommit": "30 mins ago",
          "sonarScore": 92
        }
      },
      {
        "id": "squad-pegasus-out-8",
        "pn": "901327",
        "name": "Dian Pratiwi",
        "shortName": "Dian",
        "isStanding": false,
        "role": "QA",
        "avatarColor": "#059669",
        "deskPosition": [
          13.6,
          0,
          6.71
        ],
        "rotationY": 0,
        "status": "active",
        "speechBubble": "Bluetooth LE reconnect automated test passed.",
        "isBlocker": false,
        "jiraTickets": [
          {
            "key": "PEG-208",
            "title": "Task: Bluetooth LE reconnect automated test passed.",
            "status": "In Progress",
            "storyPoints": 5,
            "priority": "High"
          }
        ],
        "bitbucket": {
          "repo": "squad-pegasus-core",
          "branch": "main",
          "activePR": null,
          "prStatus": null,
          "lastCommit": "30 mins ago",
          "sonarScore": 92
        }
      }
    ]
  },
  {
    "id": "squad-athena",
    "name": "Row 5: Squad Athena (Cross-Border Gateway)",
    "alias": "Athena",
    "leadPN": "PN 90178901 (Vina Panduwinata)",
    "sprint": "Sprint 31 (Day 4/10)",
    "sprintGoal": "QRIS CPM Cross-Border Singapore & Malaysia Gateway Integration",
    "zoneCenter": [
      10,
      0,
      2.1
    ],
    "zoneColor": "#f59e0b",
    "metrics": {
      "totalStoryPoints": 75,
      "completedStoryPoints": 42,
      "defects": {
        "p1": 1,
        "p2": 0,
        "p3": 2
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
        "sonarCoverage": 95
      }
    },
    "members": [
      {
        "id": "squad-athena-in-1",
        "pn": "901410",
        "name": "Vina Panduwinata",
        "shortName": "Vina",
        "isStanding": false,
        "role": "SL",
        "avatarColor": "#f59e0b",
        "deskPosition": [
          4.8,
          0,
          1.69
        ],
        "rotationY": 3.141592653589793,
        "status": "active",
        "speechBubble": "Cross-border payment switcher PayNet Malaysia testing.",
        "isBlocker": false,
        "jiraTickets": [
          {
            "key": "ATH-101",
            "title": "Task: Cross-border payment switcher PayNet Malaysia",
            "status": "In Progress",
            "storyPoints": 5,
            "priority": "High"
          }
        ],
        "bitbucket": {
          "repo": "squad-athena-service",
          "branch": "main",
          "activePR": null,
          "prStatus": null,
          "lastCommit": "1 hour ago",
          "sonarScore": 94
        }
      },
      {
        "id": "squad-athena-in-2",
        "pn": "901411",
        "name": "Yoga Pratama",
        "shortName": "Yoga",
        "isStanding": false,
        "role": "SM",
        "avatarColor": "#8b5cf6",
        "deskPosition": [
          6.4,
          0,
          1.69
        ],
        "rotationY": 3.141592653589793,
        "status": "active",
        "speechBubble": "Cross-border settlement currency conversion SLA agreed.",
        "isBlocker": false,
        "jiraTickets": [
          {
            "key": "ATH-102",
            "title": "Task: Cross-border settlement currency conversion S",
            "status": "In Progress",
            "storyPoints": 5,
            "priority": "High"
          }
        ],
        "bitbucket": {
          "repo": "squad-athena-service",
          "branch": "main",
          "activePR": null,
          "prStatus": null,
          "lastCommit": "1 hour ago",
          "sonarScore": 94
        }
      },
      {
        "id": "squad-athena-in-3",
        "pn": "901412",
        "name": "Bimo Sakti",
        "shortName": "Bimo",
        "isStanding": false,
        "role": "BE",
        "avatarColor": "#d97706",
        "deskPosition": [
          4.8,
          0,
          2.51
        ],
        "rotationY": 0,
        "status": "active",
        "speechBubble": "Real-time FX rate sync with Bank of Thailand.",
        "isBlocker": false,
        "jiraTickets": [
          {
            "key": "ATH-103",
            "title": "Task: Real-time FX rate sync with Bank of Thailand.",
            "status": "In Progress",
            "storyPoints": 5,
            "priority": "High"
          }
        ],
        "bitbucket": {
          "repo": "squad-athena-service",
          "branch": "main",
          "activePR": null,
          "prStatus": null,
          "lastCommit": "1 hour ago",
          "sonarScore": 94
        }
      },
      {
        "id": "squad-athena-in-4",
        "pn": "901413",
        "name": "Clara Shinta",
        "shortName": "Clara",
        "isStanding": false,
        "role": "FE",
        "avatarColor": "#fbbf24",
        "deskPosition": [
          6.4,
          0,
          2.51
        ],
        "rotationY": 0,
        "status": "active",
        "speechBubble": "Cross-border currency selector bottom sheet UI.",
        "isBlocker": false,
        "jiraTickets": [
          {
            "key": "ATH-104",
            "title": "Task: Cross-border currency selector bottom sheet U",
            "status": "In Progress",
            "storyPoints": 5,
            "priority": "High"
          }
        ],
        "bitbucket": {
          "repo": "squad-athena-service",
          "branch": "main",
          "activePR": null,
          "prStatus": null,
          "lastCommit": "1 hour ago",
          "sonarScore": 94
        }
      },
      {
        "id": "squad-athena-out-1",
        "pn": "901420",
        "name": "Farhan Maulana",
        "shortName": "Farhan",
        "isStanding": false,
        "role": "BE",
        "avatarColor": "#3b82f6",
        "deskPosition": [
          8.8,
          0,
          1.69
        ],
        "rotationY": 3.141592653589793,
        "status": "blocked",
        "speechBubble": "⚠️ Blocker: Network timeout to NETS Singapore sandbox.",
        "isBlocker": true,
        "jiraTickets": [
          {
            "key": "ATH-201",
            "title": "Task: ⚠️ Blocker: Network timeout to NETS Singapore",
            "status": "In Progress",
            "storyPoints": 5,
            "priority": "Highest"
          }
        ],
        "bitbucket": {
          "repo": "squad-athena-core",
          "branch": "main",
          "activePR": null,
          "prStatus": null,
          "lastCommit": "30 mins ago",
          "sonarScore": 92
        }
      },
      {
        "id": "squad-athena-out-2",
        "pn": "901421",
        "name": "Taufik Hidayat",
        "shortName": "Taufik",
        "isStanding": false,
        "role": "BE",
        "avatarColor": "#2563eb",
        "deskPosition": [
          10.4,
          0,
          1.69
        ],
        "rotationY": 3.141592653589793,
        "status": "active",
        "speechBubble": "Dynamic currency conversion ISO8583 adapter ready.",
        "isBlocker": false,
        "jiraTickets": [
          {
            "key": "ATH-202",
            "title": "Task: Dynamic currency conversion ISO8583 adapter r",
            "status": "In Progress",
            "storyPoints": 5,
            "priority": "High"
          }
        ],
        "bitbucket": {
          "repo": "squad-athena-core",
          "branch": "main",
          "activePR": null,
          "prStatus": null,
          "lastCommit": "30 mins ago",
          "sonarScore": 92
        }
      },
      {
        "id": "squad-athena-out-3",
        "pn": "901422",
        "name": "Kevin Anggara",
        "shortName": "Kevin",
        "isStanding": false,
        "role": "BE",
        "avatarColor": "#0284c7",
        "deskPosition": [
          12,
          0,
          1.69
        ],
        "rotationY": 3.141592653589793,
        "status": "active",
        "speechBubble": "Payload signature validation using HSM keys.",
        "isBlocker": false,
        "jiraTickets": [
          {
            "key": "ATH-203",
            "title": "Task: Payload signature validation using HSM keys.",
            "status": "In Progress",
            "storyPoints": 5,
            "priority": "High"
          }
        ],
        "bitbucket": {
          "repo": "squad-athena-core",
          "branch": "main",
          "activePR": null,
          "prStatus": null,
          "lastCommit": "30 mins ago",
          "sonarScore": 92
        }
      },
      {
        "id": "squad-athena-out-4",
        "pn": "901423",
        "name": "Fikri Haikal",
        "shortName": "Fikri",
        "isStanding": false,
        "role": "BE",
        "avatarColor": "#0369a1",
        "deskPosition": [
          13.6,
          0,
          1.69
        ],
        "rotationY": 3.141592653589793,
        "status": "active",
        "speechBubble": "Automated settlement retry mechanism.",
        "isBlocker": false,
        "jiraTickets": [
          {
            "key": "ATH-204",
            "title": "Task: Automated settlement retry mechanism.",
            "status": "In Progress",
            "storyPoints": 5,
            "priority": "High"
          }
        ],
        "bitbucket": {
          "repo": "squad-athena-core",
          "branch": "main",
          "activePR": null,
          "prStatus": null,
          "lastCommit": "30 mins ago",
          "sonarScore": 92
        }
      },
      {
        "id": "squad-athena-out-5",
        "pn": "901424",
        "name": "Siska Wahyuni",
        "shortName": "Siska",
        "isStanding": false,
        "role": "FE",
        "avatarColor": "#ec4899",
        "deskPosition": [
          8.8,
          0,
          2.51
        ],
        "rotationY": 0,
        "status": "active",
        "speechBubble": "Tourist payment voucher & receipt localized.",
        "isBlocker": false,
        "jiraTickets": [
          {
            "key": "ATH-205",
            "title": "Task: Tourist payment voucher & receipt localized.",
            "status": "In Progress",
            "storyPoints": 5,
            "priority": "High"
          }
        ],
        "bitbucket": {
          "repo": "squad-athena-core",
          "branch": "main",
          "activePR": null,
          "prStatus": null,
          "lastCommit": "30 mins ago",
          "sonarScore": 92
        }
      },
      {
        "id": "squad-athena-out-6",
        "pn": "901425",
        "name": "Aditya Nugraha",
        "shortName": "Aditya",
        "isStanding": false,
        "role": "FE",
        "avatarColor": "#06b6d4",
        "deskPosition": [
          10.4,
          0,
          2.51
        ],
        "rotationY": 0,
        "status": "active",
        "speechBubble": "Multi-language scanner prompt Indonesian & English.",
        "isBlocker": false,
        "jiraTickets": [
          {
            "key": "ATH-206",
            "title": "Task: Multi-language scanner prompt Indonesian & En",
            "status": "In Progress",
            "storyPoints": 5,
            "priority": "High"
          }
        ],
        "bitbucket": {
          "repo": "squad-athena-core",
          "branch": "main",
          "activePR": null,
          "prStatus": null,
          "lastCommit": "30 mins ago",
          "sonarScore": 92
        }
      },
      {
        "id": "squad-athena-out-7",
        "pn": "901426",
        "name": "Anisa Rahmawati",
        "shortName": "Anisa",
        "isStanding": false,
        "role": "QA",
        "avatarColor": "#10b981",
        "deskPosition": [
          12,
          0,
          2.51
        ],
        "rotationY": 0,
        "status": "active",
        "speechBubble": "Integration suite CPM ISO20022 message test.",
        "isBlocker": false,
        "jiraTickets": [
          {
            "key": "ATH-207",
            "title": "Task: Integration suite CPM ISO20022 message test.",
            "status": "In Progress",
            "storyPoints": 5,
            "priority": "High"
          }
        ],
        "bitbucket": {
          "repo": "squad-athena-core",
          "branch": "main",
          "activePR": null,
          "prStatus": null,
          "lastCommit": "30 mins ago",
          "sonarScore": 92
        }
      },
      {
        "id": "squad-athena-out-8",
        "pn": "901427",
        "name": "Rizky Fadilah",
        "shortName": "Rizky",
        "isStanding": false,
        "role": "QA",
        "avatarColor": "#059669",
        "deskPosition": [
          13.6,
          0,
          2.51
        ],
        "rotationY": 0,
        "status": "active",
        "speechBubble": "Exchange rate drift tolerance test verified.",
        "isBlocker": false,
        "jiraTickets": [
          {
            "key": "ATH-208",
            "title": "Task: Exchange rate drift tolerance test verified.",
            "status": "In Progress",
            "storyPoints": 5,
            "priority": "High"
          }
        ],
        "bitbucket": {
          "repo": "squad-athena-core",
          "branch": "main",
          "activePR": null,
          "prStatus": null,
          "lastCommit": "30 mins ago",
          "sonarScore": 92
        }
      }
    ]
  },
  {
    "id": "squad-titan",
    "name": "Row 6: Squad Titan (Settlement & Core Reconciliation)",
    "alias": "Titan",
    "leadPN": "PN 90123456 (Gunawan Wibisono)",
    "sprint": "Sprint 16 (Day 6/10)",
    "sprintGoal": "High-Volume Settlement Engine & Core Banking Reconciliation",
    "zoneCenter": [
      10,
      0,
      -2.1
    ],
    "zoneColor": "#6366f1",
    "metrics": {
      "totalStoryPoints": 85,
      "completedStoryPoints": 68,
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
        "stage": "SECMAN",
        "health": "green",
        "sonarCoverage": 96.2
      }
    },
    "members": [
      {
        "id": "squad-titan-in-1",
        "pn": "901510",
        "name": "Gunawan Wibisono",
        "shortName": "Gunawan",
        "isStanding": false,
        "role": "SL",
        "avatarColor": "#f59e0b",
        "deskPosition": [
          4.8,
          0,
          -2.51
        ],
        "rotationY": 3.141592653589793,
        "status": "active",
        "speechBubble": "Secman sign-off achieved! Ready for CAB RFC.",
        "isBlocker": false,
        "jiraTickets": [
          {
            "key": "TIT-101",
            "title": "Task: Secman sign-off achieved! Ready for CAB RFC.",
            "status": "In Progress",
            "storyPoints": 5,
            "priority": "High"
          }
        ],
        "bitbucket": {
          "repo": "squad-titan-service",
          "branch": "main",
          "activePR": null,
          "prStatus": null,
          "lastCommit": "1 hour ago",
          "sonarScore": 94
        }
      },
      {
        "id": "squad-titan-in-2",
        "pn": "901511",
        "name": "Mira Santika",
        "shortName": "Mira",
        "isStanding": false,
        "role": "SM",
        "avatarColor": "#8b5cf6",
        "deskPosition": [
          6.4,
          0,
          -2.51
        ],
        "rotationY": 3.141592653589793,
        "status": "active",
        "speechBubble": "RFC CAB package documentation prepared.",
        "isBlocker": false,
        "jiraTickets": [
          {
            "key": "TIT-102",
            "title": "Task: RFC CAB package documentation prepared.",
            "status": "In Progress",
            "storyPoints": 5,
            "priority": "High"
          }
        ],
        "bitbucket": {
          "repo": "squad-titan-service",
          "branch": "main",
          "activePR": null,
          "prStatus": null,
          "lastCommit": "1 hour ago",
          "sonarScore": 94
        }
      },
      {
        "id": "squad-titan-in-3",
        "pn": "901512",
        "name": "Agung Laksono",
        "shortName": "Agung",
        "isStanding": false,
        "role": "BE",
        "avatarColor": "#4f46e5",
        "deskPosition": [
          4.8,
          0,
          -1.69
        ],
        "rotationY": 0,
        "status": "active",
        "speechBubble": "GL account balancing cron daemon optimized.",
        "isBlocker": false,
        "jiraTickets": [
          {
            "key": "TIT-103",
            "title": "Task: GL account balancing cron daemon optimized.",
            "status": "In Progress",
            "storyPoints": 5,
            "priority": "High"
          }
        ],
        "bitbucket": {
          "repo": "squad-titan-service",
          "branch": "main",
          "activePR": null,
          "prStatus": null,
          "lastCommit": "1 hour ago",
          "sonarScore": 94
        }
      },
      {
        "id": "squad-titan-in-4",
        "pn": "901513",
        "name": "Nita Safitri",
        "shortName": "Nita",
        "isStanding": false,
        "role": "FE",
        "avatarColor": "#818cf8",
        "deskPosition": [
          6.4,
          0,
          -1.69
        ],
        "rotationY": 0,
        "status": "active",
        "speechBubble": "Financial summary export to Excel & BI Datafeed.",
        "isBlocker": false,
        "jiraTickets": [
          {
            "key": "TIT-104",
            "title": "Task: Financial summary export to Excel & BI Datafe",
            "status": "In Progress",
            "storyPoints": 5,
            "priority": "High"
          }
        ],
        "bitbucket": {
          "repo": "squad-titan-service",
          "branch": "main",
          "activePR": null,
          "prStatus": null,
          "lastCommit": "1 hour ago",
          "sonarScore": 94
        }
      },
      {
        "id": "squad-titan-out-1",
        "pn": "901520",
        "name": "Prasetyo Utomo",
        "shortName": "Prasetyo",
        "isStanding": false,
        "role": "BE",
        "avatarColor": "#3b82f6",
        "deskPosition": [
          8.8,
          0,
          -2.51
        ],
        "rotationY": 3.141592653589793,
        "status": "active",
        "speechBubble": "Batch settlement processing 10M records in 4 mins.",
        "isBlocker": false,
        "jiraTickets": [
          {
            "key": "TIT-201",
            "title": "Task: Batch settlement processing 10M records in 4 ",
            "status": "In Progress",
            "storyPoints": 5,
            "priority": "High"
          }
        ],
        "bitbucket": {
          "repo": "squad-titan-core",
          "branch": "main",
          "activePR": null,
          "prStatus": null,
          "lastCommit": "30 mins ago",
          "sonarScore": 92
        }
      },
      {
        "id": "squad-titan-out-2",
        "pn": "901521",
        "name": "Eko Prasetyo",
        "shortName": "Eko",
        "isStanding": false,
        "role": "BE",
        "avatarColor": "#2563eb",
        "deskPosition": [
          10.4,
          0,
          -2.51
        ],
        "rotationY": 3.141592653589793,
        "status": "active",
        "speechBubble": "EOD reconciliation diff analyzer optimized.",
        "isBlocker": false,
        "jiraTickets": [
          {
            "key": "TIT-202",
            "title": "Task: EOD reconciliation diff analyzer optimized.",
            "status": "In Progress",
            "storyPoints": 5,
            "priority": "High"
          }
        ],
        "bitbucket": {
          "repo": "squad-titan-core",
          "branch": "main",
          "activePR": null,
          "prStatus": null,
          "lastCommit": "30 mins ago",
          "sonarScore": 92
        }
      },
      {
        "id": "squad-titan-out-3",
        "pn": "901522",
        "name": "Bambang Kusuma",
        "shortName": "Bambang",
        "isStanding": false,
        "role": "BE",
        "avatarColor": "#0284c7",
        "deskPosition": [
          12,
          0,
          -2.51
        ],
        "rotationY": 3.141592653589793,
        "status": "active",
        "speechBubble": "Distributed lock manager Redis Redlock tuned.",
        "isBlocker": false,
        "jiraTickets": [
          {
            "key": "TIT-203",
            "title": "Task: Distributed lock manager Redis Redlock tuned.",
            "status": "In Progress",
            "storyPoints": 5,
            "priority": "High"
          }
        ],
        "bitbucket": {
          "repo": "squad-titan-core",
          "branch": "main",
          "activePR": null,
          "prStatus": null,
          "lastCommit": "30 mins ago",
          "sonarScore": 92
        }
      },
      {
        "id": "squad-titan-out-4",
        "pn": "901523",
        "name": "Rahmat Hidayat",
        "shortName": "Rahmat",
        "isStanding": false,
        "role": "BE",
        "avatarColor": "#0369a1",
        "deskPosition": [
          13.6,
          0,
          -2.51
        ],
        "rotationY": 3.141592653589793,
        "status": "active",
        "speechBubble": "Discrepancy auto-repair script benchmarked.",
        "isBlocker": false,
        "jiraTickets": [
          {
            "key": "TIT-204",
            "title": "Task: Discrepancy auto-repair script benchmarked.",
            "status": "In Progress",
            "storyPoints": 5,
            "priority": "High"
          }
        ],
        "bitbucket": {
          "repo": "squad-titan-core",
          "branch": "main",
          "activePR": null,
          "prStatus": null,
          "lastCommit": "30 mins ago",
          "sonarScore": 92
        }
      },
      {
        "id": "squad-titan-out-5",
        "pn": "901524",
        "name": "Joko Susilo",
        "shortName": "Joko",
        "isStanding": false,
        "role": "FE",
        "avatarColor": "#ec4899",
        "deskPosition": [
          8.8,
          0,
          -1.69
        ],
        "rotationY": 0,
        "status": "active",
        "speechBubble": "Settlement dashboard high-volume data grid virtualized.",
        "isBlocker": false,
        "jiraTickets": [
          {
            "key": "TIT-205",
            "title": "Task: Settlement dashboard high-volume data grid vi",
            "status": "In Progress",
            "storyPoints": 5,
            "priority": "High"
          }
        ],
        "bitbucket": {
          "repo": "squad-titan-core",
          "branch": "main",
          "activePR": null,
          "prStatus": null,
          "lastCommit": "30 mins ago",
          "sonarScore": 92
        }
      },
      {
        "id": "squad-titan-out-6",
        "pn": "901525",
        "name": "Mega Utami",
        "shortName": "Mega",
        "isStanding": false,
        "role": "FE",
        "avatarColor": "#06b6d4",
        "deskPosition": [
          10.4,
          0,
          -1.69
        ],
        "rotationY": 0,
        "status": "active",
        "speechBubble": "Recon variance report PDF & CSV export.",
        "isBlocker": false,
        "jiraTickets": [
          {
            "key": "TIT-206",
            "title": "Task: Recon variance report PDF & CSV export.",
            "status": "In Progress",
            "storyPoints": 5,
            "priority": "High"
          }
        ],
        "bitbucket": {
          "repo": "squad-titan-core",
          "branch": "main",
          "activePR": null,
          "prStatus": null,
          "lastCommit": "30 mins ago",
          "sonarScore": 92
        }
      },
      {
        "id": "squad-titan-out-7",
        "pn": "901526",
        "name": "Sri Wahyuni",
        "shortName": "Sri",
        "isStanding": false,
        "role": "QA",
        "avatarColor": "#10b981",
        "deskPosition": [
          12,
          0,
          -1.69
        ],
        "rotationY": 0,
        "status": "active",
        "speechBubble": "Performance test 25,000 TPS benchmark passed.",
        "isBlocker": false,
        "jiraTickets": [
          {
            "key": "TIT-207",
            "title": "Task: Performance test 25,000 TPS benchmark passed.",
            "status": "In Progress",
            "storyPoints": 5,
            "priority": "High"
          }
        ],
        "bitbucket": {
          "repo": "squad-titan-core",
          "branch": "main",
          "activePR": null,
          "prStatus": null,
          "lastCommit": "30 mins ago",
          "sonarScore": 92
        }
      },
      {
        "id": "squad-titan-out-8",
        "pn": "901527",
        "name": "Doni Pratama",
        "shortName": "Doni",
        "isStanding": false,
        "role": "QA",
        "avatarColor": "#059669",
        "deskPosition": [
          13.6,
          0,
          -1.69
        ],
        "rotationY": 0,
        "status": "active",
        "speechBubble": "Automated reconciliation discrepancy detector.",
        "isBlocker": false,
        "jiraTickets": [
          {
            "key": "TIT-208",
            "title": "Task: Automated reconciliation discrepancy detector",
            "status": "In Progress",
            "storyPoints": 5,
            "priority": "High"
          }
        ],
        "bitbucket": {
          "repo": "squad-titan-core",
          "branch": "main",
          "activePR": null,
          "prStatus": null,
          "lastCommit": "30 mins ago",
          "sonarScore": 92
        }
      }
    ]
  },
  {
    "id": "squad-apollo",
    "name": "Row 7: Squad Apollo (Merchant Cash Advance)",
    "alias": "Apollo",
    "leadPN": "PN 90156789 (Dedi Mulyadi)",
    "sprint": "Sprint 24 (Day 9/10)",
    "sprintGoal": "Merchant Cash Advance & Lending Underwriting Engine",
    "zoneCenter": [
      11.2,
      0,
      -6.3
    ],
    "zoneColor": "#ec4899",
    "metrics": {
      "totalStoryPoints": 68,
      "completedStoryPoints": 60,
      "defects": {
        "p1": 0,
        "p2": 0,
        "p3": 1
      },
      "approvals": {
        "brd": true,
        "sitSignOff": true,
        "uatSignOff": true,
        "secmanSignOff": false,
        "rfcDeployment": false
      },
      "pipeline": {
        "stage": "UAT",
        "health": "green",
        "sonarCoverage": 93.1
      }
    },
    "members": [
      {
        "id": "squad-apollo-out-1",
        "pn": "901620",
        "name": "Dedi Mulyadi",
        "shortName": "Dedi",
        "isStanding": false,
        "role": "SL",
        "avatarColor": "#f59e0b",
        "deskPosition": [
          8.8,
          0,
          -6.71
        ],
        "rotationY": 3.141592653589793,
        "status": "active",
        "speechBubble": "Underwriting algorithm accuracy 98.4% verified.",
        "isBlocker": false,
        "jiraTickets": [
          {
            "key": "APO-201",
            "title": "Task: Underwriting algorithm accuracy 98.4% verifie",
            "status": "In Progress",
            "storyPoints": 5,
            "priority": "High"
          }
        ],
        "bitbucket": {
          "repo": "squad-apollo-core",
          "branch": "main",
          "activePR": null,
          "prStatus": null,
          "lastCommit": "30 mins ago",
          "sonarScore": 92
        }
      },
      {
        "id": "squad-apollo-out-2",
        "pn": "901621",
        "name": "Fitri Handayani",
        "shortName": "Fitri",
        "isStanding": false,
        "role": "SM",
        "avatarColor": "#8b5cf6",
        "deskPosition": [
          10.4,
          0,
          -6.71
        ],
        "rotationY": 3.141592653589793,
        "status": "active",
        "speechBubble": "Sprint 24 retrospective scheduled tomorrow.",
        "isBlocker": false,
        "jiraTickets": [
          {
            "key": "APO-202",
            "title": "Task: Sprint 24 retrospective scheduled tomorrow.",
            "status": "In Progress",
            "storyPoints": 5,
            "priority": "High"
          }
        ],
        "bitbucket": {
          "repo": "squad-apollo-core",
          "branch": "main",
          "activePR": null,
          "prStatus": null,
          "lastCommit": "30 mins ago",
          "sonarScore": 92
        }
      },
      {
        "id": "squad-apollo-out-3",
        "pn": "901622",
        "name": "Yusuf Habibi",
        "shortName": "Yusuf",
        "isStanding": false,
        "role": "BE",
        "avatarColor": "#3b82f6",
        "deskPosition": [
          12,
          0,
          -6.71
        ],
        "rotationY": 3.141592653589793,
        "status": "active",
        "speechBubble": "Instant disbursement API integration ready.",
        "isBlocker": false,
        "jiraTickets": [
          {
            "key": "APO-203",
            "title": "Task: Instant disbursement API integration ready.",
            "status": "In Progress",
            "storyPoints": 5,
            "priority": "High"
          }
        ],
        "bitbucket": {
          "repo": "squad-apollo-core",
          "branch": "main",
          "activePR": null,
          "prStatus": null,
          "lastCommit": "30 mins ago",
          "sonarScore": 92
        }
      },
      {
        "id": "squad-apollo-out-4",
        "pn": "901623",
        "name": "Doni Firmansyah",
        "shortName": "Doni",
        "isStanding": false,
        "role": "BE",
        "avatarColor": "#2563eb",
        "deskPosition": [
          13.6,
          0,
          -6.71
        ],
        "rotationY": 3.141592653589793,
        "status": "active",
        "speechBubble": "Credit scoring engine Kafka pipeline optimized.",
        "isBlocker": false,
        "jiraTickets": [
          {
            "key": "APO-204",
            "title": "Task: Credit scoring engine Kafka pipeline optimize",
            "status": "In Progress",
            "storyPoints": 5,
            "priority": "High"
          }
        ],
        "bitbucket": {
          "repo": "squad-apollo-core",
          "branch": "main",
          "activePR": null,
          "prStatus": null,
          "lastCommit": "30 mins ago",
          "sonarScore": 92
        }
      },
      {
        "id": "squad-apollo-out-5",
        "pn": "901624",
        "name": "Hana Safitri",
        "shortName": "Hana",
        "isStanding": false,
        "role": "FE",
        "avatarColor": "#ec4899",
        "deskPosition": [
          8.8,
          0,
          -5.89
        ],
        "rotationY": 0,
        "status": "active",
        "speechBubble": "Merchant loan offer modal & tenor slider UI ready.",
        "isBlocker": false,
        "jiraTickets": [
          {
            "key": "APO-205",
            "title": "Task: Merchant loan offer modal & tenor slider UI r",
            "status": "In Progress",
            "storyPoints": 5,
            "priority": "High"
          }
        ],
        "bitbucket": {
          "repo": "squad-apollo-core",
          "branch": "main",
          "activePR": null,
          "prStatus": null,
          "lastCommit": "30 mins ago",
          "sonarScore": 92
        }
      },
      {
        "id": "squad-apollo-out-6",
        "pn": "901625",
        "name": "Surya Kencana",
        "shortName": "Surya",
        "isStanding": false,
        "role": "FE",
        "avatarColor": "#06b6d4",
        "deskPosition": [
          10.4,
          0,
          -5.89
        ],
        "rotationY": 0,
        "status": "active",
        "speechBubble": "Digital signature & e-KTP verification component.",
        "isBlocker": false,
        "jiraTickets": [
          {
            "key": "APO-206",
            "title": "Task: Digital signature & e-KTP verification compon",
            "status": "In Progress",
            "storyPoints": 5,
            "priority": "High"
          }
        ],
        "bitbucket": {
          "repo": "squad-apollo-core",
          "branch": "main",
          "activePR": null,
          "prStatus": null,
          "lastCommit": "30 mins ago",
          "sonarScore": 92
        }
      },
      {
        "id": "squad-apollo-out-7",
        "pn": "901626",
        "name": "Lia Kartika",
        "shortName": "Lia",
        "isStanding": false,
        "role": "QA",
        "avatarColor": "#10b981",
        "deskPosition": [
          12,
          0,
          -5.89
        ],
        "rotationY": 0,
        "status": "active",
        "speechBubble": "E2E automated disbursement test suite passed.",
        "isBlocker": false,
        "jiraTickets": [
          {
            "key": "APO-207",
            "title": "Task: E2E automated disbursement test suite passed.",
            "status": "In Progress",
            "storyPoints": 5,
            "priority": "High"
          }
        ],
        "bitbucket": {
          "repo": "squad-apollo-core",
          "branch": "main",
          "activePR": null,
          "prStatus": null,
          "lastCommit": "30 mins ago",
          "sonarScore": 92
        }
      },
      {
        "id": "squad-apollo-out-8",
        "pn": "901627",
        "name": "Fajar Ramadhan",
        "shortName": "Fajar",
        "isStanding": false,
        "role": "QA",
        "avatarColor": "#059669",
        "deskPosition": [
          13.6,
          0,
          -5.89
        ],
        "rotationY": 0,
        "status": "active",
        "speechBubble": "Repayment calculation precision verified.",
        "isBlocker": false,
        "jiraTickets": [
          {
            "key": "APO-208",
            "title": "Task: Repayment calculation precision verified.",
            "status": "In Progress",
            "storyPoints": 5,
            "priority": "High"
          }
        ],
        "bitbucket": {
          "repo": "squad-apollo-core",
          "branch": "main",
          "activePR": null,
          "prStatus": null,
          "lastCommit": "30 mins ago",
          "sonarScore": 92
        }
      }
    ]
  },
  {
    "id": "squad-vulcan",
    "name": "Row 8: Squad Vulcan (Disaster Recovery & CDC)",
    "alias": "Vulcan",
    "leadPN": "PN 90167890 (Aris Munandar)",
    "sprint": "Sprint 18 (Day 2/10)",
    "sprintGoal": "Disaster Recovery Warm Standby & Database CDC Streaming",
    "zoneCenter": [
      11.2,
      0,
      -10.5
    ],
    "zoneColor": "#14b8a6",
    "metrics": {
      "totalStoryPoints": 72,
      "completedStoryPoints": 20,
      "defects": {
        "p1": 0,
        "p2": 2,
        "p3": 2
      },
      "approvals": {
        "brd": true,
        "sitSignOff": false,
        "uatSignOff": false,
        "secmanSignOff": false,
        "rfcDeployment": false
      },
      "pipeline": {
        "stage": "DEV",
        "health": "yellow",
        "sonarCoverage": 90.5
      }
    },
    "members": [
      {
        "id": "squad-vulcan-out-1",
        "pn": "901720",
        "name": "Aris Munandar",
        "shortName": "Aris",
        "isStanding": false,
        "role": "SL",
        "avatarColor": "#f59e0b",
        "deskPosition": [
          8.8,
          0,
          -10.91
        ],
        "rotationY": 3.141592653589793,
        "status": "active",
        "speechBubble": "DR Drill simulation RPO < 1s, RTO < 30s achieved.",
        "isBlocker": false,
        "jiraTickets": [
          {
            "key": "VUL-201",
            "title": "Task: DR Drill simulation RPO < 1s, RTO < 30s achie",
            "status": "In Progress",
            "storyPoints": 5,
            "priority": "High"
          }
        ],
        "bitbucket": {
          "repo": "squad-vulcan-core",
          "branch": "main",
          "activePR": null,
          "prStatus": null,
          "lastCommit": "30 mins ago",
          "sonarScore": 92
        }
      },
      {
        "id": "squad-vulcan-out-2",
        "pn": "901721",
        "name": "Wulan Guritno",
        "shortName": "Wulan",
        "isStanding": false,
        "role": "SM",
        "avatarColor": "#8b5cf6",
        "deskPosition": [
          10.4,
          0,
          -10.91
        ],
        "rotationY": 3.141592653589793,
        "status": "active",
        "speechBubble": "Sprint backlog kickoff and task assignment done.",
        "isBlocker": false,
        "jiraTickets": [
          {
            "key": "VUL-202",
            "title": "Task: Sprint backlog kickoff and task assignment do",
            "status": "In Progress",
            "storyPoints": 5,
            "priority": "High"
          }
        ],
        "bitbucket": {
          "repo": "squad-vulcan-core",
          "branch": "main",
          "activePR": null,
          "prStatus": null,
          "lastCommit": "30 mins ago",
          "sonarScore": 92
        }
      },
      {
        "id": "squad-vulcan-out-3",
        "pn": "901722",
        "name": "Ilham Kusumo",
        "shortName": "Ilham",
        "isStanding": false,
        "role": "BE",
        "avatarColor": "#3b82f6",
        "deskPosition": [
          12,
          0,
          -10.91
        ],
        "rotationY": 3.141592653589793,
        "status": "active",
        "speechBubble": "Debezium CDC streaming to Secondary DC setup.",
        "isBlocker": false,
        "jiraTickets": [
          {
            "key": "VUL-203",
            "title": "Task: Debezium CDC streaming to Secondary DC setup.",
            "status": "In Progress",
            "storyPoints": 5,
            "priority": "High"
          }
        ],
        "bitbucket": {
          "repo": "squad-vulcan-core",
          "branch": "main",
          "activePR": null,
          "prStatus": null,
          "lastCommit": "30 mins ago",
          "sonarScore": 92
        }
      },
      {
        "id": "squad-vulcan-out-4",
        "pn": "901723",
        "name": "Rangga Danu",
        "shortName": "Rangga",
        "isStanding": false,
        "role": "BE",
        "avatarColor": "#2563eb",
        "deskPosition": [
          13.6,
          0,
          -10.91
        ],
        "rotationY": 3.141592653589793,
        "status": "blocked",
        "speechBubble": "⚠️ Blocker: Replication lag spike on high-volume write.",
        "isBlocker": true,
        "jiraTickets": [
          {
            "key": "VUL-204",
            "title": "Task: ⚠️ Blocker: Replication lag spike on high-vol",
            "status": "In Progress",
            "storyPoints": 5,
            "priority": "Highest"
          }
        ],
        "bitbucket": {
          "repo": "squad-vulcan-core",
          "branch": "main",
          "activePR": null,
          "prStatus": null,
          "lastCommit": "30 mins ago",
          "sonarScore": 92
        }
      },
      {
        "id": "squad-vulcan-out-5",
        "pn": "901724",
        "name": "Kiki Amalia",
        "shortName": "Kiki",
        "isStanding": false,
        "role": "FE",
        "avatarColor": "#ec4899",
        "deskPosition": [
          8.8,
          0,
          -10.09
        ],
        "rotationY": 0,
        "status": "active",
        "speechBubble": "Failover status indicator & health topology UI.",
        "isBlocker": false,
        "jiraTickets": [
          {
            "key": "VUL-205",
            "title": "Task: Failover status indicator & health topology U",
            "status": "In Progress",
            "storyPoints": 5,
            "priority": "High"
          }
        ],
        "bitbucket": {
          "repo": "squad-vulcan-core",
          "branch": "main",
          "activePR": null,
          "prStatus": null,
          "lastCommit": "30 mins ago",
          "sonarScore": 92
        }
      },
      {
        "id": "squad-vulcan-out-6",
        "pn": "901725",
        "name": "Tono Sudirgo",
        "shortName": "Tono",
        "isStanding": false,
        "role": "FE",
        "avatarColor": "#06b6d4",
        "deskPosition": [
          10.4,
          0,
          -10.09
        ],
        "rotationY": 0,
        "status": "active",
        "speechBubble": "DR Drill countdown timer & runbook modal.",
        "isBlocker": false,
        "jiraTickets": [
          {
            "key": "VUL-206",
            "title": "Task: DR Drill countdown timer & runbook modal.",
            "status": "In Progress",
            "storyPoints": 5,
            "priority": "High"
          }
        ],
        "bitbucket": {
          "repo": "squad-vulcan-core",
          "branch": "main",
          "activePR": null,
          "prStatus": null,
          "lastCommit": "30 mins ago",
          "sonarScore": 92
        }
      },
      {
        "id": "squad-vulcan-out-7",
        "pn": "901726",
        "name": "Bella Saphira",
        "shortName": "Bella",
        "isStanding": false,
        "role": "QA",
        "avatarColor": "#10b981",
        "deskPosition": [
          12,
          0,
          -10.09
        ],
        "rotationY": 0,
        "status": "active",
        "speechBubble": "Chaos engineering network partition test running.",
        "isBlocker": false,
        "jiraTickets": [
          {
            "key": "VUL-207",
            "title": "Task: Chaos engineering network partition test runn",
            "status": "In Progress",
            "storyPoints": 5,
            "priority": "High"
          }
        ],
        "bitbucket": {
          "repo": "squad-vulcan-core",
          "branch": "main",
          "activePR": null,
          "prStatus": null,
          "lastCommit": "30 mins ago",
          "sonarScore": 92
        }
      },
      {
        "id": "squad-vulcan-out-8",
        "pn": "901727",
        "name": "Sandy Pratama",
        "shortName": "Sandy",
        "isStanding": false,
        "role": "QA",
        "avatarColor": "#059669",
        "deskPosition": [
          13.6,
          0,
          -10.09
        ],
        "rotationY": 0,
        "status": "active",
        "speechBubble": "Database failover split-brain verification.",
        "isBlocker": false,
        "jiraTickets": [
          {
            "key": "VUL-208",
            "title": "Task: Database failover split-brain verification.",
            "status": "In Progress",
            "storyPoints": 5,
            "priority": "High"
          }
        ],
        "bitbucket": {
          "repo": "squad-vulcan-core",
          "branch": "main",
          "activePR": null,
          "prStatus": null,
          "lastCommit": "30 mins ago",
          "sonarScore": 92
        }
      }
    ]
  },
  {
    "id": "squad-sentinel",
    "name": "Row 9: Squad Sentinel (API Gateway & Security)",
    "alias": "Sentinel",
    "leadPN": "PN 90189012 (Firman Utina)",
    "sprint": "Sprint 27 (Day 7/10)",
    "sprintGoal": "API Gateway Rate Limiting, WAF & OAuth2 mTLS Security",
    "zoneCenter": [
      11.2,
      0,
      -14.7
    ],
    "zoneColor": "#3b82f6",
    "metrics": {
      "totalStoryPoints": 78,
      "completedStoryPoints": 54,
      "defects": {
        "p1": 1,
        "p2": 1,
        "p3": 1
      },
      "approvals": {
        "brd": true,
        "sitSignOff": true,
        "uatSignOff": true,
        "secmanSignOff": false,
        "rfcDeployment": false
      },
      "pipeline": {
        "stage": "SIT",
        "health": "yellow",
        "sonarCoverage": 94.7
      }
    },
    "members": [
      {
        "id": "squad-sentinel-out-1",
        "pn": "901820",
        "name": "Firman Utina",
        "shortName": "Firman",
        "isStanding": false,
        "role": "SL",
        "avatarColor": "#f59e0b",
        "deskPosition": [
          8.8,
          0,
          -15.11
        ],
        "rotationY": 3.141592653589793,
        "status": "active",
        "speechBubble": "mTLS certificate rotation automation with Vault.",
        "isBlocker": false,
        "jiraTickets": [
          {
            "key": "SEN-201",
            "title": "Task: mTLS certificate rotation automation with Vau",
            "status": "In Progress",
            "storyPoints": 5,
            "priority": "High"
          }
        ],
        "bitbucket": {
          "repo": "squad-sentinel-core",
          "branch": "main",
          "activePR": null,
          "prStatus": null,
          "lastCommit": "30 mins ago",
          "sonarScore": 92
        }
      },
      {
        "id": "squad-sentinel-out-2",
        "pn": "901821",
        "name": "Ayu Tingting",
        "shortName": "Ayu",
        "isStanding": false,
        "role": "SM",
        "avatarColor": "#8b5cf6",
        "deskPosition": [
          10.4,
          0,
          -15.11
        ],
        "rotationY": 3.141592653589793,
        "status": "active",
        "speechBubble": "Partner API onboarding documentation published.",
        "isBlocker": false,
        "jiraTickets": [
          {
            "key": "SEN-202",
            "title": "Task: Partner API onboarding documentation publishe",
            "status": "In Progress",
            "storyPoints": 5,
            "priority": "High"
          }
        ],
        "bitbucket": {
          "repo": "squad-sentinel-core",
          "branch": "main",
          "activePR": null,
          "prStatus": null,
          "lastCommit": "30 mins ago",
          "sonarScore": 92
        }
      },
      {
        "id": "squad-sentinel-out-3",
        "pn": "901822",
        "name": "Dharma Kusuma",
        "shortName": "Dharma",
        "isStanding": false,
        "role": "BE",
        "avatarColor": "#3b82f6",
        "deskPosition": [
          12,
          0,
          -15.11
        ],
        "rotationY": 3.141592653589793,
        "status": "blocked",
        "speechBubble": "⚠️ Blocker: Partner cert format mismatch during handshake.",
        "isBlocker": true,
        "jiraTickets": [
          {
            "key": "SEN-203",
            "title": "Task: ⚠️ Blocker: Partner cert format mismatch duri",
            "status": "In Progress",
            "storyPoints": 5,
            "priority": "Highest"
          }
        ],
        "bitbucket": {
          "repo": "squad-sentinel-core",
          "branch": "main",
          "activePR": null,
          "prStatus": null,
          "lastCommit": "30 mins ago",
          "sonarScore": 92
        }
      },
      {
        "id": "squad-sentinel-out-4",
        "pn": "901823",
        "name": "Zulkifli Lubis",
        "shortName": "Zulkifli",
        "isStanding": false,
        "role": "BE",
        "avatarColor": "#2563eb",
        "deskPosition": [
          13.6,
          0,
          -15.11
        ],
        "rotationY": 3.141592653589793,
        "status": "active",
        "speechBubble": "Kong API Gateway token bucket rate limiter tuned.",
        "isBlocker": false,
        "jiraTickets": [
          {
            "key": "SEN-204",
            "title": "Task: Kong API Gateway token bucket rate limiter tu",
            "status": "In Progress",
            "storyPoints": 5,
            "priority": "High"
          }
        ],
        "bitbucket": {
          "repo": "squad-sentinel-core",
          "branch": "main",
          "activePR": null,
          "prStatus": null,
          "lastCommit": "30 mins ago",
          "sonarScore": 92
        }
      },
      {
        "id": "squad-sentinel-out-5",
        "pn": "901824",
        "name": "Lukman Sardi",
        "shortName": "Lukman",
        "isStanding": false,
        "role": "FE",
        "avatarColor": "#ec4899",
        "deskPosition": [
          8.8,
          0,
          -14.29
        ],
        "rotationY": 0,
        "status": "active",
        "speechBubble": "Developer portal API keys & rate limit quota UI.",
        "isBlocker": false,
        "jiraTickets": [
          {
            "key": "SEN-205",
            "title": "Task: Developer portal API keys & rate limit quota ",
            "status": "In Progress",
            "storyPoints": 5,
            "priority": "High"
          }
        ],
        "bitbucket": {
          "repo": "squad-sentinel-core",
          "branch": "main",
          "activePR": null,
          "prStatus": null,
          "lastCommit": "30 mins ago",
          "sonarScore": 92
        }
      },
      {
        "id": "squad-sentinel-out-6",
        "pn": "901825",
        "name": "Nadira Adnan",
        "shortName": "Nadira",
        "isStanding": false,
        "role": "FE",
        "avatarColor": "#06b6d4",
        "deskPosition": [
          10.4,
          0,
          -14.29
        ],
        "rotationY": 0,
        "status": "active",
        "speechBubble": "Interactive API documentation Swagger integration.",
        "isBlocker": false,
        "jiraTickets": [
          {
            "key": "SEN-206",
            "title": "Task: Interactive API documentation Swagger integra",
            "status": "In Progress",
            "storyPoints": 5,
            "priority": "High"
          }
        ],
        "bitbucket": {
          "repo": "squad-sentinel-core",
          "branch": "main",
          "activePR": null,
          "prStatus": null,
          "lastCommit": "30 mins ago",
          "sonarScore": 92
        }
      },
      {
        "id": "squad-sentinel-out-7",
        "pn": "901826",
        "name": "Chandra Wijaya",
        "shortName": "Chandra",
        "isStanding": false,
        "role": "QA",
        "avatarColor": "#10b981",
        "deskPosition": [
          12,
          0,
          -14.29
        ],
        "rotationY": 0,
        "status": "active",
        "speechBubble": "DDoS simulation test against gateway rate limit.",
        "isBlocker": false,
        "jiraTickets": [
          {
            "key": "SEN-207",
            "title": "Task: DDoS simulation test against gateway rate lim",
            "status": "In Progress",
            "storyPoints": 5,
            "priority": "High"
          }
        ],
        "bitbucket": {
          "repo": "squad-sentinel-core",
          "branch": "main",
          "activePR": null,
          "prStatus": null,
          "lastCommit": "30 mins ago",
          "sonarScore": 92
        }
      },
      {
        "id": "squad-sentinel-out-8",
        "pn": "901827",
        "name": "Tiara Andini",
        "shortName": "Tiara",
        "isStanding": false,
        "role": "QA",
        "avatarColor": "#059669",
        "deskPosition": [
          13.6,
          0,
          -14.29
        ],
        "rotationY": 0,
        "status": "active",
        "speechBubble": "Penetration test regression on auth endpoints.",
        "isBlocker": false,
        "jiraTickets": [
          {
            "key": "SEN-208",
            "title": "Task: Penetration test regression on auth endpoints",
            "status": "In Progress",
            "storyPoints": 5,
            "priority": "High"
          }
        ],
        "bitbucket": {
          "repo": "squad-sentinel-core",
          "branch": "main",
          "activePR": null,
          "prStatus": null,
          "lastCommit": "30 mins ago",
          "sonarScore": 92
        }
      }
    ]
  },
  {
    "id": "squad-nexus",
    "name": "Row 10: Squad Nexus (Loyalty & Campaign)",
    "alias": "Nexus",
    "leadPN": "PN 90190123 (Tri Handoko)",
    "sprint": "Sprint 20 (Day 5/10)",
    "sprintGoal": "Merchant Loyalty Points, Cashback & Campaign Engine",
    "zoneCenter": [
      11.2,
      0,
      -18.9
    ],
    "zoneColor": "#a855f7",
    "metrics": {
      "totalStoryPoints": 74,
      "completedStoryPoints": 48,
      "defects": {
        "p1": 0,
        "p2": 1,
        "p3": 2
      },
      "approvals": {
        "brd": true,
        "sitSignOff": true,
        "uatSignOff": false,
        "secmanSignOff": false,
        "rfcDeployment": false
      },
      "pipeline": {
        "stage": "DEV",
        "health": "green",
        "sonarCoverage": 92.9
      }
    },
    "members": [
      {
        "id": "squad-nexus-out-1",
        "pn": "901920",
        "name": "Tri Handoko",
        "shortName": "Tri",
        "isStanding": false,
        "role": "SL",
        "avatarColor": "#f59e0b",
        "deskPosition": [
          8.8,
          0,
          -19.31
        ],
        "rotationY": 3.141592653589793,
        "status": "active",
        "speechBubble": "Cashback dynamic ledger double-entry validation ready.",
        "isBlocker": false,
        "jiraTickets": [
          {
            "key": "NEX-201",
            "title": "Task: Cashback dynamic ledger double-entry validati",
            "status": "In Progress",
            "storyPoints": 5,
            "priority": "High"
          }
        ],
        "bitbucket": {
          "repo": "squad-nexus-core",
          "branch": "main",
          "activePR": null,
          "prStatus": null,
          "lastCommit": "30 mins ago",
          "sonarScore": 92
        }
      },
      {
        "id": "squad-nexus-out-2",
        "pn": "901921",
        "name": "Rini Yulianti",
        "shortName": "Rini",
        "isStanding": false,
        "role": "SM",
        "avatarColor": "#8b5cf6",
        "deskPosition": [
          10.4,
          0,
          -19.31
        ],
        "rotationY": 3.141592653589793,
        "status": "active",
        "speechBubble": "Mid-sprint check-in: 65% tasks completed.",
        "isBlocker": false,
        "jiraTickets": [
          {
            "key": "NEX-202",
            "title": "Task: Mid-sprint check-in: 65% tasks completed.",
            "status": "In Progress",
            "storyPoints": 5,
            "priority": "High"
          }
        ],
        "bitbucket": {
          "repo": "squad-nexus-core",
          "branch": "main",
          "activePR": null,
          "prStatus": null,
          "lastCommit": "30 mins ago",
          "sonarScore": 92
        }
      },
      {
        "id": "squad-nexus-out-3",
        "pn": "901922",
        "name": "Heru Prasetya",
        "shortName": "Heru",
        "isStanding": false,
        "role": "BE",
        "avatarColor": "#3b82f6",
        "deskPosition": [
          12,
          0,
          -19.31
        ],
        "rotationY": 3.141592653589793,
        "status": "active",
        "speechBubble": "Campaign rule evaluation engine <10ms latency.",
        "isBlocker": false,
        "jiraTickets": [
          {
            "key": "NEX-203",
            "title": "Task: Campaign rule evaluation engine <10ms latency",
            "status": "In Progress",
            "storyPoints": 5,
            "priority": "High"
          }
        ],
        "bitbucket": {
          "repo": "squad-nexus-core",
          "branch": "main",
          "activePR": null,
          "prStatus": null,
          "lastCommit": "30 mins ago",
          "sonarScore": 92
        }
      },
      {
        "id": "squad-nexus-out-4",
        "pn": "901923",
        "name": "Sony Hartono",
        "shortName": "Sony",
        "isStanding": false,
        "role": "BE",
        "avatarColor": "#2563eb",
        "deskPosition": [
          13.6,
          0,
          -19.31
        ],
        "rotationY": 3.141592653589793,
        "status": "active",
        "speechBubble": "Loyalty points wallet ledger balance partition.",
        "isBlocker": false,
        "jiraTickets": [
          {
            "key": "NEX-204",
            "title": "Task: Loyalty points wallet ledger balance partitio",
            "status": "In Progress",
            "storyPoints": 5,
            "priority": "High"
          }
        ],
        "bitbucket": {
          "repo": "squad-nexus-core",
          "branch": "main",
          "activePR": null,
          "prStatus": null,
          "lastCommit": "30 mins ago",
          "sonarScore": 92
        }
      },
      {
        "id": "squad-nexus-out-5",
        "pn": "901924",
        "name": "Bagus Ramadhan",
        "shortName": "Bagus",
        "isStanding": false,
        "role": "FE",
        "avatarColor": "#ec4899",
        "deskPosition": [
          8.8,
          0,
          -18.49
        ],
        "rotationY": 0,
        "status": "active",
        "speechBubble": "Customer loyalty rewards tier progress bar UI.",
        "isBlocker": false,
        "jiraTickets": [
          {
            "key": "NEX-205",
            "title": "Task: Customer loyalty rewards tier progress bar UI",
            "status": "In Progress",
            "storyPoints": 5,
            "priority": "High"
          }
        ],
        "bitbucket": {
          "repo": "squad-nexus-core",
          "branch": "main",
          "activePR": null,
          "prStatus": null,
          "lastCommit": "30 mins ago",
          "sonarScore": 92
        }
      },
      {
        "id": "squad-nexus-out-6",
        "pn": "901925",
        "name": "Vivi Novita",
        "shortName": "Vivi",
        "isStanding": false,
        "role": "FE",
        "avatarColor": "#06b6d4",
        "deskPosition": [
          10.4,
          0,
          -18.49
        ],
        "rotationY": 0,
        "status": "active",
        "speechBubble": "Merchant promo campaign creator wizard.",
        "isBlocker": false,
        "jiraTickets": [
          {
            "key": "NEX-206",
            "title": "Task: Merchant promo campaign creator wizard.",
            "status": "In Progress",
            "storyPoints": 5,
            "priority": "High"
          }
        ],
        "bitbucket": {
          "repo": "squad-nexus-core",
          "branch": "main",
          "activePR": null,
          "prStatus": null,
          "lastCommit": "30 mins ago",
          "sonarScore": 92
        }
      },
      {
        "id": "squad-nexus-out-7",
        "pn": "901926",
        "name": "Nita Anggraini",
        "shortName": "Nita",
        "isStanding": false,
        "role": "QA",
        "avatarColor": "#10b981",
        "deskPosition": [
          12,
          0,
          -18.49
        ],
        "rotationY": 0,
        "status": "active",
        "speechBubble": "Automated points expiry cron test suite passed.",
        "isBlocker": false,
        "jiraTickets": [
          {
            "key": "NEX-207",
            "title": "Task: Automated points expiry cron test suite passe",
            "status": "In Progress",
            "storyPoints": 5,
            "priority": "High"
          }
        ],
        "bitbucket": {
          "repo": "squad-nexus-core",
          "branch": "main",
          "activePR": null,
          "prStatus": null,
          "lastCommit": "30 mins ago",
          "sonarScore": 92
        }
      },
      {
        "id": "squad-nexus-out-8",
        "pn": "901927",
        "name": "Aldi Taher",
        "shortName": "Aldi",
        "isStanding": false,
        "role": "QA",
        "avatarColor": "#059669",
        "deskPosition": [
          13.6,
          0,
          -18.49
        ],
        "rotationY": 0,
        "status": "active",
        "speechBubble": "Cashback idempotency verification on network drop.",
        "isBlocker": false,
        "jiraTickets": [
          {
            "key": "NEX-208",
            "title": "Task: Cashback idempotency verification on network ",
            "status": "In Progress",
            "storyPoints": 5,
            "priority": "High"
          }
        ],
        "bitbucket": {
          "repo": "squad-nexus-core",
          "branch": "main",
          "activePR": null,
          "prStatus": null,
          "lastCommit": "30 mins ago",
          "sonarScore": 92
        }
      }
    ]
  }
];

export const PLAYBOOK_TEMPLATES: Playbook[] = [
  {
    "id": "daily-briefing",
    "title": "DAILY MORNING BRIEFING",
    "schedule": "Every day at 9am",
    "description": "Summarize sprint priorities, active blockers, and what changed overnight.",
    "status": "ready",
    "tag": "AGILE"
  },
  {
    "id": "nightly-code-review",
    "title": "NIGHTLY CODE REVIEW DIGEST",
    "schedule": "Every night at midnight",
    "description": "Review the day and summarize risky changes, Bitbucket PRs, or regressions.",
    "status": "ready",
    "tag": "BITBUCKET"
  },
  {
    "id": "hourly-health-check",
    "title": "HOURLY HEALTH CHECK",
    "schedule": "Every 60 minutes",
    "description": "Report runtime health, payment latency (<80ms), and anything that needs intervention.",
    "status": "running",
    "tag": "SRE"
  },
  {
    "id": "weekly-progress-report",
    "title": "WEEKLY PROGRESS REPORT",
    "schedule": "Every Monday at 8am",
    "description": "Roll up wins, unfinished work, and next steps for RFC CAB governance.",
    "status": "ready",
    "tag": "GOVERNANCE"
  },
  {
    "id": "continuous-monitor",
    "title": "CONTINUOUS SRE MONITOR",
    "schedule": "Every 15 minutes",
    "description": "Watch for transaction drift, silent failures, or anomalous timeouts.",
    "status": "active",
    "tag": "INCIDENT"
  }
];
