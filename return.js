function demo() {
  console.log('9');
}
function main() {
  if (true) {
    return;
  }
  console.log('hi');
  demo();
}

main();
