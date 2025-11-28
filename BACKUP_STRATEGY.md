# Git Backup Strategy

## Repositories

### Production: enterpriselinuxsolutions
- **GitHub (Primary):** https://github.com/rjjime/enterpriselinuxsolutions
- **GitLab (Backup):** https://gitlab.com/rjjime/enterpriselinuxsolutions-backup
- **Auto-backup:** Yes (pushes to both on every `git push origin main`)
- **Protection:** Pre-commit hook prevents direct commits to main
- **Deployment:** Deploys to enterpriselinuxsolutions.com

### Staging: linuxossupport-web
- **GitHub (Primary):** https://github.com/rjjime/linuxossupport
- **GitLab (Backup):** https://gitlab.com/rjjime/linuxossupport-web-backup
- **Auto-backup:** Yes (pushes to both on every push)
- **Protection:** Pre-commit hook warns about main commits
- **Deployment:** Deploys to linuxossupport.com
- **Branches:** develop, staging, main

## How It Works

When you push to GitHub:
```bash
git push origin [branch-name]
```

Git automatically pushes to BOTH:
1. GitHub (triggers deployment via GitHub Actions)
2. GitLab (backup only, no deployment)

## Manual Backup

If needed, push to GitLab only:
```bash
git push backup [branch-name]
```

## Benefits

✅ Redundancy across two platforms
✅ Protection against platform outages
✅ Additional version history
✅ Free private repos on both platforms
✅ Automatic - no extra commands needed

## Recovery

If GitHub is down or has issues:

### For Production:
```bash
git clone git@gitlab.com:rjjime/enterpriselinuxsolutions-backup.git
git remote add github git@github.com:rjjime/enterpriselinuxsolutions.git
git push github main
```

### For Staging:
```bash
git clone git@gitlab.com:rjjime/linuxossupport-web-backup.git
git remote add github git@github.com:rjjime/linuxossupport.git
git push github develop
git push github staging
git push github main
```

## Repository URLs Quick Reference

| Project | GitHub | GitLab Backup |
|---------|--------|---------------|
| **Production** | github.com/rjjime/enterpriselinuxsolutions | gitlab.com/rjjime/enterpriselinuxsolutions-backup |
| **Staging** | github.com/rjjime/linuxossupport | gitlab.com/rjjime/linuxossupport-web-backup |

## GitLab Configuration Notes

### Branch Protection Settings

For backup repositories on GitLab:
- **Recommended:** Leave branches unprotected OR enable "Allow force push"
- **Why:** Allows replacing old/incorrect data if needed
- **Security:** Since it's a backup mirror, protection is less critical

### If Force Push Fails

1. Go to GitLab repo → Settings → Repository → Protected branches
2. Either:
   - Unprotect the branch temporarily
   - OR enable "Allowed to force push" checkbox
3. Perform the force push
4. (Optional) Re-enable protection with force push allowed

---

**Last Updated:** $(date +%Y-%m-%d)
