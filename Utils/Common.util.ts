const insertObjectIf = <T1 extends {}>(
  condition: boolean | any,
  elements1: T1
): Partial<T1> => {
  return condition ? elements1 : ({} as T1)
}

const insertIf = (condition: boolean, ...elements: any[]) => {
  return condition ? [...elements] : []
}

export { insertObjectIf, insertIf }
