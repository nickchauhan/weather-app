async function example() {
    const start = Date.now()
    let i = 0
    function res(n) {
      const id = ++i
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve()
          console.log(`res #${id} called after ${n} milliseconds`, Date.now() - start)
        }, n)
      })
    }
  
    const data = await Promise.all([res(3000), res(2000), res(1000)])
    console.log(`Promise.all finished`, Date.now() - start)
  }
  
  example()