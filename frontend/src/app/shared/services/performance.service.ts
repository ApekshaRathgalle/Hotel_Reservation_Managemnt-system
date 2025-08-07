import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PerformanceService {
  private metrics: Map<string, number[]> = new Map();

  startTimer(label: string): () => void {
    const startTime = performance.now();
    
    return () => {
      const endTime = performance.now();
      const duration = endTime - startTime;
      
      if (!this.metrics.has(label)) {
        this.metrics.set(label, []);
      }
      
      this.metrics.get(label)!.push(duration);
      
      // Keep only last 10 measurements
      const measurements = this.metrics.get(label)!;
      if (measurements.length > 10) {
        measurements.splice(0, measurements.length - 10);
      }
      
      console.log(`⏱️ ${label}: ${duration.toFixed(2)}ms`);
      return duration;
    };
  }

  getAverageTime(label: string): number {
    const measurements = this.metrics.get(label);
    if (!measurements || measurements.length === 0) {
      return 0;
    }
    
    const sum = measurements.reduce((a, b) => a + b, 0);
    return sum / measurements.length;
  }

  getAllMetrics(): { [key: string]: { avg: number, count: number, last: number } } {
    const result: { [key: string]: { avg: number, count: number, last: number } } = {};
    
    for (const [label, measurements] of this.metrics.entries()) {
      if (measurements.length > 0) {
        const avg = measurements.reduce((a, b) => a + b, 0) / measurements.length;
        result[label] = {
          avg: Math.round(avg * 100) / 100,
          count: measurements.length,
          last: Math.round(measurements[measurements.length - 1] * 100) / 100
        };
      }
    }
    
    return result;
  }

  clearMetrics(): void {
    this.metrics.clear();
  }
}
