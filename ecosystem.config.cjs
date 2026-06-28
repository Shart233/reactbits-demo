// PM2 process config — keeps the app running on port 3005, restarts on crash/reboot.
// Usage: pm2 start ecosystem.config.cjs  (then: pm2 save && pm2 startup)
module.exports = {
  apps: [
    {
      name: "reactbits-demo",
      script: "node_modules/next/dist/bin/next",
      args: "start -p 3005",
      cwd: __dirname,
      instances: 1,
      exec_mode: "fork",
      autorestart: true,
      max_memory_restart: "1G",
      env: {
        NODE_ENV: "production",
        PORT: "3005",
      },
    },
  ],
};
