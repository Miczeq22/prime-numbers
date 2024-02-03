import { cpus } from 'os';
import { Worker, isMainThread, parentPort, workerData } from 'worker_threads';
import { PrimeNumbersProvider } from './prime-numbers-provider.service';
import { resolve as resolvePath } from 'path';

interface WorkerData {
  start: number;
  end: number;
}

if (isMainThread) {
  const allPrimeNumbers: number[] = [];

  let completedThreads = 0;

  const availableCpus = cpus().length;

  const minRange = 2;
  const maxRange = 1e7;

  const rangePerThread = Math.ceil((maxRange - minRange) / availableCpus);

  for (let i = 0; i < availableCpus; i++) {
    const start = minRange + i * rangePerThread;

    const isTypeScriptFile = resolvePath(__filename).endsWith('.ts');

    const end = i === availableCpus - 1 ? maxRange : start + rangePerThread;

    const worker = new Worker(__filename, {
      workerData: {
        start,
        end,
      },
      ...(isTypeScriptFile && {
        execArgv: ['--require', 'ts-node/register'],
      }),
    });

    worker.on('message', (msg: number[]) => {
      allPrimeNumbers.push(...msg);

      completedThreads++;

      if (completedThreads === availableCpus) {
        console.log(`Prime is: ${allPrimeNumbers.join(', ')}`);
      }
    });
  }
} else {
  const { start, end } = workerData as WorkerData;

  const primeNumbers = PrimeNumbersProvider.fromRange(start, end);

  if (!parentPort) {
    throw new Error('Parent port is not available.');
  }

  parentPort.postMessage(primeNumbers);
}
