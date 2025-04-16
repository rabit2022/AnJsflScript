/**
 * 策略名称枚举类型
 */
type StrategyName = string;

/**
 * 策略函数类型
 * 输入参数为可变参数，输出为任意类型
 */
type StrategyFunction<T extends any[] = any[], R = any> = (...args: T) => R;

/**
 * 策略配置项接口
 */
interface StrategyConfig<T extends any[] = any[], R = any> {
  name: StrategyName;
  fn: StrategyFunction<T, R>;
}

/**
 * 优先级策略项接口
 */
interface PriorityStrategy<T extends any[] = any[], R = any> extends StrategyConfig<T, R> {
  priority: number;
}

/**
 * 策略管理基类，提供策略的注册和执行功能
 */
class StrategyManager<T extends any[] = any[], R = any> {
  /**
   * 策略映射表
   * @private
   */
  protected strategies: Record<StrategyName, StrategyFunction<T, R>>;

  constructor() {
    this.strategies = {
      default: () => {
        throw new Error('未知的策略类型');
      }
    };
  }

  /**
   * 添加策略
   * @param name 策略名称
   * @param strategy 策略函数
   * @returns 返回当前实例以支持链式调用
   */
  add(name: StrategyName, strategy: StrategyFunction<T, R>): this {
    if (typeof strategy !== 'function') {
      throw new TypeError('策略必须是函数');
    }
    if (!name || typeof name !== 'string') {
      throw new TypeError('策略名称必须是非空字符串');
    }
    this.strategies[name] = strategy;
    return this;
  }

  /**
   * 使用指定策略
   * @param name 策略名称
   * @param args 传递给策略的参数
   * @returns 策略执行结果
   */
  use(name: StrategyName, ...args: T): R {
    const strategy = this.strategies[name] || this.strategies.default;
    return strategy(...args);
  }

  /**
   * 从配置加载策略
   * @param config 策略配置数组
   * @returns 返回当前实例以支持链式调用
   */
  load(config: StrategyConfig<T, R>[]): this {
    config.forEach(({ name, fn }) => {
      this.add(name, fn);
    });
    return this;
  }

  /**
   * 设置默认策略
   * @param strategy 默认策略函数
   * @returns 返回当前实例以支持链式调用
   */
  setDefaultStrategy(strategy: StrategyFunction<T, R>): this {
    this.strategies.default = strategy;
    return this;
  }
}

/**
 * 策略检查管理器，扩展基本策略管理功能
 */
class PolicyManager<T extends any[]> extends StrategyManager<T, boolean> {
  /**
   * 检查单个策略
   * @param name 策略名称
   * @param args 传递给策略的参数
   * @returns 检查结果
   */
  check(name: StrategyName, ...args: T): boolean {
    return this.use(name, ...args);
  }

  /**
   * 组合检查多个策略（所有策略都必须通过）
   * @param names 策略名称数组
   * @param args 传递给策略的参数
   * @returns 检查结果
   */
  checkAll(names: StrategyName[], ...args: T): boolean {
    return names.every(name => this.check(name, ...args));
  }

  /**
   * 组合检查多个策略（任一策略通过即可）
   * @param names 策略名称数组
   * @param args 传递给策略的参数
   * @returns 检查结果
   */
  checkAny(names: StrategyName[], ...args: T): boolean {
    return names.some(name => this.check(name, ...args));
  }
}

/**
 * 优先级策略管理器，支持按优先级执行策略
 */
class PriorityStrategyManager<T extends any[], R = any> extends StrategyManager<T, R> {
  /**
   * 优先级策略列表
   * @private
   */
  private priorityStrategies: PriorityStrategy<T, R>[];

  constructor() {
    super();
    this.priorityStrategies = [];
  }

  /**
   * 添加带优先级的策略
   * @param name 策略名称
   * @param strategy 策略函数
   * @param priority 优先级（数值越大优先级越高）
   * @returns 返回当前实例以支持链式调用
   */
  addPriority(name: StrategyName, strategy: StrategyFunction<T, R>, priority: number): this {
    this.priorityStrategies.push({ name, fn: strategy, priority });
    this.priorityStrategies.sort((a, b) => b.priority - a.priority);
    return this;
  }

  /**
   * 按优先级顺序检查策略
   * @param args 传递给策略的参数
   * @returns 检查结果
   */
  checkByPriority(...args: T): R {
    for (const { fn } of this.priorityStrategies) {
      const result = fn(...args);
      if (result) {
        return result;
      }
    }
    return this.strategies.default(...args);
  }
}

/**
 * 组合策略管理器，支持策略的组合执行
 */
class CompositeStrategyManager<T extends any[], R = any> extends StrategyManager<T, R> {
  private executionOrder: StrategyName[];

  constructor() {
    super();
    this.executionOrder = [];
  }

  /**
   * 设置策略执行顺序
   * @param order 策略名称数组
   * @returns 返回当前实例以支持链式调用
   */
  setExecutionOrder(order: StrategyName[]): this {
    this.executionOrder = order;
    return this;
  }

  /**
   * 使用指定策略
   * @param args 传递给策略的参数
   * @returns 策略执行结果
   */
  useComposite(...args: T): R {
    const strategies = this.executionOrder.map(name => this.strategies[name]);
    return strategies.reduce(
        (result, strategy) => {
          // strategy(result as T[0], ...args.slice(1))
          const nArgs = [result as T[0], ...args.slice(1)] as T[1];
          return strategy(...nArgs);
        },
        args[0] as T[0]
    );
  }
}



export {
  StrategyManager,
  PolicyManager,
  PriorityStrategyManager,
  CompositeStrategyManager
};