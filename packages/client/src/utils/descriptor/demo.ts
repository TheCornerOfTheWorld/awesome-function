function A() {
  console.log(1)
}

function B() {
  console.log(2)
}

class Doc {
  @A
  @B
  async test() {}
}

const doc = new Doc()
doc.test()
