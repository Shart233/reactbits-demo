#!/usr/bin/env python
"""Deploy reactbits-demo to the VPS over SSH (paramiko, no tty/sshpass needed).
Password read from env var DEPLOY_PW. Streams remote stdout/stderr live.
"""
import os
import sys
import paramiko

# Force UTF-8 stdout on Windows (default GBK chokes on ✓ and box-drawing chars)
try:
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    sys.stderr.reconfigure(encoding="utf-8", errors="replace")
except Exception:
    pass

HOST = "154.36.164.233"
USER = "root"
PW = os.environ.get("DEPLOY_PW")

REMOTE = r"""
set -e
cd /opt/reactbits-demo
echo "===== 1/4 git pull ====="
git pull origin main
echo "===== 2/4 npm ci ====="
npm ci 2>&1 | tail -4
echo "===== 3/4 npm run build ====="
npm run build 2>&1 | tail -22
echo "===== 4/4 pm2 reload ====="
pm2 reload reactbits-demo --update-env
echo "===== done state ====="
git log --oneline -1
ls registry/components/pro-hero-hero-18.tsx registry/components/pro-hero-hero-19.tsx registry/components/pro-hero-hero-20.tsx registry/components/pro-hero-hero-21.tsx
pm2 list | grep -i reactbits
"""


def main():
    if not PW:
        print("ERROR: set DEPLOY_PW env var", file=sys.stderr)
        return 2
    client = paramiko.SSHClient()
    client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    client.connect(
        HOST, username=USER, password=PW, timeout=20,
        allow_agent=False, look_for_keys=False,
    )
    chan = client.get_transport().open_session()
    chan.get_pty()
    chan.exec_command(f"bash -lc {paramiko.util.b(_shquote(REMOTE)).decode()}")
    # stream output
    buf = b""
    while True:
        if chan.recv_ready():
            data = chan.recv(4096)
            sys.stdout.write(data.decode(errors="replace"))
            sys.stdout.flush()
        if chan.exit_status_ready() and not chan.recv_ready():
            break
    rc = chan.recv_exit_status()
    client.close()
    print(f"\n===== remote exit code: {rc} =====")
    return rc


def _shquote(s):
    return "'" + s.replace("'", "'\\''") + "'"


if __name__ == "__main__":
    sys.exit(main())
