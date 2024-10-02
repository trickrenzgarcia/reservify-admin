async function main() {
  const { adminLogin } = await import("./firebase/service");

  const tests = await adminLogin("admin@boardmarts.com", "admin");
  console.log(tests);

  process.exit(0);
}

main().catch(console.error);
