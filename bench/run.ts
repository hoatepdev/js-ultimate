import { Bench } from 'tinybench'
import * as ju from '../src/index.js'

interface BenchmarkResult {
  name: string
  opsPerSec: number
  margin: string
}

const results: BenchmarkResult[] = []

async function run() {
  console.log('js-ultimate benchmark suite\n')
  console.log('='.repeat(60))

  // --- chunk ---
  {
    const bench = new Bench({ warmupIterations: 100, time: 2000 })
    const arr = Array.from({ length: 1000 }, (_, i) => i)
    bench.add('chunk(1000, 10)', () => ju.chunk(arr, 10))
    await bench.run()
    report(bench)
  }

  // --- get ---
  {
    const bench = new Bench({ warmupIterations: 100, time: 2000 })
    const obj = { a: { b: { c: { d: 42 } } } }
    bench.add('get(obj, "a.b.c.d")', () => ju.get(obj, 'a.b.c.d'))
    await bench.run()
    report(bench)
  }

  // --- set ---
  {
    const bench = new Bench({ warmupIterations: 100, time: 2000 })
    bench.add('set(obj, "a.b.c", 1)', () => ju.set({} as any, 'a.b.c', 1))
    await bench.run()
    report(bench)
  }

  // --- isEqual ---
  {
    const bench = new Bench({ warmupIterations: 100, time: 2000 })
    const a = { x: 1, y: { z: [1, 2, 3] } }
    const b = { x: 1, y: { z: [1, 2, 3] } }
    bench.add('isEqual(nested)', () => ju.isEqual(a, b))
    await bench.run()
    report(bench)
  }

  // --- cloneDeep ---
  {
    const bench = new Bench({ warmupIterations: 100, time: 2000 })
    const obj = { a: 1, b: { c: [1, 2, { d: 3 }] }, e: new Date() }
    bench.add('cloneDeep(nested)', () => ju.cloneDeep(obj))
    await bench.run()
    report(bench)
  }

  // --- mergeDeep ---
  {
    const bench = new Bench({ warmupIterations: 100, time: 2000 })
    const target = { a: { b: 1, c: 2 }, d: 3 }
    const source = { a: { b: 10, e: 5 }, f: 6 }
    bench.add('mergeDeep(2 objects)', () => ju.mergeDeep(target, source))
    await bench.run()
    report(bench)
  }

  // --- groupBy ---
  {
    const bench = new Bench({ warmupIterations: 100, time: 2000 })
    const arr = Array.from({ length: 1000 }, (_, i) => ({
      category: `cat${i % 10}`,
      value: i
    }))
    bench.add('groupBy(1000, prop)', () => ju.groupBy(arr, 'category'))
    await bench.run()
    report(bench)
  }

  // --- compact ---
  {
    const bench = new Bench({ warmupIterations: 100, time: 2000 })
    const arr = [0, 1, false, 2, '', 3, null, undefined, 4, NaN, 5]
    bench.add('compact(mixed)', () => ju.compact(arr))
    await bench.run()
    report(bench)
  }

  // --- setImmutable ---
  {
    const bench = new Bench({ warmupIterations: 100, time: 2000 })
    const obj = { a: { b: { c: 1 } }, d: 2 }
    bench.add('setImmutable(obj, "a.b.c", 99)', () =>
      ju.setImmutable(obj, 'a.b.c', 99)
    )
    await bench.run()
    report(bench)
  }

  // --- isEmpty ---
  {
    const bench = new Bench({ warmupIterations: 100, time: 2000 })
    bench.add('isEmpty({})', () => ju.isEmpty({}))
    bench.add('isEmpty([1,2,3])', () => ju.isEmpty([1, 2, 3]))
    await bench.run()
    report(bench)
  }

  // --- Summary ---
  console.log('\n' + '='.repeat(60))
  console.log('Summary')
  console.log('='.repeat(60))
  console.log(
    `${'Function'.padEnd(35)} ${'ops/sec'.padStart(15)} ${'±'.padStart(8)}`
  )
  console.log('-'.repeat(60))
  for (const r of results) {
    console.log(
      `${r.name.padEnd(35)} ${r.opsPerSec
        .toLocaleString()
        .padStart(15)} ${r.margin.padStart(8)}`
    )
  }
}

function report(bench: Bench) {
  for (const task of bench.tasks) {
    const hz = Math.round(task.result?.throughput?.mean ?? 0)
    const rme = ((task.result?.throughput?.rme ?? 0) * 100).toFixed(2)
    const margin = `±${rme}%`
    results.push({ name: task.name, opsPerSec: hz, margin })
    console.log(
      `  ${task.name.padEnd(35)} ${hz
        .toLocaleString()
        .padStart(15)} ops/sec ${margin}`
    )
  }
}

run().catch(console.error)
