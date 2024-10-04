async function main() {
  const { editUser } = await import("./firebase/service");

  const testEdit = await editUser("90pkJldMdRzVtGjg0q4e", {
    name: "Patrick",
    email: "trickrenzgarcia@gmail.com",
  });
  console.log(testEdit);

  process.exit(0);
}

main().catch(console.error);
