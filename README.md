at README.md
# Enterprise Linux Solutions

Production website for Enterprise Linux Solutions.

🌐 **Live Site:** https://enterpriselinuxsolutions.com

---

## Repository Information

- **GitHub (Primary):** https://github.com/rjjime/enterpriselinuxsolutions
- **GitLab (Backup):** https://gitlab.com/rjjime/enterpriselinuxsolutions-backup
- **Visibility:** Private
- **Last Updated:** <!-- Nov 21,2025 -->

---

## Deployment Workflow

### Overview

This repository uses a **test-first deployment strategy**:
```
┌─────────────────────────────────────────────────────┐
│ Development & Testing Phase                         │
│ Repository: linuxossupport                          │
├─────────────────────────────────────────────────────┤
│ 1. Feature Development                              │
│    └─ Work on feature branches                      │
│    └─ Merge to develop branch                       │
│                                                     │
│ 2. Staging Deployment                               │
│    └─ Merge develop → staging                       │
│    └─ Auto-deploy to linuxossupport.com            │
│    └─ Test thoroughly on live staging site          │
│                                                     │
│ 3. Staging Production                               │
│    └─ Merge staging → main                          │
│    └─ Auto-deploy to linuxossupport.com            │
│    └─ Monitor for 2-3 days                          │
└─────────────────────────────────────────────────────┘
                        ↓
                    Tested & Stable
                        ↓
┌─────────────────────────────────────────────────────┐
│ Production Deployment Phase                         │
│ Repository: enterpriselinuxsolutions (THIS REPO)   │
├─────────────────────────────────────────────────────┤
│ 4. Copy Tested Code                                 │
│    └─ Copy files from linuxossupport-web repo      │
│    └─ Commit to this repository                     │
│                                                     │
│ 5. Production Deployment                            │
│    └─ Push to main branch                           │
│    └─ Auto-deploy to enterpriselinuxsolutions.com  │
│    └─ Backup to GitLab automatically                │
│                                                     │
│ 6. Monitor & Verify                                 │
│    └─ Verify site functionality                     │
│    └─ Monitor for issues                            │
└─────────────────────────────────────────────────────┘
```

---

## Automated Deployments

### When Code is Deployed

**Trigger:** Push to `main` branch

**Actions:**
1. ✅ GitHub Actions workflow triggers
2. ✅ Code deploys via FTP to ChemiCloud hosting
3. ✅ Backup pushed to GitLab automatically
4. ✅ enterpriselinuxsolutions.com updates live

**Deployment Time:** ~30-60 seconds

### View Deployment Status

Check deployment status: https://github.com/rjjime/enterpriselinuxsolutions/actions

---

## Backup Strategy

### Automatic Backups

Every push to this repository **automatically backs up to two platforms:**

| Platform | URL | Purpose | Trigger |
|----------|-----|---------|---------|
| **GitHub** | https://github.com/rjjime/enterpriselinuxsolutions | Primary repository + CI/CD | Every push |
| **GitLab** | https://gitlab.com/rjjime/enterpriselinuxsolutions-backup | Offsite backup | Every push |

### Why Two Platforms?

- ✅ **Redundancy:** Protection against platform outages
- ✅ **Disaster Recovery:** Can restore from either platform
- ✅ **Version History:** Maintained on both platforms
- ✅ **No Extra Work:** Automatic with every `git push`

### Manual Backup

To push to GitLab only (if needed):
```bash
git push backup main
```

---

## Branch Protection

### Main Branch Rules

- ❌ **Direct commits disabled** - Pre-commit hook prevents accidents
- ✅ **Pull Requests required** - All changes must go through PR review
- ✅ **Approval required** - At least 1 approval before merge
- ✅ **Tested code only** - Must be tested on linuxossupport.com first

### Bypass Protection (Emergency Only)

If you absolutely must commit directly:
```bash
git commit --no-verify -m "emergency: critical fix"
git push origin main
```

**⚠️ Use sparingly - defeats the purpose of testing workflow!**

---

## Development Workflow

### For New Features/Updates
```bash
# 1. Work in linuxossupport repo first
cd ~/LINUXOSSUPPORT/linuxossupport-web
git checkout develop
git checkout -b feature/new-feature

# 2. Make changes, test locally
# ... edit files ...

# 3. Commit and deploy to staging
git add .
git commit -m "feat: add new feature"
git push origin feature/new-feature
# Create PR, merge to develop

# 4. Deploy to staging for testing
git checkout staging
git merge develop
git push origin staging
# → Deploys to linuxossupport.com

# 5. Test on linuxossupport.com for 2-3 days

# 6. After successful testing, merge to main
git checkout main
git merge staging
git push origin main
# → Deploys to linuxossupport.com for final verification

# 7. Monitor for 2-3 more days

# 8. Copy to production (this repo)
cd ~/LINUXOSSUPPORT/enterpriselinuxsolutions
rsync -av --exclude='.git' --exclude='.github' ../linuxossupport-web/ ./

# 9. Commit and deploy to production
git add .
git commit -m "feat: deploy tested feature from linuxossupport.com"
git push origin main
# → Deploys to enterpriselinuxsolutions.com
```

### For Hotfixes (Emergency)

Only for critical production issues:
```bash
cd ~/LINUXOSSUPPORT/enterpriselinuxsolutions

# Make the fix
# ... edit files ...

# Commit with bypass
git add .
git commit --no-verify -m "hotfix: critical bug fix"
git push origin main

# Then backport to staging repo
cd ~/LINUXOSSUPPORT/linuxossupport-web
# Apply same fix there
```

---

## Tech Stack

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with responsive design
- **JavaScript** - Interactive features
- **GitHub Actions** - CI/CD automation
- **ChemiCloud** - Hosting provider
- **FTP** - Deployment protocol

---

## Features Implemented

- ✅ Cookie consent popup (GDPR/CCPA compliant)
- ✅ Terms of Service page
- ✅ Privacy Policy page  
- ✅ Cookie Management page
- ✅ Responsive design
- ✅ Automated deployments
- ✅ Dual-platform backups

---

## Repository Structure
```
enterpriselinuxsolutions/
├── .git/                      # Git repository
│   └── hooks/
│       ├── pre-commit         # Prevents direct main commits
│       └── pre-push          # Production checklist
├── .github/
│   └── workflows/
│       └── deploy.yml         # Deployment automation
├── .gitignore                 # Ignored files
├── README.md                  # This file
├── index.html                 # Homepage
├── terms.html                 # Terms of Service
├── privacy.html               # Privacy Policy
├── cookies.html               # Cookie Management
└── assets/
    ├── css/                   # Stylesheets
    ├── js/                    # JavaScript files
    └── images/                # Image assets
```

---

## Monitoring & Verification

### After Deployment Checklist

- [ ] Visit https://enterpriselinuxsolutions.com
- [ ] Test cookie popup appears
- [ ] Click "Accept" and "Decline" buttons
- [ ] Verify footer links work:
  - [ ] Terms of Service
  - [ ] Privacy Policy
  - [ ] Cookie Management
- [ ] Test on mobile devices
- [ ] Check browser console for errors (F12)
- [ ] Verify all images load
- [ ] Test contact forms (if any)

### GitHub Actions Status

View deployment history: https://github.com/rjjime/enterpriselinuxsolutions/actions

- ✅ Green checkmark = Successful deployment
- ❌ Red X = Failed deployment (check logs)
- 🟡 Yellow circle = Deployment in progress

---

## Troubleshooting

### Deployment Failed

1. Check GitHub Actions logs for error details
2. Verify FTP credentials are correct (GitHub Secrets)
3. Test FTP connection manually:
```bash
   ftp ftp.enterpriselinuxsolutions.com
```

### Site Not Updating

1. Clear browser cache (Ctrl + Shift + R)
2. Check if deployment completed successfully
3. Verify correct FTP path in GitHub Secrets
4. Check ChemiCloud cPanel for file timestamps

### GitLab Backup Failed

1. Test SSH connection: `ssh -T git@gitlab.com`
2. Verify SSH key is added to GitLab
3. Check GitLab repository permissions
4. Force push if needed: `git push backup main --force`

---

## Disaster Recovery

### If GitHub is Down

1. Clone from GitLab backup:
```bash
   git clone git@gitlab.com:rjjime/enterpriselinuxsolutions-backup.git
```

2. Add GitHub back when available:
```bash
   git remote add github git@github.com:rjjime/enterpriselinuxsolutions.git
   git push github main
```

### If Site Goes Down

1. Check ChemiCloud status
2. Verify DNS settings
3. Check FTP access
4. Manually upload files via cPanel File Manager if needed

---

## Contact & Support

- **Repository Owner:** rjjime
- **Hosting Support:** ChemiCloud
- **GitHub Issues:** https://github.com/rjjime/enterpriselinuxsolutions/issues

---

## Version History

| Date | Version | Changes | Tested On |
|------|---------|---------|-----------|
| 2024-XX-XX | 1.0.0 | Initial production deployment | linuxossupport.com |
| | | - Cookie consent popup | 3 days |
| | | - Footer links (Terms, Privacy, Cookies) | |

---

## License

Proprietary - All rights reserved

---

**Last Updated:** [Nov 21, 2025]
**Maintained By:** rjjime

