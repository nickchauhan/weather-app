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
    
    function rej(n) {
      const id = ++i
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          reject()
          console.log(`rej #${id} called after ${n} milliseconds`, Date.now() - start)
        }, n)
      })
    }
    
    try {
      const delay1 = res(3000)
      const delay2 = res(2000)
      const delay3 = rej(1000)
  
      const data1 = await delay1
      const data2 = await delay2
      const data3 = await delay3
    } catch (error) {
      console.log(`await finished`, Date.now() - start)
    }
  }
  
  example()