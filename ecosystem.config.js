module.exports = {
  apps: [
    {
      name: "ImpactGraph-UI",
      script: "npm",
      args: "start", 
      cwd: "./", 
      max_memory_restart: "300M",
      max_cpu_restart: "50%",
      env: {
        NODE_ENV: "production",
        PORT: "5000", 
      },
      instances: "max",
      exec_mode: "cluster",
      watch: false,
    },
  ],
};
