// SnackbarManager.ts
export interface SnackbarInstance {
  id: string;
  vertical: string;
  horizontal: string;
  height: number;
}

class SnackbarManager {
  private instances: SnackbarInstance[] = [];
  private readonly GAP = 10; // 消息框之间的间距

  register(inst: SnackbarInstance) {
    this.instances = this.instances.filter((i) => i.id !== inst.id);
    this.instances.push(inst);
    this.notify();
  }

  unregister(id: string) {
    this.instances = this.instances.filter((i) => i.id !== id);
    this.notify();
  }

  private notify() {
    requestAnimationFrame(() => {
      window.dispatchEvent(new CustomEvent("saki-snackbar-update"));
    });
  }
  /**
   * 获取定位数据
   * @param id 当前组件ID
   * @returns offset: 当前组件上方的累加高度; totalHeight: 该方向所有组件的总高度
   */
  getLayoutData(id: string): { offset: number; totalHeight: number } {
    const target = this.instances.find((i) => i.id === id);
    if (!target) return { offset: 0, totalHeight: 0 };

    // 1. 筛选出同一个九宫格方位的“邻居”
    const siblings = this.instances.filter(
      (i) =>
        i.vertical === target.vertical && i.horizontal === target.horizontal,
    );

    // 2. 计算当前组件之前的偏移量
    const index = siblings.findIndex((i) => i.id === id);
    const offset = siblings
      .slice(0, index)
      .reduce((acc, curr) => acc + curr.height + this.GAP, 0);

    // 3. 计算该方位的总高度（用于判断是否溢出屏幕等逻辑）
    const totalHeight = siblings.reduce((acc, curr, idx) => {
      return acc + curr.height + (idx < siblings.length - 1 ? this.GAP : 0);
    }, 0);

    return { offset, totalHeight };
  }
}

export const snackbarManager = new SnackbarManager();
