import visualizer from 'rollup-plugin-visualizer';
import { isReportMode } from '../utils/env';
export function configVisualizerConfig() {
  if (isReportMode()) {
    return visualizer({
      //filename: './node_modules/.cache/visualizer/stats.html', 采用默认的
      open: true,
      gzipSize: true,
      brotliSize: true,
    }) as Plugin;
  }
  return [];
}
