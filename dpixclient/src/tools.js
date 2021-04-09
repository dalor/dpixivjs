export const runnerAndDecorator = () => {
    let runFunc;
    return ({
        runner: () => runFunc && runFunc(runFunc),
        decorator: (func) => runFunc = func
    })
}