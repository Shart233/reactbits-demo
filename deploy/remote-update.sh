#!/usr/bin/env bash
# 一键远程部署:git pull && npm ci && npm run build && pm2 reload
# 用法(在交互式 Git Bash 里):
#   SSHPASS='你的密码' bash deploy/remote-update.sh
# 或先 export SSHPASS=... 再运行。
set -euo pipefail

HOST="root@154.36.164.233"
APP_DIR="/opt/reactbits-demo"

if [ -z "${SSHPASS:-}" ]; then
  echo "请先设置密码:  export SSHPASS='你的密码'   然后重跑"
  exit 1
fi

# 远端执行脚本(base64 传输,避免引号/中文转义)
read -r -d '' REMOTE <<'REMOTE_SCRIPT' || true
set -e
cd /opt/reactbits-demo
echo "===== 1/4 git pull ====="
git pull origin main
echo "===== 2/4 npm ci ====="
npm ci 2>&1 | tail -4
echo "===== 3/4 npm run build ====="
npm run build 2>&1 | tail -20
echo "===== 4/4 pm2 reload ====="
pm2 reload reactbits-demo --update-env
echo "===== 完成后状态 ====="
git log --oneline -1
ls registry/components/pro-hero-hero-1[89].tsx registry/components/pro-hero-hero-2[01].tsx
pm2 list | grep -i reactbits
REMOTE_SCRIPT

B64=$(printf '%s' "$REMOTE" | base64 -w0 2>/dev/null || printf '%s' "$REMOTE" | base64 | tr -d '\n')

sshpass -e ssh -o StrictHostKeyChecking=accept-new \
  -o PreferredAuthentications=password -o PubkeyAuthentication=no \
  "$HOST" "echo $B64 | base64 -d | bash"
